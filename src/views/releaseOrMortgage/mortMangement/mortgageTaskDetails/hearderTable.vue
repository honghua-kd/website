<template>
  <div class="header-box">
    <el-card class="box-card">
      <div
        class="item"
        v-for="(item, index) in originData.headerTableData"
        :key="item.name"
        :class="{ 'custom-border': index === 1 }"
      >
        <p
          class="custom-label-color"
          :class="{
            'custom-label-special': index === 0
          }"
        >
          {{ item.name }}
        </p>
        <p
          :class="{
            'custom-label-special':
              item.name === '合同编号' || item.name === '车架号'
          }"
        >
          {{ item.value }}
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import originData from './data'
</script>

<style lang="scss" scoped>
.header-box {
  margin-bottom: 20px;
  .custom-label-color {
    color: #cccccc;
  }
  .custom-label-special {
    font-weight: 700;
    color: $base-color-primary;
  }
  .custom-border {
    position: relative;
    padding-left: 20px; /* 留出空间显示线条 */
  }
  .custom-border::before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 1px; /* 线条宽度 */
    height: 30px; /* 线条高度（可以根据需求调整） */
    background-color: #cccccc; /* 线条颜色 */
    content: '';
    transform: translateY(-50%);
  }
}
:deep(.el-card__body) {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
</style>
