<template>
  <div>
    <div class="scan-search-container" ref="searchBoxRef">
      <SearchBar
        v-model="queryParams"
        :dictArray="dictTypes"
        :searchConfig="searchConfig"
        :labelWidth="'120px'"
        @reset="reset"
        @search="searchHandler"
      >
        <template #businessCategory>
          <AreaCasder :value="cityForm" @changeAreaData="changeAreaData" />
        </template>
      </SearchBar>
    </div>
    <el-divider border-style="dashed" />
    <Table
      :data="tableData"
      :loading="tableLoading"
      :columnConfig="tableConfig"
      :isSelected="true"
      :height="tableHeight"
      :page-total="pageTotal"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @selection-change="selectionChangeHandler"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #btnsBox>
        <el-tooltip content="新增" placement="top-start">
          <el-button type="primary" :icon="Plus" @click="addHandler">
            新增
          </el-button>
        </el-tooltip>
        <el-tooltip content="删除" placement="top-start">
          <el-button type="primary" :icon="Delete" @click="handleDelect">
            删除
          </el-button>
        </el-tooltip>
        <el-tooltip content="下载" placement="top-start">
          <el-button
            :icon="Download"
            @click="downloadTemplate"
            :loading="downBtmLoading"
            type="primary"
          >
            下载
          </el-button>
        </el-tooltip>
        <el-tooltip content="导入" placement="top-start">
          <el-button type="primary" :icon="Download" @click="handleExpost">
            导入
          </el-button>
        </el-tooltip>
        <el-tooltip content="下载导入模版" placement="top-start">
          <el-button type="primary" :icon="Download" @click="downTemplate">
            下载导入模版
          </el-button>
        </el-tooltip>
      </template>
      <template #default="{ row, prop }">
        <span v-if="prop === 'applicableType'">{{
          getLabel('DOCUMENT_TEMPLATE_APPLICABLE_TYPE', row.applicableType)
        }}</span>
      </template>
      <template #column-switch="{ row, prop }">
        <el-switch
          :value="row[prop]"
          :active-value="1"
          :inactive-value="0"
          @click="switchHandler(row.id, row)"
        />
      </template>
      <template #action="scope">
        <div class="opera-context">
          <el-button link type="primary" @click="editHandler(scope.row)">
            修改
          </el-button>
        </div>
      </template>
    </Table>
    <!-- 导入 -->
    <el-dialog
      class="import-model"
      v-model="importVisible"
      title="批量导入"
      width="550px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
      @open="handleFile"
    >
      <el-upload
        ref="upload"
        v-model:file-list="fileList"
        class="upload-demo"
        :limit="1"
        accept=".xlsx"
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
    <OperDialog ref="operRef" @getList="getList" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref, onMounted, computed } from 'vue'
import { Plus, Download, Delete } from '@element-plus/icons-vue'
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from 'element-plus'
import { ElMessage, ElMessageBox, genFileId } from 'element-plus'
import type { getTemplatePageRequest } from '@/api/docCheck/types/request.ts'
import type { MortgageDocumentVO } from '@/api/docCheck/types/response.ts'
import { DocCheckAPI, CommonAPI } from '@/api'
import type { ITableConfigProps } from '@/components/Table/type'
import AreaCasder from '@/components/AreaCascader/index.vue'
import OperDialog from './components/operDialog.vue'
import { handleDownloadFile } from '@/utils'
import type { ISearchUnit } from '@/components/SearchBar/type'
import SearchBar from '@/components/SearchBar/index.vue'
import Table from '@/components/Table/index.vue'
import { useDictStore } from '@/store/dict'

const tableData = reactive<MortgageDocumentVO[]>([])
const tableLoading: Ref<boolean> = ref(false)
const selectData: Ref<MortgageDocumentVO[]> = ref([])
const pageTotal: Ref<number> = ref(0)
const cityForm: Ref<string[]> = ref([])
const downBtmLoading: Ref<boolean> = ref(false)
const CommonApi = new CommonAPI()
const API = new DocCheckAPI()
const importVisible: Ref<boolean> = ref(false)
const fileList = ref<UploadUserFile[]>([])
const dictTypes = [
  'DOCUMENT_TEMPLATE_APPLICABLE_TYPE',
  'START_STOP_TASK_STATUS'
]
const dictStore = useDictStore()

onMounted(() => {
  getList()
})
const queryParams = reactive<getTemplatePageRequest>({
  pageNo: 1,
  pageSize: 10,
  templateCode: '',
  templateName: '',
  applicableType: '',
  provinceCode: '',
  cityCode: '',
  status: ''
})
const searchHandler = () => {
  queryParams.pageNo = 1
  getList()
}
const reset = () => {
  queryParams.pageNo = 1
  queryParams.pageSize = 10
  queryParams.templateCode = ''
  queryParams.templateName = ''
  queryParams.applicableType = ''
  queryParams.provinceCode = ''
  queryParams.cityCode = ''
  queryParams.status = ''
  cityForm.value = []
  getList()
}

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

const getList = async () => {
  tableLoading.value = true
  API.getDocumentTemplatePage(queryParams).then((res) => {
    if (res.code === 200 && res.data) {
      tableData.splice(0, tableData.length)
      tableData.push(...(res?.data?.list || []))
      // tableData.value = res.data.list
      pageTotal.value = res?.data?.total || 0
      tableLoading.value = false
    }
  })
}
const selectionChangeHandler = (item: MortgageDocumentVO[]) => {
  selectData.value.splice(0, selectData.value.length)
  selectData.value.push(...item)
}
// 分页
const handleCurrentChange = (val: number) => {
  queryParams.pageNo = val
  getList()
}
// 页面条数改变
const handleSizeChange = (val: number) => {
  queryParams.pageSize = val
  getList()
}
const downTemplate = () => {
  const params = {
    bizType: 'DOCUMENT_TEMPLATE'
  }
  CommonApi.getDownLoadTemplate(params)
    .then((res) => {
      handleDownloadFile(res)
    })
    .catch((err: Error) => {
      throw err
    })
}
const handleExpost = () => {
  importVisible.value = true
}
const upload = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const handleFile = () => {
  fileList.value = [] as UploadUserFile[]
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
      message: '不许上传空文件'
    })
    return
  }

  console.log(fileList.value)
  const formData = new FormData()
  fileList.value.forEach((item) => {
    formData.append('file', item.raw as File)
  })
  formData.append('bizType', 'DOCUMENT_TEMPLATE')
  CommonApi.getAsyncImport(formData)
    .then((res) => {
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '导入成功'
        })
      }
      upload.value!.clearFiles()
      getList()
      importVisible.value = false
    })
    .catch((err: Error) => {
      throw err
    })
}
const changeAreaData = ({
  provinceCode,
  cityCode
}: {
  provinceCode: string
  cityCode: string
}) => {
  queryParams.provinceCode = provinceCode
  //   editParams.provinceName = provinceName
  queryParams.cityCode = cityCode
  //   editParams.cityName = cityName
  if (provinceCode === '' && cityCode === '') {
    cityForm.value = []
  } else {
    cityForm.value = [provinceCode, cityCode]
  }
}
const switchHandler = async (id: string, row: MortgageDocumentVO) => {
  const formData = new FormData()
  formData.append('id', id)
  formData.append('status', row.status === 1 ? '0' : '1')
  await API.updateDocumentTemplateStatus(formData)
  getList()
}
const handleDelect = () => {
  if (selectData.value.length === 0) {
    ElMessage({
      type: 'error',
      message: '请勾选数据'
    })
    return
  }
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      const ids = selectData.value.map((el: MortgageDocumentVO) => {
        return el.id
      })
      API.editDocumentTemplateDelete(ids).then((res) => {
        if (res.code === 200) {
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
          getList()
        }
      })
    })
    .catch(() => {})
}
const downloadTemplate = () => {
  const params = {
    selectParams: '' as string,
    bizType: 'MORTGAGE_DOCUMENT_TEMPLATE_EXPORT'
  }
  if (selectData.value.length > 0) {
    const ids = selectData.value.map((el) => {
      return el.id
    })
    params.selectParams = JSON.stringify({ ids: ids })
  } else {
    params.selectParams = JSON.stringify(queryParams)
  }
  downBtmLoading.value = true
  CommonApi.exportBySelect(params)
    .then((res) => {
      if (res && res.code === 200) {
        if (res?.data?.sync === 1) {
          const params = {
            fileCode: res?.data?.fileCode as string
          }
          CommonApi.downLoadFiles(params)
            .then((dRes) => {
              downBtmLoading.value = false
              handleDownloadFile(dRes, '文书模板列表.xlsx')
              ElMessage({
                type: 'success',
                message: '操作成功'
              })
            })
            .catch((err: Error) => {
              downBtmLoading.value = false
              throw err
            })
        } else if (res?.data?.sync === 0) {
          downBtmLoading.value = false
          ElMessage({
            type: 'success',
            message: '导出任务已经产生，前面有任务待处理，请至我的下载中查看'
          })
        }
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
const operRef = ref()
const addHandler = () => {
  operRef.value.open('add')
}
const editHandler = (row: MortgageDocumentVO) => {
  operRef.value.open('edit', JSON.parse(JSON.stringify(row)))
}
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
const searchConfig: ISearchUnit[] = [
  [
    {
      compType: 'el-input',
      colSpan: 6,
      label: '材料模版名称',
      prop: 'templateName',
      placeholder: '请输入材料模版名称'
    },
    {
      compType: 'el-cascader',
      colSpan: 6,
      label: '城市',
      prop: 'businessCategory',
      placeholder: '请选择城市',
      slotName: 'businessCategory'
    },
    {
      compType: 'el-select',
      colSpan: 6,
      label: '适用业务类型',
      prop: 'sendStatus',
      placeholder: '请选适用业务类型',
      options: 'DOCUMENT_TEMPLATE_APPLICABLE_TYPE'
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '文书模版编号',
      prop: 'templateCode',
      placeholder: '请输入文书模版编号'
    }
  ],
  [
    {
      compType: 'el-select',
      colSpan: 6,
      label: '状态',
      prop: 'status',
      placeholder: '请选状态',
      options: 'START_STOP_TASK_STATUS'
    }
  ]
]
const tableConfig: ITableConfigProps[] = [
  {
    label: '文书模版编号',
    prop: 'templateCode',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '材料模版名称',
    prop: 'templateName',
    width: 120,
    align: 'left',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '适用任务类型',
    prop: 'applicableType',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '省份',
    prop: 'provinceName',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '城市',
    prop: 'cityName',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '渠道商/办事处',
    prop: 'agencyName',
    width: 120,
    align: 'left',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '抵押主体',
    prop: 'mortgageSubject',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '优先级',
    prop: 'priority',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '文书清单',
    prop: 'documentNames',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '状态',
    prop: 'status',
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: true,
    slotName: 'column-switch'
  },
  {
    label: '备注',
    prop: 'remark',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '创建人',
    prop: 'creatorName',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '最后更新人',
    prop: 'updaterName',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '操作',
    prop: 'action',
    width: 120,
    type: 'action',
    align: 'center',
    fixed: 'right'
  }
]
</script>

<style scoped>
.scan-form {
  display: flex;
  align-items: flex-end;
  width: 100%;
}
.scan-search-bar {
  padding: 6px 10px;
  width: calc(100% - 216px);
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  color: #1890ff;
  cursor: pointer;
}
.opera-context {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
