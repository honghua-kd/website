<template>
  <div>
    <div :ref="searchBoxRef">
      <el-tabs v-model="tabActiveName" class="demo-tabs">
        <el-tab-pane label="待分配" name="assign" />
        <el-tab-pane label="已分配" name="assigned" />
      </el-tabs>
      <SearchField
        :data="
          tabActiveName === 'assign' ? searchAssignConfig : searchAssignedConfig
        "
        v-model="queryParams"
        :labelWidth="100"
        :visibleRows="2"
        :colNum="4"
        @search="searchHandler"
        @reset="reset"
      >
        <template #area>
          <AreaCascader
            :value="queryParams.areaCodeparams"
            :multiple="true"
            @changeAreaData="changeAreaData"
          />
        </template>
        <template #assign>
          <el-row :gutter="20" style="width: 100%">
            <el-col :span="12">
              <el-select style="width: 100%" placeholder="请选择"></el-select>
            </el-col>
            <el-col :span="12"
              ><el-input placeholder="请输入"></el-input
            ></el-col>
          </el-row>
        </template>
      </SearchField>
    </div>
    <el-divider border-style="dashed" />
    <Table
      :loading="tableLoading"
      :data="tableData"
      :columnConfig="
        tabActiveName === 'assign' ? assignTableColumn : assignedTableColumn
      "
      :height="tableHeight"
      :page-total="pageTotal"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @selection-change="selectData"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #btnsBox>
        <template v-if="tabActiveName === 'assign'"
          ><el-button
            v-for="i in assignBtnList"
            :key="i.name"
            :type="i.type"
            :icon="i.icon"
            :loading="btnLoading[i.value]"
            @click="action(i.value)"
            >{{ i.name
            }}<span v-if="i.value === 'autoDist'">（20） </span></el-button
          ></template
        >
        <template v-if="tabActiveName === 'assigned'"
          ><el-button
            v-for="i in assignedBtnList"
            :key="i.name"
            :type="i.type"
            :icon="i.icon"
            @click="action(i.value)"
            >{{ i.name }}</el-button
          ></template
        >
      </template>
      <template #selection>
        <el-table-column
          type="selection"
          :width="40"
          :selectable="() => true"
          :fixed="true"
          align="center"
        />
      </template>
      <template #default="{ prop }">
        <template v-if="prop === 'handle'">
          <el-dropdown>
            <div class="el-dropdown-link">
              <div class="num">2</div>
              <div class="text">请尽快处理...</div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>反馈</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </template>
      <template #action>
        <el-button link type="primary">重新发起</el-button>
        <el-button link type="primary" @click="goDetail">详情</el-button>
      </template>
    </Table>
    <!-- 新增抵押任务 -->
    <AddTaskModel ref="addTaskModel" />
    <!-- 修改粉配方 -->
    <EDistribution ref="eDistributionModel" />
    <!-- 修改抵押时效 -->
    <MortTimeModel ref="mortTimeModel" />
    <!-- 确认分配 -->
    <ConfirmDistModel ref="confirmDistModel" />
    <!-- 修改抵押类型 -->
    <EMortTypeModel ref="eMortTypeModel" />
    <!-- 退回抵押任务 -->
    <BackMortModel ref="backMortModel" />
    <!-- 取消 -->
    <CancelModel ref="cancelModel" />
    <!-- 发送短信 -->
    <SendMessageModel ref="sendMessageModel" />
    <!-- 转派 -->
    <TransferModel ref="transferModel" />
    <!-- 完成抵押 -->
    <CompleteMortModel ref="completeMortModel" />
    <!-- 移交登记证书 -->
    <TransferDocModel ref="transferDocModel" />
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, watch, ref, computed } from 'vue'
// import type { StateType } from './type'
import {
  searchAssignConfig,
  searchAssignedConfig,
  assignTableColumn,
  assignedTableColumn,
  assignBtnList,
  assignedBtnList
} from './data'
import dayjs from 'dayjs'
import AddTaskModel from './components/addTaskModel.vue'
import EDistribution from './components/editDistribution.vue'
import MortTimeModel from './components/mortTimeModel.vue'
import ConfirmDistModel from './components/confirmDistModel.vue'
import EMortTypeModel from './components/editMortTypeModel.vue'
import BackMortModel from './components/backMortModel.vue'
import CancelModel from './components/cancelModel.vue'
import SendMessageModel from './components/sendMessageModel.vue'
import TransferModel from './components/transferModel.vue'
import CompleteMortModel from './components/completeMortModel.vue'
import TransferDocModel from './components/transferDocModel.vue'

const state = reactive({
  tabActiveName: 'assign',
  tableData: [{}],
  tableLoading: false,
  pageTotal: 0
})
const queryParams = reactive({
  createTime: [
    dayjs().startOf('day').toString(),
    dayjs().endOf('day').toString()
  ],
  completeTime: [
    dayjs().startOf('day').toString(),
    dayjs().endOf('day').toString()
  ],
  areaCodeparams: [],
  pageSize: 10,
  pageNo: 1
})
const { tabActiveName, tableData, tableLoading, pageTotal } = toRefs(state)
const addTaskModel = ref()
const eDistributionModel = ref()
const mortTimeModel = ref()
const confirmDistModel = ref()
const eMortTypeModel = ref()
const backMortModel = ref()
const cancelModel = ref()
const sendMessageModel = ref()
const transferModel = ref()
const completeMortModel = ref()
const transferDocModel = ref()

watch(
  tabActiveName,
  (newValue) => {
    console.log(newValue)
  },
  { immediate: true }
)

// 表格最大高度
const searchBoxRef = ref()
const tableHeight = computed(() => {
  if (searchBoxRef.value?.clientHeight) {
    const height = Number(
      document.documentElement.clientHeight -
        200 -
        searchBoxRef.value?.clientHeight
    )
    return height
  } else {
    const height = Number(document.documentElement.clientHeight - 200)
    return height
  }
})

// 查询
const searchHandler = () => {}

// 重置
const reset = () => {}

// 选择地区
const changeAreaData = () => {}

// 表格数据选择
const selectData = () => {}

// 分页条数改变
const handleSizeChange = () => {}

// 翻页
const handleCurrentChange = () => {}

// 前往详情
const goDetail = () => {}

// 新增
const add = () => {
  addTaskModel.value.open()
}

// 修改分配方
const editDistribution = () => {
  eDistributionModel.value.open()
}

// 修改抵押时效
const mortTime = () => {
  mortTimeModel.value.open()
}

// 确认分配
const confirmDist = () => {
  confirmDistModel.value.open()
}

// 修改抵押类型
const mortType = () => {
  eMortTypeModel.value.open()
}

// 退回抵押任务
const backMort = () => {
  backMortModel.value.open()
}

// 下载
const download = () => {}

// 执行自动分配结果
const autoDist = () => {}

// 取消
const cancel = () => {
  cancelModel.value.open()
}

// 发送短信
const sendMessage = () => {
  sendMessageModel.value.open()
}

// 转派
const transfer = () => {
  transferModel.value.open()
}

// 完成抵押
const completeMort = () => {
  completeMortModel.value.open()
}

// 移交登记证书
const transferDoc = () => {
  transferDocModel.value.open()
}

// 催办
const hurry = () => {}

// 新增办理进度
const addProgress = () => {}

// 导入办理进度
const importProgress = () => {}

// 按钮函数映射
const BTNFUNCTION: {
  [T: string]: () => void
} = {
  add,
  editDistribution,
  mortTime,
  confirmDist,
  mortType,
  backMort,
  download,
  autoDist,
  cancel,
  sendMessage,
  transfer,
  completeMort,
  transferDoc,
  hurry,
  addProgress,
  importProgress
}

// 按钮loading
const btnLoading = reactive<Record<string, boolean>>({
  download: false,
  autoDist: false
})

// 操作
const action = (value: string) => {
  BTNFUNCTION[value]()
}
</script>
<style lang="scss" scoped>
.el-dropdown-link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px 0 2px;
  width: 100%;
  height: 30px;
  font-weight: bold;
  border-radius: 30px;
  color: #ffffff;
  background-color: #f56c6c;
  line-height: 30px;
  cursor: pointer;
  .num {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
    width: fit-content;
    min-width: 24px;
    height: 24px;
    font-weight: bold;
    border-radius: 24px;
    color: #f56c6c;
    background-color: #ffffff;
  }
}
</style>
