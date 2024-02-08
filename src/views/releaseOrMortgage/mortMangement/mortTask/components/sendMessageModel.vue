<template>
  <el-dialog
    v-model="visible"
    title="发送短信"
    width="500px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleClose"
  >
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="短信模版" required>
        <el-select
          v-model="formData.type"
          placeholder="请选择"
          clearable
          style="width: 100%"
        >
          <!-- 字典表需更换 -->
          <el-option
            v-for="i in dictStore.dicts['MORTGAGE_TASK_TYPE'] || []"
            :key="i.value"
            :value="i.value"
            :label="i.label"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <p>
      尊敬的客户您好，海通恒信友情提示：您在我公司办理的融资租赁业务现已结束，后续将由我公司安排第三方机构【XX公司XX人员XX电话】协助您办理车辆解押，现场办理人员不会向您收取任何费用，届时请您遵守当地车管所政策提供相应证件（如身份证或营业执照等）或其他规定材料配合办理解押，具体所需证件或材料请咨询当地车管所或第三方机构的现场解押人员。如有疑问，欢迎致电我公司客服热线咨询400-670-5727，谢谢！
    </p>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          :loading="okLoading"
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
import { ref, reactive, toRefs } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useDictStore } from '@/store/dict'

const dictStore = useDictStore()

const state = reactive({
  visible: false,
  formData: { type: '' },
  okLoading: false
})
const { visible, formData, okLoading } = toRefs(state)

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  type: [
    {
      required: true,
      message: '请选择抵押类型',
      trigger: 'change'
    }
  ]
})

const emit = defineEmits<{
  (e: 'closeModel', type: string): void
}>()

const handleClose = () => {
  state.visible = false
}

// 弹窗 取消/确定
const onCloseModel = async (formEl: FormInstance | undefined, type: string) => {
  if (type === 'click-close') {
    state.visible = false
    return
  }
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit('closeModel', type)
      state.visible = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 打开弹窗
const open = () => {
  state.visible = true
}

defineExpose({ open })
</script>
