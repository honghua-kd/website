<template>
  <div>
    <el-dialog
      v-model="alertVisible"
      :title="title"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="50%"
      top="10vh"
    >
      <el-table
        v-if="title === '审批记录'"
        :data="tableData"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        border
        row-key="id"
      >
        <el-table-column label="审批节点" prop="node" align="center" />
        <el-table-column label="审批人" prop="person" align="center" />
        <el-table-column label="审批结果" prop="result" align="center" />
        <el-table-column label="审批意见" prop="opinion" align="center" />
        <el-table-column label="审批时间" prop="checkTime" align="center" />
        <el-table-column label="任务到达时间" prop="taskTime" align="center" />
      </el-table>
      <el-timeline v-if="title === '操作记录'">
        <el-timeline-item
          v-for="(item, index) in routes"
          :key="index"
          :timestamp="item.name + '&nbsp  ' + item.time"
          placement="top"
        >
          {{ item.content }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const tableData = reactive([
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
const routes = reactive([
  {
    name: '姜领',
    time: '2023-12-12  12:21',
    content: '转派给 恒运-业务运营部-102345张三'
  },
  {
    name: '姜领',
    time: '2023-12-12  12:21',
    content: '转派给 恒运-业务运营部-102345张三'
  },
  {
    name: '姜领',
    time: '2023-12-12  12:21',
    content: '转派给 恒运-业务运营部-102345张三'
  }
])
const alertVisible = ref(false)
const title = ref<string>('')
const open = (type: string) => {
  alertVisible.value = true
  if (type === 'operation') {
    title.value = '操作记录'
  } else if (type === 'approve') {
    title.value = '审批记录'
  }
}
defineExpose({ open })
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
