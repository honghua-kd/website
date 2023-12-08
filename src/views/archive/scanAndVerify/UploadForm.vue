<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="60%"
    >
      <el-form
        ref="formRef"
        :model="formParams"
        v-loading="formLoading"
        label-width="130px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="处理批次号" prop="batchNo">
              <el-input
                v-model="formParams.batchNo"
                clearable
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item prop="fileInfoList" label="上传文件">
          <el-upload
            v-model:file-list="formParams.fileInfoList"
            list-type="picture-card"
            action="#"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :accept="fileType"
          >
            <el-icon><UploadFilled /></el-icon>
            <template #tip>
              <div class="el-upload__tip tip-notice">
                单个图片和单页PDF文件不超过8M，多页PDF文件单个不超过300M
              </div>
              <span class="tip-choose"> 已选择文件：{{ chooseFileNum }} </span>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button :disabled="formLoading" type="primary" @click="checkHandler">
          识别 & 核验
        </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          关 闭
        </el-button>
      </template>
    </el-dialog>
    <Preview ref="previewRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import Preview from '@/components/Preview/index.vue'
import { MortageAPI } from '@/api/mortgageRelease'
import { ElMessage, ElForm } from 'element-plus'
import type { UploadFile, UploadRawFile } from 'element-plus'
import type { UploadFileRequest, UploadFileListItemRequest } from '@/api'

const API = new MortageAPI()
const dialogTitle = ref<string>('上传车辆登记证')
const dialogVisible = ref<boolean>(false)
const formLoading = ref<boolean>(false)
const formParams = reactive<UploadFileRequest>({
  batchNo: '', // 处理批次号
  fileInfoList: [
    {
      name: 'food.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    }
  ]
})

const fileType = ref<string>('.pdf, .jpg, .jpeg, .png, .JPG, .JPEG')
const chooseFileNum = computed(() => {
  const number = formParams.fileInfoList.length
  return number
})

/** 打开弹窗 */
const open = (type: string, title: string) => {
  dialogVisible.value = true
  formParams.batchNo = title
}

defineExpose({ open })

// 识别 & 核验
const checkHandler = () => {
  formLoading.value = true
  const params = { ...formParams }
  API.uploadRegisterCard(params)
    .then((res) => {
      formLoading.value = false
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '操作成功'
        })
      }
    })
    .catch((err: Error) => {
      formLoading.value = false
      throw err
    })
}

// 上传前校验
const beforeUpload = (file: UploadRawFile) => {
  console.log('file>>>>', file)

  // 校验文件大小
  if (file.size / 1024 / 1024 > 8) {
    ElMessage.error('单个图片和单页PDF文件不超过8MB!')
    return false
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('bizCode', 'test')
  API.uploadFiles(formData).then((res) => {
    if (res && res.code === 200) {
      const fileCode = res.data?.fileCode
      const fileCreateTime = file.lastModified
      const fileName = file.name
      const obj = {
        fileName,
        fileCode,
        fileCreateTime
      } as UploadFileListItemRequest
      formParams.fileInfoList.push(obj)
    }
  })
}

// 预览
const previewRef = ref()
const handlePictureCardPreview = (uploadFile: UploadFile) => {
  previewRef.value.open(uploadFile)
}

// 删除
const handleRemove = (file: UploadFile) => {
  console.log('handleRemove', file)
  console.log(formParams.fileInfoList)
}
</script>

<style lang="scss" scoped>
.tip-choose {
  font-weight: bold;
  color: $base-color-primary;
}
.tip-notice {
  color: $base-color-red;
}
</style>
