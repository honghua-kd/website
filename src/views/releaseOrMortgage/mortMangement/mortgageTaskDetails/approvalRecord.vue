<template>
  <div class="approval-record">
    <Line name="审批记录" :botBorder="false" />
    <el-timeline v-if="activities.length > 0">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :hollow="true"
        type="info"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
    <el-empty :image-size="100" v-else description="暂无审批记录"></el-empty>
    <div class="bottom-line"></div>
  </div>
</template>

<script setup lang="ts">
import Line from './components/line.vue'

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
