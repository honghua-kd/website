<template>
  <div class="mort-mangement-details-container">
    <div class="breadcrumb">抵押管理>抵押详情</div>
    <HeaderTable></HeaderTable>
    <div class="link">
      <span
        v-for="item in linkData"
        :key="item.value"
        @click="scrollTo('#' + item.value)"
        >{{ item.name }}</span
      >
    </div>
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

const scrollTo = (selector: string) => {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
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
    margin: 0 20px;
    font-size: 16px;
    font-weight: 700;
    span {
      color: #7f7f7f;
      cursor: pointer;
    }
  }
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
</style>
