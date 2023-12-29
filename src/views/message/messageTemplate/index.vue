<template>
  <div>
    <el-card>
      <el-form :model="queryParams" ref="formRef">
        <el-row :gutter="20">
          <el-col :span="8">
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
          <el-col :span="8">
            <el-form-item label="模板名称:" prop="chepai">
              <el-input
                v-model="queryParams.chepai"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="模板编号:" prop="chepai">
              <el-input
                v-model="queryParams.chepai"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务类型:" prop="city">
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
              查询
            </el-button>
            <el-button :icon="Refresh" @click="reset"> 重置 </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-row :gutter="8" style="margin: 10px 0">
      <el-col :span="1.5">
        <el-button type="primary" @click="addHandler"> 新增 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button> 停用 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button> 批量导入 </el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" border v-loading="tableLoading">
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
            <div>
              {{ scope.row[item.prop] }}
            </div>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button link type="primary" @click="editHandler(scope.row)">
            修改
          </el-button>
          <el-button link type="primary" @click="editHandler(scope.row)">
            删除
          </el-button>
          <el-button link type="primary" @click="editHandler(scope.row)">
            启用
          </el-button>
          <el-button link type="primary" @click="handleDelect(scope.row)">
            停用
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
import { Search, Refresh } from '@element-plus/icons-vue'
import OperDialog from '@/views/message/messageTemplate/components/operDialog.vue'
import { reactive, ref, Ref } from 'vue'
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const tableLoading: Ref<boolean> = ref(false)
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
    label: '模板编号',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '模板名称',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '模板类型',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '短信发送条件',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '业务类型',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '联系人类型',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '模板内容',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '模板状态',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  },
  {
    label: '修改时间',
    prop: 'downloadPerson',
    format: '',
    fixed: '',
    minWidth: '60',
    show: true,
    showTooltip: true
  }
]
interface TableItem {
  id: number
  downloadPerson: string
  downloadTime: string
  status: string
  isQingdan: boolean
  isShengpi: boolean
}
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
const reset = () => {}
const getList = async () => {}
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

<style lang="scss" scoped></style>
