<template>
  <el-button v-bind="props" :loading="loading" @click="clickButton">
    <slot name="icon" />
    {{ name || 'Button' }}
    <slot />
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
const props = withDefaults(defineProps<BtnProps>(), {
  type: 'primary',
  size: 'default'
})
const clickButton = debounce(() => {
  emit('onButtonFn')
}, 300)
const changeLoading = (status: boolean) => {
  loading.value = status
}
defineExpose({ changeLoading })
</script>
