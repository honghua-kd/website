<template>
  <div class="material-allocation">
    <SearchField
      v-model="queryParams"
      :data="searchConfig"
      :colNum="4"
      :labelWidth="'120px'"
      @search="getList"
    >
    </SearchField>
    <!-- <TableField
      :loading="tableLoading"
      :data="tableData"
      :columns="addTaskQueryTableColumn"
      :page-total="pageTotal"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @selection-change="selectData"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #action>
        <el-button link type="primary" @click="edit">编辑</el-button>
      </template>
    </TableField> -->
  </div>
</template>

<script setup lang="ts">
import SearchField from '@/components/SearchField/index.vue'
// import TableField from '@/components/TableField/index.vue'
import { searchConfig } from './data'
import { SearchList } from './type'
import { reactive } from 'vue'

const queryParams = reactive<SearchList>({
  pageNo: 1,
  pageSize: 10
})
// const tableLoading = ref(false)
// const tableData = ref([])
// const pageTotal = ref(0)
// const selectData = (data: any) => {}
// const handleSizeChange = (val: number) => {}
// const handleCurrentChange = (val: number) => {}
// const edit = () => {}
// const addTaskQueryTableColumn = ref()
const getList = () => {}
</script>

<style lang="scss" scoped></style>
