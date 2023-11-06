<template>
  <div>
    <!-- 搜索工作栏 -->
    <el-card class="container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-row :gutter="15">
          <el-col :span="5">
            <el-form-item label="用户名称:" prop="userName" class="widthFull">
              <el-input
                v-model="queryParams.userName"
                placeholder="请输入用户名称"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="手机号码:" prop="phoneNum" class="widthFull">
              <el-input
                v-model="queryParams.phoneNum"
                placeholder="请输入手机号码"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="状态:" prop="status" class="widthFull">
              <el-select
                v-model="queryParams.status"
                clearable
                placeholder="请选择状态"
              >
                <el-option
                  v-for="item in statusOpts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建时间:" prop="creatTime" class="widthFull">
              <el-date-picker
                v-model="queryParams.createTime"
                :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
                end-placeholder="结束日期"
                start-placeholder="开始日期"
                type="daterange"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
            <el-button type="primary" :icon="Search" @click="searchHandler">
              搜索
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 列表 -->
    <el-card class="container">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        border
      >
        <el-table-column type="index" width="80" label="序号" />
        <el-table-column label="用户编号" align="center" key="id" prop="id" />
        <el-table-column
          label="用户名称"
          align="center"
          prop="username"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="用户昵称"
          align="center"
          prop="nickname"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="部门"
          align="center"
          key="deptName"
          prop="dept.name"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="手机号码"
          align="center"
          prop="mobile"
          width="120"
        />
        <el-table-column align="center" label="状态" prop="status">
          <template #default="scope">
            <el-tag :type="formatTag(scope.row.status, 'type')" effect="light">
              {{ formatTag(scope.row.status, 'title') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :formatter="dateFormatter"
          align="center"
          label="创建时间"
          prop="createTime"
          width="180"
        />
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-if="pageTotal"
        background
        layout="total,sizes,prev, pager, next"
        :page-sizes="[10, 20, 50, 100]"
        :total="pageTotal"
        class="table-page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup >
import { ref, reactive } from 'vue'
import { getUserList } from '@/api/system'
import { dateFormatter } from '@/utils'

import {
  Refresh,
  Search
} from '@element-plus/icons-vue'
const statusOpts = ref([
  {
    label: '开启',
    value: 0
  },
  {
    label: '关闭',
    value: 1
  }
])
const tableData = ref([]) // 列表数据
const pageTotal = ref(0) // 列表的总页数
const queryFormRef = ref(null)
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  userName: '', // 用户名称
  phoneNum: '', // 手机号
  status: undefined, // 状态
  createTime: [] // 创建时间
})

// reset
const resetQuery = () => {
  queryFormRef.value.resetFields()
  searchHandler()
}
// search
const searchHandler = () => {
  queryParams.pageNo = 1
  getList()
}

// 获取列表
const getList = () => {
  getUserList(queryParams).then(res => {
    if (res && res.code === 200) {
      const { list, total } = res?.data
      tableData.value = list
      pageTotal.value = total
    }
  })
}
const handleCurrentChange = (val) => {
  queryParams.pageNo = val
  getList()
}
const handleSizeChange = (val) => {
  queryParams.pageSize = val
  getList()
}

// 列表tag转换
const formatTag = (status, tagType) => {
  const type = status === 0 ? '' : 'info'
  const title = status === 0 ? '开启' : '关闭'
  if (tagType === 'type') return type
  if (tagType === 'title') return title
}
</script>

<style lang='scss' scoped>
.container {
  margin-bottom: 20px;
  font-size: 14px;
}
.widthFull {
  width: 100%;
}
</style>
