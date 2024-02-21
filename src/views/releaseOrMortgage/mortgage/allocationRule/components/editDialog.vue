<template>
  <div>
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      :before-close="handleClose"
    >
      <div class="second-title">基础信息</div>
      <el-form
        ref="formRef"
        :model="formParams"
        v-loading="formLoading"
        :label-width="px2rem('120px')"
        :rules="rules"
        label-position="top"
        inline
      >
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-form-item
              label="规则名称"
              prop="allocationRuleName"
              align="center"
              :rules="[{ required: true, message: '规则名称不能为空' }]"
            >
              <el-input
                v-model="formParams.allocationRuleName"
                placeholder="请输入"
                clearable
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="任务类型"
              prop="taskType"
              :rules="[{ required: true, message: '任务类型不能为空' }]"
            >
              <el-select
                v-model="formParams.taskType"
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
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-form-item label="数据来源" prop="sourceSystem" align="center">
              <el-cascader
                popper-class="first-no-check-cascader"
                :options="sourceArr"
                clearable
                placeholder="请选择"
                @change="selectSourceSystem"
                v-model="sourceSystem"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="城市" prop="areaCode" align="center">
              <el-cascader
                ref="cascader"
                clearable
                :options="casOption"
                :props="cityProps"
                filterable
                v-model="selCity"
                style="width: 100%"
                @change="changeArea"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="second-title">分配规则</div>
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-form-item
              label="分配类型"
              prop="allocationType"
              align="center"
              :rules="[{ required: true, message: '分配类型不能为空' }]"
            >
              <el-select
                v-model="formParams.allocationType"
                clearable
                placeholder="请选择"
                style="width: 100%"
                @change="changeType"
              >
                <el-option
                  v-for="item in allocatonTypeOpts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="supOrDept">
            <el-form-item label="分配人员" align="center" prop="alPerson">
              <el-select
                ref="selectRef"
                v-model="alPerson"
                @visible-change="visibleType"
                clearable
                placeholder="请选择"
                style="width: 100%"
                multiple
                :disabled="disDialog"
              >
              </el-select>
              <div>
                <el-dialog
                  title="供应商"
                  v-model="isSupplier"
                  width="40%"
                  :append-to-body="false"
                  append-to=""
                  :modal="false"
                  draggable
                >
                  <div>
                    <div style="display: flex">
                      <el-input
                        v-model="querySupplierParams.supplierName"
                        placeholder="请输入关键词"
                      >
                      </el-input>
                      <el-button
                        clearable
                        type="primary"
                        style="margin-left: 10px"
                        @click="searchSupplier"
                        >查询</el-button
                      >
                    </div>
                    <Table
                      ref="tableSupplierRef"
                      :data="tableSupplierData"
                      :columnConfig="tableSupplierConfig"
                      :isSelected="true"
                      :setColumnEnable="false"
                      :page-total="pageSupplierTotal"
                      v-model:pageSize="querySupplierParams.pageSize"
                      v-model:pageNo="querySupplierParams.pageNo"
                      @selection-change="selectionChangeHandler"
                      @size-change="getSupplier"
                      @current-change="getSupplier"
                    >
                      <template #default="{ row, prop }">
                        <span v-if="prop === 'status'">
                          {{ getStatus(row[prop]) }}
                        </span>
                      </template>
                    </Table>
                  </div>
                  <template #footer>
                    <div style="text-align: center">
                      <el-button @click="isSupplier = false">取 消</el-button>
                      <el-button type="primary" @click="submitSupplier">
                        确 认
                      </el-button>
                    </div>
                  </template>
                </el-dialog>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="!supOrDept">
            <el-form-item label="分配人员" align="center" prop="alEmployee">
              <el-select
                ref="selectDeptRef"
                v-model="alEmployee"
                @visible-change="visibleDept"
                clearable
                placeholder="请选择"
                style="width: 100%"
                multiple
                :disabled="disDialog"
              >
              </el-select>
              <div>
                <el-dialog
                  title="业务运营部"
                  v-model="isEmployee"
                  width="60%"
                  :append-to-body="false"
                  append-to=""
                  :modal="false"
                  draggable
                >
                  <el-row v-if="selectEmployeeName.length">
                    已选：{{ selectEmployeeName.join(',') }}
                  </el-row>
                  <div style="display: flex; margin-top: 5px">
                    <el-card style="margin-right: 10px; width: 22%">
                      <SideTree
                        height="500px"
                        @getSelect="getSelectNodeHandler"
                      />
                    </el-card>
                    <el-card style="width: 74%">
                      <Table
                        :data="tableEmployeeData"
                        :columnConfig="tableEmployeeConfig"
                        :isSelected="true"
                        :setColumnEnable="false"
                        :page-total="pageTotal"
                        v-model:pageSize="queryParams.pageSize"
                        v-model:pageNo="queryParams.pageNo"
                        @selection-change="selectionEmployeeChangeHandler"
                        @size-change="getDeptStaffList"
                        @current-change="getDeptStaffList"
                      ></Table>
                    </el-card>
                  </div>

                  <template #footer>
                    <div style="text-align: center">
                      <el-button @click="isEmployee = false">取 消</el-button>
                      <el-button type="primary" @click="submitEmployee">
                        确 认
                      </el-button>
                    </div>
                  </template>
                </el-dialog>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-form-item
              label="是否自动分配"
              prop="isAutoAllocation"
              align="center"
              :rules="[{ required: true, message: '是否自动分配不能为空' }]"
            >
              <el-select
                v-model="formParams.isAutoAllocation"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in isAutoAllocationOpts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="是否发送短信"
              prop="isSendSms"
              align="center"
              :rules="[{ required: true, message: '是否发送短信不能为空' }]"
            >
              <el-select
                v-model="formParams.isSendSms"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in isSendSmsOpts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-form-item
              label="短信模版"
              prop="smsTemplateCode"
              align="center"
              :rules="[{ required: smsTemplate, message: '短信模版不能为空' }]"
            >
              <el-select
                v-model="formParams.smsTemplateCode"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in smsTemplateCodeOpts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          :disabled="formLoading"
          type="primary"
          @click="submitForm"
          :loading="btnLoading"
        >
          确 定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref, watch, toRefs, computed, nextTick } from 'vue'
import { px2rem } from '@/utils'
import SideTree from './SideTree.vue'
import type { InternalRuleItem } from 'async-validator'
import { ElForm, ElMessage, FormRules } from 'element-plus'
import Table from '@/components/Table/index.vue'
import type {
  DictItem,
  RuleItemResponse,
  DictDataTreeResponse,
  SupplierListResponse,
  OrgInfoItem,
  StaffListItem,
  BaseStaffRequest,
  PageRequest
} from '@/api'
import type { SmsTemplateRequest, queryForm } from '../type'
import { tableEmployeeConfig, tableSupplierConfig } from '../data'
import { CommonAPI, RuleAPI, MessageAPI, SupplierAPI, SystemAPI } from '@/api'
const CommonApi = new CommonAPI()
const RuleApi = new RuleAPI()
const MessageApi = new MessageAPI()
const SupplierApi = new SupplierAPI()
const SystemApi = new SystemAPI()
import type { CascaderProps, CascaderOption, CascaderValue } from 'element-plus'
import { useDictStore } from '@/store/dict'
const dialogVisible: Ref<boolean> = ref(false)
const formLoading: Ref<boolean> = ref(false)
const casOption = ref([])
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  formValue: {
    type: Object,
    default: () => ({})
  },
  visible: {
    type: Boolean,
    default: true
  }
})
interface ExtraParam {
  areaCode: string[]
  sourceSystem: string[]
  alPerson: string[]
  alEmployee: string[]
}
type RuleItem = RuleItemResponse & ExtraParam
interface State {
  formParams: RuleItem
}
const state = reactive<State>({
  formParams: {
    allocationRuleCode: '',
    allocationRuleName: '',
    taskType: '',
    sourceSystem1: '',
    sourceSystem2: '',
    cityCode: '',
    cityName: '',
    allocationType: '',
    allocationUserCode: '',
    allocationUserName: '',
    isAutoAllocation: 0,
    isSendSms: 0,
    smsTemplateCode: '',
    isUsed: 0,
    provinceCode: '',
    provinceName: '',
    areaCode: [],
    sourceSystem: [],
    alPerson: [],
    alEmployee: []
  }
})
const { formParams } = toRefs(state)
const rules = reactive<FormRules<typeof formParams>>({
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
          callback(new Error('请选择省市'))
        }
      },
      trigger: 'change',
      required: true
    }
  ],
  sourceSystem: [
    {
      validator: (
        rule: InternalRuleItem,
        value: string[] | undefined,
        callback: (error?: string | Error | undefined) => void
      ) => {
        if (value && value?.length) {
          callback()
        } else {
          callback(new Error('请选择数据来源'))
        }
      },
      trigger: 'change',
      required: true
    }
  ],
  alPerson: [
    {
      validator: (
        rule: InternalRuleItem,
        value: string[] | undefined,
        callback: (error?: string | Error | undefined) => void
      ) => {
        if (value && value?.length) {
          callback()
        } else {
          callback(new Error('请选择分配人员'))
        }
      },
      trigger: 'change',
      required: true
    }
  ],
  alEmployee: [
    {
      validator: (
        rule: InternalRuleItem,
        value: string[] | undefined,
        callback: (error?: string | Error | undefined) => void
      ) => {
        if (value && value?.length) {
          callback()
        } else {
          callback(new Error('请选择分配人员'))
        }
      },
      trigger: 'change',
      required: true
    }
  ]
})
const changeArea = (val: CascaderValue) => {
  val = val as string[]
  if (val?.length) {
    state.formParams.areaCode = [String(val[0]), String(val[1])]
  } else {
    state.formParams.areaCode = []
  }
}
const formRef = ref<InstanceType<typeof ElForm>>()
const isAutoAllocationOpts = ref([
  {
    label: '是',
    value: 1
  },
  {
    label: '否',
    value: 0
  }
])
const isSendSmsOpts = ref([
  {
    label: '是',
    value: 1
  },
  {
    label: '否',
    value: 0
  }
])
const cascader = ref()
const btnLoading = ref<boolean>(false)
const submitForm = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  if (state.formParams.allocationType === 'MORTGAGE_ALLOCATION_TYPE_SUPPLIER') {
    // 供应商
    state.formParams.allocationUserName = alPerson.value?.length
      ? alPerson.value.join()
      : ''
    const codeArr: string[] = []
    alPerson.value.forEach((option) => {
      tableSupplierData.forEach((item) => {
        if (option === item.supplierName) {
          codeArr.push(item.supplierCode as string)
        }
      })
    })
    state.formParams.allocationUserCode = codeArr.length
      ? codeArr.join(',')
      : alPersonCode.value.join(',')
  } else {
    // 业务运营部
    state.formParams.allocationUserName = alEmployee.value?.length
      ? alEmployee.value.join()
      : ''
    const empIds: string[] = []
    selectEmployeeIds.value.forEach((option) => {
      tableEmployeeData.forEach((item) => {
        if (item.staffName === option) {
          empIds.push(item.staffCode as string)
        }
      })
    })
    state.formParams.allocationUserCode = empIds.length
      ? empIds.join(',')
      : alEmployeeCode.value.join(',')
  }
  state.formParams.sourceSystem1 = sourceSystem.value[0]
  state.formParams.sourceSystem2 = sourceSystem.value[1]
  state.formParams.provinceName =
    cascader.value.getCheckedNodes()[0]?.pathLabels[0] || ''
  state.formParams.cityName =
    cascader.value.getCheckedNodes()[0]?.pathLabels[1] || ''

  const params = {
    allocationRuleCode: state.formParams.allocationRuleCode,
    allocationRuleName: state.formParams.allocationRuleName,
    taskType: state.formParams.taskType,
    sourceSystem1: state.formParams.sourceSystem1,
    sourceSystem2: state.formParams.sourceSystem2,
    cityCode: String(selCity.value[1]),
    cityName: state.formParams.cityName,
    allocationType: state.formParams.allocationType || '',
    allocationUserCode: state.formParams.allocationUserCode,
    allocationUserName: state.formParams.allocationUserName,
    isAutoAllocation: state.formParams.isAutoAllocation,
    isSendSms: state.formParams.isSendSms,
    smsTemplateCode: state.formParams.smsTemplateCode || '',
    isUsed: state.formParams.isUsed,
    provinceCode: String(selCity.value[0]),
    provinceName: state.formParams.provinceName
  }
  btnLoading.value = true
  RuleApi.editRule(params)
    .then((res) => {
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '更新成功'
        })
        btnLoading.value = false
        emit('success')
        emit('closeModel', { visible: false })
      }
    })
    .catch((err: Error) => {
      btnLoading.value = false
      throw err
    })
}
const changeType = () => {
  alPerson.value = []
  alEmployee.value = []
}
const sourceArr = ref<CascaderOption[]>([])
const getDictsListData = async () => {
  const params = {
    dictType: 'SOURCE_SYSTEM'
  }
  const res = await CommonApi.getDictTreeList(params)
  if (res && res.code === 200) {
    if (res.data) {
      const result: CascaderOption[] = []
      res.data.forEach((i: DictDataTreeResponse) => {
        const obj: CascaderOption = {
          label: i.label as string,
          value: i.value as string,
          children: []
        }
        i.children?.forEach((j: DictDataTreeResponse) => {
          obj.children?.push({
            label: j.label as string,
            value: j.value as string
          })
        })
        result.push(obj)
      })
      sourceArr.value = result
    }
  }
}
const selectSourceSystem = (value: CascaderValue) => {
  value = value as string[]
  if (value) {
    state.formParams.sourceSystem1 = String(value[0])
    state.formParams.sourceSystem2 = String(value[1])
    state.formParams.sourceSystem = [String(value[0]), String(value[1])]
  } else {
    sourceSystem.value = []
    state.formParams.sourceSystem = []
  }
}
const cityProps: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const nodes: CascaderOption[] = [] // 动态节点
    const { level } = node
    if (level === 0) {
      const resParent = await CommonApi.getAllProvince()
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
      const res = await CommonApi.getProvinceChildren(params)
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
const sourceSystem = ref<string[]>([])
const selCity = ref<string[] | number[]>([])
const alPersonCode = ref<string[]>([])
const alEmployeeCode = ref<string[]>([])
const initOptions = async () => {
  sourceSystem.value = [
    state.formParams.sourceSystem1,
    state.formParams.sourceSystem2
  ]
  state.formParams.sourceSystem = [
    state.formParams.sourceSystem1,
    state.formParams.sourceSystem2
  ]
  selCity.value = [
    Number(state.formParams.provinceCode),
    Number(state.formParams.cityCode)
  ]
  state.formParams.areaCode = [
    state.formParams.provinceCode,
    state.formParams.cityCode
  ]
  alPerson.value = state.formParams.allocationUserName
    ? state.formParams.allocationUserName.split(',')
    : []
  alPersonCode.value = state.formParams.allocationUserCode
    ? state.formParams.allocationUserCode.split(',')
    : []
  alEmployee.value = state.formParams.allocationUserName
    ? state.formParams.allocationUserName.split(',')
    : []
  alEmployeeCode.value = state.formParams.allocationUserCode
    ? state.formParams.allocationUserCode.split(',')
    : []
}
watch(
  [() => props.visible, () => props.formValue],
  ([newVisible, newValue]) => {
    state.formParams = { ...newValue } as RuleItem
    dialogVisible.value = Boolean(newVisible)
    if (newVisible) {
      getDicts()
      getDictsListData()
      initOptions()
    }
  },
  { deep: true }
)
interface Option {
  label: string
  value: string
}
const smsTemplateCodeOpts = ref<Option[]>([])
watch(
  () => sourceSystem,
  (val) => {
    if (val && val.value) {
      let sName1 = ''
      let sName2 = ''
      sourceArr.value.forEach((option) => {
        option.children?.forEach((item) => {
          if (item.value === state.formParams.sourceSystem1) {
            sName2 = option.label as string
          }
        })
        if (option.value === state.formParams.sourceSystem1) {
          sName1 = option.label as string
        }
      })
      const params: SmsTemplateRequest = {
        pageNo: 1,
        pageSize: 10,
        bizType: '',
        templateCode: '',
        templateName: '',
        sourceSystem12List: []
      }
      params.sourceSystem12List = [
        {
          label: sName1,
          value: state.formParams.sourceSystem1,
          children: [
            {
              label: sName2,
              value: state.formParams.sourceSystem2
            }
          ]
        }
      ]
      MessageApi.getSmsTemplatePage(params).then((res) => {
        if (res && res.code === 200) {
          smsTemplateCodeOpts.value = res?.data?.list.map((o) => {
            return {
              label: o.templateName,
              value: o.templateCode
            }
          }) as Option[]
        }
      })

      getSupplier()
    }
  },
  {
    deep: true
  }
)
const alPerson = ref<string[]>([])
const supOrDept = ref(false)
const disDialog = ref(false)
watch(
  () => state.formParams.allocationType,
  (val1) => {
    if (!val1) {
      disDialog.value = true
    } else {
      disDialog.value = false
    }
    const option = allocatonTypeOpts.value?.find(
      (o) => o.value === val1
    ) as DictItem
    const label = option ? option.label : ''
    if (label === '供应商') {
      supOrDept.value = true
      getSupplier()
    } else if (label === '业务运营部') {
      supOrDept.value = false
    }
  },
  {
    deep: true
  }
)
const curNode = ref('')
// 获取选中节点code
const getSelectNodeHandler = (node: OrgInfoItem) => {
  const orgCode = node?.orgCode || ''
  curNode.value = orgCode
  getDeptStaffList()
}
const queryParams = reactive<PageRequest & BaseStaffRequest>({
  pageNo: 1,
  pageSize: 10,
  staffName: '', // 员工姓名
  staffCode: '' // 员工工号
})
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const tableEmployeeData = reactive<StaffListItem[]>([]) // 列表数据
// 获取分页部门员工列表
const getDeptStaffList = () => {
  const params = {
    orgCodeList: [curNode.value],
    pageNo: queryParams.pageNo,
    pageSize: queryParams.pageSize
  }
  SystemApi.getDepartmentStaff(params)
    .then((res) => {
      if (res && res.code === 200) {
        tableEmployeeData.splice(0, tableEmployeeData.length)
        tableEmployeeData.push(...(res?.data?.records || []))
        pageTotal.value = res?.data?.total || 0
      }
    })
    .catch((err: Error) => {
      console.log(err)
    })
}
const tableSupplierData = reactive<SupplierListResponse[]>([])
const pageSupplierTotal = ref(0)
const querySupplierParams = reactive<queryForm>({
  supplierName: '',
  belongCompany: '',
  provinceCode: '',
  cityCode: '',
  countyCode: '',
  status: '',
  expireDateStart: '',
  expireDateEnd: '',
  innerInterfaceStaffCode: '',
  supplierType: '',
  pageNo: 1,
  pageSize: 10
})
const getSupplier = () => {
  const params: queryForm = {
    supplierName: querySupplierParams.supplierName,
    belongCompany: sourceSystem.value ? sourceSystem.value[0] : '',
    provinceCode: '',
    cityCode: '',
    countyCode: '',
    status: '',
    expireDateStart: '',
    expireDateEnd: '',
    innerInterfaceStaffCode: '',
    supplierType: '',
    pageNo: querySupplierParams.pageNo,
    pageSize: querySupplierParams.pageSize
  }
  SupplierApi.getSupplierList(params)
    .then((res) => {
      if (res && res.code === 200) {
        tableSupplierData.splice(0, tableSupplierData.length)
        tableSupplierData.push(...(res?.data?.list || []))
        pageSupplierTotal.value = res?.data?.total || 0
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const selectRef = ref()
const isSupplier = ref(false)
const visibleType = () => {
  isSupplier.value = true
  nextTick(() => {
    selectRef.value.blur()
  })
}
const tableSupplierRef = ref()
watch(isSupplier, (val) => {
  if (val) {
    nextTick(() => {
      tableSupplierRef!.value.clearSelection()
      tableSupplierData.forEach((row) => {
        alPerson.value.forEach((item) => {
          if (row.supplierName === item) {
            tableSupplierRef!.value.toggleRowSelection(row, true)
          }
        })
      })
    })
  }
})
const alEmployee = ref<string[]>([])
const selectDeptRef = ref()
const isEmployee = ref(false)
const visibleDept = () => {
  isEmployee.value = true
  nextTick(() => {
    selectDeptRef.value.blur()
  })
}
const smsTemplate = ref<boolean>(true)
watch(
  () => state.formParams.isSendSms,
  (val) => {
    smsTemplate.value = Boolean(val)
  },
  {
    immediate: true
  }
)
watch(
  () => alPerson,
  (val) => {
    state.formParams.alPerson = [...val.value]
  },
  {
    deep: true
  }
)
watch(
  () => alEmployee,
  (val) => {
    state.formParams.alEmployee = [...val.value]
  },
  {
    deep: true
  }
)
const getStatus = (val: string) => {
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
const searchSupplier = () => {
  querySupplierParams.pageNo = 1
  getSupplier()
}
const selectData = ref<SupplierListResponse[]>([])
// 选择的数据
const selectionChangeHandler = (item: SupplierListResponse[]) => {
  selectData.value.splice(0, selectData.value.length)
  selectData.value.push(...item)
}
const selectIds = computed(() => {
  const ids: string[] = []
  selectData.value.forEach((item) => {
    if (item.id) {
      ids.push(item.supplierName as string)
    }
  })
  return ids
})
const selectEmployeeData = ref<StaffListItem[]>([])
// 选择的数据
const selectionEmployeeChangeHandler = (item: StaffListItem[]) => {
  selectEmployeeData.value.splice(0, selectEmployeeData.value.length)
  selectEmployeeData.value.push(...item)
}
const selectEmployeeIds = computed(() => {
  const ids: string[] = []
  selectEmployeeData.value.forEach((item) => {
    ids.push(item.staffName as string)
  })
  return ids
})
const selectEmployeeName = computed(() => {
  const ids: string[] = []
  selectEmployeeData.value.forEach((item) => {
    const label = item.org1Name + '-' + item.staffName
    ids.push(label)
  })
  return ids
})

const submitEmployee = () => {
  alEmployee.value = [...selectEmployeeIds.value]

  isEmployee.value = false
  selectDeptRef.value.blur()
}
const submitSupplier = () => {
  alPerson.value = [...selectIds.value]
  isSupplier.value = false
  selectRef.value.blur()
}
const emit = defineEmits(['closeModel', 'success'])
const handleClose = () => {
  emit('closeModel', {
    visible: false
  })
}
const dictStore = useDictStore()
const taskTypeOpts: Ref<DictItem[]> = ref([])
const allocatonTypeOpts: Ref<DictItem[]> = ref([])
const supplierDetailStatus: Ref<DictItem[]> = ref([])
const getDicts = () => {
  taskTypeOpts.value = dictStore.dicts.MORTGAGE_TASK_TYPE
  allocatonTypeOpts.value = dictStore.dicts.MORTGAGE_ALLOCATION_TYPE
  supplierDetailStatus.value = dictStore.dicts.SUPPLIER_DETAIL_STATUS
}
</script>

<style lang="scss">
.first-no-check-cascader {
  .el-cascader-panel {
    .el-cascader-menu:first-child {
      .el-cascader-node {
        .el-checkbox {
          display: none !important;
        }
      }
    }
  }
}
.second-title {
  margin-bottom: 20px;
  font-size: $base-font-size-big;
}
.city-select {
  margin-left: 1%;
  width: 48%;
}
:deep(.el-dialog__header) {
  text-align: initial;
}
.base-title {
  margin-bottom: 20px;
}
</style>
