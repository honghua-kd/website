<template>
  <div class="material-detail">
    <Line name="进度信息" :botBorder="false">
      <el-button type="primary" link>新增</el-button>
      <el-button type="primary" link>导入</el-button>
    </Line>
    <Table
      :data="tableData"
      :loading="tableLoading"
      :columnConfig="tableConfig"
      :height="tableHeight"
      :setColumnEnable="false"
    >
      <template #action="scope">
        <template v-if="scope.row.id">
          <el-button link type="primary">编辑</el-button>
          <el-button link type="danger">删除</el-button>
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import Line from './components/line.vue'
import Table from '@/components/Table/index.vue'
import { ref, onMounted, computed, reactive } from 'vue'
import { tableConfig } from './data'
import type { tableDataType } from './type'
import { SupplierAPI } from '@/api'

const API = new SupplierAPI()
let tableData = reactive<tableDataType[]>([{}])
const tableLoading = ref(false)
const pageTotal = ref(100)
const queryFormList = reactive({
  pageNo: 1,
  pageSize: 10
})

onMounted(() => {
  getList()
})
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
// 获取列表数据
const getList = async () => {
  tableLoading.value = true
  await API.getSupplierList(queryFormList)
    .then((res) => {
      if (res && res.code === 200) {
        tableData || [].splice(0, tableData || [].length)
        console.log(res.data, '22222')
        const list: tableDataType[] = (res?.data?.list || []).map((i) => ({
          supplierName: i.supplierName,
          supplierTypeName: i.supplierTypeName,
          coverArea: i.coverArea,
          contactName: i.contactName,
          phone: i.phone
        }))
        tableData = [...list]
        pageTotal.value = res?.data?.total || 0
        tableLoading.value = false
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style lang="scss" scoped></style>
