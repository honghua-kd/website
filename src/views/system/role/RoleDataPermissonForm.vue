<template>
  <div>
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form
        ref="formRef"
        :model="formData"
        v-loading="formLoading"
        label-width="100"
      >
        <el-form-item label="权限名称：">
          <el-tag>{{ formData.name }}</el-tag>
        </el-form-item>
        <el-form-item label="权限编码：">
          <el-tag>{{ formData.code }}</el-tag>
        </el-form-item>
        <el-form-item label="模块：">
          <el-select v-model="formData.dataScope">
            <el-option
              v-for="item in dataOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="权限规则：" prop="rule">
          <el-row :gutter="30" class="withFull">
            <el-col :span="16">
              <el-input
                v-model="formData.rule"
                placeholder="请编辑规则"
                type="textarea"
                class="withFull"
              />
            </el-col>
            <el-col :span="4">
              <el-button link type="primary">编辑规则</el-button>
            </el-col>
          </el-row>
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
import { useDictStore } from '@/store/dict'
import { subDataPermission } from '@/api/system'
import { ElMessage } from 'element-plus'

defineProps({
  roleDataPerm: {
    type: Object,
    default: () => { }
  }
})

const dialogTitle = ref('')
const formData = reactive({
  id: 0,
  name: '',
  code: '',
  rule: ''
})
const dataOpts = ref([])

const dialogVisible = ref(false)
const formLoading = ref(false)
// 打开弹窗
const openDialog = async (type, data) => {
  dialogVisible.value = true
  dialogTitle.value = type === 'add' ? '新增数据权限列表' : '编辑数据权限列表'
  resetForm()
  const dictStore = useDictStore()
  dataOpts.value = dictStore?.getDictMap && dictStore?.getDictMap.get('system_data_scope')
  if (type === 'edit') {
    const { id, name, code, dataScope } = data
    formData.id = id
    formData.name = name
    formData.code = code
    formData.dataScope = dataScope
  }
}
defineExpose({ openDialog })
// 提交
const emit = defineEmits(['success'])
const submitForm = () => {
  const { id, dataScope } = formData
  const params = {
    roleId: id,
    dataScope

  }
  subDataPermission(params).then(res => {
    if (res && res.code === 200) {
      ElMessage.success('提交成功')
    }
  }).catch(err => {
    console.log(err)
  })
  dialogVisible.value = false
  // 发送操作成功的事件
  emit('success')
}

// reset Form
const resetForm = () => {
  formData.id = ''
  formData.name = ''
  formData.code = ''
  formData.rule = ''
}

</script>

<style lang='scss' scoped>
.withFull {
  width: 100%;
}
</style>
