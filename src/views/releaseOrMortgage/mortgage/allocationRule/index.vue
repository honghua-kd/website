<template>
  <div class="channel-container">
    <!-- filter -->
    <div class="channel-search-container" :ref="searchBoxRef">
      <el-form
        :inline="true"
        :model="queryParams"
        class="filter-form"
        :label-width="px2rem('110px')"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="来源系统" style="width: 100%">
              <el-cascader
                :options="sourceArr"
                collapse-tags
                collapse-tags-tooltip
                clearable
                placeholder="请选择"
                @change="selectSourceSystem"
                v-model="queryParams.sourceSystem"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="规则名称" style="width: 100%">
              <el-input
                placeholder="请输入"
                v-model="queryParams.allocationRuleName"
                clearable
                :maxlength="50"
              /> </el-form-item
          ></el-col>
          <el-col :span="6">
            <el-form-item label="任务类型" style="width: 100%">
              <el-select
                v-model="queryParams.taskType"
                style="width: 100%"
                placeholder=""
                clearable
              >
                <el-option
                  v-for="item in taskTypeOpts"
                  :key="(item.value as string)"
                  :label="(item.label as string)"
                  :value="(item.value as string)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="省市" style="width: 100%">
              <el-cascader
                v-model="selCity"
                clearable
                :props="props"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="规则状态" style="width: 100%">
              <el-select
                v-model="queryParams.isUsed"
                style="width: 100%"
                placeholder=""
                clearable
              >
                <el-option
                  v-for="item in isUsedOpts"
                  :key="(item.value as string)"
                  :label="(item.label as string)"
                  :value="(item.value as string)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="18" class="btn-row">
            <el-form-item>
              <el-button :icon="Search" type="primary" @click="searchHandler"
                >查询</el-button
              >
              <el-button :icon="Refresh" @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
      <template #btnsBox>
        <el-row :gutter="8" style="margin: 10px 0">
          <el-col :span="1.5">
            <el-button type="primary" @click="addHandler" :icon="Plus">
              新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" @click="importHandler" :icon="Upload">
              批量导入
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              @click="downloadTemplate"
              :icon="Download"
            >
              下载导入模版
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" :icon="Upload" @click="downloadHandler">
              下载
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="primary"
              :icon="Delete"
              @click="delHandler(selectIds)"
            >
              删除
            </el-button>
          </el-col>
        </el-row>
      </template>
      <template #default="{ row, prop }">
        <span v-if="prop === 'taskType'">
          {{ getTaskType(row[prop]) }}
        </span>
        <span v-if="prop === 'allocationType'">
          {{ getAllocationType(row[prop]) }}
        </span>
        <span v-if="prop === 'sourceSystem2'">
          {{ getSourceSystem(row[prop]) }}
        </span>
        <span v-if="prop === 'isAutoAllocation' || prop === 'isSendSms'">
          {{ row[prop] === 0 ? '否' : '是' }}
        </span>
        <span v-if="prop === 'isUsed'">
          <el-switch
            v-model="row[prop]"
            :active-value="1"
            :inactive-value="0"
            @click="changeStatus(row)"
          />
        </span>
      </template>
      <template #action="scope">
        <el-button link type="primary" @click="editHandler(scope.row)">
          编辑
        </el-button>
        <el-button
          link
          type="danger"
          @click="delHandler([scope.row.allocationRuleCode])"
        >
          删除
        </el-button>
      </template>
    </Table>
    <OperDialog
      ref="operRef"
      :formValue="formValue"
      :title="formTitle"
      @closeModel="closeModel"
      :visible="openVisible"
      @success="getList"
    />
    <ImportForm ref="importFormRef" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, Ref, computed, watch } from 'vue'
import OperDialog from './components/operDialog.vue'
import { RuleAPI, CommonAPI } from '@/api'
import { tableConfig } from './data'
import Table from '@/components/Table/index.vue'
import ImportForm from './ImportForm.vue'
import { px2rem, handleDownloadFile } from '@/utils'
import type { CascaderValue, CascaderOption, CascaderProps } from 'element-plus'
import fileDownload from 'js-file-download'
import dayjs from 'dayjs'
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  Refresh,
  Search,
  Plus,
  Delete,
  Download,
  Upload
} from '@element-plus/icons-vue'
const CommonApi = new CommonAPI()
const RuleApi = new RuleAPI()
import { useDictStore } from '@/store/dict'
import type {
  RuleListRequest,
  PageRequest,
  RuleItemResponse,
  DictDataTreeResponse,
  DictItem
} from '@/api'
type QueryParams = RuleListRequest & PageRequest
interface ExtraParam {
  sourceSystem?: string[]
}
const queryParams = reactive<QueryParams & ExtraParam>({
  allocationRuleName: '',
  taskType: '',
  isUsed: '',
  sourceSystem1: '',
  sourceSystem2: '',
  provinceCode: '',
  cityCode: '',
  pageNo: 1,
  pageSize: 10,
  sourceSystem: []
})
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const tableLoading: Ref<boolean> = ref(false)
const tableData = reactive<RuleItemResponse[]>([])
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
const selectData: Ref<RuleItemResponse[]> = ref([])
// 选择的数据
const selectionChangeHandler = (item: RuleItemResponse[]) => {
  selectData.value.splice(0, selectData.value.length)
  selectData.value.push(...item)
}
const selectIds = computed(() => {
  const ids: string[] = []
  selectData.value.forEach((item) => {
    ids.push(item.allocationRuleCode)
  })
  return ids
})
const searchHandler = () => {
  queryParams.pageNo = 1
  getList()
}
const reset = () => {
  queryParams.pageNo = 1
  queryParams.pageSize = 10
  queryParams.sourceSystem1 = ''
  queryParams.sourceSystem2 = ''
  queryParams.taskType = ''
  queryParams.provinceCode = ''
  queryParams.cityCode = ''
  queryParams.isUsed = ''
  queryParams.allocationRuleName = ''
  selCity.value = []
  queryParams.sourceSystem = []
  getList()
}
const getList = async () => {
  queryParams.provinceCode = selCity.value ? selCity.value[0] : ''
  queryParams.cityCode = selCity.value ? selCity.value[1] : ''
  const params = { ...queryParams }
  delete params.sourceSystem
  RuleApi.getRuleList(params)
    .then((res) => {
      if (res && res.code === 200) {
        tableLoading.value = false
        tableData.splice(0, tableData.length)
        tableData.push(...(res?.data?.list || []))
        pageTotal.value = res?.data?.total || 0
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
const operRef = ref()
let formValue = reactive({})
const formTitle = ref('')
const openVisible = ref(false)
const addHandler = () => {
  formValue = {}
  formTitle.value = '新增任务分配规则'
  openVisible.value = true
}
const editHandler = (val: RuleItemResponse) => {
  formTitle.value = '编辑任务分配规则'
  formValue = val
  openVisible.value = true
}
const closeModel = () => {
  openVisible.value = false
}
const importFormRef = ref()
const importHandler = () => {
  importFormRef.value.open()
}
// 下载模板
const downloadTemplate = () => {
  const params = {
    bizType: 'MORTGAGE_TEMPLATE_ALLOCATION_RULE'
  }
  CommonApi.getDownLoadTemplate(params)
    .then((res) => {
      handleDownloadFile(res)
    })
    .catch((err: Error) => {
      throw err
    })
}
const delHandler = (ids: string[]) => {
  if (!ids.length) {
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
      const params = {
        allocationRuleCodes: ids
      }
      RuleApi.delRule(params).then((res) => {
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
const downloadHandler = () => {
  const ids = selectIds.value.map((item) => String(item))
  let param
  if (selectIds.value.length) {
    param = JSON.stringify({
      ids: ids,
      ...queryParams
    })
  } else {
    param = JSON.stringify({
      ...queryParams
    })
  }
  const params = {
    selectParams: param,
    bizType: 'MORTGAGE_ALLOCATION_RULE_TEMPLATE_EXPORT'
  }
  CommonApi.exportBySelect(params)
    .then((res) => {
      if (res && res.code === 200) {
        if (res?.data?.sync === 1) {
          const params = {
            fileCode: res?.data?.fileCode as string
          }
          CommonApi.downLoadFiles(params)
            .then((res) => {
              const fileStream = res?.data
              const fileName = `分配规则${dayjs().format('YYYYMMDD')}.xlsx`
              fileDownload(fileStream, fileName)
              ElMessage({
                type: 'success',
                message: '操作成功'
              })
            })
            .catch((err: Error) => {
              tableLoading.value = false
              throw err
            })
        } else if (res?.data?.sync === 0) {
          ElMessage({
            type: 'success',
            message: '导出任务已经产生，前面有任务待处理，请至我的下载中查看'
          })
        }
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
const changeStatus = (value: RuleItemResponse) => {
  const { allocationRuleCode, isUsed } = value
  const params = {
    allocationRuleCode,
    isUsed
  }
  RuleApi.onOffRule(params)
    .then((res) => {
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '更新成功'
        })
        getList()
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
const sourceArr = ref<CascaderOption[]>([])
const getDictsListData = async () => {
  const params = {
    dictType: 'SOURCE_SYSTEM'
  }
  const res = await CommonApi.getDictTreeList(params)
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
      sourceArr.value = result
    }
  }
}
const selectSourceSystem = (value: CascaderValue) => {
  value = value as string[]
  if (value) {
    queryParams.sourceSystem1 = value[0].toString()
    queryParams.sourceSystem2 = value[1].toString()
  }
}
const selCity = ref([])
const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const nodes: CascaderOption[] = [] // 动态节点
    const { level } = node
    if (level === 0) {
      const resParent = await CommonApi.getAllProvince()
      if (resParent && resParent?.data) {
        resParent?.data.map((item) => {
          const area = {
            value: item.code,
            label: item.name,
            leaf: level >= 1
          }
          nodes.push(area)
        })
      }
    } else {
      const params = {
        code: node.value as number
      }
      const res = await CommonApi.getProvinceChildren(params)
      if (res && res.data) {
        res?.data.map((item) => {
          const area = {
            value: item.code,
            label: item.name,
            leaf: level >= 1
          }
          nodes.push(area)
        })
      }
    }
    resolve(nodes) // 回调
  }
}
const dictStore = useDictStore()
const taskTypeOpts: Ref<DictItem[]> = ref([])
const allocatonTypeOpts: Ref<DictItem[]> = ref([])
const isUsedOpts: Ref<DictItem[]> = ref([])
const getDicts = () => {
  taskTypeOpts.value = dictStore.dicts.MORTGAGE_TASK_TYPE
  allocatonTypeOpts.value = dictStore.dicts.MORTGAGE_ALLOCATION_TYPE
  isUsedOpts.value = dictStore.dicts.ENABLE_DISABLE_STATUS
}
const getTaskType = (val: string) => {
  const option = taskTypeOpts.value.find((o) => o.value === val) as DictItem
  if (option) {
    return option.label
  } else {
    return ''
  }
}
const getAllocationType = (val: string) => {
  const option = allocatonTypeOpts.value.find(
    (o) => o.value === val
  ) as DictItem
  if (option) {
    return option.label
  } else {
    return ''
  }
}
const getSourceSystem = (val: string) => {
  let label = ''
  sourceArr.value.forEach((option) => {
    option.children?.forEach((item) => {
      if (val === item.value) {
        label = item.label as string
      }
    })
  })
  return label
}
watch(
  () => queryParams.sourceSystem,
  (val) => {
    if (!val) {
      queryParams.sourceSystem1 = ''
      queryParams.sourceSystem2 = ''
    }
  }
)
onMounted(() => {
  getList()
  getDictsListData()
  getDicts()
})
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
