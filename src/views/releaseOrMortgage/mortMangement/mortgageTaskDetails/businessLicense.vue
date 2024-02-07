<template>
  <div class="business-license">
    <Line name="营业执照" :botBorder="false">
      <el-button type="primary" link>查看详情</el-button>
    </Line>
    <div class="wrap">
      <div class="left-table">
        <div class="title">营业执照历史流转情况</div>
        <TableField
          :data="leftTableData"
          :loading="tableLoading"
          :columns="businessLeftTableConfig"
          :height="200"
          :setColumnEnable="false"
        >
        </TableField>
      </div>
      <div class="right-table">
        <div class="title">营业执照排期情况</div>
        <TableField
          :data="rightTableData"
          :loading="tableLoading"
          :columns="businessRightTableConfig"
          :height="200"
          :setColumnEnable="false"
        >
        </TableField>
      </div>
    </div>
    <div class="bottom-line"></div>
  </div>
</template>

<script setup lang="ts">
import Line from './components/line.vue'
import { ref, onMounted, reactive } from 'vue'
import { businessRightTableConfig, businessLeftTableConfig } from './data'
import TableField from '@/components/TableField/index.vue'
import type {
  businessRightTableDataType,
  businessLeftTableDataType
} from './type'
import { SupplierAPI } from '@/api'

const API = new SupplierAPI()
let rightTableData = reactive<businessRightTableDataType[]>([])
let leftTableData = reactive<businessLeftTableDataType[]>([])
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
        rightTableData || [].splice(0, rightTableData || [].length)
        const list: businessRightTableDataType[] = (res?.data?.list || []).map(
          (i) => ({
            supplierName: i.supplierName,
            supplierTypeName: i.supplierTypeName,
            coverArea: i.coverArea,
            contactName: i.contactName,
            phone: i.phone
          })
        )
        rightTableData = [...list]
        leftTableData = [...list]
        pageTotal.value = res?.data?.total || 0
        tableLoading.value = false
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style lang="scss" scoped>
.business-license {
  .wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .title {
      font-weight: 900;
    }
    .left-table,
    .right-table {
      width: 49%;
    }
  }
}
</style>
