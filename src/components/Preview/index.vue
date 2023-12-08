<template>
  <el-dialog
    v-if="isPdf"
    :title="props.title"
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <pdf-viewer :url="props.fileUrl" scale rotate magnifyingGlass />
  </el-dialog>
  <el-image-viewer
    v-if="dialogVisible && !isPdf"
    :urlList="[props.fileUrl]"
    @close="closeViewer"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import pdfViewer from '@toystory/potato'
import '@toystory/potato/dist/style.css'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    fileUrl: string
  }>(),
  {
    title: '文件预览'
  }
)

// 处理弹窗显示
const emit = defineEmits(['update:modelValue'])

const dialogVisible = ref<boolean>(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    debugger
    dialogVisible.value = newValue
  }
)
watch(
  () => dialogVisible.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)

// 判断是否PDF
const pdfReg = /^.+(\.pdf)(\?.+)?$/
const isPdf = computed(() => {
  if (props.fileUrl) {
    return pdfReg.test(props.fileUrl)
  }
  return false
})

const closeViewer = () => {
  dialogVisible.value = false
}
</script>

<style lang="scss" scoped></style>
