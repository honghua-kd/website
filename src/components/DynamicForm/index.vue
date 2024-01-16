<template>
  <el-form
    class="dynamic-form"
    ref="dynamicFormRef"
    v-bind="props"
    :model="modelValue"
    :label-width="formLabelWidth"
  >
    <el-row
      :gutter="gutter || 20"
      v-for="rowNum in dynamicData.slice(-1)[0].row"
      :key="rowNum"
    >
      <el-col
        :span="dynamicItem.col"
        v-for="dynamicItem in dynamicData.filter((item) => item.row === rowNum)"
        :key="dynamicItem.prop"
      >
        {{ dynamicItem }}
      </el-col>
    </el-row>
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
// import FormItem from '@/components/ElFormItem/index.vue'
import type { DynamicFormProps, DynamicFormItemProps } from './type'
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
  const data: DynamicFormItemProps[] = []
  let defer = 0
  for (let i = 0; i < itemLength.value; i++) {
    const rowSpan = props.data[i].rowSpan || 1
    defer = defer + rowSpan - 1
    console.log(props.data[i].prop, (i + 1 + defer) / props.colNum)
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

const emit = defineEmits(['update:modelValue'])

watch(
  () => props.modelValue,
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
