<template>
  <div>
    <!-- 搜索工作栏 -->
    <div ref="searchBoxRef">
      <!-- search bar -->
      <SearchBar
        v-model="queryParams"
        :searchConfig="searchConfig"
        :dictArray="dictTypes"
        @reset="reset"
        @search="searchHandler"
      >
        <template #sourceSystem1>
          <el-select
            v-model="queryParams.sourceSystem1"
            multiple
            collapse-tags
            collapse-tags-tooltip
            clearable
          >
            <el-option
              v-for="i in systemOptions"
              :key="(i.label as string)"
              :label="(i.label as string)"
              :value="(i.value as string)"
            />
          </el-select>
        </template>
      </SearchBar>
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
      <template #default="{ row, prop }">
        <el-link
          v-if="prop === 'fileName'"
          type="primary"
          :underline="false"
          @click="downloadFile(row.fileName, row.fileCode)"
          >{{ row.fileName }}</el-link
        >
        <span v-if="prop === 'documentType'">{{
          getLabel('SYSTEM_DOCUMENT_TYPE', row.documentType)
        }}</span>
        <span v-if="prop === 'sealType'">{{
          getLabel('SEAL_TYPE', row.sealType)
        }}</span>
        <span v-if="prop === 'approvalStatus'">{{
          getLabel('SYSTEM_DOCUMENT_APPROVAL_STATUS', row.approvalStatus)
        }}</span>
      </template>
      <template #action="{ row }">
        <el-button
          v-if="
            row.approvalStatus === 'TO_BE_SUBMITTED' ||
            row.approvalStatus === 'APPROVAL_REJECTION' ||
            row.approvalStatus === 'APPROVED'
          "
          link
          type="primary"
          @click="editItem(row)"
          >编辑</el-button
        >
        <el-button
          v-if="
            row.approvalStatus === 'TO_BE_SUBMITTED' ||
            row.approvalStatus === 'APPROVAL_REJECTION' ||
            row.approvalStatus === 'APPROVED'
          "
          link
          type="danger"
          >删除</el-button
        >
        <el-button
          v-if="
            row.approvalStatus === 'APPROVED' ||
            row.approvalStatus === 'IN_APPROVAL'
          "
          link
          type="primary"
          >查看审批记录</el-button
        >
        <el-button
          v-if="row.approvalStatus === 'APPROVAL_REJECTION'"
          link
          type="primary"
          >查看拒绝原因</el-button
        >
      </template>
    </Table>
    <!--  -->
    <EditModel
      :visible="editModelVisible"
      :title="editModelTitle"
      :detailData="detailData"
      :documentTypeOptions="dictStore.dicts['SYSTEM_DOCUMENT_TYPE']"
      :systemOptions="systemOptions"
      :sealOptions="dictStore.dicts['SEAL_TYPE']"
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
import { px2rem, handleDownloadFile } from '@/utils'
import { useDictStore } from '@/store/dict'
import { CommonAPI, DocCheckAPI } from '@/api'
import dayjs from 'dayjs'

const API = new DocCheckAPI()
const COMMONAPI = new CommonAPI()
const dictStore = useDictStore()
const dictTypes = ['SYSTEM_DOCUMENT_TYPE', 'SYSTEM_DOCUMENT_APPROVAL_STATUS']

const state = reactive<StateType>({
  queryParams: {
    pageFlag: 1,
    pageNo: 1,
    pageSize: 10,
    documentName: '',
    documentType: '',
    approvalStatus: '',
    sourceSystem1: [],
    createTimeStart: '',
    createTimeEnd: ''
  },
  pageTotal: 0,
  tableData: [],
  tableLoading: false,
  selectIdsArr: [],
  editModelVisible: false,
  editModelTitle: '',
  systemOptions: [],
  detailData: {}
})
const {
  queryParams,
  pageTotal,
  tableData,
  tableLoading,
  selectIdsArr,
  editModelVisible,
  editModelTitle,
  systemOptions,
  detailData
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

const getLabel = (source: string, value: string) => {
  let result = ''
  const arr = dictStore.dicts[source]
  arr.forEach((i) => {
    if (i.value === value) {
      result = i.label
    }
  })
  return result
}

// 查询
const searchHandler = () => {
  queryParams.value.pageNo = 1
  getListData()
}
// 重置
const reset = () => {
  queryParams.value.pageNo = 1
  queryParams.value.documentName = ''
  queryParams.value.documentType = ''
  queryParams.value.approvalStatus = ''
  queryParams.value.sourceSystem1 = []
  queryParams.value.createTimeStart = ''
  queryParams.value.createTimeEnd = ''
  getListData()
}

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
  getListData()
}
const handleCurrentChange = (page: number) => {
  queryParams.value.pageNo = page
  getListData()
}

const closeModel = ({ type }: { type: string }) => {
  if (type === 'update-close') {
    state.editModelTitle = ''
    state.editModelVisible = false
    getListData()
  } else {
    state.editModelTitle = ''
    state.editModelVisible = false
  }
}

const add = () => {
  state.detailData = {}
  state.editModelVisible = true
  state.editModelTitle = '新增'
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
const getListData = async () => {
  state.tableLoading = true
  const { documentName, createTimeStart, createTimeEnd, ...others } =
    queryParams.value
  const params = {
    documentName: documentName?.trim(),
    createTimeStart: createTimeStart
      ? dayjs(createTimeStart).format('YYYY-MM-DD HH:mm:ss')
      : '',
    createTimeEnd: createTimeEnd
      ? dayjs(createTimeEnd).format('YYYY-MM-DD HH:mm:ss')
      : '',
    ...others
  }
  const res = await API.getDocumentList(params)
  state.tableLoading = false
  if (res && res.code === 200) {
    state.tableData = res.data ? res.data.list : []
    state.pageTotal = res.data && res.data.total ? res.data.total : 0
  }
}

// 编辑
const editItem = (row: DocumentPageResponse) => {
  state.detailData = row
  state.editModelVisible = true
  state.editModelTitle = '编辑'
}

// 点击表格中的文件可下载
const downloadFile = (name: string, code: string) => {
  COMMONAPI.downLoadFiles({ fileCode: code }).then((res) =>
    handleDownloadFile(res, name)
  )
}

onMounted(() => {
  getDictTreeListData()
  getListData()
})
</script>

<style lang="scss" scoped></style>
