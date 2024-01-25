<template>
  <div class="dynamic-date-picker">
    <el-date-picker
      v-model="modelValue[0]"
      :type="dateType"
      :readonly="readonly[0]"
      :disabled="disabled[0]"
      :placeholder="placeholder[0]"
      :size="size"
      :editable="editable[0]"
      :clearable="clearable"
      :format="format"
      :valueFormat="valueFormat"
      :defaultValue="defaultValue ? defaultValue[0] : undefined"
      :validateEvent="validateEvent"
      :disabledDate="disabledDate ? disabledDate[0] : undefined"
      style="margin-right: 4%; width: 48%"
    />
    <el-date-picker
      v-model="modelValue[1]"
      :type="dateType"
      :readonly="readonly[1]"
      :disabled="disabled[1]"
      :placeholder="placeholder[1]"
      :size="size"
      :editable="editable[1]"
      :clearable="clearable"
      :format="format"
      :valueFormat="valueFormat"
      :defaultValue="defaultValue ? defaultValue[1] : undefined"
      :validateEvent="validateEvent"
      :disabledDate="disabledDate ? disabledDate[1] : undefined"
      style="width: 48%"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'DynamicDatePicker'
}
</script>

<script lang="ts" setup>
import { watch } from 'vue'
import type { DynamicDatePickerProps } from './type'

const props = withDefaults(defineProps<DynamicDatePickerProps>(), {
  readonly: () => [false, false],
  disabled: () => [false, false],
  placeholder: () => ['请选择开始时间', '请选择结束时间'],
  editable: () => [true, true],
  dateType: 'datetime'
})

const emit = defineEmits(['change', 'update:modelValue'])

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    emit('update:modelValue', newValue)
    emit('change', newValue)
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
// .dynamic-date-picker {
// }
</style>
