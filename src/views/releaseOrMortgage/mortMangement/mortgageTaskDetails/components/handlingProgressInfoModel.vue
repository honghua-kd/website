<template>
  <el-dialog
    v-model="visible"
    title="新增办理进度"
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
      <el-form-item label="办理人" required>
        <el-input placeholder="请输入" clearable maxlength="50" />
      </el-form-item>
      <el-form-item label="办理人所属公司" required>
        <el-input placeholder="请输入" clearable maxlength="50" />
      </el-form-item>
      <el-form-item label="办理时间" required>
        <el-date-picker
          type="datetime"
          placeholder="请选择"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="办理结果" required>
        <el-select
          class="m-2"
          placeholder="请选择"
          size="large"
          style="width: 100%"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          class="m-2"
          placeholder="请选择"
          size="large"
          style="width: 100%"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="补充说明">
        <el-input
          type="textarea"
          placeholder="请输入，最多500字。"
          :rows="4"
          clearable
          maxlength="500"
          style="width: 100%"
        />
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
// import { useDictStore } from '@/store/dict'

// const dictStore = useDictStore()

const state = reactive({
  visible: false,
  formData: {},
  okLoading: false
})
const { visible, formData, okLoading } = toRefs(state)

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  type: [
    {
      required: true,
      message: '请选择取消类型',
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
