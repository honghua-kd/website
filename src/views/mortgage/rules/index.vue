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
          <el-col :span="6">
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
          <el-col :span="6">
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
            <el-button type="primary" @click="searchHandler"> 查询 </el-button>
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
        <el-button type="primary" @click="downloadTemplate">
          下载导入模版
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary"> 下载 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary"> 删除 </el-button>
      </el-col>
    </el-row>
    <!-- <Table
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
    </Table> -->
    <OperDialog ref="operRef" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import OperDialog from './components/operDialog.vue'
import { RuleAPI, CommonAPI } from '@/api'
const CommonApi = new CommonAPI()
const RuleApi = new RuleAPI()
import type {
  RuleListRequest,
  MartgageCityListRequest,
  MortgageCityListResponse,
  EditMortgageCityRequest
} from '@/api'
import Table from '@/components/Table.vue'
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
const queryParams = reactive<RuleListRequest>({
  pageNo: 1,
  pageSize: 10,
  isUsed: 0,
  ruleBusinessType1: '',
  ruleBusinessType2: ''
})

const searchHandler = () => {
  queryParams.pageNo = 1
  getList()
}
const getList = async () => {
  RuleApi.getRuleList(queryParams)
    .then((res) => {
      console.error(res)
      if (res && res.code === 200) {
        tableData.value = res?.data?.list || []
        pageTotal.value = res?.data?.total || 0
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
const pageTotal: Ref<number> = ref(100) // 列表的总页数
const tableLoading: Ref<boolean> = ref(false)
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

// 下载模板
const downloadTemplate = () => {
  const params = {
    bizType: 'CITY_CONFIG'
  }
  CommonApi.getDownLoadTemplate(params)
    .then((res) => {
      handleDownloadFile(res)
    })
    .catch((err: Error) => {
      throw err
    })
}
</script>

<style scoped></style>
