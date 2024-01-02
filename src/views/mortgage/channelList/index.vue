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
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="来源系统" style="width: 100%">
              <el-select v-model="formModel.sourceSystem2" style="width: 100%">
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
              <el-input v-model="formModel.agencyName" />
            </el-form-item>
          </el-col>
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
        @selection-change="selectData"
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
      :formValue="detailData"
      :title="editModelTitle"
      @closeModel="closeModel"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, computed, onMounted } from 'vue'
import BasicData from '@/views/mortgage/channelList/data'
import EditModel from '@/views/mortgage/channelList/editModel.vue'
import type { StateType } from '@/views/mortgage/channelList/type'
import type { AgencyListResponse } from '@/api/channel/types/response'
import {
  Refresh,
  Search,
  Plus,
  Delete,
  Download
} from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { px2rem } from '@/utils'
import { AgencyAPI } from '@/api'
const API = new AgencyAPI()

const state = reactive<StateType>({
  formModel: {
    agencyName: '',
    sourceSystem1: '',
    sourceSystem2: '',
    pageNo: 1,
    pageSize: 10
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
  tableData: [],
  tableActionList: BasicData.tableActionList,
  pageTotal: 0,
  editModelVisible: false,
  editModelTitle: '',
  selectIdsArr: [],
  detailData: {}
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
  editModelTitle,
  selectIdsArr,
  detailData
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

onMounted(() => {
  getListData()
})

const getListData = async () => {
  state.tableLoading = true
  const res = await API.getAgencyList(formModel.value)
  state.tableLoading = false
  console.log(res)
  if (res && res.code === 200) {
    state.tableData = res?.data?.list
    state.pageTotal = res?.data?.total
  }
}
const search = () => {
  formModel.value.pageNo = 1
  getListData()
}
const refresh = () => {
  formModel.value.pageNo = 1
  formModel.value.agencyName = ''
  formModel.value.sourceSystem1 = ''
  formModel.value.sourceSystem2 = ''
  getListData()
}
const handleSizeChange = (size: number) => {
  formModel.value.pageSize = size
  formModel.value.pageNo = 1
  getListData()
}
const handleCurrentChange = (page: number) => {
  formModel.value.pageNo = page
  getListData()
}

const action = (val: string | number) => {
  if (val === 'Add') {
    state.editModelTitle = '新增'
    state.editModelVisible = true
  } else if (val === 'Delete') {
    deleteData()
  } else if (val === 'Downloa') {
    downloadData()
  } else if (val === 'DownloadTemplate') {
    downloadTemplate()
  } else if (val === 'BatchImport') {
    batchImport()
  }
}
const deleteData = () => {
  console.log(selectIdsArr.value)
  if (selectIdsArr.value.length === 0) {
    ElMessage({
      type: 'error',
      message: '请选择要删除的内容'
    })
    return
  }
  // 二次确认
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 调用删除接口
      API.getAgencyDelete({ ids: selectIdsArr.value }).then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          getListData()
        }
      })
    })
    .catch((err: Error) => {
      throw err
    })
}

const downloadData = () => {
  console.log(selectIdsArr.value)
  if (selectIdsArr.value.length === 0) {
    ElMessage({
      type: 'error',
      message: '请选择要下载的数据'
    })
  }
  // API.AgencyExportRequest()
}

const downloadTemplate = () => {}

const batchImport = () => {}
const closeModel = ({ visible, type }: { visible: boolean; type: string }) => {
  console.log(visible, type)
  state.editModelVisible = visible
  if (type === 'update-close') {
    // 是否需要返回第一页
    // formModel.value.pageNo = 1
    getListData()
  }
  state.detailData = {}
}

const selectData = (selection: AgencyListResponse[]) => {
  const result: string[] = []
  if (selection.length !== 0) {
    selection.forEach((i: AgencyListResponse) => {
      console.log(i)
      result.push(`${i.id}`)
    })
  }
  console.log(result)
  state.selectIdsArr = result
}

const actionTableItem = async (
  row: { row: AgencyListResponse },
  value: string | number
) => {
  const rowData = row.row
  console.log(rowData)
  if (value === 'edit') {
    const res = await API.getAgencyDetail({ ids: rowData.id })
    console.log(res)
    if (res && res.code === 200) {
      if (res.data) {
        state.detailData = res.data
      }
      state.editModelTitle = '编辑'
      state.editModelVisible = true
    }
  }
  if (value === 'delete') {
    // 二次确认
    ElMessageBox.confirm('确认要删除吗？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        // 调用删除接口
        API.getAgencyDelete({ ids: [rowData.id] }).then((res) => {
          if (res && res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            getListData()
          }
        })
      })
      .catch((err: Error) => {
        throw err
      })
  }
}
</script>

<style lang="scss" scoped>
.channel-container {
  .channel-search-container {
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
