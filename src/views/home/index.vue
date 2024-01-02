<template>
  <div class="home-container">
    <div class="app-welcome">
      <h1>欢迎使用</h1>
      <h1>海通恒信运营中台系统</h1>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
.home-container {
  overflow: hidden;
  margin: -6px -20px;
  padding: 6px 20px;
  height: calc(100vh - 106px);
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #ffffff;
  background-image: url('@/assets/logo/index_bg.jpg');
  .app-welcome {
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    margin: 20px;
    font-size: 1.5em;
    color: #555555;
  }
}
</style>
