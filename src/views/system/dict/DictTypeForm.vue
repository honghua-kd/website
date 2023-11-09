<template>
  <div>
    <el-dialog :title="dialogTitle" v-model="dialogVisible" :rules="formRules">
      <el-form
        ref="formRef"
        :model="formParams"
        v-loading="formLoading"
        label-width="80px"
      >
        <el-form-item label="字典名称" prop="dictName">
          <el-input
            v-model="formParams.dictName"
            placeholder="请输入字典名称"
          />
        </el-form-item>
        <el-form-item label="字典类型" prop="dictType">
          <el-input
            v-model="formParams.dictType"
            placeholder="请输入参数名称"
            :disabled="currentType === 'edit'"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formParams.status">
            <el-radio
              v-for="dict in statusOpts"
              :key="dict.value"
              :label="dict.value"
            >
              {{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="formParams.remark"
            placeholder="请输入内容"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button :disabled="formLoading" type="primary" @click="submitForm">
          确 定
        </el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const dialogTitle = ref('新增字典')
const dialogVisible = ref(false)
const formLoading = ref(false)
const currentType = ref('')
const formParams = reactive({
  id: undefined,
  dictName: '',
  dictType: '',
  status: 0,
  remark: ''
})
const formRef = ref(null)
const statusOpts = ref([
  {
    label: '开启',
    value: 0
  },
  {
    label: '关闭',
    value: 1
  }
])
/** 打开弹窗 */
const open = (type, row) => {
  console.log('row', row)
  dialogVisible.value = true
  currentType.value = type
  dialogTitle.value = type === 'add' ? '新增字典' : '编辑字典'
  resetForm()
  if (type === 'edit') {
    formParams.id = row.id
    formParams.dictName = row.name
    formParams.dictType = row.type
    formParams.status = row.status
    formParams.remark = row.remark
  }
}
defineExpose({ open })
// 校验
const formRules = reactive({
  dictName: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }],
  dictType: [{ required: true, message: '字典类型不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '状态不能为空', trigger: 'change' }]
})

// 提交
const submitForm = () => {
  console.log('submit')
}

/** 重置表单 */
const resetForm = () => {
  formParams.id = undefined
  formParams.dictName = ''
  formParams.dictType = ''
  formParams.status = 0
  formParams.remark = ''
}
</script>

<style lang='scss' scoped>
</style>
