<template>
  <div class="channel-container">
    <!-- filter -->
    <div :ref="searchBoxRef">
      <SearchBar
        v-model="formModel"
        :searchConfig="searchConfig"
        :labelWidth="'110px'"
        @reset="reset"
        @search="searchHandler"
      >
        <template #sourceSystem>
          <el-cascader
            v-model="formModel.sourceSystem12List"
            :options="sourceArr"
            :props="{ multiple: true }"
            clearable
            placeholder="请选择"
            style="width: 100%"
            @change="selectSourceSystem"
          />
        </template>
        <template #area>
          <AreaCascader
            :value="formModel.areaCodeparams"
            :multiple="true"
            @changeAreaData="changeAreaData"
          />
        </template>
      </SearchBar>
    </div>
    <el-divider border-style="dashed" />
    <!-- action -->

    <!-- list -->
    <div class="list">
      <Table
        :loading="tableLoading"
        :data="tableData"
        :columnConfig="tableColumn"
        :height="tableHeight"
        row-key="id"
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
            <el-button
              :icon="Plus"
              type="primary"
              @click="action('BatchImport')"
              >批量导入</el-button
            >
            <Button
              ref="downTemButton"
              :icon="Download"
              name="下载导入模版"
              @onButtonFn="action('DownloadTemplate')"
            />
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
        <template #default="{ row, prop }">
          <span v-if="prop === 'sourceSystem2'">{{
            getDictLabel(row.sourceSystem1, row.sourceSystem2)
          }}</span></template
        >
        <template #action="scope">
          <el-button link type="primary" @click="actionTableItem(scope, 'edit')"
            >编辑</el-button
          >
          <el-button
            link
            type="danger"
            @click="actionTableItem(scope, 'delete')"
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
      :sourceArr="sourceArr"
      @closeModel="closeModel"
    />
    <!-- 导入 -->
    <el-dialog
      class="import-model"
      v-model="importVisible"
      title="批量导入"
      width="550px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
    >
      <el-upload
        ref="upload"
        v-model:file-list="fileList"
        class="upload-demo"
        accept=".xlsx"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
      >
        <template #trigger>
          <el-button>选择文件</el-button>
          <el-text class="mx-1" type="danger">请上传 .xlsx格式文件</el-text>
        </template>
      </el-upload>
      <template #footer>
        <Button ref="importButton" name="导 入" @onButtonFn="submitUpload" />
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, computed, onMounted } from 'vue'
import { searchConfig } from './data'
import EditModel from './editModel.vue'
import type { StateType } from './type'
import type {
  CascaderValue,
  CascaderOption,
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from 'element-plus'
import {
  ElMessageBox,
  ElMessage,
  genFileId,
  ElNotification
} from 'element-plus'
import { Plus, Delete, Download } from '@element-plus/icons-vue'
import type { DictDataTreeResponse } from '@/api/common/types/response'
import type { AgencyAddressListResponse } from '@/api/channel/types/response'
import { handleDownloadFile } from '@/utils'
import { AgencyAPI, CommonAPI, SystemAPI } from '@/api'
import Table from '@/components/Table/index.vue'
import SearchBar from '@/components/SearchBar/index.vue'
const API = new AgencyAPI()
const COMMONAPI = new CommonAPI()
const SYSTEMAPI = new SystemAPI()

type SourceItem = {
  value?: string | null | undefined
  label?: string | null | undefined
  children?: SourceItem[]
}
const importButton = ref()
const downTemButton = ref()
const downloadButton = ref()
const state = reactive<StateType>({
  formModel: {
    agencyCode: '',
    agencyName: '',
    cityCode: '',
    cityName: '',
    pageNo: 1,
    pageSize: 10,
    provinceCode: '',
    provinceName: '',
    sourceSystem12ListParams: [],
    sourceSystem12List: [],
    areaCodeparams: []
  },
  sourceArr: [],
  tableLoading: false,
  tableColumn: [
    {
      label: '来源系统',
      prop: 'sourceSystem2',
      width: '',
      minWidth: '120',
      fixed: false,
      align: 'center'
    },
    {
      label: '渠道商/办事处',
      prop: 'agencyName',
      width: '',
      minWidth: '120',
      fixed: false,
      align: 'left',
      forbiddenEdit: true,
      showOverflowTooltip: true
    },
    {
      label: '省',
      prop: 'provinceName',
      width: '',
      minWidth: '100',
      fixed: false,
      align: 'center'
    },
    {
      label: '市',
      prop: 'cityName',
      width: '',
      minWidth: '100',
      fixed: false,
      align: 'center'
    },
    {
      label: '详细地址',
      prop: 'address',
      width: '',
      minWidth: '170',
      fixed: false,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      label: '联系人',
      prop: 'contact',
      width: '100',
      minWidth: '',
      fixed: false,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      label: '联系电话',
      prop: 'phone',
      width: '100',
      minWidth: '',
      fixed: false,
      align: 'center'
    },
    {
      label: '创建人',
      prop: 'creatorName',
      width: '',
      minWidth: '100',
      fixed: false,
      align: 'center'
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: '140',
      minWidth: '',
      fixed: false,
      align: 'center'
    },
    {
      label: '最后更新人',
      prop: 'updaterName',
      width: '',
      minWidth: '100',
      fixed: false,
      align: 'center'
    },
    {
      label: '更新时间',
      prop: 'updateTime',
      width: '',
      minWidth: '140',
      fixed: false,
      align: 'center'
    },
    {
      type: 'action',
      label: '操作',
      prop: 'action',
      width: '120',
      minWidth: '',
      fixed: 'right',
      align: 'center'
    }
  ],
  tableData: [],
  pageTotal: 100,
  editModelVisible: false,
  editModelTitle: '',
  selectIdsArr: [],
  detailData: {
    id: '',
    agencyName: '',
    sourceSystem1: '',
    sourceSystem2: '',
    cityName: '',
    cityCode: '',
    provinceCode: '',
    provinceName: ''
  },
  importVisible: false
})
const {
  formModel,
  sourceArr,
  tableLoading,
  tableColumn,
  tableData,
  pageTotal,
  editModelVisible,
  editModelTitle,
  selectIdsArr,
  detailData,
  importVisible
} = toRefs(state)

// 表格最大高度
const searchBoxRef = ref()
const tableHeight = computed(() => {
  const baseHeight = Number(document.documentElement.clientHeight - 220)
  if (searchBoxRef.value?.clientHeight) {
    return Number(baseHeight - searchBoxRef.value?.clientHeight)
  } else {
    return baseHeight
  }
})

const getDictLabel = (value1: string, value2: string) => {
  let result = ''
  sourceArr.value.forEach((i: CascaderOption) => {
    if (i.value === value1) {
      i.children?.forEach((j: CascaderOption) => {
        if (value2 === j.value) {
          result = j.label as string
        }
      })
    }
  })
  return result
}
onMounted(() => {
  getDictsListData()
  getListData()
})

const getDictsListData = async () => {
  const params = {
    dictType: 'SOURCE_SYSTEM'
  }
  const res = await COMMONAPI.getDictTreeList(params)
  if (res && res.code === 200) {
    if (res.data) {
      const result: CascaderOption[] = []
      res.data.forEach((i: DictDataTreeResponse) => {
        const obj: CascaderOption = {
          label: i.label as string,
          value: i.value as string,
          children: []
        }
        i.children?.forEach((j: DictDataTreeResponse) => {
          obj.children?.push({
            label: j.label as string,
            value: j.value as string
          })
        })
        result.push(obj)
      })
      state.sourceArr = result
    }
  }
}
const getListData = async () => {
  state.tableLoading = true
  const params = {
    agencyName: formModel.value.agencyName,
    cityCode: formModel.value.cityCode,
    pageNo: formModel.value.pageNo,
    pageSize: formModel.value.pageSize,
    provinceCode: formModel.value.provinceCode,
    sourceSystem12List: formModel.value.sourceSystem12ListParams
  }
  const res = await API.getAgencyAddressList(params)
  state.tableLoading = false
  if (res && res.code === 200) {
    state.tableData = res.data ? res.data.list : []
    state.pageTotal = res.data && res.data.total ? res.data.total : 0
  }
}

const selectSourceSystem = (value: CascaderValue) => {
  const soureSystem2Arr: string[] = []
  const result: SourceItem[] = []
  const valueClone = value as string[][]
  valueClone.forEach((valueItem: string[]) => {
    soureSystem2Arr.push(valueItem[1])
  })
  sourceArr.value.forEach((j: CascaderOption) => {
    const system1: SourceItem = {
      label: j.label as string,
      value: j.value as string,
      children: []
    }
    soureSystem2Arr.forEach((i) => {
      j.children?.forEach((k) => {
        if (k.value === i) {
          system1.children?.push({ label: k.label, value: k.value })
        }
      })
    })
    if (system1.children && system1.children.length > 0) {
      result.push(system1)
    }
  })
  formModel.value.sourceSystem12ListParams = result
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
  formModel.value.provinceCode = provinceCode
  // 多选状态下名称未处理
  // formModel.provinceName = provinceName
  formModel.value.cityCode = cityCode
  // formModel.cityName = cityName
}

const searchHandler = () => {
  formModel.value.pageNo = 1
  getListData()
}
const reset = () => {
  formModel.value.pageNo = 1
  formModel.value.agencyName = ''
  formModel.value.sourceSystem12List = []
  formModel.value.sourceSystem12ListParams = []
  formModel.value.provinceCode = ''
  formModel.value.cityCode = ''
  formModel.value.areaCodeparams = []
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
  } else if (val === 'DownloadTemplate') {
    downloadTemplate()
  } else if (val === 'BatchImport') {
    batchImport()
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
      API.getAgencyAddressDelete({ ids: selectIdsArr.value }).then((res) => {
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
  downloadButton.value.changeLoading(true)
  let params = {}
  if (selectIdsArr.value.length === 0) {
    params = {
      agencyName: formModel.value.agencyName,
      provinceCode: formModel.value.provinceCode,
      cityCode: formModel.value.cityCode,
      sourceSystem12List: formModel.value.sourceSystem12ListParams
    }
  } else {
    params = { ids: selectIdsArr.value }
  }
  COMMONAPI.exportBySelect({
    bizType: 'AGENCY_ADDRESS_EXPORT',
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

const downloadTemplate = () => {
  downTemButton.value.changeLoading(true)
  const params = {
    businessCategory: 'MORTGAGE_TEMPLATE',
    businessSubcategory: 'AGENCY_ADDRESS_INFO'
  }
  SYSTEMAPI.templateImportResult(params)
    .then((res) => {
      handleDownloadFile(res)
      downTemButton.value.changeLoading(false)
    })
    .catch(() => downTemButton.value.changeLoading(false))
}

const fileList = ref<UploadUserFile[]>([])
const upload = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const submitUpload = () => {
  if (fileList.value.length === 0) {
    ElMessage({
      type: 'error',
      message: '请先选择文件'
    })
    return
  }
  if (fileList.value[0].size === 0) {
    ElMessage({
      type: 'error',
      message: '不允许上传空文件'
    })
    return
  }
  importButton.value.changeLoading(true)
  const formData = new FormData()
  fileList.value.forEach((item) => {
    formData.append('file', item.raw as File)
  })
  formData.append('bizType', 'AGENCY_ADDRESS_INFO')
  COMMONAPI.getAsyncImport(formData)
    .then((res) => {
      importButton.value.changeLoading(false)
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '导入成功'
        })
      }
      upload.value!.clearFiles()
      getListData()
      state.importVisible = false
    })
    .catch((err: Error) => {
      importButton.value.changeLoading(false)
      throw err
    })
}
const batchImport = () => {
  fileList.value = []
  state.importVisible = true
}

const closeModel = ({ visible, type }: { visible: boolean; type: string }) => {
  state.editModelVisible = visible
  if (type === 'update-close') {
    // 是否需要返回第一页
    // formModel.value.pageNo = 1
    getListData()
  }
  state.detailData = {
    id: '',
    agencyName: '',
    sourceSystem1: '',
    sourceSystem2: '',
    provinceName: '',
    provinceCode: '',
    cityName: '',
    cityCode: ''
  }
}

const selectData = (selection: AgencyAddressListResponse[]) => {
  const result: string[] = []
  if (selection.length !== 0) {
    selection.forEach((i: AgencyAddressListResponse) => {
      result.push(`${i.id}`)
    })
  }
  state.selectIdsArr = result
}
const actionTableItem = async (
  row: { row: AgencyAddressListResponse },
  value: string | number
) => {
  const rowData = row.row
  if (value === 'edit') {
    const res = await API.getAgencyAddressDetail({ id: rowData.id })
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
        API.getAgencyAddressDelete({ ids: [rowData.id] }).then((res) => {
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
  .list {
    margin-bottom: 20px;
  }
}
</style>
