<template>
  <div class="main-part-container">
    <!-- filter -->
    <el-card :body-style="{ padding: '10px 10px 0px' }">
      <el-form :inline="true" :model="formModel" class="filter-form">
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
        <el-form-item label="代理商/办事处">
          <el-input v-model="formModel.name" />
        </el-form-item>
        <el-form-item label="城市">
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
        :border="true"
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
          :min-width="i.minWidth"
          :fixed="i.fixed"
        >
          <template v-if="i.label === '操作'" #default="scope">
            <el-button
              v-for="item in tableActionList"
              :key="item.value"
              link
              :type="item.value === 'delete' ? 'danger' : 'primary'"
              @click="actionTableItem(scope, item.value)"
              >{{ item.label }}</el-button
            >
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
      :title="editModelTitle"
      @closeModel="closeModel"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import BasicData from '@/views/mortgage/channelAddress/data'
import EditModel from '@/views/mortgage/channelAddress/editModel.vue'
import type {
  StateType,
  RecordType
} from '@/views/mortgage/channelAddress/type'
import type { CascaderProps, CascaderValue } from 'element-plus'
// import { AgencyAPI } from '@/api'
// const API = new AgencyAPI()

const state = reactive<StateType>({
  formModel: {
    name: '',
    source: '',
    areaCode: []
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
  actionList: BasicData.actionList,
  tableColumn: BasicData.tableColumn,
  tableData: [{}],
  tableActionList: BasicData.tableActionList,
  pageTotal: 100,
  editModelVisible: false,
  editModelTitle: ''
})
const {
  formModel,
  sourceArr,
  actionList,
  tableColumn,
  tableData,
  tableActionList,
  pageTotal,
  editModelVisible,
  editModelTitle
} = toRefs(state)

const search = () => {}
const handleSizeChange = () => {}
const handleCurrentChange = () => {}

const action = (val: string | number) => {
  if (val === 'add') {
    state.editModelTitle = '新增'
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
const actionTableItem = (row: RecordType, value: string | number) => {
  if (value === 'edit') {
    state.editModelTitle = '编辑'
    state.editModelVisible = true
  }
}

// 级联选择器属性
const propsObj = reactive<CascaderProps>({
  multiple: false
})
const changeCity = (value: CascaderValue): void => {
  console.log(value)
  console.log(formModel.value)
  const valueCopy = JSON.parse(JSON.stringify(value))
  console.log(valueCopy)
  valueCopy.forEach((i: number) => {
    console.log(i)
  })
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
