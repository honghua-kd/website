<template>
  <div class="operation-row">
    <!-- 批量操作 -->
    <div class="table-btn-box">
      <slot name="btnsBox"> </slot>
    </div>
    <!-- 设置表格列 -->
    <div class="dropdown-column" v-if="setColumnEnable">
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
              <el-checkbox v-model="checkAll" @change="handleCheckAllChange">
                全选
              </el-checkbox>
            </el-dropdown-item>
            <el-checkbox-group
              v-model="checkedConfig"
              @change="handleCheckedConfig"
            >
              <el-dropdown-item
                v-for="cfg in checkboxTableConfig.filter(
                  (item) => !item.forbiddenEdit && item.type !== 'action'
                )"
                :key="cfg.prop"
              >
                <el-checkbox :label="cfg.prop">
                  {{ cfg.label }}
                </el-checkbox>
              </el-dropdown-item>
            </el-checkbox-group>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
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
        width="40px"
        align="center"
      />
    </slot>

    <template v-for="item in tableConfig" :key="item.prop">
      <el-table-column
        v-if="!item.hide"
        v-bind="item"
        :fixed="item.fixed || false"
      >
        <template #header>
          <slot name="header" v-bind="item">
            <span>{{ item.label }}</span>
          </slot>
        </template>
        <template #default="scope">
          <!-- 自定义列-添加插槽 -->
          <slot
            :name="item.slotName ? item.slotName : 'default'"
            :row="scope.row"
            :prop="item.prop"
          >
            <!-- 时间类型转换 -->
            <span
              v-if="item.type === 'date'"
              :style="item.customStyle ? item.customStyle : {}"
            >
              {{ formatDate(scope.row[item.prop]) }}
            </span>
            <!-- 普通展示列 -->
            <span v-else :style="item.customStyle ? item.customStyle : {}">
              {{ scope.row[item.prop] }}
            </span>
          </slot>
          <!-- 操作列插槽 -->
          <slot
            v-if="item.type === 'action'"
            name="action"
            v-bind="scope"
          ></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <!-- 分页 -->
  <el-pagination
    v-if="pageTotal"
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
  'header-click',
  'update:pageSize',
  'update:pageNo'
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
  emit('update:pageSize', size)
  emit('size-change', size)
}

// 切换页数
const handleCurrentChange = (pageNo: number) => {
  emit('update:pageNo', pageNo)
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
    if (!item.forbiddenEdit) {
      item.hide = !setColumnState.checkedConfig.includes(item.prop)
    }
  })
}

// 自定义表格列-全选
const handleCheckAllChange = (val: string | number | boolean) => {
  const arr = setColumnState.checkboxTableConfig.map((item) => item.prop)
  const arrRequired = setColumnState.checkboxTableConfig.filter(
    (item) => item.forbiddenEdit
  )

  const _val = val as boolean

  setColumnState.checkedConfig = _val
    ? arr
    : arrRequired.map((item) => item.prop)
  setColumnState.isIndeterminate = !_val

  localStorage.setItem(pathName, JSON.stringify(setColumnState.checkedConfig))

  setColumnState.tableConfig.forEach((item) => {
    if (!item.forbiddenEdit) {
      item.hide = !_val
    }
  })
}
// 获取表格设置表头内容
const getCheckConfig = () => {
  setColumnState.checkedConfig = localStorage.getItem(pathName)
    ? JSON.parse(localStorage.getItem(pathName) || '')
    : setColumnState.checkboxTableConfig.map((item) => item.prop)

  setColumnState.tableConfig.forEach((item) => {
    if (!item.forbiddenEdit) {
      item.hide = !setColumnState.checkedConfig.includes(item.prop)
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
</style>
