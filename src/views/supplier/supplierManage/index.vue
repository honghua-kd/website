<template>
  <div class="supplier-container">
    <!-- filter -->
    <el-card :body-style="{ padding: '10px 10px 0px' }">
      <el-form :model="formModel" class="filter-form" label-width="80px">
        <el-row :gutter="25">
          <el-col :span="5">
            <el-form-item label="公司名称">
              <el-input v-model="formModel.name" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="归属公司">
              <el-input v-model="formModel.belongCompany" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="区域">
              <el-cascader
                style="width: 100%"
                v-model="formModel.areaCode"
                placeholder="请选择"
                :props="propsObj"
                :options="BasicData.cityList"
                collapse-tags
                collapse-tags-tooltip
                clearable
                @change="changeCity"
              />
              <!-- <el-select
                :style="{ width: '130px', marginRight: '10px' }"
                placeholder="省"
                v-model="formModel.province"
              ></el-select>
              <el-select
                :style="{ width: '130px', marginRight: '10px' }"
                placeholder="市"
                v-model="formModel.city"
              ></el-select>
              <el-select
                :style="{ width: '130px' }"
                placeholder="区"
                v-model="formModel.area"
              ></el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态">
              <el-select v-model="formModel.status">
                <el-option
                  v-for="item in statusArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="25">
          <el-col :span="5">
            <el-form-item label="类型">
              <el-select v-model="formModel.type">
                <el-option
                  v-for="item in typeArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="formModel.expireDateStart"
                type="date"
                placeholder="开始时间"
                format="YYYY-MM-DD"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="formModel.expireDateEnd"
                type="date"
                placeholder="结束时间"
                format="YYYY-MM-DD"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="内部对接人">
              <el-input v-model="formModel.innerInterfaceStaffCode" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button @click="reset()">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- action -->
    <div class="action">
      <el-button
        v-for="i in actionList"
        :key="i.value"
        type="primary"
        @click="action(i.value)"
        >{{ i.label }}</el-button
      >
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
import { reactive, toRefs, ref, onMounted } from 'vue'
import BasicData from '@/views/supplier/supplierManage/data'
import EditModel from '@/views/supplier/supplierManage/editModel.vue'
import type {
  StateType,
  RecordType,
  queryForm
} from '@/views/supplier/supplierManage/type.ts'
import { SupplierAPI } from '@/api'
const API = new SupplierAPI()
import type { CascaderValue } from 'element-plus'

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
  statusArr: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '启用',
      value: 1
    },
    {
      label: '停用',
      value: 0
    }
  ],
  typeArr: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '律所',
      value: 1
    },
    {
      label: '委外机构',
      value: 2
    },
    {
      label: '仓库',
      value: 3
    },
    {
      label: '运输公司',
      value: 4
    },
    {
      label: '收车公司',
      value: 5
    },
    {
      label: '评估机构',
      value: 6
    },
    {
      label: '设备处置平台机构',
      value: 7
    }
  ],
  actionList: [
    {
      label: '新建',
      value: 'add'
    },
    {
      label: '导入',
      value: 'import'
    },
    {
      label: '下载',
      value: 'download'
    }
  ],
  // 表列
  tableColumn: BasicData.tableColumn,
  // 表格数据
  tableData: [],
  pageTotal: 100,
  // 供应商弹窗
  editModelVisible: false
})
const {
  formModel,
  statusArr,
  typeArr,
  actionList,
  tableColumn,
  tableData,
  pageTotal,
  editModelVisible
} = toRefs(state)

onMounted(() => {
  getList()
})

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
const action = (val: string | number) => {
  if (val === 'add') {
    state.editModelVisible = true
  }
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

// 级联选择器属性
const propsObj = reactive({
  multiple: false
})
const changeCity = (value: CascaderValue) => {
  console.log(value)
  console.log(formModel.value)
  if (propsObj.multiple) {
    // 多选
  } else {
    // 单选
    // value.forEach((i: number) => {
    //   console.log(i)
    // })
  }
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
}
</style>
