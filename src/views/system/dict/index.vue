<template>
  <div>
    <!-- 搜索工作栏 -->
    <el-card class="container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="字典名称:" prop="dictName" class="widthFull">
              <el-input
                v-model="queryParams.dictName"
                placeholder="请输入字典名称"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="字典类型:" prop="dictType" class="widthFull">
              <el-input
                v-model="queryParams.dictType"
                placeholder="请输入字典类型"
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
          <el-col :span="8">
            <el-form-item label="创建时间:" prop="createTime" class="widthFull">
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
        </el-row>
        <el-row>
          <el-col style="text-align: right">
            <el-button :icon="Refresh" @click="resetQuery" size="small"
              >重置</el-button
            >
            <el-button plain :icon="Search" @click="searchHandler" size="small">
              搜索
            </el-button>
            <el-button
              type="primary"
              plain
              :icon="Plus"
              @click="addDictHandler"
              size="small"
            >
              新增
            </el-button>
            <el-button
              type="success"
              plain
              :icon="Download"
              @click="searchHandler"
              size="small"
            >
              导出
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
        v-loading="loading"
      >
        <el-table-column type="index" width="80" label="序号" align="center" />
        <el-table-column align="center" label="字典编号" prop="id" />
        <el-table-column
          align="center"
          label="字典名称"
          prop="name"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="字典类型"
          prop="type"
          width="300"
        />
        <el-table-column align="center" label="状态" prop="status">
          <template #default="scope">
            <el-tag :type="formatTag(scope.row.status, 'type')" effect="light">
              {{ formatTag(scope.row.status, 'title') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" prop="remark" />
        <el-table-column
          :formatter="dateFormatter"
          align="center"
          label="创建时间"
          prop="createTime"
          width="180"
        />
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button link type="primary" @click="editHandler(scope.row)">
              修改
            </el-button>
            <el-button link type="primary" @click="jumpDataHandler(scope.row)">
              数据
            </el-button>
            <el-button link type="danger" @click="delHandler(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
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
    <DictTypeForm ref="dictTypeRef" @success="getList" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {
  Refresh,
  Search,
  Plus,
  Download
} from '@element-plus/icons-vue'

import { getDictList } from '@/api/system'
import { dateFormatter } from '@/utils'
import DictTypeForm from './DictTypeForm.vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const queryFormRef = ref(null)
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

const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  dictName: '', // 字典名称
  dictType: '', // 字典类型
  status: undefined, // 状态
  createTime: [] // 创建时间
})
const tableData = ref([])
const pageTotal = ref(0) // 列表的总页数

const loading = ref(false)
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
// 列表tag转换
const formatTag = (status, tagType) => {
  const type = status === 0 ? '' : 'info'
  const title = status === 0 ? '开启' : '关闭'
  if (tagType === 'type') return type
  if (tagType === 'title') return title
}
// 获取字典列表
const getList = () => {
  loading.value = true
  getDictList(queryParams).then(res => {
    loading.value = false
    const { list, total } = res?.data
    tableData.value = list
    pageTotal.value = total
  }).catch(err => {
    console.log(err)
    loading.value = false
  })
}
// 新增字典表
const dictTypeRef = ref()
const addDictHandler = () => {
  dictTypeRef.value.open('add')
}
// 编辑字典
const editHandler = (row) => {
  dictTypeRef.value.open('edit', row)
}

/** 删除按钮操作 */
const delHandler = (id) => {
  // 二次确认
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 调用删除接口
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    searchHandler()
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '删除失败'
    })
  })
}
// 跳转数据
const jumpDataHandler = (row) => {
  console.log('row', row)
}

// 切换页数
const handleCurrentChange = (val) => {
  queryParams.pageNo = val
  getList()
}
const handleSizeChange = (val) => {
  queryParams.pageSize = val
  getList()
}

const init = () => {
  searchHandler()
}
init()
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
