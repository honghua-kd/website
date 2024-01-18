<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="550px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
      :before-close="handleClose"
    >
      <div>
        <el-form ref="ruleFormRef" :model="docInfoForm" :rules="rules">
          <el-form-item label="文书名称" prop="documentName" required>
            <el-input
              v-model="docInfoForm.documentName"
              :maxlength="50"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item label="文书类型" prop="documentType" required>
            <el-select v-model="docInfoForm.documentType" style="width: 100%">
              <el-option
                v-for="item in documentTypeOptions"
                :key="(item.value as string)"
                :label="(item.label as string)"
                :value="(item.value as string)"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="适用部门" prop="sourceSystem1" required>
            <el-checkbox-group v-model="docInfoForm.sourceSystem1">
              <el-checkbox
                v-for="item in systemOptions"
                :key="(item.value as string)"
                :label="(item.value as string)"
                >{{ item.label }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="用印类型" prop="sealType" required>
            <el-select
              v-model="docInfoForm.sealType"
              multiple
              collapse-tags
              collapse-tags-tooltip
              style="width: 100%"
            >
              <el-option
                v-for="item in sealOptions"
                :key="(item.value as string)"
                :label="(item.label as string)"
                :value="(item.value as string)" /></el-select
          ></el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeFormModel(ruleFormRef, 'click-close')"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="closeFormModel(ruleFormRef, 'update-close')"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="listDialogvisible"
      title="文书版本"
      width="900px"
      :before-close="handleTableClose"
    >
      <el-button
        v-if="title === '新增'"
        style="margin-bottom: 10px"
        :icon="Plus"
        type="primary"
        @click="addTableItem"
        >新增</el-button
      >
      <el-form ref="ruleSaveListForm" :model="saveListForm">
        <el-table
          :data="saveListForm.saveListInfo"
          :header-cell-style="{
            background: '#eef1f6',
            color: '#606266',
            textAlign: 'center'
          }"
          border
          :cell-style="{ borderRight: '1px solid #fff' }"
        >
          <el-table-column type="index" width="50" align="center" />
          <el-table-column
            prop="documentName"
            label="文书名称"
            show-overflow-tooltip
          />
          <el-table-column
            prop="documentType"
            label="文书类型"
            width="180"
            align="center"
          >
            <template #default="{ row }">{{
              getDocumentLabel(row.documentType)
            }}</template>
          </el-table-column>
          <el-table-column prop="documentVersion" label="文书版本" width="180">
            <template #default="{ row, $index }">
              <el-form-item
                :prop="`saveListInfo.${$index}.documentVersion`"
                :rules="ruleSaveListFormRules.documentVersion"
              >
                <el-input
                  placeholder="请输入版本"
                  v-model="row.documentVersion"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="fileCode"
            label="附件信息"
            width="180"
            show-overflow-tooltip
          >
            <template #default="{ row, $index }">
              <el-form-item
                :prop="`saveListInfo.${$index}.fileCode`"
                :rules="ruleSaveListFormRules.fileCode"
                ><el-link
                  type="primary"
                  :underline="false"
                  @click="downloadFile(row.fileName, row.fileCode)"
                  >{{ row.fileName }}</el-link
                ></el-form-item
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template #default="scope">
              <el-button
                v-if="title === '新增' && saveListForm.saveListInfo.length > 1"
                link
                type="danger"
                @click="removeTableItem(scope.$index, scope.row)"
                >删除</el-button
              >
              <el-button
                v-if="detailData.approvalStatus !== 'APPROVED'"
                link
                type="primary"
                @click="uploadTableFile(scope.$index, scope.row)"
                >上传</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeTableModel(ruleSaveListForm, 'click-close')"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="closeTableModel(ruleSaveListForm, 'update-close')"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- 导入文件 -->
    <el-dialog
      class="import-model"
      v-model="importVisible"
      title="导入附件"
      width="550px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
    >
      <el-upload
        ref="upload"
        v-model:file-list="fileList"
        class="upload-demo"
        accept=".docx"
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

    <!-- 审核弹窗 -->
    <ApprovalModel
      :visible="approvalDialogVisible"
      :documentNos="documentNos"
      v-bind="$attrs"
      @closeApprovalModel="closeApprovalModel"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs, watch, onMounted } from 'vue'
import type { ModelStateType } from './type'
import type {
  FormInstance,
  FormRules,
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from 'element-plus'
import { ElMessage, genFileId } from 'element-plus'
import type { InternalRuleItem } from 'async-validator'
import type { DictListItem, SaveOrUpdateDocRequest } from '@/api'
import { Plus } from '@element-plus/icons-vue'
import { DocCheckAPI, CommonAPI } from '@/api'
import { useUserStore } from '@toystory/lotso'
import { handleDownloadFile } from '@/utils'
import type { DocumentPageResponse } from '@/api/docCheck/types/response'
import ApprovalModel from './approvalModel.vue'

const API = new DocCheckAPI()
const COMMONAPI = new CommonAPI()

type Iprops = {
  visible: boolean
  title: string
  documentTypeOptions: DictListItem[]
  systemOptions: DictListItem[]
  sealOptions: DictListItem[]
  detailData: DocumentPageResponse
}
const props = withDefaults(defineProps<Iprops>(), {
  visible: false,
  title: '',
  documentTypeOptions: () => [],
  systemOptions: () => [],
  sealOptions: () => [],
  detailData: () => ({})
})
const state = reactive<ModelStateType>({
  dialogVisible: false,
  docInfoForm: {
    documentName: '',
    documentType: '',
    sourceSystem1: [],
    sealType: []
  },
  saveListForm: {
    saveListInfo: []
  },
  listDialogvisible: false,
  importVisible: false,
  uploadItemIndex: -1,
  approvalDialogVisible: false,
  documentNos: []
})
const {
  dialogVisible,
  docInfoForm,
  saveListForm,
  listDialogvisible,
  importVisible,
  approvalDialogVisible,
  documentNos
} = toRefs(state)

watch(
  [() => props.visible, () => props.title, () => props.detailData],
  ([newVisible, newTitle, newValue]) => {
    state.dialogVisible = newVisible
    if (newTitle === '编辑') {
      console.log(newValue)
      state.docInfoForm.documentName = newValue.documentName
        ? newValue.documentName
        : ''
      state.docInfoForm.documentType = newValue.documentType
        ? newValue.documentType
        : ''
      if (newValue.sealTypeDetail && newValue.sealTypeDetail.length > 0) {
        const arr: string[] = []
        newValue.sealTypeDetail.forEach((i) => {
          arr.push(i.value as string)
        })
        state.docInfoForm.sealType = arr
      } else {
        state.docInfoForm.sealType = []
      }
      const sysArr: string[] = []
      newValue.sourceSystemDetail?.forEach((i) => {
        const value: string = i.value as string
        sysArr.push(value)
      })
      state.docInfoForm.sourceSystem1 = sysArr
    }
  }
)

const curStaffCode = ref<string>('')
onMounted(() => {
  const userStore = useUserStore()
  curStaffCode.value = userStore.userInfo?.staffCode as string
})

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
  formData.append('bizCode', 'SYSTEM_DOCUMENT_UPLOAD')
  formData.append('prefixPath', '/document')
  formData.append('expireDays', '-1')
  formData.append('tenantUser', curStaffCode.value)
  console.log(fileList, formData)
  COMMONAPI.uploadFiles(formData)
    .then((res) => {
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '导入成功'
        })
        state.saveListForm.saveListInfo[state.uploadItemIndex].fileCode =
          res.data ? res.data.fileCode : ''
        state.saveListForm.saveListInfo[state.uploadItemIndex].fileName =
          fileList.value[0].name
      }
      upload.value!.clearFiles()
      state.importVisible = false
    })
    .catch((err: Error) => {
      throw err
    })
}

const downloadFile = (name: string, code: string) => {
  COMMONAPI.downLoadFiles({ fileCode: code }).then((res) =>
    handleDownloadFile(res, name)
  )
}

// 表单验证
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof docInfoForm>>({
  sourceSystem1: [
    {
      validator: (
        rule: InternalRuleItem,
        value: string[],
        callback: (error?: string | Error | undefined) => void
      ) => {
        if (value.length === 0) {
          callback(new Error('请选择适用部门'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  documentName: [
    {
      required: true,
      message: '请输入文书名称',
      trigger: 'blur'
    }
  ],
  documentType: [
    {
      required: true,
      message: '请选择文书类型',
      trigger: 'change'
    }
  ],
  sealType: [
    {
      required: true,
      message: '请选择用印类型',
      trigger: 'change'
    }
  ]
})
const ruleSaveListForm = ref<FormInstance>()
const ruleSaveListFormRules = reactive<FormRules>({
  documentVersion: [
    {
      required: true,
      message: '请输入文书版本',
      trigger: 'blur'
    }
  ],
  fileCode: [
    {
      required: true,
      message: '请上传附件',
      trigger: 'blur'
    }
  ]
})

// 根据value获取文书类型label
const getDocumentLabel = (value: string): string => {
  let result: string = ''
  props.documentTypeOptions.forEach((i: DictListItem) => {
    if (i.value === value) {
      result = i.label as string
    }
  })
  return result
}

// 新增表格项
const addTableItem = () => {
  state.saveListForm.saveListInfo.push({
    documentName: docInfoForm.value.documentName,
    documentType: docInfoForm.value.documentType,
    sourceSystem1: docInfoForm.value.sourceSystem1,
    documentVersion: '',
    sealType: docInfoForm.value.sealType,
    fileCode: ''
  })
}

// 移除表格项
const removeTableItem = (index: number, row: SaveOrUpdateDocRequest) => {
  console.log(index, row)
  state.uploadItemIndex = index
  const saveListInfoClone = JSON.parse(
    JSON.stringify(state.saveListForm.saveListInfo)
  )
  saveListInfoClone.splice(index, 1)
  state.saveListForm.saveListInfo = saveListInfoClone
}

// 表格单项上传文件
const uploadTableFile = (index: number, row: SaveOrUpdateDocRequest) => {
  console.log(row)
  state.uploadItemIndex = index
  state.importVisible = true
}

// 表单置空
const restForm = () => {
  state.docInfoForm.documentName = ''
  state.docInfoForm.documentType = ''
  state.docInfoForm.sourceSystem1 = []
  state.docInfoForm.sealType = []
}

// 关闭表单弹窗
const closeFormModel = async (
  formEl: FormInstance | undefined,
  type: string
) => {
  if (type === 'click-close') {
    emit('closeModel', {
      type
    })
    restForm()
    return
  }
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (type === 'update-close') {
        console.log(docInfoForm)
        const obj: SaveOrUpdateDocRequest = {
          documentName: docInfoForm.value.documentName,
          documentType: docInfoForm.value.documentType,
          sourceSystem1: docInfoForm.value.sourceSystem1,
          sealType: docInfoForm.value.sealType,
          documentVersion:
            props.title === '新增'
              ? ''
              : (props.detailData.documentVersion as string),
          fileCode:
            props.title === '新增' ? '' : (props.detailData.fileCode as string),
          fileName:
            props.title === '新增' ? '' : (props.detailData.fileName as string)
        }
        if (props.title === '编辑') {
          obj.id = props.detailData.id as number
          obj.documentNo = props.detailData.documentNo as string
        }
        state.saveListForm.saveListInfo = [obj]
        state.dialogVisible = false
        state.listDialogvisible = true
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 关闭表格弹窗
const closeTableModel = async (
  formEl: FormInstance | undefined,
  type: string
) => {
  if (type === 'click-close') {
    emit('closeModel', {
      type
    })
    state.listDialogvisible = false
    restForm()
    return
  }
  if (!formEl) return
  // 接口交互
  if (type === 'update-close') {
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        console.log(state.saveListForm.saveListInfo)
        await API.saveOrUpdateDocument(state.saveListForm.saveListInfo)
        state.listDialogvisible = false
        if (props.title === '新增') {
          state.approvalDialogVisible = true
        }
      } else {
        console.log('error submit!', fields)
      }
    })
  }
}

const closeApprovalModel = ({ type }: { type: string }) => {
  emit('closeModel', {
    type
  })
  state.approvalDialogVisible = false
}

const emit = defineEmits<{
  (e: 'closeModel', { type }: { type: string }): void
}>()

const handleClose = () => {
  emit('closeModel', {
    type: 'click-close'
  })
  restForm()
}

const handleTableClose = () => {
  state.listDialogvisible = false
  emit('closeModel', {
    type: 'click-close'
  })
  restForm()
}
</script>
