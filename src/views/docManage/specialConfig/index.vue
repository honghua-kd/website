<template>
  <div>
    <!-- 搜索工作栏 -->
    <div class="scan-search-container" ref="searchBoxRef">
      <SearchBar
        v-model="queryParams"
        :dictArray="dictTypes"
        :searchConfig="searchConfig"
        :showExpand="false"
        @reset="reset"
        @search="searchHandler"
        :labelWidth="'120px'"
        :is-search-btn="true"
      >
      </SearchBar>
    </div>
    <el-divider border-style="dashed" />
    <Table
      :data="tableData"
      :loading="tableLoading"
      :columnConfig="tableConfig"
      :isSelected="true"
      :page-total="pageTotal"
      :setColumnEnable="true"
      :height="tableHeight"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @selection-change="selectionChangeHandler"
      @size-change="getList"
      @current-change="getList"
    >
      <!-- 批量操作 -->
      <template #btnsBox>
        <el-button type="primary" :icon="Plus" @click="addHandler">
          新增
        </el-button>
      </template>
      <template #column-switch="{ row, prop }">
        <el-switch
          v-model="row[prop]"
          @click="switchHandler(row.batchNo, row[prop])"
          :active-value="1"
          :inactive-value="0"
        />
      </template>
      <template #default="{ row, prop }">
        <span v-if="prop === 'replaceDocumentType'">{{
          getLabel('SYSTEM_DOCUMENT_TYPE', row.replaceDocumentType)
        }}</span>
        <span v-if="prop === 'originalDocumentType'">{{
          getLabel('SYSTEM_DOCUMENT_TYPE', row.originalDocumentType)
        }}</span>
      </template>

      <template #action="scope">
        <el-button link type="primary" @click="editHandler(scope.row.batchNo)">
          编辑
        </el-button>
        <el-button link type="danger" @click="delHandler(scope.row.batchNo)">
          删除
        </el-button>
      </template>
    </Table>
    <EditDialog
      @triggerChildMethod="triggerChildMethod"
      @closeEditDialog="closeEditDialog"
      :title="dialogTitle"
      v-model="dialogVisible"
      :dialog-content-config="dialogContentConfig"
      :dictTypes="dictTypes"
    >
      <template #default>
        <el-form
          ref="formRef"
          :model="dialogQueryParams"
          :label-width="px2rem('80px')"
          :rules="editFormRules"
        >
          <el-form-item label="来源系统" prop="systemContractStatus">
            <el-cascader
              style="width: 550px"
              check-strictly
              :props="props"
              collapse-tags
              clearable
              collapse-tags-tooltip
              v-model="dialogQueryParams.systemContractStatus"
              :options="systemContractStatusOptions"
            />
          </el-form-item>
          <el-form-item label="原始文书" prop="originalDocument">
            <el-select
              v-model="dialogQueryParams.originalDocumentNofirst"
              class="m-2"
              placeholder="请选择"
              style="margin-right: 5px; width: 180px"
              @change="changeOriginalDoc($event, 'original')"
            >
              <el-option
                v-for="item in originalDocumentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-model="dialogQueryParams.originalDocumentNoSecond"
              class="m-2"
              placeholder="请选择"
              style="margin-right: 5px; width: 180px"
              @change="changeOriginalDocSecond($event, 'original')"
            >
              <el-option
                v-for="item in originalDocumentSecondOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-model="dialogQueryParams.originalDocumentNoThree"
              multiple
              class="m-2"
              placeholder="请选择"
              style="width: 180px"
            >
              <el-option
                v-for="item in originalDocumentThreeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="替换文书" prop="replaceDocument">
            <el-select
              v-model="dialogQueryParams.replaceDocumentNofirst"
              class="m-2"
              placeholder="请选择"
              style="margin-right: 5px; width: 180px"
              @change="changeOriginalDoc($event, 'replace')"
            >
              <el-option
                v-for="item in replaceDocumentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-model="dialogQueryParams.replaceDocumentNoSecond"
              class="m-2"
              placeholder="请选择"
              style="margin-right: 5px; width: 180px"
              @change="changeOriginalDocSecond($event, 'replace')"
            >
              <el-option
                v-for="item in replaceDocumentSecondOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-model="dialogQueryParams.replaceDocumentNoThree"
              class="m-2"
              placeholder="请选择"
              style="width: 180px"
            >
              <el-option
                v-for="item in replaceDocumentThreeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </EditDialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref, computed, nextTick } from 'vue'
import SearchBar from '@/components/SearchBar/index.vue'
import EditDialog from '@/components/EditDialog/index.vue'
import { searchConfig, tableConfig, dialogContentConfig } from './data'
import { Plus } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage, ElForm, ElFormItem } from 'element-plus'
import type { CascaderValue, CascaderProps } from 'element-plus'
import { SpecialConfigAPI, SystemAPI } from '@/api'
import type {
  SpecialListItem,
  SpecialListRequest,
  EditRequest,
  DictListRequest,
  childrenRequest
} from '@/api'
import { px2rem } from '@/utils'
import { useDictStore } from '@/store/dict'

const API = new SpecialConfigAPI()
const queryParams = reactive<SpecialListRequest>({
  pageNo: 1,
  pageSize: 10
})
const dialogQueryParams = reactive<EditRequest>({
  batchNo: '',
  originalDocumentNo: [],
  replaceDocumentNo: [],
  systemContractStatus: [[]],
  originalDocumentNofirst: '',
  originalDocumentNoSecond: '',
  originalDocumentNoThree: [],
  replaceDocumentNofirst: '',
  replaceDocumentNoSecond: '',
  replaceDocumentNoThree: ''
})

const dictTypes = ['SYSTEM_DOCUMENT_TYPE']
const tableData = reactive<SpecialListItem[]>([])
const tableLoading = ref<boolean>(false)
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const dictStore = useDictStore()

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

// 选择的数据
const selectData = reactive<SpecialListItem[]>([])
const selectionChangeHandler = (item: SpecialListItem[]) => {
  selectData.splice(0, selectData.length)
  selectData.push(...item)
}

// 重置
const reset = () => {
  queryParams.pageNo = 1
  queryParams.pageSize = 10
  queryParams.replaceDocumentType = ''
  queryParams.originalDocumentType = ''
  getList()
}

// 查询
const searchHandler = () => {
  queryParams.pageNo = 1
  getList()
}

// 获取列表
const getList = () => {
  const params = {
    ...queryParams
  }
  API.getSpecialList(params).then((res) => {
    if (res && res.code === 200) {
      tableData.splice(0, tableData.length)
      tableData.push(...(res?.data?.list || []))
      pageTotal.value = res?.data?.total || 0
    }
  })
}
type OptionType = {
  label: string
  value: string
}

const systemContractStatusOptions = ref<OptionType[]>([])
const originalDocumentOptions = ref<OptionType[]>([])
const originalDocumentSecondOptions = ref<OptionType[]>([])
const originalDocumentThreeOptions = ref<OptionType[]>([])
const replaceDocumentOptions = ref<OptionType[]>([])
const replaceDocumentSecondOptions = ref<OptionType[]>([])
const replaceDocumentThreeOptions = ref<OptionType[]>([])
const systemAPI = new SystemAPI()
// 新增
const dialogTitle = ref<string>('')
const dialogVisible = ref<boolean>(false)
const formRef = ref<InstanceType<typeof ElForm>>()
const editFormRules = {
  systemContractStatus: [
    { required: true, message: '数据标签不能为空', trigger: 'blur' }
  ],
  originalDocument: [
    { required: true, message: '数据标签不能为空', trigger: 'blur' }
  ],
  replaceDocument: [
    { required: true, message: '数据标签不能为空', trigger: 'blur' }
  ]
}
const props: CascaderProps = {
  expandTrigger: 'hover',
  lazy: true,
  multiple: true,
  async lazyLoad(node, resolve) {
    const { value, root, level } = node
    if (root) {
      const params: DictListRequest = {
        dictType: 'SOURCE_SYSTEM_1',
        status: 1
      }
      const { data } = await systemAPI.getSingleDict(params)
      systemContractStatusOptions.value = data as OptionType[]
      const nodes = data?.map((item) => ({
        value: item.value || '',
        label: item.label || ''
      }))
      resolve(nodes)
    } else if (level === 1) {
      const { code, data } = await changeSystemContract(value)
      if (code === 200 && data) {
        const nodes = data.map((item) => ({
          value: item.value || '',
          label: item.label || ''
        }))
        resolve(nodes)
      }
    } else {
      const params: DictListRequest = {
        dictType: 'CONTRACT_STATUS',
        status: 1
      }
      const { data } = await systemAPI.getSingleDict(params)
      const nodes = data?.map((item) => ({
        value: item.value || '',
        label: item.label || '',
        leaf: level >= 2
      }))
      resolve(nodes)
    }
  }
}

const addHandler = () => {
  dialogVisible.value = true
  dialogTitle.value = '新增文书'
}
// 获取二级来源系统
const changeSystemContract = async (val: CascaderValue) => {
  const params: childrenRequest = {
    dictType: 'SOURCE_SYSTEM',
    parentValue: val + '',
    status: null
  }
  return await systemAPI.getchildrenInfo(params)
}

const getOriginalDocList = async (val: string) => {
  const formData = new FormData()
  formData.append('documentType', val)
  return await API.getOriginalDoc(formData)
}
// 获取二级
const getOReplaceDocList = async (
  documentType: string,
  documentName: string
) => {
  const formData = new FormData()
  formData.append('documentType', documentType)
  formData.append('documentName', documentName)
  return await API.getOReplaceDoc(formData)
}
// 获取一级文书
const getSingleDictList = async () => {
  const params: DictListRequest = {
    dictType: 'SYSTEM_DOCUMENT_TYPE'
  }
  const { data } = await systemAPI.getSingleDict(params)
  const _data = data as OptionType[]
  originalDocumentOptions.value = _data
  replaceDocumentOptions.value = _data
}
getSingleDictList()
// 根据一级文书获取二级文书
const changeOriginalDoc = async (
  val: string,
  type: string,
  isshow?: boolean
) => {
  const { data } = await getOriginalDocList(val)
  const arr = data?.map((i) => ({
    value: i || '',
    label: i || ''
  }))
  if (arr) {
    if (type === 'original') {
      originalDocumentSecondOptions.value = arr
      if (!isshow) {
        dialogQueryParams.originalDocumentNoSecond = ''
        dialogQueryParams.originalDocumentNoThree = []
      }
    } else {
      replaceDocumentSecondOptions.value = arr
      if (!isshow) {
        dialogQueryParams.replaceDocumentNoSecond = ''
        dialogQueryParams.replaceDocumentNoThree = ''
      }
    }
  }
}
// 获取三级文书
const changeOriginalDocSecond = async (
  val: string,
  type: string,
  isshow?: boolean
) => {
  if (type === 'original') {
    const { data } = await getOReplaceDocList(
      dialogQueryParams.originalDocumentNofirst,
      val
    )
    if (data) {
      originalDocumentThreeOptions.value = data?.map((i) => ({
        value: String(i.documentNo || ''),
        label: String(i.documentVersion || '')
      }))
      if (!isshow) {
        dialogQueryParams.originalDocumentNoThree = []
      }
    }
  } else {
    const { data } = await getOReplaceDocList(
      dialogQueryParams.replaceDocumentNofirst,
      val
    )
    if (data) {
      replaceDocumentThreeOptions.value = data?.map((i) => ({
        value: String(i.documentNo || ''),
        label: String(i.documentVersion || '')
      }))
      if (!isshow) {
        dialogQueryParams.replaceDocumentNoThree = ''
      }
    }
  }
}
// 编辑回显
const editHandler = async (id: string) => {
  dialogVisible.value = true
  dialogTitle.value = '编辑文书'
  const formData = new FormData()
  formData.append('batchNo', id)
  const { data } = await API.getSpecialDetail(formData)

  if (data && data.batchNo) {
    dialogQueryParams.batchNo = data.batchNo
  }
  if (data && data.systemContractStatus) {
    dialogQueryParams.systemContractStatus = data.systemContractStatus
  }
  if (data && data.originalDocument) {
    data.originalDocument.forEach((item) => {
      dialogQueryParams.originalDocumentNofirst = item.documentType
      dialogQueryParams.originalDocumentNoSecond = item.documentName
      dialogQueryParams.originalDocumentNoThree.push(item.documentNo)
    })

    nextTick(() => {
      changeOriginalDoc(
        dialogQueryParams.originalDocumentNofirst,
        'original',
        true
      )
      changeOriginalDocSecond(
        dialogQueryParams.originalDocumentNoSecond,
        'original',
        true
      )
    })
  }
  if (data && data.replaceDocument) {
    data.replaceDocument.forEach((item) => {
      dialogQueryParams.replaceDocumentNofirst = item.documentType
      dialogQueryParams.replaceDocumentNoSecond = item.documentName
      dialogQueryParams.replaceDocumentNoThree = item.documentNo
    })
    nextTick(() => {
      changeOriginalDoc(
        dialogQueryParams.replaceDocumentNofirst,
        'replace',
        true
      )
      changeOriginalDocSecond(
        dialogQueryParams.replaceDocumentNoSecond,
        'replace',
        true
      )
    })
  }
}
// 编辑新增保存
const triggerChildMethod = async () => {
  console.log(dialogQueryParams.originalDocumentNoThree)

  if (
    !(
      !isEmpty(dialogQueryParams.systemContractStatus) &&
      dialogQueryParams.replaceDocumentNoThree &&
      dialogQueryParams.originalDocumentNoThree
    )
  )
    return ElMessage({
      type: 'warning',
      message: '请填写完整数据'
    })
  const params = {
    batchNo: dialogQueryParams.batchNo,
    replaceDocumentNo: dialogQueryParams.replaceDocumentNoThree,
    systemContractStatus: dialogQueryParams.systemContractStatus,
    originalDocumentNo: dialogQueryParams.originalDocumentNoThree
  }
  console.log(params)
  await API.saveOrUpdate(params)
  dialogVisible.value = false
  ElMessage({
    type: 'success',
    message: '新增成功'
  })
  getList()
}
// 判断来源系统为空
const isEmpty = (matrix: string[][]) => {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return true
  } else {
    return false
  }
}
// 删除
const delHandler = (batchNo: string) => {
  // 二次确认
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      const formData = new FormData()
      formData.append('batchNo', batchNo)
      API.delDocConfig(formData).then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          getList()
        }
      })
    })
    .catch((err: Error) => {
      throw err
    })
}

// 状态开关
const switchHandler = (batchNo: string, status: string) => {
  const formData = new FormData()
  formData.append('batchNo', batchNo)
  formData.append('status', status)
  API.changeStatus(formData).then((res) => {
    if (res && res.code === 200) {
      getList()
    }
  })
}
// 关闭弹窗
const closeEditDialog = () => {
  dialogQueryParams.batchNo = ''
  dialogQueryParams.originalDocumentNo = []
  dialogQueryParams.replaceDocumentNo = []
  dialogQueryParams.systemContractStatus = [[]]
  dialogQueryParams.originalDocumentNofirst = ''
  dialogQueryParams.originalDocumentNoSecond = ''
  dialogQueryParams.originalDocumentNoThree = []
  dialogQueryParams.replaceDocumentNofirst = ''
  dialogQueryParams.replaceDocumentNoSecond = ''
  dialogQueryParams.replaceDocumentNoThree = ''
}
const getLabel = (source: string, value: string) => {
  let result = ''
  const arr = dictStore.dicts[source]
  arr.forEach((i) => {
    if (i.value === value) {
      result = i.label
    }
  })
  return result
}

const init = () => {
  searchHandler()
}
init()
</script>

<style lang="scss"></style>
