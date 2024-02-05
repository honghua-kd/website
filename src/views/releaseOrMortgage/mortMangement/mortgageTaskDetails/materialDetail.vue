<template>
  <div class="material-detail">
    <Line name="材料明细" :botBorder="false" />
    <div class="wrap">
      <div class="title">登记证书 │ 已归档 2023-12-23</div>
      <div class="top-table">
        <el-carousel trigger="click" height="150px" class="carousel">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small justify-center" text="2xl">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <Table
          :data="tableData"
          :loading="tableLoading"
          :columnConfig="tableConfig"
          :height="150"
          :setColumnEnable="false"
        >
          <template #action="scope">
            <el-button link type="primary" @click="handleDetails(scope.row.id)"
              >编辑</el-button
            >
          </template>
        </Table>
      </div>
      <div class="title">抵押材料</div>
      <Table
        :data="tableData"
        :loading="tableLoading"
        :columnConfig="tableConfig"
        :height="200"
        :setColumnEnable="false"
      >
        <template #action="scope">
          <el-button link type="primary" @click="handleDetails(scope.row.id)"
            >详情</el-button
          >
        </template>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import Line from './components/line.vue'
import { ref, onMounted, reactive } from 'vue'
import { tableConfig } from './data'
import { SupplierAPI } from '@/api'
import type { tableDataType } from './type'

const API = new SupplierAPI()
let tableData = reactive<tableDataType[]>([{}])
const tableLoading = ref(false)
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
        const list: tableDataType[] = (res?.data?.list || []).map((i) => ({
          supplierName: i.supplierName,
          supplierTypeName: i.supplierTypeName,
          coverArea: i.coverArea,
          contactName: i.contactName,
          phone: i.phone
        }))
        tableData = [...list]
        tableLoading.value = false
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 详情
const handleDetails = (id: number) => {
  console.log(id)
}
</script>

<style lang="scss" scoped>
.material-detail {
  .title {
    font-weight: 900;
  }
  .top-table {
    display: flex;
    margin-bottom: 10px;
  }
  .carousel {
    margin-right: 10px;
    width: 17%;
  }
}
</style>
<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}
.el-carousel__item h3 {
  margin: 0;
  text-align: center;
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
