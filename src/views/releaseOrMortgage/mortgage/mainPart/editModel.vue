<template>
  <el-dialog
    class="main-part-model"
    v-model="dialogVisible"
    :title="dialogTitle"
    width="600px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleClose"
  >
    <div>
      <el-form
        ref="ruleFormRef"
        :rules="rules"
        :model="editForm"
        label-width="120px"
      >
        <el-form-item
          label="名称"
          width="500"
          prop="mortgageSubjectName"
          required
        >
          <el-input
            :maxlength="50"
            placeholder="请输入"
            v-model="editForm.mortgageSubjectName"
            clearable
          />
        </el-form-item>
        <el-form-item label="条件" required prop="mortgageSubjectType">
          <el-radio-group
            v-model="editForm.mortgageSubjectType"
            @change="changeType"
            class="ml-4"
          >
            <el-radio
              v-for="item in mortgageSubjectOptions"
              :key="(item.value as string)"
              :label="(item.value as string)"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="editForm.mortgageSubjectType === 'MORTGAGE_SUBJECT_CONTRACT'"
          label="合同主体"
          prop="contractSubject"
          :required="
            editForm.mortgageSubjectType === 'MORTGAGE_SUBJECT_CONTRACT'
          "
        >
          <el-select
            placeholder="请选择"
            v-model="editForm.contractSubject"
            multiple
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="item in contractSubjectOptions"
              :key="(item.value as string)"
              :label="(item.label as string)"
              :value="(item.value as string)"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="editForm.mortgageSubjectType === 'MORTGAGE_CAPITAL_INFO'"
          label="资方信息"
          prop="capitalInfo"
          :required="editForm.mortgageSubjectType === 'MORTGAGE_CAPITAL_INFO'"
        >
          <el-select
            placeholder="请选择"
            v-model="editForm.capitalInfo"
            multiple
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="item in mortgageCapitalOptions"
              :key="(item.value as string)"
              :label="(item.label as string)"
              :value="(item.value as string)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="组织机构代码" prop="organizationCode" required>
          <el-input
            :maxlength="50"
            placeholder="请输入"
            v-model="editForm.organizationCode"
            clearable
          />
        </el-form-item>
        <el-form-item label="全称" prop="mortgageSubjectAllName" required>
          <el-input
            :maxlength="50"
            placeholder="请输入"
            v-model="editForm.mortgageSubjectAllName"
            clearable
          />
        </el-form-item>
        <el-form-item label="注册地址" prop="registeredAddress" required>
          <el-input
            :maxlength="100"
            placeholder="请输入"
            v-model="editForm.registeredAddress"
            clearable
          />
        </el-form-item>
        <span style="font-size: 0.9375rem; font-weight: bolder">联系地址</span>
        <el-form-item label="省/市">
          <AreaCasder :value="areaCode" @changeAreaData="changeAreaData" />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            :maxlength="100"
            placeholder="请输入"
            v-model="editForm.contactAddressDetail"
            clearable
          />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人">
              <el-input
                :maxlength="50"
                placeholder="请输入"
                v-model="editForm.contactName"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="contactPhone">
              <!-- <el-input
                :maxlength="50"
                type="number"
                placeholder="请输入"
                onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                v-model="editForm.contactPhone"
                clearable
              /> -->
              <el-input
                :maxlength="50"
                placeholder="请输入"
                v-model="editForm.contactPhone"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          @click="onCloseModel(ruleFormRef, 'update-close')"
          >确 定</el-button
        >
        <el-button @click="onCloseModel(ruleFormRef, 'click-close')"
          >取 消</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { watch, toRefs, reactive, ref } from 'vue'
import type { ModelStateType } from './type'
import type { MortgageSubjectDetailResponse } from '@/api/mainPart/types/response'
import type { FormInstance, FormRules } from 'element-plus'
import type { InternalRuleItem } from 'async-validator'
import AreaCasder from '@/components/AreaCascader/index.vue'
import type { DictListItem, MortgageSubjectAddEditRequest } from '@/api'
import { MainPartAPI } from '@/api'
const API = new MainPartAPI()

type ModelPropsType = {
  visible: boolean
  formValue: MortgageSubjectDetailResponse
  title: string
  contractSubjectOptions: DictListItem[]
  mortgageCapitalOptions: DictListItem[]
  mortgageSubjectOptions: DictListItem[]
}
const props = withDefaults(defineProps<ModelPropsType>(), {
  visible: false,
  formValue: () => ({
    mortgageSubjectAllName: '',
    mortgageSubjectName: '',
    mortgageSubjectType: '',
    organizationCode: '',
    registeredAddress: ''
  }),
  title: ''
})

const state = reactive<ModelStateType>({
  dialogVisible: false,
  editForm: {
    mortgageSubjectAllName: '',
    mortgageSubjectName: '',
    mortgageSubjectType: '',
    organizationCode: '',
    registeredAddress: '',
    contractSubject: [],
    capitalInfo: []
  },
  dialogTitle: '',
  areaCode: []
})
const { dialogVisible, editForm, dialogTitle, areaCode } = toRefs(state)
watch(
  [() => props.visible, () => props.formValue, () => props.title],
  ([newVisible, newValue, newTitle]) => {
    state.dialogVisible = newVisible
    state.editForm = newValue
    state.dialogTitle = newTitle
    if (newTitle === '新增') {
      state.areaCode = []
      state.editForm.contractSubject = []
      state.editForm.capitalInfo = []
    } else {
      state.editForm.contractSubject = newValue.contractSubject
        ? newValue.contractSubject
        : []
      state.editForm.capitalInfo = newValue.capitalInfo
        ? newValue.capitalInfo
        : []
      if (
        newValue.contactAddressProvinceCode &&
        newValue.contactAddressProvinceCode !== '' &&
        newValue.contactAddressCityCode &&
        newValue.contactAddressCityCode !== ''
      ) {
        state.areaCode = [
          newValue.contactAddressProvinceCode,
          newValue.contactAddressCityCode
        ]
      }
    }
  },
  {
    immediate: true
  }
)

// 表单验证
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof editForm>>({
  mortgageSubjectName: [
    {
      required: true,
      message: '请输入名称',
      trigger: 'blur'
    }
  ],
  mortgageSubjectType: [
    {
      required: true,
      message: '请选择条件',
      trigger: 'change'
    }
  ],
  organizationCode: [
    {
      required: true,
      message: '请输入组织机构代码',
      trigger: 'blur'
    }
  ],
  mortgageSubjectAllName: [
    {
      required: true,
      message: '请输入全称',
      trigger: 'blur'
    }
  ],
  registeredAddress: [
    {
      required: true,
      message: '请输入注册地址',
      trigger: 'blur'
    }
  ],
  contractSubject: [
    {
      validator: (
        rule: InternalRuleItem,
        value: string[] | undefined,
        callback: (error?: string | Error | undefined) => void
      ) => {
        if (!value || value.length === 0) {
          callback(new Error('请选择'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  capitalInfo: [
    {
      validator: (
        rule: InternalRuleItem,
        value: string[] | undefined,
        callback: (error?: string | Error | undefined) => void
      ) => {
        if (!value || value.length === 0) {
          callback(new Error('请选择'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  contactPhone: [
    {
      validator: (
        rule: InternalRuleItem,
        value: string | undefined,
        callback: (error?: string | Error | undefined) => void
      ) => {
        // const reg = /^1[3456789]\d{9}$/
        const reg = /^[0-9]+$/
        if (value && value !== '' && !reg.test(value)) {
          callback(new Error('请正确输入联系电话'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

// 切换条件
const changeType = (value: string | number | boolean) => {
  console.log(value)
  // if (value === 'MORTGAGE_SUBJECT_HIGH_TECH_SMALL_LOAN') {
  // state.editForm.contractSubject = []
  // }
}

// 切换城市
const changeAreaData = ({
  provinceCode,
  provinceName,
  cityCode,
  cityName
}: {
  provinceCode: string
  provinceName: string
  cityCode: string
  cityName: string
}) => {
  state.editForm.contactAddressProvinceCode = provinceCode
  state.editForm.contactAddressCityCode = cityCode
  state.editForm.contactAddressProvinceName = provinceName
  state.editForm.contactAddressCityName = cityName
}

const emit = defineEmits<{
  (e: 'closeModel', { visible, type }: { visible: boolean; type: string }): void
}>()
const handleClose = () => {
  emit('closeModel', {
    visible: false,
    type: 'click-close'
  })
}
const addOrEditparams = reactive<MortgageSubjectAddEditRequest>({
  mortgageSubjectAllName: '',
  mortgageSubjectName: '',
  mortgageSubjectType: '',
  organizationCode: '',
  registeredAddress: '',
  contractSubject: [],
  capitalInfo: []
})

// 弹窗 取消/确定
const onCloseModel = async (formEl: FormInstance | undefined, type: string) => {
  if (type === 'click-close') {
    emit('closeModel', {
      visible: false,
      type
    })
    return
  }
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (type === 'update-close') {
        addOrEditparams.mortgageSubjectAllName =
          state.editForm.mortgageSubjectAllName
        addOrEditparams.mortgageSubjectName = state.editForm.mortgageSubjectName
        addOrEditparams.mortgageSubjectType = state.editForm.mortgageSubjectType
        addOrEditparams.organizationCode = state.editForm.organizationCode
        addOrEditparams.registeredAddress = state.editForm.registeredAddress
        addOrEditparams.contractSubject =
          state.editForm.mortgageSubjectType === 'MORTGAGE_SUBJECT_CONTRACT'
            ? state.editForm.contractSubject
            : []
        addOrEditparams.capitalInfo =
          state.editForm.mortgageSubjectType === 'MORTGAGE_CAPITAL_INFO'
            ? state.editForm.capitalInfo
            : []
        addOrEditparams.contactAddressProvinceCode =
          state.editForm.contactAddressProvinceCode
        addOrEditparams.contactAddressProvinceName =
          state.editForm.contactAddressProvinceName
        addOrEditparams.contactAddressCityCode =
          state.editForm.contactAddressCityCode
        addOrEditparams.contactAddressCityName =
          state.editForm.contactAddressCityName
        addOrEditparams.contactAddressDetail =
          state.editForm.contactAddressDetail
        addOrEditparams.contactName = state.editForm.contactName
        addOrEditparams.contactPhone = state.editForm.contactPhone
        if (
          state.editForm.mortgageSubjectType ===
          'MORTGAGE_SUBJECT_HIGH_TECH_SMALL_LOAN'
        ) {
          state.editForm.contractSubject = []
          state.editForm.capitalInfo = []
        }
        if (state.dialogTitle === '新增') {
          const paramsClone = JSON.parse(JSON.stringify(addOrEditparams))
          delete paramsClone.id
          await API.getMortgageSubjectAdd(paramsClone)
        } else {
          addOrEditparams.id = state.editForm.id
          await API.getMortgageSubjectModify(addOrEditparams)
        }
        emit('closeModel', {
          visible: false,
          type
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style lang="scss">
.main-part-model {
  .dialog-footer {
    button:first-child {
      margin-right: 10px;
    }
  }
  .avatar-uploader {
    .avatar {
      display: block;
      width: 100px;
      height: 100px;
    }
    .el-upload {
      position: relative;
      overflow: hidden;
      margin-right: 30px;
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      transition: var(--el-transition-duration-fast);
      cursor: pointer;
      &:hover {
        border-color: var(--el-color-primary);
      }
    }
  }
  .el-icon.avatar-uploader-icon {
    width: 100px;
    height: 100px;
    font-size: 28px;
    text-align: center;
    color: #8c939d;
  }
  // 去掉数字输入框快捷符号
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    appearance: none;
  }
  input[type='number'] {
    appearance: textfield;
  }
}
</style>
