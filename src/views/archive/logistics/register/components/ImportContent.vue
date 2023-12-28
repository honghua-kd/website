<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="60%"
    >
      <el-upload
        ref="upload"
        :show-file-list="true"
        :on-change="onChangeHandler"
        :on-exceed="handleExceed"
        :accept="fileType"
        :limit="1"
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
import { ElMessage, ElForm, genFileId } from 'element-plus'
import type {
  UploadRawFile,
  UploadInstance,
  UploadProps,
  UploadFile,
  UploadFiles,
  UploadUserFile
} from 'element-plus'
import { ExpressAPI, CommonAPI } from '@/api'
import fileDownload from 'js-file-download'
const API = new ExpressAPI()
const CommonApi = new CommonAPI()
const dialogTitle = ref<string>('批量导入')
const dialogVisible = ref<boolean>(false)
const upload = ref<UploadInstance>()
const fileType = ref<string>('.xlsx')
const selectFile = ref()
// 上传前校验
const onChangeHandler = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
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
    bizType: 'EXPRESS_CONTENT'
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
const fileList = ref([])
const expressNo = ref('')
const emit = defineEmits(['importcontent'])
const importHandler = () => {
  dialogVisible.value = false
  console.error(selectFile.value)
  const formData = new FormData()
  formData.append('file', selectFile.value.raw)
  formData.append('bizType', 'EXPRESS_CONTENT')
  formData.append('expressNo', expressNo.value)
  fileList.value = []
  API.importExpressContent(formData)
    .then((res) => {
      if (res && res.code === 200) {
        emit('importcontent', res.data)
        dialogVisible.value = false
        ElMessage({
          type: 'success',
          message: '导入成功'
        })
      }
    })
    .catch((err: Error) => {
      throw err
    })
}

/** 打开弹窗 */
const open = (no: string) => {
  dialogVisible.value = true
  expressNo.value = no
}
defineExpose({ open })
</script>

<style scoped></style>
