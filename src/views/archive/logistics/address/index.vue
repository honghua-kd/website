<template>
  <div>
    <div class="search-container">
      <el-form
        ref="queryFormRef"
        :model="queryParams"
        class="search-bar"
        :label-width="px2rem('90px')"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="联系人名称:" prop="userName">
              <el-input
                v-model="queryParams.userName"
                clearable
                placeholder="请输入联系人名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话:" prop="userPhone">
              <el-input
                v-model="queryParams.userPhone"
                clearable
                placeholder="请输入联系电话"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="end">
          <el-col :span="10" class="btn-row">
            <el-form-item>
              <el-button type="primary" @click="searchHandler">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-row class="table-btn">
        <el-button type="primary" :icon="Plus" @click="addHandler">
          新增联系人
        </el-button>
      </el-row>
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        border
        v-loading="tableLoading"
        row-key="id"
        :tree-props="{ children: 'target' }"
      >
        <el-table-column label="联系人名称" prop="userName" align="center" />
        <el-table-column label="联系电话" prop="userPhone" align="center" />
        <el-table-column label="地址" prop="userAddress" align="center" />
        <el-table-column label="邮箱" prop="userMail" align="center" />

        <el-table-column label="操作" fixed="right" width="240" align="center">
          <template #default="scope">
            <template v-if="scope.row.id">
              <el-button link type="primary" @click="editHandler(scope.row)">
                编辑
              </el-button>
              <el-button link type="danger" @click="delHandler(scope.row.id)">
                删除
              </el-button>
            </template>
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
    <EditForm ref="editFormRef" :title="dialogTitle" @success="getList()" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, Ref } from 'vue'
import { ElMessageBox, ElMessage, ElForm } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UsualAddressListItem } from '@/api'
import { ExpressAPI } from '@/api'
import { px2rem } from '@/utils'
const API = new ExpressAPI()
import EditForm from './EditForm.vue'
const tableLoading = ref<boolean>(false)
const dialogTitle = ref<string>('')
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const queryFormRef = ref()
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  userName: '',
  userPhone: ''
})
const tableData: Ref<UsualAddressListItem[]> = ref([])
const reset = () => {
  queryParams.pageNo = 1
  queryParams.pageSize = 10
  queryParams.userName = ''
  queryParams.userPhone = ''
}
const editFormRef = ref()
const editHandler = (row: string) => {
  dialogTitle.value = '编辑联系人信息'
  editFormRef.value.open(row)
}

const delHandler = (id: number) => {
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 调用删除接口
      const params = {
        id
      }
      API.delUsualAddress(params).then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          getList()
        }
      })
    })
    .catch((err: Error) => {
      ElMessage({
        type: 'error',
        message: '删除失败'
      })
      throw err
    })
}

const addHandler = () => {
  dialogTitle.value = '新增联系人信息'
  editFormRef.value.open()
}

// 分页
const handleCurrentChange = (val: number) => {
  queryParams.pageNo = val
}
// 获取列表
const getList = () => {
  tableLoading.value = true
  const params = {
    userName: queryParams.userName,
    userPhone: queryParams.userPhone
  }
  API.getUsualAddressList(params)
    .then((res) => {
      tableLoading.value = false
      if (res && res.code === 200) {
        tableData.value = res?.data?.list || []
        pageTotal.value = res?.data?.total || 0
      }
    })
    .catch((err: Error) => {
      tableLoading.value = false
      console.log(err)
    })
}
// 页面条数改变
const handleSizeChange = (val: number) => {
  queryParams.pageSize = val
}

// 查询
const searchHandler = () => {
  queryParams.pageNo = 1
  getList()
}
const init = () => {
  getList()
}

init()
</script>

<style lang="scss" scoped>
.table-btn {
  margin-bottom: 10px;
}
</style>
