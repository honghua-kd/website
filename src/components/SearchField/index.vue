<template>
  <div class="form-container">
    <DynamicForm
      class="search-form"
      ref="dynamicFormRef"
      v-bind="props"
      :data="data"
      v-model="searchQuery"
      :colNum="colNum"
      :visibleRows="visibleRows"
      :gutter="20"
    >
      <template v-for="slotName in slotNames" #[slotName]>
        <slot :name="slotName"></slot>
      </template>
    </DynamicForm>
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
  name: 'SearchField'
}
</script>

<script setup lang="ts">
import DynamicForm from '@/components/DynamicForm/DynamicForm.vue'
import { ref, watch, computed } from 'vue'
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

const slotNames = computed(() => {
  const names: string[] = []
  for (let i = 0; i < props.data.length; i++) {
    if (props.data[i].slotName) {
      names.push(props.data[i].slotName as string)
    }
  }
  return names
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
  width: 100%;
}
.search-btn {
  padding: 0 10px 18px;
  width: 220px;
  .has-expand + & {
    padding-bottom: 36px;
  }
}
.search-form {
  flex: 1;
}
</style>
