<template>
  <div>
    <div class="scan-search-container" ref="searchBoxRef">
      <SearchBar
        v-model="queryForm"
        :searchConfig="searchConfig"
        @reset="resetForm"
        @search="getList"
      >
      </SearchBar>
    </div>
    <el-divider border-style="dashed" />
    <Table
      :data="tableData"
      :loading="tableLoading"
      :columnConfig="tableConfig"
      :height="tableHeight"
      :page-total="pageTotal"
      :isSelected="false"
      v-model:pageSize="queryForm.pageSize"
      v-model:pageNo="queryForm.pageNo"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #action="scope">
        <div class="opera-context">
          <el-button link type="primary" @click="handleDwon(scope.row)">
            下载
          </el-button>
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, Ref, onMounted, computed } from 'vue'
import dayjs from 'dayjs'
import { RecordAPI, ExportTableItem } from '@/api'
import type { ITableConfigProps } from '@/components/Table/type'
import type { ISearchUnit } from '@/components/SearchBar/type'
import SearchBar from '@/components/SearchBar/index.vue'
import Table from '@/components/Table/index.vue'
import { ElButton, ElMessage } from 'element-plus'
import { handleDownloadFile } from '@/utils'
const API = new RecordAPI()
onMounted(() => {
  getList()
})
const tableLoading = ref<boolean>(false)
const pageTotal: Ref<number> = ref(0) // 列表的总页数

interface DownloadForm {
  pageNo: number
  pageSize: number
  startCreateTime: '' | Date
  endCreateTime: '' | Date
}
const queryForm = reactive<DownloadForm>({
  pageNo: 1,
  pageSize: 10,
  startCreateTime: '',
  endCreateTime: ''
})
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
  API.uploadExportRecordPage(parm)
    .then((res) => {
      if (res && res.code === 200) {
        tableLoading.value = false
        res?.data?.list.forEach((el, index) => {
          el.indexStr = index + 1
        })
        tableData.splice(0, tableData.length)
        tableData.push(...(res?.data?.list || []))
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

const tableData = reactive<ExportTableItem[]>([])

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
const handleDwon = (row: ExportTableItem) => {
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
const searchConfig: ISearchUnit[] = [
  [
    {
      compType: 'date-range-picker',
      colSpan: 12,
      label: '时间范围',
      propStart: 'startCreateTime',
      propEnd: 'endCreateTime',
      placeholderStart: '开始时间',
      placeholderEnd: '结束时间'
    }
  ],
  []
]
const tableConfig: ITableConfigProps[] = [
  {
    label: '序号',
    prop: 'indexStr',
    width: 60,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: true
  },
  {
    label: '下载人',
    prop: 'creatorName',
    minWidth: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: true
  },
  {
    label: '下载时间',
    prop: 'createTime',
    minWidth: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '状态',
    prop: 'statusName',
    minWidth: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '下载类型',
    prop: 'downloadTypeName',
    minWidth: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    type: 'action',
    label: '操作',
    prop: 'action',
    width: '120',
    minWidth: '',
    fixed: 'right',
    align: 'center'
  }
]
</script>
