<template>
  <div class="supplier-container">
    <el-form :model="formModel" class="scan-form" label-width="80px">
      <div class="scan-search-bar">
        <el-row :gutter="25">
          <el-col :span="6">
            <el-form-item label="公司名称">
              <el-input v-model="queryFormList.name" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="归属公司">
              <el-select
                v-model="queryFormList.belongCompany"
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
              <el-select v-model="queryFormList.status">
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
              <el-select v-model="queryFormList.type">
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
                v-model="queryFormList.expireDateStart"
                type="date"
                placeholder="开始时间"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="margin-right: 4%; width: 48%"
              />
              <el-date-picker
                v-model="queryFormList.expireDateEnd"
                type="date"
                placeholder="结束时间"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 48%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="内部对接人">
              <el-input v-model="queryFormList.innerInterfaceStaffCode" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="search-btn">
        <el-button type="primary" :icon="Search" @click="searchHandler"
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
        <el-button
          type="primary"
          :icon="ArrowDownBold"
          @click="downloadHandler"
        >
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
      @selection-change="selectionChangeHandler"
      @size-change="getList"
      @current-change="getList"
    >
      <template #default="{ row, prop }">
        <span v-if="prop === 'status'">
          {{ getStatus(row.status) }}
        </span>
      </template>
      <template #action="scope">
        <template v-if="scope.row.id">
          <el-button link type="primary" @click="checkHandler(scope.row.id)"
            >查看</el-button
          >
          <el-button link type="primary" @click="editHandler(scope.row)"
            >修改</el-button
          >
          <el-button
            v-if="scope.row.status === 'SUPPLIER_DETAIL_STATUS_1'"
            link
            type="primary"
            @click="stopHandler(scope.row.id)"
            >停用</el-button
          >
          <el-button
            v-if="scope.row.status === 'SUPPLIER_DETAIL_STATUS_2'"
            link
            type="primary"
            @click="startHandler(scope.row.id)"
            >启用</el-button
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
    <CheckModel
      :visible="editCheckModelVisible"
      :formValue="formCheckValue"
      @closeModel="closeCheckModel"
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
import { ElMessageBox, ElMessage, ElForm } from 'element-plus'
import { px2rem } from '@/utils'
import { reactive, toRefs, ref, onMounted, Ref, computed } from 'vue'
import { tableConfig } from './data'
import EditModel from '@/views/supplier/supplierManage/editModel.vue'
import CheckModel from '@/views/supplier/supplierManage/checkModel.vue'
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
import fileDownload from 'js-file-download'
import { useDictStore } from '@/store/dict'
import type { CascaderProps, CascaderValue, CascaderOption } from 'element-plus'
import dayjs from 'dayjs'
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
  queryFormList.value.provinceCode = selCity.value ? selCity.value[0] : ''
  queryFormList.value.cityCode = selCity.value ? selCity.value[1] : ''
  queryFormList.value.countyCode = selCity.value ? selCity.value[2] : ''
  await API.getSupplierList(queryFormList.value)
    .then((res) => {
      // search()
      if (res && res.code === 200) {
        tableData.value.splice(0, tableData.value.length)
        tableData.value.push(...(res?.data?.list || []))
        pageTotal.value = res?.data?.total || 0
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 查询
const searchHandler = () => {
  queryFormList.value.pageNo = 1
  getList()
}
// 重置
const reset = () => {
  queryFormList.value.name = ''
  queryFormList.value.belongCompany = ''
  queryFormList.value.provinceCode = ''
  queryFormList.value.cityCode = ''
  queryFormList.value.countyCode = ''
  queryFormList.value.status = ''
  queryFormList.value.expireDateStart = ''
  queryFormList.value.expireDateEnd = ''
  queryFormList.value.innerInterfaceStaffCode = ''
  queryFormList.value.type = ''
  queryFormList.value.pageNo = 1
  queryFormList.value.pageSize = 10
  getList()
}

// 监听供应商弹窗关闭
const closeModel = ({ visible, type }: { visible: boolean; type: string }) => {
  console.error(visible, type)
  state.editModelVisible = visible
}
// 监听查看详情供应商弹窗关闭
const closeCheckModel = ({
  visible,
  type
}: {
  visible: boolean
  type: string
}) => {
  console.error(visible, type)
  editCheckModelVisible.value = visible
}

let formValue = reactive({})
const addHandler = () => {
  formValue = {}
  editModelVisible.value = true
}
const editCheckModelVisible = ref<boolean>(false)
let formCheckValue = reactive({})
const checkHandler = (val: string) => {
  const params = {
    id: val
  }
  API.supplierDetail(params).then((res) => {
    console.error(res)
    if (res && res.code === 200) {
      formCheckValue = res.data
      editCheckModelVisible.value = true
    }
  })
}
const editHandler = (val: string) => {
  formValue = val
  editModelVisible.value = true
}
const stopHandler = (val: string) => {
  const params = {
    id: val
  }
  API.supplierDisable(params).then((res) => {
    console.error(res)
    if (res && res.code === 200) {
      ElMessage({
        type: 'success',
        message: '更新成功'
      })
      getList()
    }
  })
}
const startHandler = (val: string) => {
  const params = {
    id: val
  }
  API.supplierEnable(params).then((res) => {
    console.error(res)
    if (res && res.code === 200) {
      ElMessage({
        type: 'success',
        message: '更新成功'
      })
      getList()
    }
  })
}

const delHandler = (id: string) => {
  // 二次确认
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 调用删除接口
      const params = {
        id: id
      }
      API.supplierDelete(params).then((res) => {
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

const importFormRef = ref()
const bizType = ref('')
const importHandler = () => {
  bizType.value = 'SUPPLIER_DETAIL'
  importFormRef.value.open()
}
const getStatus = (val: string) => {
  let label = ''
  supplierDetailStatus.value.forEach((item) => {
    if (item.value === val) {
      label = item.label
    }
  })
  return label
}
const selectData = ref([])
// 选择的数据
const selectionChangeHandler = (item) => {
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
const downloadHandler = () => {
  const ids = selectIds.value.map((item) => String(item))
  let param
  if (selectIds.value.length) {
    param = JSON.stringify({
      ids: ids,
      ...queryFormList.value
    })
  } else {
    param = JSON.stringify({
      ...queryFormList.value
    })
  }
  const params = {
    selectParams: param,
    bizType: 'SUPPLIER_INFO_EXPORT'
  }

  CommonApi.exportBySelect(params)
    .then((res) => {
      if (res && res.code === 200) {
        if (res?.data?.sync === 1) {
          const params = {
            fileCode: res?.data?.fileCode as string
          }
          CommonApi.downLoadFiles(params)
            .then((res) => {
              const fileStream = res?.data
              const fileName = `供应商信息${dayjs().format('YYYYMMDD')}.xlsx`
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
            message: '导出任务已经产生，前面有任务待处理，请至我的下载中查看'
          })
        }
      }
    })
    .catch((err: Error) => {
      throw err
    })
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
