<template>
  <div class="task-details">
    <Line name="任务详情" :botBorder="false"></Line>
    <el-descriptions :column="4" :width="100">
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
.task-details {
  margin: 0 20px;
}
</style>
