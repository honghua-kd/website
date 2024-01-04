<template>
  <!-- 设置表格列 -->
  <div class="dropdown-column" v-if="setColumnEnable">
    <el-dropdown
      trigger="click"
      placement="top-end"
      :hide-on-click="false"
      max-height="300px"
    >
      <div>
        <el-icon :size="px2rem('15px')" class="icon"><Setting /></el-icon>
        <span>设置表格列</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu class="custom-drop-menu">
          <el-dropdown-item>
            <el-checkbox v-model="checkAll" @change="handleCheckAllChange">
              全选
            </el-checkbox>
          </el-dropdown-item>
          <el-checkbox-group
            v-model="checkedConfig"
            @change="handleCheckedConfig"
          >
            <el-dropdown-item
              v-for="cfg in checkboxTableConfig"
              :key="cfg.prop"
            >
              <el-checkbox :label="cfg.prop" :disabled="cfg.showDisabled">
                {{ cfg.label }}
              </el-checkbox>
            </el-dropdown-item>
          </el-checkbox-group>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

  <el-table
    :data="data"
    v-loading="loading"
    :header-cell-style="{
      background: '#eef1f6',
      color: '#606266',
      textAlign: 'center'
    }"
    border
    :cell-style="{ borderRight: '1px solid #fff' }"
    :max-height="height"
    @selection-change="selectionChangeHandler"
    @header-click="headerClickHandler"
    v-bind="$attrs"
  >
    <slot name="selection">
      <el-table-column
        v-if="isSelected"
        type="selection"
        width="40"
        align="center"
      />
    </slot>

    <template v-for="item in tableConfig" :key="item.prop">
      <el-table-column
        v-if="item.show"
        v-bind="item"
        :align="item.align"
        :showOverflowTooltip="item.showOverflowTooltip"
        :width="item.width ? item.width : 120"
        :fixed="item.fixed ? item.fixed : false"
      >
        <template #header>
          <slot name="header" v-bind="item">
            <span>{{ item.label }}</span>
          </slot>
        </template>
        <template #default="{ row }">
          <!-- 自定义列-添加插槽 -->
          <slot
            :name="item.slotName ? item.slotName : 'default'"
            :row="row"
            :prop="item.prop"
          >
            <!-- 时间类型转换 -->
            <span
              v-if="item.valueType === 'dateType'"
              :style="item.customStyle ? item.customStyle : {}"
            >
              {{ formatDate(row[item.prop]) }}
            </span>
            <!-- 普通展示列 -->
            <span v-else :style="item.customStyle ? item.customStyle : {}">
              {{ row[item.prop] }}
            </span>
          </slot>
        </template>
      </el-table-column>
    </template>
    <el-table-column label="操作" fixed="right" width="120" align="center">
      <template #default="scope">
        <slot name="action" v-bind="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
    v-if="pageTotal"
    background
    layout="total,sizes,prev, pager, next"
    :page-sizes="[10, 20, 50, 100]"
    :total="pageTotal"
    class="table-page"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import { reactive, toRefs, watch } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { useRoute } from '@toystory/lotso'
import { formatDate, px2rem } from '@/utils'

import type { CheckboxValueType, TableColumnCtx } from 'element-plus'
import type { IProps, IColumnState, TableRecord } from './type'
const route = useRoute()
const pathName = 'Table:' + (route?.value.name as string)

const props = withDefaults(defineProps<IProps>(), {
  columnConfig: () => [],
  data: () => [],
  loading: false,
  height: 300,
  isSelected: false,
  pageTotal: 0,
  setColumnEnable: true
})

const setColumnState = reactive<IColumnState>({
  checkAll: true,
  checkedConfig: [],
  checkboxTableConfig: props.columnConfig,
  isIndeterminate: true,
  tableConfig: props.columnConfig
})

const { checkAll, checkedConfig, checkboxTableConfig, tableConfig } =
  toRefs(setColumnState)

const emit = defineEmits([
  'selection-change',
  'size-change',
  'current-change',
  'header-click'
])

// 点击表头回调
const headerClickHandler = (column: TableColumnCtx<TableRecord>) => {
  const { property, label } = column
  const cbProp = {
    prop: property,
    label
  }
  emit('header-click', cbProp, column)
}

// 选中条目
const selectionChangeHandler = (item: TableRecord[]) => {
  emit('selection-change', item)
}

// pageSize 大小
const handleSizeChange = (size: number) => {
  emit('size-change', size)
}

// 切换页数
const handleCurrentChange = (pageNo: number) => {
  emit('current-change', pageNo)
}

// 自定义表格列
const handleCheckedConfig = (value: CheckboxValueType[]) => {
  const checkedCount = value.length
  setColumnState.checkAll =
    checkedCount === setColumnState.checkboxTableConfig.length
  setColumnState.checkedConfig = value as string[]
  localStorage.setItem(pathName, JSON.stringify(value))

  setColumnState.tableConfig.forEach((item) => {
    if (!item.showDisabled) {
      item.show = setColumnState.checkedConfig.includes(item.prop)
    }
  })
}

// 自定义表格列-全选
const handleCheckAllChange = (val: string | number | boolean) => {
  const arr = setColumnState.checkboxTableConfig.map((item) => item.prop)
  const arrRequired = setColumnState.checkboxTableConfig.filter(
    (item) => item.showDisabled
  )

  const _val = val as boolean

  setColumnState.checkedConfig = _val
    ? arr
    : arrRequired.map((item) => item.prop)
  setColumnState.isIndeterminate = !_val

  localStorage.setItem(pathName, JSON.stringify(setColumnState.checkedConfig))

  setColumnState.tableConfig.forEach((item) => {
    if (!item.showDisabled) {
      item.show = !!_val
    }
  })
}
// 获取表格设置表头内容
const getCheckConfig = () => {
  setColumnState.checkedConfig = localStorage.getItem(pathName)
    ? JSON.parse(localStorage.getItem(pathName) || '')
    : setColumnState.checkboxTableConfig.map((item) => item.prop)

  setColumnState.tableConfig.forEach((item) => {
    if (!item.showDisabled) {
      item.show = setColumnState.checkedConfig.includes(item.prop)
    }
  })
  setColumnState.checkAll = !(
    setColumnState.checkedConfig.length < setColumnState.tableConfig.length
  )
}
watch(
  () => props.columnConfig,
  () => {
    setColumnState.tableConfig = props.columnConfig
    getCheckConfig()
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="scss" scoped>
.dropdown-column {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 26px;
  flex-direction: row;
  .icon {
    margin-right: 5px;
  }
}
</style>
