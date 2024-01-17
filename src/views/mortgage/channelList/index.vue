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
            collapse-tags
            collapse-tags-tooltip
            clearable
            placeholder="请选择"
            style="width: 100%"
            @change="selectSourceSystem"
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
          <!-- action -->
          <div class="action">
            <el-button
              :icon="Plus"
              type="primary"
              @click="action('BatchImport')"
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
            :width="40"
            :selectable="() => true"
            :fixed="true"
            align="center"
          />
        </template>
        <template #default="{ row, prop }">
          <span v-if="prop === 'sourceSystem2'">{{
            getDictLabel(row.sourceSystem1, row.sourceSystem2)
          }}</span>

          <span v-if="prop === 'createGatherFlag'"
            ><el-switch
              :value="row.createGatherFlag"
              :active-value="1"
              :inactive-value="0"
              @click="changeSwitch(row, 'createGatherFlag')"
          /></span>
          <span v-if="prop === 'unpaidNeedApproveFlag'"
            ><el-switch
              :value="row.unpaidNeedApproveFlag"
              :active-value="1"
              :inactive-value="0"
              @click="changeSwitch(row, 'unpaidNeedApproveFlag')"
          /></span>
        </template>
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
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
      >
        <template #trigger>
          <el-button>选择文件</el-button>
        </template>
      </el-upload>
      <template #footer>
        <el-button type="primary" @click="submitUpload">导入</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref, computed, onMounted } from 'vue'
import { searchConfig } from './data'
import EditModel from '@/views/mortgage/channelList/editModel.vue'
import type { StateType } from '@/views/mortgage/channelList/type'
import type { AgencyListResponse } from '@/api/channel/types/response'
import type { DictDataTreeResponse } from '@/api/common/types/response'
import { Plus, Delete, Download } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage, genFileId } from 'element-plus'
import { handleDownloadFile } from '@/utils'
import { AgencyAPI, CommonAPI } from '@/api'
import type {
  CascaderValue,
  CascaderOption,
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from 'element-plus'
import Table from '@/components/Table/index.vue'
import SearchBar from '@/components/SearchBar/index.vue'

const API = new AgencyAPI()
const COMMONAPI = new CommonAPI()

type SourceItem = {
  value?: string | null | undefined
  label?: string | null | undefined
  children?: SourceItem[]
}
const state = reactive<StateType>({
  formModel: {
    agencyName: '',
    // sourceSystem1: '',
    sourceSystem12List: [],
    pageNo: 1,
    pageSize: 10,
    sourceSystem12ListParams: []
  },
  sourceArr: [],
  tableLoading: false,
  tableColumn: [
    {
      label: '来源系统',
      prop: 'sourceSystem2',
      minWidth: 120,
      fixed: false,
      align: 'center'
    },
    {
      label: '渠道商/办事处',
      prop: 'agencyName',
      minWidth: 120,
      fixed: false,
      align: 'left',
      forbiddenEdit: true,
      showOverflowTooltip: true
    },
    {
      label: '是否生成代收款项清单',
      prop: 'createGatherFlag',
      minWidth: 170,
      fixed: false,
      align: 'center'
    },
    {
      label: '未收费办理是否需审批',
      prop: 'unpaidNeedApproveFlag',
      minWidth: 170,
      fixed: false,
      align: 'center'
    },
    {
      label: '创建人',
      prop: 'creatorName',
      minWidth: 100,
      fixed: false,
      align: 'center'
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: 140,
      fixed: false,
      align: 'center'
    },
    {
      label: '最后更新人',
      prop: 'updaterName',
      minWidth: 100,
      fixed: false,
      align: 'center'
    },
    {
      label: '更新时间',
      prop: 'updateTime',
      minWidth: 140,
      fixed: false,
      align: 'center'
    },
    {
      type: 'action',
      label: '操作',
      prop: 'action',
      width: 120,
      fixed: 'right',
      align: 'center'
    }
  ],
  tableData: [],
  pageTotal: 0,
  editModelVisible: false,
  editModelTitle: '',
  selectIdsArr: [],
  detailData: {
    sourceSystem1: '',
    sourceSystem2: ''
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
    if (res.data && res.data.length) {
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
    pageNo: formModel.value.pageNo,
    pageSize: formModel.value.pageSize,
    sourceSystem12List: formModel.value.sourceSystem12ListParams
  }
  const res = await API.getAgencyList(params)
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
  valueClone?.forEach((valueItem: string[]) => {
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

const searchHandler = () => {
  formModel.value.pageNo = 1
  getListData()
}

const reset = () => {
  formModel.value.pageNo = 1
  formModel.value.agencyName = ''
  formModel.value.sourceSystem12List = []
  formModel.value.sourceSystem12ListParams = []
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

const downloadData = async () => {
  state.tableLoading = true
  let params = {}
  if (selectIdsArr.value.length === 0) {
    params = {
      agencyName: formModel.value.agencyName,
      sourceSystem12List: formModel.value.sourceSystem12ListParams
    }
  } else {
    params = { ids: selectIdsArr.value }
  }
  const res = await COMMONAPI.exportBySelect({
    bizType: 'AGENCY_CONFIG_EXPORT',
    selectParams: JSON.stringify(params)
  })
  if (res && res.code === 200) {
    if (res.data?.sync === 1) {
      const params = { fileCode: res.data.fileCode as string }
      COMMONAPI.downLoadFiles(params).then((res) =>
        handleDownloadFile(res, '渠道商/办事处名单.xlsx')
      )
    }
  }
  state.tableLoading = false
}

const downloadTemplate = () => {
  state.tableLoading = true
  const params = {
    bizType: 'AGENCY_CONFIG'
  }
  COMMONAPI.getDownLoadTemplate(params).then((res) => {
    handleDownloadFile(res)
    state.tableLoading = false
  })
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
  const formData = new FormData()
  fileList.value.forEach((item) => {
    formData.append('file', item.raw as File)
  })
  formData.append('bizType', 'AGENCY_CONFIG')
  COMMONAPI.getAsyncImport(formData)
    .then((res) => {
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
  state.detailData = { sourceSystem1: '', sourceSystem2: '' }
}

const selectData = (selection: AgencyListResponse[]) => {
  const result: string[] = []
  if (selection.length !== 0) {
    selection.forEach((i: AgencyListResponse) => {
      result.push(`${i.id}`)
    })
  }
  state.selectIdsArr = result
}

const actionTableItem = async (
  row: { row: AgencyListResponse },
  value: string | number
) => {
  const rowData = row.row
  if (value === 'edit') {
    const res = await API.getAgencyDetail({ id: rowData.id })
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

const changeSwitch = async (row: AgencyListResponse, type: string) => {
  const params = {
    id: row.id,
    sourceSystem1: row.sourceSystem1,
    sourceSystem2: row.sourceSystem2,
    agencyName: row.agencyName,
    createGatherFlag:
      type === 'createGatherFlag'
        ? row.createGatherFlag === 0
          ? 1
          : 0
        : row.createGatherFlag,
    unpaidNeedApproveFlag:
      type === 'unpaidNeedApproveFlag'
        ? row.unpaidNeedApproveFlag === 0
          ? 1
          : 0
        : row.unpaidNeedApproveFlag
  }
  try {
    await API.getAgencyEdit(params)
    getListData()
  } catch {
    getListData()
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
}
</style>
