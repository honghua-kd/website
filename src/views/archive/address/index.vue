<template>
  <div>
    <div :ref="searchBoxRef">
      <SearchBar
        v-model="queryParams"
        :searchConfig="searchConfig"
        :labelWidth="'110px'"
        @reset="reset"
        @search="searchHandler"
      >
      </SearchBar>
    </div>
    <el-divider border-style="dashed" />

    <Table
      :data="tableData"
      :loading="tableLoading"
      :columnConfig="tableConfig"
      :isSelected="false"
      :page-total="pageTotal"
      :setColumnEnable="true"
      :height="tableHeight"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @size-change="getList"
      @current-change="getList"
    >
      <template #btnsBox>
        <el-row class="table-btn">
          <el-button type="primary" :icon="Plus" @click="addHandler">
            新增联系人
          </el-button>
        </el-row>
      </template>
      <template #action="scope">
        <template v-if="scope.row.id">
          <el-button link type="primary" @click="editHandler(scope.row)">
            编辑
          </el-button>
          <el-button link type="danger" @click="delHandler(scope.row.id)">
            删除
          </el-button>
        </template>
      </template>
    </Table>
    <EditForm ref="editFormRef" :title="dialogTitle" @success="getList()" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, Ref, computed } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UsualAddressListItem } from '@/api'
import { ExpressAPI } from '@/api'
import SearchBar from '@/components/SearchBar/index.vue'
const API = new ExpressAPI()
import Table from '@/components/Table/index.vue'
import { tableConfig, searchConfig } from './data'
import EditForm from './EditForm.vue'
const tableLoading = ref<boolean>(false)
const dialogTitle = ref<string>('')
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  userName: '',
  userPhone: ''
})
const tableData = reactive<UsualAddressListItem[]>([])
// 表格最大高度
const searchBoxRef = ref()
const tableHeight = computed(() => {
  if (searchBoxRef.value?.clientHeight) {
    const height = Number(
      document.documentElement.clientHeight -
        200 -
        searchBoxRef.value?.clientHeight
    )
    return height
  } else {
    const height = Number(document.documentElement.clientHeight - 200)
    return height
  }
})
const reset = () => {
  queryParams.pageNo = 1
  queryParams.pageSize = 10
  queryParams.userName = ''
  queryParams.userPhone = ''
  getList()
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
      throw err
    })
}

const addHandler = () => {
  dialogTitle.value = '新增联系人信息'
  editFormRef.value.open()
}

// 获取列表
const getList = () => {
  tableLoading.value = true
  API.getUsualAddressList(queryParams)
    .then((res) => {
      tableLoading.value = false
      if (res && res.code === 200) {
        tableData.splice(0, tableData.length)
        tableData.push(...(res?.data?.list || []))
        pageTotal.value = res?.data?.total || 0
      }
    })
    .catch((err: Error) => {
      tableLoading.value = false
      console.log(err)
    })
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
