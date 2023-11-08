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
            <el-form-item label="字典标签:" prop="dictLabel" class="widthFull">
              <el-input
                v-model="queryParams.dictLabel"
                placeholder="请输入字典标签"
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
              @click="searchHandler"
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
      ></el-table>
    </el-card>
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
  dictLabel: '', // 字典类型
  status: undefined // 状态
})
const tableData = ref([])
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

// 获取字典列表
const getList = () => {
  console.log('leist')
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
