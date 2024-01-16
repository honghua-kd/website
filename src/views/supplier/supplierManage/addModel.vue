<template>
  <el-dialog
    class="edit-supplier-dialog"
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    top="5vh"
    :before-close="handleClose"
    style="overflow-y: scroll; max-height: 90vh"
  >
    <div class="dialog-header flex-between-center">
      <div class="title flex-between-center">
        <span>新增供应商</span>
        <el-button v-show="step !== 1" type="primary" @click="importHandler"
          >导入</el-button
        >
        <ImportForm ref="importFormRef" :biztype="bizType" />
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
      ref="basicInfoFormRef"
      :rules="rules"
    >
      <div class="type-title">基础信息</div>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="公司名称"
            :rules="[{ required: true, message: '请输入公司名称' }]"
            prop="supplierName"
          >
            <el-input
              v-model="editForm.supplierName"
              placeholder="请输入公司名称"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="组织机构代码"
            :rules="[{ required: true, message: '请输入组织机构代码' }]"
            prop="organCode"
          >
            <el-input
              v-model="editForm.organCode"
              placeholder="请输入组织机构代码"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <!-- 详情接口无子段 -->
          <el-form-item
            label="登记注册号类型"
            :rules="[{ required: true, message: '请选择登记注册号类型' }]"
            prop="registerType"
          >
            <el-select
              v-model="editForm.registerType"
              style="width: 100%"
              placeholder="请选择登记注册号类型"
              clearable
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
            :rules="[{ required: true, message: '请输入登记注册号码' }]"
            prop="registerCode"
          >
            <el-input
              v-model="editForm.registerCode"
              placeholder="请输入登记注册号码"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="供应商类型"
            :rules="[
              { required: true, message: '请选择供应商类型', trigger: 'blur' }
            ]"
            prop="supplierTypes"
          >
            <el-select
              v-model="editForm.supplierTypes"
              style="width: 100%"
              placeholder="请选择供应商类型"
              multiple
              clearable
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
            :rules="[{ required: true, message: '请输入公司规模' }]"
            prop="companyScale"
          >
            <el-input
              v-model="editForm.companyScale"
              placeholder="请输入公司规模"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <!-- 详情接口无子段 -->
          <el-form-item
            label="归属"
            :rules="[
              { required: true, message: '请选择归属公司', trigger: 'blur' }
            ]"
            prop="belongCompanyList"
          >
            <el-select
              v-model="editForm.belongCompanyList"
              style="width: 100%"
              placeholder="请选择归属公司"
              multiple
              clearable
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
            :rules="[{ required: true, message: '请选择到期日期' }]"
            prop="expireDate"
          >
            <el-date-picker
              v-model="editForm.expireDate"
              style="width: 100%"
              type="datetime"
              placeholder="选择日期时间"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="签约日期"
            :rules="[{ required: true, message: '请选择签约日期' }]"
            prop="signDate"
          >
            <el-date-picker
              v-model="editForm.signDate"
              style="width: 100%"
              type="datetime"
              placeholder="选择日期时间"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="type-title">联系信息</div>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="内部对接人名称"
            :rules="[{ required: true, message: '请输入内部对接人工号' }]"
            prop="innerInterfaceStaffName"
          >
            <el-input
              v-model="editForm.innerInterfaceStaffName"
              placeholder="请输入内部对接人名称"
              style="width: 100%"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="内部对接人工号"
            :rules="[{ required: true, message: '请输入内部对接人名称' }]"
            prop="innerInterfaceStaffCode"
          >
            <el-input
              v-model="editForm.innerInterfaceStaffCode"
              placeholder="请输入内部对接人工号"
              style="width: 100%"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="联系人"
            :rules="[{ required: true, message: '请输入联系人' }]"
            prop="contactName"
          >
            <el-input
              v-model="editForm.contactName"
              placeholder="请输入联系人"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input
              v-model="editForm.phone"
              placeholder="请输入联系电话"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="公司地址"
            :rules="[{ required: true, message: '请输入公司地址' }]"
            prop="address"
          >
            <el-input
              v-model="editForm.address"
              placeholder="请输入公司地址"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="联系人邮箱"
            :rules="[
              { required: true, message: '请输入邮箱地址' },
              {
                type: 'email',
                message: '请输入正确的邮箱地址',
                trigger: ['blur', 'change']
              }
            ]"
            prop="email"
          >
            <el-input
              v-model="editForm.email"
              placeholder="请输入联系人邮箱"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="邮编"
            :rules="[{ required: true, message: '请输入邮编' }]"
            prop="postcode"
          >
            <el-input
              v-model="editForm.postcode"
              placeholder="请输入邮编"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="type-title">账号信息</div>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="账户名称"
            :rules="[{ required: true, message: '请输入账户名称' }]"
            prop="accountName"
          >
            <el-input
              v-model="editForm.accountName"
              placeholder="请输入账户名称"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="银行账户"
            :rules="[{ required: true, message: '请输入银行账户' }]"
            prop="bankAccount"
          >
            <el-input
              v-model="editForm.bankAccount"
              placeholder="请输入银行账户"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item
            label="开户银行"
            :rules="[{ required: true, message: '请输入开户银行' }]"
            prop="openBank"
          >
            <el-input
              v-model="editForm.openBank"
              placeholder="请输入开户银行"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="支行"
            :rules="[{ required: true, message: '请输入支行' }]"
            prop="subBank"
          >
            <el-input
              v-model="editForm.subBank"
              placeholder="请输入支行"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="width: 100%">
        <el-col :span="12">
          <el-form-item label="开户银行区域" prop="areaCode">
            <el-cascader
              v-model="selArea"
              clearable
              ref="cascaderArea"
              :props="propsArea"
              style="width: 100%"
              @change="changeArea"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开户行行号" prop="openBankCode">
            <el-input
              v-model="editForm.openBankCode"
              placeholder="请输入开户行行号"
              clearable
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
          :data="editForm.files"
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
          <el-table-column label="备注" prop="remark" align="center">
            <template #default="scope">
              <el-input
                v-model="scope.row.remark"
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
    <div v-show="step === 2" class="city-person">
      <h3 class="flex-start-center">
        负责城市联系人
        <el-button
          type="primary"
          :icon="Plus"
          @click="addPerson"
          style="margin-left: 5px"
        >
          新建
        </el-button>
        <el-cascader
          v-model="selCity"
          clearable
          ref="cascaderCity"
          :props="propsCity"
          style="margin: 0 10px; width: 40%"
        />
        <el-button type="primary" @click="searchPersonList()">查询</el-button>
      </h3>

      <Table
        :data="personTableData"
        :columnConfig="PersonColumn"
        :isSelected="false"
        :page-total="personTotal"
        :setColumnEnable="false"
        :height="tableHeight"
        :actionWidth="px2rem('100px')"
        v-model:pageSize="queryPerson.pageSize"
        v-model:pageNo="queryPerson.pageNo"
        @size-change="getCityList"
        @current-change="getCityList"
      >
        <template #action="scope">
          <template v-if="scope.row.id">
            <el-button link type="primary" @click="editPerson(scope.row)"
              >编辑</el-button
            >
            <el-button link type="danger" @click="removePerson(scope.row.id)"
              >删除</el-button
            >
          </template>
        </template>
      </Table>
    </div>
    <!--  -->
    <div v-show="step === 3" class="settlement-type">
      <h3 class="flex-start-center">
        结算方式
        <el-button
          type="primary"
          :icon="Plus"
          @click="addSettlement"
          style="margin-left: 5px"
        >
          新建
        </el-button>
        <el-cascader
          v-model="selSettle"
          clearable
          :props="propsCity"
          ref="cascaderSettle"
          style="margin: 0 10px; width: 40%"
        />
        <el-button type="primary" @click="searchSettleList()">查询</el-button>
      </h3>

      <Table
        :data="settlementTableData"
        :columnConfig="SettlementColumn"
        :isSelected="false"
        :page-total="settlementTotal"
        :setColumnEnable="false"
        :height="tableHeight"
        :actionWidth="px2rem('100px')"
        v-model:pageSize="querySettle.pageSize"
        v-model:pageNo="querySettle.pageNo"
        @size-change="getSettlementList"
        @current-change="getSettlementList"
      >
        <template #default="{ row, prop }">
          <span v-if="prop === 'settlementWay'">
            {{ getWay(row.settlementWay) }}
          </span>
        </template>
        <template #action="scope">
          <template v-if="scope.row.id">
            <el-button link type="primary" @click="editSettlement(scope.row)"
              >编辑</el-button
            >
            <el-button
              link
              type="danger"
              @click="removeSettlement(scope.row.id)"
              >删除</el-button
            >
          </template>
        </template>
      </Table>
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
  <ImportAttachment ref="importAttachmentRef" @otherfileinfo="getFileInfo" />
  <PersonForm ref="personFormRef" @success="getCityList" />
  <SettlementForm ref="settlementFormRef" @success="getSettlementList" />
</template>
<script lang="ts" setup>
import { watch, toRefs, reactive, ref, Ref, computed } from 'vue'
import { px2rem } from '@/utils'
import type {
  RecordType,
  ModelStateType,
  AttachmentDetailDto,
  EditForm
} from '@/views/supplier/supplierManage/type'
import { Plus, Delete } from '@element-plus/icons-vue'
import ImportForm from './ImportForm.vue'
import {
  PersonColumn,
  SettlementColumn
} from '@/views/supplier/supplierManage/data'
import dayjs from 'dayjs'
import Table from '@/components/Table/index.vue'
import ImportAttachment from './attachmentForm.vue'
import PersonForm from './personForm.vue'
import type {
  CascaderProps,
  CascaderOption,
  FormRules,
  CascaderValue
} from 'element-plus'
import SettlementForm from './settlementForm.vue'
import type { DictItem } from '@/api'
import { ElMessageBox, ElMessage, ElForm } from 'element-plus'
import { SupplierAPI, CommonAPI, DictDataTreeResponse } from '@/api'
import type { InternalRuleItem } from 'async-validator'
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
    areaCode: [],
    files: [],
    attachmentInfoList: [],
    belongCompanyNames: [],
    supplierTypeNames: []
    // accountTableData: []
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
  accountTableData: []
})
const {
  dialogVisible,
  editForm,
  step,
  cancelButtonText,
  okButtonText,
  personTableData,
  personTotal,
  settlementTableData,
  settlementTotal
} = toRefs(state)
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
const selCity = ref([])
const selSettle = ref([])
const propsCity: CascaderProps = {
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
            leaf: level >= 1
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
            leaf: level >= 1
          }
          nodes.push(area)
        })
      }
    }
    resolve(nodes) // 回调
  }
}
const selArea = ref([])
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
const queryPerson = reactive({
  supplierId: state.editForm.id,
  provinceName: '',
  cityName: '',
  pageNo: 1,
  pageSize: 10
})
const querySettle = reactive({
  supplierId: state.editForm.id,
  provinceName: '',
  cityName: '',
  pageNo: 1,
  pageSize: 10
})
const cascaderCity = ref()
const cascaderSettle = ref()
const getCityList = async () => {
  const params = {
    supplierId: state.editForm.id || '',
    // supplierId: '1744999920903254018',
    provinceName: cascaderCity.value.getCheckedNodes()[0]?.pathLabels[0] || '',
    cityName: cascaderCity.value.getCheckedNodes()[0]?.pathLabels[1] || '',
    pageNo: queryPerson.pageNo,
    pageSize: queryPerson.pageSize
  }
  await SupplierApi.getCityContactsList(params)
    .then((res) => {
      if (res && res.code === 200) {
        personTableData.value.splice(0, personTableData.value.length)
        personTableData.value.push(...(res?.data?.list || []))
        personTotal.value = res?.data?.total || 0
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const getSettlementList = async () => {
  const params = {
    supplierId: state.editForm.id || '',
    // supplierId: '1744999920903254018',
    provinceName:
      cascaderSettle.value.getCheckedNodes()[0]?.pathLabels[0] || '',
    cityName: cascaderSettle.value.getCheckedNodes()[0]?.pathLabels[1] || '',
    pageNo: querySettle.pageNo,
    pageSize: querySettle.pageSize
  }
  await SupplierApi.getSettleList(params)
    .then((res) => {
      if (res && res.code === 200) {
        settlementTableData.value.splice(0, settlementTableData.value.length)
        settlementTableData.value.push(...(res?.data?.list || []))
        settlementTotal.value = res?.data?.total || 0
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const rules = reactive<FormRules<typeof editForm>>({
  areaCode: [
    {
      validator: (
        rule: InternalRuleItem,
        value: string[] | undefined,
        callback: (error?: string | Error | undefined) => void
      ) => {
        if (value && value?.length) {
          callback()
        } else {
          callback(new Error('请输入开户银行区域'))
        }
      },
      trigger: 'change',
      required: true
    }
  ],
  phone: [
    {
      validator: (
        rule: InternalRuleItem,
        value: string,
        callback: (error?: string | Error | undefined) => void
      ) => {
        var regExp1 = /^1[3456789]\d{9}$/
        var regExp2 = /^(0\d{2,3}-?)?\d{7,8}(-\d{1,4})?$/
        if (regExp1.test(value) || regExp2.test(value)) {
          callback()
        } else {
          callback(new Error('请正确输入联系电话'))
        }
      },
      required: true,
      trigger: 'blur'
    }
  ]
})
const changeArea = (val: CascaderValue) => {
  val = val as string[]
  if (val?.length) {
    state.editForm.areaCode = [String(val[0]), String(val[1]), String(val[2])]
  } else {
    state.editForm.areaCode = []
  }
}
watch(
  [() => props.visible, () => props.formValue],
  ([newVisible, newValue]) => {
    state.step = 1
    state.dialogVisible = newVisible
    state.editForm = newValue as unknown as EditForm
    selArea.value = []
    state.editForm.files = []
    getDicts()
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
const personFormRef = ref()
const addPerson = () => {
  personFormRef.value.open(state.editForm.id, 'sid')
  // personFormRef.value.open('1744999920903254018', 'sid')
}
// 编辑
const editPerson = (item: RecordType) => {
  item.proandcity = [item.provinceCode as string, item.cityCode as string]
  personFormRef.value.open(item)
}
// 删除
const removePerson = (id: string) => {
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 调用删除接口
      const params = {
        id: id
      }
      SupplierApi.deleteCityContacts(params)
        .then((res) => {
          if (res && res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            getCityList()
          }
        })
        .catch((err: Error) => {
          throw err
        })
    })
    .catch((err: Error) => {
      throw err
    })
}

// step 3 结算方式
// 新增
const settlementFormRef = ref()
const addSettlement = () => {
  settlementFormRef.value.open(state.editForm.id, 'sid')
  // settlementFormRef.value.open('1744999920903254018', 'sid')
}
// 编辑
const editSettlement = (item: RecordType) => {
  item.proandcity = [item.provinceCode as string, item.cityCode as string]
  settlementFormRef.value.open(item)
}
// 删除
const removeSettlement = (id: string) => {
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 调用删除接口
      const params = {
        id: id
      }
      SupplierApi.deleteSettleContacts(params)
        .then((res) => {
          if (res && res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            getSettlementList()
          }
        })
        .catch((err: Error) => {
          throw err
        })
    })
    .catch((err: Error) => {
      throw err
    })
}

const emit = defineEmits<{
  (e: 'closeModel', { visible, type }: { visible: boolean; type: string }): void
  (e: 'success'): void
}>()
// 供应商弹窗关闭前回调
const handleClose = () => {
  emit('closeModel', {
    visible: false,
    type: 'click-close'
  })
}
// 供应商弹窗底部按钮交互
const clickButton = async (value: string) => {
  if (value === '下一步' && state.step === 1) {
    await submitForm()
  }
  if (value === '下一步' && state.step === 2) {
    state.step++
  } else if (value === '上一步') {
    state.step--
  }
  if (value === '确认') {
    emit('closeModel', {
      visible: false,
      type: value === '确认' ? 'update-close' : 'click-close'
    })
    emit('success')
  }
  if (value === '取消') {
    emit('closeModel', {
      visible: false,
      type: 'click-close'
    })
  }
}
const cascaderArea = ref()
const basicInfoFormRef = ref<InstanceType<typeof ElForm>>()
const submitForm = async () => {
  // 校验
  if (!basicInfoFormRef.value) return
  const valid = await basicInfoFormRef.value.validate()
  if (!valid) return
  const sparams = {
    supplierName: state.editForm.supplierName,
    organCode: state.editForm.organCode,
    supplierTypes: state.editForm.supplierTypes,
    registerCode: state.editForm.registerCode,
    registerType: state.editForm.registerType,
    companyScale: state.editForm.companyScale,
    expireDate: state.editForm.expireDate,
    signDate: state.editForm.signDate,
    belongCompanyList: state.editForm.belongCompanyList,
    innerInterfaceStaffCode: state.editForm.innerInterfaceStaffCode,
    innerInterfaceStaffName: state.editForm.innerInterfaceStaffName,
    contactName: state.editForm.contactName,
    phone: state.editForm.phone,
    address: state.editForm.address,
    email: state.editForm.email,
    postcode: state.editForm.postcode,
    accountName: state.editForm.accountName,
    bankAccount: state.editForm.bankAccount,
    openBank: state.editForm.openBank,
    subBank: state.editForm.subBank,
    openBankCode: state.editForm.openBankCode,
    openBankProCode: selArea.value[0],
    openBankProName: cascaderArea.value.getCheckedNodes()[0].pathLabels[0],
    openBankCityCode: selArea.value[1],
    openBankCityName: cascaderArea.value.getCheckedNodes()[0].pathLabels[1],
    openBankCountyCode: selArea.value[2],
    openBankCountyName: cascaderArea.value.getCheckedNodes()[0].pathLabels[2],
    files: state.editForm.files || []
  }
  SupplierApi.addSupplier(sparams)
    .then((res) => {
      if (res && res.code === 200) {
        state.editForm.id = String(res?.data)
        getCityList()
        getSettlementList()
        state.step = 2
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
const importFormRef = ref()
const bizType = ref('')
const importHandler = () => {
  if (state.step === 2) {
    bizType.value = 'SUPPLIER_CITY_CONTACTS'
  } else if (state.step === 3) {
    bizType.value = 'SUPPLIER_SETTLEMENT_WAY'
  }
  importFormRef.value.open()
}
const searchPersonList = () => {
  queryPerson.pageNo = 1
  getCityList()
}
const searchSettleList = () => {
  querySettle.pageNo = 1
  getSettlementList()
}
const getWay = (val: string) => {
  let label = ''
  dictStore.dicts.SUPPLIER_SETTLEMENT_WAY.forEach((item) => {
    if (item.value === val) {
      label = item.label
    }
  })
  return label
}
const importAttachmentRef = ref()
const importAttachment = () => {
  importAttachmentRef.value.open()
}
// 导入上传附件数据回显
const getFileInfo = (params: AttachmentDetailDto[]) => {
  if (params && params.length) {
    params.forEach((item: AttachmentDetailDto) => {
      state.editForm.files.push({
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
      const index = state.editForm.files.findIndex(
        (item) => item.fileCode === code
      )
      if (index !== -1) {
        state.editForm.files.splice(index, 1)
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
  .settlement-type {
    margin-top: 50px;
  }
}
</style>
