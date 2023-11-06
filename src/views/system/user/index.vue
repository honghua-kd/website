<template>
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
  <el-card class="container">list</el-card>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {
  Refresh,
  Search
} from '@element-plus/icons-vue'
const statusOpts = ref([
  {
    label: '开启',
    value: 1
  },
  {
    label: '关闭',
    value: 2
  }
])
const queryFormRef = ref(null)
const queryParams = reactive({
  userName: '', // 用户名称
  phoneNum: '', // 手机号
  status: 1, // 状态
  createTime: [] // 创建时间
})

// reset
const resetQuery = () => {
  queryFormRef.value.resetFields()
}
// search
const searchHandler = () => {
  console.log('queryParams', queryParams)
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
