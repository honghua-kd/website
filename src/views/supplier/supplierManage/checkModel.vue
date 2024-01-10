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
              v-model="editForm.belongCompanyList"
              style="width: 100%"
              placeholder="请选择归属公司"
              multiple
            >
              <el-option
                v-for="item in belongCompanyStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
        <el-col :span="8">账户名称： {{ item.accountName }}</el-col>
        <el-col :span="8">银行账户： {{ item.bankAccount }}</el-col>
        <el-col :span="8">开户银行： {{ item.openBank }}</el-col>
        <el-col :span="8">支行： {{ item.subBank }}</el-col>
        <el-col :span="8"
          >开户银行区域：
          {{
            item.openBankProName +
            item.openBankCityName +
            item.openBankCountyName
          }}</el-col
        >
        <el-col :span="8">开户行行号： {{ item.openBankCode }}</el-col>
      </el-row>

      <div class="type-title">附件上传</div>
      <!-- 可选 fileCodes -->
      <el-row style="width: 100%">
        <el-form-item>
          <el-upload
            ref="upload"
            :show-file-list="true"
            :auto-upload="false"
            action="#"
            multiple
            v-model:file-list="fileList"
          >
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
    <div class="settlement-account">
      <h3 class="flex-start-center">
        供应商账号<el-icon
          style="margin: 0 0 2px 10px; cursor: pointer"
          color="#1890FF"
          size="18"
          @click="addAccount"
          ><CirclePlusFilled
        /></el-icon>
      </h3>

      <Table
        :data="accountTableData"
        :columnConfig="accountColumn"
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
        <template #action="scope">
          <template v-if="scope.row.id">
            <el-button link type="primary" @click="editAccount(scope.row)"
              >编辑</el-button
            >
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
        负责城市联系人<el-icon
          style="margin: 0 0 2px 10px; cursor: pointer"
          color="#1890FF"
          size="18"
          @click="addPerson"
          ><CirclePlusFilled
        /></el-icon>
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
        :columnConfig="personColumn"
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
        结算方式<el-icon
          style="margin: 0 0 2px 10px; cursor: pointer"
          color="#1890FF"
          size="18"
          @click="addSettlement"
          ><CirclePlusFilled
        /></el-icon>
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
        :columnConfig="settlementColumn"
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
        <el-button @click="clickButton">关闭</el-button>
      </span>
    </template>
  </el-dialog>

  <PersonForm ref="personFormRef" @success="getCityList" />
  <SettlementForm ref="settlementFormRef" @success="getSettlementList" />
</template>
<script lang="ts" setup>
import { watch, toRefs, reactive, ref, Ref, computed } from 'vue'
import { px2rem } from '@/utils'
import type {
  RecordType,
  ModelStateType
} from '@/views/supplier/supplierManage/type'
import { CirclePlusFilled } from '@element-plus/icons-vue'
import ImportForm from './ImportForm.vue'
import {
  PersonColumn,
  AccountColumn,
  SettlementColumn
} from '@/views/supplier/supplierManage/data'
import Table from '@/components/Table/index.vue'
import PersonForm from './personForm.vue'
import SettlementForm from './settlementForm.vue'
import type { DictItem } from '@/api'
import { ElMessageBox, ElMessage, ElForm } from 'element-plus'
import { SupplierAPI, CommonAPI } from '@/api'
import { useUserStore } from '@toystory/lotso'
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
  editForm: {}, // 表单数据
  step: 1, // 步骤
  cancelButtonText: '取消', // 取消按钮文案
  okButtonText: '下一步', // 确认按钮文案
  personColumn: PersonColumn, // 城市联系人表列
  personTableData: [], // 城市联系人数据
  personModelVisible: false, // 城市联系人弹窗
  personTotal: 0, // 城市联系人数据总数
  pagePersonSize: 10,
  pagePersonNo: 1,
  settlementColumn: SettlementColumn, // 结算方式表列
  settlementTableData: [], // 结算方式数据
  settlementModelVisible: false, // 结算方式弹窗
  settlementTotal: 0, // 结算方式数据总数
  pageSettleSize: 10,
  pageSettlenNo: 1,
  accountColumn: AccountColumn, // 结算方式表列
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
  cancelButtonText,
  okButtonText,
  personColumn,
  personTableData,
  personModelVisible,
  personTotal,
  settlementColumn,
  settlementTableData,
  settlementModelVisible,
  settlementTotal,
  accountTableData,
  accountColumn,
  accountTotal
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
const belongCompanyStatus = ref([])
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
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  registerTypeStatus.value = dictStore.dicts.SUPPLIER_REGISTER_TYPE
  supplierDetailType.value = dictStore.dicts.SUPPLIER_DETAIL_TYPE
}
const queryAccount = reactive({
  supplierId: state.editForm.supplierId,
  pageNo: 1,
  pageSize: 10
})
const queryPerson = reactive({
  supplierId: state.editForm.supplierId,
  provinceName: '',
  cityName: '',
  pageNo: 1,
  pageSize: 10
})
const querySettle = reactive({
  supplierId: state.editForm.supplierId,
  provinceName: '',
  cityName: '',
  pageNo: 1,
  pageSize: 10
})
const cascaderCity = ref()
const cascaderSettle = ref()
const getAccountList = async () => {
  const params = {
    supplierId: state.editForm.id
    // supplierId: '1744999920903254018',
  }
  await SupplierApi.getAccountList(params)
    .then((res) => {
      if (res && res.code === 200) {
        accountTableData.value.splice(0, accountTableData.value.length)
        accountTableData.value.push(...(res?.data?.list || []))
        accountTotal.value = res?.data?.total || 0
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
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
watch(
  [() => props.visible, () => props.formValue],
  async ([newVisible, newValue]) => {
    state.step = 1
    state.dialogVisible = newVisible
    state.editForm = newValue
    await getDicts()
    await getCityList()
    await getSettlementList()
  }/* ,
  {
    immediate: true
  } */
)
watch(step, (newValue) => {
  console.log(newValue)
  state.cancelButtonText = newValue === 1 ? '取消' : '上一步'
  state.okButtonText = newValue === 3 ? '确认' : '下一步'
})
const accountFormRef = ref()
const addAccount = () => {
  accountFormRef.value.open()
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
// step 2 城市联系人
// 新增
const personFormRef = ref()
const addPerson = () => {
  // personFormRef.value.open(state.editForm.supplierId, 'sid')
  personFormRef.value.open('1744999920903254018', 'sid')
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
  // settlementFormRef.value.open(state.editForm.supplierId, 'sid')
  settlementFormRef.value.open('1744999920903254018', 'sid')
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
const fileList = ref<UploadUserFile[]>([])
const userStore = useUserStore()
const tenantUser = ref<string>('')
const cascaderArea = ref()
const submitForm = async () => {
  let fileCodes: string[] = []
  if (fileList.value.length) {
    tenantUser.value = userStore.userInfo?.staffCode as string
    const formData = new FormData()
    fileList.value.forEach((item) => {
      formData.append('file', item.raw as File)
    })
    formData.append('tenantUser', tenantUser.value)
    formData.append('prefixPath', 'supplier')
    formData.append('expireDays', '-1')
    const firstRes = await CommonApi.uploadFilesBatch(formData)
    if (firstRes && firstRes.code === 200) {
      fileCodes = firstRes.data?.fileCodes || []
    }
  }
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
    fileCodes: fileCodes
  }
  SupplierApi.addSupplier(sparams)
    .then((res) => {
      if (res && res.code === 200) {
        state.editForm.supplierId = res.data
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
