<template>
  <div>
    <el-card>
      <el-form :model="queryParams" ref="formRef">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="城市:" prop="city">
              <el-cascader
                v-model="selCity"
                clearable
                :props="props"
                @change="changeCity"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车牌代码:" prop="licensePlateCode">
              <el-input
                v-model="queryParams.licensePlateCode"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="searchHandler"> 查询 </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-row :gutter="8" style="margin: 10px 0">
      <el-col :span="1.5">
        <el-button type="primary" @click="importHandler"> 批量导入 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" @click="downloadTemplate">
          下载导入模版
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" @click="addHandler"> 新增 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary"> 下载 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" @click="delHandler(selectIds)">
          删除
        </el-button>
      </el-col>
    </el-row>
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
      @selection-change="selectionChangeHandler"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #selection>
        <el-table-column type="selection" width="40" align="center" />
      </template>

      <template #action="scope">
        <template v-if="scope.row.fileCode">
          <el-button link type="primary" @click="editHandler(scope.row)">
            编辑
          </el-button>
          <el-button link type="danger" @click="delHandler([scope.row.id])">
            删除
          </el-button>
        </template>
      </template>
    </Table>
    <OperDialog ref="operRef" />
    <ImportForm ref="importFormRef" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref, onMounted, computed } from 'vue'
import { tableConfig } from '@/views/mortgage/city/data'
import OperDialog from '@/views/mortgage/city/components/operDialog.vue'
import ImportForm from './ImportForm.vue'
import { CommonAPI, MortgageCityAPI } from '@/api'
import { handleDownloadFile } from '@/utils'
import Table from '@/components/Table/index.vue'
import type {
  PageRequest,
  MartgageCityListRequest,
  MortgageCityListResponse
} from '@/api'
import type { CascaderProps, CascaderOption, CascaderValue } from 'element-plus'

const CommonApi = new CommonAPI()
const MortgageCityApi = new MortgageCityAPI()
type QueryParams = MartgageCityListRequest & PageRequest

const selCity = ref([])

const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const nodes: CascaderOption[] = [] // 动态节点
    const { level } = node
    if (level === 0) {
      const resParent = await MortgageCityApi.getAllProvince()
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
      const res = await MortgageCityApi.getProvinceChildren(params)
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
const changeCity = (val: CascaderValue) => {
  console.log(val)
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
const getList = async () => {
  MortgageCityApi.getMortgageCityList(queryParams)
    .then((res) => {
      console.error(res)
      if (res && res.code === 200) {
        tableData.value = res?.data?.list || []
        pageTotal.value = res?.data?.total || 0
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const tableLoading: Ref<boolean> = ref(false)
const tableData: Ref<MortgageCityListResponse[]> = ref([])
// 分页
const handleCurrentChange = (val: number) => {
  console.log('value>>>>>', val)
  queryParams.pageNo = val
  getList()
}
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
// 页面条数改变
const handleSizeChange = (val: number) => {
  queryParams.pageSize = val
  getList()
}
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
      MortgageCityApi.delMortgageCity(queryParams).then((res) => {
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

const operRef = ref()
const addHandler = () => {
  operRef.value.open('add')
}
const editHandler = (row: MortgageCityListResponse) => {
  operRef.value.open('edit', row)
}

const importFormRef = ref()
const importHandler = () => {
  importFormRef.value.open()
}
// 下载模板
const downloadTemplate = () => {
  const params = {
    bizType: 'EXPRESS_INFO'
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
