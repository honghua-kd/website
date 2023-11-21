<template>
  <div>
    <!-- 搜索工作栏 -->
    <el-card class="container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-row :gutter="15">
          <el-col :span="6">
            <el-form-item label="字典名称:" prop="dictType" class="widthFull">
              <el-select v-model="queryParams.dictType"   placeholder="请选择字典名称">
                <el-option v-for="item in dictOpts" :key="item.id" :label="item.name" :value="item.type"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="字典标签:" prop="label" class="widthFull">
              <el-input
                v-model="queryParams.label"
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
          <el-col style="text-align: right" :span="8">
            <el-button :icon="Refresh" @click="resetQuery">
              重置
              </el-button>
            <el-button plain :icon="Search" @click="searchHandler" >
              搜索
            </el-button>
            <el-button
              type="primary"
              :icon="Plus"
              @click="addHandler('add',queryParams.dictType)"
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
        <el-table-column align="center" label="字典编码" prop="id" width="100"/>
        <el-table-column
          align="center"
          label="字典标签"
          prop="label"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          label="字典键值"
          prop="value"
        />
        <el-table-column
          align="center"
          label="字典类型"
          prop="dictType"
          width="250"
        />
        <el-table-column
          align="center"
          label="字典排序"
          prop="sort"
        />
        <el-table-column
          align="center"
          label="字典父级"
          prop="parentValue"
        />
        <el-table-column
          align="center"
          label="字典层级"
          prop="dataLevel"
        />
        <el-table-column align="center" label="状态" prop="status">
          <template #default="scope">
            <el-tag :type="formatTag(scope.row.status, 'type')" effect="light">
              {{ formatTag(scope.row.status, 'title') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="备注" prop="remark" />
        <el-table-column
          :formatter="dateFormatter"
          align="center"
          label="创建时间"
          prop="createTime"
          width="180"
        />
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button link type="primary" @click="editHandler('edit',scope.row.id)">
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
    <DataDictTypeFrom ref="dataDictFormRef" @success="getList"/>
  </div>
</template>

<script setup>
import { ref, reactive, onActivated } from 'vue'
import { useDictStore } from '@/store/dict.js'
import {
  Refresh,
  Search,
  Plus
} from '@element-plus/icons-vue'
import { useRoute } from '@toystory/lotso'
import { getDataDict, delDataDict } from '@/api/system'
import { dateFormatter } from '@/utils'
import DataDictTypeFrom from './DataDictForm.vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const dictStore = useDictStore()
const dictOpts = ref([])
const route = useRoute()
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
  dictType: '', // 字典类型
  label: '', // 字典标签
  status: undefined // 状态
})
const tableData = ref([])
const pageTotal = ref(0) // 列表的总页数

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
// 列表tag转换
const formatTag = (status, tagType) => {
  const type = status === 0 ? '' : 'info'
  const title = status === 0 ? '开启' : '关闭'
  if (tagType === 'type') return type
  if (tagType === 'title') return title
}
// 获取字典列表
const getList = () => {
  loading.value = true
  const params = {
    ...queryParams
  }
  getDataDict(params).then(res => {
    loading.value = false
    if (res && res.code === 200) {
      const { list, total } = res.data
      tableData.value = list
      pageTotal.value = total
    }
  }).catch(err => {
    loading.value = false
    console.log(err)
  })
}
// 切换页数
const handleCurrentChange = (val) => {
  queryParams.pageNo = val
  getList()
}
const handleSizeChange = (val) => {
  queryParams.pageSize = val
  getList()
}

// 新增
const dataDictFormRef = ref(null)
const addHandler = (type, data) => {
  dataDictFormRef.value.open(type, data)
}
// 修改
const editHandler = (type, id) => {
  dataDictFormRef.value.open(type, id)
}

// 删除
const delHandler = (id) => {
  // 二次确认
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const params = {
      id
    }
    delDataDict(params).then(res => {
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        searchHandler()
      }
    })
  }).catch(() => {
    ElMessage({
      type: 'danger',
      message: '删除失败'
    })
  })
}

onActivated(async () => {
  dictOpts.value = dictStore.getDictMap
  queryParams.dictType = route.value.query.type
  if (route.value.query.type) {
    searchHandler()
  }
})
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
