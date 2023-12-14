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
          @click="achiveHandler(selectIds)">
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
        <el-table-column label="快递状态" prop="expressStatus" width="180" align="center">
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="expressStatus" />
          </template>
        </el-table-column>
        <el-table-column label="快递单号" prop="expressNo" width="180" align="center">
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="expressNo" />
          </template>
        </el-table-column>
        <el-table-column label="快递公司" prop="expressCompany" width="180" align="center">
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="expressCompany" />
          </template>
        </el-table-column>
        <el-table-column label="寄送/接收" prop="postOrReceive" width="180" align="center">
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="postOrReceive" />
          </template>
        </el-table-column>
        <el-table-column label="寄送日期" prop="postTime" width="180" align="center">
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="postTime" />
          </template>
        </el-table-column>
        <el-table-column label="寄送日期" prop="postTime" width="180" align="center">
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="postTime" />
          </template>
        </el-table-column>

        <el-table-column
          label="登记证归档序号"
          prop="registerCardArchiveNo"
          width="180"
          align="center"
        >
          <template #header>
            登记证归档序号
            <svg-icon
              :name="setSortFlag(queryParams?.registerCardArchiveNoSort || '')"
              size="20"
            />
          </template>
          <template #default="scope">
            <span :class="scope.row.id ? '' : 'font-color-system'">
              {{ scope.row.registerCardArchiveNo }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="核对结果"
          prop="verifyResult"
          width="150"
          align="center"
        >
          <template #header>
            核对结果
            <svg-icon
              :name="setSortFlag(queryParams?.verifyResultSort || '')"
              size="20"
            />
          </template>
          <template #default="scope">
            <span v-if="scope.row.id">
              <svg-icon
                :name="getVerifyResult(scope.row)"
                size="20"
                color="#f39b1c"
              />
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="*登记证编号"
          prop="registerCardNo"
          width="180"
          align="center"
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="registerCardNo" />
          </template>
        </el-table-column>
        <el-table-column
          label="*车架号"
          prop="vinNo"
          width="180"
          align="center"
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="vinNo" />
          </template>
        </el-table-column>
        <el-table-column
          label="*发动机号"
          prop="engineNo"
          width="180"
          align="center"
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="engineNo" />
          </template>
        </el-table-column>
        <el-table-column
          label="*发动机型号"
          prop="engineType"
          width="180"
          align="center"
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="engineType" />
          </template>
        </el-table-column>
        <el-table-column
          label="*车牌号"
          prop="licensePlateNo"
          width="180"
          align="center"
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="licensePlateNo" />
          </template>
        </el-table-column>
        <el-table-column
          label="*机动车所有人"
          prop="vehicleOwner"
          width="180"
          align="center"
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="vehicleOwner" />
          </template>
        </el-table-column>
        <el-table-column label="*车身颜色" prop="vehicleColor" width="150">
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="vehicleColor" />
          </template>
        </el-table-column>
        <el-table-column
          label="*使用性质"
          prop="useType"
          width="150"
          align="center"
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="useType" />
          </template>
        </el-table-column>
        <el-table-column
          label="*抵押权人"
          prop="mortgagee"
          width="150"
          align="center"
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="mortgagee" />
          </template>
        </el-table-column>
        <el-table-column
          label="*统一社会信用代码"
          prop="mortgageeUscc"
          width="200"
          align="center"
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="mortgageeUscc" />
          </template>
        </el-table-column>
        <el-table-column
          label="*抵押登记日期"
          prop="mortgageRegisterDate"
          width="180"
          align="center"
        >
          <template #default="scope">
            <TableSlotItem :rowInfo="scope.row" rowKey="mortgageRegisterDate" />
          </template>
        </el-table-column>
        <el-table-column
          label="批次号"
          prop="batchNo"
          width="180"
          align="center"
        />
        <el-table-column
          label="关联合同号"
          prop="contractNo"
          width="200"
          align="center"
        />
        <el-table-column
          label="所属系统"
          prop="belongSystem"
          width="180"
          align="center"
        />
        <el-table-column
          label="挂靠商"
          prop="affiliatesName"
          width="180"
          align="center"
        />
        <el-table-column
          label="办事处"
          prop="agencyName"
          width="180"
          align="center"
        />
        <el-table-column
          label="渠道商"
          prop="channelName"
          width="180"
          align="center"
        />
        <el-table-column
          label="创建人"
          prop="creator"
          width="150"
          align="center"
        />
        <el-table-column
          label="创建时间"
          prop="createTime"
          width="180"
          align="center"
        >
          <template #default="scope">
            {{ formatDate(scope.row.createTime, '') }}
          </template>
        </el-table-column>
        <el-table-column
          label="归档状态"
          prop="archivalStatus"
          width="150"
          align="center"
        >
          <template #default="scope">
            {{ getAchivalStatus(scope.row.archivalStatus) }}
          </template>
        </el-table-column>
        <el-table-column
          label="归档时间"
          prop="archivalDate"
          width="180"
          align="center"
        >
          <template #default="scope">
            {{ formatDate(scope.row.archivalDate, '') }}
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="150" align="center">
          <template #default="scope">
            <template v-if="scope.row.id">
              <el-button
                v-if="
                  scope.row.archivalStatus === ARCHIVE_STATUS.UNACHIVED &&
                  scope.row.verifyResult !== VERIFY_RESULTS.PROCESSING
                "
                link
                type="primary"
                @click="editHandler(scope.row.id)"
              >
                编辑
              </el-button>
              <el-button
                v-if="scope.row.archivalStatus !== ARCHIVE_STATUS.ACHIVED"
                link
                type="danger"
                @click="delHandler([scope.row.id])"
              >
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
import type {
  PostMessageRegisterCardListRequest,
  PageRequest,
  DateRangeRequest,
  SortParamsRequest,
  CardListItem,
  DictItem
} from '@/api'
import dayjs from 'dayjs'
const queryFormRef = ref<InstanceType<typeof ElForm>>()
type QueryParams = PostMessageRegisterCardListRequest &
  PageRequest &
  DateRangeRequest &
  SortParamsRequest
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
const tableData: Ref<CardListItem[]> = ref([])






// 查询
const searchHandler = () => {
}
// 重置
const reset = () => {}

const addHandler = () => {}
const achiveHandler = (ids: string[]) => {}
const importHandler = () => {}
const exportHandler = () => {}
const delHandler = (ids: string[]) => {}
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
