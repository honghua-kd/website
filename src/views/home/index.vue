<template>
  <div class="home-container">
    <div class="app-welcome">
      <h1>欢迎使用</h1>
      <h1>海通恒信运营管理系统</h1>
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
  margin: -30px -20px;
  padding: 20px;
  height: calc(100vh - 157px);
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
  .constarct-view {
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 8px;
    }
    .grid-content {
      display: flex;
      align-items: center;
      padding: 20px;
      height: 144px;
      border-radius: 4px;
      background: #ffffff;
      .constract-num {
        font-size: 28px;
        font-weight: bold;
        color: #4a4a4a;
      }
      .constarct-name {
        color: rgb(0 0 0 / 45%);
        line-height: 16px;
      }
      img {
        margin-left: auto;
        width: 58px;
      }
    }
    .row-bg {
      padding: 10px 0;
    }
  }
  .assets-proportion {
    display: flex;
    margin-top: 20px;
    width: 100%;
    height: 230px;
    .assets-content {
      padding: 0 20px;
      width: calc(100% - 305px);
      font-size: 16px;
      border-radius: 8px;
      color: rgb(0 0 0 / 45%);
      background: #ffffff;
      box-shadow: 0 0 8px 0 #edefef;
      .grid-content {
        margin-top: 16px;
      }
      .grid-content2 {
        margin-top: 40px;
      }
      .assets-total {
        font-size: 58px;
        font-weight: bold;
        color: #4a4a4a;
      }
      .assets-ratio {
        margin-right: 5px;
        font-size: 32px;
        font-weight: bold;
        color: #4a4a4a;
      }
      .ratio-name {
        margin-top: 17px;
        width: 64px;
        height: 30px;
        font-size: 18px;
        font-weight: 800;
        border-radius: 15px;
        text-align: center;
        color: #ffffff;
        line-height: 29px;
      }
      .hx-bg {
        background: linear-gradient(116deg, #53a0fd 0%, #4363ef 100%);
      }
      .hy-bg {
        background: linear-gradient(135deg, #fad961 0%, #f76b1c 100%);
      }
      .xw-bg {
        background: linear-gradient(118deg, #b4ec51 0%, #429321 100%);
      }
    }
    .weather {
      margin-left: auto;
      padding: 14px;
      width: 279px;
      border-radius: 8px;
      text-align: center;
      color: #ffffff;
      background: #598cff;
      box-shadow: 0 0 8px 0 rgb(89 140 255 / 50%);
      div {
        width: 100%;
      }
      ._icon {
        margin-top: 18px;
        width: 50px;
        height: 50px;
      }
      .name {
        margin: 13px 0 6px;
        font-size: 20px;
        font-weight: 500;
      }
    }
  }
  .chart {
    .statistics-tab {
      display: flex;
      margin-top: 16px;
      padding: 14px;
      .tab-item {
        position: relative;
        margin-right: 50px;
        font-size: 16px;
        cursor: pointer;
      }
      .tab-default {
        font-weight: 500;
        color: #9b9b9b;
      }
      .tab-active {
        font-weight: 500;
        color: rgb(0 0 0 / 85%);
        &::after {
          position: absolute;
          bottom: -10px;
          left: 50%;
          width: 22px;
          height: 6px;
          border-radius: 6px;
          background: #598cff;
          content: '';
          transform: translateX(-50%);
        }
      }
    }
    .statistics-content {
      margin-top: 16px;
      .grid-item {
        padding: 10px 00 0 20px;
        height: 288px;
        border-radius: 8px;
        background: #ffffff;
        box-shadow: 0 0 8px 0 #edefef;
        .bar-content {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
