<template>
  <el-dialog
    class="main-part-model"
    v-model="dialogVisible"
    :title="dialogTitle"
    width="550px"
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
        label-position="top"
      >
        <el-form-item label="来源系统" props="systemSourceValue" required>
          <el-cascader
            v-model="editForm.systemSourceValue"
            :options="systemSourceArr"
            clearable
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="渠道商/办事处" prop="agencyName" required>
          <el-input
            v-model="editForm.agencyName"
            :maxlength="50"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="城市" prop="areaCode" required>
          <AreaCasder
            :value="editForm.areaCode"
            @changeAreaData="changeAreaData"
          />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input
            v-model="editForm.address"
            placeholder="请输入"
            :maxlength="100"
          />
        </el-form-item>
        <el-row>
          <el-col :span="11"
            ><el-form-item label="联系人" prop="contact">
              <el-input
                v-model="editForm.contact"
                :maxlength="50"
                placeholder="请输入"
              /> </el-form-item
          ></el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11"
            ><el-form-item label="联系电话" prop="phone">
              <el-input
                v-model="editForm.phone"
                placeholder="请输入"
              /> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCloseModel(ruleFormRef, 'click-close')"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="onCloseModel(ruleFormRef, 'update-close')"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { watch, toRefs, reactive, ref } from 'vue'
import type {
  RecordType,
  ModelStateType
} from '@/views/mortgage/channelAddress/type'
import type { FormInstance, FormRules, CascaderOption } from 'element-plus'
import AreaCasder from '@/components/AreaCascader/index.vue'
import { AgencyAPI } from '@/api'
const API = new AgencyAPI()

type ModelPropsType = {
  visible: boolean
  formValue: RecordType
  title: string
  sourceArr: CascaderOption[]
}
const props = withDefaults(defineProps<ModelPropsType>(), {
  visible: false,
  formValue: () => ({}),
  title: ''
})

const state = reactive<ModelStateType>({
  dialogVisible: false,
  editForm: { sourceSystem1: '', sourceSystem2: '', systemSourceValue: [] },
  dialogTitle: '',
  systemSourceArr: []
})
const { dialogVisible, editForm, dialogTitle, systemSourceArr } = toRefs(state)

type ParamsType = {
  id: string
  address?: string
  agencyName: string
  cityCode: string
  cityName: string
  contact?: string
  phone?: string
  provinceCode: string
  provinceName: string
  sourceSystem1?: null | string
  sourceSystem2: string
}
const editParams = reactive<ParamsType>({
  id: '',
  address: '',
  agencyName: '',
  sourceSystem1: '',
  sourceSystem2: '',
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  contact: '',
  phone: ''
})
watch(
  [
    () => props.visible,
    () => props.formValue,
    () => props.title,
    () => props.sourceArr
  ],
  ([newVisible, newValue, newTitle, newArr]) => {
    state.dialogVisible = newVisible
    state.editForm = newValue
    state.dialogTitle = newTitle
    state.systemSourceArr = newArr
    if (newTitle === '编辑') {
      state.editForm.systemSourceValue = [
        newValue.sourceSystem1,
        newValue.sourceSystem2
      ]
      state.editForm.areaCode = [newValue.provinceCode, newValue.cityCode]

      editParams.provinceCode = newValue.provinceCode
      editParams.provinceName = newValue.provinceName
      editParams.cityCode = newValue.cityCode
      editParams.cityName = newValue.cityName
    }
    if (newTitle === '新增') {
      state.editForm.systemSourceValue = []
      state.editForm.areaCode = []

      editParams.provinceCode = ''
      editParams.provinceName = ''
      editParams.cityCode = ''
      editParams.cityName = ''
    }
  },
  {
    immediate: true
  }
)

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof editForm>>({
  systemSourceValue: [
    {
      validator: (rule: any, value: any, callback: any) => {
        console.log('validator来源系统', value)
        callback(new Error('请选择来源系统'))
        // if (value.length === 0) {
        //   callback(new Error('请选择来源系统'))
        // } else {
        //   callback()
        // }
      },
      trigger: 'change'
    }
    // {
    //   required: true,
    //   message: '请选择来源系统',
    //   trigger: 'change'
    // }
  ],
  agencyName: [
    {
      required: true,
      message: '请输入渠道商/办事处名称',
      trigger: 'blur'
    }
  ],
  areaCode: [
    {
      validator: (rule: any, value: any, callback: any) => {
        console.log('validator地区', value.length)
        // if (editParams.provinceCode === '' && editParams.cityCode === '') {
        //   callback(new Error('请选择城市'))
        // } else {
        //   callback()
        // }
        if (value.length === 0) {
          callback(new Error('请选择城市'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  phone: [
    {
      validator: (rule: any, value: any, callback: any) => {
        var regExp = /^1[3456789]\d{9}$/
        console.log(value)
        if (!value || (value !== '' && regExp.test(value))) {
          callback()
        } else {
          callback(new Error('请正确输入联系电话'))
        }
      },
      required: false,
      trigger: 'blur'
    }
  ]
})

const emit = defineEmits<{
  (e: 'closeModel', { visible, type }: { visible: boolean; type: string }): void
}>()
const handleClose = () => {
  emit('closeModel', {
    visible: false,
    type: 'click-close'
  })
}
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
  console.log(provinceCode, provinceName, cityCode, cityName)
  editParams.provinceCode = provinceCode
  editParams.provinceName = provinceName
  editParams.cityCode = cityCode
  editParams.cityName = cityName
  console.log(editForm.value, editParams)
  if (provinceCode === '' && cityCode === '') {
    editForm.value.areaCode = []
  } else {
    editForm.value.areaCode = [provinceCode, cityCode]
  }
}

const onCloseModel = async (formEl: FormInstance | undefined, type: string) => {
  if (type === 'click-close') {
    emit('closeModel', {
      visible: false,
      type
    })
    return
  }
  console.log(editForm.value)
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (type === 'update-close') {
        editParams.address = editForm.value.address
        editParams.agencyName = editForm.value.agencyName
        editParams.contact = editForm.value.contact
        editParams.phone = editForm.value.phone
        editParams.sourceSystem1 = editForm.value.systemSourceValue
          ? editForm.value.systemSourceValue[0]
          : ''
        editParams.sourceSystem2 = editForm.value.systemSourceValue
          ? editForm.value.systemSourceValue[1]
          : ''
        if (dialogTitle.value === '编辑') {
          editParams.id = editForm.value.id
          await API.getAgencyAddressEdit(editParams)
        }
        if (dialogTitle.value === '新增') {
          editParams.id = ''
          await API.getAgencyAddressSave(editParams)
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
}
</style>
