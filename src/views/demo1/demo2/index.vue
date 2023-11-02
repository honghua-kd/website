<template>
  <div class="demo-container">
    <div class="app-welcome">
      <h1>示例子菜单（仅做演示使用，请根据实际情况删除）</h1>
    </div>
    <el-button v-permission="'2313'">Default</el-button>
    <el-button v-permission:disabled="'2313'" type="primary">Primary</el-button>
    <el-button v-permission="'2313'" type="success">Success</el-button>
    <el-button v-permission:disabled="'2313'" type="info">Info</el-button>
    <el-button v-permission="'2313'" type="warning">Warning</el-button>
    <el-button v-permission:disabled="'2313'" type="danger">Danger</el-button>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style lang="scss" scoped>
.demo-container {
  background-color: #fff;
  margin: -30px -20px;
  overflow: hidden;
  padding: 20px;
  height: calc(100vh - 157px);
  .app-welcome {
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    margin: 20px;
    font-size: 1.5em;
    color: #555;
  }
}
</style>
