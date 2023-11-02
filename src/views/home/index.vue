<template>
  <div class="home-container">
    <div class="app-welcome">
      <h1>欢迎使用</h1>
      <h1>海通恒信后台管理系统</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style lang="scss" scoped>
.home-container {
  background-color: #fff;
  background-image: url('@/assets/logo/index_bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
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
      border-radius: 4px;
      height: 144px;
      background: #ffffff;
      display: flex;
      padding: 20px;
      align-items: center;
      .constract-num {
        font-weight: bold;
        color: #4a4a4a;
        font-size: 28px;
      }
      .constarct-name {
        color: rgba(0, 0, 0, 0.45);
        line-height: 16px;
      }
      img {
        width: 58px;
        margin-left: auto;
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
      background: #fff;
      width: calc(100% - 305px);
      box-shadow: 0px 0px 8px 0px #edefef;
      border-radius: 8px;
      padding: 0 20px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
      .grid-content {
        margin-top: 16px;
      }
      .grid-content2 {
        margin-top: 40px;
      }
      .assets-total {
        font-weight: bold;
        color: #4a4a4a;
        font-size: 58px;
      }
      .assets-ratio {
        font-weight: bold;
        color: #4a4a4a;
        font-size: 32px;
        margin-right: 5px;
      }
      .ratio-name {
        width: 64px;
        height: 30px;
        line-height: 29px;
        border-radius: 15px;
        color: #fff;
        text-align: center;
        font-weight: 800;
        font-size: 18px;
        margin-top: 17px;
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
      width: 279px;
      background: #598cff;
      box-shadow: 0px 0px 8px 0px rgba(89, 140, 255, 0.5);
      border-radius: 8px;
      padding: 14px;
      color: #fff;
      text-align: center;
      div {
        width: 100%;
      }
      ._icon {
        width: 50px;
        height: 50px;
        margin-top: 18px;
      }
      .name {
        font-size: 20px;
        font-weight: 500;
        margin: 13px 0 6px 0;
      }
    }
  }
  .chart {
    .statistics-tab {
      display: flex;
      padding: 14px;
      margin-top: 16px;
      .tab-item {
        margin-right: 50px;
        cursor: pointer;
        font-size: 16px;
        position: relative;
      }
      .tab-default {
        font-weight: 500;
        color: #9b9b9b;
      }
      .tab-active {
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        &::after {
          position: absolute;
          content: '';
          width: 22px;
          height: 6px;
          border-radius: 6px;
          background: #598cff;
          left: 50%;
          bottom: -10px;
          transform: translateX(-50%);
        }
      }
    }
    .statistics-content {
      margin-top: 16px;
      .grid-item {
        height: 288px;
        background: #ffffff;
        box-shadow: 0px 0px 8px 0px #edefef;
        border-radius: 8px;
        padding: 10px 00px 0px 20px;
        .bar-content {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
