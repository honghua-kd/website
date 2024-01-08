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
            ><el-form-item label="抵押主体名称" style="width: 100%">
              <el-input
                v-model="formModel.mortgageSubjectName"
              /> </el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item label="城市" style="width: 100%">
              <AreaCasder
                style="width: 100%"
                :multiple="true"
                :value="areaCode"
                @changeAreaData="changeAreaData"
              /> </el-form-item
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
            <el-button
              :icon="Download"
              type="primary"
              @click="action('Download')"
              >下载</el-button
            >
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
            :width="px2rem('40px')"
            :selectable="() => true"
            :fixed="true"
            align="center"
          />
        </template>
        <template #action="scope">
          <el-button
            v-for="item in tableActionList"
            :key="item.value"
            link
            :type="item.value === 'delete' ? 'danger' : 'primary'"
            @click="actionTableItem(scope, item.value)"
            >{{ item.label }}</el-button
          >
        </template></Table
      >
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
import BasicData from '@/views/mortgage/mainPart/data'
import EditModel from '@/views/mortgage/mainPart/editModel.vue'
import type { StateType } from '@/views/mortgage/mainPart/type'
import type { MortgageSubjectListResponse } from '@/api/mainPart/types/response'
import {
  Refresh,
  Search,
  Plus,
  Delete,
  Download
} from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { px2rem } from '@/utils'
import Table from '@/components/Table/index.vue'
import { MainPartAPI } from '@/api'
import AreaCasder from '@/components/AreaCascader/index.vue'

const API = new MainPartAPI()
const state = reactive<StateType>({
  formModel: {
    mortgageSubjectName: '',
    contactAddressProvinceCode: '',
    contactAddressCityCode: '',
    pageNo: 1,
    pageSize: 10
  },
  tableLoading: false,
  tableColumn: [
    {
      label: '抵押主体名称',
      prop: '',
      minWidth: 120,
      align: 'left',
      forbiddenEdit: true
    },
    {
      label: '全称',
      prop: '',
      minWidth: 120,
      align: 'left'
    },
    {
      label: '组织机构代码',
      prop: '',
      width: 120,
      align: 'center'
    },
    {
      label: '省',
      prop: '',
      width: 120,
      align: 'left'
    },
    {
      label: '市',
      prop: '',
      width: 120,
      align: 'left'
    },
    {
      label: '详细地址',
      prop: '',
      minWidth: 120,
      align: 'left'
    },
    {
      label: '注册地址',
      prop: '',
      minWidth: 120,
      align: 'left'
    },
    {
      label: '联系人',
      prop: '',
      minWidth: 120,
      align: 'left'
    },
    {
      label: '联系电话',
      prop: '',
      width: 100,
      align: 'center'
    },
    {
      label: '创建人',
      prop: '',
      minWidth: 100,
      fixed: false,
      align: 'left'
    },
    {
      label: '创建时间',
      prop: '',
      minWidth: 130,
      align: 'center'
    },
    {
      label: '最后更新人',
      prop: '',
      minWidth: 100,
      align: 'left'
    },
    {
      label: '更新时间',
      prop: '',
      minWidth: 130,
      align: 'center'
    },
    {
      type: 'action',
      label: '操作',
      prop: '',
      width: 120,
      fixed: 'right',
      align: 'center'
    }
  ],
  tableData: [],
  tableActionList: BasicData.tableActionList,
  pageTotal: 100,
  editModelVisible: false,
  editModelTitle: '',
  selectIdsArr: [],
  detailData: {
    /**
     * 资方信息
     */
    capitalInfo: '',
    /**
     * 联系地址-城市code
     */
    contactAddressCityCode: '',
    /**
     * 联系地址-城市名称
     */
    contactAddressCityName: '',
    /**
     * 联系地址-详细地址
     */
    contactAddressDetail: '',
    /**
     * 联系地址-省份code
     */
    contactAddressProvinceCode: '',
    /**
     * 联系地址-省份名称
     */
    contactAddressProvinceName: '',
    /**
     * 联系人
     */
    contactName: '',
    /**
     * 联系电话
     */
    contactPhone: '',
    /**
     * 合同主体
     */
    contractSubject: '',
    /**
     * 创建时间
     */
    createTime: '',
    /**
     * 创建者
     */
    creatorName: '',
    /**
     * 抵押主体全称
     */
    mortgageSubjectAllName: '',
    /**
     * 抵押主体唯一Code
     */
    mortgageSubjectCode: '',
    /**
     * 抵押主体名称
     */
    mortgageSubjectName: '',
    /**
     * 抵押主体类型
     */
    mortgageSubjectType: '',
    /**
     * 组织机构代码
     */
    organizationCode: '',
    /**
     * 注册地址
     */
    registeredAddress: '',
    /**
     * 更新者
     */
    updaterName: '',
    /**
     * 更新时间
     */
    updateTime: ''
  },
  areaCode: []
})
const {
  formModel,
  tableLoading,
  tableColumn,
  tableData,
  tableActionList,
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

const getListData = async () => {
  state.tableLoading = true
  const res = await API.getMortgageSubjectList(formModel.value)
  state.tableLoading = false
  if (res && res.code === 200) {
    state.tableData = res.data ? res.data.list : []
    state.pageTotal = res.data && res.data.total ? res.data.total : 0
  }
}

const search = () => {
  formModel.value.pageNo = 1
  getListData()
}
const refresh = () => {
  state.areaCode = []
  formModel.value.mortgageSubjectName = ''
  formModel.value.contactAddressProvinceCode = ''
  formModel.value.contactAddressCityCode = ''
  formModel.value.pageNo = 1
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
  } else if (val === 'Download') {
    downloadData()
  }
}
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
      console.log(selectIdsArr.value)
    })
    .catch((err: Error) => {
      throw err
    })
}
const downloadData = async () => {
  state.tableLoading = true
  const params = {}
  // if (selectIdsArr.value.length === 0) {
  // } else {
  // }
  // 调用下载接口
  console.log(params)
  state.tableLoading = false
}
const closeModel = ({ visible, type }: { visible: boolean; type: string }) => {
  console.log(visible, type)
  state.editModelVisible = visible
}

const selectData = (selection: MortgageSubjectListResponse[]) => {
  const result: string[] = []
  if (selection.length !== 0) {
    selection.forEach((i: MortgageSubjectListResponse) => {
      result.push(`${i.mortgageSubjectCode}`)
    })
  }
  state.selectIdsArr = result
}

const actionTableItem = async (
  row: { row: MortgageSubjectListResponse },
  value: string | number
) => {
  const rowData = row.row
  // if (value === 'edit') {
  //   const res = await API.getAgencyDetail({ id: rowData.id })
  //   if (res && res.code === 200) {
  //     if (res.data) {
  //       state.detailData = res.data
  //     }
  //     state.editModelTitle = '编辑'
  //     state.editModelVisible = true
  //   }
  // }
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
          mortgageSubjectCode: rowData.mortgageSubjectCode
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
  formModel.value.contactAddressProvinceCode = provinceCode
  formModel.value.contactAddressCityCode = cityCode
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
}
</style>
