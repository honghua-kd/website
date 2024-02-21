<template>
  <el-dialog
    class="main-part-model"
    v-model="dialogVisible"
    :title="dialogTitle + '材料去向配置'"
    width="800px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleClose"
  >
    <div>
      <el-form ref="ruleFormRef" :model="editForm" :rules="rules">
        <el-form-item label="规则名称" prop="agencyName" class="special-item">
          <el-input
            v-model.trim="editForm.agencyName"
            :maxlength="50"
            placeholder="请输入"
            clearable
          />
        </el-form-item>
        <p class="title-item">规则条件</p>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="来源系统"
              prop="sourceSystem"
              label-width="130"
              placeholder="请选择"
            >
              <el-select v-model="editForm.sourceSystem" style="width: 100%">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in sourceSystem"
                  :key="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="合同状态"
              prop="Contract"
              label-width="130"
              placeholder="请选择"
            >
              <el-select
                v-model="editForm.Contract"
                style="width: 100%"
                multiple
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in sourceSystem"
                  :key="item.value"
                />
              </el-select> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="任务类型"
              prop="taskType"
              label-width="130"
              placeholder="请选择"
            >
              <el-select
                v-model="editForm.taskType"
                style="width: 100%"
                multiple
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in sourceSystem"
                  :key="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="解押费用是否收取"
              prop="DischargeCharge"
              label-width="130"
              placeholder="请选择"
            >
              <el-select v-model="editForm.DischargeCharge" style="width: 100%">
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="登记证书状态"
              prop="certificateStatus"
              label-width="130"
              placeholder="请选择"
            >
              <el-select
                v-model="editForm.certificateStatus"
                style="width: 100%"
                multiple
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in sourceSystem"
                  :key="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label-width="130"
              label="渠道商是否为委外"
              prop="channel"
              placeholder="请选择"
            >
              <el-select v-model="editForm.channel" style="width: 100%">
                <el-option label="是" :value="1" />
                <el-option label="否" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label-width="130"
              label="渠道商提报状态"
              prop="Submission"
              placeholder="请选择"
            >
              <el-select
                v-model="editForm.Submission"
                style="width: 100%"
                multiple
              >
                <el-option label="有效" :value="1" />
                <el-option label="无效" :value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <p class="title-item">材料去向</p>
        <el-row>
          <el-col :span="4"></el-col>
          <el-col :span="16">
            <el-form-item prop="MaterialDestination">
              <el-radio-group v-model="editForm.MaterialDestination">
                <el-radio :label="1">移交运营档案管理部</el-radio>
                <el-radio :label="2">移交解押任务分配方</el-radio>
                <el-radio :label="3">移交渠道商/办事处</el-radio>
              </el-radio-group>
            </el-form-item></el-col
          >
          <el-col :span="4"></el-col>
        </el-row>
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
import { ref, watch, toRefs, reactive } from 'vue'
import { ModelPropsType, ModelStateType } from '../type'
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const props = withDefaults(defineProps<ModelPropsType>(), {
  visible: false,
  title: '',
  formValue: () => ({
    agencyName: '',
    sourceSystem: '',
    Contract: [],
    taskType: [],
    DischargeCharge: 0,
    certificateStatus: [],
    channel: 0,
    Submission: [],
    MaterialDestination: 0
  })
})
const dialogVisible = ref(props.visible)
const dialogTitle = ref(props.title)

const state = reactive<ModelStateType>({
  editForm: props.formValue
})

const { editForm } = toRefs(state)

const sourceSystem = [
  { label: '抵押', value: '1' },
  { label: '解押', value: '2' },
  { label: '补证', value: '3' },
  { label: '抵押通用任务出具', value: '4' }
]
const rules = {
  agencyName: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
  sourceSystem: [
    { required: true, message: '请选择来源系统', trigger: ['change', 'blur'] }
  ],
  Contract: [
    { required: true, message: '请选择合同状态', trigger: ['change', 'blur'] }
  ],
  taskType: [
    { required: true, message: '请选择任务类型', trigger: ['change', 'blur'] }
  ],
  DischargeCharge: [
    { required: true, message: '请选择解押费用', trigger: ['change', 'blur'] }
  ],
  certificateStatus: [
    {
      required: true,
      message: '请选择登记证件状态',
      trigger: ['change', 'blur']
    }
  ],
  channel: [
    { required: true, message: '请选择渠道', trigger: ['change', 'blur'] }
  ],
  Submission: [
    {
      required: true,
      message: '请选择渠道商提交状态',
      trigger: ['change', 'blur']
    }
  ],
  MaterialDestination: [
    {
      required: true,
      message: '请选择材料去向',
      trigger: ['change', 'blur']
    }
  ]
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

const okRef = ref()
// 弹窗 取消/确定
const onCloseModel = (formEl: FormInstance | undefined, type: string) => {
  if (type === 'click-close') {
    emit('closeModel', {
      visible: false,
      type
    })
    return
  }
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      if (type === 'update-close') {
        okRef.value.changeLoading(true)
        if (dialogTitle.value === '新增') {
          // API.getAgencyEdit(params)
          //   .then(() => {
          okRef.value.changeLoading(false)
          emit('closeModel', {
            visible: false,
            type
          })
          // })
          // .catch(() => {
          okRef.value.changeLoading(false)
          // })
        }
        if (dialogTitle.value === '编辑') {
          // API.getAgencyEdit(params)
          //   .then(() => {
          okRef.value.changeLoading(false)
          emit('closeModel', {
            visible: false,
            type
          })
          // })
          // .catch(() => {
          okRef.value.changeLoading(false)
          // })
        }
        console.log(editForm.value)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

watch(
  [() => props.visible, () => props.formValue, () => props.title],
  ([newVisible, newFormValue, newTitle]) => {
    dialogVisible.value = newVisible
    dialogTitle.value = newTitle
    editForm.value = newFormValue
  },
  {
    immediate: true,
    deep: true
  }
)
</script>
<style lang="scss" scoped>
:deep(
    .el-form-item.is-required:not(.is-no-asterisk).asterisk-left
      > .el-form-item__label::before,
    .el-form-item.is-required:not(.is-no-asterisk).asterisk-left
      > .el-form-item__label-wrap
      > .el-form-item__label::before
  ) {
  opacity: 0;
}
:deep(
    .special-item.is-required:not(.is-no-asterisk).asterisk-left
      > .el-form-item__label::before,
    .special-item.is-required:not(.is-no-asterisk).asterisk-left
      > .el-form-item__label-wrap
      > .el-form-item__label::before
  ) {
  opacity: 1;
}
.title-item {
  font-size: 18px;
  font-weight: 700;
  &::before {
    margin-right: 5px; /* 可以调整间距 */
    color: #f56c6c; /* 可以指定颜色 */
    content: '*';
  }
}
</style>
