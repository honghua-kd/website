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

        <el-form-item prop="fileList" label="上传文件">
          <el-upload
            v-model:file-list="formParams.fileList"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
const dialogTitle = ref<string>('上传车辆登记证')
const dialogVisible = ref<boolean>(false)
const formLoading = ref<boolean>(false)
const formParams = reactive({
  batchNo: '', // 处理批次号
  fileList: [
    {
      name: 'food.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    }
  ]
})

const chooseFileNum = computed(() => {
  const number = formParams.fileList.length
  return number
})

/** 打开弹窗 */
const open = (type: string, title: string) => {
  dialogVisible.value = true
  formParams.batchNo = title
  console.log(type, title)
}

defineExpose({ open })

// 识别 & 核验
const checkHandler = () => {}

// 预览
const handlePictureCardPreview = () => {}

// 删除
const handleRemove = () => {}
</script>

<style lang="scss" scoped>
.tip-choose {
  font-weight: bold;
  color: #1893ff;
}
.tip-notice {
  color: red;
}
</style>
