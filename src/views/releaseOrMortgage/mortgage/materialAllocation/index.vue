<template>
  <div class="material-allocation">
    <SearchField
      v-model="queryParams"
      :data="searchConfig"
      :colNum="4"
      :labelWidth="'120px'"
      @search="getList"
    >
    </SearchField>
    <el-divider border-style="dashed" />
    <TableField
      :loading="tableLoading"
      :data="tableData"
      :columns="tableConfig"
      :page-total="pageTotal"
      :height="tableHeight"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @selection-change="selectionChangeHandler"
      @size-change="getList"
      @current-change="getList"
    >
      <template #buttons>
        <el-button type="primary" @click="add"> 新增 </el-button>
        <el-button type="primary" @click="download"> 下载 </el-button>

        <el-button type="primary" @click="deleteAll"> 删除 </el-button>
      </template>
      <template #default="{ row, prop }">
        <span v-if="prop === 'status'">
          <el-switch
            :model-value="row.status"
            inline-prompt
            active-text="是"
            inactive-text="否"
            :active-value="1"
            :inactive-value="0"
            @click="changeSwitch"
          />
        </span>
      </template>
      <template #action="scope">
        <el-button link type="primary" @click="handleEdit">编辑</el-button>
        <el-button link type="primary" @click="handleDelete(scope.row.id)"
          >删除</el-button
        >
      </template>
    </TableField>
    <ConfigurationDialog
      :visible="dialogVisible"
      :formValue="detailData"
      :title="dialogTitle"
      @closeModel="closeModel"
    >
    </ConfigurationDialog>
  </div>
</template>

<script setup lang="ts">
import SearchField from '@/components/SearchField/index.vue'
import TableField from '@/components/TableField/index.vue'
import ConfigurationDialog from './components/configurationDialog.vue'
import { tableConfig, searchConfig } from './data'
import { StateType, tableDataType } from './type'
import { reactive, ref, computed, toRefs, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const tableLoading = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('')
const state = reactive<StateType>({
  queryParams: {
    pageNo: 1,
    pageSize: 10
  },
  pageTotal: 0,
  tableData: [],
  detailData: {
    agencyName: '',
    sourceSystem: '',
    Contract: [],
    taskType: [],
    DischargeCharge: 0,
    certificateStatus: [],
    channel: 0,
    Submission: [],
    MaterialDestination: 1
  }
})
const { queryParams, tableData, pageTotal, detailData } = toRefs(state)

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
const getList = () => {
  // tableLoading.value = true
  console.log(queryParams.value, 'queryParams.value')

  state.tableData = Array.from({ length: 10 }).map((item, index) => ({
    name: `我是第${index}项`,
    status: 1,
    businessSubcategory: 'New York No. 1 Lake Park',
    person: 'celina',
    moneyType: '1111',
    rent: 'eee',
    bussiness: '2020-2-1',
    id: index
  }))
  // tableLoading.value = false
  state.pageTotal = state.tableData.length
}
onMounted(() => {
  getList()
})

// 选择的数据
const selectData = reactive<tableDataType[]>([])
const selectionChangeHandler = (item: tableDataType[]) => {
  selectData.splice(0, selectData.length)
  selectData.push(...item)
}
const selectIds = computed(() => {
  return selectData.map((item) => {
    return String(item.id)
  })
})
// 切换状态
const changeSwitch = async () => {
  try {
    // await API.getAgencyEdit(params)
    ElMessage({
      type: 'success',
      message: '更新成功'
    })
    getList()
  } catch {
    getList()
  }
}
// 关闭弹窗
const closeModel = ({ visible, type }: { visible: boolean; type: string }) => {
  dialogVisible.value = visible
  detailData.value.agencyName = ''
  detailData.value.sourceSystem = ''
  detailData.value.Contract = []
  detailData.value.taskType = []
  detailData.value.DischargeCharge = 0
  detailData.value.certificateStatus = []
  detailData.value.channel = 0
  detailData.value.Submission = []
  detailData.value.MaterialDestination = 1
  if (type === 'update-close') {
    // 是否需要返回第一页
    // formModel.value.pageNo = 1
    getList()
  }
}
// 删除
const handleDelete = (id: number) => {
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      console.log(id)
      getList()
    })
    .catch((err: Error) => {
      throw err
    })
}
// 编辑
const handleEdit = () => {
  const obj = {
    agencyName: '111',
    sourceSystem: '2',
    Contract: ['1'],
    taskType: ['1'],
    DischargeCharge: 1,
    certificateStatus: ['3'],
    channel: 1,
    Submission: ['1', '4'],
    MaterialDestination: 1
  }
  detailData.value = JSON.parse(JSON.stringify(obj))
  dialogTitle.value = '编辑'
  dialogVisible.value = true
}
// 新增
const add = () => {
  dialogVisible.value = true
  dialogTitle.value = '新增'
}
// 下载
const download = () => {
  const ids = selectIds.value.map((item) => String(item))
  const params = {
    selectParams: '',
    bizType: 'MORTGAGE_ALLOCATION_RULE_TEMPLATE_EXPORT'
  }
  if (selectIds.value.length) {
    params.selectParams = JSON.stringify({
      ids: ids
    })
  } else {
    params.selectParams = JSON.stringify({
      ...queryParams
    })
  }
}
// 批量删除
const deleteAll = () => {
  console.log(selectData)
  if (selectData.length === 0) {
    ElMessage({
      type: 'error',
      message: '请选择要删除的内容'
    })
  }
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 调用删除接口
      // API.getAgencyDelete({ ids: selectIdsArr.value }).then((res) => {
      //   if (res && res.code === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getList()
      // }
    })
    // })
    .catch((err: Error) => {
      throw err
    })
}
</script>

<style lang="scss" scoped></style>
