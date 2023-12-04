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
            <el-form-item label="核对结果:" prop="verifyResults">
              <el-select v-model="queryParams.verifyResults">
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
            <el-form-item label="归档状态:" prop="archiveStatus">
              <el-select v-model="queryParams.archiveStatus">
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
            <el-form-item label="车牌号:" prop="licenseNo">
              <el-input v-model="queryParams.licenseNo" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车架号:" prop="vinNo">
              <el-input v-model="queryParams.vinNo" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="办事处:" prop="office">
              <el-input v-model="queryParams.office" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="expandFlag">
          <el-col :span="12">
            <el-form-item label="挂靠商:" prop="affilMerchants">
              <el-input v-model="queryParams.affilMerchants" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="渠道商:" prop="channelProvider">
              <el-input v-model="queryParams.channelProvider" />
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
      >
        <el-table-column type="selection" width="55" />
        <el-table-column align="center" fixed label="文件名" prop="id" />
        <el-table-column align="center" label="登记证归档序号" prop="id" />
        <el-table-column align="center" label="核对结果" prop="id" />
        <el-table-column align="center" label="*登记证编号" prop="id" />
        <el-table-column align="center" label="*车架号" prop="id" />
        <el-table-column align="center" label="*发动机号" prop="id" />
        <el-table-column align="center" label="*发动机型号" prop="id" />
        <el-table-column align="center" label="*车牌号" prop="id" />
        <el-table-column align="center" label="*机动车所有人" prop="id" />
        <el-table-column align="center" label="*车身颜色" prop="id" />
        <el-table-column align="center" label="*使用性质" prop="id" />
        <el-table-column align="center" label="*抵押权人" prop="id" />
        <el-table-column align="center" label="*统一社会信用代码" prop="id" />
        <el-table-column align="center" label="*抵押登记日期" prop="id" />
        <el-table-column align="center" label="批次号" prop="id" />
        <el-table-column align="center" label="关联合同号" prop="id" />
        <el-table-column align="center" label="所属系统" prop="id" />
        <el-table-column align="center" label="挂靠商" prop="id" />
        <el-table-column align="center" label="办事处" prop="id" />
        <el-table-column align="center" label="渠道商" prop="id" />
        <el-table-column align="center" label="创建人" prop="id" />
        <el-table-column align="center" label="创建时间" prop="id" />

        <el-table-column align="center" label="操作" fixed="right">
          <template #default="scope">
            <el-button link type="primary" @click="editHandler(scope.row.id)">
              编辑
            </el-button>
            <el-button link type="danger" @click="delHandler(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <EditForm ref="editFormRef" />
    <UploadForm ref="uploadFormRef" />
  </div>
</template>

<script setup lang="ts">
import SecondaryTitle from '@/components/SecondaryTitle/index.vue'
import { ref, reactive } from 'vue'
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

const queryFormRef = ref<InstanceType<typeof ElForm>>()
const expandFlag = ref<boolean>(false)
const tableLoading = ref<boolean>(false)
const tableData = ref([])
const queryParams = reactive({
  verifyTime: [], // 创建时间
  creator: '', // 创建者
  verifyResults: '', // 核对结果
  batchNo: '', // 批次号
  engineNo: '', // 发动机号
  engineType: '', // 发动机型号
  archiveStatus: '', // 归档状态
  contractNo: '', // 合同号
  licenseNo: '', // 车牌号
  vinNo: '', // 车架号
  office: '', // 办事处
  affilMerchants: '', // 挂靠商
  channelProvider: '' // 渠道商
})

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
</script>

<style lang="scss" scoped>
.scan-search-container {
  display: flex;
  width: 100%;
}
.scan-search-bar {
  padding: 10px;
  width: 80%;
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
