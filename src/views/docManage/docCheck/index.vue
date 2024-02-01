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
            clearable
            style="width: 100%"
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
        <el-button :icon="Select" type="primary" @click="approval"
          >发起审核</el-button
        >
        <Button
          ref="downloadButton"
          :icon="Download"
          name="下载"
          @onButtonFn="downloadData"
        />
        <el-button :icon="Plus" type="primary" @click="batchImport"
          >导入</el-button
        >
        <Button
          ref="downTemButton"
          :icon="Download"
          name="下载导入模版"
          @onButtonFn="downloadTemplate"
        />
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
        <span v-if="prop === 'approvalStatus'">{{
          getLabel('SYSTEM_DOCUMENT_APPROVAL_STATUS', row.approvalStatus)
        }}</span>
      </template>
      <template #action="{ row }">
        <el-button
          v-if="
            row.approvalStatus === 'TO_BE_SUBMITTED' ||
            row.approvalStatus === 'APPROVAL_REJECTION'
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
          @click="deleteItem(row.id)"
          >删除</el-button
        >
        <el-button
          v-if="
            row.approvalStatus === 'APPROVED' ||
            row.approvalStatus === 'IN_APPROVAL' ||
            row.approvalStatus === 'APPROVAL_REJECTION'
          "
          link
          type="primary"
          >查看审核记录</el-button
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

    <!-- 导入 -->
    <el-dialog
      class="import-model"
      v-model="importVisible"
      title="批量导入"
      width="550px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
    >
      <el-upload
        ref="upload"
        v-model:file-list="fileList"
        class="upload-demo"
        accept=".xlsx"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
      >
        <template #trigger>
          <el-button>选择文件</el-button>
        </template>
      </el-upload>
      <template #footer>
        <Button ref="importButton" name="导 入" @onButtonFn="submitUpload" />
      </template>
    </el-dialog>

    <!-- 审批弹窗 -->
    <ApprovalModel
      :visible="approvalDialogVisible"
      :documentNos="documentNos"
      :pathOptions="pathOptions"
      @closeApprovalModel="closeApprovalModel"
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
import { Plus, Download, Select } from '@element-plus/icons-vue'
import {
  ElMessageBox,
  ElMessage,
  genFileId,
  ElNotification
} from 'element-plus'
import { handleDownloadFile } from '@/utils'
import { useDictStore } from '@/store/dict'
import { CommonAPI, DocCheckAPI, SystemAPI } from '@/api'
import dayjs from 'dayjs'
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from 'element-plus'
import ApprovalModel from './approvalModel.vue'

const API = new DocCheckAPI()
const COMMONAPI = new CommonAPI()
const SYSTEMAPI = new SystemAPI()
const dictStore = useDictStore()
const dictTypes = ['SYSTEM_DOCUMENT_TYPE', 'SYSTEM_DOCUMENT_APPROVAL_STATUS']
const importButton = ref()
const downTemButton = ref()
const downloadButton = ref()
const state = reactive<StateType>({
  queryParams: {
    pageFlag: 1,
    pageNo: 1,
    pageSize: 10,
    documentName: '',
    documentType: '',
    approvalStatus: '',
    sourceSystem1: [],
    createTimeStart: dayjs().startOf('day').toString(),
    createTimeEnd: dayjs().endOf('day').toString()
  },
  pageTotal: 0,
  tableData: [],
  tableLoading: false,
  selectIdsArr: [],
  editModelVisible: false,
  editModelTitle: '',
  systemOptions: [],
  detailData: {},
  importVisible: false,
  pathOptions: [],
  approvalDialogVisible: false,
  documentNos: []
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
  detailData,
  importVisible,
  pathOptions,
  approvalDialogVisible,
  documentNos
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
  const arr = dictStore.dicts[source] || []
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
  queryParams.value.createTimeStart = dayjs().startOf('day').toString()
  queryParams.value.createTimeEnd = dayjs().endOf('day').toString()
  getListData()
}

const selectData = (selection: DocumentPageResponse[]) => {
  const result: string[] = []
  if (selection.length !== 0) {
    selection.forEach((i: DocumentPageResponse) => {
      result.push(`${i.id}&${i.approvalStatus}&${i.documentNo}`)
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

// 下载数据
const downloadData = () => {
  downloadButton.value.changeLoading(true)
  let params = {}
  if (selectIdsArr.value.length === 0) {
    const {
      pageFlag,
      documentName,
      documentType,
      approvalStatus,
      sourceSystem1,
      createTimeStart,
      createTimeEnd
    } = state.queryParams
    params = {
      pageFlag,
      documentName,
      documentType,
      approvalStatus,
      sourceSystem1,
      createTimeStart: createTimeStart
        ? dayjs(createTimeStart).format('YYYY-MM-DD HH:mm:ss')
        : '',
      createTimeEnd: createTimeEnd
        ? dayjs(createTimeEnd).format('YYYY-MM-DD HH:mm:ss')
        : ''
    }
  } else {
    const ids = selectIdsArr.value.map((i: string) => i.split('&')[0])
    params = { ids, pageFlag: 1 }
  }
  COMMONAPI.exportBySelect({
    bizType: 'SYSTEM_DOCUMENT_EXPORT',
    selectParams: JSON.stringify(params)
  })
    .then((res) => {
      if (res.data?.sync === 1) {
        const params = { fileCode: res.data.fileCode as string }
        COMMONAPI.downLoadFiles(params)
          .then((response) => {
            handleDownloadFile(response, res.data?.fileName)
            downloadButton.value.changeLoading(false)
          })
          .catch(() => {
            downloadButton.value.changeLoading(false)
          })
      } else {
        ElNotification({
          title: '下载失败',
          message: res.msg,
          type: 'error'
        })
        downloadButton.value.changeLoading(false)
      }
    })
    .catch((err: Error) => {
      downloadButton.value.changeLoading(false)
      throw err
    })
}

// 下载导入模版
const downloadTemplate = () => {
  downTemButton.value.changeLoading(true)
  const params = {
    businessCategory: 'MORTGAGE_TEMPLATE',
    businessSubcategory: 'DOCUMENT'
  }
  SYSTEMAPI.templateImportResult(params)
    .then((res) => {
      handleDownloadFile(res)
      downTemButton.value.changeLoading(false)
    })
    .catch(() => downTemButton.value.changeLoading(false))
}

const fileList = ref<UploadUserFile[]>([])
const upload = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const submitUpload = () => {
  if (fileList.value.length === 0) {
    ElMessage({
      type: 'error',
      message: '请先选择文件'
    })
    return
  }
  if (fileList.value[0].size === 0) {
    ElMessage({
      type: 'error',
      message: '不允许上传空文件'
    })
    return
  }
  importButton.value.changeLoading(true)
  const formData = new FormData()
  fileList.value.forEach((item) => {
    formData.append('file', item.raw as File)
  })
  formData.append('bizType', 'DOCUMENT')
  COMMONAPI.getAsyncImport(formData)
    .then((res) => {
      importButton.value.changeLoading(false)
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '导入成功'
        })
      }
      upload.value!.clearFiles()
      getListData()
      state.importVisible = false
    })
    .catch((err: Error) => {
      importButton.value.changeLoading(false)
      throw err
    })
}
const batchImport = () => {
  fileList.value = []
  state.importVisible = true
}

// 发起审批
const approval = () => {
  if (selectIdsArr.value.length === 0) {
    ElMessage({
      type: 'error',
      message: '请选择审批数据'
    })
    return
  }
  let num: number = 0
  const result: string[] = []
  selectIdsArr.value.forEach((i: string) => {
    const arr = i.split('&')
    result.push(arr[2])
    if (arr[1] === 'TO_BE_SUBMITTED') {
      num++
    }
  })
  state.documentNos = result
  if (num !== selectIdsArr.value.length) {
    ElMessage({
      type: 'error',
      message: '请选择待提交状态数据'
    })
    return
  }
  state.approvalDialogVisible = true
}

const closeModel = ({ type }: { type: string }) => {
  state.editModelTitle = ''
  state.editModelVisible = false
  if (type === 'update-close') {
    getListData()
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

// 获取审批路径
const getApprovalPath = async () => {
  const formData = new FormData()
  formData.append('businessCategory', 'DOCUMENT')
  const res = await COMMONAPI.getApprovalPath(formData)
  if (res && res.code === 200) {
    state.pathOptions = res.data || []
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
    state.tableData = res.data && res.data.list ? res.data.list : []
    state.pageTotal = res.data && res.data.total ? res.data.total : 0
  }
}

// 编辑
const editItem = (row: DocumentPageResponse) => {
  state.detailData = row
  state.editModelVisible = true
  state.editModelTitle = '编辑'
}

// 删除
const deleteItem = async (id: string) => {
  // 二次确认
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 调用删除接口
      const formData = new FormData()
      formData.append('id', id)
      API.deleteDocument(formData).then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          getListData()
        }
      })
    })
    .catch((err: Error) => {
      throw err
    })
}

// 点击表格中的文件可下载
const downloadFile = (name: string, code: string) => {
  COMMONAPI.downLoadFiles({ fileCode: code }).then((res) =>
    handleDownloadFile(res, name)
  )
}

// 审批弹窗回调
const closeApprovalModel = ({ type }: { type: string }) => {
  state.approvalDialogVisible = false
  state.documentNos = []
  if (type === 'update-close') {
    getListData()
  }
}

onMounted(() => {
  getDictTreeListData()
  getApprovalPath()
  getListData()
})
</script>

<style lang="scss" scoped></style>
