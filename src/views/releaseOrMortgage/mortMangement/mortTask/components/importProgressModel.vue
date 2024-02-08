<template>
  <el-dialog
    class="import-model"
    v-model="visible"
    title="导入办理进度"
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
        <el-text class="mx-1" type="danger">请上传 .xlsx格式文件</el-text>
      </template>
    </el-upload>
    <template #footer>
      <el-button :loading="okLoading" type="primary" @click="submitUpload"
        >导 入</el-button
      >
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, toRefs, ref } from 'vue'
import { genFileId, ElMessage } from 'element-plus'
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from 'element-plus'
import { CommonAPI } from '@/api'

const COMMONAPI = new CommonAPI()

const state = reactive({
  visible: false,
  okLoading: false
})
const { visible, okLoading } = toRefs(state)

// 打开弹窗
const open = () => {
  state.visible = true
}

defineExpose({ open })

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
  state.okLoading = true
  const formData = new FormData()
  fileList.value.forEach((item) => {
    formData.append('file', item.raw as File)
  })
  // formData.append('bizType', '')
  COMMONAPI.getAsyncImport(formData)
    .then((res) => {
      state.okLoading = false
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '导入成功'
        })
      }
      upload.value!.clearFiles()
      state.visible = false
    })
    .catch((err: Error) => {
      state.okLoading = false
      throw err
    })
}
</script>
