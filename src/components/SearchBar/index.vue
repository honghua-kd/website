<template>
  <div>
    <!-- 搜索工作栏 -->
    <el-form
      ref="queryFormRef"
      class="scan-form"
      :model="modelValue"
      :label-width="px2rem(labelWidth)"
    >
      <div class="scan-search-bar">
        <template v-for="(unit, index) in searchConfig" :key="index">
          <el-row :gutter="20" v-if="index > 1 ? expandFlag : true">
            <template v-for="item in unit" :key="item.prop">
              <el-col :span="item.colSpan">
                <el-form-item
                  :label="item.label"
                  :prop="[(item as ISearchConfigCommon).prop]"
                >
                  <slot :name="item.slotName ? item.slotName : 'default'">
                    <!-- timeRange -->
                    <template v-if="item.compType === 'timeRange'">
                      <el-date-picker
                        v-model="modelValue[(item as ISearchConfigTimer).propStart ] "
                        type="datetime"
                        :placeholder="(item as ISearchConfigTimer).placeholderStart || '请选择'"
                        style="margin-right: 4%; width: 48%"
                      />
                      <el-date-picker
                        v-model="modelValue[(item as ISearchConfigTimer).propEnd ]"
                        type="datetime"
                        :placeholder="(item as ISearchConfigTimer).placeholderEnd || '请选择'"
                        style="width: 48%"
                      />
                    </template>
                    <!-- el-input -->
                    <template v-else-if="item.compType === 'el-input'">
                      <el-input
                        v-model="modelValue[(item as ISearchConfigCommon).prop]"
                        clearable
                        :placeholder="item.placeholder || '请输入'"
                      />
                    </template>
                    <!-- el-select -->
                    <template v-else-if="item.compType === 'el-select'">
                      <el-select
                        v-model="modelValue[(item as ISearchConfigCommon).prop]"
                        style="width: 100%"
                        clearable
                        :placeholder="item.placeholder || '请选择'"
                      >
                        <el-option
                          v-for="(cell, index) in dictObj[item.options as string]"
                          :key="index"
                          :label="cell.label"
                          :value="cell.value"
                        />
                      </el-select>
                    </template>
                    <template v-else-if="item.compType === 'el-cascader'">
                      <el-cascader
                        v-model="modelValue[(item as ISearchConfigCascader).prop]"
                        :props="(item as ISearchConfigCascader).cascaderProps"
                        :placeholder="item.placeholder || '请选择'"
                      />
                    </template>
                  </slot>
                </el-form-item>
              </el-col>
            </template>
          </el-row>
        </template>
      </div>
      <slot name="form-button">
        <div class="search-btn" v-if="isSearchBtn">
          <el-button type="primary" :icon="Search" @click="search"
            >查询</el-button
          >
          <el-button :icon="Refresh" @click="reset">重置</el-button>
        </div>
      </slot>
    </el-form>
    <template v-if="isSearchBtn">
      <div class="arrow" @click="expandHandler" v-if="showExpand">
        <el-icon v-if="!expandFlag"><ArrowDownBold /></el-icon>
        <el-icon v-if="expandFlag"><ArrowUpBold /></el-icon>
        <span v-if="!expandFlag" style="margin-left: 4px"> 展开 </span>
        <span v-if="expandFlag" style="margin-left: 4px"> 收回 </span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SearchBar'
}
</script>

<script lang="ts" setup>
import { ref, watch, reactive, computed } from 'vue'
import { px2rem } from '@/utils'
import {
  Refresh,
  Search,
  ArrowDownBold,
  ArrowUpBold
} from '@element-plus/icons-vue'
import { ElForm, ElFormItem } from 'element-plus'
import { useDictStore } from '@/store/dict'
import type {
  IProps,
  dictState,
  ISearchConfigCommon,
  ISearchConfigTimer,
  ISearchConfigCascader
} from './type'
const queryFormRef = ref<InstanceType<typeof ElForm>>()

const props = withDefaults(defineProps<IProps>(), {
  showExpand: false,
  labelWidth: '90px',
  isSearchBtn: true
})

const emit = defineEmits(['search', 'reset', 'update:modelValue'])
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

const expandFlag = ref<boolean>(false)
// 展开-收回处理
const expandHandler = (): boolean => {
  return (expandFlag.value = !expandFlag.value)
}

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
    emit('update:modelValue', newVal)
  },
  {
    immediate: true,
    deep: true
  }
)

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

const searchwidth = computed(() => {
  if (!props.isSearchBtn) {
    return
  }
  let width = 'calc(100% - 216px)'
  if (props.searchConfig.length === 1) {
    const configRow = props.searchConfig[0]
    const colLength = configRow.length
    if (colLength < 4) {
      width = `calc((100% - 216px) * ${colLength} / 4)`
    }
  }
  return width
})
</script>

<style lang="scss" scoped>
$searchbarwidth: v-bind(searchwidth);
.scan-form {
  display: flex;
  align-items: flex-end;
  width: 100%;
}
.scan-search-bar {
  padding: 6px 10px;
  width: $searchbarwidth;
}
.search-btn {
  padding: 6px 10px;
  height: 44px;
}
.arrow {
  margin-bottom: 10px;
  text-align: center;
  color: $base-color-primary;
  cursor: pointer;
}
.width-full {
  width: 100%;
}
:deep(.el-form-item) {
  margin-bottom: 12px;
}
</style>
