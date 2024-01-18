<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :width="dialogWidth"
      @close="closeDialog"
    >
      <template #header>
        <div class="dialog-title">
          {{ title }}
        </div>
      </template>
      <slot name="default"> </slot>
      <template #footer>
        <slot name="action">
          <el-button :disabled="loading" type="primary" @click="submitHandler">
            确 定
          </el-button>
          <el-button @click="dialogVisible = false"> 取 消 </el-button>
        </slot>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits } from 'vue'
import type { IProps } from './type'

const props = withDefaults(defineProps<IProps>(), {})
const emit = defineEmits([
  'update:modelValue',
  'triggerChildMethod',
  'closeEditDialog'
])
const dialogVisible = ref<boolean>(props.modelValue)
const submitHandler = () => {
  emit('triggerChildMethod')
}
const closeDialog = () => {
  emit('closeEditDialog')
}

watch(
  () => props.modelValue,
  (newVal) => {
    dialogVisible.value = newVal
  }
)
watch(
  () => dialogVisible.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)
</script>

<style lang="scss" scoped>
.dialog-title {
  font-size: 18px;
}
</style>
