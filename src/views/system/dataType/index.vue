<template>
  <div>
    <!-- 搜索工作栏 -->
    <el-card class="container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="字典名称:" prop="dictType" class="width-full">
              <el-select
                v-model="queryParams.dictType"
                placeholder="请选择字典名称"
              >
                <el-option
                  v-for="(item, index) in dictOpts"
                  :key="index"
                  :label="(item.name as string)"
                  :value="(item.type as string)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="字典标签:" prop="label" class="width-full">
              <el-input
                v-model="queryParams.label"
                placeholder="请输入字典标签"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="状态:" prop="status" class="width-full">
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
            <el-button :icon="Refresh" @click="resetQuery"> 重置 </el-button>
            <el-button plain :icon="Search" @click="searchHandler">
              搜索
            </el-button>
            <el-button
              type="primary"
              :icon="Plus"
              @click="addHandler('add', queryParams.dictType as string)"
            >
              新增
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
        <el-table-column
          align="center"
          label="字典编码"
          prop="id"
          width="100"
        />
        <el-table-column
          align="center"
          label="字典标签"
          prop="label"
          show-overflow-tooltip
        />
        <el-table-column align="center" label="字典键值" prop="value" />
        <el-table-column
          align="center"
          label="字典类型"
          prop="dictType"
          width="250"
        />
        <el-table-column align="center" label="字典排序" prop="sort" />
        <el-table-column align="center" label="字典父级" prop="parentValue" />
        <el-table-column align="center" label="字典层级" prop="dataLevel" />
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
            {{ formatDate(scope.row.createTime, '') }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button
              link
              type="primary"
              @click="editHandler('edit', scope.row.id)"
            >
              修改
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
    <DataDictTypeFrom ref="dataDictFormRef" @success="getList" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onActivated, Ref } from 'vue'
import { useDictStore } from '@/store/dict'
import { Refresh, Search, Plus } from '@element-plus/icons-vue'
import { useRoute } from '@toystory/lotso'
import { SystemAPI } from '@/api/system'
import { formatDate } from '@/utils'
import DataDictTypeFrom from './DataDictForm.vue'
import { ElMessageBox, ElMessage, ElForm } from 'element-plus'
import type {
  DictListItem,
  DictTypePage,
  DictListRequest,
  PageRequest
} from '@/api'

const API = new SystemAPI()
const dictStore = useDictStore()
const dictOpts: Ref<DictTypePage[]> = ref([])
const route = useRoute()
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

const queryParams = reactive<PageRequest & DictListRequest>({
  pageNo: 1,
  pageSize: 10,
  dictType: '', // 字典类型
  label: '', // 字典标签
  status: undefined // 状态
})
const tableData: Ref<DictListItem[]> = ref([])
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
  const params = {
    ...queryParams
  }
  API.getDataDict(params)
    .then((res) => {
      loading.value = false
      if (res && res.code === 200) {
        tableData.value = res?.data?.list || []
        pageTotal.value = res?.data?.total || 0
      }
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
    })
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

// 新增
const dataDictFormRef = ref()
const addHandler = (type: string, data: string) => {
  dataDictFormRef.value.open(type, data)
}
// 修改
const editHandler = (type: string, id: number | string) => {
  dataDictFormRef.value.open(type, id)
}

// 删除
const delHandler = (id: number) => {
  // 二次确认
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      const params = {
        id
      }
      API.delDataDict(params).then((res) => {
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

onActivated(async () => {
  dictOpts.value = dictStore.getDictMap
  queryParams.dictType = route?.value?.query.type as string
  if (route?.value.query.type) {
    searchHandler()
  }
})
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 20px;
  font-size: 14px;
}
.width-full {
  width: 100%;
}
</style>
