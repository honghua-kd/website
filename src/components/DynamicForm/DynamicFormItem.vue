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
    style="width: 100%"
  >
    <slot :name="slotName || 'default'">
      <component
        style="width: 100%"
        v-bind="componentsProps"
        v-model="val"
        :is="type"
      >
        <template v-if="type === 'el-select'">
          <el-option
            v-for="({ label, value }, index) in selectOptions"
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
import { watch, computed, ref, reactive } from 'vue'
import type { ComponentsProps, ComponentsName } from './components'
import type { DynamicFormItemProps, OptionItem } from './type'

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
    colspan,
    row,
    col,
    ...restProps
  } = props
  return restProps
})

const emit = defineEmits(['update:modelValue'])

const val = ref(props.modelValue)

const selectOptions = reactive<OptionItem[]>([])

const getOptions = () => {
  if (Array.isArray(props.options)) {
    selectOptions.splice(0, selectOptions.length)
    selectOptions.push(...(props.options as OptionItem[]))
  } else {
    props.options?.then((options) => {
      selectOptions.splice(0, selectOptions.length)
      selectOptions.push(...options)
    })
  }
}

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

if (props.type === 'el-select') {
  getOptions()
}
</script>

<style lang="scss" scoped>
// .dynamic-form {
// }
</style>
