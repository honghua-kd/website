<template>
  <div class="operation-row">
    <!-- 批量操作 -->
    <div class="table-btn-box">
      <slot name="buttons"></slot>
    </div>
    <!-- 设置表格列 -->
    <div class="dropdown-column" v-if="columnsDropdownVisible">
      <el-dropdown
        trigger="click"
        placement="top-end"
        :hide-on-click="false"
        max-height="300px"
      >
        <div class="set-btn">
          <el-icon :size="px2rem('16px')" class="icon"><Setting /></el-icon>
          <span>设置表格列</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="custom-drop-menu">
            <el-dropdown-item>
              <el-checkbox v-model="isAllColumnsVisible" label="全选" />
            </el-dropdown-item>
            <el-dropdown-item
              v-for="key in Object.keys(columnsVisible)"
              :key="key"
            >
              <el-checkbox
                v-model="columnsVisible[key]"
                :label="columnsLabel[key]"
              />
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <el-table
    ref="tableRef"
    class="table-field"
    :data="data"
    v-bind="tableProps"
    v-loading="loading"
    @select="tableSelect"
    @select-all="tableSelectAll"
    @selection-change="tableSelectionChange"
    @cell-mouse-enter="cellMouseEnter"
    @cell-mouse-leave="cellMouseLeave"
    @cell-click="cellClick"
    @cell-dblclick="cellDblclick"
    @cell-contextmenu="cellContextmenu"
    @row-click="rowClick"
    @row-contextmenu="rowContextmenu"
    @row-dblclick="rowDblclick"
    @header-click="headerClick"
    @header-contextmenu="headerContextmenu"
    @sort-change="sortChange"
    @current-change="rowCurrentChange"
    @header-dragend="headerDragend"
    @expand-change="expandChange"
  >
    <el-table-column
      v-for="item in columns.filter(
        (item) => !item.isDynamic || (item.prop && columnsVisible[item.prop])
      )"
      :key="item.prop"
      v-bind="item"
      :column-key="item.prop"
    >
      <template #header>
        <slot name="header" v-bind="item">
          {{ item.label }}
        </slot>
      </template>
      <template
        v-if="item.type !== ('selection' || 'index' || 'expand')"
        #default="scope"
      >
        <!-- 自定义列-添加插槽 -->
        <slot name="default" v-bind="scope">
          <!-- 普通展示列 -->
          <template v-if="!item.type">
            {{ item.prop && scope.row[item.prop] }}
          </template>
          <!-- 时间类型转换 -->
          <template v-else-if="item.type === 'date' && item.prop">
            {{ formatDate(scope.row[item.prop]) }}
          </template>
        </slot>
        <!-- 操作列插槽 -->
        <slot v-if="item.type === 'action'" name="action" v-bind="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
    v-if="pagination && pageTotal"
    background
    layout="total,sizes,prev, pager, next"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="pageSize"
    :current-page="pageNo"
    :total="pageTotal"
    class="table-page"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts">
export default {
  name: 'Table'
}
</script>

<script lang="ts" setup>
import { reactive, watch, ref, computed } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { useRoute } from '@toystory/lotso'
import { formatDate, px2rem } from '@/utils'

import type { TableFieldProps, TableColumn, TableDataItem } from './type'
const route = useRoute()
const pathName = 'TableField:' + route?.value.path

const props = withDefaults(defineProps<TableFieldProps>(), {
  loading: false,
  data: () => [],
  showHeader: true,
  border: true,
  headerCellClassName: 'table-field-header',
  cellClassName: 'table-field-cell',
  pagination: true,
  scrollbarAlwaysOn: false,
  fit: undefined
})

const tableProps = computed(() => {
  const {
    columns,
    loading,
    pageSize,
    pagination,
    pageNo,
    pageTotal,
    data,
    ...restProps
  } = props
  return restProps
})

const columnsDropdownVisible = computed(() => {
  return props.columns.findIndex((item) => item.isDynamic) !== -1
})

const columnsLabel = computed(() => {
  const labels: Record<string, string> = {}
  props.columns.forEach((item) => {
    if (item.prop) {
      labels[item.prop] = item.label || ''
    }
  })
  return labels
})

const isAllColumnsVisible = ref(false)
const columnsVisible: Record<string, boolean> = reactive({})

const getColumnCache = () => {
  const cacheData = localStorage.getItem(pathName)
  if (cacheData) {
    return JSON.parse(cacheData)
  }
  return {}
}

const setColumnCache = () => {
  localStorage.setItem(pathName, JSON.stringify(columnsVisible))
}

const initDynamicColumns = () => {
  const dynamicColumnsCache = getColumnCache()
  props.columns
    .filter((item) => item.isDynamic)
    .forEach((item) => {
      if (item.prop) {
        const columnsStatusCache = dynamicColumnsCache[item.prop]
        columnsVisible[item.prop] =
          columnsStatusCache !== undefined ? columnsStatusCache : true
      }
    })
  if (Object.values(columnsVisible).findIndex((item) => !item) === -1) {
    isAllColumnsVisible.value = true
  }
}

initDynamicColumns()

watch(
  () => isAllColumnsVisible.value,
  (newVal) => {
    Object.keys(columnsVisible).forEach((k) => {
      columnsVisible[k] = newVal
    })
  }
)

watch(columnsVisible, () => {
  setColumnCache()
})

const emit = defineEmits([
  'select',
  'select-all',
  'selection-change',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-click',
  'cell-dblclick',
  'cell-contextmenu',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'sort-change',
  'filter-change',
  'row-current-change',
  'header-dragend',
  'expand-change',
  'size-change',
  'current-change',
  'update:pageSize',
  'update:pageNo'
])

// 点击表头回调
const headerClick = (column: TableColumn) => {
  emit('header-click', column)
}

// 右键点击表头
const headerContextmenu = (column: TableColumn) => {
  emit('header-contextmenu', column)
}

// 选中条目
const tableSelectionChange = (data: TableDataItem[]) => {
  emit('selection-change', data)
}

// 勾选 Checkbox
const tableSelect = (data: TableDataItem[]) => {
  emit('select', data)
}

// 勾选全选 Checkbox
const tableSelectAll = (data: TableDataItem[]) => {
  emit('select-all', data)
}

// 当单元格 hover 进入时会触发该事件
const cellMouseEnter = (row: TableDataItem, column: TableColumn) => {
  emit('cell-mouse-enter', row, column)
}

// 当单元格 hover 退出时会触发该事件
const cellMouseLeave = (row: TableDataItem, column: TableColumn) => {
  emit('cell-mouse-leave', row, column)
}

// 当某个单元格被点击时会触发该事件
const cellClick = (row: TableDataItem, column: TableColumn) => {
  emit('cell-click', row, column)
}

// 当某个单元格被双击击时会触发该事件
const cellDblclick = (row: TableDataItem, column: TableColumn) => {
  emit('cell-dblclick', row, column)
}

// 当某个单元格被鼠标右键点击时会触发该事件
const cellContextmenu = (row: TableDataItem, column: TableColumn) => {
  emit('cell-contextmenu', row, column)
}

// 当某一行被点击时会触发该事件
const rowClick = (row: TableDataItem, column: TableColumn) => {
  emit('row-click', row, column)
}

// 当某一行被鼠标右键点击时会触发该事件
const rowContextmenu = (row: TableDataItem, column: TableColumn) => {
  emit('row-contextmenu', row, column)
}

// 当某一行被双击时会触发该事件
const rowDblclick = (row: TableDataItem, column: TableColumn) => {
  emit('row-dblclick', row, column)
}

// 当表格的排序条件发生变化的时候会触发该事件
interface SortChangeParams {
  column: TableColumn
  prop: string
  order: string
}
const sortChange = (params: SortChangeParams) => {
  emit('sort-change', params)
}

// 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性
const rowCurrentChange = (
  currentRow: TableDataItem,
  oldCurrentRow: TableDataItem
) => {
  emit('row-current-change', currentRow, oldCurrentRow)
}

// 当拖动表头改变了列的宽度的时候会触发该事件
const headerDragend = (
  newWidth: number,
  oldWidth: number,
  column: TableColumn
) => {
  emit('header-dragend', newWidth, oldWidth, column)
}

// 当用户对某一行展开或者关闭的时候会触发该事件
const expandChange = (row: TableDataItem, expandedRows: TableDataItem[]) => {
  emit('expand-change', row, expandedRows)
}

// pageSize 大小
const handleSizeChange = (size: number) => {
  emit('update:pageSize', size)
  emit('size-change', size)
}

// 切换页数
const handleCurrentChange = (pageNo: number) => {
  emit('update:pageNo', pageNo)
  emit('current-change', pageNo)
}

/**
 * Table内部方法暴露
 */
const tableRef = ref()
// 用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则可直接设置这一行选中与否
const toggleRowSelection = (row: TableDataItem, selected: boolean) => {
  tableRef.value.toggleRowSelection(row, selected)
}
// 用于多选表格，清空用户的选择
const clearSelection = () => {
  tableRef.value.clearSelection()
}
// 返回当前选中的行
const getSelectionRows = () => {
  return tableRef.value.getSelectionRows()
}
// 用于可扩展的表格或树表格，如果某行被扩展，则切换。 使用第二个参数，您可以直接设置该行应该被扩展或折叠。
const toggleRowExpansion = (row: TableDataItem, expanded: boolean) => {
  tableRef.value.toggleRowExpansion(row, expanded)
}

const clearSort = () => {
  tableRef.value.clearSort()
}
const doLayout = () => {
  tableRef.value.doLayout()
}

const doSort = (prop: string, order: string) => {
  tableRef.value.sort(prop, order)
}

const setScrollTop = (top: number) => {
  tableRef.value.setScrollTop(top)
}
const setScrollLeft = (left: number) => {
  tableRef.value.setScrollLeft(left)
}

defineExpose({
  toggleRowSelection,
  clearSelection,
  getSelectionRows,
  toggleRowExpansion,
  clearSort,
  doLayout,
  doSort,
  setScrollTop,
  setScrollLeft
})
</script>

<style lang="scss" scoped>
.operation-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .table-btn-box {
    max-width: calc(100% - 100px);
  }
}
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
.set-btn {
  cursor: pointer;
  line-height: 24px;
  margin-bottom: 6px;
  .el-icon {
    display: inline-block;
    vertical-align: middle;
  }
  span {
    display: inline-block;
    vertical-align: middle;
    height: 24px;
    line-height: 24px;
  }
}
.table-field {
  :deep(th.table-field-header) {
    text-align: center;
    color: #606266;
    background: #eef1f6;
  }
  :deep(td.table-field-cell) {
    border-right: 1px solid #ffffff;
  }
}
</style>
