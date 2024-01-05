<template>
  <div>
    <el-card>
      <el-form :model="queryParams" ref="formRef">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="规则名称:" prop="chepai">
              <el-input
                v-model="queryParams.chepai"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="适用业务类型:" prop="city">
              <el-select
                v-model="queryParams.city"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in statusOpts"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="规则状态:" prop="chepai">
              <el-select
                v-model="queryParams.city"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in statusOpts"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" :icon="Search" @click="searchHandler">
              搜索
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-row :gutter="8" style="margin: 10px 0">
      <el-col :span="1.5">
        <el-button type="primary" @click="addHandler"> 新增 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary"> 批量导入 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary"> 下载导入模版 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary"> 下载 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary"> 删除 </el-button>
      </el-col>
    </el-row>

    <Table
      :isSelected="true"
      :data="tableData"
      :columnConfig="Columns"
      :loading="tableLoading"
      :page-total="pageTotal"
      :setColumnEnable="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @selection-change="selectionChangeHandler"
      @header-click="headerClickHandler"
    >
      <template #column-switch="{ row, prop }">
        <el-switch v-model="row[prop]" @click="editHandler(row[prop])" />
      </template>
      <template #action="scope">
        <el-button link type="primary" @click="editHandler(scope.row)">
          编辑
        </el-button>
        <el-button link type="primary" @click="handleDelect(scope.row)">
          删除
        </el-button>
      </template>
    </Table>
    <OperDialog ref="operRef" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import OperDialog from '@/views/mortgage/rules/components/operDialog.vue'
import Table from '@/components/Table/index.vue'

const statusOpts = reactive([
  {
    dictLabel: '城',
    dictValue: 1
  },
  {
    dictLabel: '市',
    dictValue: 0
  }
])
interface QueryForm {
  pageNo: number
  pageSize: number
  city: string
  market: string
  chepai: string
}
const queryParams = reactive<QueryForm>({
  pageNo: 1,
  pageSize: 10,
  city: '',
  market: '',
  chepai: ''
})
const searchHandler = () => {
  queryParams.pageNo = 1
  getList()
}
const getList = async () => {}
const pageTotal: Ref<number> = ref(100) // 列表的总页数
const tableLoading: Ref<boolean> = ref(false)
interface TableItem {
  id: number
  ruleName: string
  riskType: string
  dataOrigin: string
  city: string
  assignType: string
  assignPerson: string
  autoAssign: string
  sendMsg: string
  msgTemplate: string
  status: string
  lastModifyTime: string
  creator: string
  createTime: string
  lastModifier: string
  updateTime: string
  isJieYa: boolean
}
const Columns = [
  {
    label: '规则名称',
    prop: 'ruleName',
    valueType: 'display',
    fixed: 'left',
    width: 120,
    show: true,
    align: 'center',
    showOverflowTooltip: true,
    forbiddenEdit: true,
    icon: 'sortAsc',
    customStyle: {
      color: 'red'
    }
  },
  {
    label: '任务类型',
    prop: 'riskType',
    valueType: 'display',
    width: 120,
    show: true,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '数据来源',
    prop: 'dataOrigin',
    valueType: 'display',
    width: 120,
    show: true,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '城市',
    prop: 'city',
    valueType: 'display',
    width: 120,
    show: true,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '分配类型',
    prop: 'assignType',
    valueType: 'display',
    width: 120,
    show: true,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '分配人员',
    prop: 'assignPerson',
    valueType: 'display',
    width: 120,
    show: true,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '是否自动分配',
    prop: 'autoAssign',
    valueType: 'display',
    width: 120,
    show: true,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '是否发送短信',
    prop: 'sendMsg',
    valueType: 'display',
    width: 120,
    show: true,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '短信模版',
    prop: 'msgTemplate',
    valueType: 'display',
    width: 120,
    align: 'center',
    show: true,
    showOverflowTooltip: true
  },
  {
    label: '状态',
    valueType: 'custom',
    prop: 'status',
    width: 110,
    show: true,
    align: 'center',
    showOverflowTooltip: true,
    slotName: 'column-switch'
  },
  {
    label: '最新执行日期',
    valueType: 'dateType',
    prop: 'lastModifyTime',
    width: 150,
    show: true,
    align: 'center',
    showOverflowTooltip: true,
    customStyle: {
      color: 'red'
    }
  },
  {
    label: '创建人',
    prop: 'creator',
    valueType: 'display',
    width: 120,
    show: true,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '创建时间',
    prop: 'createTime',
    valueType: 'dateType',
    width: 150,
    show: true,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '最后更新人',
    prop: 'lastModifier',
    valueType: 'display',
    width: 120,
    show: true,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    valueType: 'dateType',
    width: 150,
    show: true,
    align: 'center',
    showOverflowTooltip: true
  }
]
const tableData: Ref<TableItem[]> = ref([
  {
    id: 1,
    ruleName: '规则名称',
    riskType: '任务类型',
    dataOrigin: '数据来源',
    city: '上海',
    assignType: '分配类型',
    assignPerson: '分配人员',
    autoAssign: '是',
    sendMsg: '是否发送短信',
    msgTemplate: '短信模版',
    status: '进行中',
    creator: '张三',
    lastModifier: '张三',
    createTime: '2023-07-18',
    lastModifyTime: '2023-07-18',
    updateTime: '2023-07-18',
    isJieYa: false,
    isDiYa: false
  }
])
const handleDelect = (row: TableItem) => {
  console.log(row)
}
// 分页
const handleCurrentChange = (val: number) => {
  console.log('value>>>>>handleCurrentChange', val)
  queryParams.pageNo = val
  getList()
}

// 页面条数改变
const handleSizeChange = (val: number) => {
  console.log('value>>>>>handleSizeChange', val)
  queryParams.pageSize = val
  getList()
}

// 选中条数
const selectionChangeHandler = (val: TableItem) => {
  console.log('value', val)
}

// 点击表头回调
const headerClickHandler = (column: TableItem) => {
  console.log('column-value', column)
}

const operRef = ref()
const addHandler = () => {
  operRef.value.open('add')
}
const editHandler = (row: TableItem) => {
  console.log('edit_row', row)
  operRef.value.open('edit', row)
}
</script>

<style lang="scss" scoped>
.city-select {
  margin-left: 1%;
  width: 48%;
}
</style>
