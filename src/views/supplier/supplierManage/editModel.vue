<template>
  <el-dialog
    class="edit-supplier-dialog"
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    top="5vh"
    title="修改供应商"
    :before-close="handleClose"
    style="overflow-y: scroll; max-height: 90vh"
  >
    <el-form :model="editForm" label-width="120px" label-position="top" inline>
      <div class="type-title">基础信息</div>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="公司名称"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-input
              v-model="editForm.supplierName"
              placeholder="请输入公司名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="组织机构代码"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-input
              v-model="editForm.organCode"
              placeholder="请输入组织机构代码"
            />
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
            <el-select
              v-model="editForm.registerType"
              style="width: 100%"
              placeholder="请选择登记注册号类型"
            >
              <el-option
                v-for="item in registerTypeStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 详情接口无子段 -->
          <el-form-item
            label="登记注册号码"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-input
              v-model="editForm.registerCode"
              placeholder="请输入登记注册号码"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="供应商类型"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-select
              v-model="editForm.supplierTypes"
              style="width: 100%"
              placeholder="请选择供应商类型"
              multiple
            >
              <el-option
                v-for="item in supplierDetailType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- 详情接口无子段 -->
          <el-form-item
            label="公司规模"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-input
              v-model="editForm.companyScale"
              placeholder="请输入公司规模"
            />
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
            <el-select
              v-model="editForm.belongCompanyCodes"
              style="width: 100%"
              placeholder="请选择归属公司"
              multiple
            >
              <el-option
                v-for="item in belongCompanyStatus"
                :key="(item.value as string)"
                :label="(item.label as string)"
                :value="(item.value as string)"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="到期日期"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-date-picker
              v-model="editForm.expireDate"
              style="width: 100%"
              type="datetime"
              placeholder="选择日期时间"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="签约日期"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-date-picker
              v-model="editForm.signDate"
              style="width: 100%"
              type="datetime"
              placeholder="选择日期时间"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
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
            <el-input
              v-model="editForm.innerInterfaceStaffCode"
              placeholder="请输入内部对接人名称"
              style="width: 50%"
            ></el-input>
            <el-input
              v-model="editForm.innerInterfaceStaffName"
              placeholder="请输入内部对接人工号"
              style="width: 50%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="联系人"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-input
              v-model="editForm.contactName"
              placeholder="请输入联系人"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="联系电话"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-input
              v-model="editForm.phone"
              placeholder="请输入联系电话"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="公司地址"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-input
              v-model="editForm.address"
              placeholder="请输入公司地址"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="联系人邮箱"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-input
              v-model="editForm.email"
              placeholder="请输入联系人邮箱"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="邮编"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-input
              v-model="editForm.postcode"
              placeholder="请输入邮编"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="type-title">账号信息</div>
      <el-row
        style="width: 100%"
        v-for="(item, index) in editForm.bankAccountList"
        :key="index"
      >
        <el-col :span="12">
          <el-form-item
            label="账户名称"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-input
              v-model="item.accountName"
              placeholder="请输入账户名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="银行账户"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-input
              v-model="item.bankAccount"
              placeholder="请输入银行账户"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="开户银行"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-input
              v-model="item.openBank"
              placeholder="请输入开户银行"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="支行"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-input
              v-model="item.subBank"
              placeholder="请输入支行"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="开户银行区域"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-cascader
              v-model="selArea"
              clearable
              ref="cascaderArea"
              :props="propsArea"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="开户行行号"
            :rules="[{ required: true, message: 'required' }]"
          >
            <el-input
              v-model="item.openBankCode"
              placeholder="请输入开户行行号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="type-title">附件上传</div>
      <!-- 可选 fileCodes -->
      <el-row style="width: 100%">
        <div style="margin-bottom: 20px">
          <el-button type="primary" @click="importAttachment">上传</el-button>
        </div>
        <el-table
          :data="editForm.attachmentInfoList"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          border
          :max-height="px2rem('320px')"
        >
          <el-table-column
            label="序号"
            prop="number"
            align="center"
            type="index"
          />
          <el-table-column
            label="文件名"
            prop="fileName"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column label="上传时间" prop="uploadTime" align="center" />
          <el-table-column label="备注" prop="fileDesc" align="center">
            <template #default="scope">
              <el-input
                v-model="scope.row.fileDesc"
                clearable
                placeholder="请输入备注"
              />
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right" align="center">
            <template #default="scope">
              <el-button
                link
                type="danger"
                @click="delOtherFile(scope.row.fileCode)"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-form>
    <!--  -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="submitForm" type="primary">确定</el-button>
        <el-button @click="clickButton">关闭</el-button>
      </span>
    </template>
  </el-dialog>
  <ImportAttachment ref="importAttachmentRef" @otherfileinfo="getFileInfo" />
</template>
<script lang="ts" setup>
import { watch, toRefs, reactive, ref, Ref } from 'vue'
import { px2rem } from '@/utils'
import type {
  RecordType,
  ModelStateType,
  AttachmentDetailDto,
  EditForm
} from '@/views/supplier/supplierManage/type'
import type { DictDataTreeResponse, DictItem } from '@/api'
import { Delete } from '@element-plus/icons-vue'
import type { CascaderProps, CascaderOption } from 'element-plus'
import ImportAttachment from './attachmentForm.vue'
import dayjs from 'dayjs'

import { ElMessageBox, ElMessage, ElForm } from 'element-plus'
import { SupplierAPI, CommonAPI } from '@/api'
const CommonApi = new CommonAPI()
const SupplierApi = new SupplierAPI()
import { useDictStore } from '@/store/dict'
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
  editForm: {
    id: '',
    supplierName: '',
    organCode: '',
    supplierTypes: [],
    registerCode: '',
    registerType: '',
    companyScale: '',
    expireDate: '',
    signDate: '',
    belongCompanyList: [],
    bankAccountList: [],
    innerInterfaceStaffCode: '',
    innerInterfaceStaffName: '',
    contactName: '',
    phone: '',
    address: '',
    email: '',
    postcode: '',
    accountName: '',
    bankAccount: '',
    openBank: '',
    subBank: '',
    openBankCode: '',
    openBankProCode: '',
    openBankProName: '',
    openBankCityCode: '',
    openBankCityName: '',
    openBankCountyCode: '',
    openBankCountyName: '',
    files: [],
    attachmentInfoList: [],
    supplierTypeNames: [],
    belongCompanyNames: []
  }, // 表单数据
  step: 1, // 步骤
  cancelButtonText: '取消', // 取消按钮文案
  okButtonText: '下一步', // 确认按钮文案
  personTableData: [], // 城市联系人数据
  personModelVisible: false, // 城市联系人弹窗
  personTotal: 0, // 城市联系人数据总数
  pagePersonSize: 10,
  pagePersonNo: 1,
  settlementTableData: [], // 结算方式数据
  settlementModelVisible: false, // 结算方式弹窗
  settlementTotal: 0, // 结算方式数据总数
  pageSettleSize: 10,
  pageSettlenNo: 1,
  accountTableData: [], // 结算方式数据
  accountModelVisible: false
})
const { dialogVisible, editForm, step } = toRefs(state)
// 表格最大高度
const selArea = ref<number[]>([])
const propsArea: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const nodes: CascaderOption[] = [] // 动态节点
    const { level } = node
    if (level === 0) {
      const resParent = await CommonApi.getAllProvinces()
      if (resParent && resParent?.data) {
        resParent?.data.map((item) => {
          const area = {
            value: item.code,
            label: item.name,
            leaf: level >= 2
          }
          nodes.push(area)
        })
      }
    } else {
      const params = {
        code: node.value as number
      }
      const res = await CommonApi.getProvincesChildren(params)
      if (res && res.data) {
        res?.data.map((item) => {
          const area = {
            value: item.code,
            label: item.name,
            leaf: level >= 2
          }
          nodes.push(area)
        })
      }
    }
    resolve(nodes) // 回调
  }
}
const registerTypeStatus: Ref<DictItem[]> = ref([])
const dictStore = useDictStore()
const belongCompanyStatus = ref<DictDataTreeResponse[]>([])
const supplierDetailType: Ref<DictItem[]> = ref([])
const getDicts = () => {
  const params = {
    dictType: 'SOURCE_SYSTEM'
  }
  CommonApi.getDictTreeList(params)
    .then((res) => {
      if (res && res.code === 200) {
        belongCompanyStatus.value = res.data?.map((item) => {
          return {
            label: item.label,
            value: item.value
          }
        }) as DictDataTreeResponse[]
      }
    })
    .catch((err) => {
      console.log(err)
    })
  registerTypeStatus.value = dictStore.dicts.SUPPLIER_REGISTER_TYPE
  supplierDetailType.value = dictStore.dicts.SUPPLIER_DETAIL_TYPE
}
watch(
  [() => props.visible, () => props.formValue],
  async ([newVisible, newValue]) => {
    console.error(newVisible)

    state.step = 1
    state.dialogVisible = newVisible
    state.editForm = newValue as unknown as EditForm
    selArea.value = [
      Number(state.editForm.bankAccountList[0]?.openBankProCode),
      Number(state.editForm.bankAccountList[0].openBankCityCode),
      Number(state.editForm.bankAccountList[0].openBankCountyCode)
    ]
    await getDicts()
  },
  {
    deep: true
  }
)
watch(step, (newValue) => {
  console.log(newValue)
  state.cancelButtonText = newValue === 1 ? '取消' : '上一步'
  state.okButtonText = newValue === 3 ? '确认' : '下一步'
})

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
const clickButton = async () => {
  emit('closeModel', {
    visible: false,
    type: 'click-close'
  })
}
const cascaderArea = ref()
const submitForm = async () => {
  const filesArr: { fileCode?: string; remark?: string }[] = []
  if (state.editForm.attachmentInfoList.length) {
    state.editForm.attachmentInfoList.forEach((item) => {
      filesArr.push({
        fileCode: item.fileCode,
        remark: item.fileDesc
      })
    })
  }
  const sparams = {
    id: state.editForm.id,
    supplierName: state.editForm.supplierName,
    organCode: state.editForm.organCode,
    supplierTypes: state.editForm.supplierTypes,
    registerCode: state.editForm.registerCode,
    registerType: state.editForm.registerType,
    companyScale: state.editForm.companyScale,
    expireDate: state.editForm.expireDate,
    signDate: state.editForm.signDate,
    belongCompanyList: state.editForm.belongCompanyCodes,
    innerInterfaceStaffCode: state.editForm.innerInterfaceStaffCode,
    innerInterfaceStaffName: state.editForm.innerInterfaceStaffName,
    contactName: state.editForm.contactName,
    phone: state.editForm.phone,
    address: state.editForm.address,
    email: state.editForm.email,
    postcode: state.editForm.postcode,
    accountName: state.editForm.bankAccountList[0].accountName,
    bankAccount: state.editForm.bankAccountList[0].bankAccount,
    openBank: state.editForm.bankAccountList[0].openBank,
    subBank: state.editForm.bankAccountList[0].subBank,
    openBankCode: state.editForm.bankAccountList[0].openBankCode,
    openBankProCode: selArea.value[0],
    openBankProName: cascaderArea.value[0].getCheckedNodes()[0].pathLabels[0],
    openBankCityCode: selArea.value[1],
    openBankCityName: cascaderArea.value[0].getCheckedNodes()[0].pathLabels[1],
    openBankCountyCode: selArea.value[2],
    openBankCountyName:
      cascaderArea.value[0].getCheckedNodes()[0].pathLabels[2],
    files: filesArr
  }
  SupplierApi.editSupplier(sparams)
    .then((res) => {
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '修改成功'
        })
        emit('closeModel', {
          visible: false,
          type: 'click-close'
        })
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
const importAttachmentRef = ref()
const importAttachment = () => {
  importAttachmentRef.value.open()
}
// 导入上传附件数据回显
const getFileInfo = (params: AttachmentDetailDto[]) => {
  if (params && params.length) {
    params.forEach((item: AttachmentDetailDto) => {
      state.editForm.attachmentInfoList.push({
        fileCode: item.fileCode,
        remark: '',
        fileName: item.fileName,
        uploadTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    })
  }
}
// 删除附件信息
const delOtherFile = (code: string) => {
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      const index = state.editForm.attachmentInfoList.findIndex(
        (item) => item.fileCode === code
      )
      if (index !== -1) {
        state.editForm.attachmentInfoList.splice(index, 1)
      }
    })
    .catch((err: Error) => {
      throw err
    })
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
  .settlement-account,
  .settlement-type {
    margin-top: 50px;
  }
}
</style>
