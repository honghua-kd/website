<template>
  <el-dialog
    class="edit-supplier-dialog"
    v-model="dialogVisible"
    title=""
    width="750px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleClose"
  >
    <div class="dialog-header flex-between-center">
      <div class="title flex-between-center">
        <span>新增供应商</span>
        <el-button v-show="step !== 1" type="primary">导入</el-button>
      </div>
      <el-steps
        :active="step"
        align-center
        style="margin: 10px auto 30px; width: 300px"
      >
        <el-step />
        <el-step />
        <el-step />
      </el-steps>
    </div>
    <!--  -->
    <el-form
      v-show="step === 1"
      :model="editForm"
      label-width="120px"
      label-position="top"
      inline
    >
      <div class="type-title">基础信息</div>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="公司名称"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-input
              v-model="editForm.supplierName"
              placeholder="请输入公司名称"
            /> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="组织机构代码"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-input
              v-model="editForm.organCode"
              placeholder="请输入组织机构代码"
            /> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <!-- 详情接口无子段 -->
          <el-form-item
            label="登记注册号类型"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-select
              v-model="editForm.registerType"
              style="width: 100%"
              placeholder="请选择登记注册号类型"
            ></el-select> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 详情接口无子段 -->
          <el-form-item
            label="登记注册号码"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-input
              v-model="editForm.registerCode"
              placeholder="请输入登记注册号码"
            /> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="合作商类型"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-select
              v-model="editForm.supplierTypes"
              style="width: 100%"
              placeholder="请选择合作商类型"
            ></el-select> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 详情接口无子段 -->
          <el-form-item
            label="公司规模"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-input
              v-model="editForm.companyScale"
              placeholder="请输入公司规模"
            /> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <!-- 详情接口无子段 -->
          <el-form-item
            label="归属"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-select
              v-model="editForm.belongCompanyList"
              style="width: 100%"
              placeholder="请选择归属公司"
            ></el-select> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="到期日期"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-date-picker
              v-model="editForm.expireDate"
              style="width: 100%"
              type="datetime"
              placeholder="选择日期时间"
            /> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="签约日期"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-date-picker
              v-model="editForm.signDate"
              style="width: 100%"
              type="datetime"
              placeholder="选择日期时间"
            /> -->
          </el-form-item>
        </el-col>
      </el-row>
      <div class="type-title">联系信息</div>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="内部对接人"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-input
              v-model="editForm.innerInterfaceStaffName"
              placeholder="请输入内部对接人"
            ></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="联系人"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-input
              v-model="editForm.contactName"
              placeholder="请输入联系人"
            ></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="联系电话"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-input
              v-model="editForm.phone"
              placeholder="请输入联系电话"
            ></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="公司地址"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-input
              v-model="editForm.address"
              placeholder="请输入公司地址"
            ></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="联系人邮箱"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-input
              v-model="editForm.email"
              placeholder="请输入联系人邮箱"
            ></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="邮编"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-input
              v-model="editForm.postcode"
              placeholder="请输入邮编"
            ></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <div class="type-title">账号信息</div>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="账户名称"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-input
              v-model="editForm.accountName"
              placeholder="请输入账户名称"
            ></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="银行账户"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-input
              v-model="editForm.bankAccount"
              placeholder="请输入银行账户"
            ></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="开户银行"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-input
              v-model="editForm.openBank"
              placeholder="请输入开户银行"
            ></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="支行"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-input
              v-model="editForm.subBank"
              placeholder="请输入支行"
            ></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <!-- openBankProCode openBankProName openBankCountyCode openBankCountyName openBankCityCode openBankCityName-->
          <el-form-item
            label="开户银行区域"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-cascader
              v-model="editForm.openBankArea"
              placeholder="请选择"
              style="width: 100%"
              :options="BasicData.cityList"
              clearable
            /> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="开户行行号"
            :rules="[{ required: true, message: 'required' }]"
          >
            <!-- <el-input
              v-model="editForm.openBankCode"
              placeholder="请输入开户行行号"
            ></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <div class="type-title">附件上传</div>
      <!-- 可选 fileCodes -->
      <el-row style="width: 100%">
        <el-form-item>
          <el-upload>
            <el-button type="primary">选取文件</el-button>
            <template #tip>
              <div class="el-upload__tip">
                请上传大小不超过 <span class="t-red">20MB</span>，格式为
                <span class="t-red"
                  >zip/rar/txt/doc/docx/xls/xlsx/ppt/pptx/pdf</span
                >
                的文件
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-row>
    </el-form>
    <!--  -->
    <div v-show="step === 2" class="city-person">
      <h3 class="flex-start-center">
        负责城市联系人<el-icon
          style="margin: 0 0 2px 10px; cursor: pointer"
          color="#1890FF"
          size="18"
          @click="addPerson"
          ><CirclePlusFilled
        /></el-icon>
      </h3>
      <el-table :data="personTableData" border style="width: 100%">
        <el-table-column
          v-for="i in personColumn"
          :key="i.label"
          :type="i.type"
          :prop="i.prop"
          :label="i.label"
          :width="i.width"
          :fixed="i.fixed"
        >
          <template v-if="i.label === '操作'" #default="scope">
            <el-button link type="primary" @click="editPerson(scope)"
              >编辑</el-button
            >
            <el-button link type="danger" @click="removePerson(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          background
          layout="total,sizes,prev, pager, next"
          :page-sizes="[10, 20, 50, 100]"
          :total="personTotal"
          class="table-page"
          @size-change="personSizeChange"
          @current-change="personCurrentChange"
        />
      </div>
    </div>
    <!--  -->
    <div v-show="step === 3" class="settlement-type">
      <h3 class="flex-start-center">
        结算方式<el-icon
          style="margin: 0 0 2px 10px; cursor: pointer"
          color="#1890FF"
          size="18"
          @click="addSettlement"
          ><CirclePlusFilled
        /></el-icon>
      </h3>
      <el-table :data="settlementTableData" border style="width: 100%">
        <el-table-column
          v-for="i in settlementColumn"
          :key="i.label"
          :type="i.type"
          :prop="i.prop"
          :label="i.label"
          :width="i.width"
          :fixed="i.fixed"
        >
          <template v-if="i.label === '操作'" #default="scope">
            <el-button link type="primary" @click="editSettlement(scope)"
              >编辑</el-button
            >
            <el-button link type="danger" @click="removeSettlement(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          background
          layout="total,sizes,prev, pager, next"
          :page-sizes="[10, 20, 50, 100]"
          :total="settlementTotal"
          class="table-page"
          @size-change="settlementSizeChange"
          @current-change="settlementCurrentChange"
        />
      </div>
    </div>
    <!--  -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="clickButton(cancelButtonText)">{{
          cancelButtonText
        }}</el-button>
        <el-button type="primary" @click="clickButton(okButtonText)">{{
          okButtonText
        }}</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 城市联系人 -->
  <PersonModel
    :visible="personModelVisible"
    :formValue="{}"
    @closeModel="closePersonModel"
  />
  <!-- 结算方式 -->
  <SettlementModel
    :visible="settlementModelVisible"
    :formValue="{}"
    @closeModel="closeSettlementModel"
  />
</template>
<script lang="ts" setup>
import { watch, toRefs, reactive } from 'vue'
import type {
  RecordType,
  ModelStateType
} from '@/views/supplier/supplierManage/type'
import { CirclePlusFilled } from '@element-plus/icons-vue'
import BasicData from '@/views/supplier/supplierManage/data'
import PersonModel from '@/views/supplier/supplierManage/personModel.vue'
import SettlementModel from '@/views/supplier/supplierManage/settlementModel.vue'

type ModelPropsType = {
  visible: boolean
  formValue: RecordType
}
const props = withDefaults(defineProps<ModelPropsType>(), {
  visible: false,
  formValue: () => ({})
})
const state = reactive<ModelStateType>({
  dialogVisible: false, // 供应商弹窗
  editForm: {}, // 表单数据
  step: 1, // 步骤
  cancelButtonText: '取消', // 取消按钮文案
  okButtonText: '下一步', // 确认按钮文案
  personColumn: BasicData.personColumn, // 城市联系人表列
  personTableData: [], // 城市联系人数据
  personModelVisible: false, // 城市联系人弹窗
  personTotal: 100, // 城市联系人数据总数
  settlementColumn: BasicData.settlementColumn, // 结算方式表列
  settlementTableData: [], // 结算方式数据
  settlementModelVisible: false, // 结算方式弹窗
  settlementTotal: 100 // 结算方式数据总数
})
const {
  dialogVisible,
  editForm,
  step,
  cancelButtonText,
  okButtonText,
  personColumn,
  personTableData,
  personModelVisible,
  personTotal,
  settlementColumn,
  settlementTableData,
  settlementModelVisible,
  settlementTotal
} = toRefs(state)
watch(
  [() => props.visible, () => props.formValue],
  ([newVisible, newValue]) => {
    state.step = 1
    state.dialogVisible = newVisible
    state.editForm = newValue
  },
  {
    immediate: true
  }
)
watch(step, (newValue) => {
  console.log(newValue)
  state.cancelButtonText = newValue === 1 ? '取消' : '上一步'
  state.okButtonText = newValue === 3 ? '确认' : '下一步'
})

// step 2 城市联系人
// 新增
const addPerson = () => {
  state.personModelVisible = true
}
// 编辑
const editPerson = (item: RecordType) => {
  console.log(item)
}
// 删除
const removePerson = (item: RecordType) => {
  console.log(item)
}
// 表格size改变
const personSizeChange = () => {}
// 表格翻页
const personCurrentChange = () => {}
// 监听城市联系人弹窗关闭
const closePersonModel = ({
  visible,
  type
}: {
  visible: boolean
  type: string
}) => {
  console.log(visible, type)
  state.personModelVisible = visible
}

// step 3 结算方式
// 新增
const addSettlement = () => {
  state.settlementModelVisible = true
}
// 编辑
const editSettlement = (item: RecordType) => {
  console.log(item)
}
// 删除
const removeSettlement = (item: RecordType) => {
  console.log(item)
}
// 表格size改变
const settlementSizeChange = () => {}
// 表格翻页
const settlementCurrentChange = () => {}
// 监听结算方式弹窗关闭
const closeSettlementModel = ({
  visible,
  type
}: {
  visible: boolean
  type: string
}) => {
  console.log(visible, type)
  state.settlementModelVisible = visible
}

const emit = defineEmits<{
  (e: 'closeModel', { visible, type }: { visible: boolean; type: string }): void
}>()
// 供应商弹窗关闭前回调
const handleClose = () => {
  emit('closeModel', {
    visible: false,
    type: 'click-close'
  })
}
// 供应商弹窗底部按钮交互
const clickButton = (value: string) => {
  if (value === '下一步') {
    state.step++
  } else if (value === '上一步') {
    state.step--
  } else {
    emit('closeModel', {
      visible: false,
      type: value === '确认' ? 'update-close' : 'click-close'
    })
  }
}
</script>
<style lang="scss" scoped>
.flex-between-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-start-center {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.edit-supplier-dialog {
  .dialog-header {
    margin-bottom: 20px;
    .title {
      > span {
        font-size: 20px;
        font-weight: bolder;
      }
      > .el-button {
        margin-left: 10px;
      }
    }
    .el-steps {
      margin: 0 220px 0 0 !important;
    }
  }
  .dialog-footer {
    button:first-child {
      margin-right: 10px;
    }
  }
  .type-title {
    margin: 20px 0;
    padding-left: $base-margin-5;
    height: 14px;
    font-size: $base-font-size-default;
    font-weight: bolder;
    border-left: 4px solid $base-color-primary;
    line-height: 14px;
  }
  .t-red {
    color: $base-color-red;
  }
  .city-person,
  .settlement-type {
    margin-top: 50px;
  }
}
</style>
