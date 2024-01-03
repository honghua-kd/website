<template>
  <div class="main-part-container">
    <!-- filter -->
    <el-card :body-style="{ padding: '10px 10px 0px' }">
      <el-form :inline="true" :model="formModel" class="filter-form">
        <el-form-item label="代理商/办事处">
          <el-input v-model="formModel.name" />
        </el-form-item>
        <el-form-item label="来源系统">
          <el-select v-model="formModel.source">
            <el-option
              v-for="item in sourceArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
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
            <el-button link type="primary">编辑</el-button>
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
    <!--  -->
    <EditModel
      :visible="editModelVisible"
      :formValue="{}"
      @closeModel="closeModel"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import BasicData from '@/views/mortgage/mainPart/data'
import EditModel from '@/views/mortgage/mainPart/editModel.vue'
import type { StateType, RecordType } from '@/views/mortgage/mainPart/type.ts'
const state = reactive<StateType>({
  formModel: {
    name: '',
    source: ''
  },
  sourceArr: [
    {
      label: '全部',
      value: '全部'
    },
    {
      label: '乘用车',
      value: '乘用车'
    },
    {
      label: '商用车',
      value: '商用车'
    },
    {
      label: '乘用车资产转让',
      value: '乘用车资产转让'
    },
    {
      label: '商用车资产转让',
      value: '商用车资产转让'
    }
  ],
  actionList: [
    {
      label: '新增',
      value: 'add'
    },
    {
      label: '下载',
      value: 'download'
    },
    {
      label: '删除',
      value: 'delete'
    }
  ],
  tableColumn: BasicData.tableColumn,
  tableData: [
    {
      name: 'string',
      fullName: 'string',
      organCode: 'string',
      city: 'string',
      area: 'string',
      registerAddress: 'string',
      address: 'string',
      person: 'string',
      phone: 'string',
      creator: 'string',
      createTime: 'string',
      lastUpdatePerson: 'string',
      updateTime: 'string'
    },
    {
      name: 'string',
      fullName: 'string',
      organCode: 'string',
      city: 'string',
      area: 'string',
      registerAddress: 'string',
      address: 'string',
      person: 'string',
      phone: 'string',
      creator: 'string',
      createTime: 'string',
      lastUpdatePerson: 'string',
      updateTime: 'string'
    }
  ],
  pageTotal: 100,
  editModelVisible: false
})
const {
  formModel,
  sourceArr,
  actionList,
  tableColumn,
  tableData,
  pageTotal,
  editModelVisible
} = toRefs(state)

const search = () => {}
const handleSizeChange = () => {}
const handleCurrentChange = () => {}

const action = (val: string | number) => {
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
.main-part-container {
  .filter-form {
    .el-form-item {
      align-items: center;
    }
  }
  .action {
    margin: 10px 0;
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
