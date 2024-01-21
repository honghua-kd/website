<template>
  <div style="width: 100%">
    <div class="search-form">
      <DynamicForm
        :data="data"
        v-model="searchQuery"
        @getRowAndCol="getRowAndCol"
        :defaultShowRow="defaultShowRow"
        :gutter="20"
      />
    </div>
    <slot name="form-button">
      <div class="search-btn">
        <el-button type="primary" :icon="Search" @click="search"
          >查询</el-button
        >
        <el-button :icon="Refresh" @click="reset">重置</el-button>
      </div>
    </slot>

    <div
      class="arrow"
      @click="expandHandler"
      v-if="defaultShowRow && row !== 1"
    >
      <el-icon v-if="!expandFlag"><ArrowDownBold /></el-icon>
      <el-icon v-if="expandFlag"><ArrowUpBold /></el-icon>
      <span v-if="!expandFlag" style="margin-left: 4px"> 展开 </span>
      <span v-if="expandFlag" style="margin-left: 4px"> 收回 </span>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'SearchBarV2'
}
</script>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import {
  Refresh,
  Search,
  ArrowDownBold,
  ArrowUpBold
} from '@element-plus/icons-vue'
import type { SearchBarProps } from './type'

const emit = defineEmits(['update:modelValue', 'search', 'reset'])
const props = withDefaults(defineProps<SearchBarProps>(), {})

// 展开-收回处理
const expandFlag = ref<boolean>(false)
const defaultShowRow = ref(props.defaultShowRow)
const expandHandler = (): boolean => {
  expandFlag.value = !expandFlag.value
  defaultShowRow.value = expandFlag.value ? -1 : props.defaultShowRow
}
const searchQuery = ref(props.modelValue)

// 获取排列行和列数据
const row = ref(0)
const colLength = ref(0)
const getRowAndCol = (data) => {
  row.value = data.slice(-1)[0].row
  if (row.value === 1) {
    data.forEach((item) => {
      colLength.value += item.col
    })
  }
  console.log('row-colLent', row.value, colLength.value)
}

// 计算form 宽度
const searchwidth = computed(() => {
  let width = 'calc(100% - 216px)'
  if (row.value === 1) {
    if (colLength.value < 24) {
      width = `calc((100% - 216px) * ${colLength.value} / 24)`
    }
  }
  return width
})

// 查询
const search = () => {
  emit('search')
}

// 重置
const reset = () => {
  emit('reset')
}
watch(
  () => props.modelValue,
  (newVal) => {
    searchQuery.value = newVal
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => searchQuery.value,
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
$searchbarwidth: v-bind(searchwidth);
.arrow {
  margin-bottom: 10px;
  text-align: center;
  color: $base-color-primary;
  cursor: pointer;
}
.search-btn {
  display: inline-block;
  padding: 6px 10px;
  height: 44px;
}
.search-form {
  display: inline-block;
  padding: 6px 10px;
  width: $searchbarwidth;
}
</style>
