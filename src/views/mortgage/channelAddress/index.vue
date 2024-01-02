<template>
  <div class="channel-container">
    <!-- filter -->
    <div class="channel-search-container" :ref="searchBoxRef">
      <el-form
        :inline="true"
        :model="formModel"
        class="filter-form"
        :label-width="px2rem('110px')"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="来源系统" style="width: 100%">
              <el-select v-model="formModel.source" style="width: 100%">
                <el-option
                  v-for="item in sourceArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="代理商/办事处" style="width: 100%">
              <el-input v-model="formModel.name" /> </el-form-item
          ></el-col>
          <el-col :span="6"
            ><el-form-item label="城市" style="width: 100%">
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
              /> </el-form-item
          ></el-col>
        </el-row>
        <el-row justify="end">
          <el-col :span="6" class="btn-row">
            <el-form-item>
              <el-button :icon="Search" type="primary" @click="search"
                >查询</el-button
              >
              <el-button :icon="Refresh" @click="refresh">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-divider border-style="dashed" />
    <!-- action -->
    <div class="action">
      <el-button :icon="Plus" type="primary" @click="action('BatchImport')"
        >批量导入</el-button
      >
      <el-button
        :icon="Download"
        type="primary"
        @click="action('DownloadTemplate')"
        >下载导入模版</el-button
      >
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
          :min-width="i.minWidth"
          :fixed="i.fixed"
          :align="i.align"
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
import { reactive, toRefs, ref, computed } from 'vue'
import BasicData from '@/views/mortgage/channelAddress/data'
import EditModel from '@/views/mortgage/channelAddress/editModel.vue'
import type {
  StateType,
  RecordType
} from '@/views/mortgage/channelAddress/type'
import type { CascaderProps, CascaderValue } from 'element-plus'
import {
  Refresh,
  Search,
  Plus,
  Delete,
  Download
} from '@element-plus/icons-vue'
import { px2rem } from '@/utils'
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
  tableLoading: false,
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
  tableLoading,
  tableColumn,
  tableData,
  tableActionList,
  pageTotal,
  editModelVisible,
  editModelTitle
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
.channel-container {
  .channel-search-container {
    width: 100%;
  }
  .filter-form {
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
