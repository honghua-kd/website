<template>
  <div>
    <el-form-item :label="formItem.label" :prop="[formItem.prop as string]">
      <slot :name="formItem.slotName ? formItem.slotName : 'default'">
        <!-- timeRange -->
        <template v-if="formItem.compType === 'timeRange'">
          <el-date-picker
            v-model="modelValue[formItem.prop]"
            type="datetime"
            :placeholder="formItem.placeholder || '请选择'"
            style="margin-right: 4%; width: 48%"
          />
          <el-date-picker
            v-model="formItem.prop"
            type="datetime"
            :placeholder="formItem.placeholder || '请选择'"
            style="width: 48%"
          />
        </template>
        <!-- el-input -->
        <template v-else-if="formItem.compType === 'el-input'">
          <el-input
            v-model="formItem.prop"
            clearable
            :placeholder="formItem.placeholder || '请输入'"
          />
        </template>
        <!-- el-select -->
        <template v-else-if="formItem.compType === 'el-select'">
          <el-select
            v-model="formItem.prop"
            style="width: 100%"
            clearable
            :placeholder="formItem.placeholder || '请选择'"
          >
            <el-option
              v-for="(cell, index) in dictObj[formItem.options as string]"
              :key="index"
              :label="cell.label"
              :value="cell.value"
            />
          </el-select>
        </template>
        <template v-else-if="formItem.compType === 'el-cascader'">
          <el-cascader
            v-model="formItem.prop"
            :props="formItem.cascaderProps"
            :placeholder="formItem.placeholder || '请选择'"
          />
        </template>
      </slot>
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
import { watch, reactive } from 'vue'
import { useDictStore } from '@/store/dict'
import type {
  IFormItemProps,
  dictState
  // IFormItemConfigBase,
  // ISearchConfigCascader
} from './type'

// const emit = defineEmits(['update:modelValue'])

const props = withDefaults(defineProps<IFormItemProps>(), {})

const dictObj = reactive<dictState>({})
const dictStore = useDictStore()
const generateOptions = () => {
  const dictMap = dictStore.dicts
  if (props.dictArray) {
    props.dictArray.forEach((item) => {
      const tempArray = dictMap[item] || []
      dictObj[item] = tempArray
    })
  }
}
watch(
  () => dictStore.dicts,
  () => {
    generateOptions()
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="scss" scoped></style>
