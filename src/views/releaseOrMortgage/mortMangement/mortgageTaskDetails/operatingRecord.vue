<template>
  <div class="material-detail">
    <Line name="操作记录" :botBorder="false">
      <el-button type="primary" link @click="drawer = true"
        >操作记录详情</el-button
      >
    </Line>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import Line from './components/line.vue'
import { ref } from 'vue'

const drawer = ref(false)
const activities = [
  {
    content: 'Event start',
    timestamp: '2018-04-15'
  },
  {
    content: 'Approved',
    timestamp: '2018-04-13'
  },
  {
    content: 'Success',
    timestamp: '2018-04-11'
  }
]
</script>

<style lang="scss" scoped></style>
