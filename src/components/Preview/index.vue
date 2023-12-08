<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-image :src="fileUrl" v-if="showPic" />
      <pdfViews v-else :url="fileUrl" scale rotate magnifyingGlass />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile } from 'element-plus'
import pdfViews from '@toystory/potato'
import '@toystory/potato/dist/style.css'

const dialogTitle = ref<string>('文件预览')
const dialogVisible = ref<boolean>(false)
const fileUrl = ref<string>('')
const showPic = ref<boolean>(false)

/** 打开弹窗 */
const open = (files: UploadFile) => {
  dialogVisible.value = true
  fileUrl.value = files.url
  if (!fileUrl.value.includes('.pdf')) {
    showPic.value = true
  }
}

defineExpose({ open })
</script>

<style lang="scss" scoped></style>
