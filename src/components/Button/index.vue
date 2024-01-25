<template>
  <el-button
    :type="type || 'primary'"
    :size="size || 'default'"
    :disabled="disabled"
    :loading="loading"
    :text="text"
    :link="link"
    @click="clickButton"
  >
    <slot name="icon"></slot>
    {{ name || 'Button' }}
    <slot></slot>
  </el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { debounce } from 'lodash'
import type { BtnProps } from './type'

const loading = ref<boolean>(false)
const emit = defineEmits<{
  (e: 'onButtonFn'): void
}>()
defineProps<BtnProps>()
const clickButton = debounce(() => {
  emit('onButtonFn')
}, 300)
const startLoading = () => {
  loading.value = true
}
const cancelLoading = () => {
  loading.value = false
}
defineExpose({ startLoading, cancelLoading })
</script>
