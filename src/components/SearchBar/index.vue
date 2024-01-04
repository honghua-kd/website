<template>
  <div>
    <!-- 搜索工作栏 -->
    <el-form
      ref="queryFormRef"
      class="scan-form"
      :model="queryParams"
      :label-width="px2rem('90px')"
    >
      <div class="scan-search-bar">
        <template v-for="(unit, index) in searchConfig" :key="index">
          <el-row :gutter="20" v-if="index > 1 ? expandFlag : true">
            <template v-for="item in unit" :key="item.prop">
              <slot :name="item.slotName ? item.slotName : 'default'">
                <el-col :span="item.colSpan">
                  <el-form-item
                    :label="item.label"
                    :prop="[(item as ISearchConfigCommon).prop]"
                  >
                    <!-- el-date-picker -->
                    <template v-if="item.compType === 'el-date-picker'">
                      <el-date-picker
                        v-model="queryParams[(item as ISearchConfigTimer).propStart]"
                        type="datetime"
                        :placeholder="(item as ISearchConfigTimer).placeholderStart"
                        style="margin-right: 4%; width: 48%"
                      />
                      <el-date-picker
                        v-model="queryParams[(item as ISearchConfigTimer).propEnd ]"
                        type="datetime"
                        :placeholder="(item as ISearchConfigTimer).placeholderEnd"
                        style="width: 48%"
                      />
                    </template>
                    <!-- el-input -->
                    <template v-else-if="item.compType === 'el-input'">
                      <el-input
                        v-model="queryParams[(item as ISearchConfigCommon).prop]"
                        clearable
                        :placeholder="item.placeholder"
                      />
                    </template>
                    <!-- el-select -->
                    <template v-else-if="item.compType === 'el-select'">
                      <el-select
                        v-model="queryParams[(item as ISearchConfigCommon).prop]"
                        style="width: 100%"
                        clearable
                        :placeholder="item.placeholder"
                      >
                        <el-option
                          v-for="(cell, index) in dictObj[item.options as string]"
                          :key="index"
                          :label="cell.label"
                          :value="cell.value"
                        />
                      </el-select>
                    </template>
                  </el-form-item>
                </el-col>
              </slot>
            </template>
          </el-row>
        </template>
      </div>
      <slot name="form-button">
        <div class="search-btn">
          <el-button type="primary" :icon="Search" @click="searchHandler"
            >查询</el-button
          >
          <el-button :icon="Refresh" @click="reset">重置</el-button>
        </div>
      </slot>
    </el-form>
    <div class="arrow" @click="expandHandler" v-if="showExpand">
      <el-icon v-if="!expandFlag"><ArrowDownBold /></el-icon>
      <el-icon v-if="expandFlag"><ArrowUpBold /></el-icon>
      <span v-if="!expandFlag" style="margin-left: 4px"> 展开 </span>
      <span v-if="expandFlag" style="margin-left: 4px"> 收回 </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, reactive, Ref } from 'vue'
import { px2rem } from '@/utils'
import {
  Refresh,
  Search,
  ArrowDownBold,
  ArrowUpBold
} from '@element-plus/icons-vue'
import { ElForm } from 'element-plus'
import { useDictStore } from '@/store/dict'
import type {
  IProps,
  queryState,
  dictState,
  ISearchConfigCommon,
  ISearchConfigTimer
} from './type'
const queryFormRef = ref<InstanceType<typeof ElForm>>()

const props = withDefaults(defineProps<IProps>(), {
  searchConfig: () => [],
  query: () => {
    return {}
  },
  showExpand: false
})

const emit = defineEmits(['searchHandler', 'reset'])
const queryParams: Ref<queryState> = ref({})
const dictObj = reactive<dictState>({})

const generateOptions = () => {
  const dictStore = useDictStore()
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
const searchHandler = () => {
  emit('searchHandler', queryParams.value)
}

// 重置
const reset = () => {
  emit('reset')
}

watch(
  () => props.query,
  () => {
    queryParams.value = props.query
    generateOptions()
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="scss" scoped>
.scan-form {
  display: flex;
  align-items: flex-end;
  width: 100%;
}
.scan-search-bar {
  padding: 6px 10px;
  width: calc(100% - 216px);
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
