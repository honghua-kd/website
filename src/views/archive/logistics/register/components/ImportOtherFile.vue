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
        :auto-upload="false"
        action="#"
        multiple
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
import { ElMessage, ElForm, genFileId } from 'element-plus'
import type {
  UploadRawFile,
  UploadInstance,
  UploadProps,
  UploadFile,
  UploadFiles,
  UploadUserFile
} from 'element-plus'
import { useUserStore } from '@toystory/lotso'
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
const onChangeHandler = (uploadFile: UploadRawFile) => {
  // 校验文件大小
  if (uploadFile.size / 1024 / 1024 > 300) {
    ElMessage.error('单个图片和单页PDF文件不超过8M，多页PDF文件单个不超过300M')
    upload.value!.clearFiles()
  }
}
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  upload.value!.handleStart(file)
}

const fileList = ref([])
const tenantUser = ref<string>('')
const emit = defineEmits(['otherfileinfo'])
const importHandler = () => {
  const userStore = useUserStore()
  tenantUser.value = userStore.userInfo?.staffCode as string
  const formData = new FormData()
  fileList.value.forEach((item) => {
    formData.append('file', item.raw)
  })
  formData.append('tenantUser', tenantUser.value)
  formData.append('prefixPath', 'express')
  formData.append('expireDays', '-1')
  CommonApi.uploadFilesBatch(formData)
    .then((res) => {
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '导入成功'
        })
        dialogVisible.value = false
        const fileCodes = res.data?.fileCodes
        const fileNames: string[] = []
        fileList.value.forEach((item) => {
          const fileName = item.name.substring(0, item.name.lastIndexOf('.'))
          fileNames.push(fileName)
        })
        const params = []
        fileCodes.forEach((item, index) => {
          params.push({
            fileCode: item,
            fileName: fileNames[index]
          })
        })
        emit('otherfileinfo', params)
      }
      upload.value!.clearFiles()
    })
    .catch((err: Error) => {
      throw err
    })
}

/** 打开弹窗 */
const open = () => {
  dialogVisible.value = true
}
defineExpose({ open })
</script>

<style scoped></style>
