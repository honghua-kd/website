<template>
  <div class="business-license">
    <Line name="营业执照" :botBorder="false">
      <el-button type="primary" link>查看详情</el-button>
    </Line>
    <div class="wrap">
      <div class="left-table">
        <div class="title">营业执照历史流转情况</div>
        <Table
          :data="tableData"
          :loading="tableLoading"
          :columnConfig="tableConfig"
          :height="200"
          :setColumnEnable="false"
        >
        </Table>
      </div>
      <div class="right-table">
        <div class="title">营业执照排期情况</div>
        <Table
          :data="tableData"
          :loading="tableLoading"
          :columnConfig="tableConfig"
          :height="200"
          :setColumnEnable="false"
        >
        </Table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Line from './components/line.vue'
import Table from '@/components/Table/index.vue'
import { ref, onMounted, reactive } from 'vue'
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
