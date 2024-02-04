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
      <!-- 批量操作 -->
      <template #btnsBox>
        <el-button type="primary" :icon="Download" @click="download">
          下载
        </el-button>
        <el-button type="primary" :icon="Document" @click="entrust">
          委托业务运营办理抵押
        </el-button>
        <el-button type="primary" :icon="Document" @click="applyData">
          申请抵押材料
        </el-button>
        <el-button type="primary" :icon="Document" @click="applyCommonData">
          申请通用抵押材料
        </el-button>
        <el-button
          type="primary"
          :icon="Plus"
          @click="addSupplement(selectIds)"
        >
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
        <el-button type="primary" :icon="Check" @click="costApproval">
          抵押费用减免审批
        </el-button>
        <el-button type="primary" :icon="Edit" @click="editSign">
          修改签约/付费结果
        </el-button>
        <el-button type="primary" :icon="Plus" @click="feedback">
          情况反馈
        </el-button>
        <el-button type="primary" :icon="Upload" @click="importFeedback">
          导入情况反馈
        </el-button>
      </template>
      <template #action="scope">
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
      </template>
    </Table>

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
            <el-form-item label="备注" prop="">
              <el-input v-model="a" placeholder="请输入" style="width: 100%" />
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
    <el-dialog
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
    </el-dialog>
    <!-- 修改签约/付费结果 -->
    <el-dialog
      title="修改签约/付费结果"
      v-model="signVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="25%"
    >
      <el-form ref="approveFormRef" :label-width="px2rem('130px')">
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否完成签约" prop="">
              <el-radio-group v-model="radio">
                <el-radio :label="3">是</el-radio>
                <el-radio :label="6">否</el-radio>
                <el-radio :label="9">减免</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="是否完成签约" prop="">
              <el-radio-group v-model="radio">
                <el-radio :label="3">是</el-radio>
                <el-radio :label="6">否</el-radio>
                <el-radio :label="9">减免</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="signVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="submitSign"> 确认 </el-button>
      </template>
    </el-dialog>

    <AlertForm :data="selectIds" ref="alertFormRef" />
    <ImportForm
      ref="importFormRef"
      :title="importTitle"
      :biztype="bizType"
      :category="category"
    />
    <SupplementForm ref="checkFormRef" />
    <RecordForm ref="recordFormRef" />
  </div>
</template>
<script lang="ts" setup>
import SearchField from '@/components/SearchField/index.vue'
import { reactive, ref, Ref, computed, nextTick } from 'vue'
import { searchConfig, tableConfig } from './data'
import Table from '@/components/Table/index.vue'
import { ElMessageBox, ElMessage, genFileId } from 'element-plus'
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
const selectData = reactive([])
const selectionChangeHandler = (item: string[]) => {
  selectData.splice(0, selectData.length)
  selectData.push(...item)
}

const selectIds = computed(() => {
  return selectData.map((item) => {
    return String(item.id)
  })
})

// 签约后补
const sign = (ids: string[]) => {
  // if (!ids.length) {
  //   ElMessage.error('请选择信息')
  //   return
  // }
  // 二次确认
  ElMessageBox.confirm(
    `您已选择${ids.length}个合同进行签约后补，我们将为客户发送签约短信，客户在小程序签约完成后，系统将自动同步签约状态。`,
    '签约后补',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }
  ).then(() => {})
}

// 情况反馈
const feebackVisible = ref(false)
const feebackFormRef = ref()
const feedback = () => {
  feebackVisible.value = true
}
const submitFeeback = async () => {
  if (!feebackFormRef.value) return
  const valid = await feebackFormRef.value.validate()
  if (!valid) return
  feebackVisible.value = false
}

// 审批操作
const approveVisible = ref(false)
const approveFormRef = ref()
const costApproval = () => {
  approveVisible.value = true
}
const submitApprove = async () => {
  if (!approveFormRef.value) return
  const valid = await approveFormRef.value.validate()
  if (!valid) return
  approveVisible.value = false
}

// 修改签约/付费结果
const signVisible = ref(false)
const editSign = () => {
  signVisible.value = true
}
const submitSign = () => {
  signVisible.value = false
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
const applyData = () => {
  alertFormRef.value.open('材料')
}
const entrust = () => {
  alertFormRef.value.open('抵押')
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
const addSupplement = (id: string) => {
  checkFormRef.value.open(id)
}
const getList = () => {}
getList()
</script>
<style lang="scss" scoped>
.search-container {
  padding-top: 18px;
}
</style>
