<template>
  <div class="basic-information" id="information">
    <SecondaryTitle title="基本信息" />
    <el-descriptions :column="4">
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
