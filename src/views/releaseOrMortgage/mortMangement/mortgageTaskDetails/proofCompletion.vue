<template>
  <div class="proof-completion">
    <Line name="完成凭证" :botBorder="false" />
    <div class="wrap">
      <div class="title">
        <span>已归档</span>
        <span>2023-12-23</span>
      </div>
      <div class="img-box">
        <el-upload
          :file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :auto-upload="false"
        >
          <el-icon><Plus /></el-icon>
          <template #file="{ file }">
            <div class="upload-item">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                style="width: 148px; height: 148px; border-radius: 6px"
                alt=""
              />
              <div class="file-name">{{ file.name }}</div>
            </div>
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <el-icon><CirclePlus /></el-icon>
              </span>
              <span
                class="el-upload-list__item-delete"
                @click="downloadFile(file.url, file.name)"
              >
                <el-icon><Download /></el-icon>
              </span>
            </span>
          </template>
        </el-upload>
      </div>
    </div>
    <el-dialog v-model="dialogVisible">
      <img
        w-full
        style="width: 100%"
        :src="dialogImageUrl"
        alt="Preview Image"
      />
    </el-dialog>
    <div class="bottom-line"></div>
  </div>
</template>

<script setup lang="ts">
import Line from './components/line.vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { Plus, CirclePlus, Download } from '@element-plus/icons-vue'
import { downloadFile } from '@/utils/index'
import { ref } from 'vue'

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  }
])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile, 'uploadFile111')
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.proof-completion {
  .wrap {
    height: 190px;
  }
  .file-name {
    margin-top: 8px;
    text-align: center;
  }
}
:deep(.el-upload-list--picture-card .el-upload-list__item) {
  overflow: visible;
}
</style>
