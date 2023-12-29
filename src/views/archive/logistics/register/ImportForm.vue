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
        :on-exceed="handleExceed"
        :accept="fileType"
        multiple
        :auto-upload="false"
        action="#"
        v-model:file-list="fileList"
      >
        上传文件: &nbsp;&nbsp;&nbsp;
        <el-button type="primary">选择文件</el-button>
      </el-upload>
      <template #footer>
        <el-button @click="downloadTemplate"> 模板下载 </el-button>
        <el-button type="primary" @click="importHandler"> 导入 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type {
  UploadRawFile,
  UploadInstance,
  UploadProps,
  UploadFile,
  UploadUserFile
} from 'element-plus'
import { CommonAPI } from '@/api'
import fileDownload from 'js-file-download'
const CommonApi = new CommonAPI()
const dialogTitle = ref<string>('批量导入')
const dialogVisible = ref<boolean>(false)
const upload = ref<UploadInstance>()
const fileType = ref<string>('.xlsx')
const selectFile = ref()
// 上传前校验
const onChangeHandler = (uploadFile: UploadFile) => {
  selectFile.value = uploadFile
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

const downloadTemplate = () => {
  const params = {
    bizType: 'EXPRESS_INFO'
  }
  CommonApi.getDownLoadTemplate(params)
    .then((res) => {
      console.error(res)
      const fileStream = res?.data
      const headers = res?.headers
      const files =
        headers &&
        headers['content-disposition'] &&
        decodeURI(headers['content-disposition'].split(';')[1])
      const fileName = (files && files.split('=')[1]) || ''
      fileDownload(fileStream, fileName)
    })
    .catch((err: Error) => {
      throw err
    })
}
const fileList = ref<UploadUserFile[]>([])
const importHandler = () => {
  dialogVisible.value = false
  console.error(selectFile.value)
  const formData = new FormData()
  fileList.value.forEach((item) => {
    formData.append('file', item.raw as File)
  })
  formData.append('bizType', 'EXPRESS_INFO')
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
