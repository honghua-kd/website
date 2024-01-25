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
        :model="editForm"
        label-position="top"
        :rules="rules"
      >
        <el-form-item label="来源系统" prop="systemSourceValue" required>
          <el-cascader
            v-model="editForm.systemSourceValue"
            :options="systemSourceArr"
            clearable
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="渠道商/办事处" prop="agencyName" required>
          <el-input
            v-model.trim="editForm.agencyName"
            :maxlength="50"
            placeholder="请输入"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="是否生成待收款项清单"
          prop="createGatherFlag"
          required
        >
          <el-select v-model="editForm.createGatherFlag" style="width: 100%">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="未收费办理是否需审批"
          prop="unpaidNeedApproveFlag"
          required
        >
          <el-select
            v-model="editForm.unpaidNeedApproveFlag"
            style="width: 100%"
          >
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <Button
          ref="okRef"
          name="确 定"
          @onButtonFn="onCloseModel(ruleFormRef, 'update-close')"
        />
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
import type { AgencyDetailResponse } from '@/api/channel/types/response'
import type { FormInstance, FormRules, CascaderOption } from 'element-plus'
import type { InternalRuleItem } from 'async-validator'
import { AgencyAPI } from '@/api'
const API = new AgencyAPI()

type ModelPropsType = {
  visible: boolean
  formValue: AgencyDetailResponse
  title: string
  sourceArr: CascaderOption[]
}
const props = withDefaults(defineProps<ModelPropsType>(), {
  visible: false,
  formValue: () => ({
    sourceSystem1: '',
    sourceSystem2: ''
  }),
  title: ''
})

const state = reactive<ModelStateType>({
  dialogVisible: false,
  editForm: { sourceSystem1: '', sourceSystem2: '', systemSourceValue: [] },
  dialogTitle: '',
  systemSourceArr: []
})
const { dialogVisible, editForm, dialogTitle, systemSourceArr } = toRefs(state)
const okRef = ref()
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
    if (newValue.sourceSystem1 === '' && newValue.sourceSystem2 === '') {
      state.editForm.systemSourceValue = []
    } else {
      state.editForm.systemSourceValue = [
        newValue.sourceSystem1,
        newValue.sourceSystem2
      ]
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
      validator: (
        rule: InternalRuleItem,
        value: string | undefined,
        callback: (error?: string | Error | undefined) => void
      ) => {
        if (!value || value.length === 0) {
          callback(new Error('请选择来源系统'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  agencyName: [
    {
      required: true,
      message: '请输入名称',
      trigger: 'blur'
    }
  ],
  createGatherFlag: [
    {
      required: true,
      message: '请选择是否生成待收款项清单',
      trigger: 'change'
    }
  ],
  unpaidNeedApproveFlag: [
    {
      required: true,
      message: '请选择未收费办理是否需审批',
      trigger: 'change'
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
const onCloseModel = async (formEl: FormInstance | undefined, type: string) => {
  if (type === 'click-close') {
    emit('closeModel', {
      visible: false,
      type
    })
    return
  }
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (type === 'update-close') {
        okRef.value.startLoading()
        if (dialogTitle.value === '编辑') {
          const params = {
            agencyName: editForm.value.agencyName,
            id: editForm.value.id,
            sourceSystem1: editForm.value.systemSourceValue
              ? editForm.value.systemSourceValue[0]
              : '',
            sourceSystem2: editForm.value.systemSourceValue
              ? editForm.value.systemSourceValue[1]
              : '',
            unpaidNeedApproveFlag: editForm.value.unpaidNeedApproveFlag,
            createGatherFlag: editForm.value.createGatherFlag
          }
          API.getAgencyEdit(params)
            .then(() => {
              okRef.value.cancelLoading()
              emit('closeModel', {
                visible: false,
                type
              })
            })
            .catch(() => {
              okRef.value.cancelLoading()
            })
        }
        if (dialogTitle.value === '新增') {
          const params = {
            agencyName: editForm.value.agencyName,
            sourceSystem1: editForm.value.systemSourceValue
              ? editForm.value.systemSourceValue[0]
              : '',
            sourceSystem2: editForm.value.systemSourceValue
              ? editForm.value.systemSourceValue[1]
              : '',
            unpaidNeedApproveFlag: editForm.value.unpaidNeedApproveFlag,
            createGatherFlag: editForm.value.createGatherFlag
          }
          API.getAgencySave(params)
            .then(() => {
              okRef.value.cancelLoading()
              emit('closeModel', {
                visible: false,
                type
              })
            })
            .catch(() => {
              okRef.value.cancelLoading()
            })
        }
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
