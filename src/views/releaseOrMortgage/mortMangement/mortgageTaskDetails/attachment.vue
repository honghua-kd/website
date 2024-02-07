<template>
  <div class="attachment">
    <Line name="附件" :botBorder="false">
      <el-button type="primary" link @click="handleAllDownload"
        >全部下载
      </el-button>
    </Line>
    <div class="wrap" v-if="images.length > 0">
      <div
        class="item"
        v-for="(image, index) in images"
        :key="index"
        @mouseover="showMask(index)"
        @mouseleave="hideMask"
      >
        <img class="attachment-image" :src="image.url" />
        <div class="text">{{ image.name }}</div>
        <div ref="mask" class="item-mask" v-show="currentHoverIndex === index">
          <span class="item-actions">
            <span
              class="item-preview"
              @click="handlePictureCardPreview(image.url)"
            >
              <el-icon><CirclePlus /></el-icon>
            </span>
            <span
              class="item-delete"
              @click="downloadFile(image.url, image.name)"
            >
              <el-icon><Download /></el-icon>
            </span>
          </span>
        </div>
      </div>
    </div>
    <el-empty :image-size="100" v-else description="暂无附件" />
    <el-dialog v-model="dialogVisible">
      <img
        w-full
        :src="dialogImageUrl"
        alt="Preview Image"
        style="width: 100%"
      />
    </el-dialog>
    <div class="bottom-line"></div>
  </div>
</template>

<script setup lang="ts">
import Line from './components/line.vue'
import { CirclePlus, Download } from '@element-plus/icons-vue'
import { downloadFile } from '@/utils/index'
import { ref } from 'vue'

const images = ref([
  {
    name: 'food11.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  },
  {
    name: 'food33.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  },
  {
    name: 'food555.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  }
])
const currentHoverIndex = ref(-1)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const showMask = (index: number) => {
  currentHoverIndex.value = index
}
const hideMask = () => {
  currentHoverIndex.value = -1
}

const handlePictureCardPreview = (uploadFile: string) => {
  dialogImageUrl.value = uploadFile!
  dialogVisible.value = true
}
// 下载  imgage图片blob类型下载
const handleAllDownload = () => {
  images.value.forEach((element) => {
    downloadFile(element.url, element.name)
  })
}
</script>

<style lang="scss" scoped>
.attachment {
  .wrap {
    display: flex;
    .item {
      position: relative;
      margin-right: 20px;
      height: 100%;
    }
    .item-mask {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100px;
      background-color: rgb(0 0 0 / 50%); /* 遮罩颜色，可自定义 */
    }
    .item-actions {
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      justify-content: space-around;
      width: 100%;
      color: #ffffff;
      transform: translate(-50%, -50%);
      .item-preview,
      .item-delete {
        font-size: 20px;
      }
    }
  }
  .attachment-image {
    width: 100px;
    height: 100%;
  }
}
:deep(.el-upload-list--picture-card .el-upload-list__item) {
  overflow: visible;
}
:deep(.el-image-viewer__prev),
:deep(.el-image-viewer__next),
:deep(.el-image-viewer__actions) {
  display: none;
}
</style>
