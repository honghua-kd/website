<template>
  <div class="main-part-container">
    <!-- 搜索工作栏 -->
    <div :ref="searchBoxRef">
      <!-- search bar -->
      <SearchBar
        v-model="formModel"
        :searchConfig="searchConfig"
        :labelWidth="'100px'"
        @reset="reset"
        @search="searchHandler"
      >
        <template #area>
          <AreaCascader
            :value="areaCode"
            style="width: 100%"
            :multiple="true"
            @changeAreaData="changeAreaData"
          />
        </template>
      </SearchBar>
    </div>
    <el-divider border-style="dashed" />
    <!-- list -->
    <div class="list">
      <Table
        :loading="tableLoading"
        :data="tableData"
        :columnConfig="tableColumn"
        :height="tableHeight"
        row-key="mortgageSubjectCode"
        :tree-props="{ children: 'target' }"
        :page-total="pageTotal"
        v-model:pageSize="formModel.pageSize"
        v-model:pageNo="formModel.pageNo"
        @selection-change="selectData"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <template #btnsBox>
          <div class="action">
            <el-button :icon="Plus" type="primary" @click="action('Add')"
              >新增</el-button
            >
            <Button
              ref="downloadButton"
              :icon="Download"
              name="下载"
              @onButtonFn="action('Download')"
            />
            <el-tooltip content="需勾选要，方可操作" placement="top-start"
              ><el-button
                :icon="Delete"
                type="primary"
                @click="action('Delete')"
                >删除</el-button
              >
            </el-tooltip>
          </div>
        </template>
        <template #selection>
          <el-table-column
            type="selection"
            :width="40"
            :selectable="() => true"
            :fixed="true"
            align="center"
          />
        </template>
        <template #action="{ row }">
          <el-button link type="primary" @click="actionTableItem(row, 'edit')"
            >编辑</el-button
          >
          <el-button link type="danger" @click="actionTableItem(row, 'delete')"
            >删除</el-button
          >
        </template>
      </Table>
    </div>
    <!--  -->
    <EditModel
      :visible="editModelVisible"
      :formValue="detailData"
      :title="editModelTitle"
      :contractSubjectOptions="dictStore.dicts['CONTRACT_SUBJECT']"
      :mortgageCapitalOptions="dictStore.dicts['MORTGAGE_CAPITAL_INFO']"
      :mortgageSubjectOptions="dictStore.dicts['MORTGAGE_SUBJECT_TYPE']"
      @closeModel="closeModel"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, computed, onMounted } from 'vue'
import { searchConfig, tableColumn } from './data'
import EditModel from './editModel.vue'
import { Plus, Delete, Download } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus'
import { handleDownloadFile } from '@/utils'
import SearchBar from '@/components/SearchBar/index.vue'
import Table from '@/components/Table/index.vue'
import { MainPartAPI, CommonAPI } from '@/api'
import type { StateType } from './type'
import type { MortgageSubjectListResponse } from '@/api/mainPart/types/response'
import { useDictStore } from '@/store/dict'
const API = new MainPartAPI()
const COMMONAPI = new CommonAPI()
const dictStore = useDictStore()
const downloadButton = ref()
const state = reactive<StateType>({
  formModel: {
    mortgageSubjectName: '',
    provinces: [],
    cities: [],
    pageNo: 1,
    pageSize: 10
  },
  tableLoading: false,
  tableData: [],
  pageTotal: 100,
  editModelVisible: false,
  editModelTitle: '',
  selectIdsArr: [],
  detailData: {
    mortgageSubjectAllName: '',
    mortgageSubjectName: '',
    mortgageSubjectType: '',
    organizationCode: '',
    registeredAddress: ''
  },
  areaCode: []
})
const {
  formModel,
  tableLoading,
  tableData,
  pageTotal,
  editModelVisible,
  editModelTitle,
  selectIdsArr,
  detailData,
  areaCode
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

// 获取列表数据
const getListData = async () => {
  state.tableLoading = true
  const res = await API.getMortgageSubjectList(formModel.value)
  state.tableLoading = false
  if (res && res.code === 200) {
    state.tableData = res.data ? res.data.list : []
    state.pageTotal = res.data && res.data.total ? res.data.total : 0
  }
}

// 查询
const searchHandler = () => {
  formModel.value.pageNo = 1
  getListData()
}
// 重置
const reset = () => {
  state.areaCode = []
  formModel.value.mortgageSubjectName = ''
  formModel.value.provinces = []
  formModel.value.cities = []
  formModel.value.pageNo = 1
  getListData()
}
// 切换分页size
const handleSizeChange = (size: number) => {
  formModel.value.pageSize = size
  formModel.value.pageNo = 1
  getListData()
}
// 切换分页
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
  } else if (val === 'Download') {
    downloadData()
  }
}

// 删除数据
const deleteData = () => {
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
      API.getMortgageSubjectDelete({
        ids: state.selectIdsArr
      }).then((res) => {
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

// 下载数据
const downloadData = () => {
  downloadButton.value.changeLoading(true)
  let params = {}
  if (selectIdsArr.value.length === 0) {
    params = {
      mortgageSubjectName: formModel.value.mortgageSubjectName,
      provinces: formModel.value.provinces,
      cities: formModel.value.cities
    }
  } else {
    params = { ids: selectIdsArr.value }
  }
  COMMONAPI.exportBySelect({
    // 需要后端走通用下载接口，给出bizType
    bizType: 'SUBJECT_INFO_EXPORT',
    selectParams: JSON.stringify(params)
  })
    .then((res) => {
      if (res.data?.sync === 1) {
        const params = { fileCode: res.data.fileCode as string }
        COMMONAPI.downLoadFiles(params)
          .then((response) => {
            handleDownloadFile(response, res.data?.fileName)
            downloadButton.value.changeLoading(false)
          })
          .catch(() => {
            downloadButton.value.changeLoading(false)
          })
      } else {
        ElNotification({
          title: '下载失败',
          message: res.msg,
          type: 'error'
        })
        downloadButton.value.changeLoading(false)
      }
    })
    .catch((err: Error) => {
      downloadButton.value.changeLoading(false)
      throw err
    })
}

// 监听新增/编辑弹窗
const closeModel = ({ visible, type }: { visible: boolean; type: string }) => {
  state.editModelVisible = visible
  if (type === 'update-close') {
    // 是否需要返回第一页
    // formModel.value.pageNo = 1
    getListData()
  }
  state.detailData = {
    mortgageSubjectAllName: '',
    mortgageSubjectName: '',
    mortgageSubjectType: '',
    organizationCode: '',
    registeredAddress: '',
    contractSubject: [],
    capitalInfo: []
  }
}

// 表格数据选择
const selectData = (selection: MortgageSubjectListResponse[]) => {
  const result: string[] = []
  if (selection.length !== 0) {
    selection.forEach((i: MortgageSubjectListResponse) => {
      result.push(`${i.id}`)
    })
  }
  state.selectIdsArr = result
}

// 表格数据操作
const actionTableItem = async (
  row: MortgageSubjectListResponse,
  value: string | number
) => {
  if (value === 'edit') {
    const res = await API.getMortgageSubjectDetail({ id: row.id })
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
        API.getMortgageSubjectDelete({
          ids: [row.id]
        }).then((res) => {
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

// 切换地区
const changeAreaData = ({
  provinceCode,
  provinceName,
  cityCode,
  cityName
}: {
  provinceCode: string
  provinceName: string
  cityCode: string
  cityName: string
}) => {
  console.log(provinceCode, provinceName, cityCode, cityName)
  formModel.value.provinces = provinceCode.split(',')
  formModel.value.cities = cityCode.split(',')
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
  .list {
    margin-bottom: 20px;
  }
}
</style>
