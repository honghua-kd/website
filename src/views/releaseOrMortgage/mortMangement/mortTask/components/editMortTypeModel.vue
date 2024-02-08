<template>
  <el-dialog
    v-model="visible"
    title="修改抵押类型"
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
      <el-form-item label="抵押类型" prop="type" required>
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
