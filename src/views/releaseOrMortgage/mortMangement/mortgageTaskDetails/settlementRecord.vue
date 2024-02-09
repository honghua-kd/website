<template>
  <div class="settlement-record">
    <SecondaryTitle title="结算记录" />
    <TableField
      :data="tableData"
      :loading="tableLoading"
      :columns="settlementTableConfig"
      :height="250"
      :setColumnEnable="false"
      v-if="tableData.length > 0"
      name="settlementTable"
    >
      <template #action="scope">
        <template v-if="scope.row.id">
          <el-button link type="primary">编辑</el-button>
          <el-button link type="danger">删除</el-button>
        </template>
      </template>
    </TableField>
    <el-empty :image-size="100" v-else description="暂无结算记录" />
    <div class="bottom-line"></div>
  </div>
</template>

<script setup lang="ts">
import SecondaryTitle from '@/components/SecondaryTitle/index.vue'
import type { settlementTableDataType } from './type'
import { ref, onMounted, reactive } from 'vue'
import { settlementTableConfig } from './data'
import { SupplierAPI } from '@/api'
import TableField from '@/components/TableField/index.vue'

const API = new SupplierAPI()
let tableData = reactive<settlementTableDataType[]>([{}])
const tableLoading = ref(false)
const pageTotal = ref(100)
const queryFormList = reactive({
  pageNo: 1,
  pageSize: 10
})
onMounted(() => {
  getList()
})
// 获取列表数据
const getList = async () => {
  tableLoading.value = true
  await API.getSupplierList(queryFormList)
    .then((res) => {
      if (res && res.code === 200) {
        tableData || [].splice(0, tableData || [].length)
        const list: settlementTableDataType[] = (res?.data?.list || []).map(
          (i) => ({
            supplierName: i.supplierName,
            supplierTypeName: i.supplierTypeName || '-',
            coverArea: i.coverArea,
            contactName: i.contactName || '-',
            phone: i.phone,
            time: '2121212'
          })
        )
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
