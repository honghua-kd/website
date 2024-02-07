<template>
  <div>
    <el-dialog
      v-model="alertVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="30%"
      top="10vh"
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
          个租赁物
        </el-col>
      </el-row>
      <el-row>
        <el-col class="text-al">
          其中
          <el-tooltip :content="Data.lease.join()" placement="top">
            <span class="text-blue">{{ Data.lease.length }}</span>
          </el-tooltip>
          个租赁物未完成抵押付费
          <div style="margin-top: 10px">
            请先完成抵押签约并确认收到款项或按照制度进行审批
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="text-al">
          其中
          <el-tooltip :content="Data.lease.join()" placement="top">
            <span class="text-blue">{{ Data.lease.length }}</span>
          </el-tooltip>
          个租赁物信息不全，无法发起，请先补充
        </el-col>
      </el-row>
      <el-row class="text-al" v-if="types === '抵押'">
        <el-col>是否确认委托业务运营办理抵押 </el-col>
      </el-row>
      <el-row class="text-al" v-if="types === '材料'">
        <el-col>是否确认申请抵押材料 </el-col>
      </el-row>
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        border
        row-key="id"
      >
        <el-table-column label="合同编号" prop="contractNo" align="center" />
        <el-table-column label="租赁物编号" prop="leaseNo" align="center" />
        <el-table-column label="核验结果" prop="result" align="center" />
      </el-table>
      <el-row justify="end">
        <el-col :span="24" style="margin-top: 10px; text-align: end">
          <el-button link type="primary" @click="download">下载表格</el-button>
        </el-col>
      </el-row>
      <template #footer>
        <el-button @click="alertVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="submit"> 确认 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const Data = {
  contracts: ['12', '13', '14'],
  lease: ['12', '13', '14']
}
const tableData = reactive([
  {
    contractNo: 'L21C1566003',
    leaseNo: 'S32445666',
    result: '缺少车牌信息'
  },
  {
    contractNo: 'L21C1566003',
    leaseNo: 'S32445666',
    result: '通过'
  }
])
const alertVisible = ref(false)
const types = ref('')
const open = (type: string) => {
  alertVisible.value = true
  types.value = type
  // if (type === '抵押') {
  // } else if (type === '材料') {
  // }
}
defineExpose({ open })
const download = () => {}
const submit = () => {}
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
