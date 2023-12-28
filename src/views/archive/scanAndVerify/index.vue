<template>
  <div>
    <!-- 搜索工作栏 -->
    <div class="scan-search-container" ref="searchBoxRef">
      <el-form
        ref="queryFormRef"
        :model="queryParams"
        class="scan-search-bar"
        :label-width="px2rem('90px')"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="核验时间" class="width-full">
              <el-date-picker
                v-model="queryParams.startVerifyTime"
                type="datetime"
                placeholder="核验开始时间"
                style="margin-right: 4%; width: 48%"
              />
              <el-date-picker
                v-model="queryParams.endVerifyTime"
                type="datetime"
                placeholder="核验结束时间"
                style="width: 48%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建人" prop="creatorName">
              <el-input
                v-model="queryParams.creatorName"
                clearable
                placeholder="请输入创建人"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="核对结果" prop="verifyResult">
              <el-select
                v-model="queryParams.verifyResult"
                style="width: 100%"
                placeholder="请选择核对结果"
                clearable
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
            <el-form-item label="批次号" prop="batchNo">
              <el-input
                v-model="queryParams.batchNo"
                clearable
                placeholder="请输入批次号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发动机号" prop="engineNo">
              <el-input
                v-model="queryParams.engineNo"
                clearable
                placeholder="请输入发动机号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发动机型号" prop="engineType">
              <el-input
                v-model="queryParams.engineType"
                clearable
                placeholder="请输入发动机型号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="归档状态" prop="archivalStatus">
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
        <el-row :gutter="20" v-if="expandFlag">
          <el-col :span="6">
            <el-form-item label="合同号" prop="contractNo">
              <el-input
                v-model="queryParams.contractNo"
                clearable
                placeholder="请输入合同号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车牌号" prop="licensePlateNo">
              <el-input
                v-model="queryParams.licensePlateNo"
                clearable
                placeholder="请输入车牌号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车架号" prop="vinNo">
              <el-input
                v-model="queryParams.vinNo"
                clearable
                placeholder="请输入车架号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="办事处" prop="agencyName">
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
            <el-form-item label="挂靠商" prop="affiliatesName">
              <el-input
                v-model="queryParams.affiliatesName"
                clearable
                placeholder="请输入挂靠商"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="渠道商" prop="channelName">
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
    <el-divider border-style="dashed" />
    <!-- 表格 -->
    <div>
      <div class="table-btn-box">
        <div>
          <el-button type="primary" :icon="Plus" @click="uploadHandler">
            上传车辆登记证
          </el-button>
          <el-button type="primary" :icon="Check" @click="achiveHandler">
            选择 & 归档
          </el-button>
          <el-button
            type="primary"
            :icon="Delete"
            @click="delHandler(selectIds)"
          >
            删除
          </el-button>
          <el-button type="primary" :icon="Download" @click="exportHandler">
            导出
          </el-button>
        </div>
        <!-- 设置表格列 -->
        <el-dropdown
          trigger="click"
          placement="top-end"
          :hide-on-click="false"
          max-height="300px"
          @visible-change="handleDropdownFn"
        >
          <div class="dropdown-column">
            <el-icon :size="15" class="icon"><Setting /></el-icon>
            设置表格列
          </div>
          <template #dropdown>
            <el-dropdown-menu class="custom-drop-menu">
              <el-dropdown-item>
                <el-checkbox
                  v-model="checkAll"
                  :indeterminate="isIndeterminate"
                  @change="handleCheckAllChange"
                >
                  全选
                </el-checkbox>
              </el-dropdown-item>
              <!--  -->
              <el-checkbox-group
                v-model="checkedConfig"
                @change="handleCheckedConfig"
              >
                <el-dropdown-item
                  v-for="cfg in checkboxTableConfig"
                  :key="cfg.prop"
                >
                  <el-checkbox :label="cfg.prop">
                    {{ cfg.label }}
                  </el-checkbox>
                </el-dropdown-item>
              </el-checkbox-group>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <el-table
        :data="tableData"
        :header-cell-style="{
          background: '#eef1f6',
          color: '#606266',
          textAlign: 'center'
        }"
        v-loading="tableLoading"
        row-key="id"
        :tree-props="{ children: 'target' }"
        :max-height="tableHeight"
        @selection-change="selectionChangeHandler"
        @header-click="sortChangeHandler"
      >
        <el-table-column
          type="selection"
          width="40"
          :selectable="selectableHandler"
          align="center"
        />

        <template v-for="item in tableConfig" :key="item.prop">
          <el-table-column v-if="!!item.show" v-bind="item">
            <template #header>
              <!-- 核对结果 -->
              <span
                v-if="
                  item.prop === 'verifyResult' ||
                  item.prop === 'registerCardArchiveNo' ||
                  item.prop === 'fileName'
                "
              >
                {{ item.label }}
                <svg-icon
                  :name="setSortFlag((queryParams[item.prop + 'Sort'] as string) || '')"
                  size="20"
                />
              </span>
              <!-- 登记证归档序号 -->
              <span v-else>{{ item.label }}</span>
            </template>

            <template #default="{ row }">
              <!-- 归档状态 -->
              <span v-if="item.valueType === 'archivalStatus'">
                {{ getAchivalStatus(row.archivalStatus) }}
              </span>

              <!-- 登记证编号、车架号、发动机号、发动机型号、车牌号、机动车所有人、车身颜色、使用性质、抵押权人、统一社会信用代码、抵押登记日期 -->
              <span v-else-if="item.valueType === 'soltItem'">
                <TableSlotItem :rowInfo="row" :rowKey="item.prop" />
              </span>

              <!-- 自定义 -->
              <span v-else-if="item.valueType === 'custom'">
                <!-- 核对结果 -->
                <span v-if="row.fileCode && item.prop === 'verifyResult'">
                  <svg-icon
                    :name="getVerifyResult(row)"
                    size="20"
                    color="#f39b1c"
                  />
                </span>
                <!-- 登记证归档序号 -->
                <span
                  v-if="item.prop === 'registerCardArchiveNo'"
                  :class="row.fileCode ? '' : 'font-color-system'"
                >
                  {{ row.registerCardArchiveNo }}
                </span>
                <!-- 文件名 -->
                <span v-if="item.prop === 'fileName'">
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
              </span>

              <!-- other -->
              <span v-else>{{ row[item.prop] }}</span>
            </template>
          </el-table-column>
        </template>

        <el-table-column label="操作" fixed="right" width="120" align="center">
          <template #default="scope">
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
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-if="pageTotal"
        background
        small
        layout="total,sizes,prev, pager, next"
        :page-sizes="[10, 20, 50, 100]"
        :total="pageTotal"
        class="table-page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
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
import { ref, reactive, Ref, computed, onMounted, toRefs } from 'vue'
import { ElMessageBox, ElMessage, ElForm } from 'element-plus'
import { openLink, isPdf, handleDownloadFile, px2rem } from '@/utils'
import EditForm from './EditForm.vue'
import UploadForm from './UploadForm.vue'
import { CommonAPI, MortageAPI } from '@/api'
import type { TableColumnCtx, CheckboxValueType } from 'element-plus'
import {
  ArrowDownBold,
  ArrowUpBold,
  Plus,
  Delete,
  Download,
  Check,
  Setting
} from '@element-plus/icons-vue'
import type {
  VehiRegisterCardListRequest,
  PageRequest,
  SortParamsRequest,
  CardListItem,
  DictItem
} from '@/api'
import TableSlotItem from './components/TableSlotItem.vue'
import { ARCHIVE_STATUS, VERIFY_RESULTS } from '@/constants'
import { useUserStore } from '@toystory/lotso'
import dayjs from 'dayjs'
import Preview from '@/components/Preview/index.vue'
import useGetPreviewURL from '@/hooks/useGetPreviewURL/index'
import BasicData from '@/views/archive/scanAndVerify/data'

const API = new MortageAPI()
const CommonApi = new CommonAPI()

const pageTotal: Ref<number> = ref(0) // 列表的总页数
const queryFormRef = ref<InstanceType<typeof ElForm>>()
const expandFlag = ref<boolean>(false)
const tableLoading = ref<boolean>(false)
const tableData: Ref<CardListItem[]> = ref([])
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

type ITableConfigObj = {
  label: string
  prop: string
  valueType: string
  minWidth?: number | string
  width?: number | string
  align: string
  showOverflowTooltip?: boolean
  fixed?: boolean
  show: boolean
  showDisabled?: boolean
}

type IState = {
  tableConfig: ITableConfigObj[]
  checkAll: boolean
  checkedConfig: string[]
  checkboxTableConfig: ITableConfigObj[]
  isIndeterminate: boolean
}

const state = reactive<IState>({
  tableConfig: BasicData.tableConfig,
  checkAll: false,
  checkedConfig: [],
  checkboxTableConfig: [],
  isIndeterminate: true
})

const {
  tableConfig,
  checkAll,
  checkedConfig,
  checkboxTableConfig,
  isIndeterminate
} = toRefs(state)

// 表格最大高度
const searchBoxRef = ref()
const tableHeight = computed(() => {
  if (searchBoxRef.value?.clientHeight) {
    const height = Number(
      document.documentElement.clientHeight -
        251 -
        searchBoxRef.value?.clientHeight
    )
    return height
  } else {
    const height = Number(document.documentElement.clientHeight - 251)
    return height
  }
})

// 自定义表格列
const handleCheckedConfig = (value: CheckboxValueType[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === state.checkboxTableConfig.length

  state.checkedConfig = value as string[]

  state.isIndeterminate =
    checkedCount > 0 && checkedCount < state.checkboxTableConfig.length

  state.tableConfig.forEach((item) => {
    if (!item.showDisabled) {
      item.show = checkedConfig.value.includes(item.prop)
    }
  })
}

// 自定义表格列-全选
const handleCheckAllChange = (val: string | number | boolean) => {
  const arr = state.checkboxTableConfig.map((item) => item.prop)

  const _val = val as boolean

  state.checkedConfig = _val ? arr : []
  state.isIndeterminate = !_val

  state.tableConfig.forEach((item) => {
    if (!item.showDisabled) {
      item.show = !!_val
    }
  })
}

const handleDropdownFn = (visible: boolean) => {
  if (visible) {
    state.checkboxTableConfig = BasicData.tableConfig.filter(
      (item) => !item.showDisabled
    )
    state.checkedConfig = state.checkboxTableConfig.map((item) => item.prop)
    state.isIndeterminate = false
  }
}

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
// 展开-收回处理
const expandHandler = (): boolean => {
  return (expandFlag.value = !expandFlag.value)
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
  const params = {
    startVerifyTime: startVerifyTime
      ? dayjs(startVerifyTime).format('YYYY-MM-DD HH:mm:ss')
      : '',
    endVerifyTime: endVerifyTime
      ? dayjs(endVerifyTime).format('YYYY-MM-DD HH:mm:ss')
      : '',
    ...others
  }

  API.downLoadFiles(params)
    .then(async (res) => {
      if (res) {
        handleDownloadFile(res)
      }
    })
    .catch((err: Error) => {
      throw err
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
        // tableData.value.splice(0, tableData.value.length)
        tableData.value = res?.data?.list || []
        pageTotal.value = res?.data?.total || 0
      }
    })
    .catch((err: Error) => {
      tableLoading.value = false
      console.log(err)
    })
}

// 批量获取数据字典
const verifyOpts: Ref<DictItem[]> = ref([])
const archiveStatusOpts: Ref<DictItem[]> = ref([])
const getDicts = () => {
  const dictTypes = ['ARCHIVE_STATUS', 'OCR_STATUS']
  const params = {
    dictTypes
  }
  CommonApi.getDictsList(params)
    .then((res) => {
      if (res && res.code === 200) {
        archiveStatusOpts.value = res?.data?.ARCHIVE_STATUS as DictItem[]
        verifyOpts.value = res?.data?.OCR_STATUS as DictItem[]
      }
    })
    .catch((err: Error) => {
      throw err
    })
}

const init = () => {
  getList()
  getDicts()
}

onMounted(() => {
  const userStore = useUserStore()
  queryParams.creatorName = userStore.userInfo?.staffName as string
  curStaffCode.value = userStore.userInfo?.staffCode as string
  init()
})
</script>

<style lang="scss" scoped>
.scan-search-container {
  display: flex;
  width: 100%;
}
.scan-search-bar {
  padding: 6px 10px;
  width: 90%;
}
.search-btn {
  display: flex;
  margin-top: 3%;
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
:deep(.el-divider--horizontal) {
  margin: 0 0 10px;
}
:deep(.el-form-item) {
  margin-bottom: 12px;
}
.dropdown-column {
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  .icon {
    margin-top: -3px;
    margin-right: 5px;
  }
}
</style>
