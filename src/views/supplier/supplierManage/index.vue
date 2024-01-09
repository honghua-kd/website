<template>
  <div class="supplier-container">
    <el-form :model="formModel" class="scan-form" label-width="80px">
      <div class="scan-search-bar">
        <el-row :gutter="25">
          <el-col :span="6">
            <el-form-item label="公司名称">
              <el-input v-model="formModel.name" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="归属公司">
              <el-select
                v-model="formModel.belongCompany"
                style="width: 100%"
                placeholder=""
              >
                <el-option
                  v-for="item in belongCompanyStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="区域">
              <el-cascader
                v-model="selCity"
                clearable
                :props="props"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="formModel.status">
                <el-option
                  v-for="item in supplierDetailStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="25">
          <el-col :span="6">
            <el-form-item label="类型">
              <el-select v-model="formModel.type">
                <el-option
                  v-for="item in supplierDetailType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="formModel.expireDateStart"
                type="date"
                placeholder="开始时间"
                format="YYYY-MM-DD"
                style="margin-right: 4%; width: 48%"
              />
              <el-date-picker
                v-model="formModel.expireDateEnd"
                type="date"
                placeholder="结束时间"
                format="YYYY-MM-DD"
                style="width: 48%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="内部对接人">
              <el-input v-model="formModel.innerInterfaceStaffCode" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="search-btn">
        <el-button type="primary" :icon="Search" @click="getList"
          >查询</el-button
        >
        <el-button :icon="Refresh" @click="reset">重置</el-button>
      </div>
    </el-form>

    <div class="action">
      <el-tooltip content="新建" placement="top-start">
        <el-button type="primary" :icon="Plus" @click="addHandler">
          新建
        </el-button>
      </el-tooltip>
      <el-tooltip content="导入" placement="top-start">
        <el-button type="primary" :icon="Setting" @click="importHandler">
          导入
        </el-button>
      </el-tooltip>
      <el-tooltip content="下载" placement="top-start">
        <el-button type="primary" :icon="ArrowDownBold" @click="handleOpen">
          下载
        </el-button>
      </el-tooltip>
    </div>
    <Table
      :data="tableData"
      :loading="tableLoading"
      :columnConfig="tableConfig"
      :isSelected="true"
      :page-total="pageTotal"
      :setColumnEnable="true"
      :height="tableHeight"
      :actionWidth="px2rem('100px')"
      v-model:pageSize="formModel.pageSize"
      v-model:pageNo="formModel.pageNo"
      @size-change="getList"
      @current-change="getList"
    >
      <template #action="scope">
        <template v-if="scope.row.id">
          <el-button link type="primary" @click="checkHandler(scope.row.id)"
            >查看</el-button
          >
          <el-button link type="primary" @click="editHandler(scope.row)"
            >修改</el-button
          >
          <el-button link type="primary" @click="stopHandler(scope.row.id)"
            >停用</el-button
          >
          <el-button link type="danger" @click="delHandler(scope.row.id)"
            >删除</el-button
          >
        </template>
      </template>
    </Table>
    <ImportForm ref="importFormRef" :biztype="bizType" />
    <!-- 供应商弹窗 -->
    <EditModel
      :visible="editModelVisible"
      :formValue="formValue"
      @closeModel="closeModel"
    />
  </div>
</template>

<script setup lang="ts">
import {
  ArrowDownBold,
  Plus,
  Setting,
  Refresh,
  Search
} from '@element-plus/icons-vue'
import { px2rem } from '@/utils'
import { reactive, toRefs, ref, onMounted, Ref, computed } from 'vue'
import { tableConfig } from './data'
import EditModel from '@/views/supplier/supplierManage/editModel.vue'
import ImportForm from './ImportForm.vue'
import type {
  StateType,
  RecordType,
  queryForm
} from '@/views/supplier/supplierManage/type.ts'
import Table from '@/components/Table/index.vue'
import type { DictItem } from '@/api'
import { SupplierAPI, CommonAPI } from '@/api'
const API = new SupplierAPI()
const CommonApi = new CommonAPI()
import { useDictStore } from '@/store/dict'
import type { CascaderProps, CascaderValue, CascaderOption } from 'element-plus'
// import { SupplierAPI } from '@/api'
// const API = new SupplierAPI()
const selCity = ref([])
const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const nodes: CascaderOption[] = [] // 动态节点
    const { level } = node
    if (level === 0) {
      const resParent = await CommonApi.getAllProvinces()
      if (resParent && resParent?.data) {
        resParent?.data.map((item) => {
          const area = {
            value: item.code,
            label: item.name,
            leaf: level >= 2
          }
          nodes.push(area)
        })
      }
    } else {
      const params = {
        code: node.value as number
      }
      const res = await CommonApi.getProvincesChildren(params)
      if (res && res.data) {
        res?.data.map((item) => {
          const area = {
            value: item.code,
            label: item.name,
            leaf: level >= 2
          }
          nodes.push(area)
        })
      }
    }
    resolve(nodes) // 回调
  }
}
const tableLoading = ref<boolean>(false)
const queryFormList = ref<queryForm>({
  name: '',
  belongCompany: '',
  provinceCode: '',
  cityCode: '',
  countyCode: '',
  status: '',
  expireDateStart: '',
  expireDateEnd: '',
  innerInterfaceStaffCode: '',
  areaCode: [], // 地区
  type: '',
  pageNo: 1,
  pageSize: 10
})
const state = reactive<StateType>({
  // filter form
  formModel: {
    name: '',
    belongCompany: '',
    provinceCode: '',
    cityCode: '',
    countyCode: '',
    status: '',
    expireDateStart: '',
    expireDateEnd: '',
    innerInterfaceStaffCode: '',
    areaCode: [], // 地区
    type: '',
    pageNo: 1,
    pageSize: 10
  },
  // 表列
  tableColumn: tableConfig,
  // 表格数据
  tableData: [],
  pageTotal: 100,
  // 供应商弹窗
  editModelVisible: false
})
const { formModel, tableColumn, tableData, pageTotal, editModelVisible } =
  toRefs(state)
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
onMounted(() => {
  getDicts()
  getList()
})
const supplierDetailStatus: Ref<DictItem[]> = ref([])
const supplierDetailType: Ref<DictItem[]> = ref([])
const dictStore = useDictStore()
const belongCompanyStatus = ref([])
const getDicts = () => {
  const params = {
    dictType: 'SOURCE_SYSTEM'
  }
  CommonApi.getDictTreeList(params)
    .then((res) => {
      if (res && res.code === 200) {
        belongCompanyStatus.value = res.data?.map((item) => {
          return {
            label: item.label,
            value: item.value
          }
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  supplierDetailStatus.value = dictStore.dicts.SUPPLIER_DETAIL_STATUS
  supplierDetailType.value = dictStore.dicts.SUPPLIER_DETAIL_TYPE
}
// 获取列表数据
const getList = async () => {
  console.log(queryFormList.value)
  await API.getSupplierList(queryFormList.value)
    .then((res) => {
      search()
      console.error(res)
      if (res && res.code === 200) {
        tableData.value.splice(0, tableData.length)
        tableData.value.push(...(res?.data?.list || []))
        pageTotal.value = res?.data?.total || 0
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 查询
const search = () => {
  const { areaCode } = formModel.value
  formModel.value.provinceCode = areaCode[0] || ''
  formModel.value.cityCode = areaCode[1] || ''
  formModel.value.countyCode = areaCode[2] || ''
  formModel.value.pageNo = 1
  console.log(formModel.value)
}
// 重置
const reset = () => {}
const handleOpen = () => {
  state.editModelVisible = true
}

// 监听供应商弹窗关闭
const closeModel = ({
  visible,
  type,
  data
}: {
  visible: boolean
  type: string
  data: Object
}) => {
  console.error(visible, type, data)
  state.editModelVisible = visible
}

// 勾选列表数据
const selectAllData = (selection: RecordType[]) => {
  console.log(selection)
}
const selectData = (selection: RecordType[], row: RecordType) => {
  console.log(selection, row)
}

let formValue = reactive({})
const addHandler = () => {
  formValue = {}
  editModelVisible.value = true
}
const checkHandler = (val: string) => {}
const editHandler = (val: string) => {
  formValue = val
  editModelVisible.value = true
}
const stopHandler = (val: string) => {}
const delHandler = (val: string) => {}

const importFormRef = ref()
const bizType = ref('')
const importHandler = () => {
  bizType.value = 'SUPPLIER_DETAIL'
  importFormRef.value.open()
}
</script>

<style lang="scss" scoped>
.supplier-container {
  .filter-form {
    .el-form-item {
      align-items: center;
    }
  }
  .action {
    margin: $base-margin-10 0;
  }
  .list {
    margin-bottom: $base-margin-20;
  }
  .page {
    display: flex;
    justify-content: flex-end;
  }
  .scan-form {
    display: flex;
    align-items: flex-end;
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
}
</style>
