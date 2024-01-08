<template>
  <div>
    <!-- 搜索工作栏 -->
    <div class="doc-check-container" ref="searchBoxRef">
      <!-- search bar -->
      <SearchBar
        v-model="queryParams"
        :searchConfig="searchConfig"
        @reset="reset"
        @search="searchHandler"
      />
    </div>
    <el-divider border-style="dashed" />
    <!-- 表格 -->
    <Table
      :data="tableData"
      :columnConfig="tableColumn"
      :loading="tableLoading"
      :height="tableHeight"
      :isSelected="true"
      row-key="id"
      :page-total="pageTotal"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @selection-change="selectData"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></Table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, toRefs } from 'vue'
import SearchBar from '@/components/SearchBar/index.vue'
import Table from '@/components/Table/index.vue'
import { searchConfig, tableColumn } from './data'
import type { StateType } from './type'
import type { DocumentPageResponse } from '@/api/docManage/types/response'

const state = reactive<StateType>({
  queryParams: {
    pageFlag: 1,
    pageNo: 1,
    pageSize: 10
  },
  pageTotal: 0,
  tableData: [],
  tableLoading: false,
  selectIdsArr: []
})
const { queryParams, pageTotal, tableData, tableLoading, selectIdsArr } =
  toRefs(state)

// 表格最大高度
const searchBoxRef = ref()
const tableHeight = computed(() => {
  if (searchBoxRef.value?.clientHeight) {
    const height = Number(
      document.documentElement.clientHeight -
        200 -
        searchBoxRef.value?.clientHeight
    )
    return height
  } else {
    const height = Number(document.documentElement.clientHeight - 200)
    return height
  }
})

// 查询
const searchHandler = () => {}
// 重置
const reset = () => {}

const selectData = (selection: DocumentPageResponse[]) => {
  const result: string[] = []
  if (selection.length !== 0) {
    selection.forEach((i: DocumentPageResponse) => {
      result.push(`${i.id}`)
    })
  }
  state.selectIdsArr = result
  console.log(selectIdsArr)
}

const handleSizeChange = (size: number) => {
  queryParams.value.pageSize = size
  queryParams.value.pageNo = 1
}
const handleCurrentChange = (page: number) => {
  queryParams.value.pageNo = page
}
</script>

<style lang="scss" scoped></style>
