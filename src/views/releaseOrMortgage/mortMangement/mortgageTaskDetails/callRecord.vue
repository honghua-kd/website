<template>
  <div class="call-record">
    <Line name="催办记录" :botBorder="false" />
    <el-timeline v-if="activities.length > 0">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :hollow="true"
        type="info"
      >
        <p>{{ activity.person }}</p>
        <p>{{ activity.content }}</p>
        <p>{{ activity.otherPerson }}</p>
        <p class="special">{{ activity.desc }}</p>
      </el-timeline-item>
    </el-timeline>
    <el-empty v-else description="暂无催办记录" :image-size="100" />
    <div class="bottom-line"></div>
  </div>
</template>

<script setup lang="ts">
import Line from './components/line.vue'

const activities = [
  {
    person: '反馈人：供应商    2023-12-12  12:21',
    content: '反馈内容：已经办结，尽快处理'
  },
  {
    person: '反馈内容：已经办结，尽快处理',
    content: '催办内容：请尽快办理该流程。',
    otherPerson: '被催人：张三，供应商A, 姜领',
    desc: '提醒方式：邮件，短信，系统消息'
  }
]
</script>

<style lang="scss" scoped>
p {
  margin: 6px 0;
  font-size: 12px;
  font-family: PingFangSC-Regular, 'PingFang SC', sans-serif;
  color: #333333;
}
.special {
  font-weight: 400;
  color: rgb(215 215 215);
}
</style>
