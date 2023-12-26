<template>
  <div>
    <el-card>
      <el-form :model="queryParams" ref="formRef">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="来源系统:" prop="city">
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
            <el-form-item label="代理商/办事处:" prop="chepai">
              <el-input
                v-model="queryParams.chepai"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="城市:" prop="city">
              <el-select
                v-model="queryParams.city"
                clearable
                placeholder="请选择"
                class="city-select"
              >
                <el-option
                  v-for="item in statusOpts"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
              <el-select
                v-model="queryParams.market"
                clearable
                placeholder="请选择"
                class="city-select"
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
          <el-col :span="2">
            <el-button type="primary" :icon="Search" @click="searchHandler">
              搜索
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-row :gutter="8" style="margin: 10px 0">
      <el-col :span="1.5">
        <el-button type="primary"> 批量导入 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary"> 下载导入模版 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" @click="addHandler"> 新增 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary"> 下载 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary"> 删除 </el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      border
      v-loading="tableLoading"
    >
      <el-table-column type="selection" width="55" />
      <template v-for="item in Columns">
        <el-table-column
          v-if="item.show"
          :label="item.label"
          :prop="item.prop"
          :fixed="item.fixed || false"
          :show-overflow-tooltip="item.showTooltip"
          :min-width="item.minWidth"
          :key="item.prop"
        >
          <template v-slot="scope">
            <div v-if="item.prop === 'isQingdan'">
              <el-switch v-model="scope.downloadTime" />
            </div>
            <div v-else-if="item.prop === 'isShengpi'">
              <el-switch v-model="scope.downloadTime" />
            </div>
            <div v-else>
              {{ scope.row[item.prop] }}
            </div>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button link type="primary" @click="editHandler(scope.row)">
            编辑
          </el-button>
          <el-button link type="primary" @click="handleDelect(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-if="pageTotal"
      background
      layout="total,sizes,prev, pager, next"
      :page-sizes="[10, 20, 50, 100]"
      :total="pageTotal"
      class="table-page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <OperDialog ref="operRef" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import OperDialog from '@/views/mortgage/channelAddress/components/operDialog.vue'
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
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const tableLoading: Ref<boolean> = ref(false)
interface TableItem {
  id: number
  downloadPerson: string
  downloadTime: string
  status: string
  isQingdan: boolean
  isShengpi: boolean
}
const Columns = [
  {
    label: '来源系统',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '渠道商/办事处',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '省',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '市',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '区',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '详细地址',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '联系人',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '联系电话',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '创建人',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '创建时间',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '最后更新人',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '更新时间',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  }
]
const tableData: Ref<TableItem[]> = ref([
  {
    id: 1,
    downloadPerson: '张三',
    downloadTime: '2023-07-18',
    status: '进行中',
    isQingdan: false,
    isShengpi: false
  }
])
const handleDelect = (row: TableItem) => {
  console.log(row)
}
// 分页
const handleCurrentChange = (val: number) => {
  console.log('value>>>>>', val)
  queryParams.pageNo = val
  getList()
}

// 页面条数改变
const handleSizeChange = (val: number) => {
  queryParams.pageSize = val
  getList()
}

const operRef = ref()
const addHandler = () => {
  operRef.value.open('add')
}
const editHandler = (row: TableItem) => {
  operRef.value.open('edit', row)
}
</script>

<style lang="scss" scoped>
.city-select {
  margin-left: 1%;
  width: 48%;
}
</style>
