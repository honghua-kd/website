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
        v-if="rowNum <= showRows"
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
  <div class="exand" v-if="visibleRows && visibleRows < maxRow">
    <el-link
      v-if="showRows < maxRow"
      type="primary"
      :icon="ArrowDownBold"
      :underline="false"
      @click="showRows = maxRow"
      >展开</el-link
    >
    <el-link
      v-if="showRows === maxRow"
      type="primary"
      :icon="ArrowUpBold"
      :underline="false"
      @click="showRows = visibleRows"
      >收起</el-link
    >
  </div>
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
import type { FormValidateCallback, FormValidationResult } from 'element-plus'
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue'
import DynamicFormItem from './DynamicFormItem.vue'
import type { DynamicFormProps, DynamicFormDataItem } from './type'

const dynamicFormRef = ref<InstanceType<typeof ElForm>>()

const props = withDefaults(defineProps<DynamicFormProps>(), {
  labelWidth: '90px',
  colNum: 4,
  gutter: 20
})

if (props.visibleRows !== undefined && props.visibleRows <= 0) {
  throw new Error('visibleRows不支持小于0的值')
}

const formLabelWidth = computed(() => {
  if (typeof props.labelWidth === 'number') {
    return px2rem(String(props.labelWidth) + 'px')
  }
  return px2rem(props.labelWidth)
})

const itemLength = computed(() => {
  return props.data.length
})

const span = computed(() => {
  return Math.floor(24 / props.colNum)
})

const dynamicData = computed(() => {
  const data: DynamicFormDataItem[] = []
  let defer = 0

  for (let i = 0; i < itemLength.value; i++) {
    const colspan = props.data[i].colspan || 1
    defer = defer + colspan - 1
    const row = Math.ceil((i + 1 + defer) / props.colNum)

    const col = colspan ? span.value * colspan : span.value
    data.push({
      ...props.data[i],
      row,
      col
    })
  }
  return data
})

const maxRow = computed(() => {
  return dynamicData.value.slice(-1)[0].row || 0
})

const showRows = ref<number>(props.visibleRows || 0)
if (props.visibleRows === undefined || props.visibleRows >= maxRow.value) {
  showRows.value = maxRow.value
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

const validate = (callback?: FormValidateCallback): FormValidationResult => {
  return new Promise((resolve) => {
    dynamicFormRef.value
      ?.validate((valid, invalidFields) => {
        callback && callback(valid, invalidFields)
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err: Error) => {
        console.error(err)
      })
  })
}

const resetFields = () => {
  dynamicFormRef.value?.resetFields()
}

const clearValidate = () => {
  dynamicFormRef.value?.clearValidate()
}

defineExpose({ validate, resetFields, clearValidate })
</script>

<style lang="scss" scoped>
.exand {
  height: 18px;
  text-align: center;
  cursor: pointer;
  line-height: 18px;
  :deep(.el-icon) {
    margin-right: 6px;
  }
}
</style>
