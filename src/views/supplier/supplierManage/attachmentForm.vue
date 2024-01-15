<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="60%"
      @close="closeHandler"
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
        :accept="fileType"
      >
        上传文件: &nbsp;&nbsp;&nbsp;
        <el-button type="primary">选择文件</el-button>
        <template #tip>
          <div class="el-upload__tip">
            请上传大小不超过 <span class="t-red">20MB</span>，格式为
            <span class="t-red"
              >zip/rar/txt/doc/docx/xls/xlsx/ppt/pptx/pdf</span
            >
            的文件
          </div>
        </template>
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
  UploadRawFile,
  UploadInstance,
  UploadProps,
  UploadFile,
  UploadUserFile
} from 'element-plus'
import { useUserStore } from '@toystory/lotso'
import { CommonAPI } from '@/api'
const CommonApi = new CommonAPI()
const dialogTitle = ref<string>('批量导入')
const dialogVisible = ref<boolean>(false)
const upload = ref<UploadInstance>()
const fileType = ref<string>(
  '.zip, .rar, .txt, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf'
)
// 上传前校验
const onChangeHandler = (uploadFile: UploadFile) => {
  console.error(uploadFile)

  // 校验文件格式
  const type = uploadFile.name
    .slice(uploadFile.name.lastIndexOf('.'))
    .toLowerCase()
  if (!fileType.value.includes(type)) {
    ElMessage.error(
      '上传文件支持zip/rar/txt/doc/docx/xls/xlsx/ppt/pptx/pdf格式'
    )
    upload.value!.clearFiles()
  }
  // 校验文件大小
  if ((uploadFile.size as number) / 1024 / 1024 > 20) {
    ElMessage.error('请上传大小不超过20MB')
    upload.value!.clearFiles()
  }
}
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  upload.value!.handleStart(file)
}

const fileList = ref<UploadUserFile[]>([])
const tenantUser = ref<string>('')
const emit = defineEmits(['otherfileinfo'])
const importHandler = () => {
  if (!fileList.value.length) {
    ElMessage({
      type: 'error',
      message: '请选择文件'
    })
    return
  }
  const userStore = useUserStore()
  tenantUser.value = userStore.userInfo?.staffCode as string
  const formData = new FormData()
  fileList.value.forEach((item) => {
    formData.append('file', item.raw as File)
  })
  formData.append('tenantUser', tenantUser.value)
  formData.append('prefixPath', 'supplier')
  formData.append('expireDays', '-1')
  CommonApi.uploadFilesBatch(formData)
    .then((res) => {
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '导入成功'
        })
        dialogVisible.value = false
        const fileCodes = res.data?.fileCodes || []
        const fileNames: string[] = []
        fileList.value.forEach((item) => {
          // const fileName = item.name.substring(0, item.name.lastIndexOf('.'))
          const fileName = item.name
          fileNames.push(fileName)
        })
        const params: { fileCode: string; fileName: string }[] = []
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

<style lang="scss" scoped>
.t-red {
  color: $base-color-red;
}
</style>
