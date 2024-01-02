<template>
  <div>
    <el-form :model="queryForm" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="开始时间：">
            <el-date-picker
              v-model="queryForm.startCreateTime"
              type="date"
              style="width: 100%"
              placeholder="开始日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结束时间：">
            <el-date-picker
              v-model="queryForm.endCreateTime"
              type="date"
              placeholder="结束日期"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="getList()" :icon="Search">
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
      <el-table-column prop="creatorName" label="上传人"></el-table-column>
      <el-table-column prop="createTime" label="上传时间"></el-table-column>
      <el-table-column prop="fileName" label="上传文件">
        <template v-slot="scope">
          <el-button @click="downUploadFile(scope.row)" type="text">{{
            scope.row.fileName
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="importTypeName" label="导入类型"></el-table-column>
      <el-table-column prop="statusName" label="状态"></el-table-column>
      <el-table-column prop="statusName" label="失败原因下载">
        <template v-slot="scope">
          <el-button
            v-if="scope.row.status == 2"
            @click="errDown(scope.row)"
            type="text"
            >下载</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="msg"
        label="说明"
        show-overflow-tooltip
      ></el-table-column>
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
import { ref, reactive, Ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { Refresh, Search } from '@element-plus/icons-vue'
import { RecordAPI, ImportTableItem } from '@/api'
import {
  ElForm,
  ElFormItem,
  ElButton,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElMessage
} from 'element-plus'
import { handleDownloadFile } from '@/utils'
const API = new RecordAPI()
onMounted(() => {
  getList()
})
const tableLoading = ref<boolean>(false)
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const formRef = ref<InstanceType<typeof ElForm>>()

interface DownloadForm {
  pageNo: number
  pageSize: number
  startCreateTime: Date | ''
  endCreateTime: Date | ''
}
const queryForm = reactive<DownloadForm>({
  pageNo: 1,
  pageSize: 10,
  startCreateTime: '',
  endCreateTime: ''
})

const getList = () => {
  // 在这里执行搜索逻辑，例如发送一个 API 请求。
  const parm = {
    pageNo: queryForm.pageNo,
    pageSize: queryForm.pageSize,
    startCreateTime:
      queryForm.startCreateTime !== ''
        ? dayjs(queryForm.startCreateTime).format('YYYY-MM-DD HH:mm:ss')
        : '',
    endCreateTime:
      queryForm.endCreateTime !== ''
        ? dayjs(queryForm.endCreateTime).format('YYYY-MM-DD HH:mm:ss')
        : ''
  }
  tableLoading.value = true
  API.uploadImportRecordPage(parm)
    .then((res) => {
      if (res && res.code === 200) {
        tableLoading.value = false
        tableData.value = res?.data?.list || []
        pageTotal.value = res?.data?.total || 0
      } else {
        tableLoading.value = false
      }
    })
    .catch((err: Error) => {
      tableLoading.value = false
      throw err
    })
}

const resetForm = () => {
  queryForm.pageNo = 1
  queryForm.pageSize = 10
  queryForm.startCreateTime = ''
  queryForm.endCreateTime = ''
  getList()
}
const downUploadFile = (row: ImportTableItem) => {
  API.downLoadFiles({ fileCode: row.fileCode })
    .then((res) => {
      if (res) {
        ElMessage({
          type: 'success',
          message: '操作成功'
        })
        handleDownloadFile(res, row.fileName)
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
const errDown = (row: ImportTableItem) => {
  API.importResult({ batchNo: row.batchNo, bizType: row.importType })
    .then((res) => {
      if (res) {
        ElMessage({
          type: 'success',
          message: '操作成功'
        })
        handleDownloadFile(res, row.fileName)
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
const tableData: Ref<ImportTableItem[]> = ref([])

// 分页
const handleCurrentChange = (val: number) => {
  queryForm.pageNo = val
  getList()
}

// 页面条数改变
const handleSizeChange = (val: number) => {
  queryForm.pageSize = val
  getList()
}
</script>
