<template>
  <div>
    <el-dialog :title="dialogTitle" v-model="dialogVisible">
      <el-form
        ref="formRef"
        :model="formParams"
        v-loading="formLoading"
        :rules="formRules"
        label-width="80px"
      >
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="formParams.name" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典类型" prop="type">
          <el-input
            v-model="formParams.type"
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button :disabled="formLoading" type="primary" @click="submitForm">
          确 定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, Ref } from 'vue'
import { SystemAPI } from '@/api/system'
import { ElMessage } from 'element-plus'
import type { DictTypeUpdateRequest, DictTypePage } from '@/api'

const API = new SystemAPI()
const dialogTitle: Ref<string> = ref('新增字典')
const dialogVisible: Ref<boolean> = ref(false)
const formLoading: Ref<boolean> = ref(false)
const currentType: Ref<string> = ref('')
const formParams = reactive<DictTypeUpdateRequest>({
  id: undefined,
  name: '',
  type: '',
  status: 0,
  remark: ''
})
const formRef = ref()
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
const emit = defineEmits(['success'])
/** 打开弹窗 */
const open = (type: string, row: DictTypePage) => {
  dialogVisible.value = true
  currentType.value = type
  dialogTitle.value = type === 'add' ? '新增字典' : '编辑字典'
  resetForm()
  if (type === 'edit') {
    formParams.id = row.id
    formParams.name = row.name
    formParams.type = row.type
    formParams.status = row.status
    formParams.remark = row.remark
  }
}
defineExpose({ open })
// 校验
const formRules = reactive({
  name: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }],
  type: [{ required: true, message: '字典类型不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '状态不能为空', trigger: 'change' }]
})

// 提交
const submitForm = async () => {
  // 校验表单
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  // 提交请求
  formLoading.value = true
  const params = {
    ...formParams
  }
  if (currentType.value === 'add') {
    API.createDict(params)
      .then((res) => {
        formLoading.value = false
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
          emit('success')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  } else if (currentType.value === 'edit') {
    API.updateDict(params)
      .then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
          emit('success')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  dialogVisible.value = false
}

/** 重置表单 */
const resetForm = () => {
  formParams.id = undefined
  formParams.name = ''
  formParams.type = ''
  formParams.status = 0
  formParams.remark = ''
  formRef.value?.resetFields()
}
</script>

<style lang="scss" scoped></style>
