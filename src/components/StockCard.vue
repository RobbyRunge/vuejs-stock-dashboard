<template>
  <div class="card-list">
    <div v-for="stock in stocks" :key="stock.symbol" class="card">
      <div class="headline-card">
        <p>{{ stock.symbol }}</p>
        <h3>{{ stock.name }}</h3>
      </div>
      <div>
        <p class="revenue">Revenue Q1 2024</p>
        <div class="numbers-layout">
          <p class="total-revenue">66.61</p>
          <div class="previous-year">
            <p>-2,1 &darr;</p>
            <p>-3,1 %</p>
          </div>
        </div>
        <p class="in-bill-usd">In Bill USD</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockCard',
  props: {
    stocks: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.card {
  background: #011f35;
  border-radius: 12px;
  padding: 16px;
}

.headline-card {
  display: flex;
  align-items: center;
  gap: 8px;
}

h3 {
  font-size: 20px;
  font-weight: 500;
}

.revenue {
  font-size: 14px;
  margin-top: 0;
}

.numbers-layout {
  display: flex;
  align-items: center;
  gap: 24px;
}

.total-revenue {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.previous-year {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #C41C1C;
}

.previous-year p {
  margin: 0;
}

.positiv {
  color: #3BA752;
}

.negative {
  color: #C41C1C;
}

.in-bill-usd {
  font-size: 12px;
  margin-bottom: 0;
}
</style>