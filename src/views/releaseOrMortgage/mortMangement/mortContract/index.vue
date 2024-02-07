<template>
  <div>
    <div ref="searchBoxRef" class="search-container">
      <SearchField
        :data="searchConfig"
        v-model="queryParams"
        :visibleRows="2"
        :colNum="4"
        :labelWidth="'130px'"
        @search="getList"
      >
      </SearchField>
    </div>
    <el-divider border-style="dashed" style="margin-top: 10px" />
    <TableField
      :data="tableData"
      :loading="tableLoading"
      :columns="tableConfig"
      :page-total="pageTotal"
      :height="tableHeight"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @selection-change="selectionChangeHandler"
      @size-change="getList"
      @current-change="getList"
    >
      <!-- 批量操作 -->
      <template #buttons>
        <el-button type="primary" :icon="Download" @click="download">
          下载
        </el-button>
        <el-button
          type="primary"
          :icon="Document"
          @click="entrust('抵押', selectIds)"
        >
          委托业务运营办理抵押
        </el-button>
        <el-button
          type="primary"
          :icon="Document"
          @click="entrust('材料', selectIds)"
        >
          申请抵押材料
        </el-button>
        <el-button
          type="primary"
          :icon="Document"
          @click="applyCommonData(selectIds)"
        >
          申请通用抵押材料
        </el-button>
        <el-button type="primary" :icon="Plus" @click="addSupplement()">
          新增补充信息
        </el-button>
        <el-button type="primary" :icon="Upload" @click="importSupplement">
          导入补充信息
        </el-button>
        <el-button
          type="primary"
          :icon="FolderChecked"
          @click="sign(selectIds)"
        >
          签约后补
        </el-button>
        <el-button type="primary" :icon="Check" @click="mortCost(selectIds)">
          抵押费用减免审批
        </el-button>
        <el-button type="primary" :icon="Edit" @click="editSign">
          修改签约/付费结果
        </el-button>
        <el-button type="primary" :icon="Plus" @click="feedback(selectIds)">
          情况反馈
        </el-button>
        <el-button type="primary" :icon="Upload" @click="importFeedback">
          导入情况反馈
        </el-button>
      </template>
      <template #action="scope">
        <el-button link type="primary" @click="addSupplement(scope.row)">
          补充信息
        </el-button>
        <el-button link type="primary" @click="record('check', scope.row.id)">
          查看补充信息
        </el-button>
        <el-button
          link
          type="primary"
          @click="record('operation', scope.row.id)"
        >
          操作记录
        </el-button>
        <el-button link type="primary" @click="record('approve', scope.row.id)">
          审批记录
        </el-button>
        <el-button link type="primary" @click="feedback([scope.row.id])">
          情况反馈
        </el-button>
      </template>
    </TableField>

    <!-- 情况反馈 -->
    <el-dialog
      title="情况反馈"
      v-model="feebackVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="30%"
    >
      <el-form ref="feebackFormRef" :label-width="px2rem('80px')">
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="办理阶段"
              prop=""
              :rules="[{ required: true, message: '办理阶段不能为空' }]"
            >
              <el-select clearable placeholder="请选择" style="width: 100%">
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="">
              <el-input
                placeholder="请输入"
                style="width: 100%"
                maxlength="500"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="feebackVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="submitFeeback"> 确认 </el-button>
      </template>
    </el-dialog>
    <!-- 审批操作 -->
    <!-- <el-dialog
      title="审批"
      v-model="approveVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="30%"
    >
      <el-form ref="approveFormRef" :label-width="px2rem('80px')">
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="办理阶段"
              prop=""
              :rules="[{ required: true, message: '审批结果不能为空' }]"
            >
              <el-select
                v-model="a"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in taskTypeOpts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="拒绝原因"
              prop=""
              :rules="[{ required: true, message: '审批结果不能为空' }]"
            >
              <el-input v-model="a" placeholder="请输入" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="approveVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="submitApprove"> 确认 </el-button>
      </template>
    </el-dialog> -->

    <SignForm ref="signFormRef" />
    <AlertForm :data="selectIds" ref="alertFormRef" />
    <ImportForm
      ref="importFormRef"
      :title="importTitle"
      :biztype="bizType"
      :category="category"
    />
    <SupplementForm
      ref="supplementFormRef"
      :formValue="formValue"
      :visible="supplymentVisible"
      @closeModel="closeSupplyModel"
    />
    <RecordForm ref="recordFormRef" />
    <MortCostForm ref="costFormRef" />
    <CommonMort ref="commonMortRef" />
  </div>
</template>
<script lang="ts" setup>
import SearchField from '@/components/SearchField/index.vue'
import { reactive, ref, computed } from 'vue'
import { searchConfig, tableConfig } from './data'
import TableField from '@/components/TableField/index.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { px2rem, handleDownloadFile } from '@/utils'
import {
  Download,
  Document,
  Upload,
  Plus,
  Edit,
  FolderChecked,
  Check
} from '@element-plus/icons-vue'
import AlertForm from './components/AlertForm.vue'
import ImportForm from './components/ImportForm.vue'
import SupplementForm from './components/SupplementForm.vue'
import RecordForm from './components/RecordForm.vue'
import MortCostForm from './components/MortCostForm.vue'
import SignForm from './components/SignForm.vue'
import CommonMort from './components/CommonMort.vue'
import dayjs from 'dayjs'
import { CommonAPI } from '@/api'
const CommonApi = new CommonAPI()
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10
})
const tableLoading = ref(false)
const tableData = reactive([
  {
    contractNo: 'L21C1566003'
  }
])
const pageTotal = ref(0)
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
const selectData = reactive<string[]>([])
const selectionChangeHandler = (item: string[]) => {
  selectData.splice(0, selectData.length)
  selectData.push(...item)
}

const selectIds = computed(() => {
  return selectData.map((item) => {
    // return String(item.id)
    return String(item)
  })
})

// 下载
const download = () => {
  const ids = selectIds.value.map((item) => String(item))
  const params = {
    selectParams: '',
    bizType: 'MORTGAGE_ALLOCATION_RULE_TEMPLATE_EXPORT'
  }
  if (selectIds.value.length) {
    params.selectParams = JSON.stringify({
      ids: ids
    })
  } else {
    params.selectParams = JSON.stringify({
      ...queryParams
    })
  }
  CommonApi.exportBySelect(params).then((res) => {
    if (res && res.code === 200) {
      if (res?.data?.sync === 1) {
        CommonApi.downLoadFiles({
          fileCode: res?.data?.fileCode as string
        }).then((res) => {
          const fileName = `合同管理${dayjs().format('YYYYMMDD')}.xlsx`
          handleDownloadFile(res, fileName)
          ElMessage.success('操作成功')
        })
      } else if (res?.data?.sync === 0) {
        ElMessage.success(
          '导出任务已经产生，前面有任务待处理，请至我的下载中查看'
        )
      }
    }
  })
}

// 抵押费用减免审批
const costFormRef = ref()
const mortCost = (ids: string[]) => {
  costFormRef.value.open(ids)
}

// 签约后补
const sign = (ids: string[]) => {
  // if (!ids.length) {
  //   ElMessage.error('请选择信息')
  //   return
  // }
  // const mes = `您已选择${ids.length}个合同进行签约后补，其中10个已完成签约，5个在签约中。`
  const mes = `您已选择${ids.length}个合同进行签约后补，我们将为客户发送签约短信，客户在小程序签约完成后，系统将自动同步签约状态。`
  // 二次确认
  ElMessageBox.confirm(mes, '签约后补', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(() => {})
}

// 情况反馈
const feebackVisible = ref(false)
const feebackFormRef = ref()
const feedback = (ids: string[]) => {
  feebackVisible.value = true
  console.log(ids)
}
const submitFeeback = async () => {
  if (!feebackFormRef.value) return
  const valid = await feebackFormRef.value.validate()
  if (!valid) return
  feebackVisible.value = false
}

// 审批操作
// const approveVisible = ref(false)
// const approveFormRef = ref()
// const approvalOperation = () => {
//   approveVisible.value = true
// }
// const submitApprove = async () => {
//   if (!approveFormRef.value) return
//   const valid = await approveFormRef.value.validate()
//   if (!valid) return
//   approveVisible.value = false
// }

// 修改签约/付费结果
const signFormRef = ref()
const editSign = () => {
  signFormRef.value.open()
}

// 导入情况反馈
const importFormRef = ref()
const importTitle = ref('')
const category = reactive({
  businessCategory: '',
  businessSubcategory: ''
})
const bizType = ref('')
const importFeedback = () => {
  importFormRef.value.open()
  importTitle.value = '导入情况反馈'
  category.businessCategory = ''
  category.businessSubcategory = ''
  bizType.value = ''
}
// 导入补充信息
const importSupplement = () => {
  importFormRef.value.open()
  importTitle.value = '导入补充信息'
  category.businessCategory = ''
  category.businessSubcategory = ''
  bizType.value = ''
}

// 委托办理抵押、申请抵押材料
const alertFormRef = ref()
// const applyData = () => {
//   alertFormRef.value.open('材料')
// }
const entrust = (type: string, ids: string[]) => {
  alertFormRef.value.open(type, ids)
}

// 申请通用抵押材料
const commonMortRef = ref()
const applyCommonData = (ids: string[]) => {
  commonMortRef.value.open(ids)
}

// 表格操作
const checkFormRef = ref()
const recordFormRef = ref()
const record = (type: string, id: string) => {
  if (type === 'check') {
    checkFormRef.value.open(id)
  } else if (type === 'operation') {
    recordFormRef.value.open('operation', id)
  } else if (type === 'approve') {
    recordFormRef.value.open('approve', id)
  }
}

// 新增补充信息
const supplymentVisible = ref(false)
let formValue = reactive({})
const addSupplement = (column?: string) => {
  if (column) {
    formValue = column
  } else {
    formValue = {}
  }
  supplymentVisible.value = true
}
const closeSupplyModel = () => {
  supplymentVisible.value = false
}
const getList = () => {}
getList()
</script>
<style lang="scss" scoped>
.search-container {
  padding-top: 18px;
}
</style>
