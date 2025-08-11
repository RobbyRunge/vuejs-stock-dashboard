<template>
  <Headline></Headline>
  <Card>
    <h1>Willkommen zum Stock Dashboard</h1>
    <p>Hier können Sie Ihre Aktien verfolgen.</p>
  </Card>
</template>

<script>
import Card from './components/Card.vue';
import { stockService } from '@/services/stockService';
import Headline from './components/Headline.vue';

export default {
  name: 'App',
  components: {
    Card,
    Headline
  },
  async created() {
    this.data = await stockService.getRevenue('$AAPL');
    console.log('Loaded data', this.data);
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  padding: 100px;
  box-sizing: border-box;
  background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);
  width: 100vw;
  min-height: 100vh;
}
</style>
