<template>
  <el-dialog
    v-model="modelVisible"
    title="选择审批路径"
    width="550px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleClose"
  >
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      :label-width="100"
    >
      <el-form-item label="审批路径" prop="approvalPath">
        <el-radio-group v-model="formData.approvalPath" class="ml-4">
          <el-radio
            v-for="item in pathOptions"
            :key="(item.bizCode as string)"
            :label="(item.bizCode as string)"
            >{{ item.bizName }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="formData.remark"
          :rows="4"
          :maxlength="500"
          :show-word-limit="true"
          type="textarea"
          placeholder="请输入"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          @click="closeModel(ruleFormRef, 'update-close')"
          >确 定</el-button
        >
        <el-button @click="closeModel(ruleFormRef, 'click-close')"
          >取 消</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import type { ApprovalPathResponse } from '@/api'
import type { FormInstance, FormRules } from 'element-plus'
import { DocCheckAPI } from '@/api'
const API = new DocCheckAPI()
type Iprops = {
  visible: boolean
  documentNos: string[]
  pathOptions: ApprovalPathResponse[]
}
const props = withDefaults(defineProps<Iprops>(), {
  visible: false,
  documentNos: () => [],
  pathOptions: () => []
})
const modelVisible = ref<boolean>(false)
const formData = reactive<{
  documentNos: string[]
  approvalPath: string
  remark: string
}>({
  documentNos: [],
  approvalPath: '',
  remark: ''
})
watch(
  [() => props.visible, () => props.documentNos],
  ([newVisible, newValue]) => {
    modelVisible.value = newVisible
    formData.documentNos = newValue
  }
)

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof formData>>({
  approvalPath: [
    {
      required: true,
      message: '请选择审批路径',
      trigger: 'blur'
    }
  ]
})

const emit = defineEmits<{
  (e: 'closeApprovalModel', { type }: { type: string }): void
}>()

const closeModel = async (formEl: FormInstance | undefined, type: string) => {
  if (type === 'click-close') {
    emit('closeApprovalModel', {
      type
    })
    formData.approvalPath = ''
    formData.remark = ''
    return
  }
  if (!formEl) return
  if (type === 'update-close') {
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        await API.initiateApproval(formData)
        emit('closeApprovalModel', {
          type
        })
        formData.approvalPath = ''
        formData.remark = ''
      } else {
        console.log('error submit!', fields)
      }
    })
  }
}

const handleClose = () => {
  emit('closeApprovalModel', {
    type: 'click-close'
  })
  formData.approvalPath = ''
  formData.remark = ''
}
</script>
