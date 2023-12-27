<template>
  <div class="supplier-container">
    <!-- filter -->
    <el-card :body-style="{ padding: '10px 10px 0px' }">
      <el-form :inline="true" :model="formModel" class="filter-form">
        <el-form-item label="公司名称">
          <el-input v-model="formModel.supplierName" />
        </el-form-item>
        <el-form-item label="归属公司">
          <el-input v-model="formModel.belongCompany" />
        </el-form-item>
        <el-form-item label="区域">
          <el-cascader
            placeholder="请选择"
            style="width: 100%"
            :options="BasicData.cityList"
            clearable
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
        <el-form-item label="类型">
          <el-select v-model="formModel.supplierType">
            <el-option
              v-for="item in typeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="到期时间">
          <el-date-picker
            v-model="formModel.expireDate"
            type="daterange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="内部对接人">
          <el-input v-model="formModel.innerInterfaceStaffCode" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="search">重置</el-button>
        </el-form-item>
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
import { reactive, toRefs, onMounted } from 'vue'
import BasicData from '@/views/supplier/supplierManage/data'
import EditModel from '@/views/supplier/supplierManage/editModel.vue'
import type {
  StateType,
  RecordType
} from '@/views/supplier/supplierManage/type.ts'
// import { SupplierAPI } from '@/api'
// const API = new SupplierAPI()
const state = reactive<StateType>({
  // filter form
  formModel: {
    supplierName: '',
    belongCompany: '',
    provinceCode: 0,
    cityCode: 0,
    countyCode: 0,
    status: 0,
    supplierType: 0,
    expireDateStart: '',
    expireDateEnd: '',
    innerInterfaceStaffCode: '',
    expireDate: '' // 自行添加
  },
  statusArr: [
    {
      label: '全部',
      value: '全部'
    },
    {
      label: '启用',
      value: '启用'
    },
    {
      label: '停用',
      value: '停用'
    }
  ],
  typeArr: [
    {
      label: '全部',
      value: '全部'
    },
    {
      label: '启用',
      value: '启用'
    },
    {
      label: '停用',
      value: '停用'
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
  // API.getSupplierList({ pageNo: 1, pageSize: 20 })
})
// 获取列表数据
const search = () => {}
// 表格size变化
const handleSizeChange = () => {}
// 表格分页
const handleCurrentChange = () => {}
const action = (val: string) => {
  if (val === 'add') {
    state.editModelVisible = true
  }
}

// 监听供应商弹窗关闭
const closeModel = ({ visible, type }: { visible: boolean; type: string }) => {
  console.log(visible, type)
  state.editModelVisible = visible
}

const selectAllData = (selection: RecordType[]) => {
  console.log(selection)
}
const selectData = (selection: RecordType[], row: RecordType) => {
  console.log(selection, row)
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
