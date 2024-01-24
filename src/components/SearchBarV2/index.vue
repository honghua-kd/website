<template>
  <div style="width: 100%">
    <div class="form-container">
      <div class="search-form">
        <DynamicForm
          ref="dynamicFormRef"
          :data="data"
          v-model="searchQuery"
          :colNum="colNum"
          :defaultShowRow="showRow"
          :gutter="20"
        />
      </div>

      <div class="search-btn">
        <slot name="form-button">
          <el-button type="primary" :icon="Search" @click="search"
            >查询</el-button
          >
          <el-button :icon="Refresh" @click="reset">重置</el-button>
        </slot>
      </div>
    </div>

    <div
      class="arrow"
      @click="expandHandler"
      v-if="defaultShowRow <= row && defaultShowRow !== -1"
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
import { ref, watch, onMounted } from 'vue'
import {
  Refresh,
  Search,
  ArrowDownBold,
  ArrowUpBold
} from '@element-plus/icons-vue'
import type { SearchBarProps } from './type'
const emit = defineEmits(['update:modelValue', 'search', 'reset'])
const props = withDefaults(defineProps<SearchBarProps>(), {
  defaultShowRow: -1,
  colNum: 4
})

// 展开-收回处理
const expandFlag = ref<boolean>(false)
const showRow = ref(props.defaultShowRow)
const colNum = ref(props.colNum)
const expandHandler = () => {
  expandFlag.value = !expandFlag.value
  if (expandFlag.value) {
    showRow.value = -1
  } else {
    showRow.value = props.defaultShowRow
  }
}

const searchQuery = ref(props.modelValue)

// 查询
const search = () => {
  emit('search')
}

// 重置
const reset = () => {
  emit('reset')
}
// 获取排列行
const row = ref(0)
const dynamicFormRef = ref()
onMounted(() => {
  row.value = dynamicFormRef.value.getRowNum()
})

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
.form-container {
  display: flex;
  align-items: flex-end;
}
.arrow {
  margin-bottom: 10px;
  text-align: center;
  color: $base-color-primary;
  cursor: pointer;
}
.search-btn {
  padding: 6px 10px;
  width: 220px;
  height: 44px;
}
.search-form {
  flex: 1;
  padding: 6px 10px;
}
</style>
