<template>
  <Headline></Headline>
  <Card>
    <h1>Willkommen zum Stock Dashboard</h1>
    <p>Hier können Sie Ihre Aktien verfolgen.</p>
  </Card>
</template>

<script>
import Card from './components/Card.vue';
// import { stockService } from '@/services/stockService'; // wegen maximalen Anfragen im Monat
import Headline from './components/Headline.vue';

export default {
  name: 'App',
  components: {
    Card,
    Headline
  },
  // async created() {
  //   this.data = await stockService.getRevenue('$AAPL');
  //   console.log('Loaded data', this.data);
  // }
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
