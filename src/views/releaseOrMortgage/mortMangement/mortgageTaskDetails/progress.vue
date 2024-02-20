<template>
  <div class="progress">
    <SecondaryTitle title="进度信息">
      <template #more>
        <el-button type="primary" link @click="addProgress">新增</el-button>
        <el-button type="primary" link>导入</el-button>
      </template>
    </SecondaryTitle>
    <TableField
      :data="tableData"
      :loading="tableLoading"
      :columns="progressTableConfig"
      :height="200"
      name="progressTable"
    >
      <template #action="scope">
        <el-button link type="primary" @click="editHandler(scope.row)">
          编辑
        </el-button>
        <el-button link type="danger"> 删除 </el-button>
      </template>
    </TableField>
    <div class="bottom-line"></div>
    <HandlingProgressInfoModel ref="addProgressModel" />
  </div>
</template>

<script setup lang="ts">
import SecondaryTitle from '@/components/SecondaryTitle/index.vue'
import TableField from '@/components/TableField/index.vue'
import { ref, onMounted, reactive } from 'vue'
import { progressTableConfig } from './data'
import type { progressTableDataType } from './type'
import { SupplierAPI } from '@/api'
import HandlingProgressInfoModel from './components/handlingProgressInfoModel.vue'

const API = new SupplierAPI()
let tableData = reactive<progressTableDataType[]>([{}])
const tableLoading = ref(false)
const pageTotal = ref(100)
const queryFormList = reactive({
  pageNo: 1,
  pageSize: 10
})
const addProgressModel = ref()

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
        console.log(res.data, '22222')
        const list: progressTableDataType[] = (res?.data?.list || []).map(
          (i) => ({
            supplierName: i.supplierName,
            supplierTypeName: i.supplierTypeName,
            coverArea: i.coverArea,
            contactName: i.contactName,
            phone: i.phone
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
// 编辑
const editHandler = (id: number) => {
  console.log(id)
}
// 新增办理进度
const addProgress = () => {
  addProgressModel.value.open()
}
</script>

<style lang="scss" scoped></style>
