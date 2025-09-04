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
  '1 May 25',
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

  async getLatestQuarterData(sheetName) {
    const data = await this.fetchData(sheetName);
    if (!data || data.length < 6) return null;
    
    const revenueRow = data[5];
    const latestQuarter = '31 Jul 25';
    const previousQuarter = '1 May 25';
    
    const currentRevenue = parseFloat(revenueRow[latestQuarter]) || 0;
    const previousRevenue = parseFloat(revenueRow[previousQuarter]) || 0;
    
    const change = currentRevenue - previousRevenue;
    const changePercent = previousRevenue > 0 ? ((change / previousRevenue) * 100) : 0;
    
    return {
      revenue: currentRevenue.toFixed(2),
      change: change.toFixed(2),
      changePercent: changePercent.toFixed(1),
      isPositive: change >= 0,
      quarter: latestQuarter
    };
  }
}

export const stockService = new StockService();