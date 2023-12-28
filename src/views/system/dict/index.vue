<template>
  <div>
    <!-- 搜索工作栏 -->
    <div class="dict-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="字典名称" prop="name" class="width-full">
              <el-input
                v-model="queryParams.name"
                placeholder="请输入字典名称"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="字典类型" prop="type" class="width-full">
              <el-input
                v-model="queryParams.type"
                placeholder="请输入字典类型"
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
          <el-col style="text-align: right" :span="8">
            <el-button :icon="Search" type="primary" @click="searchHandler">
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
      <div class="table-btn-box">
        <el-button type="primary" :icon="Plus" @click="addDictHandler">
          新增
        </el-button>
      </div>
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
            <el-tag :type="fromatTagStatus(scope.row.status)" effect="light">
              {{ formatTag(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" prop="remark" />
        <el-table-column
          align="center"
          label="创建时间"
          prop="createTime"
          width="180"
        >
          <template #default="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
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
    </div>
    <DictTypeForm ref="dictTypeRef" @success="getList" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, Ref } from 'vue'
import { Refresh, Search, Plus } from '@element-plus/icons-vue'
import { useRouter } from '@toystory/lotso'
import { SystemAPI } from '@/api/system'
import { formatDate } from '@/utils'
import DictTypeForm from './DictTypeForm.vue'
import { ElMessageBox, ElMessage, ElForm } from 'element-plus'
import type { DictTypePage, DictTypePageRequest } from '@/api'

const API = new SystemAPI()

const queryFormRef = ref<InstanceType<typeof ElForm>>()
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

const queryParams = reactive<DictTypePageRequest>({
  pageNo: 1,
  pageSize: 10,
  name: '', // 字典名称
  type: '', // 字典类型
  status: '' // 状态
})
const tableData: Ref<DictTypePage[]> = ref([])
const pageTotal: Ref<number> = ref(0) // 列表的总页数

const loading = ref(false)
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
// 列表tag转换
const formatTag = (status: number): string => {
  const title = status === 1 ? '开启' : '关闭'
  return title
}

const fromatTagStatus = (status: number): '' | 'info' => {
  const type = status === 1 ? '' : 'info'
  return type
}
// 获取字典列表
const getList = () => {
  loading.value = true
  API.getDictList(queryParams)
    .then((res) => {
      loading.value = false
      tableData.value = res?.data?.list || []
      pageTotal.value = res?.data?.total || 0
    })
    .catch((err) => {
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
const editHandler = (row: DictTypePage) => {
  dictTypeRef.value.open('edit', row)
}

/** 删除按钮操作 */
const delHandler = (id: number) => {
  // 二次确认
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
      API.deleteDict(params).then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          searchHandler()
        }
      })
    })
    .catch((err: Error) => {
      throw err
    })
}
// 跳转数据
const jumpDataHandler = (row: DictTypePage) => {
  const { type } = row
  const { router } = useRouter()
  router.push({ name: 'dataType', query: { type } })
}

// 切换页数
const handleCurrentChange = (val: number) => {
  queryParams.pageNo = val
  getList()
}
const handleSizeChange = (val: number) => {
  queryParams.pageSize = val
  getList()
}

const init = () => {
  searchHandler()
}
init()
</script>

<style lang="scss" scoped>
.dict-container {
  margin-top: 10px;
  font-size: 14px;
}
.table-btn-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}
.width-full {
  width: 100%;
}
</style>
