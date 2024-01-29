<template>
  <div class="page-notice-center">
    <!-- 搜索工作栏 -->
    <div class="search-container" ref="searchBoxRef">
      <SearchField
        :data="searchConfig"
        v-model="queryParams"
        :visibleRows="2"
        :colNum="3"
        @search="getList"
      >
        <template #businessCategory>
          <el-cascader
            v-model="businessCascader"
            style="width: 100%"
            :props="cascaderProps"
            clearable
          />
        </template>
      </SearchField>
    </div>
    <el-divider border-style="dashed" />

    <Table
      :data="tableData"
      :loading="tableLoading"
      :columnConfig="tableConfig"
      :isSelected="true"
      :page-total="pageTotal"
      :setColumnEnable="true"
      :height="tableHeight"
      :actionWidth="px2rem('100px')"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @selection-change="selectionChangeHandler"
      @size-change="getList"
      @current-change="getList"
    >
      <!-- 批量操作 -->
      <template #btnsBox>
        <el-button type="primary" :icon="Plus" @click="addTemplate">
          新增
        </el-button>
        <el-tooltip content="需勾选下方条目，方可操作" placement="top-start">
          <el-button
            type="primary"
            :icon="Delete"
            @click="delHandler(selectIds)"
          >
            删除
          </el-button>
        </el-tooltip>
      </template>
      <template #action="scope">
        <el-button link type="primary" @click="editHandler(scope.row)">
          编辑
        </el-button>
        <el-button link type="primary" @click="downloadHandler(scope.row)">
          下载
        </el-button>
        <el-button link type="danger" @click="delHandler([scope.row.id])">
          删除
        </el-button>
      </template>
    </Table>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="40%"
    >
      <el-form
        ref="formRef"
        :model="formParams"
        v-loading="formLoading"
        :rules="formRules"
        :label-width="px2rem('130px')"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="业务类型" prop="fileName">
              <el-cascader
                v-model="businessFormCascader"
                placeholder="请选择业务类型"
                style="width: 100%"
                :props="cascaderProps"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="formParams.remark"
                placeholder="请输入备注"
                class="width-full"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <el-upload
                ref="uploadRef"
                :before-upload="beforeUploadHandler"
                :http-request="uploadHandler"
                :on-exceed="handleExceed"
                :limit="1"
                action="#"
              >
                <el-button
                  :icon="UploadFilled"
                  :loading="upLoading"
                  type="primary"
                  :disabled="!formParams.businessCategory"
                  >选取文件</el-button
                >
                <template #tip>
                  <div class="el-upload__tip">
                    请上传大小不超过 <span class="t-red">20MB</span>的文件
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button :disabled="formLoading" type="primary" @click="submitForm">
          保 存
        </el-button>
        <el-button @click="dialogVisible = false"> 关 闭 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { searchConfig, tableConfig } from './data'
import { reactive, ref, computed, watch } from 'vue'
import { SystemAPI, CommonAPI } from '@/api'
import { TemplateListItem } from '@/api/system/types/response'
import { Plus, Delete, UploadFilled } from '@element-plus/icons-vue'
// import { useDictStore } from '@/store/dict'
import { px2rem, handleDownloadFile } from '@/utils'
import { ElMessageBox, ElMessage, genFileId } from 'element-plus'
import type {
  UploadRawFile,
  UploadRequestOptions,
  UploadProps,
  UploadInstance,
  CascaderProps,
  CascaderOption
} from 'element-plus'
import { useUserStore } from '@toystory/lotso'

// const dictTypes = ['NOTICE_MESSGAE_TYPE', 'NOTICE_STATUS']

const API = new SystemAPI()
const commonAPI = new CommonAPI()

const dialogTitle = ref('')
const dialogVisible = ref(false)
// const dictStore = useDictStore()

// const typesDict = computed(() => {
//   return dictStore.dicts.NOTICE_MESSGAE_TYPE
// })

// const statusDict = computed(() => {
//   return dictStore.dicts.NOTICE_STATUS
// })

// const filterDictLabel = (dictCode: string, value: string | number) => {
//   return dictStore.dicts[dictCode].find((item) => item.value === String(value))
//     ?.label
// }

const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  fileName: '',
  fileCode: '',
  businessCategory: '',
  businessSubcategory: ''
})
const businessCascader = ref<string[]>([])

watch(
  () => businessCascader.value,
  (newVal) => {
    queryParams.businessCategory = newVal ? newVal[0] : ''
    queryParams.businessSubcategory = newVal ? newVal[1] : ''
  }
)

// 上传前校验
const beforeUploadHandler = (file: UploadRawFile) => {
  // 校验文件大小
  if (file.size / 1024 / 1024 > 20) {
    ElMessage.error('文件请不要超过20M！')
    return false
  }
  return true
}

const upLoading = ref(false)
const userStore = useUserStore()
const tenantUser = computed(() => userStore.userInfo?.staffCode as string)
const uploadHandler = async (options: UploadRequestOptions) => {
  upLoading.value = true

  const file = options.file
  const formData = new FormData()
  formData.append('file', file)
  formData.append('bizCode', '')
  formData.append('tenantUser', tenantUser.value)
  formData.append('prefixPath', formParams.businessCategory)
  formData.append('expireDays', '-1')

  commonAPI
    .uploadFiles(formData)
    .then(async (res) => {
      upLoading.value = false
      if (res && res.code === 200) {
        formParams.fileCode = res.data?.fileCode || ''
        formParams.fileName = file.name
      }
    })
    .catch((err: Error) => {
      upLoading.value = false
      throw err
    })
}
const uploadRef = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
}

const formParams = reactive({
  fileName: '',
  fileCode: '',
  businessCategory: '',
  businessSubcategory: '',
  remark: ''
})

const formRules = reactive({
  fileName: [{ required: true, message: '文件名称不能为空', trigger: 'blur' }],
  fileCode: [{ required: true, message: '附件代码不能为空', trigger: 'blur' }],
  parentValue: [{ required: true, message: '父级不能为空', trigger: 'blur' }],
  dataLevel: [{ required: true, message: '层级不能为空', trigger: 'blur' }],
  sort: [{ required: true, message: '排序不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '状态不能为空', trigger: 'change' }]
})
const formLoading = ref(false)
const businessFormCascader = ref<string[]>([])

watch(
  () => businessFormCascader.value,
  (newVal) => {
    formParams.businessCategory = newVal ? newVal[0] : ''
    formParams.businessSubcategory = newVal ? newVal[1] : ''
  }
)

const submitForm = () => {
  if (isEdit.value) {
    API.updateTemplate({
      id: currentId.value,
      ...formParams
    }).then((res) => {
      if (res.code === 200) {
        ElMessage.success('保存成功')
        dialogVisible.value = false
        getList()
      }
    })
  } else {
    API.addTemplate(formParams).then((res) => {
      if (res.code === 200) {
        ElMessage.success('新增成功')
        dialogVisible.value = false
        getList()
      }
    })
  }
}

const cascaderProps: CascaderProps = {
  lazy: true,
  lazyLoad(node, resolve) {
    let nodes = null
    const level = node.level || 0
    let value = 'BUSINESS_TEMPLATE_TYPE'
    if (level > 0) {
      value = node.value as string
    }
    commonAPI
      .getDictsList({
        dictTypes: [String(value)]
      })
      .then((res) => {
        if (res.data && res.code === 200) {
          nodes = res.data[value].map((item) => {
            return {
              leaf: level >= 1,
              ...item
            }
          })
          resolve(nodes as CascaderOption[])
        } else {
          ElMessageBox.alert('获取字典表失败，请联系管理员', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        }
      })
  }
}

// 重置
// const reset = () => {
//   queryParams.fileName = ''
//   queryParams.fileCode = ''
//   queryParams.businessCategory = ''
//   queryParams.businessSubcategory = ''
//   businessCascader.value = []
// }

const tableLoading = ref(false)
const tableData = reactive<TemplateListItem[]>([])
const pageTotal = ref(0)

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

// 选择的数据
const selectData = reactive<TemplateListItem[]>([])
const selectionChangeHandler = (item: TemplateListItem[]) => {
  selectData.splice(0, selectData.length)
  selectData.push(...item)
}

const selectIds = computed(() => {
  return selectData.map((item) => {
    return String(item.id)
  })
})

const getList = () => {
  tableLoading.value = true
  API.getTemplateList(queryParams)
    .then((res) => {
      tableLoading.value = false
      if (res.data) {
        tableData.splice(0, tableData.length)
        tableData.push(...(res.data.list || []))
        pageTotal.value = Number(res.data.total)
      }
    })
    .catch((err) => {
      tableLoading.value = false
      throw new Error(err)
    })
}

// 删除
const delHandler = (idList: string[]) => {
  if (!idList.length) {
    ElMessage.error('请选择需要删除的信息')
    return
  }
  // 二次确认
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    API.delTemplate({
      idList
    }).then(() => {
      getList()
    })
  })
}

const isEdit = ref(false)
// 新增
const addTemplate = () => {
  isEdit.value = false
  dialogTitle.value = '新增模板'
  formParams.fileName = ''
  formParams.fileCode = ''
  formParams.businessCategory = ''
  formParams.businessSubcategory = ''
  formParams.remark = ''
  businessFormCascader.value = []
  dialogVisible.value = true
  uploadRef.value!.clearFiles()
}

// 编辑
const currentId = ref(-1)
const editHandler = (row: TemplateListItem) => {
  isEdit.value = true
  dialogTitle.value = '编辑模板'
  const {
    id,
    fileName,
    fileCode,
    businessCategory,
    businessSubcategory,
    remark
  } = row
  currentId.value = id
  formParams.fileName = fileName || ''
  formParams.fileCode = fileCode || ''
  formParams.businessCategory = businessCategory || ''
  formParams.businessSubcategory = businessSubcategory || ''
  formParams.remark = remark || ''
  businessFormCascader.value = [
    businessCategory || '',
    businessSubcategory || ''
  ]
  dialogVisible.value = true
}

// 下载
const downloadHandler = (row: TemplateListItem) => {
  const { businessCategory, businessSubcategory } = row
  API.templateImportResult({ businessCategory, businessSubcategory }).then(
    (res) => {
      handleDownloadFile(res)
      ElMessage.success('下载成功')
    }
  )
}

getList()
</script>

<style lang="scss" scoped>
.search-container {
  padding-top: 18px;
}
.width-full {
  width: 100%;
}
.t-red {
  color: $base-color-red;
}
</style>
