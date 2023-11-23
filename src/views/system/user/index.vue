<template>
  <div class="container">
    <el-card class="treeContainer">
      <SideTree @getSelect="getSelectNodeHandler"/>
    </el-card>
    <div class="right-part">
      <!-- 搜索工作栏 -->
    <el-card class="search-bar">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-row :gutter="15">
          <el-col :span="8">
            <el-form-item label="员工工号:" prop="staffCode" class="widthFull">
              <el-input
                v-model="queryParams.staffCode"
                placeholder="请输入员工工号"
                class="widthFull"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="员工姓名:" prop="staffName" class="widthFull">
              <el-input
                v-model="queryParams.staffName"
                placeholder="员工姓名"
                class="widthFull"
                clearable
              />
            </el-form-item>
          </el-col>

          <el-col :span="6" style="text-align: right">
            <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
            <el-button type="primary" :icon="Search" @click="searchHandler">
              搜索
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 列表 -->
    <el-card>
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        border
        v-loading="loading"
        class="table-container"
      >
        <el-table-column type="index" width="60" label="序号" fixed />
        <el-table-column label="员工姓名" align="center" key="id" prop="staffName"  fixed/>
        <el-table-column
          label="员工工号"
          align="center"
          prop="staffCode"
        />
        <el-table-column align="center" label="管理单元名称" prop="ouidName" />
        <el-table-column
          label="一级部门"
          align="center"
          prop="org1Name"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="二级部门"
          align="center"
          prop="org2Name"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="三级部门"
          align="center"
          prop="org3Name"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="岗位名称"
          align="center"
          prop="positionName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="是否在岗"
          align="center"
          prop="onJobStatus"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="上级领导"
          align="center"
          prop="reportToStaffName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="上级领导工号"
          align="center"
          prop="reportToStaffCode"
          :show-overflow-tooltip="true"
        />
        <el-table-column align="center" label="邮箱" prop="email" />
      <el-table-column
        label="操作"
        align="center"
        class-name="fixed-width"
        fixed="right"
        width="150"
      >
      <template #default="scope">
        <el-button link type="primary" @click="assignPermiHandler(scope.row)">
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
    </el-card>
    </div>
    <PermiListDialog ref="userListRef" @success="searchHandler" />
  </div>
</template>

<script setup >
import { ref, reactive } from 'vue'
import { getDepartmentStaff, getStaffSubordinates } from '@/api/system'
import SideTree from '@/components/SideTree/index.vue'
import {
  Refresh,
  Search
} from '@element-plus/icons-vue'
import PermiListDialog from '@/components/PermiForm/PermiListDialog.vue'

const currentOrgCode = ref('')
const tableData = ref([]) // 列表数据
const loading = ref(false)
const pageTotal = ref(0) // 列表的总页数
const queryFormRef = ref(null)
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  staffName: '', // 员工姓名
  staffCode: '' // 员工工号
})

// reset
const resetQuery = () => {
  queryFormRef.value.resetFields()
  searchHandler()
}
// search-查询用户的下属
const searchHandler = () => {
  queryParams.pageNo = 1
  if (queryParams.staffCode || queryParams.staffName) {
    getStaffSubHandler()
  } else {
    getDeptStaffList(currentOrgCode.value)
  }
}
// 获取选中节点code
const getSelectNodeHandler = (node) => {
  const { orgCode } = node
  currentOrgCode.value = orgCode
  getDeptStaffList(orgCode)
}

// 获取部门员工列表
const getDeptStaffList = (orgCode) => {
  loading.value = true
  const params = { orgCode }
  getDepartmentStaff(params).then(res => {
    loading.value = false
    if (res && res.code === 200) {
      const { staffList, total } = res?.data
      tableData.value = staffList
      pageTotal.value = total
    }
  }).catch(err => {
    loading.value = false
    console.log(err)
  })
}

const getStaffSubHandler = () => {
  const params = {
    ...queryParams
  }
  getStaffSubordinates(params).then(res => {
    if (res && res.code === 200) {
      tableData.value = res.data?.staffList
    }
  })
}
const handleCurrentChange = (val) => {
  queryParams.pageNo = val
  getStaffSubHandler()
}
const handleSizeChange = (val) => {
  queryParams.pageSize = val
  getStaffSubHandler()
}

// 分配数据权限
const userListRef = ref(null)
const assignPermiHandler = (row) => {
  userListRef.value.openDialog('staffCode', row)
}
</script>

<style lang='scss' scoped>

.container {
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  font-size: 14px;
}
.right-part {
  width:70%;
}
.widthFull {
  width: 100%;
}
.search-bar{
  margin-bottom: 10px;
}
.treeContainer {
  width: 22%;
  margin-right: 3%;
  height: 550px;
  overflow-y: scroll;
}
.table-container {
  height:410px;
  overflow-y: scroll;
}
</style>
