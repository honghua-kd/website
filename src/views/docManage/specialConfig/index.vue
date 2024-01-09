<template>
  <div>
    <!-- 搜索工作栏 -->
    <div class="scan-search-container" ref="searchBoxRef">
      <SearchBar
        v-model="queryParams"
        :dictArray="dictTypes"
        :searchConfig="searchConfig"
        :showExpand="false"
        @reset="reset"
        @search="searchHandler"
        :labelWidth="'120px'"
      />
    </div>
    <el-divider border-style="dashed" />
    <Table
      :data="tableData"
      :loading="tableLoading"
      :columnConfig="tableConfig"
      :isSelected="true"
      :page-total="pageTotal"
      :setColumnEnable="true"
      :height="tableHeight"
      :actionWidth="px2rem('100px')"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @selection-change="selectionChangeHandler"
      @size-change="getList"
      @current-change="getList"
    >
      <!-- 批量操作 -->
      <template #btnsBox>
        <el-button type="primary" :icon="Plus" @click="addHandler">
          新增
        </el-button>
      </template>
      <template #column-switch="{ row, prop }">
        <el-switch v-model="row[prop]" @click="switchHandler(row[prop])" />
      </template>

      <template #action="scope">
        <el-button link type="primary" @click="editHandler(scope.row.batchNo)">
          编辑
        </el-button>
        <el-button link type="danger" @click="delHandler(scope.row.batchNo)">
          删除
        </el-button>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref, computed } from 'vue'
import SearchBar from '@/components/SearchBar/index.vue'
import { searchConfig, tableConfig } from './data'
import { px2rem } from '@/utils'
import { Plus } from '@element-plus/icons-vue'

import { SpecialConfigAPI } from '@/api'
import type { SpecialListItem, SpecialListRequest } from '@/api'

const API = new SpecialConfigAPI()
const queryParams = reactive<SpecialListRequest>({
  pageNo: 1,
  pageSize: 10
})
const dictTypes = ['SYSTEM_DOCUMENT_TYPE']
const tableData = reactive<SpecialListItem[]>([])
const tableLoading = ref<boolean>(false)
const pageTotal: Ref<number> = ref(0) // 列表的总页数

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

// 选择的数据
const selectData = reactive<SpecialListItem[]>([])
const selectionChangeHandler = (item: SpecialListItem[]) => {
  selectData.splice(0, selectData.length)
  selectData.push(...item)
}

// 重置
const reset = () => {
  queryParams.pageNo = 1
  queryParams.pageSize = 10
  queryParams.replaceDocumentType = ''
  queryParams.originalDocumentType = ''
}

// 查询
const searchHandler = () => {
  queryParams.pageNo = 1
  getList()
}

// 获取列表
const getList = () => {
  const params = {
    ...queryParams
  }
  API.getSpecialList(params).then((res) => {
    if (res && res.code === 200) {
      tableData.splice(0, tableData.length)
      tableData.push(...(res?.data?.list || []))
      pageTotal.value = res?.data?.total || 0
    }
  })
}

// 编辑
const editHandler = (id: string) => {
  console.log('id', id)
}
// 删除
const delHandler = (id: string) => {
  console.log('id', id)
}

// 状态开关
const switchHandler = (status: string) => {
  console.log('id', status)
}

// 新增
const addHandler = () => {}
</script>

<style lang="scss" scoped></style>
