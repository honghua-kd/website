<template>
  <div>
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form
        ref="formRef"
        :model="formData"
        v-loading="formLoading"
        label-width="100"
      >
        <el-form-item label="权限名称：" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入权限名称"
            clearable
            style="width: 50%"
          />
        </el-form-item>
        <el-form-item label="权限编码：" prop="code">
          <el-input
            v-model="formData.code"
            placeholder="请输入权限编码"
            style="width: 50%"
            clearable
          />
        </el-form-item>
        <el-form-item label="模块：" prop="moduleName">
          <el-select v-model="formData.moduleName">
            <el-option
              v-for="item in dataOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="权限规则：" prop="rule">
          <el-row :gutter="20" class="withFull">
            <el-col :span="9">
              <el-input
                v-model="formData.rule"
                placeholder="请编辑规则"
                type="textarea"
                class="withFull"
                clearable
              />
            </el-col>
            <el-col :span="3">
              <el-button link type="primary" @click="editRuleHandler">
                编辑规则
              </el-button>
            </el-col>
            <el-col :span="12" v-if="formulaShow" class="formulaCont">
              <p v-for="(el, ind) in formulaList" :key="ind">
                <span
                  v-for="(e, i) in el"
                  :key="i"
                  :class="e.class"
                  @click="selectUnitHandler(e.label)"
                >
                  {{ e.label }}
                </span>
              </p>
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
import { formulaList } from './config'
defineProps({
  roleDataPerm: {
    type: Object,
    default: () => { }
  }
})
const formulaShow = ref(false)
const dialogTitle = ref('')
const formData = reactive({
  id: 0,
  name: '',
  code: '',
  moduleName: '',
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
    const { id, name, code, rule, moduleName } = data
    formData.id = id
    formData.name = name
    formData.code = code
    formData.rule = rule
    formData.moduleName = moduleName
  }
}
defineExpose({ openDialog })
// 提交
const emit = defineEmits(['success'])
const submitForm = () => {
  const { id, rule, moduleName } = formData
  const params = {
    roleId: id,
    rule,
    moduleName
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
// 展示公式
const editRuleHandler = () => {
  formulaShow.value = !formulaShow.value
}
// 选中公式
const selectUnitHandler = (unit) => {
  formData.rule += unit
}
// reset Form
const resetForm = () => {
  formData.id = ''
  formData.name = ''
  formData.code = ''
  formData.rule = ''
  formData.moduleName = ''
}

</script>

<style lang='scss' scoped>
.withFull {
  width: 100%;
}

.formulaCont {
  width: 100%;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  padding: 0 !important;
  p {
    margin: 0;
    display: flex;
    justify-content: space-between;
    span {
      cursor: pointer;
      flex: 1;
      text-align: center;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    .Equals {
      flex: 2;
    }
  }
}
</style>
