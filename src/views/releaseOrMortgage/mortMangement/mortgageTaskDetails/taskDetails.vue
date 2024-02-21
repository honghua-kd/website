<template>
  <div class="task-details" id="taskDetails">
    <SecondaryTitle title="任务详情"></SecondaryTitle>
    <el-descriptions :column="4" :width="100">
      <el-descriptions-item
        v-for="item in originData.informationData"
        :key="item.value"
        :label="item.name"
      >
        {{ item.value }}
      </el-descriptions-item>
    </el-descriptions>
    <div class="bottom-line"></div>
  </div>
</template>

<script setup lang="ts">
import SecondaryTitle from '@/components/SecondaryTitle/index.vue'
import originData from './data'
</script>

<style lang="scss" scoped></style>
