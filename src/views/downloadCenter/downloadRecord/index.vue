<template>
  <div>
    <el-form :model="queryForm" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="下载时间：">
            <el-date-picker
              v-model="queryForm.verifyTime"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="submitForm()" :icon="Search">
            搜索
          </el-button>
          <el-button @click="resetForm()" :icon="Refresh">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="tableData"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      border
      v-loading="tableLoading"
    >
      <el-table-column type="index" width="80" label="序号" align="center" />
      <el-table-column prop="downloadPerson" label="下载人"></el-table-column>
      <el-table-column prop="downloadTime" label="下载时间"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="downloadType" label="下载类型"></el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button link type="primary" @click="handleAction(scope.row)">
            下载
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
</template>

<script setup lang="ts">
import { ref, reactive, Ref } from 'vue'
import dayjs from 'dayjs'
import { Refresh, Search } from '@element-plus/icons-vue'
import {
  ElForm,
  ElFormItem,
  ElButton,
  ElDatePicker,
  ElTable,
  ElTableColumn
} from 'element-plus'

const tableLoading = ref<boolean>(false)
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const formRef = ref<InstanceType<typeof ElForm>>()

interface DownloadForm {
  pageNo: number
  pageSize: number
  verifyTime: [Date, Date]
}
const queryForm = reactive<DownloadForm>({
  pageNo: 1,
  pageSize: 10,
  verifyTime: [dayjs().startOf('day').toDate(), dayjs().endOf('day').toDate()] // 创建时间
})

const submitForm = () => {
  // 在这里执行搜索逻辑，例如发送一个 API 请求。
}

const resetForm = () => {
  queryForm.pageNo = 1
  queryForm.pageSize = 10
  queryForm.verifyTime = [
    dayjs().startOf('day').toDate(),
    dayjs().endOf('day').toDate()
  ]
}

/** 定义types */
interface TableItem {
  id: number
  downloadPerson: string
  downloadTime: string
  status: string
  downloadType: string
}
const tableData: Ref<TableItem[]> = ref([
  {
    id: 1,
    downloadPerson: '张三',
    downloadTime: '2023-07-18',
    status: '进行中',
    downloadType: '文件下载'
  },
  {
    id: 2,
    downloadPerson: '李四',
    downloadTime: '2023-07-19',
    status: '已完成',
    downloadType: '图片下载'
  }
  // 可以根据需要添加更多数据行
])

const handleAction = (row: TableItem) => {
  // 在这里处理操作按钮的点击事件，例如弹出一个对话框或执行其他逻辑。
  console.log(row) // 打印当前行的数据对象，你可以根据需要访问其他属性或执行其他操作。
}

// 分页
const handleCurrentChange = (val: number) => {
  console.log('value>>>>>', val)
  queryForm.pageNo = val
  getList()
}

// 页面条数改变
const handleSizeChange = (val: number) => {
  queryForm.pageSize = val
  getList()
}

// 获取列表数据
const getList = () => {
  // 在这里处理获取列表数据
}
</script>
