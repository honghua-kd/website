<template>
  <div>
    <el-dialog
      v-model="alertVisible"
      :title="title"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="70%"
      top="5vh"
      style="overflow-y: scroll; max-height: 90vh"
    >
      <div class="btn-top">
        <el-button type="primary" @click="print"> 打印 </el-button>
        <el-button type="primary" @click="collect"> 收藏 </el-button>
      </div>
      <el-table
        :data="contractData"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        border
      >
        <el-table-column
          label="合同编号"
          prop="contractNo"
          align="center"
          fixed
          width="150"
        />
        <el-table-column label="车架号" prop="" align="center" />
        <el-table-column label="租赁物名称" prop="" align="center" />
        <el-table-column label="租赁物类型" prop="" align="center" />
        <el-table-column label="承租人" prop="" align="center" />
        <el-table-column label="车牌号" prop="" align="center" />
        <el-table-column label="上牌省份" prop="" align="center" />
        <el-table-column label="上牌城市" prop="" align="center" />
        <el-table-column
          label="材料寄送地址"
          prop=""
          align="center"
          width="200"
          show-overflow-tooltip
        />
        <el-table-column
          label="是否完成抵押签约"
          prop=""
          align="center"
          width="120"
        />
        <el-table-column label="是否付费" prop="" align="center" />
        <el-table-column
          label="是否委托运营"
          prop=""
          align="center"
          width="120"
        />
        <el-table-column
          label="是否申请抵押材料"
          prop=""
          align="center"
          width="120"
        />
        <el-table-column
          label="是否完成抵押办理"
          prop=""
          align="center"
          width="120"
        />
        <el-table-column label="起租日期" prop="" align="center" />
        <el-table-column label="项目经理" prop="" align="center" />
        <el-table-column
          label="项目经理所属部门"
          prop=""
          align="center"
          width="150"
        />
      </el-table>
      <div class="type-title">流程审批历史</div>
      <el-table
        :data="historyData"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        border
      >
        <el-table-column label="审批节点" prop="node" align="center" />
        <el-table-column label="审批人" prop="person" align="center" />
        <el-table-column label="审批结果" prop="result" align="center" />
        <el-table-column label="审批意见" prop="opinion" align="center" />
        <el-table-column label="审批时间" prop="checkTime" align="center" />
        <el-table-column label="任务到达时间" prop="taskTime" align="center" />
      </el-table>
      <div class="type-title">审批流程节点</div>
      <template #footer>
        <el-button type="primary" @click="tempSave"> 暂存 </el-button>
        <el-button type="primary" @click="submit"> 提交 </el-button>
        <el-button type="primary" @click="next"> 下一步 </el-button>
        <el-button type="primary" @click="back"> 退回 </el-button>
        <el-button type="primary" @click="disable"> 作废 </el-button>
        <el-button type="primary" @click="passRound"> 传阅 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const contractData = reactive([
  {
    contractNo: 'L21C1566003'
  }
])
const historyData = reactive([
  {
    node: '开始',
    person: '张三',
    result: '通过',
    opinion: '同意',
    checkTime: '2024-01-02 16:24:52',
    taskTime: '2024-01-02 16:24:52'
  },
  {
    node: '直属领导',
    person: '张三',
    result: '通过',
    opinion: '同意',
    checkTime: '2024-01-02 16:24:52',
    taskTime: '2024-01-02 16:24:52'
  },
  {
    node: '部门负责人',
    person: '张三',
    result: '通过',
    opinion: '同意',
    checkTime: '2024-01-02 16:24:52',
    taskTime: '2024-01-02 16:24:52'
  },
  {
    node: '分管领导',
    person: '张三',
    result: '通过',
    opinion: '同意',
    checkTime: '2024-01-02 16:24:52',
    taskTime: '2024-01-02 16:24:52'
  }
])
const alertVisible = ref(false)
const title = ref<string>('抵押费用减免审批')
const open = () => {
  alertVisible.value = true
}
defineExpose({ open })
const print = () => {}
const collect = () => {}
const tempSave = () => {}
const submit = () => {}
const next = () => {}
const back = () => {}
const disable = () => {}
const passRound = () => {}
</script>
<style lang="scss" scoped>
.btn-top {
  position: absolute;
  top: 15px;
  right: 60px;
}
.type-title {
  margin: 20px 0;
  height: 14px;
  font-size: $base-font-size-default;
  font-weight: bolder;
  line-height: 14px;
}
</style>
