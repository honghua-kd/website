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
      <component
        style="width: 100%"
        v-bind="componentsProps"
        v-model="val"
        :is="'el-input'"
      >
        <template v-if="type === 'el-select'">
          <el-option
            v-for="({ label, value }, index) in options"
            :key="index"
            :label="label"
            :value="value"
          />
        </template>
      </component>
    </slot>
  </el-form-item>
</template>

<script lang="ts">
import { componentsMap } from './components'
export default {
  name: 'DynamicFormItem',
  components: componentsMap
}
</script>

<script lang="ts" setup>
import { watch, computed, ref } from 'vue'
import type { ComponentsProps, ComponentsName } from './components'
import type { DynamicFormItemProps } from './type'

const props = withDefaults(
  defineProps<DynamicFormItemProps & ComponentsProps[ComponentsName]>(),
  {}
)

const componentsProps = computed(() => {
  const {
    type, // 组件类型
    slotName, // 插槽名称
    options, // 选项数据，当type为select时必传
    label,
    prop,
    labelWidth,
    required,
    rules,
    error,
    showMessage,
    inlineMessage,
    size,
    validateStatus,
    rowSpan,
    row,
    col,
    ...restProps
  } = props
  return restProps
})

const emit = defineEmits(['update:modelValue'])

const val = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    val.value = newVal
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => val.value,
  (newVal) => {
    emit('update:modelValue', newVal)
  }
)
</script>

<style lang="scss" scoped>
// .dynamic-form {
// }
</style>
