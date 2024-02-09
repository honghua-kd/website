<template>
  <div class="mort-mangement-details-container">
    <div class="top">
      <HeaderTable></HeaderTable>
      <div class="link">
        <span
          v-for="(item, index) in linkData"
          :key="index"
          @click="scrollTo(item.value)"
          :class="{ active: activeIndex === index }"
          >{{ item.name }}</span
        >
      </div>
    </div>
    <div ref="container">
      <!-- 基本信息 -->
      <Information id="information"></Information>
      <!-- 任务详情 -->
      <TaskDetails id="taskDetails"></TaskDetails>
      <!-- 材料明细 -->
      <MaterialDetail id="materialDetail"></MaterialDetail>
      <!-- 进度信息 -->
      <Progress id="progress"></Progress>
      <!-- 营业执照 -->
      <BusinessLicense id="businessLicense"></BusinessLicense>
      <!-- 完成凭证 -->
      <ProofCompletion id="proofCompletion"></ProofCompletion>
      <!-- 催办记录 -->
      <CallRecord id="callRecord"></CallRecord>
      <!-- 审批记录 -->
      <ApprovalRecord id="approvalRecord"></ApprovalRecord>
      <!-- 附件 -->
      <Attachment id="attachment"></Attachment>
      <!-- 结算记录 -->
      <SettlementRecord id="settlementRecord"></SettlementRecord>
      <!-- 操作记录 -->
      <OperationRecord id="operatingRecord"></OperationRecord>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { mitt } from '@toystory/lotso'
import HeaderTable from './hearderTable.vue'
import Information from './information.vue'
import TaskDetails from './taskDetails.vue'
import MaterialDetail from './materialDetail.vue'
import Progress from './progress.vue'
import originData from './data'
import BusinessLicense from './businessLicense.vue'
import ProofCompletion from './proofCompletion.vue'
import CallRecord from './callRecord.vue'
import ApprovalRecord from './approvalRecord.vue'
import Attachment from './attachment.vue'
import SettlementRecord from './settlementRecord.vue'
import OperationRecord from './operatingRecord.vue'

const linkData = ref(originData.linkData)
const activeIndex = ref(0)

const scrollTo = (name: string) => {
  const childOffsetTop = getChildOffsetTop(name)
  const index = list.findIndex((item) => item === name)
  requestAnimationFrame(() => {
    console.log(list.length - index - 1)
    activeIndex.value = list.length - index - 1
  })
  mitt.emit('scrollTo', childOffsetTop)
}
// 获取父组件的滚动高度
mitt.on('outSideScorllTop', (res) => {
  const updated = list.some((item, index) => {
    const childOffsetTop = getChildOffsetTop(item)!
    const parentScrollTop = res as number
    if (parentScrollTop + 130 >= childOffsetTop) {
      activeIndex.value = list.length - index - 1
      // console.log(list.length, index, parentScrollTop + 130, childOffsetTop)

      return true
    }
  })
  if (!updated) {
    activeIndex.value = 0
  }
})
const getChildOffsetTop = (itemId: string) => {
  const childElement = document.getElementById(itemId)
  return childElement?.offsetTop
}
const list = [
  'information',
  'taskDetails',
  'materialDetail',
  'progress',
  'businessLicense',
  'proofCompletion',
  'callRecord',
  'approvalRecord',
  'attachment',
  'settlementRecord',
  'operatingRecord'
].reverse()
</script>

<style lang="scss" scoped>
.mort-mangement-details-container {
  padding-top: 110px;
  .top {
    position: fixed;
    top: 85px;
    z-index: 20;
    padding-right: 20px;
    width: fill-available;
    background-color: #ffffff;
  }
  .link {
    display: flex;
    justify-content: space-between;
    margin: 0 20px 20px;
    font-size: 16px;
    font-weight: 700;
    span {
      color: #7f7f7f;
      cursor: pointer;
    }
    .active {
      color: $base-color-primary;
    }
  }
  :deep(.bottom-line) {
    margin-top: 15px;
    width: 100%;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
  }
  :deep(.el-empty) {
    height: 150px;
  }
  :deep(.el-descriptions__cell) {
    padding-bottom: 5px !important;
  }
  :deep(.el-descriptions__label) {
    display: inline-block;
    width: 150px;
    font-weight: 500;
    text-align: right;
    color: #aaaaaa;
  }
  :deep(.el-descriptions__content) {
    text-align: left;
  }
}
</style>
