<template>
  <div class="supplier-container">
    <!-- filter -->
    <el-card :body-style="{ padding: '10px 10px 0px' }">
      <el-form :inline="true" :model="formModel" class="filter-form">
        <el-form-item label="公司名称">
          <el-input v-model="formModel.companyName" size="large" />
        </el-form-item>
        <el-form-item label="归属公司">
          <el-input v-model="formModel.belongCompany" size="large" />
        </el-form-item>
        <el-form-item label="区域">
          <el-select
            :style="{ width: '130px', marginRight: '10px' }"
            placeholder="省"
            v-model="formModel.province"
            size="large"
          ></el-select>
          <el-select
            :style="{ width: '130px', marginRight: '10px' }"
            placeholder="市"
            v-model="formModel.city"
            size="large"
          ></el-select>
          <el-select
            :style="{ width: '130px' }"
            placeholder="区"
            v-model="formModel.area"
            size="large"
          ></el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formModel.status" size="large">
            <el-option
              v-for="item in statusArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="formModel.type" size="large">
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
            v-model="formModel.expireTime"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="A hh:mm:ss"
            size="large"
          />
        </el-form-item>
        <el-form-item label="内部对接人">
          <el-input v-model="formModel.inPerson" size="large" />
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
        >
          <template v-if="i.label === '操作'">
            <span class="action-span">查看</span>
            <span class="action-span">修改</span>
            <span class="action-span">停用</span>
            <span class="action-span">删除</span>
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
    <EditModel
      :visible="editModelVisible"
      :formValue="{}"
      @closeModel="closeModel"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import BasicData from './data'
import EditModel from './editModel.vue'
import type { StateType, RecordType } from './type.ts'
const state = reactive<StateType>({
  formModel: {
    companyName: '',
    belongCompany: '',
    province: '',
    city: '',
    area: '',
    status: '',
    type: '',
    expireTime: '',
    inPerson: ''
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
  tableColumn: BasicData.tableColumn,
  tableData: [
    {
      companyName: 'string',
      type: 'string',
      belongCompany: 'string',
      area: 'string',
      person: 'string',
      phone: 'string',
      email: 'string',
      status: 'string',
      expireTime: 'string',
      notice: 'string',
      inPerson: 'string'
    }
  ],
  pageTotal: 100,
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
const search = () => {}
const handleSizeChange = () => {}
const handleCurrentChange = () => {}
const action = (val: string) => {
  if (val === 'add') {
    state.editModelVisible = true
  }
}
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
    margin: 10px 0;
  }
  .action-span {
    margin-right: 6px;
    color: #1890ff;
    cursor: pointer;
  }
  .list {
    margin-bottom: 20px;
  }
  .page {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
