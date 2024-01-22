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
        <el-button :icon="Download" type="primary" @click="downloadData"
          >下载</el-button
        >
        <el-button :icon="Plus" type="primary" @click="batchImport"
          >导入</el-button
        >
        <el-button :icon="Download" type="primary" @click="downloadTemplate"
          >下载导入模版</el-button
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
        <span v-if="prop === 'status'"
          ><el-switch
            :value="row.status"
            :active-value="1"
            :inactive-value="0"
            @click="changeSwitch(row)"
        /></span>
      </template>
      <template #action="{ row }">
        <div class="opera-context">
          <el-button link type="primary" @click="editItem(row)">修改</el-button>
          <el-button link type="primary" @click="oconfigItem(row.documentNo)"
            >配置</el-button
          >
          <el-dropdown>
            <span class="el-dropdown-link">
              更多
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-button
                    link
                    type="primary"
                    @click="testItem(row.documentNo)"
                    >测试</el-button
                  >
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button
                    link
                    type="danger"
                    @click="deleteItem(row.id, row.hasAssociateData)"
                    >删除</el-button
                  >
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
    </Table>
    <!-- 修改文书弹窗 -->
    <EditModel
      :visible="editModelVisible"
      :title="editModelTitle"
      :detailData="detailData"
      :documentTypeOptions="dictStore.dicts['SYSTEM_DOCUMENT_TYPE']"
      :systemOptions="systemOptions"
      :sealOptions="dictStore.dicts['SEAL_TYPE']"
      @closeModel="closeModel"
    />

    <!-- 配置参数弹窗 -->
    <ConfigModel
      :configVisible="configVisible"
      :paramConfig="paramConfig"
      :paramTypeOptions="dictStore.dicts['DOCUMENT_PARAM_TYPE']"
      :yesOrNoOptions="dictStore.dicts['YESNO']"
      :documentNo="documentNo"
      :paramsConfigDetail="paramsConfigDetail"
      @closeModel="closeConfigModel"
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
        <el-button type="primary" @click="submitUpload">导入</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, toRefs, onMounted } from 'vue'
import SearchBar from '@/components/SearchBar/index.vue'
import Table from '@/components/Table/index.vue'
import EditModel from './editModel.vue'
import ConfigModel from './configModel.vue'
import { searchConfig, tableColumn } from './data'
import type { StateType } from './type'
import type { DocumentPageResponse } from '@/api/docCheck/types/response'
import { Plus, Download, ArrowDown } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage, genFileId } from 'element-plus'
import { handleDownloadFile } from '@/utils'
import { useDictStore } from '@/store/dict'
import { CommonAPI, DocCheckAPI } from '@/api'
import dayjs from 'dayjs'
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from 'element-plus'

const API = new DocCheckAPI()
const COMMONAPI = new CommonAPI()
const dictStore = useDictStore()
const dictTypes = [
  'SYSTEM_DOCUMENT_TYPE',
  'SYSTEM_DOCUMENT_APPROVAL_STATUS',
  'START_STOP_TASK_STATUS'
]

const state = reactive<StateType>({
  queryParams: {
    pageFlag: 2,
    pageNo: 1,
    pageSize: 10,
    documentName: '',
    documentType: '',
    status: null,
    sourceSystem1: [],
    // createTimeStart: '',
    // createTimeEnd: ''
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
  configVisible: false,
  paramConfig: [],
  documentNo: '',
  paramsConfigDetail: []
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
  configVisible,
  paramConfig,
  documentNo,
  paramsConfigDetail
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
  queryParams.value.status = null
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
const downloadData = async () => {
  state.tableLoading = true
  let params = {}
  if (selectIdsArr.value.length === 0) {
    const {
      pageFlag,
      documentName,
      documentType,
      status,
      sourceSystem1,
      createTimeStart,
      createTimeEnd
    } = state.queryParams
    params = {
      pageFlag,
      documentName,
      documentType,
      status,
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
    params = { ids }
  }
  const res = await COMMONAPI.exportBySelect({
    bizType: 'SYSTEM_DOCUMENT_EXPORT',
    selectParams: JSON.stringify(params)
  })
  if (res && res.code === 200) {
    if (res.data?.sync === 1) {
      const params = { fileCode: res.data.fileCode as string }
      COMMONAPI.downLoadFiles(params).then((res) =>
        handleDownloadFile(res, '文书审核.xlsx')
      )
    }
  }
  state.tableLoading = false
}

// 下载导入模版
const downloadTemplate = () => {
  const params = {
    bizType: 'DOCUMENT'
  }
  COMMONAPI.getDownLoadTemplate(params).then((res) => {
    handleDownloadFile(res)
  })
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
  const formData = new FormData()
  fileList.value.forEach((item) => {
    formData.append('file', item.raw as File)
  })
  formData.append('bizType', 'DOCUMENT')
  COMMONAPI.getAsyncImport(formData)
    .then((res) => {
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
      throw err
    })
}
const batchImport = () => {
  fileList.value = []
  state.importVisible = true
}

// 关闭修改弹窗回调
const closeModel = ({ type }: { type: string }) => {
  state.editModelTitle = ''
  state.editModelVisible = false
  if (type === 'update-close') {
    getListData()
  }
}

// 关闭配置弹窗回调
const closeConfigModel = ({ type }: { type: string }) => {
  state.configVisible = false
  if (type === 'update-close') {
    getListData()
  }
}

// 获取部门
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

// 获取文书参数配置
const getDocumentParamConfig = async () => {
  const res = await API.getDocumentParamConfig({})
  if (res && res.code === 200) {
    state.paramConfig = res.data || []
  }
}

// 获取列表数据
const getListData = async () => {
  state.tableLoading = true
  const { documentName, status, createTimeStart, createTimeEnd, ...others } =
    queryParams.value
  const params = {
    documentName: documentName?.trim(),
    status: status ? Number(status) : null, // 类型？？？
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

// 删除
const deleteItem = async (id: string, hasAssociateData: boolean | null) => {
  if (hasAssociateData) {
    ElMessage({
      type: 'error',
      message: '已有关联数据，无法删除'
    })
    return
  }
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

// 测试
const testItem = (documentNo: string) => {
  state.tableLoading = true
  const formData = new FormData()
  formData.append('documentNo', documentNo + '')
  API.testDocument(formData)
    .then((res) => {
      state.tableLoading = false
      handleDownloadFile(res, `${documentNo}.docx`)
    })
    .catch(() => {
      state.tableLoading = false
    })
}

// 配置
const oconfigItem = async (documentNo: string) => {
  state.tableLoading = true
  const formData = new FormData()
  formData.append('documentNo', documentNo)
  const res = await API.getDocumentParam(formData)
  state.tableLoading = false
  if (res && res.code === 200) {
    state.paramsConfigDetail = res.data || []
    state.documentNo = documentNo
    state.configVisible = true
  }
}

// 点击表格中的文件可下载
const downloadFile = (name: string, code: string) => {
  COMMONAPI.downLoadFiles({ fileCode: code }).then((res) =>
    handleDownloadFile(res, name)
  )
}

// 修改文书状态
const changeSwitch = async (row: DocumentPageResponse) => {
  if (row.hasAssociateData) {
    ElMessage({
      type: 'error',
      message: '已有关联数据，无法修改状态'
    })
    return
  }
  const formData = new FormData()
  formData.append('id', row.id + '')
  formData.append('status', row.status === 1 ? '0' : '1')
  await API.editStatus(formData)
  getListData()
}

onMounted(() => {
  getDictTreeListData()
  getListData()
  getDocumentParamConfig()
})
</script>

<style lang="scss" scoped>
.opera-context {
  display: flex;
  justify-content: space-around;
  align-items: center;
  > .el-dropdown {
    cursor: pointer;
  }
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  color: var(--el-color-primary);
  cursor: pointer;
}
</style>
