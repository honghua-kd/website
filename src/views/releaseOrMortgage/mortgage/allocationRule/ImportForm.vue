<!-- eslint-disable no-unused-vars -->
<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="50%"
      @close="closeHandler"
    >
      <el-upload
        ref="upload"
        :show-file-list="true"
        :on-change="onChangeHandler"
        :accept="fileType"
        :auto-upload="false"
        :on-exceed="handleExceed"
        action="#"
        :limit="1"
        v-model:file-list="fileList"
      >
        上传文件: &nbsp;&nbsp;&nbsp;
        <el-button type="primary">选择文件</el-button>
      </el-upload>
      <template #footer>
        <el-button type="primary" @click="importHandler"> 导入 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type {
  UploadInstance,
  UploadFile,
  UploadUserFile,
  UploadProps,
  UploadRawFile
} from 'element-plus'
import { CommonAPI } from '@/api'
const CommonApi = new CommonAPI()
const dialogTitle = ref<string>('导入')
const dialogVisible = ref<boolean>(false)
const upload = ref<UploadInstance>()
const fileType = ref<string>('.xlsx')
const fileList = ref<UploadUserFile[]>([])
// 状态改变
const onChangeHandler = (uploadFile: UploadFile) => {
  // 校验文件格式
  const fileType = uploadFile.name
    .slice(uploadFile.name.lastIndexOf('.'))
    .toLowerCase()
  if (fileType !== '.xlsx') {
    ElMessage.error('文件格式需为.xlsx')
    upload.value!.clearFiles()
  }
}
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  upload.value!.handleStart(file)
}
const importHandler = () => {
  dialogVisible.value = false
  const formData = new FormData()
  formData.append('file', fileList.value[0].raw as File)
  formData.append('bizType', 'MORTGAGE_TEMPLATE_ALLOCATION_RULE')
  CommonApi.getAsyncImport(formData)
    .then((res) => {
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '导入成功'
        })
      }
      upload.value!.clearFiles()
    })
    .catch((err: Error) => {
      throw err
    })
}

// 关闭弹窗
const closeHandler = () => {
  upload.value!.clearFiles()
}

/** 打开弹窗 */
const open = () => {
  dialogVisible.value = true
}
defineExpose({ open })
</script>

<style scoped></style>
