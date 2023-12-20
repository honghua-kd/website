<template>
  <div>
    <div class="search-container">
      <el-form
        ref="queryFormRef"
        :model="queryParams"
        class="search-bar"
        label-width="90px"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="快递单号:" prop="expressNo">
              <el-input
                v-model="queryParams.expressNo"
                clearable
                placeholder="请输入快递单号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="快递公司:" prop="expressCompany">
              <el-select
                v-model="queryParams.expressCompanyStatus"
                style="width: 100%"
                clearable
                placeholder="请选择快递公司"
              >
                <el-option
                  v-for="(item, index) in archiveStatusOpts"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="登记时间:" prop="registerTime">
              <el-date-picker
                v-model="queryParams.registerTime"
                type="date"
                :default-value="new Date()"
                format="YYYY/MM/DD"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="寄送/接收:" prop="postOrReceive">
              <el-select
                v-model="queryParams.postOrReceiveStatus"
                style="width: 100%"
                clearable
                placeholder="请选择寄送/接收"
              >
                <el-option
                  v-for="(item, index) in postAndReceiveStatusOpts"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="快递内容:" prop="expressContent">
              <el-select
                v-model="queryParams.expressContentStatus"
                style="width: 100%"
                clearable
                placeholder="请选择快递内容"
              >
                <el-option
                  v-for="(item, index) in expressContentStatusOpts"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="快递备注:" prop="expressNote">
              <el-input
                v-model="queryParams.expressNote"
                clearable
                placeholder="请输入快递备注"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="end">
          <el-col :span="6" class="btn-row">
            <el-form-item>
              <el-button type="primary" @click="searchHandler">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-row class="table-btn">
        <el-button type="primary" :icon="Plus" @click="addHandler">
          添加
        </el-button>
        <el-button
          type="primary"
          :icon="Check"
          @click="achiveHandler(selectIds)"
        >
          批量接收
        </el-button>
        <el-button type="primary" :icon="Upload" @click="importHandler">
          导入
        </el-button>
        <el-button type="primary" :icon="Download" @click="exportHandler">
          导出
        </el-button>
        <el-button type="primary" :icon="Delete" @click="delHandler(selectIds)">
          删除
        </el-button>
      </el-row>
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        border
        v-loading="tableLoading"
        row-key="id"
        :tree-props="{ children: 'target' }"
        @selection-change="selectionChangeHandler"
        @header-click="sortChangeHandler"
      >
        <el-table-column
          type="selection"
          width="55"
          :selectable="selectableHandler"
        />
        <el-table-column
          label="快递状态"
          prop="expressStatus"
          width="180"
          align="center"
        />
        <el-table-column
          label="快递单号"
          prop="expressNo"
          width="180"
          align="center"
        />
        <el-table-column
          label="快递公司"
          prop="expressCompany"
          width="180"
          align="center"
        />
        <el-table-column
          label="寄送/接收"
          prop="postOrReceive"
          width="180"
          align="center"
        />
        <el-table-column
          label="寄送日期"
          prop="postTime"
          width="180"
          align="center"
        >
          <template #default="scope">
            {{ formatDate(scope.row.postTime, '') }}
          </template>
        </el-table-column>
        <el-table-column
          label="收件日期"
          prop="receiveTime"
          width="180"
          align="center"
        >
          <template #default="scope">
            {{ formatDate(scope.row.receiveTime, '') }}
          </template>
        </el-table-column>
        <el-table-column
          label="快递主要内容"
          prop="expressContent"
          width="180"
          align="center"
        />
        <el-table-column
          label="内容备注"
          prop="contentRemark"
          width="180"
          align="center"
        />
        <el-table-column
          label="寄送人"
          prop="sender"
          width="180"
          align="center"
        />
        <el-table-column
          label="收件人"
          prop="recipient"
          width="180"
          align="center"
        />
        <el-table-column
          label="登记时间"
          prop="registerTime"
          width="180"
          align="center"
        >
          <template #default="scope">
            {{ formatDate(scope.row.registerTime, 'YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column
          label="登记人"
          prop="registrant"
          width="180"
          align="center"
        />
        <el-table-column
          label="更新时间"
          prop="updateTime"
          width="180"
          align="center"
        >
          <template #default="scope">
            {{ formatDate(scope.row.updateTime, '') }}
          </template>
        </el-table-column>
        <el-table-column
          label="更新人"
          prop="updater"
          width="180"
          align="center"
        />

        <el-table-column label="操作" fixed="right" width="240" align="center">
          <template #default="scope">
            <template v-if="scope.row.id">
              <el-button
                v-if="scope.row.postOrReceive == '寄送'"
                link
                type="primary"
                @click="logisticsInfo(scope.row.id)"
              >
                物流信息
              </el-button>
              <el-button
                link
                type="primary"
                @click="checkHandler(scope.row.id)"
              >
                查看
              </el-button>
              <el-button link type="primary" @click="editHandler(scope.row.id)">
                编辑
              </el-button>
              <el-button link type="danger" @click="delHandler([scope.row.id])">
                删除
              </el-button>
            </template>
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
    </div>
    <ImportForm ref="importFormRef" />
    <CheckForm ref="checkFormRef" />
    <EditForm ref="editFormRef" :title="dialogTitle" />
    <LogisticsInfoForm ref="logisticsInfoFormRef" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, Ref, computed, onMounted } from 'vue'
import { ElMessageBox, ElMessage, ElForm } from 'element-plus'
import {
  ArrowDownBold,
  ArrowUpBold,
  Plus,
  Delete,
  Upload,
  Download,
  Check
} from '@element-plus/icons-vue'
import EditForm from './EditForm.vue'
import LogisticsInfoForm from './LogisticsInfoForm.vue'
import CheckForm from './CheckForm.vue'
import ImportForm from './ImportForm.vue'
import type {
  PostMessageRegisterCardListRequest,
  PageRequest,
  DateRangeRequest,
  SortParamsRequest,
  CardListItem,
  DictItem
} from '@/api'
import { formatDate } from '@/utils'
import dayjs from 'dayjs'
const queryFormRef = ref<InstanceType<typeof ElForm>>()
type QueryParams = PostMessageRegisterCardListRequest &
  PageRequest &
  DateRangeRequest &
  SortParamsRequest
const dialogTitle = ref<string>('')
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const queryParams = reactive<QueryParams>({
  pageNo: 1,
  pageSize: 10,
  expressNo: '',
  expressCompanyStatus: '',
  registerTime: dayjs().startOf('day').toDate(),
  postOrReceiveStatus: '',
  expressContentStatus: '',
  expressNote: ''
})
const tableData = ref([
  {
    id: '111',
    expressStatus: '已接收',
    expressNo: 'SF1685550901301',
    expressCompany: '顺丰',
    postOrReceive: '寄送',
    postTime: '1702605614729',
    receiveTime: '1702605614729',
    expressContent: '登记证、发票',
    contentRemark: 'KCG23112983',
    sender: '王五',
    recipient: '王五',
    registerTime: '1702605614729',
    registrant: '王五',
    updateTime: '1702605614729',
    updater: '王五'
  }
])

// 查询
const searchHandler = () => {
  queryParams.pageNo = 1
}
// 重置
const reset = () => {}

const logisticsInfoFormRef = ref()
const logisticsInfo = (id: string) => {
  logisticsInfoFormRef.value.open(id)
}
const editFormRef = ref()
const editHandler = (id: string) => {
  dialogTitle.value = '编辑邮寄信息'
  editFormRef.value.open(id)
}
const addHandler = () => {
  dialogTitle.value = '新增邮寄信息'
  editFormRef.value.open()
}
const checkFormRef = ref()
const checkHandler = (id: string) => {
  checkFormRef.value.open(id)
}

const achiveHandler = (ids: string[]) => {}
const importFormRef = ref()
const importHandler = () => {
  importFormRef.value.open()
}
const exportHandler = () => {}
const delHandler = (ids: string[]) => {}

// 页面条数改变
const handleSizeChange = (val: number) => {
  queryParams.pageSize = val
}
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  width: 100%;
}
.search-bar {
  padding: 10px;
  width: 90%;
}
.table-btn {
  margin-bottom: 10px;
}
</style>
