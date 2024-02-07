<template>
  <div>
    <el-dialog
      title="修改签约/付费结果"
      v-model="signVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="30%"
    >
      <el-form ref="approveFormRef" :label-width="px2rem('130px')">
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否完成签约" prop="">
              <el-radio-group>
                <el-radio :label="3">是</el-radio>
                <el-radio :label="6">否</el-radio>
                <el-radio :label="9">减免</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否完成付费" prop="">
              <el-radio-group>
                <el-radio :label="3">是</el-radio>
                <el-radio :label="6">否</el-radio>
                <el-radio :label="9">减免</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="signVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="submitSign"> 确认 </el-button>
      </template>
    </el-dialog>
    <el-dialog
      v-model="confirmVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="25%"
    >
      <el-row>
        <el-col class="text-al">
          您已选择
          <el-tooltip :content="Data.contracts.join()" placement="top">
            <span class="text-blue">{{ Data.contracts.length }}</span>
          </el-tooltip>
          个合同
          <el-tooltip :content="Data.lease.join()" placement="top">
            <span class="text-blue">{{ Data.lease.length }}</span>
          </el-tooltip>
          个租赁物修改签约/付费结果，
        </el-col>
      </el-row>
      <el-row>
        <el-col class="text-al">
          其中
          <el-tooltip :content="Data.lease.join()" placement="top">
            <span class="text-blue">{{ Data.lease.length }}</span>
          </el-tooltip>
          个租赁物的“抵押费用减免”审批流程还在进行中，暂时无法修改。
        </el-col>
      </el-row>
      <el-row class="text-al">
        <el-col>是否确认发起未付费审批。 </el-col>
      </el-row>
      <template #footer>
        <el-button @click="confirmVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { px2rem } from '@/utils'

const Data = {
  contracts: ['12', '13', '14'],
  lease: ['12', '13', '14']
}
const confirmVisible = ref(false)
const signVisible = ref(false)
const open = () => {
  signVisible.value = true
}
defineExpose({ open })
const submitSign = () => {
  // 发起请求
  confirmVisible.value = true
}
const confirm = () => {
  // 发起请求
  confirmVisible.value = false
  signVisible.value = false
}
</script>
<style lang="scss" scoped>
.text-al {
  margin-bottom: 10px;
  font-size: $base-font-size-big;
  text-align: center;
}
.text-blue {
  color: $base-color;
}
</style>
