<template>
  <div class="attachment">
    <Line name="附件" :botBorder="false">
      <el-button type="primary" link>全部下载 </el-button>
    </Line>
    <div class="wrap">
      <div
        class="item"
        v-for="(image, index) in images"
        :key="index"
        @mouseover="showMask(index)"
        @mouseleave="hideMask"
      >
        <img style="width: 100px; height: 100%" :src="image.url" />
        <div class="text">{{ image.name }}</div>
        <div ref="mask" class="item-mask" v-show="currentHoverIndex === index">
          <span class="item-actions">
            <span
              class="item-preview"
              @click="handlePictureCardPreview(image.url)"
            >
              <el-icon><CirclePlus /></el-icon>
            </span>
            <span class="item-delete" @click="handleDownload(image)">
              <el-icon><Download /></el-icon>
            </span>
          </span>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible">
      <img
        w-full
        :src="dialogImageUrl"
        alt="Preview Image"
        style="width: 100%"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import Line from './components/line.vue'
import { CirclePlus, Download } from '@element-plus/icons-vue'
import { ref, nextTick } from 'vue'

const images = ref([
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
interface FileItem {
  url: string // 文件的URL，用于下载
  name: string // 文件的名称，用于设置下载后的文件名
}
// 下载  imgage图片blob类型下载
const handleDownload = (file: FileItem) => {
  debugger
  const link = document.createElement('a')
  link.href = file.url
  link.download = file.name
  // 阻止默认的点击事件行为
  link.addEventListener(
    'click',
    (event) => {
      event.preventDefault()
    },
    { once: true }
  )

  // 确保DOM元素已经挂载
  nextTick(() => {
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
    }
    .item-mask {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
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
