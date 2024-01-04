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
            <el-form-item label="快递单号" prop="expressNo">
              <el-input
                v-model="queryParams.expressNo"
                clearable
                placeholder="请输入快递单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="快递公司" prop="expressCompany">
              <el-select
                v-model="queryParams.expressCompany"
                style="width: 100%"
                clearable
                placeholder="请选择快递公司"
              >
                <el-option
                  v-for="(item, index) in expressCompanyOpts"
                  :key="index"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="登记时间" prop="createTime">
              <el-date-picker
                v-model="queryParams.createTime"
                type="date"
                :default-value="new Date()"
                format="YYYY-MM-DD"
                style="width: 100%"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="寄送/接收" prop="expressType">
              <el-select
                v-model="queryParams.expressType"
                style="width: 100%"
                clearable
                placeholder="请选择寄送/接收"
              >
                <el-option
                  v-for="(item, index) in expressTypeOpts"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="快递内容" prop="expressContent">
              <el-select
                v-model="queryParams.expressContent"
                style="width: 100%"
                clearable
                placeholder="请选择快递内容"
              >
                <el-option
                  v-for="(item, index) in expressContentOpts"
                  :key="index"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="快递备注" prop="expressContentRemark">
              <el-input
                v-model="queryParams.expressContentRemark"
                clearable
                placeholder="请输入快递备注"
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
    </div>
    <div>
      <div class="table-btn-box">
        <div>
          <el-button type="primary" :icon="Plus" @click="addHandler">
            添加
          </el-button>
          <el-tooltip
            content="需勾选要接收的条目，方可操作"
            placement="top-start"
          >
            <el-button
              type="primary"
              :icon="Check"
              @click="batchReceiveHandler"
            >
              批量接收
            </el-button>
          </el-tooltip>

          <el-button type="primary" :icon="Upload" @click="importHandler">
            导入
          </el-button>
          <el-button type="primary" :icon="Download" @click="exportHandler">
            导出
          </el-button>
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

          <el-button type="primary" :icon="Search" @click="importResultHandler">
            导入结果查询
          </el-button>
        </div>
        <el-dropdown
          trigger="click"
          placement="top-end"
          :hide-on-click="false"
          max-height="300px"
        >
          <div class="dropdown-column">
            <el-icon :size="15" class="icon"><Setting /></el-icon>
            设置表格列
          </div>
          <template #dropdown>
            <el-dropdown-menu class="custom-drop-menu">
              <el-dropdown-item>
                <el-checkbox v-model="checkAll" @change="handleCheckAllChange">
                  全选
                </el-checkbox>
              </el-dropdown-item>
              <el-checkbox-group
                v-model="checkedConfig"
                @change="handleCheckedConfig"
              >
                <el-dropdown-item
                  v-for="cfg in checkboxTableConfig"
                  :key="cfg.prop"
                >
                  <el-checkbox :label="cfg.prop" :disabled="cfg.showDisabled">
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
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        border
        v-loading="tableLoading"
        @selection-change="selectionChangeHandler"
        :max-height="tableHeight"
      >
        <el-table-column type="selection" width="40" align="center" fixed />
        <template v-for="item in tableConfig" :key="item.prop">
          <el-table-column v-if="!!item.show" v-bind="item">
            <template #default="{ row }">
              <!-- 快递状态 -->
              <span v-if="item.prop === 'expressStatus'">
                {{ getExpressStatus(row.expressStatus) }}
              </span>
              <!-- 寄送/接收 -->
              <span v-else-if="item.prop === 'expressType'">
                {{ getExpressType(row.expressType) }}
              </span>
              <!-- 寄送日期/接收日期 -->
              <span v-else-if="item.prop === 'sendTime'">
                {{
                  getRealTime(row.expressType, row.sendTime, row.receiveTime)
                }}
              </span>
              <!-- 快递主要内容 -->
              <span v-else-if="item.prop === 'expressContentList'">
                {{ getContentList(row.expressContentList) }}
              </span>
              <!-- 登记时间 -->
              <span v-else-if="item.prop === 'createTime'">
                {{ getDate(row.createTime) }}
              </span>
              <!-- 更新时间 -->
              <span v-else-if="item.prop === 'updateTime'">
                {{ getDate(row.updateTime) }}
              </span>
              <!-- other -->
              <span v-else>{{ row[item.prop] }}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" fixed="right" width="240" align="center">
          <template #default="scope">
            <template v-if="scope.row.id">
              <el-button
                v-if="
                  scope.row.expressType == 0 &&
                  scope.row.expressCompany !== '其它'
                "
                link
                type="primary"
                @click="logisticsInfo(scope.row.expressNo)"
              >
                物流信息
              </el-button>
              <el-button
                link
                type="primary"
                @click="checkHandler(scope.row.expressNo)"
              >
                查看
              </el-button>
              <el-button link type="primary" @click="editHandler(scope.row)">
                编辑
              </el-button>
              <el-button
                link
                type="danger"
                @click="delHandler([scope.row.expressNo])"
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
        layout="total,sizes,prev, pager, next"
        :page-sizes="[10, 20, 50, 100]"
        :total="pageTotal"
        class="table-page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <ImportForm ref="importFormRef" />
    <CheckForm ref="checkFormRef" />
    <EditForm ref="editFormRef" :title="dialogTitle" @success="getList()" />
    <LogisticsInfoForm ref="logisticsInfoFormRef" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, Ref, computed, onMounted, toRefs } from 'vue'
import { useRouter, useRoute } from '@toystory/lotso'
import {
  ElMessageBox,
  ElMessage,
  ElForm,
  CheckboxValueType
} from 'element-plus'
import { CommonAPI, ExpressAPI } from '@/api'
import {
  Plus,
  Delete,
  Upload,
  Download,
  Check,
  Search,
  Setting
} from '@element-plus/icons-vue'
import EditForm from './EditForm.vue'
import LogisticsInfoForm from './LogisticsInfoForm.vue'
import CheckForm from './CheckForm.vue'
import ImportForm from './ImportForm.vue'
import type {
  PageRequest,
  ExpressInfoCardListRequest,
  DictItem,
  ExpressListItem,
  ExpressContentList
} from '@/api'
import BasicData from '@/views/archive/logistics/register/data'
const { router } = useRouter()
const route = useRoute()
const pathName = 'Table:' + (route?.value.name as string)
import fileDownload from 'js-file-download'
type QueryParams = ExpressInfoCardListRequest & PageRequest
const API = new ExpressAPI()
const CommonApi = new CommonAPI()
const queryFormRef = ref<InstanceType<typeof ElForm>>()
const dialogTitle = ref<string>('')
const tableLoading = ref<boolean>(false)
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const queryParams = reactive<QueryParams>({
  pageNo: 1,
  pageSize: 10,
  expressNo: '',
  expressCompany: '',
  createTime: '',
  expressType: '',
  expressContent: '',
  expressContentRemark: ''
})
const tableData: Ref<ExpressListItem[]> = ref([])
const selectData: Ref<ExpressListItem[]> = ref([])

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
  checkAll: true,
  checkedConfig: [],
  checkboxTableConfig: BasicData.tableConfig,
  isIndeterminate: true
})

const { tableConfig, checkAll, checkedConfig, checkboxTableConfig } =
  toRefs(state)

// 自定义表格列
const handleCheckedConfig = (value: CheckboxValueType[]) => {
  const checkedCount = value.length
  state.checkAll = checkedCount === state.checkboxTableConfig.length
  state.checkedConfig = value as string[]
  localStorage.setItem(pathName, JSON.stringify(value))

  state.tableConfig.forEach((item) => {
    if (!item.showDisabled) {
      item.show = state.checkedConfig.includes(item.prop)
    }
  })
}
// 自定义表格列-全选
const handleCheckAllChange = (val: string | number | boolean) => {
  const arr = state.checkboxTableConfig.map((item) => item.prop)
  const arrRequired = state.checkboxTableConfig.filter(
    (item) => item.showDisabled
  )

  const _val = val as boolean

  state.checkedConfig = _val ? arr : arrRequired.map((item) => item.prop)
  state.isIndeterminate = !_val

  localStorage.setItem(pathName, JSON.stringify(state.checkedConfig))

  state.tableConfig.forEach((item) => {
    if (!item.showDisabled) {
      item.show = !!_val
    }
  })
}
// 获取表格设置表头内容
const getCheckConfig = () => {
  state.checkedConfig = localStorage.getItem(pathName)
    ? JSON.parse(localStorage.getItem(pathName) || '')
    : state.checkboxTableConfig.map((item) => item.prop)

  state.tableConfig.forEach((item) => {
    if (!item.showDisabled) {
      item.show = state.checkedConfig.includes(item.prop)
    }
  })
  state.checkAll = !(state.checkedConfig.length < BasicData.tableConfig.length)
}

const getContentList = (value: ExpressContentList[]) => {
  let list = ''
  value.forEach((item, index) => {
    if (index === value.length - 1) {
      list += item.contentType ? item.contentType : ''
    } else {
      list += item.contentType ? item.contentType + '、' : ''
    }
  })
  // value.forEach((item) => {
  //   list += item.contentType ? item.contentType + ' ' : ''
  // })
  return list
}

// 查询
const searchHandler = () => {
  queryParams.pageNo = 1
  getList()
}
// 重置
const reset = () => {
  queryParams.pageNo = 1
  queryParams.pageSize = 10
  queryParams.expressNo = ''
  queryParams.expressCompany = ''
  queryParams.createTime = ''
  queryParams.expressType = ''
  queryParams.expressContent = ''
  queryParams.expressContentRemark = ''
}
// 获取列表
const getList = () => {
  tableLoading.value = true
  API.getExpressInfoCardList(queryParams)
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
// 选择的数据
const selectionChangeHandler = (item: ExpressListItem[]) => {
  selectData.value.splice(0, selectData.value.length)
  selectData.value.push(...item)
}
const selectIds = computed(() => {
  const ids: string[] = []
  selectData.value.forEach((item) => {
    if (item.id) {
      ids.push(item.expressNo as string)
    }
  })
  return ids
})
const logisticsInfoFormRef = ref()
const logisticsInfo = (id: string) => {
  logisticsInfoFormRef.value.open(id)
}
const editFormRef = ref()
const editHandler = (row: ExpressListItem) => {
  dialogTitle.value = '编辑邮寄信息'
  editFormRef.value.open(row)
}
const addHandler = () => {
  dialogTitle.value = '新增邮寄信息'
  editFormRef.value.open()
}
const checkFormRef = ref()
const checkHandler = (id: ExpressListItem) => {
  checkFormRef.value.open(id)
}
// 批量接收
const batchReceiveHandler = () => {
  if (!selectIds.value.length) {
    ElMessage({
      type: 'error',
      message: '请选择要批量接收的内容'
    })
    return
  }
  // 二次确认
  ElMessageBox.confirm('确认要批量接收吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      const params = {
        expressNos: selectIds.value
      }
      API.batchReceiveExpressInfo(params)
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
      ElMessage({
        type: 'error',
        message: '操作失败'
      })
      throw err
    })
}
const importFormRef = ref()
const importHandler = () => {
  importFormRef.value.open()
}
const exportHandler = () => {
  const params = {
    expressNo: queryParams.expressNo,
    expressCompany: queryParams.expressCompany,
    create_time: queryParams.createTime,
    expressType: queryParams.expressType,
    expressContent: queryParams.expressContent,
    expressContentRemark: queryParams.expressContentRemark
  }
  API.exportExpressContentInfo(params)
    .then((res) => {
      if (res && res.code === 200) {
        if (res?.data?.sync === 1) {
          const params = {
            fileCode: res?.data?.fileCode
          }
          CommonApi.downLoadFiles(params)
            .then((res) => {
              const fileStream = res?.data
              const fileName = '邮寄信息.xlsx'
              fileDownload(fileStream, fileName)
              ElMessage({
                type: 'success',
                message: '操作成功'
              })
            })
            .catch((err: Error) => {
              tableLoading.value = false
              throw err
            })
        } else if (res?.data?.sync === 0) {
          ElMessage({
            type: 'success',
            message: '等待导出结果'
          })
        }
      }
    })
    .catch((err: Error) => {
      throw err
    })
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
        expressNoList: ids
      }
      API.delExpressInfo(params).then((res) => {
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
      ElMessage({
        type: 'error',
        message: '删除失败'
      })
      throw err
    })
}

// 导入结果查询
const importResultHandler = () => {
  router.push({
    path: '/recordUpload/index',
    query: {
      tab: 'upload'
    }
  })
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

// 批量获取数据字典
const expressCompanyOpts: Ref<DictItem[]> = ref([])
const expressTypeOpts: Ref<DictItem[]> = ref([])
const expressContentOpts: Ref<DictItem[]> = ref([])
const getDicts = () => {
  const dictTypes = [
    'EXPRESS_STATUS',
    'EXPRESS_CONTENT',
    'EXPRESS_COMPANY',
    'EXPRESS_TYPE'
  ]
  const params = {
    dictTypes
  }
  CommonApi.getDictsList(params)
    .then((res) => {
      if (res && res.code === 200) {
        expressCompanyOpts.value = res?.data?.EXPRESS_COMPANY as DictItem[]
        expressTypeOpts.value = res?.data?.EXPRESS_TYPE as DictItem[]
        expressContentOpts.value = res?.data?.EXPRESS_CONTENT as DictItem[]
        const expressStatus = res?.data?.EXPRESS_STATUS as DictItem[]
        window.localStorage.setItem(
          'EXPRESS_STATUS',
          JSON.stringify(expressStatus)
        )
        window.localStorage.setItem(
          'EXPRESS_CONTENT',
          JSON.stringify(expressContentOpts.value)
        )
        window.localStorage.setItem(
          'EXPRESS_COMPANY',
          JSON.stringify(expressCompanyOpts.value)
        )
        window.localStorage.setItem(
          'EXPRESS_TYPE',
          JSON.stringify(expressTypeOpts.value)
        )
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
// 快递状态处理
const getExpressStatus = (status: number) => {
  let topic = ''
  if (status === 0) {
    topic = '未接收'
  } else if (status === 1) {
    topic = '已接收'
  } else if (status === 2) {
    topic = '问题件'
  }
  return topic
}

// 寄送接收状态
const getExpressType = (status: number) => {
  let topic = ''
  if (status === 1) {
    topic = '接收'
  } else if (status === 0) {
    topic = '寄送'
  }
  return topic
}
const getRealTime = (type: number, stime: string, rtime: string) => {
  if (type === 0) {
    return stime ? stime.slice(0, 10) : ''
  } else if (type === 1) {
    return rtime ? rtime.slice(0, 10) : ''
  }
}
const getDate = (datetime: string) => {
  if (datetime) {
    return datetime.slice(0, 10)
  }
}

const init = () => {
  getList()
  getDicts()
}
onMounted(() => {
  init()
  getCheckConfig()
})
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  width: 100%;
}
.search-bar {
  padding: 10px;
  width: 90%;
}
.table-btn {
  margin-bottom: 10px;
}
.table-btn-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
