<template>
  <div>
    <el-form :model="queryParams" ref="formRef" class="scan-form">
      <div class="scan-search-bar">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="材料模版名称:" prop="templateName">
              <el-input
                v-model="queryParams.templateName"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市:" prop="provinceCode">
              <AreaCasder :value="cityForm" @changeAreaData="changeAreaData" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="适用业务类型:" prop="applicableType">
              <el-select
                v-model="queryParams.applicableType"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in applicableType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="文书模版编号:" prop="templateCode">
              <el-input
                v-model="queryParams.templateCode"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="状态:" prop="status">
              <el-select
                v-model="queryParams.status"
                clearable
                placeholder="请选择"
                @change="handleTypeChange"
              >
                <el-option
                  v-for="item in TaskStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="search-btn">
        <el-button type="primary" :icon="Search" @click="searchHandler"
          >查询</el-button
        >
        <el-button :icon="Refresh" @click="reset">重置</el-button>
      </div>
    </el-form>
    <el-row :gutter="8" style="margin: 10px 0">
      <el-tooltip content="新增" placement="top-start">
        <el-button type="primary" :icon="Plus" @click="addHandler">
          新增
        </el-button>
      </el-tooltip>
      <el-tooltip content="删除" placement="top-start">
        <el-button :icon="Delete" @click="handleDelect"> 删除 </el-button>
      </el-tooltip>
      <el-tooltip content="下载" placement="top-start">
        <el-button
          :icon="Download"
          @click="downloadTemplate"
          :loading="downBtmLoading"
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
    </el-row>
    <Table
      :data="tableData"
      :loading="tableLoading"
      :columnConfig="tableConfig"
      :isSelected="true"
      :page-total="pageTotal"
      :setColumnEnable="true"
      row-key="id"
      :tree-props="{ children: 'target' }"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @selection-change="selectionChangeHandler"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #column-switch="{ row, prop }">
        <el-switch
          v-model="row[prop]"
          :active-value="1"
          :inactive-value="0"
          @click="switchHandler(row.id, row[prop])"
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
    >
      <el-upload
        ref="upload"
        v-model:file-list="fileList"
        class="upload-demo"
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
    <OperDialog ref="operRef" @getList="getList" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref, onMounted } from 'vue'
import {
  Search,
  Refresh,
  Plus,
  Download,
  Delete
} from '@element-plus/icons-vue'
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from 'element-plus'
import { ElForm, ElMessage, ElMessageBox, genFileId } from 'element-plus'
import type { getTemplatePageRequest } from '@/api/docCheck/types/request.ts'
import type { MortgageDocumentVO } from '@/api/docCheck/types/response.ts'
import { DocCheckAPI, CommonAPI } from '@/api'
import type { DictItem } from '@/api'
import type { ITableConfigProps } from '@/components/Table/type'
import AreaCasder from '@/components/AreaCascader/index.vue'
import OperDialog from '@/views/docManage/templateManage/components/operDialog.vue'
import { handleDownloadFile } from '@/utils'

const applicableType: Ref<DictItem[]> = ref([])
const TaskStatus: Ref<DictItem[]> = ref([])
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

onMounted(() => {
  getDicts()
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
const getDicts = () => {
  const dictTypes = [
    'DOCUMENT_TEMPLATE_APPLICABLE_TYPE',
    'START_STOP_TASK_STATUS'
  ]
  const params = {
    dictTypes
  }
  CommonApi.getDictsList(params)
    .then((res) => {
      if (res && res.code === 200) {
        applicableType.value = res?.data
          ?.DOCUMENT_TEMPLATE_APPLICABLE_TYPE as DictItem[]
        TaskStatus.value = res?.data?.START_STOP_TASK_STATUS as DictItem[]
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
const getList = async () => {
  API.getDocumentTemplatePage(queryParams).then((res) => {
    if (res.code === 200 && res.data) {
      tableData.splice(0, tableData.length)
      tableData.push(...(res?.data?.list || []))
      // tableData.value = res.data.list
      pageTotal.value = res?.data?.total || 0
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
const switchHandler = (id: string, status: string) => {
  const formData = new FormData()
  formData.append('id', id)
  formData.append('status', status)
  API.updateDocumentTemplateStatus(formData).then((res) => {
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '操作成功'
      })
      getList()
    }
  })
}
const handleTypeChange = () => {
  console.log('object')
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
    selectParams: JSON.stringify(queryParams),
    bizType: 'MORTGAGE_DOCUMENT_TEMPLATE_EXPORT'
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
  operRef.value.open('edit', row)
}
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
    width: 120,
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
