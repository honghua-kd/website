<template>
  <div>
    <el-form :model="queryParams" ref="formRef" class="scan-form">
      <div class="scan-search-bar">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="来源系统:" prop="sourceSystemWeb">
              <el-cascader
                v-model="queryParams.sourceSystemWeb"
                placeholder="请选择"
                clearable
                :options="sourceSystemOptions"
                :props="{
                  label: 'label',
                  value: 'labelValue',
                  multiple: true
                }"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="模板名称:" prop="templateName">
              <el-input
                v-model="queryParams.templateName"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="模板编号:" prop="templateCode">
              <el-input
                v-model="queryParams.templateCode"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务类型:" prop="bizType">
              <el-select
                v-model="queryParams.bizType"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in smsBizType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="search-btn">
        <el-button type="primary" :icon="Search" @click="searchHandler"
          >查询</el-button
        >
        <el-button :icon="Refresh" @click="reset">重置</el-button>
      </div>
    </el-form>
    <el-row :gutter="8" style="margin: 10px 0">
      <el-tooltip content="新增" placement="top-start">
        <el-button type="primary" :icon="Plus" @click="addHandler">
          新增
        </el-button>
      </el-tooltip>
      <el-tooltip content="导入" placement="top-start">
        <el-button :icon="Setting" @click="handleStop"> 停用 </el-button>
      </el-tooltip>
      <el-tooltip content="批量导入" placement="top-start">
        <el-button type="primary" :icon="Download" style="display: none">
          批量导入
        </el-button>
      </el-tooltip>
    </el-row>
    <Table
      :data="tableData"
      :loading="tableLoading"
      :columnConfig="tableConfig"
      :isSelected="true"
      :page-total="pageTotal"
      :setColumnEnable="true"
      row-key="id"
      :tree-props="{ children: 'target' }"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @selection-change="selectionChangeHandler"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #default="{ row, prop }">
        <span v-if="prop === 'sourceSystem1Str'">
          {{ row.sourceSystem1Str + ' ' + row.sourceSystem2Str }}
        </span>
      </template>
      <template #action="scope">
        <div class="opera-context">
          <el-button link type="primary" @click="editHandler(scope.row)">
            修改
          </el-button>
          <el-button link type="primary" @click="deleteHandler(scope.row.id)">
            删除
          </el-button>
          <el-dropdown>
            <span class="el-dropdown-link">
              更多
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-button
                    link
                    type="primary"
                    @click="changeStatus(scope.row.id, 1)"
                  >
                    启用
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button
                    link
                    type="primary"
                    @click="changeStatus(scope.row.id, 0)"
                  >
                    停用
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
    </Table>
    <OperDialog
      ref="operRef"
      @getList="getList"
      :smsBizType="smsBizType"
      :smsTemplteType="smsTemplteType"
      :smsContactorType="smsContactorType"
      :sourceSystemOptions="sourceSystemOptions"
    />
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/Table/index.vue'
import type { ITableConfigProps } from '@/components/Table/type'
import {
  Search,
  Refresh,
  Plus,
  Download,
  Setting,
  ArrowDown
} from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import type { CascaderOption } from 'element-plus'
import OperDialog from '@/views/message/messageTemplate/components/operDialog.vue'
import { reactive, ref, Ref, onMounted } from 'vue'
const tableLoading: Ref<boolean> = ref(false)
import { MessageAPI, CommonAPI } from '@/api'
import type { List } from '@/api/message/types/response.ts'
import type { DictItem } from '@/api'
const CommonApi = new CommonAPI()

const API = new MessageAPI()
const smsBizType: Ref<DictItem[]> = ref([])
const smsTemplteType: Ref<DictItem[]> = ref([])
const smsContactorType: Ref<DictItem[]> = ref([])

onMounted(() => {
  getDicts()
  getList()
})
const sourceSystemOptions = ref<CascaderOption[]>()
const tableConfig: ITableConfigProps[] = [
  {
    label: '来源系统',
    prop: 'sourceSystem1Str',
    width: 160,
    align: 'left',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '模板编号',
    prop: 'templateName',
    width: 200,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '模板名称',
    prop: 'templateContent',
    width: 260,
    align: 'left',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '模板类型',
    prop: 'templateTypeName',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '业务类型',
    prop: 'bizTypeName',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '联系人类型',
    prop: 'contactorTypeName',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '模板状态',
    prop: 'statusName',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '修改时间',
    prop: 'updateTime',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '操作',
    prop: 'action',
    type: 'action',
    width: 170,
    align: 'center',
    fixed: 'right'
  }
]
const getDicts = () => {
  const treeParm = {
    status: 1,
    dictType: 'SOURCE_SYSTEM'
  }
  API.getSystemDictTree(treeParm)
    .then((res) => {
      if (res && res.code === 200 && res.data) {
        const data = res?.data || []
        const result: CascaderOption[] = []
        data.forEach((el) => {
          const obj: CascaderOption = {
            label: el.label as string,
            value: el.value as string,
            labelValue: el.label + '+' + el.value,
            children: []
          }
          el.children?.forEach((j) => {
            obj.children?.push({
              label: j.label as string,
              value: j.value as string,
              labelValue:
                j.label + '+' + j.value + '+' + el.label + '+' + el.value
            })
          })
          result.push(obj)
        })
        sourceSystemOptions.value = result
      }
    })
    .catch((err: Error) => {
      throw err
    })
  const dictTypes = ['SMS_CONTACTOR_TYPE', 'SMS_TEMPLATE_TYPE', 'SMS_BIZ_TYPE']
  const params = {
    dictTypes
  }
  CommonApi.getDictsList(params)
    .then((res) => {
      if (res && res.code === 200) {
        smsBizType.value = res?.data?.SMS_BIZ_TYPE as DictItem[]
        smsTemplteType.value = res?.data?.SMS_TEMPLATE_TYPE as DictItem[]
        smsContactorType.value = res?.data?.SMS_CONTACTOR_TYPE as DictItem[]
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
const tableData = reactive<List[]>([])
const pageTotal: Ref<number> = ref(0) // 列表的总页数

type children = {
  value: string
  label: string
}
type System12List = {
  value: string
  label: string
  children: children[]
}
interface QueryForm {
  pageNo: number
  pageSize: number
  bizType: string
  templateCode: string
  templateName: string
  sourceSystem12List: System12List[]
  sourceSystemWeb?: string[]
}

export interface PageChildren {
  label: string
  value: string
}
/**
 * 系统来源
 */
export interface PageList {
  children: PageChildren[]
  label: string
  value: string
}

const queryParams = reactive<QueryForm>({
  pageNo: 1,
  pageSize: 10,
  bizType: '',
  templateCode: '',
  templateName: '',
  sourceSystem12List: [],
  sourceSystemWeb: []
})
const searchHandler = () => {
  queryParams.pageNo = 1
  getList()
}
const reset = () => {
  queryParams.bizType = ''
  queryParams.templateCode = ''
  queryParams.templateName = ''
  queryParams.sourceSystem12List = []
  queryParams.sourceSystemWeb = []
  getList()
}
const getList = async () => {
  const sysList: PageList[] = []
  queryParams.sourceSystemWeb?.forEach((e) => {
    if (e[0]) {
      const eStr = e[0].split('+')
      const len = sysList.filter((cur) => {
        return cur.value === eStr[1]
      })
      if (len.length === 0) {
        const namevalue = e[0].split('+')
        sysList.push({
          label: namevalue[0],
          value: namevalue[1],
          children: []
        })
      }
    }
  })
  queryParams.sourceSystemWeb?.forEach((e) => {
    if (e[1]) {
      const eStr = e[1].split('+')
      sysList.forEach((el) => {
        if (el.value === eStr[3]) {
          el.children.push({
            label: eStr[0],
            value: eStr[1]
          })
        }
      })
    }
  })
  const parm = { ...queryParams }
  delete parm.sourceSystemWeb
  parm.sourceSystem12List = sysList
  API.getSmsTemplatePage(parm).then((res) => {
    if (res.code === 200 && res.data) {
      tableData.splice(0, tableData.length)
      tableData.push(...(res?.data?.list || []))
      // tableData.value = res.data.list
      pageTotal.value = res.data.total
    }
  })
}
// 分页
const handleCurrentChange = (val: number) => {
  queryParams.pageNo = val
  getList()
}

// 页面条数改变
const handleSizeChange = (val: number) => {
  queryParams.pageSize = val
  getList()
}

const selectData: Ref<List[]> = ref([])
const selectionChangeHandler = (item: List[]) => {
  selectData.value.splice(0, selectData.value.length)
  selectData.value.push(...item)
}
const handleStop = () => {
  if (selectData.value.length === 0) {
    ElMessage({
      type: 'info',
      message: '请勾选数据'
    })
    return
  }
  const ids = selectData.value.map((el) => {
    return el.id
  })
  changeStatus(ids.join(','), 0)
}
const changeStatus = (data: string, type: number) => {
  const parm = {
    id: data,
    status: type
  }
  API.updateChangeStatus(parm).then((res) => {
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '操作成功'
      })
      getList()
    } else {
      ElMessage({
        type: 'error',
        message: '操作失败'
      })
    }
  })
}
const deleteHandler = (id: string) => {
  ElMessageBox.confirm('确认要删除该模板吗?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      API.deleteSmsTemplate({ id: id }).then((res) => {
        if (res.code === 200) {
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
          getList()
        } else {
          ElMessage({
            type: 'error',
            message: '操作失败'
          })
        }
      })
    })
    .catch(() => {})
}
const operRef = ref()
const addHandler = () => {
  operRef.value.open('add')
}
const editHandler = (row: List) => {
  operRef.value.open('edit', row)
}
</script>

<style lang="scss" scoped>
.scan-form {
  display: flex;
  align-items: flex-end;
  width: 100%;
}
.scan-search-bar {
  padding: 6px 10px;
  width: calc(100% - 216px);
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  color: #1890ff;
  cursor: pointer;
}
.opera-context {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
