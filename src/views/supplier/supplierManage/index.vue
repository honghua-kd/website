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
              <el-input v-model="formModel.belongCompany" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="区域"> </el-form-item>
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
        <el-button type="primary" :icon="Plus" @click="handleOpen">
          新建
        </el-button>
      </el-tooltip>
      <el-tooltip content="导入" placement="top-start">
        <el-button type="primary" :icon="Setting" @click="handleOpen">
          导入
        </el-button>
      </el-tooltip>
      <el-tooltip content="下载" placement="top-start">
        <el-button type="primary" :icon="ArrowDownBold" @click="handleOpen">
          下载
        </el-button>
      </el-tooltip>
    </div>
    <!-- list -->
    <div class="list">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @select="selectData"
        @select-all="selectAllData"
      >
        <el-table-column
          v-for="i in tableColumn"
          :key="i.label"
          :type="i.type"
          :prop="i.prop"
          :label="i.label"
          :width="i.width"
          :fixed="i.fixed"
          :show-overflow-tooltip="i.tooltip"
        >
          <template v-if="i.label === '操作'">
            <el-button link type="primary">查看</el-button>
            <el-button link type="primary">修改</el-button>
            <el-button link type="primary">停用</el-button>
            <el-button link type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        background
        layout="total,sizes,prev, pager, next"
        :page-sizes="[10, 20, 50, 100]"
        :total="pageTotal"
        class="table-page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 供应商弹窗 -->
    <EditModel
      :visible="editModelVisible"
      :formValue="{}"
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
import { reactive, toRefs, ref, onMounted, Ref } from 'vue'
import BasicData from '@/views/supplier/supplierManage/data'
import EditModel from '@/views/supplier/supplierManage/editModel.vue'
import type {
  StateType,
  RecordType,
  queryForm
} from '@/views/supplier/supplierManage/type.ts'
import type { DictItem } from '@/api'
import { SupplierAPI, CommonAPI } from '@/api'
const API = new SupplierAPI()
const CommonApi = new CommonAPI()
// import type { CascaderValue } from 'element-plus'

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
  tableColumn: BasicData.tableColumn,
  // 表格数据
  tableData: [],
  pageTotal: 100,
  // 供应商弹窗
  editModelVisible: false
})
const { formModel, tableColumn, tableData, pageTotal, editModelVisible } =
  toRefs(state)

onMounted(() => {
  getDicts()
  getList()
})
const supplierDetailStatus: Ref<DictItem[]> = ref([])
const supplierDetailType: Ref<DictItem[]> = ref([])

const getDicts = () => {
  const dictTypes = ['SUPPLIER_DETAIL_STATUS', 'SUPPLIER_DETAIL_TYPE']
  const params = {
    dictTypes
  }
  CommonApi.getDictsList(params)
    .then((res) => {
      if (res && res.code === 200) {
        supplierDetailStatus.value = res?.data
          ?.SUPPLIER_DETAIL_STATUS as DictItem[]
        supplierDetailType.value = res?.data?.SUPPLIER_DETAIL_TYPE as DictItem[]
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
// 获取列表数据
const getList = async () => {
  console.log(queryFormList.value)
  await API.getSupplierList(queryFormList.value)
    .then((res) => {
      search()
      console.log(res)
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
// 表格size变化
const handleSizeChange = (size: number) => {
  formModel.value.pageSize = size
  formModel.value.pageNo = 1
  getList()
}
// 表格分页
const handleCurrentChange = (page: number) => {
  formModel.value.pageNo = page
  getList()
}
const handleOpen = () => {
  state.editModelVisible = true
}

// 监听供应商弹窗关闭
const closeModel = ({ visible, type }: { visible: boolean; type: string }) => {
  console.log(visible, type)
  state.editModelVisible = visible
}

// 勾选列表数据
const selectAllData = (selection: RecordType[]) => {
  console.log(selection)
}
const selectData = (selection: RecordType[], row: RecordType) => {
  console.log(selection, row)
}

// // 级联选择器属性
// const propsObj = reactive({
//   multiple: false
// })
// const changeCity = (value: CascaderValue) => {
//   console.log(value)
//   console.log(formModel.value)
//   if (propsObj.multiple) {
//     // 多选
//   } else {
//     // 单选
//     // value.forEach((i: number) => {
//     //   console.log(i)
//     // })
//   }
// }
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
