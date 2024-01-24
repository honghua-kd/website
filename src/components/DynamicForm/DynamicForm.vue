<template>
  <el-form
    class="dynamic-form"
    ref="dynamicFormRef"
    :rules="rules"
    :inline="inline"
    :labelPosition="labelPosition"
    :labelWidth="formLabelWidth"
    :labelSuffix="labelSuffix"
    :hideRequiredAsterisk="hideRequiredAsterisk"
    :requireAsteriskPosition="requireAsteriskPosition"
    :showMessage="showMessage"
    :inlineMessage="inlineMessage"
    :statusIcon="statusIcon"
    :validateOnRuleChange="validateOnRuleChange"
    :size="size"
    :disabled="disabled"
    :scrollToError="scrollToError"
    :model="formValue"
  >
    <template v-for="rowNum in dynamicData.slice(-1)[0].row" :key="rowNum">
      <el-row
        :gutter="gutter || 20"
        v-if="showExpand(rowNum)"
        style="width: 100%"
      >
        <el-col
          :span="dynamicItem.col"
          v-for="dynamicItem in dynamicData.filter(
            (item) => item.row === rowNum
          )"
          :key="dynamicItem.prop"
          style="width: 100%"
        >
          <DynamicFormItem
            v-bind="dynamicItem"
            v-model="formValue[dynamicItem.prop]"
          />
        </el-col>
      </el-row>
    </template>
  </el-form>
</template>

<script lang="ts">
export default {
  name: 'DynamicForm'
}
</script>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { px2rem } from '@/utils'
import { ElForm } from 'element-plus'
import DynamicFormItem from './DynamicFormItem.vue'
import type { DynamicFormProps, DynamicFormDataItem } from './type'
const dynamicFormRef = ref<InstanceType<typeof ElForm>>()

const props = withDefaults(defineProps<DynamicFormProps>(), {
  labelWidth: '90px',
  colNum: 4,
  gutter: 20
})

const formLabelWidth = computed(() => {
  if (typeof props.labelWidth === 'number') {
    return px2rem(String(props.labelWidth) + 'px')
  }
  return px2rem(props.labelWidth)
})

const itemLength = computed(() => {
  return props.data.length
})

const colSpan = computed(() => {
  return Math.floor(24 / props.colNum)
})

const dynamicData = computed(() => {
  const data: DynamicFormDataItem[] = []
  let defer = 0

  for (let i = 0; i < itemLength.value; i++) {
    const rowSpan = props.data[i].colSpan || 1
    defer = defer + rowSpan - 1
    const row = Math.ceil((i + 1 + defer) / props.colNum)

    const col = rowSpan ? colSpan.value * rowSpan : colSpan.value
    data.push({
      ...props.data[i],
      row,
      col
    })
  }
  return data
})

const getRowNum = () => {
  return dynamicData.value.slice(-1)[0].row
}
defineExpose({
  getRowNum
})

// 是否展开收回
const showExpand = (rowNum: number) => {
  let flag: boolean
  if (!props.defaultShowRow) {
    return true
  }
  if (props.defaultShowRow === -1) {
    flag = true
  } else if (rowNum <= props.defaultShowRow) {
    flag = true
  } else {
    flag = false
  }

  return flag
}

const emit = defineEmits(['update:modelValue'])

const formValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    formValue.value = newVal
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => formValue.value,
  (newVal) => {
    emit('update:modelValue', newVal)
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="scss" scoped>
// .dynamic-form {
// }
</style>
