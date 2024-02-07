<template>
  <div>
    <!-- 搜索工作栏 -->
    <div class="container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-row :gutter="15">
          <el-col :span="5">
            <el-form-item label="角色名称" prop="roleName" class="width-full">
              <el-input
                v-model="queryParams.roleName"
                placeholder="请输入角色名称"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="角色标识" prop="roleCode" class="width-full">
              <el-input
                v-model="queryParams.roleCode"
                placeholder="请输入角色标识"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="状态" prop="status" class="width-full">
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
            <el-form-item label="创建时间" prop="createTime" class="width-full">
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
            <el-button type="primary" :icon="Search" @click="searchHandler">
              查询
            </el-button>
            <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-divider border-style="dashed" />
    <!-- 列表 -->
    <div>
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        border
        v-loading="loading"
      >
        <el-table-column type="index" width="80" label="序号" />
        <el-table-column align="center" label="角色编号" prop="roleNo" />
        <el-table-column align="center" label="角色名称" prop="roleName" />
        <el-table-column align="center" label="角色类型" prop="type" />
        <el-table-column align="center" label="角色标识" prop="code" />
        <el-table-column align="center" label="显示顺序" prop="sort" />
        <el-table-column align="center" label="备注" prop="remark" />
        <el-table-column align="center" label="状态" prop="status">
          <template #default="scope">
            <el-tag :type="fromatTagStatus(scope.row.status)" effect="light">
              {{ formatTag(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          prop="createTime"
          width="180"
        >
          <template #default="scope">
            {{ formatDate(scope.row.createTime, '') }}
          </template>
        </el-table-column>
        <el-table-column :width="300" align="center" label="操作">
          <template #default="scope">
            <el-button
              link
              type="primary"
              @click="openDataPermissionForm(scope.row)"
            >
              数据权限
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
    </div>
    <PermiListDialog ref="roleListRef" @success="getList" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, Ref } from 'vue'
import { SystemAPI } from '@/api/system'
import PermiListDialog from '@/components/PermiForm/PermiListDialog.vue'
import { Refresh, Search } from '@element-plus/icons-vue'
import { formatDate } from '@/utils'
import { ElForm } from 'element-plus'
import type { RolePageRequest, RoleDO } from '@/api'

const API = new SystemAPI()
const statusOpts = ref([
  {
    label: '开启',
    value: 1
  },
  {
    label: '关闭',
    value: 0
  }
])
const loading = ref(false)
const queryFormRef = ref<InstanceType<typeof ElForm>>()
const queryParams = reactive<RolePageRequest>({
  pageNo: 1,
  pageSize: 10,
  roleName: '', // 角色名称
  roleCode: '', // 角色标识
  status: undefined, // 状态
  createTime: [new Date('1 00:00:00'), new Date('1 23:59:59')] // 创建时间
})
const tableData: Ref<RoleDO[]> = ref([]) // 列表数据
const pageTotal = ref<number>(0) // 列表的总页数

// reset
const resetQuery = () => {
  queryFormRef.value?.resetFields()
  searchHandler()
}
// search
const searchHandler = () => {
  queryParams.pageNo = 1
  getList()
}

// 获取列表
const getList = async () => {
  loading.value = true
  API.getRoleList(queryParams)
    .then((res) => {
      loading.value = false
      if (res?.code === 200) {
        const list = res?.data?.list
        const total = res?.data?.total
        tableData.value = list || []
        pageTotal.value = total || 0
      }
    })
    .catch((err: Error) => {
      console.log(err)
      loading.value = false
    })
}

const handleCurrentChange = (val: number) => {
  queryParams.pageNo = val
  getList()
}
const handleSizeChange = (val: number) => {
  queryParams.pageSize = val
  getList()
}
/** 数据权限操作 */
const roleListRef = ref()
const openDataPermissionForm = (row: RoleDO) => {
  roleListRef.value.openDialog('roleCode', row)
}

// 列表tag转换
const formatTag = (status: number): string => {
  const title = status === 1 ? '开启' : '关闭'
  return title
}

const fromatTagStatus = (status: number) => {
  const type = status === 1 ? undefined : 'info'
  return type
}
const init = () => {
  searchHandler()
}
init()
</script>

<style lang="scss" scoped>
.container {
  margin-top: 10px;
  font-size: 14px;
}
.width-full {
  width: 100%;
}
</style>
