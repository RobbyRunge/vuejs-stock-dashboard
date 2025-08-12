<template>
  <Headline></Headline>
  <Card>
    <StockCard :stocks="stocks" />
  </Card>
</template>

<script>
import Card from './components/Card.vue';
// import { stockService } from '@/services/stockService'; // wegen maximalen Anfragen im Monat
import Headline from './components/Headline.vue';
import StockCard from './components/StockCard.vue';

export default {
  name: 'App',
  components: {
    Card,
    Headline,
    StockCard,
  },
  // async created() {
  //   this.data = await stockService.getRevenue('$AAPL');
  //   console.log('Loaded data', this.data);
  // }
  data() {
    return {
      stocks: [
        { symbol: 'AAPL', name: 'Apple Inc.' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.' },
        { symbol: 'MSFT', name: 'Microsoft Corp.' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.' },
        { symbol: 'TSLA', name: 'Tesla Inc.' },
        { symbol: 'NVDA', name: 'NVIDIA Corp.' },
        { symbol: 'META', name: 'Meta Platforms Inc.' }
      ]
    };
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
