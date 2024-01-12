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
            <el-select v-model="docInfoForm.sealType" style="width: 100%">
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
      <Table
        :data="saveListInfo"
        :columnConfig="saveListColumn"
        :setColumnEnable="false"
      >
        <template v-if="title === '新增'" #btnsBox>
          <el-button :icon="Plus" type="primary" @click="addTableItem"
            >新增</el-button
          >
        </template>
        <template #default="{ row, prop }">
          <span v-if="prop === 'documentType'">{{
            getDocumentLabel(row.documentType)
          }}</span>
          <el-input
            v-if="prop === 'documentVersion'"
            placeholder="请输入版本"
            v-model="row.documentVersion"
          />
          <el-link
            type="primary"
            :underline="false"
            v-if="prop === 'fileCode'"
            @click="downloadFile(row.fileName, row.fileCode)"
            >{{ row.fileName }}</el-link
          >
        </template>
        <template #action="scope">
          <el-button
            v-if="title === '新增'"
            link
            type="danger"
            @click="removeTableItem(scope.$index, scope.row)"
            >删除</el-button
          >
          <el-button
            link
            type="primary"
            @click="uploadTableFile(scope.$index, scope.row)"
            >上传</el-button
          >
        </template>
      </Table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeTableModel('click-close')">取消</el-button>
          <el-button type="primary" @click="closeTableModel('update-close')"
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
import Table from '@/components/Table/index.vue'
import { Plus } from '@element-plus/icons-vue'
import { saveListColumn } from './data'
import { DocCheckAPI, CommonAPI } from '@/api'
import { useUserStore } from '@toystory/lotso'
import { handleDownloadFile } from '@/utils'
import type { DocumentPageResponse } from '@/api/docCheck/types/response'

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
    sealType: ''
  },
  saveListInfo: [],
  listDialogvisible: false,
  importVisible: false,
  uploadItemIndex: -1
})
const {
  dialogVisible,
  docInfoForm,
  saveListInfo,
  listDialogvisible,
  importVisible
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
      state.docInfoForm.sealType = newValue.sealType ? newValue.sealType : ''
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
        state.saveListInfo[state.uploadItemIndex].fileCode = res.data
          ? res.data.fileCode
          : ''
        state.saveListInfo[state.uploadItemIndex].fileName =
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
  state.saveListInfo.push({
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
  const saveListInfoClone = JSON.parse(JSON.stringify(state.saveListInfo))
  saveListInfoClone.splice(index, 1)
  state.saveListInfo = saveListInfoClone
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
  state.docInfoForm.sealType = ''
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
          // documentVersion: '123',
          // fileCode: 'qwe',
          // fileName: 'ppppp'
        }
        if (props.title === '编辑') {
          obj.id = props.detailData.id as number
          obj.documentNo = props.detailData.documentNo as string
        }
        state.saveListInfo = [obj]
        state.dialogVisible = false
        state.listDialogvisible = true
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 关闭表格弹窗
const closeTableModel = async (type: string) => {
  // 接口交互
  if (type === 'update-close') {
    console.log(saveListInfo.value)
    await API.saveOrUpdateDocument(saveListInfo.value)
  }
  state.listDialogvisible = false
  emit('closeModel', {
    type
  })
  restForm()
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
