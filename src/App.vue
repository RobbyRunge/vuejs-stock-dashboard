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
        { symbol: 'appl', name: 'Apple', sheetName: '$AAPL', revenueRowIndex: 3 },
        { symbol: 'goog', name: 'Google', sheetName: '$GOOG', revenueRowIndex: 3 },
        { symbol: 'msft', name: 'Microsoft', sheetName: '$MSFT', revenueRowIndex: 7 },
        { symbol: 'amzn', name: 'Amazon', sheetName: '$AMZN', revenueRowIndex: 7 },
        { symbol: 'tsla', name: 'Tesla', sheetName: '$TSLA', revenueRowIndex: 13 },
        { symbol: 'nvda', name: 'NVIDIA', sheetName: '$NVDA', revenueRowIndex: 3 },
        { symbol: 'meta', name: 'Meta', sheetName: '$META', revenueRowIndex: 3 }
      ]
    };
  },
  methods: {
    async loadStockData() {
      for (let stock of this.stocks) {
        try {
          console.log(`Loading data for ${stock.name} from sheet ${stock.sheetName}`);
          
          // Verwende die neue getLatestQuarterData Methode
          const quarterData = await stockService.getLatestQuarterData(stock.sheetName, stock.revenueRowIndex);
          
          if (quarterData) {
            stock.revenue = quarterData.revenue;
            stock.period = `Revenue Q3 2025`;
            stock.change = quarterData.change;
            stock.changePercent = quarterData.changePercent;
            stock.isPositive = quarterData.isPositive;
            
            console.log(`${stock.name} - Latest Quarter: ${quarterData.quarter}, Revenue: ${quarterData.revenue}, Change: ${quarterData.changePercent}%`);
          } else {
            console.warn(`No data found for ${stock.name}`);
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
