<template>
  <Headline></Headline>
  <Card>
    <StockCard :stocks="stocks" />
  </Card>
</template>

<script>
import Card from './components/Card.vue';
import { stockService } from '@/services/stockService';
import Headline from './components/Headline.vue';
import StockCard from './components/StockCard.vue';

export default {
  name: 'App',
  components: {
    Card,
    Headline,
    StockCard,
  },
  async created() {
    await this.loadStockData();
  },
  data() {
    return {
      stocks: [
        { symbol: 'appl', name: 'Apple', sheetName: '$AAPL', revenueRowIndex: 5 },
        { symbol: 'goog', name: 'Google', sheetName: '$GOOGL', revenueRowIndex: 5 },
        { symbol: 'msft', name: 'Microsoft', sheetName: '$MSFT', revenueRowIndex: 9 },
        { symbol: 'amzn', name: 'Amazon', sheetName: '$AMZN', revenueRowIndex: 9 },
        { symbol: 'tsla', name: 'Tesla', sheetName: '$TSLA', revenueRowIndex: 13 },
        { symbol: 'nvda', name: 'NVIDIA', sheetName: '$NVDA', revenueRowIndex: 5 },
        { symbol: 'meta', name: 'Meta', sheetName: '$META', revenueRowIndex: 5 }
      ]
    };
  },
  methods: {
    async loadStockData() {
      for (let stock of this.stocks) {
        try {
          console.log(`Loading data for ${stock.name} from sheet ${stock.sheetName}`);
          const data = await stockService.getAllData(stock.sheetName);
          
          if (data && data.length > stock.revenueRowIndex) {
            // Verwende die korrekte Zeilennummer für jedes Unternehmen
            const revenueRow = data[stock.revenueRowIndex] || {};
            console.log(`Revenue row for ${stock.name}:`, revenueRow);
            
            const latestQuarter = '31 Jul 25'; // Neuestes Quartal basierend auf Excel
            const previousQuarter = '1 May 25';
            
            stock.revenue = revenueRow[latestQuarter] || '0';
            stock.period = 'Revenue Q3 2025';
            
            // Berechne Veränderung zum Vorquartal
            const currentRevenue = parseFloat(stock.revenue) || 0;
            const previousRevenue = parseFloat(revenueRow[previousQuarter]) || 0;
            
            console.log(`${stock.name} - Current: ${currentRevenue}, Previous: ${previousRevenue}`);
            
            if (previousRevenue > 0) {
              const change = currentRevenue - previousRevenue;
              const changePercent = ((change / previousRevenue) * 100).toFixed(1);
              stock.change = change.toFixed(2);
              stock.changePercent = changePercent;
              stock.isPositive = change >= 0;
            } else {
              stock.change = '0.00';
              stock.changePercent = '0.0';
              stock.isPositive = true;
            }
          } else {
            console.warn(`No data found for ${stock.name} or insufficient rows`);
            throw new Error(`No data found for ${stock.name}`);
          }
        } catch (error) {
          console.error(`Error loading data for ${stock.name}:`, error);
          // Fallback-Werte
          stock.revenue = '0';
          stock.period = 'Revenue Q3 2025';
          stock.change = '0.00';
          stock.changePercent = '0.0';
          stock.isPositive = true;
        }
      }
      console.log('Final stocks data:', this.stocks);
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'Rubik';
  src: url('@/assets/fonts/Rubik-VariableFont_wght.ttf') format('truetype');
  font-weight: 400;
}

body {
  margin: 0;
  font-family: Rubik;
  color: #F9F9F9;
}

#app {
  padding: 100px;
  box-sizing: border-box;
  background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);
  width: 100vw;
  min-height: 100vh;
}
</style>
