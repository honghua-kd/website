<template>
  <div>
    <!-- 搜索工作栏 -->
    <div class="scan-search-container" ref="searchBoxRef">
      <SearchBar
        v-model="queryParams"
        :dictArray="dictTypes"
        :searchConfig="searchConfig"
        :showExpand="true"
        @reset="reset"
        @search="searchHandler"
      />
    </div>
    <el-divider border-style="dashed" />
    <!-- 表格 -->
    <!-- table 组件引入 -->
    <Table
      :data="tableData"
      :loading="tableLoading"
      :columnConfig="tableConfig"
      :isSelected="true"
      :page-total="pageTotal"
      :setColumnEnable="true"
      row-key="id"
      :tree-props="{ children: 'target' }"
      :height="tableHeight"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @selection-change="selectionChangeHandler"
      @header-click="sortChangeHandler"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <!-- 批量操作 -->
      <template #btnsBox>
        <el-button type="primary" :icon="Plus" @click="uploadHandler">
          上传车辆登记证
        </el-button>
        <el-tooltip
          content="需勾选要归档的条目，方可操作"
          placement="top-start"
        >
          <el-button type="primary" :icon="Check" @click="achiveHandler">
            选择 & 归档
          </el-button>
        </el-tooltip>
        <el-tooltip
          content="需勾选要删除的条目，方可操作"
          placement="top-start"
        >
          <el-button
            type="primary"
            :icon="Delete"
            @click="delHandler(selectIds)"
          >
            删除
          </el-button>
        </el-tooltip>

        <el-button type="primary" :icon="Download" @click="exportHandler">
          导出
        </el-button>
      </template>
      <!-- 表格插槽 -->
      <template #selection>
        <el-table-column
          type="selection"
          :width="'40px'"
          :selectable="selectableHandler"
          align="center"
        />
      </template>
      <template #header="item">
        <span>{{ item.label }}</span>
        <svg-icon
          v-if="item.slotHeader"
          :name="setSortFlag((queryParams[item.prop + 'Sort'] as string) || '')"
          :size="px2rem('20px')"
        />
      </template>

      <template #default="{ row, prop }">
        <!-- 归档状态 -->
        <span v-if="prop === 'archivalStatus'">
          {{ getAchivalStatus(row[prop]) }}
        </span>
        <!-- 核对结果 -->
        <span v-if="row.fileCode && prop === 'verifyResult'">
          <svg-icon
            :name="getVerifyResult(row)"
            :size="px2rem('20px')"
            color="#f39b1c"
          />
        </span>
        <!-- 登记证归档序号 -->
        <span
          v-if="prop === 'registerCardArchiveNo'"
          :class="row.fileCode ? '' : 'font-color-system'"
        >
          {{ row.registerCardArchiveNo }}
        </span>
        <!-- 文件名 -->
        <span v-if="prop === 'fileName'">
          <span
            v-if="row.fileCode"
            @click="openPreview(row.fileCode)"
            class="file-name"
          >
            {{ row.fileName }}
          </span>
          <span v-else class="font-color-system">
            {{ row.fileName || '系统数据' }}
          </span>
        </span>
      </template>

      <template #soltItem="{ row, prop }">
        <span>
          <TableSlotItem :rowInfo="row" :rowKey="prop" />
        </span>
      </template>

      <template #action="scope">
        <template v-if="scope.row.fileCode">
          <el-button
            v-if="
              scope.row.archivalStatus === ARCHIVE_STATUS.UNACHIVED &&
              scope.row.verifyResult !== VERIFY_RESULTS.PROCESSING
            "
            link
            type="primary"
            @click="editHandler(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            v-if="scope.row.archivalStatus !== ARCHIVE_STATUS.ACHIVED"
            link
            type="danger"
            @click="delHandler([scope.row.id])"
          >
            删除
          </el-button>
        </template>
      </template>
    </Table>
    <EditForm ref="editFormRef" @success="getList()" />
    <UploadForm ref="uploadFormRef" @success="getList()" />
    <Preview
      v-model="previewVisible"
      :fileUrl="previewUrl"
      title="文件预览"
      :fileName="preFileName"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, Ref, computed, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { openLink, isPdf, handleDownloadFile, px2rem } from '@/utils'
import EditForm from './EditForm.vue'
import UploadForm from './UploadForm.vue'
import { MortageAPI, CommonAPI } from '@/api'
import Table from '@/components/Table/index.vue'

import type { TableColumnCtx } from 'element-plus'
import { Plus, Delete, Download, Check } from '@element-plus/icons-vue'

import type {
  VehiRegisterCardListRequest,
  PageRequest,
  SortParamsRequest,
  CardListItem
} from '@/api'

import TableSlotItem from './components/TableSlotItem.vue'
import { ARCHIVE_STATUS, VERIFY_RESULTS } from '@/constants'
import { useUserStore } from '@toystory/lotso'
import dayjs from 'dayjs'
import Preview from '@/components/Preview/index.vue'
import { useGetPreviewURL } from '@/hooks/useGetPreviewURL'
import { tableConfig, searchConfig } from './data'
import SearchBar from '@/components/SearchBar/index.vue'

const API = new MortageAPI()
const ComAPI = new CommonAPI()
const pageTotal: Ref<number> = ref(0) // 列表的总页数

const tableLoading = ref<boolean>(false)

const tableData = reactive<CardListItem[]>([])
type QueryParams = VehiRegisterCardListRequest &
  PageRequest &
  SortParamsRequest & { [index: string]: string | number | null | undefined }

const queryParams = reactive<QueryParams>({
  pageNo: 1,
  pageSize: 10,
  startVerifyTime: dayjs().startOf('day').toString(),
  endVerifyTime: dayjs().endOf('day').toString(),
  creatorName: '', // 创建者
  verifyResult: '', // 核对结果
  batchNo: '', // 批次号
  engineNo: '', // 发动机号
  engineType: '', // 发动机型号
  archivalStatus: '', // 归档状态
  contractNo: '', // 合同号
  licensePlateNo: '', // 车牌号
  vinNo: '', // 车架号
  agencyName: '', // 办事处
  affiliatesName: '', // 挂靠商
  channelName: '', // 渠道商
  fileNameSort: '', // 文件名排序
  registerCardArchiveNoSort: '', // 注册车辆排序
  verifyResultSort: '' // 核验结果排序
})

const selectData: Ref<CardListItem[]> = ref([])
const curStaffCode = ref<string>('')
const dictTypes = ['ARCHIVE_STATUS', 'OCR_STATUS']

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

// 归档状态处理
const getAchivalStatus = (status: string) => {
  let topic = ''
  if (status === ARCHIVE_STATUS.ACHIVED) {
    topic = '已归档'
  } else if (status === ARCHIVE_STATUS.UNACHIVED) {
    topic = '未归档'
  }

  return topic
}

// 打开文件预览
const previewVisible = ref<boolean>(false)
const previewUrl = ref<string>('')
const preFileName = ref<string>('')

const { getSinglePreviewURL } = useGetPreviewURL()
const openPreview = async (fileCode: string) => {
  const data = await getSinglePreviewURL(fileCode)
  previewUrl.value = data?.preUrl as string
  preFileName.value = data?.fileName as string

  if (!previewUrl.value) {
    ElMessage.error('读取上传文件URL出错')
  }
  // 临时添加，PDF 文件直接打开预览
  if (isPdf(preFileName.value)) {
    openLink(previewUrl.value, '_blank')
    return
  }
  previewVisible.value = true
}

// 核验结果处理
const getVerifyResult = (row: CardListItem) => {
  const result = row.verifyResult
  if (result === VERIFY_RESULTS.PASS) {
    return 'pass'
  }
  if (result === VERIFY_RESULTS.PROCESSING) {
    return 'processing'
  }
  if (result === VERIFY_RESULTS.FAIL) {
    return 'fail'
  }
  return ''
}

// 选择的数据
const selectionChangeHandler = (item: CardListItem[]) => {
  console.log('item', item)
  selectData.value.splice(0, selectData.value.length)
  selectData.value.push(...item)
}

const selectIds = computed(() => {
  const ids: string[] = []
  selectData.value.forEach((item) => {
    if (item.fileCode && item.id) {
      ids.push(item.id)
    }
  })
  return ids
})

// 是否可选
const selectableHandler = (row: CardListItem) => {
  return !!(row.fileCode && row.archivalStatus !== ARCHIVE_STATUS.ACHIVED)
}

// 上传车辆登记证
const uploadFormRef = ref()
const uploadHandler = () => {
  const title = `${curStaffCode.value}-${dayjs().format('YYYYMMDDHHmmss')}`
  uploadFormRef.value.open('upload', title, curStaffCode.value, true)
}

// 删除
const delHandler = (ids: string[]) => {
  if (!ids.length) {
    ElMessage({
      type: 'error',
      message: '请选择要删除的内容'
    })
    return
  }
  // 二次确认
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 调用删除接口
      const params = {
        ids
      }

      API.delRegisterCard(params).then((res) => {
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
// 编辑
const editFormRef = ref()
const editHandler = (id: string) => {
  editFormRef.value.open(id)
}

// 排序
const sortCols = ['fileName', 'registerCardArchiveNo', 'verifyResult']
const sortChangeHandler = (column: TableColumnCtx<CardListItem>) => {
  const prop = column?.prop
  if (sortCols.indexOf(prop) === -1) {
    return
  }
  const typeArr = ['', 'ASC', 'DESC']
  const key = (prop + 'Sort') as keyof SortParamsRequest
  if (queryParams) {
    const index = typeArr.indexOf(queryParams[key] as string)
    queryParams[key] = typeArr[index === 2 ? 0 : index + 1]
  }
  getList()
}

const setSortFlag = (type: string): string => {
  let name = 'sortDefault'
  switch (type) {
    case 'ASC':
      name = 'sortAsc'
      break
    case 'DESC':
      name = 'sortDesc'
      break
    default:
      name = 'sortDefault'
  }
  return name
}
// 分页
const handleCurrentChange = (val: number) => {
  queryParams.pageNo = val
  getList()
}

// 页面条数改变
const handleSizeChange = (val: number) => {
  queryParams.pageSize = val
  getList()
}

// 查询
const searchHandler = () => {
  queryParams.pageNo = 1
  getList()
}

/**
 * 归档&删除校验处理
 * 归档-处理中不可归档
 * **/
const checkRulesHandler = (
  selectArr: CardListItem[],
  compareKey: keyof CardListItem,
  key: string
) => {
  const result = false
  for (let i = 0; i < selectArr.length; i++) {
    if (selectArr[i][compareKey] === key) {
      return true
    }
  }
  return result
}

// 归档处理
const achiveHandler = () => {
  if (!selectIds.value.length) {
    ElMessage({
      type: 'error',
      message: '请选择要归档的内容'
    })
    return
  }
  if (
    checkRulesHandler(
      selectData.value,
      'verifyResult',
      VERIFY_RESULTS.PROCESSING
    )
  ) {
    ElMessage({
      type: 'error',
      message:
        '所选数据核对结果含有处理中数据，处理中数据不可归档，请重新选择！'
    })
    return
  }
  // 二次确认
  ElMessageBox.confirm('确认要归档吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      const params = {
        ids: selectIds.value
      }
      API.achiveRegisterCard(params)
        .then((res) => {
          if (res && res.code === 200) {
            ElMessage({
              type: 'success',
              message: '操作成功'
            })
            getList()
            selectData.value.splice(0, selectData.value.length)
          }
        })
        .catch((err: Error) => {
          throw err
        })
    })
    .catch((err: Error) => {
      throw err
    })
}

// 导出
const exportHandler = async () => {
  const { pageNo, pageSize, startVerifyTime, endVerifyTime, ...others } =
    queryParams
  console.log(pageNo, pageSize)
  const param = {
    startVerifyTime: startVerifyTime
      ? dayjs(startVerifyTime).format('YYYY-MM-DD HH:mm:ss')
      : '',
    endVerifyTime: endVerifyTime
      ? dayjs(endVerifyTime).format('YYYY-MM-DD HH:mm:ss')
      : '',
    ...others
  }
  const params = {
    selectParams: JSON.stringify(param),
    bizType: 'ARCHIVE_REGISTER_VERIFY_TASK_EXPORT'
  }
  ComAPI.exportBySelect(params).then((res) => {
    if (res && res.code === 200) {
      if (res?.data?.sync === 1) {
        const params = {
          fileCode: res?.data?.fileCode as string
        }
        ComAPI.downLoadFiles(params)
          .then(async (res) => {
            if (res) {
              handleDownloadFile(res)
            }
          })
          .catch((err: Error) => {
            throw err
          })
      } else if (res?.data?.sync === 0) {
        ElMessage({
          type: 'success',
          message: '导出任务已经产生，前面有任务待处理，请至我的下载中查看'
        })
      }
    }
  })
}

// 重置
const reset = () => {
  const userStore = useUserStore()
  queryParams.pageNo = 1
  queryParams.startVerifyTime = dayjs().startOf('day').toString() // 开始时间
  queryParams.endVerifyTime = dayjs().endOf('day').toString() // 结束时间
  queryParams.creatorName = userStore.userInfo?.staffName as string // 创建者姓名
  queryParams.verifyResult = '' // 核对结果
  queryParams.batchNo = '' // 批次号
  queryParams.engineNo = '' // 发动机号
  queryParams.engineType = '' // 发动机型号
  queryParams.archivalStatus = '' // 归档状态
  queryParams.contractNo = '' // 合同号
  queryParams.licensePlateNo = '' // 车牌号
  queryParams.vinNo = '' // 车架号
  queryParams.agencyName = '' // 办事处
  queryParams.affiliatesName = '' // 挂靠商
  queryParams.channelName = '' // 渠道商
  queryParams.fileNameSort = '' // 文件名排序
  queryParams.registerCardArchiveNoSort = '' // 注册车辆排序
  queryParams.verifyResultSort = '' // 核验结果排序
}
// 获取列表
const getList = () => {
  const { startVerifyTime, endVerifyTime, ...others } = queryParams
  const params = {
    startVerifyTime: startVerifyTime
      ? dayjs(startVerifyTime).format('YYYY-MM-DD HH:mm:ss')
      : '',
    endVerifyTime: endVerifyTime
      ? dayjs(endVerifyTime).format('YYYY-MM-DD HH:mm:ss')
      : '',
    ...others
  }

  tableLoading.value = true
  API.getVehiRegisterCardList(params)
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

const init = () => {
  getList()
}
onMounted(() => {
  const userStore = useUserStore()
  queryParams.creatorName = userStore.userInfo?.staffName as string
  curStaffCode.value = userStore.userInfo?.staffCode as string
  init()
})
</script>

<style lang="scss" scoped>
.scan-form {
  display: flex;
  align-items: flex-end;
  width: 100%;
}
.scan-search-container {
  width: 100%;
}
.scan-search-bar {
  padding: 6px 10px;
  width: calc(100% - 216px);
}
.search-btn {
  padding: 6px 10px;
  height: 44px;
}
.arrow {
  margin-bottom: 10px;
  text-align: center;
  color: $base-color-primary;
  cursor: pointer;
}
.btn-row {
  display: flex;
  justify-content: flex-end;
}
.table-btn-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}
.font-color-system {
  color: $base-color-primary;
}
.file-name {
  cursor: pointer;
  text-decoration: underline;
}
.width-full {
  width: 100%;
}
:deep(.el-form-item) {
  margin-bottom: 12px;
}
</style>
