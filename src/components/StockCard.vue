<template>
  <div class="card-list">
    <div v-for="stock in stocks" :key="stock.symbol" class="card">
      <div class="headline-card">
        <img :src="getImagePath(stock.symbol)" :alt="stock.symbol" class="stock-image" />
        <h3>{{ stock.name }}</h3>
      </div>
      <div>
        <p class="revenue">{{ stock.period || 'Revenue Q3 2025' }}</p>
        <div class="numbers-layout">
          <p class="total-revenue">{{ stock.revenue || '0.00' }}</p>
          <div class="previous-year" :class="{ positive: stock.isPositive }">
            <p>{{ stock.change || '0.00' }} {{ stock.isPositive ? '↑' : '↓' }}</p>
            <p>{{ stock.changePercent || '0.0' }} %</p>
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
  },
  methods: {
    getImagePath(symbol) {
      const imageMap = {
        appl: require('@/assets/img/appl.png'),
        goog: require('@/assets/img/goog.png'),
        msft: require('@/assets/img/msft.png'),
        amzn: require('@/assets/img/amzn.png'),
        tsla: require('@/assets/img/tsla.png'),
        nvda: require('@/assets/img/nvda.png'),
        meta: require('@/assets/img/meta.png')
      };
      return imageMap[symbol];
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

.stock-image {
  width: 24px;
  height: 24px;
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

.previous-year.positive {
  color: #28a745;
}

.previous-year p {
  margin: 0;
  font-size: 12px;
}

.in-bill-usd {
  font-size: 12px;
  color: #999;
  margin: 8px 0 0 0;
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