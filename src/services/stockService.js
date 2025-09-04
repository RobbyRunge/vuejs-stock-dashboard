import axios from 'axios';

const quarterOrder = [
  'Mar 21',
  'Jun 21', 
  'Sep 21',
  'Dec 21',
  'Mar 22',
  'Jun 22',
  'Sep 22', 
  'Dec 22',
  'Mar 23',
  '3 Aug 23',
  '2 Nov 23',
  '1 Feb 24',
  '2 Mai 24',
  '1 Aug 24',
  '31 Oct 24',
  '30 Jan 25',
  '30. Apr 25',
  '1 May 25',
  '24 Jul 25',
  '27 Aug 25',
  '30 Jul 25',
  '31 Jul 25',
];

class StockService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://sheetdb.io/api/v1/42cp5if516wlb'
    });
  }

  async fetchData(sheetName) {
    try {
      const response = await this.apiClient.get(`?sheet=${sheetName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  async getAllData(sheetName) {
    return await this.fetchData(sheetName);
  }

  // Findet das neueste verfügbare Quartal für eine spezifische Aktie
  findLatestQuarter(revenueRow) {
    // Durchsuche quarterOrder rückwärts (vom neuesten zum ältesten)
    for (let i = quarterOrder.length - 1; i >= 0; i--) {
      const quarter = quarterOrder[i];
      if (revenueRow[quarter] && revenueRow[quarter] !== '0' && revenueRow[quarter] !== '') {
        return quarter;
      }
    }
    return quarterOrder[quarterOrder.length - 1]; // Fallback auf das neueste definierte Quartal
  }

  // Findet das vorherige Quartal basierend auf dem aktuellen
  findPreviousQuarter(currentQuarter) {
    const currentIndex = quarterOrder.indexOf(currentQuarter);
    if (currentIndex > 0) {
      // Suche rückwärts nach einem Quartal mit Daten
      for (let i = currentIndex - 1; i >= 0; i--) {
        return quarterOrder[i];
      }
    }
    return quarterOrder[0]; // Fallback auf das erste Quartal
  }

  // Abschneiden (nicht runden) auf gewünschte Nachkommastellen
  truncateNumber(value, decimals = 2) {
    if (!isFinite(value)) return 0;
    const factor = Math.pow(10, decimals);
    return Math.trunc(value * factor) / factor;
  }

  // Robustes Parsen von Zahlen mit Punkt- oder Komma-Notation
  parseLocaleNumber(value) {
    if (typeof value === 'number') return value;
    if (!value) return 0;
    const str = String(value).trim();
    const hasDot = str.indexOf('.') !== -1;
    const hasComma = str.indexOf(',') !== -1;
    let normalized = str;
    if (hasComma && !hasDot) {
      // z.B. "66,613" -> "66.613"
      normalized = str.replace(',', '.');
    } else if (hasDot && !hasComma) {
      // "66.613" bleibt
      normalized = str;
    } else if (hasDot && hasComma) {
      // "1.234,56" -> "1234.56", "1,234.56" -> "1234.56"
      if (str.lastIndexOf('.') < str.lastIndexOf(',')) {
        normalized = str.replace(/\./g, '').replace(',', '.');
      } else {
        normalized = str.replace(/,/g, '');
      }
    }
    return parseFloat(normalized) || 0;
  }

  async getRevenue(sheetName) {
    const data = await this.fetchData(sheetName);
    if (!data || data.length < 6) return [];
    
    // Revenue ist in Zeile 6 (Index 5)
    const revenueRow = data[5];
    return quarterOrder.map(quarter => ({
      quarter,
      revenue: revenueRow[quarter] || '0'
    }));
  }

  async getLatestQuarterData(sheetName, revenueRowIndex = 5) {
    const data = await this.fetchData(sheetName);
    if (!data || data.length <= revenueRowIndex) return null;
    
    const revenueRow = data[revenueRowIndex];
    const latestQuarter = this.findLatestQuarter(revenueRow);
    const previousQuarter = this.findPreviousQuarter(latestQuarter);
    
    const currentRevenue = this.parseLocaleNumber(revenueRow[latestQuarter]) || 0;
    const previousRevenue = this.parseLocaleNumber(revenueRow[previousQuarter]) || 0;
    
    const change = currentRevenue - previousRevenue;
    const changePercent = previousRevenue > 0 ? ((change / previousRevenue) * 100) : 0;
    
    return {
      // Rohe numerische Werte (abgeschnitten, nicht gerundet)
      revenue: this.truncateNumber(currentRevenue, 2),
      change: this.truncateNumber(change, 2),
      changePercent: this.truncateNumber(changePercent, 2),
      isPositive: change >= 0,
      quarter: latestQuarter,
      previousQuarter: previousQuarter
    };
  }
}

export const stockService = new StockService();