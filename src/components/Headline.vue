<template>
  <div class="headline-position">
    <div class="icon"></div>
    <h1>The Magnificent Seven Companies</h1>
  </div>
</template>

<script>
export default {
  name: 'ComponentName',
  props: [],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
  .headline-position {
    display: flex;
    align-items: center;
    padding-left: 24px;
  }

  .icon {
    width: 96px;
    height: 32px;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    background-color: #39DAFF;
    position: absolute;
    left: 0;
  }
</style>