<template>
  <div class="main-part-container">
    <!-- filter -->
    <div class="main-search-container" :ref="searchBoxRef">
      <el-form
        :inline="true"
        :model="formModel"
        class="filter-form"
        :label-width="px2rem('110px')"
      >
        <el-row :gutter="20">
          <el-col :span="6"
            ><el-form-item label="代理商/办事处" style="width: 100%">
              <el-input v-model="formModel.name" /> </el-form-item
          ></el-col>
          <el-col :span="6"
            ><el-form-item label="来源系统" style="width: 100%">
              <el-select v-model="formModel.source" style="width: 100%">
                <el-option
                  v-for="item in sourceArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select> </el-form-item
          ></el-col>
        </el-row>
        <el-row justify="end">
          <el-col :span="6" class="btn-row"
            ><el-form-item>
              <el-button :icon="Search" type="primary" @click="search"
                >查询</el-button
              >
              <el-button :icon="Refresh" @click="refresh">重置</el-button>
            </el-form-item></el-col
          >
        </el-row>
      </el-form>
    </div>
    <el-divider border-style="dashed" />
    <!-- action -->
    <div class="action">
      <el-button :icon="Plus" type="primary" @click="action('Add')"
        >新增</el-button
      >
      <el-button :icon="Download" type="primary" @click="action('Download')"
        >下载</el-button
      >
      <el-tooltip content="需勾选要，方可操作" placement="top-start"
        ><el-button :icon="Delete" type="primary" @click="action('Delete')"
          >删除</el-button
        >
      </el-tooltip>
    </div>
    <!-- list -->
    <div class="list">
      <el-table
        :data="tableData"
        :border="true"
        :header-cell-style="{
          background: '#eef1f6',
          color: '#606266',
          textAlign: 'center'
        }"
        v-loading="tableLoading"
        row-key="id"
        :tree-props="{ children: 'target' }"
        :max-height="tableHeight"
        :cell-style="{ borderRight: '1px solid #fff' }"
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
          :align="i.align"
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
import { reactive, toRefs, ref, computed } from 'vue'
import BasicData from '@/views/mortgage/mainPart/data'
import EditModel from '@/views/mortgage/mainPart/editModel.vue'
import type { StateType, RecordType } from '@/views/mortgage/mainPart/type'
import {
  Refresh,
  Search,
  Plus,
  Delete,
  Download
} from '@element-plus/icons-vue'
import { px2rem } from '@/utils'
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
  tableLoading: false,
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
  tableLoading,
  tableColumn,
  tableData,
  pageTotal,
  editModelVisible
} = toRefs(state)

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

const search = () => {}
const refresh = () => {}
const handleSizeChange = () => {}
const handleCurrentChange = () => {}

const action = (val: string | number) => {
  if (val === 'Add') {
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
  .main-search-container {
    width: 100%;
  }
  .filter-form {
    padding: 6px 10px;
    width: 90%;
    .el-form-item {
      align-items: center;
    }
    .btn-row {
      display: flex;
      justify-content: flex-end;
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
