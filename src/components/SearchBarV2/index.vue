<template>
  <div class="form-container">
    <div class="search-form">
      <DynamicForm
        ref="dynamicFormRef"
        v-bind="props"
        :data="data"
        v-model="searchQuery"
        :colNum="colNum"
        :visibleRows="visibleRows"
        :gutter="20"
      />
    </div>
    <div class="search-btn">
      <slot>
        <el-button type="primary" :icon="Search" @click="search"
          >查询</el-button
        >
        <el-button :icon="Refresh" @click="reset">重置</el-button>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'SearchBarV2'
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Refresh, Search } from '@element-plus/icons-vue'
import type { SearchBarProps } from './type'
const emit = defineEmits(['update:modelValue', 'search', 'reset'])
const props = withDefaults(defineProps<SearchBarProps>(), {})

const searchQuery = ref(props.modelValue)

const dynamicFormRef = ref()

// 查询
const search = () => {
  emit('search', searchQuery.value)
}

// 重置
const reset = () => {
  dynamicFormRef.value.resetFields()
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
.form-container {
  display: flex;
  align-items: flex-end;
  width: 100%;
}
.search-btn {
  padding: 0 10px 36px;
  width: 220px;
}
.search-form {
  flex: 1;
}
</style>
