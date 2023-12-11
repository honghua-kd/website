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
            <template #file="{ file }">
              <div>
                <img
                  v-if="isPdf(file.url)"
                  class="el-upload-list__item-thumbnail"
                  :src="pdfImg"
                  alt=""
                />
                <el-image
                  v-else
                  :src="file.url"
                  :zoom-rate="1.2"
                  :max-scale="5"
                  :min-scale="0.2"
                  :preview-src-list="[file.url]"
                  fit="cover"
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <el-icon><zoom-in /></el-icon>
                  </span>
                  <!-- <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <el-icon><Download /></el-icon>
                  </span> -->
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
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
    <Preview v-model="previewVisible" :fileUrl="previewUrl" title="文件预览" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { UploadFilled, Delete, ZoomIn } from '@element-plus/icons-vue'
import Preview from '@/components/Preview/index.vue'
import pdfImg from '@/assets/images/pdf.png'
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
      fileCode: 'ssa',
      fileCreateTime: '111',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    },
    {
      name: 'food.pdf',
      url: '/static/demo.pdf'
    }
  ]
})

const props = defineProps({
  getFileUrl: {
    type: Function,
    default: () => {}
  }
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
const beforeUpload = async (file: UploadRawFile) => {
  console.log('file>>>>', file)

  // 校验文件大小
  if (file.size / 1024 / 1024 > 8) {
    ElMessage.error('单个图片和单页PDF文件不超过8MB!')
    return false
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('bizCode', 'test')
  API.uploadFiles(formData)
    .then(async (res) => {
      if (res && res.code === 200) {
        const fileCode = res.data?.fileCode
        // 拿到fileCode 换取 文件地址 URL
        const url = await props.getFileUrl(fileCode)
        const fileCreateTime = file.lastModified
        const name = file.name
        const obj = {
          name,
          fileCode,
          fileCreateTime,
          url
        } as UploadFileListItemRequest
        formParams.fileInfoList.push(obj)
      }
    })
    .catch((err: Error) => {
      throw err
    })
}

// 预览
const previewVisible = ref<boolean>(false)
const previewUrl = ref<string>('')
const pdfReg = /^.+(\.pdf)(\?.+)?$/
const isPdf = (url: string) => {
  return pdfReg.test(url)
}

const handlePictureCardPreview = (uploadFile: UploadFile) => {
  if (!uploadFile.url) {
    ElMessage.error('读取上传文件URL出错')
    return
  }
  previewVisible.value = true
  previewUrl.value = uploadFile.url
}

// 删除文件缩略图
const handleRemove = (file: UploadFile) => {
  for (let i = 0, l = formParams.fileInfoList.length; i < l; i++) {
    if (formParams?.fileInfoList[i]?.url === file.url) {
      formParams.fileInfoList.splice(i, 1)
    }
  }
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
