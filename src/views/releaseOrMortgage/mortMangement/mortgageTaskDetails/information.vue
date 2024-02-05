<template>
  <div class="basic-information">
    <Line name="基本信息" :botBorder="false"></Line>
    <el-descriptions :column="4">
      <el-descriptions-item
        v-for="item in originData.informationData"
        :key="item.value"
        :label="item.name"
      >
        {{ item.value }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import Line from './components/line.vue'
import originData from './data'
</script>

<style lang="scss" scoped>
.basic-information {
  margin: 0 20px;
}
</style>
