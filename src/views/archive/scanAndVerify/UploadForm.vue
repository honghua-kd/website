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

        <el-form-item label="上传文件">
          <el-upload
            :show-file-list="false"
            :before-upload="beforeUploadHandler"
            :http-request="uploadHandler"
            :accept="fileType"
            action="#"
          >
            <el-button type="primary" :icon="UploadFilled" :loading="upLoading">
              上传文件
            </el-button>
          </el-upload>
        </el-form-item>

        <el-form-item prop="fileInfoList">
          <el-col>
            <div class="tip-choose">已选择文件：{{ chooseFileNum }}</div>
          </el-col>
          <div v-loading="upLoading" class="el-upload">
            <template v-for="item of formParams.fileInfoList" :key="item.url">
              <div
                style="margin-right: 10px"
                class="el-upload-list el-upload-list--picture-card"
              >
                <div class="el-upload-list__item">
                  <div v-if="isPdf(item.name)" class="card-list-img">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="pdfImg"
                      alt=""
                    />
                  </div>

                  <el-image
                    v-else
                    :src="item.url"
                    :zoom-rate="1.2"
                    :max-scale="5"
                    :min-scale="0.2"
                    :preview-src-list="[item.url]"
                    fit="cover"
                  />
                </div>

                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(item)"
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
                    style="z-index: 1000"
                    @click="handleRemove(item)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </div>

          <el-col>
            <div class="el-upload__tip tip-notice">
              单个图片和单页PDF文件不超过8M，多页PDF文件单个不超过300M
            </div>
          </el-col>
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
    <Preview
      v-model="previewVisible"
      :fileUrl="previewUrl"
      :fileName="preFileName"
      title="文件预览"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { UploadFilled, Delete, ZoomIn } from '@element-plus/icons-vue'
import Preview from '@/components/Preview/index.vue'
import pdfImg from '@/assets/images/pdf.png'
import { ElMessage, ElForm } from 'element-plus'
import dayjs from 'dayjs'
import { MortageAPI, CommonAPI } from '@/api'
import type { UploadRawFile, UploadRequestOptions } from 'element-plus'
import type { UploadFileRequest, UploadFileListItemRequest } from '@/api'

const API = new MortageAPI()
const CommonApi = new CommonAPI()
const dialogTitle = ref<string>('上传车辆登记证')
const dialogVisible = ref<boolean>(false)
const formLoading = ref<boolean>(false)
const emit = defineEmits(['success'])
const formParams = reactive<UploadFileRequest>({
  batchNo: '', // 处理批次号
  fileInfoList: [
    {
      name: 'food.jpeg',
      fileCode: 'LX_1731921571582316630_1',
      fileCreateTime: '2023-12-05 14:20:54',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    },
    {
      name: 'food.pdf',
      url: '/static/demo.pdf',
      fileCode: 'LX_1730150244252913758 1',
      fileCreateTime: '2023-12-05 14:20:54'
    }
  ]
})

const fileType = ref<string>('.pdf, .jpg, .jpeg, .png, .JPG, .JPEG')
const chooseFileNum = computed(() => {
  const number = formParams.fileInfoList.length
  return number
})

/** 打开弹窗 */
const tenantUser = ref<string>('')
const open = (type: string, title: string, user: string) => {
  dialogVisible.value = true
  formParams.batchNo = title
  tenantUser.value = user
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
        emit('success')
        dialogVisible.value = false
      }
    })
    .catch((err: Error) => {
      formLoading.value = false
      throw err
    })
}

// 上传前校验
const beforeUploadHandler = (file: UploadRawFile) => {
  // 校验文件大小
  if (file.size / 1024 / 1024 > 8) {
    ElMessage.error('单个图片和单页PDF文件不超过8MB!')
    return false
  }
  return true
}

// 上传
const preFileName = ref<string>('')
const upLoading = ref<boolean>(false)
const uploadHandler = async (options: UploadRequestOptions) => {
  upLoading.value = true
  const file = options.file
  const formData = new FormData()
  formData.append('file', file)
  formData.append('bizCode', 'VEHICLE_REGISTER_UPLOAD')
  formData.append('tenantUser', tenantUser.value)
  formData.append('prefixPath', 'attachment')
  formData.append('expireDays', '-1')
  CommonApi.uploadFiles(formData)
    .then(async (res) => {
      if (res && res.code === 200) {
        const fileCode = res.data?.fileCode
        // 拿到fileCode 换取 文件地址 URL
        const fileUrlParams = {
          fileCodes: [fileCode]
        }
        CommonApi.getPreviewUrl(fileUrlParams)
          .then((res) => {
            upLoading.value = false
            if (res && res.code === 200) {
              const fileInfo = res?.data?.previewInfoList[0]
              previewUrl.value = fileInfo?.filePreview || ''
              preFileName.value = fileInfo?.fileName || ''
              const fileCreateTime = dayjs(file.lastModified).format(
                'YYYY-MM-DD HH:mm:ss'
              )
              const name = file.name
              const obj = {
                name,
                fileCode,
                fileCreateTime,
                url: fileInfo?.filePreview
              } as UploadFileListItemRequest
              formParams.fileInfoList.push(obj)
            }
          })
          .catch((err: Error) => {
            upLoading.value = false
            console.log(err)
          })
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
const isPdf = (fileName: string) => {
  return pdfReg.test(fileName)
}

const handlePictureCardPreview = (uploadFile: UploadFileListItemRequest) => {
  if (!uploadFile.url) {
    ElMessage.error('读取上传文件URL出错')
    return
  }
  // 临时添加，PDF 文件直接打开预览
  if (isPdf(uploadFile.name)) {
    window.open(uploadFile.url, '_blank')
    return
  }
  previewVisible.value = true
  previewUrl.value = uploadFile.url
  preFileName.value = uploadFile.name
}

// 删除文件缩略图
const handleRemove = (file: UploadFileListItemRequest) => {
  for (let i = 0, l = formParams.fileInfoList.length; i < l; i++) {
    if (formParams?.fileInfoList[i]?.url === file.url) {
      formParams.fileInfoList.splice(i, 1)
    }
  }
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
.card-list-img {
  padding: 40px;
}
</style>
