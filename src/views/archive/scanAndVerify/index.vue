<template>
  <div>
    <SecondaryTitle title="核验车辆登记证" />
    <!-- 搜索工作栏 -->
    <div class="scan-search-container">
      <el-form
        ref="queryFormRef"
        :model="queryParams"
        class="scan-search-bar"
        label-width="90px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="核验时间:" prop="verifyTime">
              <el-date-picker
                v-model="queryParams.verifyTime"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建人:" prop="creatorName">
              <el-input
                v-model="queryParams.creatorName"
                clearable
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="核对结果:" prop="verifyResult">
              <el-select
                v-model="queryParams.verifyResult"
                style="width: 100%"
                placeholder="请选择核对结果"
              >
                <el-option
                  v-for="(item, index) in verifyOpts"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="批次号:" prop="batchNo">
              <el-input
                v-model="queryParams.batchNo"
                clearable
                placeholder="请输入批次号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发动机号:" prop="engineNo">
              <el-input
                v-model="queryParams.engineNo"
                clearable
                placeholder="请输入发动机号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发动机型号:" prop="engineType">
              <el-input
                v-model="queryParams.engineType"
                clearable
                placeholder="请输入发动机型号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="归档状态:" prop="archivalStatus">
              <el-select
                v-model="queryParams.archivalStatus"
                style="width: 100%"
                clearable
                placeholder="请选择归档状态"
              >
                <el-option
                  v-for="(item, index) in archiveStatusOpts"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="合同号:" prop="contractNo">
              <el-input
                v-model="queryParams.contractNo"
                clearable
                placeholder="请输入合同号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车牌号:" prop="licensePlateNo">
              <el-input
                v-model="queryParams.licensePlateNo"
                clearable
                placeholder="请输入车牌号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车架号:" prop="vinNo">
              <el-input
                v-model="queryParams.vinNo"
                clearable
                placeholder="请输入车架号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="办事处:" prop="agencyName">
              <el-input
                v-model="queryParams.agencyName"
                clearable
                placeholder="请输入办事处"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="expandFlag">
          <el-col :span="12">
            <el-form-item label="挂靠商:" prop="affiliatesName">
              <el-input
                v-model="queryParams.affiliatesName"
                clearable
                placeholder="请输入挂靠商"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="渠道商:" prop="channelName">
              <el-input
                v-model="queryParams.channelName"
                clearable
                placeholder="请输入渠道商"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="end">
          <el-col :span="6" class="btn-row">
            <el-form-item>
              <el-button type="primary" @click="searchHandler">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="search-btn">
        <div class="arrow" @click="expandHandler">
          <el-icon v-if="!expandFlag"><ArrowDownBold /></el-icon>
          <el-icon v-if="expandFlag"><ArrowUpBold /></el-icon>
          <span v-if="!expandFlag" style="margin-left: 4px"> 展开 </span>
          <span v-if="expandFlag" style="margin-left: 4px"> 收回 </span>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-row class="table-btn">
        <el-button type="primary" :icon="Plus" @click="uploadHandler">
          上传车辆登记证
        </el-button>
        <el-button type="primary" :icon="Check" @click="achiveHandler">
          选择 & 归档
        </el-button>
        <el-button type="primary" :icon="Delete" @click="delHandler(selectIds)">
          删除
        </el-button>
        <el-button type="primary" :icon="Download">导出</el-button>
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
          fixed
          prop="fileName"
          width="150"
          show-overflow-tooltip
        >
          <template #header>
            文件名
            <svg-icon
              :name="setSortFlag(queryParams?.fileNameSort || '')"
              size="20"
            />
          </template>
          <template #default="scope">
            <span :class="scope.row.id ? '' : 'font-color-system'">
              {{ scope.row.fileName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="登记证归档序号"
          prop="registerCardArchiveNo"
          width="150"
          show-overflow-tooltip
        >
          <template #header>
            登记证归档序号
            <svg-icon
              :name="setSortFlag(queryParams?.registerCardArchiveNoSort || '')"
              size="20"
            />
          </template>
          <template #default="scope">
            <span :class="scope.row.id ? '' : 'font-color-system'">
              {{ scope.row.registerCardArchiveNo }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="核对结果"
          prop="verifyResult"
          width="150"
          show-overflow-tooltip
          align="center"
        >
          <template #header>
            核对结果
            <svg-icon
              :name="setSortFlag(queryParams?.verifyResultSort || '')"
              size="20"
            />
          </template>
          <template #default="scope">
            <span v-if="scope.row.id">
              <svg-icon :name="getVerifyResult(scope.row)" size="20" />
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="*登记证编号"
          prop="registerCardNo"
          width="150"
          show-overflow-tooltip
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="registerCardNo" />
          </template>
        </el-table-column>
        <el-table-column
          label="*车架号"
          prop="vinNo"
          width="150"
          show-overflow-tooltip
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="vinNo" />
          </template>
        </el-table-column>
        <el-table-column
          label="*发动机号"
          prop="engineNo"
          width="150"
          show-overflow-tooltip
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="engineNo" />
          </template>
        </el-table-column>
        <el-table-column
          label="*发动机型号"
          prop="engineType"
          width="150"
          show-overflow-tooltip
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="engineType" />
          </template>
        </el-table-column>
        <el-table-column
          label="*车牌号"
          prop="licensePlateNo"
          width="150"
          show-overflow-tooltip
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="licensePlateNo" />
          </template>
        </el-table-column>
        <el-table-column
          label="*机动车所有人"
          prop="vehicleOwner"
          width="150"
          show-overflow-tooltip
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="vehicleOwner" />
          </template>
        </el-table-column>
        <el-table-column
          label="*车身颜色"
          prop="vehicleColor"
          width="150"
          show-overflow-tooltip
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="vehicleColor" />
          </template>
        </el-table-column>
        <el-table-column
          label="*使用性质"
          prop="useType"
          width="150"
          show-overflow-tooltip
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="useType" />
          </template>
        </el-table-column>
        <el-table-column
          label="*抵押权人"
          prop="mortgagee"
          width="150"
          show-overflow-tooltip
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="mortgagee" />
          </template>
        </el-table-column>
        <el-table-column
          label="*统一社会信用代码"
          prop="mortgageeUscc"
          width="150"
          show-overflow-tooltip
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="mortgageeUscc" />
          </template>
        </el-table-column>
        <el-table-column
          label="*抵押登记日期"
          prop="mortgageRegisterDate"
          width="150"
          show-overflow-tooltip
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="mortgageRegisterDate" />
          </template>
        </el-table-column>
        <el-table-column
          label="批次号"
          prop="batchNo"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          label="关联合同号"
          prop="contractNo"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          label="所属系统"
          prop="belongSystem"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          label="挂靠商"
          prop="affiliatesName"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          label="办事处"
          prop="agencyName"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          label="渠道商"
          prop="channelName"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          label="创建人"
          prop="creator"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          label="创建时间"
          prop="createTime"
          width="150"
          show-overflow-tooltip
        >
          <template #default="scope">
            {{ formatDate(scope.row.createTime, '') }}
          </template>
        </el-table-column>
        <el-table-column
          label="归档状态"
          prop="archivalStatus"
          width="150"
          show-overflow-tooltip
        >
          <template #default="scope">
            {{ getAchivalStatus(scope.row.archivalStatus) }}
          </template>
        </el-table-column>
        <el-table-column
          label="归档时间"
          prop="archivalDate"
          width="150"
          show-overflow-tooltip
        >
          <template #default="scope">
            {{ formatDate(scope.row.archivalDate, '') }}
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="150" align="center">
          <template #default="scope">
            <template
              v-if="
                scope.row.id &&
                scope.row.archivalStatus !== ARCHIVE_STATUS.ACHIVED
              "
            >
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
    <UploadForm ref="uploadFormRef" />
  </div>
</template>

<script setup lang="ts">
import SecondaryTitle from '@/components/SecondaryTitle/index.vue'
import { ref, reactive, Ref, computed, onMounted } from 'vue'
import { ElMessageBox, ElMessage, ElForm } from 'element-plus'
import type { TableColumnCtx } from 'element-plus'
import { verifyOpts, archiveStatusOpts } from './config'
import {
  ArrowDownBold,
  ArrowUpBold,
  Plus,
  Delete,
  Download,
  Check
} from '@element-plus/icons-vue'
import EditForm from './EditForm.vue'
import UploadForm from './UploadForm.vue'
import { MortageAPI } from '@/api/mortgageRelease'
import {
  VehiRegisterCardListRequest,
  PageRequest,
  DateRangeRequest,
  SortParamsRequest,
  CardListItem
} from '@/api'
import TableSlotItem from './components/TableSlotItem.vue'
import { formatDate } from '@/utils'
import { ARCHIVE_STATUS, VERIFY_RESULTS } from '@/constants'
import { useUserStore } from '@toystory/lotso'
import dayjs from 'dayjs'

const API = new MortageAPI()
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const queryFormRef = ref<InstanceType<typeof ElForm>>()
const expandFlag = ref<boolean>(false)
const tableLoading = ref<boolean>(false)
const tableData: Ref<CardListItem[]> = ref([])
type QueryParams = VehiRegisterCardListRequest &
  PageRequest &
  DateRangeRequest &
  SortParamsRequest
const queryParams = reactive<QueryParams>({
  pageNo: 1,
  pageSize: 10,
  verifyTime: [dayjs().startOf('day').toDate(), dayjs().endOf('day').toDate()], // 创建时间
  creatorName: '', // 创建者
  creator: '', // 创建者工号
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
  selectData.value.splice(0, selectData.value.length)
  selectData.value.push(...item)
}

const selectIds = computed(() => {
  const ids: string[] = []
  selectData.value.forEach((item) => {
    if (item.id) {
      ids.push(item.id)
    }
  })
  return ids
})

// 是否可选
const selectableHandler = (row: CardListItem) => {
  return !!(row.id && row.archivalStatus !== ARCHIVE_STATUS.ACHIVED)
}
// 展开-收回处理
const expandHandler = (): boolean => {
  return (expandFlag.value = !expandFlag.value)
}

// 上传车辆登记证
const uploadFormRef = ref()
const uploadHandler = () => {
  const title = `${curStaffCode.value}-${dayjs().format('YYYYMMDDHHmmss')}`
  uploadFormRef.value.open('upload', title)
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
// 编辑
const editFormRef = ref()
const editHandler = (id: string) => {
  editFormRef.value.open(id)
}

// 排序
const sortCols = ['fileName', 'registerCardArchiveNo', 'verifyResult']
const sortChangeHandler = (column: TableColumnCtx<CardListItem>) => {
  const prop = column?.property
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
  // console.log('queryParams>>>>>>', queryParams)
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

// 归档处理
const achiveHandler = () => {
  if (!selectIds.value.length) {
    ElMessage({
      type: 'error',
      message: '请选择要归档的内容'
    })
    return
  }
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
      }
    })
    .catch((err: Error) => {
      throw err
    })
}

// 重置
const reset = () => {
  queryParams.pageNo = 1
  queryParams.pageSize = 10
  queryParams.verifyTime = [
    dayjs().startOf('day').toDate(),
    dayjs().endOf('day').toDate()
  ] // 创建时间
  queryParams.creatorName = '' // 创建者姓名
  queryParams.creator = '' // 创建者工号
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
  const { verifyTime, ...others } = queryParams
  const params = {
    startVerifyTime: new Date(verifyTime[0]).getTime(),
    endVerifyTime: new Date(verifyTime[1]).getTime(),
    ...others
  }
  console.log('params>>>>', params)

  tableLoading.value = true
  API.getVehiRegisterCardList(params)
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

const init = () => {
  getList()
}

init()

onMounted(() => {
  const userStore = useUserStore()
  queryParams.creatorName = userStore.userInfo?.staffName as string
  queryParams.creator = userStore.userInfo?.staffCode as string
  curStaffCode.value = userStore.userInfo?.staffCode as string
})
</script>

<style lang="scss" scoped>
.scan-search-container {
  display: flex;
  width: 100%;
}
.scan-search-bar {
  padding: 10px;
  width: 90%;
}
.search-btn {
  display: flex;
  margin-top: 6%;
  padding: 20px 10px;
  height: 60px;
  flex-direction: column;
}
.arrow {
  cursor: pointer;
  color: $base-color-primary;
}
.btn-row {
  display: flex;
  justify-content: flex-end;
}
.table-btn {
  margin-bottom: 10px;
}
.font-color-system {
  color: $base-color-primary;
}
</style>
