<template>
  <el-dialog
    v-model="visible"
    title="取消"
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
      <el-form-item label="取消原因" required>
        <el-select placeholder="请选择" clearable style="width: 100%">
          <!-- 字典表需更换 -->
          <el-option
            v-for="i in dictStore.dicts['MORTGAGE_TASK_TYPE'] || []"
            :key="i.value"
            :value="i.value"
            :label="i.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          placeholder="请输入，最多500字。"
          :rows="4"
          clearable
          maxlength="500"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="附件">
        <div style="width: 100%">
          <el-upload
            ref="upload"
            v-model:file-list="fileList"
            class="upload-demo"
            accept=".xlsx"
            :on-exceed="handleExceed"
            :auto-upload="false"
          >
            <template #trigger>
              <el-button>选择文件</el-button>
            </template>
          </el-upload>
        </div>
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
import { genFileId } from 'element-plus'
import type {
  FormInstance,
  FormRules,
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from 'element-plus'
import { useDictStore } from '@/store/dict'

const dictStore = useDictStore()

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

const fileList = ref<UploadUserFile[]>([])
const upload = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
</script>
