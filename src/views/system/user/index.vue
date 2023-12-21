<template>
  <div class="user-container">
    <el-card class="tree-container">
      <SideTree @getSelect="getSelectNodeHandler" />
    </el-card>
    <div class="right-part">
      <!-- 搜索工作栏 -->
      <el-card class="search-bar">
        <el-form ref="queryFormRef" :model="queryParams" :inline="true">
          <el-row :gutter="15">
            <el-col :span="16">
              <el-form-item
                label="员工工号:"
                prop="staffCode"
                class="widthFull"
              >
                <el-input
                  v-model="queryParams.staffCode"
                  placeholder="请输入员工工号"
                  class="widthFull"
                  clearable
                />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item
                label="员工姓名:"
                prop="staffName"
                class="widthFull"
              >
                <el-input
                  v-model="queryParams.staffName"
                  placeholder="员工姓名"
                  class="width-full"
                  clearable
                />
              </el-form-item>
            </el-col> -->

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
          <el-table-column
            type="index"
            width="60"
            label="序号"
            fixed
            align="center"
          />
          <el-table-column
            label="员工姓名"
            align="center"
            key="id"
            prop="staffName"
            fixed
          />
          <el-table-column label="员工工号" align="center" prop="staffCode" />
          <el-table-column
            align="center"
            label="管理单元名称"
            prop="ouidName"
          />
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
            width="100"
          >
            <template #default="scope">
              <el-button
                link
                type="primary"
                @click="assignPermiHandler(scope.row)"
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
      </el-card>
    </div>
    <PermiListDialog ref="userListRef" @success="searchHandler" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, Ref } from 'vue'
import { SystemAPI } from '@/api/system'
import SideTree from '@/components/SideTree/index.vue'
import { Refresh, Search } from '@element-plus/icons-vue'
import PermiListDialog from '@/components/PermiForm/PermiListDialog.vue'
import { ElForm } from 'element-plus'
import type {
  ResponseBody,
  StaffList,
  StaffListItem,
  OrgInfoItem,
  BaseStaffRequest,
  PageRequest
} from '@/api'
const API = new SystemAPI()
const currentOrgCode: Ref<string> = ref('')
const tableData: Ref<StaffListItem[]> = ref([]) // 列表数据
const loading: Ref<boolean> = ref(false)
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const queryFormRef = ref<InstanceType<typeof ElForm>>()
const queryParams = reactive<PageRequest & BaseStaffRequest>({
  pageNo: 1,
  pageSize: 10,
  staffName: '', // 员工姓名
  staffCode: '' // 员工工号
})

// reset
const resetQuery = () => {
  queryFormRef.value?.resetFields()
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
const getSelectNodeHandler = (node: OrgInfoItem) => {
  const orgCode = node?.orgCode || ''
  currentOrgCode.value = node?.orgCode || ''
  queryParams.staffCode = ''
  queryParams.staffName = ''
  getDeptStaffList(orgCode)
}

// 获取分页部门员工列表
const getDeptStaffList = (orgCode: string) => {
  loading.value = true
  const params = {
    orgCodeList: [orgCode],
    pageNo: queryParams.pageNo,
    pageSize: queryParams.pageSize
  }
  API.getDepartmentStaff(params)
    .then((res: ResponseBody<StaffList>) => {
      loading.value = false
      if (res && res.code === 200) {
        tableData.value = res?.data?.records || []
        pageTotal.value = res?.data?.total || 0
      }
    })
    .catch((err: Error) => {
      loading.value = false
      console.log(err)
    })
}

const getStaffSubHandler = () => {
  const params = {
    pageNo: queryParams.pageNo,
    pageSize: queryParams.pageSize,
    staffCodeList: [queryParams.staffCode]
  }
  API.getStaffSubordinates(params).then((res: ResponseBody<StaffList>) => {
    if (res && res.code === 200) {
      tableData.value = res.data?.records || []
      pageTotal.value = res?.data?.total || 0
    }
  })
}
const handleCurrentChange = (val: number) => {
  queryParams.pageNo = val
  if (queryParams.staffCode || queryParams.staffName) {
    getStaffSubHandler()
  } else {
    getDeptStaffList(currentOrgCode.value)
  }
}
const handleSizeChange = (val: number) => {
  queryParams.pageSize = val
  if (queryParams.staffCode || queryParams.staffName) {
    getStaffSubHandler()
  } else {
    getDeptStaffList(currentOrgCode.value)
  }
}

// 分配数据权限
const userListRef = ref()
const assignPermiHandler = (row: StaffListItem) => {
  userListRef.value.openDialog('staffCode', row)
}
</script>

<style lang="scss" scoped>
.user-container {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  font-size: 14px;
}
.right-part {
  width: 70%;
}
.width-full {
  width: 100%;
}
.search-bar {
  margin-bottom: 10px;
}
.tree-container {
  overflow-y: scroll;
  margin-right: 3%;
  width: 22%;
  height: 550px;
}
.table-container {
  overflow-y: scroll;
  height: 410px;
}
:deep(.el-card__body) {
  padding: 12px !important;
}
</style>
