<template>
  <div class="material-detail">
    <SecondaryTitle title="操作记录">
      <template #more>
        <el-button type="primary" link @click="drawer = true"
          >操作记录详情</el-button
        ></template
      >
    </SecondaryTitle>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in activities" :key="index">
          <p>{{ activity.person }}</p>
          <p>{{ activity.content }}</p>
          <p>{{ activity.img }}</p>
        </el-timeline-item>
      </el-timeline>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import SecondaryTitle from '@/components/SecondaryTitle/index.vue'
import { ref } from 'vue'

const drawer = ref(false)
const activities = [
  {
    person: '姜领    2023-12-12  12:21',
    content: '转派给 恒运-业务运营部-102345张三',
    img: ''
  },
  {
    person: '姜领    2023-12-12  12:21',
    content: '发起抵押材料申请'
  },
  {
    person: '姜领    2023-12-12  12:21',
    content: '发起委托业务运营办理抵押'
  },
  {
    person: '姜领    2023-12-12  12:2',
    content: '修改补充信息    车牌号：12334445更改为12334446'
  }
]
</script>

<style lang="scss" scoped></style>
