<template>
  <div>
    <!-- 搜索工作栏 -->
    <div class="doc-check-container" ref="searchBoxRef">
      <!-- search bar -->
      <SearchBar
        v-model="queryParams"
        :searchConfig="searchConfig"
        @reset="reset"
        @search="searchHandler"
      />
    </div>
    <el-divider border-style="dashed" />
    <!-- 表格 -->
    <Table
      :data="tableData"
      :columnConfig="tableColumn"
      :loading="tableLoading"
      :height="tableHeight"
      :isSelected="true"
      row-key="id"
      :page-total="pageTotal"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @selection-change="selectData"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #btnsBox>
        <el-button :icon="Plus" type="primary" @click="add">新增</el-button>
        <el-button type="primary">审批</el-button>
        <el-button type="primary">发起审核</el-button>
        <el-button :icon="Download" type="primary">下载</el-button>
        <el-button :icon="Plus" type="primary">导入</el-button>
        <el-button :icon="Download" type="primary">下载导入模版</el-button>
      </template>
      <template #selection>
        <el-table-column
          type="selection"
          :width="px2rem('40px')"
          :selectable="() => true"
          :fixed="true"
          align="center"
        />
      </template>
      <template #action>
        <el-button link type="primary">编辑</el-button>
        <el-button link type="danger">删除</el-button>
        <el-button link type="primary">发起审核</el-button>
        <el-button link type="primary">上传附件</el-button>
        <el-button link type="primary">查看审批记录</el-button>
        <el-button link type="primary">查看拒绝原因</el-button>
      </template>
    </Table>
    <!--  -->
    <EditModel
      :visible="editModelVisible"
      :title="editModelTitle"
      :documentTypeOptions="documentTypeOptions"
      :systemOptions="systemOptions"
      :sealOptions="sealOptions"
      @closeModel="closeModel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, toRefs, onMounted } from 'vue'
import SearchBar from '@/components/SearchBar/index.vue'
import Table from '@/components/Table/index.vue'
import EditModel from './editModel.vue'
import { searchConfig, tableColumn } from './data'
import type { StateType } from './type'
import type { DocumentPageResponse } from '@/api/docCheck/types/response'
import { Plus, Download } from '@element-plus/icons-vue'
import { px2rem } from '@/utils'
import { CommonAPI } from '@/api'
const COMMONAPI = new CommonAPI()

const state = reactive<StateType>({
  queryParams: {
    pageFlag: 1,
    pageNo: 1,
    pageSize: 10
  },
  pageTotal: 0,
  tableData: [],
  tableLoading: false,
  selectIdsArr: [],
  editModelVisible: false,
  editModelTitle: '',
  documentTypeOptions: [],
  systemOptions: [],
  sealOptions: []
})
const {
  queryParams,
  pageTotal,
  tableData,
  tableLoading,
  selectIdsArr,
  editModelVisible,
  editModelTitle,
  documentTypeOptions,
  systemOptions,
  sealOptions
} = toRefs(state)

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

const selectData = (selection: DocumentPageResponse[]) => {
  const result: string[] = []
  if (selection.length !== 0) {
    selection.forEach((i: DocumentPageResponse) => {
      result.push(`${i.id}`)
    })
  }
  state.selectIdsArr = result
  console.log(selectIdsArr)
}

const handleSizeChange = (size: number) => {
  queryParams.value.pageSize = size
  queryParams.value.pageNo = 1
}
const handleCurrentChange = (page: number) => {
  queryParams.value.pageNo = page
}

const closeModel = ({ type }: { type: string }) => {
  if (type === 'update-close') {
    state.editModelTitle = ''
    state.editModelVisible = false
  }
}

const add = () => {
  state.editModelVisible = true
  state.editModelTitle = '新增'
}

const getDicList = async () => {
  const res = await COMMONAPI.getDictsList({
    dictTypes: ['SYSTEM_DOCUMENT_TYPE', 'SEAL_TYPE']
  })
  console.log(res)
  if (res && res.code === 200) {
    state.documentTypeOptions = res.data?.SYSTEM_DOCUMENT_TYPE
      ? res.data.SYSTEM_DOCUMENT_TYPE
      : []
    state.sealOptions = res.data?.SEAL_TYPE ? res.data.SEAL_TYPE : []
  }
}
const getDictTreeListData = async () => {
  const params = {
    dictType: 'SOURCE_SYSTEM'
  }
  const res = await COMMONAPI.getDictTreeList(params)
  if (res && res.code === 200) {
    if (res.data && res.data.length) {
      if (res && res.code === 200) {
        state.systemOptions = res.data ? res.data : []
      }
    }
  }
}

onMounted(() => {
  getDicList()
  getDictTreeListData()
})
</script>

<style lang="scss" scoped></style>
