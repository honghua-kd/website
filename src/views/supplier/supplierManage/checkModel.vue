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
    <el-row>
      <el-col :span="12" class="bfont">
        {{ editForm.supplierName }}
        <el-tag>{{ getFirstStatus(editForm.status) }}</el-tag>
      </el-col>
    </el-row>
    <el-form :model="editForm" label-width="120px" label-position="top" inline>
      <div class="type-title">基础信息</div>
      <el-row style="width: 100%" class="bgc">
        <el-col :span="12" class="mb-5">
          公司名称：{{ editForm.supplierName }}
        </el-col>
        <el-col :span="12" class="mb-5">
          组织机构代码：{{ editForm.organCode }}
        </el-col>
      </el-row>
      <el-row style="width: 100%" class="bgc">
        <el-col :span="12" class="mb-5">
          登记注册号类型：{{ editForm.registerTypeName }}
        </el-col>
        <el-col :span="12" class="mb-5">
          登记注册号码：{{ editForm.registerCode }}
        </el-col>
      </el-row>
      <el-row style="width: 100%" class="bgc">
        <el-col :span="12" class="mb-5">
          供应商类型：{{ editForm.supplierTypeNames.join() }}
        </el-col>
        <el-col :span="12" class="mb-5">
          公司规模：{{ editForm.companyScale }}
        </el-col>
      </el-row>
      <el-row style="width: 100%" class="bgc">
        <el-col :span="12" class="mb-5">
          归属：{{ editForm.belongCompanyNames.join() }}
        </el-col>
        <el-col :span="12" class="mb-5">
          到期日期：{{ editForm.expireDate }}
        </el-col>
      </el-row>
      <el-row style="width: 100%" class="bgc">
        <el-col :span="12" class="mb-5">
          签约日期：{{ editForm.signDate }}
        </el-col>
      </el-row>
      <div class="type-title">联系信息：</div>
      <el-row style="width: 100%" class="bgc">
        <el-col :span="12" class="mb-5">
          内部对接人：{{ editForm.innerInterfaceStaffCode }} /
          {{ editForm.innerInterfaceStaffName }}</el-col
        >
        <el-col :span="12" class="mb-5">
          联系人：{{ editForm.contactName }}
        </el-col>
      </el-row>
      <el-row style="width: 100%" class="bgc">
        <el-col :span="12" class="mb-5">
          联系电话：{{ editForm.phone }}
        </el-col>
        <el-col :span="12" class="mb-5">
          公司地址：{{ editForm.address }}
        </el-col>
      </el-row>
      <el-row style="width: 100%" class="bgc">
        <el-col :span="12" class="mb-5">
          联系人邮箱：{{ editForm.email }}
        </el-col>
        <el-col :span="12" class="mb-5"> 邮编：{{ editForm.postcode }} </el-col>
      </el-row>
      <div class="type-title">账号信息</div>
      <el-row
        style="width: 100%"
        v-for="(item, index) in editForm.bankAccountList"
        :key="index"
        class="bgc"
      >
        <el-col :span="8" class="mb-5"
          >账户名称： {{ item.accountName }}</el-col
        >
        <el-col :span="8" class="mb-5"
          >银行账户： {{ item.bankAccount }}</el-col
        >
        <el-col :span="8" class="mb-5">开户银行： {{ item.openBank }}</el-col>
        <el-col :span="8" class="mb-5">支行： {{ item.subBank }}</el-col>
        <el-col :span="8" class="mb-5"
          >开户银行区域：
          {{
            item.openBankProName +
            item.openBankCityName +
            item.openBankCountyName
          }}</el-col
        >
        <el-col :span="8" class="mb-5"
          >开户行行号： {{ item.openBankCode }}</el-col
        >
      </el-row>

      <div class="type-title">附件</div>
      <!-- 可选 fileCodes -->
      <el-row style="width: 100%">
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
    <div class="settlement-account">
      <h3 class="flex-start-center">
        供应商账号
        <el-button
          type="primary"
          :icon="Plus"
          @click="addAccount"
          style="margin-left: 5px"
        >
          新建
        </el-button>
      </h3>

      <Table
        :data="accountTableData"
        :columnConfig="AccountColumn"
        :isSelected="false"
        :page-total="accountTotal"
        :setColumnEnable="false"
        :height="tableHeight"
        :actionWidth="px2rem('100px')"
        v-model:pageSize="queryAccount.pageSize"
        v-model:pageNo="queryAccount.pageNo"
        @size-change="getAccountList"
        @current-change="getAccountList"
      >
        <template #default="{ row, prop }">
          <span v-if="prop === 'status'">
            {{ getStatus(row.status) }}
          </span>
        </template>
        <template #action="scope">
          <template v-if="scope.row.id">
            <el-button link type="primary" @click="editAccount(scope.row)"
              >编辑</el-button
            >
            <el-button link type="primary" @click="enableAccount(scope.row)">{{
              scope.row.status === 0 ? '启用' : '停用'
            }}</el-button>
            <el-button link type="danger" @click="removeAccount(scope.row.id)"
              >删除</el-button
            >
          </template>
        </template>
      </Table>
    </div>
    <!--  -->
    <!--  -->
    <div class="city-person">
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
        <el-button
          type="primary"
          :icon="Upload"
          @click="importHandler('SUPPLIER_CITY_CONTACTS', 'MORTGAGE_TEMPLATE')"
        >
          导入
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
    <div class="settlement-type">
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
        <el-button
          type="primary"
          :icon="Upload"
          @click="importHandler('SUPPLIER_SETTLEMENT_WAY', 'MORTGAGE_TEMPLATE')"
        >
          导入
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
        <el-button @click="deleteItem" type="danger">删除</el-button>
        <el-button
          type="primary"
          v-if="editForm.status === 'SUPPLIER_DETAIL_STATUS_2'"
          @click="enableSupplier"
          >启用</el-button
        >
        <el-button
          type="primary"
          v-if="editForm.status === 'SUPPLIER_DETAIL_STATUS_1'"
          @click="stopSupplier"
          >停用</el-button
        >
        <el-button @click="clickButton">关闭</el-button>
      </span>
    </template>
  </el-dialog>
  <AccountForm ref="accountFormRef" @success="getAccountList" />
  <PersonForm ref="personFormRef" @success="getCityList" />
  <SettlementForm ref="settlementFormRef" @success="getSettlementList" />
  <ImportForm ref="importFormRef" :biztype="bizType" :category="category" />
</template>
<script lang="ts" setup>
import { watch, toRefs, reactive, ref, Ref, computed } from 'vue'
import { px2rem } from '@/utils'
import type { RecordType, ModelStateType, EditForm } from './type'
import { Delete, Upload, Plus } from '@element-plus/icons-vue'
import ImportForm from './ImportForm.vue'
import { PersonColumn, AccountColumn, SettlementColumn } from './data'
import type { CascaderProps, CascaderOption } from 'element-plus'
import Table from '@/components/Table/index.vue'
import AccountForm from './accountForm.vue'
import PersonForm from './personForm.vue'
import SettlementForm from './settlementForm.vue'
import type {
  DictItem,
  DictDataTreeResponse,
  EnableAccountRequest
} from '@/api'
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
    belongCompanyNames: [],
    supplierTypeNames: []
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
  accountModelVisible: false, // 结算方式弹窗
  accountTotal: 0, // 结算方式数据总数
  accountSize: 10,
  accountNo: 1
})
const {
  dialogVisible,
  editForm,
  step,
  personTableData,
  personTotal,
  settlementTableData,
  settlementTotal,
  accountTableData,
  accountTotal
} = toRefs(state)
// 表格最大高度
const searchBoxRef = ref()
const tableHeight = computed(() => {
  const baseHeight = Number(document.documentElement.clientHeight - 220)
  if (searchBoxRef.value?.clientHeight) {
    return Number(baseHeight - searchBoxRef.value?.clientHeight)
  } else {
    return baseHeight
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
const registerTypeStatus: Ref<DictItem[]> = ref([])
const dictStore = useDictStore()
const belongCompanyStatus = ref<DictDataTreeResponse[]>([])
const supplierDetailType: Ref<DictItem[]> = ref([])
const supplierDetailStatus: Ref<DictItem[]> = ref([])
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
  supplierDetailStatus.value = dictStore.dicts.SUPPLIER_DETAIL_STATUS
}
const queryAccount = reactive({
  supplierId: state.editForm.id,
  pageNo: 1,
  pageSize: 10
})
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
const getAccountList = async () => {
  const params = {
    supplierId: state.editForm.id as string
  }
  await SupplierApi.getAccountList(params)
    .then((res) => {
      if (res && res.code === 200) {
        accountTableData.value.splice(0, accountTableData.value.length)
        accountTableData.value.push(...(res?.data || []))
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const getCityList = async () => {
  const params = {
    supplierId: state.editForm.id || '',
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
watch(
  [() => props.visible, () => props.formValue],
  async ([newVisible, newValue]) => {
    state.step = 1
    state.dialogVisible = newVisible
    state.editForm = newValue as unknown as EditForm
    selCity.value = []
    selSettle.value = []
    if (newVisible) {
      await getDicts()
      await getAccountList()
      await getCityList()
      await getSettlementList()
    }
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
const accountFormRef = ref()
const addAccount = () => {
  accountFormRef.value.open(state.editForm.id, 'sid')
}
const editAccount = (val: string) => {
  accountFormRef.value.open(val)
}
const removeAccount = (id: string) => {
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
      SupplierApi.delAccount(params)
        .then((res) => {
          if (res && res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            getAccountList()
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
const enableAccount = (row: EnableAccountRequest) => {
  const params = {
    id: row.id,
    status: row.status === 0 ? 1 : 0
  }
  SupplierApi.enableAccount(params)
    .then((res) => {
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '更新成功'
        })
        getAccountList()
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
// step 2 城市联系人
// 新增
const personFormRef = ref()
const addPerson = () => {
  personFormRef.value.open(state.editForm.id, 'sid')
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
const clickButton = async () => {
  emit('closeModel', {
    visible: false,
    type: 'click-close'
  })
}
const importFormRef = ref()
const bizType = ref('')
const category = reactive({
  businessCategory: '',
  businessSubcategory: ''
})
const importHandler = (val1: string, val2: string) => {
  bizType.value = val1
  category.businessCategory = val2
  category.businessSubcategory = val1
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
const getStatus = (val: string) => {
  let label = ''
  dictStore.dicts.SUPPLIER_ACCOUNT_STATUS.forEach((item) => {
    if (item.value === String(val)) {
      label = item.label
    }
  })
  return label
}
const getFirstStatus = (val?: string) => {
  let label = ''
  if (supplierDetailStatus.value) {
    supplierDetailStatus.value.forEach((item) => {
      if (item.value === val) {
        label = item.label
      }
    })
  }
  return label
}
// 删除附件信息
const delOtherFile = (code: string) => {
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      const params = {
        supplierId: state.editForm.id,
        fileCodes: [code]
      }
      SupplierApi.deleteFiles(params)
        .then((res) => {
          if (res && res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            const param = {
              id: state.editForm.id
            }
            SupplierApi.supplierDetail(param).then((res) => {
              if (res && res.code === 200) {
                state.editForm.attachmentInfoList.splice(
                  0,
                  state.editForm.attachmentInfoList.length
                )
                state.editForm.attachmentInfoList.push(
                  ...(res?.data?.attachmentInfoList || [])
                )
              }
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err: Error) => {
      throw err
    })
}
const deleteItem = () => {
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 调用删除接口
      const params = {
        id: state.editForm.id as string
      }
      SupplierApi.supplierDelete(params).then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          emit('closeModel', {
            visible: false,
            type: 'click-close'
          })
          emit('success')
        }
      })
    })
    .catch((err: Error) => {
      throw err
    })
}
const enableSupplier = () => {
  const params = {
    id: state.editForm.id as string
  }
  SupplierApi.supplierEnable(params).then((res) => {
    if (res && res.code === 200) {
      dialogVisible.value = false
      ElMessage({
        type: 'success',
        message: '启用成功'
      })
      emit('success')
      emit('closeModel', {
        visible: false,
        type: 'click-close'
      })
    }
  })
}
const stopSupplier = () => {
  const params = {
    id: state.editForm.id as string
  }
  SupplierApi.supplierDisable(params).then((res) => {
    if (res && res.code === 200) {
      dialogVisible.value = false
      ElMessage({
        type: 'success',
        message: '停用成功'
      })
      emit('success')
      emit('closeModel', {
        visible: false,
        type: 'click-close'
      })
    }
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
.mb-5 {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
}
.bgc {
  background-color: rgb(89 140 255 / 4%);
}
.bfont {
  font-size: $base-font-size-bigger;
}
</style>
@/views/releaseOrMortgage/supplier/supplierManage/type@/views/releaseOrMortgage/supplier/supplierManage/data
