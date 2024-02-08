<template>
  <div class="mort-mangement-details-container">
    <div class="top">
      <div class="breadcrumb">抵押管理>抵押详情</div>
      <HeaderTable></HeaderTable>
      <div class="link">
        <span
          v-for="(item, index) in linkData"
          :key="item.value"
          @click="scrollTo(index)"
          >{{ item.name }}</span
        >
      </div>
    </div>
    <div class="container" ref="container">
      <!-- 基本信息 -->
      <Information ref="information"></Information>
      <!-- 任务详情 -->
      <TaskDetails ref="taskDetails"></TaskDetails>
      <!-- 材料明细 -->
      <MaterialDetail ref="materialDetail"></MaterialDetail>
      <!-- 进度信息 -->
      <Progress ref="progress"></Progress>
      <!-- 营业执照 -->
      <BusinessLicense ref="businessLicense"></BusinessLicense>
      <!-- 完成凭证 -->
      <ProofCompletion ref="proofCompletion"></ProofCompletion>
      <!-- 催办记录 -->
      <CallRecord ref="callRecord"></CallRecord>
      <!-- 审批记录 -->
      <ApprovalRecord ref="approvalRecord"></ApprovalRecord>
      <!-- 附件 -->
      <Attachment ref="attachment"></Attachment>
      <!-- 结算记录 -->
      <SettlementRecord ref="settlementRecord"></SettlementRecord>
      <!-- 操作记录 -->
      <OperationRecord ref="operatingRecord"></OperationRecord>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
const tabchecked = ref(0)
const container = ref<null | HTMLElement>(null)

const scrollTo = (index: number) => {
  if (index !== tabchecked.value) {
    tabchecked.value = index
  }
  const children = container.value?.children[0] as HTMLElement

  const excLength = children.offsetTop
  console.log(children)
  // const no = index + 1

  const scrollTopType = container.value as HTMLElement
  const containerHeight = container.value?.children[index] as HTMLElement

  console.log(containerHeight)

  scrollTopType.scrollTop = containerHeight.offsetTop - excLength
}
</script>

<style lang="scss" scoped>
.mort-mangement-details-container {
  .breadcrumb {
    margin: 10px;
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
  }
  .container {
    overflow: scroll;
    height: 600px;
  }
  :deep(.bottom-line) {
    margin-top: 15px;
    width: 100%;
    border: 1px solid #e6e6e6;
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
