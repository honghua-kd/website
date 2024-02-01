<template>
  <div>
    <div :ref="searchBoxRef">
      <SearchBar
        v-model="queryParams"
        :searchConfig="searchConfig"
        @reset="reset"
        @search="searchHandler"
      >
        <template #area>
          <el-cascader
            v-model="selCity"
            clearable
            :props="props"
            style="width: 100%"
          />
        </template>
      </SearchBar>
    </div>
    <el-divider border-style="dashed" />
    <!-- table 组件引入 -->
    <Table
      :data="tableData"
      :loading="tableLoading"
      :columnConfig="tableConfig"
      :isSelected="true"
      :page-total="pageTotal"
      :setColumnEnable="true"
      :height="tableHeight"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @selection-change="selectionChangeHandler"
      @size-change="getList"
      @current-change="getList"
    >
      <template #btnsBox>
        <el-row :gutter="8" style="margin: 10px 0">
          <el-col :span="1.5">
            <el-button type="primary" @click="importHandler" :icon="Upload">
              导入
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              @click="downloadTemplate"
              :icon="Download"
            >
              下载导入模版
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" @click="addHandler" :icon="Plus">
              新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" @click="exportHandler" :icon="Download">
              下载
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-tooltip
              content="需勾选下方条目，方可操作"
              placement="top-start"
            >
              <el-button
                type="primary"
                @click="delHandler(selectIds)"
                :icon="Delete"
              >
                删除
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              @click="importResultHandler"
              :icon="Search"
            >
              导入结果查询
            </el-button>
          </el-col>
        </el-row>
      </template>
      <template #default="{ row, prop }">
        <span v-if="prop === 'applyMortgage'">
          <el-switch
            v-model="row[prop]"
            :active-value="1"
            :inactive-value="0"
            @click="changeStatus(row)"
            inline-prompt
            active-text="是"
            inactive-text="否"
          />
        </span>
        <span v-if="prop === 'applyDischarge'">
          <el-switch
            v-model="row[prop]"
            :active-value="1"
            :inactive-value="0"
            @click="changeStatus(row)"
            inline-prompt
            active-text="是"
            inactive-text="否"
          />
        </span>
      </template>
      <template #action="scope">
        <el-button link type="primary" @click="editHandler(scope.row)">
          编辑
        </el-button>
        <el-button link type="danger" @click="delHandler([scope.row.id])">
          删除
        </el-button>
      </template>
    </Table>
    <OperDialog ref="operRef" @success="getList" />
    <ImportForm ref="importFormRef" />
  </div>
</template>

<script setup lang="ts">
import { Plus, Delete, Upload, Download, Search } from '@element-plus/icons-vue'
import { reactive, ref, Ref, onMounted, computed } from 'vue'
import { tableConfig, searchConfig } from './data'
import OperDialog from './components/operDialog.vue'
import ImportForm from './ImportForm.vue'
import { CommonAPI, MortgageCityAPI } from '@/api'
import { handleDownloadFile } from '@/utils'
import SearchBar from '@/components/SearchBar/index.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import Table from '@/components/Table/index.vue'
import { useRouter } from '@toystory/lotso'
import dayjs from 'dayjs'
const { router } = useRouter()
import type {
  PageRequest,
  MartgageCityListRequest,
  MortgageCityListResponse,
  EditMortgageCityRequest
} from '@/api'
import type { CascaderProps, CascaderOption } from 'element-plus'

const CommonApi = new CommonAPI()
const MortgageCityApi = new MortgageCityAPI()
type QueryParams = MartgageCityListRequest & PageRequest

const selCity = ref([])

const props: CascaderProps = {
  multiple: true,
  lazy: true,
  async lazyLoad(node, resolve) {
    const nodes: CascaderOption[] = [] // 动态节点
    const { level } = node
    if (level === 0) {
      const resParent = await CommonApi.getAllProvince()
      if (resParent && resParent?.data) {
        resParent?.data.map((item) => {
          const area = {
            value: item.code,
            label: item.name,
            leaf: level >= 1
          }
          nodes.push(area)
        })
      }
    } else {
      const params = {
        code: node.value as number
      }
      const res = await CommonApi.getProvinceChildren(params)
      if (res && res.data) {
        res?.data.map((item) => {
          const area = {
            value: item.code,
            label: item.name,
            leaf: level >= 1
          }
          nodes.push(area)
        })
      }
    }
    resolve(nodes) // 回调
  }
}
const exportHandler = () => {
  // console.error(selectIds.value)
  let params
  const ids = selectIds.value.map((item) => String(item))
  if (selectIds.value.length) {
    params = {
      pageNo: queryParams.pageNo,
      pageSize: queryParams.pageSize,
      provinceCityCodes: queryParams.provinceCityCodes,
      licensePlateCode: queryParams.licensePlateCode,
      ids: ids
    }
  } else {
    params = {
      pageNo: queryParams.pageNo,
      pageSize: queryParams.pageSize,
      provinceCityCodes: queryParams.provinceCityCodes,
      licensePlateCode: queryParams.licensePlateCode
    }
  }
  MortgageCityApi.mortgageCityExport(params)
    .then((res) => {
      if (res && res.code === 200) {
        const params = {
          fileCode: res?.data?.fileCode || ''
        }
        CommonApi.downLoadFiles(params)
          .then((res) => {
            handleDownloadFile(
              res,
              `抵解押城市信息${dayjs().format('YYYYMMDD')}.xlsx`
            )
            ElMessage({
              type: 'success',
              message: '操作成功'
            })
          })
          .catch((err: Error) => {
            throw err
          })
      }
    })
    .catch((err: Error) => {
      throw err
    })
}

const queryParams = reactive<QueryParams>({
  pageNo: 1,
  pageSize: 10,
  provinceCityCodes: [],
  licensePlateCode: ''
})
const searchHandler = () => {
  queryParams.pageNo = 1
  getList()
}
const reset = () => {
  queryParams.pageNo = 1
  queryParams.pageSize = 10
  queryParams.provinceCityCodes = []
  queryParams.licensePlateCode = ''
  selCity.value = []
  getList()
}
const getList = async () => {
  tableLoading.value = true
  queryParams.provinceCityCodes = []
  if (selCity.value.length) {
    selCity.value.forEach((item: string[]) => {
      queryParams.provinceCityCodes.push({
        provinceCode: item[0],
        cityCode: item[1]
      })
    })
  }
  MortgageCityApi.getMortgageCityList(queryParams)
    .then((res) => {
      if (res && res.code === 200) {
        tableLoading.value = false
        tableData.splice(0, tableData.length)
        tableData.push(...(res?.data?.list || []))
        pageTotal.value = res?.data?.total || 0
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const tableLoading: Ref<boolean> = ref(false)
const tableData = reactive<MortgageCityListResponse[]>([])
// // 分页
// const handleCurrentChange = (val: number) => {
//   queryParams.pageNo = val
//   getList()
// }
// // 页面条数改变
// const handleSizeChange = (val: number) => {
//   queryParams.pageSize = val
//   getList()
// }
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

const selectData: Ref<MortgageCityListResponse[]> = ref([])
// 选择的数据
const selectionChangeHandler = (item: MortgageCityListResponse[]) => {
  selectData.value.splice(0, selectData.value.length)
  selectData.value.push(...item)
}
const selectIds = computed(() => {
  const ids: string[] = []
  selectData.value.forEach((item) => {
    ids.push(item.id as string)
  })
  return ids
})

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
        ids: ids
      }
      MortgageCityApi.delMortgageCity(params).then((res) => {
        console.error(res)
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
const changeStatus = (val?: EditMortgageCityRequest) => {
  if (val) {
    MortgageCityApi.editMortgageCity(val)
      .then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '修改成功'
          })
          getList()
        }
      })
      .catch((err: Error) => {
        throw err
      })
  }
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
const operRef = ref()
const addHandler = () => {
  operRef.value.open('add')
}
const editHandler = (
  row: MortgageCityListResponse & { proandcity?: string[] | null }
) => {
  row.proandcity = [row.provinceCode as string, row.cityCode as string]
  operRef.value.open('edit', row)
}

const importFormRef = ref()
const importHandler = () => {
  importFormRef.value.open()
}
// 下载模板
const downloadTemplate = () => {
  const params = {
    bizType: 'CITY_CONFIG'
  }
  CommonApi.getDownLoadTemplate(params)
    .then((res) => {
      handleDownloadFile(res)
    })
    .catch((err: Error) => {
      throw err
    })
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
.city-select {
  margin-left: 1%;
  width: 48%;
}
</style>
