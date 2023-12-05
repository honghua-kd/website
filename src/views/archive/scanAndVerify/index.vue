<template>
  <div>
    <SecondaryTitle title="核验车辆登记证" />
    <!-- 搜索工作栏 -->
    <div class="scan-search-container">
      <el-form
        ref="queryFormRef"
        :model="queryParams"
        class="scan-search-bar"
        label-width="90px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="核验时间:" prop="verifyTime">
              <el-date-picker
                v-model="queryParams.verifyTime"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建人:" prop="creator">
              <el-input v-model="queryParams.creator" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="核对结果:" prop="verifyResult">
              <el-select v-model="queryParams.verifyResult">
                <el-option
                  v-for="(item, index) in verifyOpts"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="批次号:" prop="batchNo">
              <el-input v-model="queryParams.batchNo" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发动机号:" prop="engineNo">
              <el-input v-model="queryParams.engineNo" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发动机型号:" prop="engineType">
              <el-input v-model="queryParams.engineType" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="归档状态:" prop="archivalStatus">
              <el-select v-model="queryParams.archivalStatus">
                <el-option
                  v-for="(item, index) in archiveStatusOpts"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="合同号:" prop="contractNo">
              <el-input v-model="queryParams.contractNo" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车牌号:" prop="licensePlateNo">
              <el-input v-model="queryParams.licensePlateNo" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车架号:" prop="vinNo">
              <el-input v-model="queryParams.vinNo" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="办事处:" prop="agencyName">
              <el-input v-model="queryParams.agencyName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="expandFlag">
          <el-col :span="12">
            <el-form-item label="挂靠商:" prop="affiliatesName">
              <el-input v-model="queryParams.affiliatesName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="渠道商:" prop="channelName">
              <el-input v-model="queryParams.channelName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="end">
          <el-col :span="6" class="btn-row">
            <el-form-item>
              <el-button type="primary">查询</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="search-btn">
        <div class="arrow">
          <el-icon v-if="!expandFlag"><ArrowDownBold /></el-icon>
          <el-icon v-if="expandFlag"><ArrowUpBold /></el-icon>
          <span
            v-if="!expandFlag"
            @click="expandHandler"
            style="margin-left: 4px"
          >
            展开
          </span>
          <span
            v-if="expandFlag"
            @click="expandHandler"
            style="margin-left: 4px"
          >
            收回
          </span>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-row class="table-btn">
        <el-button type="primary" :icon="Plus" @click="uploadHandler">
          上传车辆登记证
        </el-button>
        <el-button type="primary" :icon="Check">选择 & 归档</el-button>
        <el-button type="primary" :icon="Delete">删除</el-button>
        <el-button type="primary" :icon="Download">导出</el-button>
        <el-button type="primary" @click="editHandler('1')">编辑</el-button>
      </el-row>
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        border
        v-loading="tableLoading"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'target' }"
      >
        <el-table-column
          type="selection"
          width="55"
          :selectable="selectableHandler"
        />

        <el-table-column align="center" fixed label="文件名" prop="fileName" />
        <el-table-column
          align="center"
          label="登记证归档序号"
          prop="registerCardArchiveNo"
        />
        <el-table-column align="center" label="核对结果" prop="verifyResult" />

        <el-table-column
          align="center"
          label="*登记证编号"
          prop="registerCardNo"
        />
        <el-table-column align="center" label="*车架号" prop="vinNo" />
        <el-table-column align="center" label="*发动机号" prop="engineNo" />
        <el-table-column align="center" label="*发动机型号" prop="engineType" />
        <el-table-column align="center" label="*车牌号" prop="licensePlateNo" />
        <el-table-column
          align="center"
          label="*机动车所有人"
          prop="vehicleOwner"
        />
        <el-table-column align="center" label="*车身颜色" prop="vehicleColor" />
        <el-table-column align="center" label="*使用性质" prop="useType" />
        <el-table-column align="center" label="*抵押权人" prop="mortgagee" />
        <el-table-column
          align="center"
          label="*统一社会信用代码"
          prop="mortgageeUscc"
        />
        <el-table-column
          align="center"
          label="*抵押登记日期"
          prop="mortgageRegisterDate"
        />
        <el-table-column align="center" label="批次号" prop="batchNo" />
        <el-table-column align="center" label="关联合同号" prop="contractNo" />
        <el-table-column align="center" label="所属系统" prop="belongSystem" />
        <el-table-column align="center" label="挂靠商" prop="affiliatesName" />
        <el-table-column align="center" label="办事处" prop="agencyName" />
        <el-table-column align="center" label="渠道商" prop="channelName" />
        <el-table-column align="center" label="创建人" prop="creator" />
        <el-table-column align="center" label="创建时间" prop="createTime" />

        <el-table-column align="center" label="操作" fixed="right">
          <template #default="scope">
            <template v-if="scope.row.id">
              <el-button link type="primary" @click="editHandler(scope.row.id)">
                编辑
              </el-button>
              <el-button link type="danger" @click="delHandler(scope.row.id)">
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
    <EditForm ref="editFormRef" />
    <UploadForm ref="uploadFormRef" />
  </div>
</template>

<script setup lang="ts">
import SecondaryTitle from '@/components/SecondaryTitle/index.vue'
import { ref, reactive, Ref, computed } from 'vue'
import { ElMessageBox, ElMessage, ElForm } from 'element-plus'
import { verifyOpts, archiveStatusOpts } from './config'
import {
  ArrowDownBold,
  ArrowUpBold,
  Plus,
  Delete,
  Download,
  Check
} from '@element-plus/icons-vue'
import EditForm from './EditForm.vue'
import UploadForm from './UploadForm.vue'
import { MortageAPI } from '@/api/mortgageRelease'
import {
  VehiRegisterCardListRequest,
  PageRequest,
  DateRangeRequest,
  CardInfoIO
} from '@/api'
const API = new MortageAPI()
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const queryFormRef = ref<InstanceType<typeof ElForm>>()
const expandFlag = ref<boolean>(false)
const tableLoading = ref<boolean>(false)
const tableData: Ref<CardInfoIO[]> = ref([])
const queryParams = reactive<
  VehiRegisterCardListRequest & PageRequest & DateRangeRequest
>({
  pageNo: 1,
  pageSize: 10,
  verifyTime: [new Date(), new Date()], // 创建时间  ?????
  creator: '', // 创建者
  verifyResult: '', // 核对结果
  batchNo: '', // 批次号
  engineNo: '', // 发动机号
  engineType: '', // 发动机型号
  archivalStatus: '', // 归档状态
  contractNo: '', // 合同号
  licensePlateNo: '', // 车牌号
  vinNo: '', // 车架号
  agencyName: '', // 办事处
  affiliatesName: '', // 挂靠商
  channelName: '' // 渠道商
})

const startTime = computed(() => {
  const time = queryParams.verifyTime[0]

  return time
})

const endTime = computed(() => {
  const time = queryParams.verifyTime[1]
  return time
})
// 是否可选
const selectableHandler = (row: CardInfoIO) => {
  return !!row.id
}
// 展开-收回处理
const expandHandler = (): boolean => {
  return (expandFlag.value = !expandFlag.value)
}

// 上传车辆登记证
const uploadFormRef = ref()
const uploadHandler = () => {
  uploadFormRef.value.open('upload')
}

// 删除
const delHandler = (id: string) => {
  // 二次确认
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 调用删除接口
      const params = {
        id
      }
      console.log(params)
    })
    .catch((err: Error) => {
      ElMessage({
        type: 'error',
        message: '删除失败'
      })
      throw err
    })
}
// 编辑
const editFormRef = ref()
const editHandler = (id: string) => {
  console.log(id)
  editFormRef.value.open('add', id)
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

// 获取列表
const getList = () => {
  const { verifyTime, ...others } = queryParams
  console.log('verifyTime', verifyTime)
  const params = {
    startVerifyTime: startTime.value,
    endVerifyTime: endTime.value,
    ...others
  }
  tableLoading.value = true
  API.getVehiRegisterCardList(params)
    .then((res) => {
      tableLoading.value = false
      if (res && res.code === 200) {
        tableData.value = res?.data?.list || []
      }
    })
    .catch((err: Error) => {
      tableLoading.value = false
      console.log(err)
    })
}

const init = () => {
  getList()
}

init()
</script>

<style lang="scss" scoped>
.scan-search-container {
  display: flex;
  width: 100%;
}
.scan-search-bar {
  padding: 10px;
  width: 90%;
}
.search-btn {
  display: flex;
  margin-top: 7%;
  padding: 20px 10px;
  height: 60px;
  flex-direction: column;
}
.arrow {
  cursor: pointer;
  color: #1893ff;
}
.btn-row {
  display: flex;
  justify-content: flex-end;
}
.table-btn {
  margin-bottom: 10px;
}
</style>
