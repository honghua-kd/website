<template>
  <el-form-item
    :label="label"
    :prop="prop"
    :labelWidth="labelWidth"
    :required="required"
    :rules="rules"
    :error="error"
    :showMessage="showMessage"
    :inlineMessage="inlineMessage"
    :size="size"
    :validateStatus="validateStatus"
  >
    <slot :name="slotName || 'default'">
      <component style="width: 100%" v-bind="props" v-model="val" :is="type">
        <template v-if="type === 'el-select'">
          <!-- <el-option
            v-for="(cell, index) in dictObj[item.options as string]"
            :key="index"
            :label="cell.label"
            :value="cell.value"
          /> -->
        </template>
      </component>
    </slot>
  </el-form-item>
</template>

<script lang="ts">
export default {
  name: 'DynamicFormItem'
}
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { DynamicFormItemProps } from './type'

const props = withDefaults(defineProps<DynamicFormItemProps>(), {})

const emit = defineEmits(['update:modelValue'])

watch(
  () => val.value,
  (newVal) => {
    emit('update:modelValue', newVal)
  }
)

const val = ref('')
</script>

<style lang="scss" scoped>
// .dynamic-form {
// }
</style>
