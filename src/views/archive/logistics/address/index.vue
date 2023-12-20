<template>
  <div>
    <div class="search-container">
      <el-form
        ref="queryFormRef"
        :model="queryParams"
        class="search-bar"
        label-width="90px"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="联系人名称:" prop="contractName">
              <el-input
                v-model="queryParams.contractName"
                clearable
                placeholder="请输入联系人名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系方式:" prop="contractWay">
              <el-input
                v-model="queryParams.contractWay"
                clearable
                placeholder="请输入联系方式"
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
        @selection-change="selectionChangeHandler"
        @header-click="sortChangeHandler"
      >
        <el-table-column
          type="selection"
          width="55"
          :selectable="selectableHandler"
        />
        <el-table-column
          label="联系人名称"
          prop="contractName"
          align="center"
        />
        <el-table-column label="联系方式" prop="contractWay" align="center" />
        <el-table-column label="地址" prop="address" align="center" />
        <el-table-column label="邮箱" prop="email" align="center" />

        <el-table-column label="操作" fixed="right" width="240" align="center">
          <template #default="scope">
            <template v-if="scope.row.id">
              <el-button link type="primary" @click="editHandler(scope.row.id)">
                编辑
              </el-button>
              <el-button link type="danger" @click="delHandler([scope.row.id])">
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
    <EditForm ref="editFormRef" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, Ref, computed, onMounted } from 'vue'
import { ElMessageBox, ElMessage, ElForm } from 'element-plus'
import {
  ArrowDownBold,
  ArrowUpBold,
  Plus,
  Delete,
  Upload,
  Download,
  Check
} from '@element-plus/icons-vue'
import EditForm from './EditForm.vue'
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const queryFormRef = ref()
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10
})
const tableData = ref([
  {
    id: '111',
    contractName: '曾锐祺',
    contractWay: '13824513588',
    address: '广州市番禺区市桥街大北路420号',
    email: '123445@qq.com'
  }
])
const editFormRef = ref()
const editHandler = (id: string) => {
  editFormRef.value.open(id)
}
const addHandler = () => {
  editFormRef.value.open()
}

// 分页
const handleCurrentChange = (val: number) => {
  queryParams.pageNo = val
}

// 页面条数改变
const handleSizeChange = (val: number) => {
  queryParams.pageSize = val
}

// 查询
const searchHandler = () => {
  queryParams.pageNo = 1
}
</script>

<style lang="scss" scoped>
.table-btn {
  margin-bottom: 10px;
}
</style>
