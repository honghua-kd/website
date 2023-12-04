<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="formRef"
        :model="formData"
        v-loading="formLoading"
        label-width="100"
        :rules="formRules"
      >
        <el-form-item label="权限名称：" prop="permissionName">
          <el-input
            v-model="formData.permissionName"
            placeholder="请输入权限名称"
            clearable
            style="width: 50%"
          />
        </el-form-item>
        <el-form-item label="权限编码：" prop="permissionCode">
          <el-input
            v-model="formData.permissionCode"
            placeholder="请输入权限编码"
            style="width: 50%"
            clearable
          />
        </el-form-item>
        <el-form-item label="模块：" prop="moduleCode">
          <el-select v-model="formData.moduleCode" multiple style="width: 50%">
            <el-option
              v-for="item in dataOpts"
              :key="(item.value as string)"
              :label="(item.label as string)"
              :value="(item.value as string)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="权限规则：" prop="dataScope">
          <el-row :gutter="20" class="width-full">
            <el-col :span="9">
              <el-input
                v-model="formData.dataScope"
                placeholder="请编辑规则"
                type="textarea"
                class="width-full"
                clearable
              />
            </el-col>
            <el-col :span="3">
              <el-button link type="primary" @click="editRuleHandler">
                编辑规则
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="规则编辑：" v-if="formulaShow">
          <el-row :gutter="20" class="width-full">
            <el-col :span="6">
              <el-select
                v-model="selectedRule"
                placeholder="请选择现有规则"
                @change="ruleChange"
              >
                <el-option
                  v-for="item in ruleOpts"
                  :key="item.keywordCode"
                  :value="(item.keywordName as string)"
                  :label="item.forwordName"
                />
              </el-select>
            </el-col>
            <el-col :span="12" class="formula-cont">
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
            <el-col :span="4">
              <el-button
                type="primary"
                :disabled="!formData.dataScope"
                @click="checkRulesHandler"
                :loading="checkLoading"
                >校验规则</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="表达式：" prop="dataScopeExpression">
          <el-input
            v-model="formData.dataScopeExpression"
            type="textarea"
            style="width: 80%"
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
import { SystemAPI } from '@/api'
import { ElMessage, ElForm } from 'element-plus'
import { formulaList } from '@/views/system/role/config'
import type {
  UserListPermission,
  RoleListPermission,
  ResponseBody,
  PermissionData,
  PermissionAssignRequest,
  DictListRequest,
  DictListItem,
  ScopeMapping,
  PermissionExpressionRequest
} from '@/api'
const props = defineProps({
  origin: {
    type: String,
    default: () => ''
  }
})
const systemAPI = new SystemAPI()
const formRef = ref<InstanceType<typeof ElForm>>()
const checkLoading = ref(false)
const currentType = ref('')
const formulaShow = ref(false)
const dialogTitle = ref('')
const formData: Omit<PermissionData, 'id'> = reactive({
  permissionName: '', // 权限名称
  permissionCode: '', // 权限编码
  moduleCode: [], // 模块
  dataScope: '', // 权限规则
  dataScopeExpression: '' // 表达式
})
const dataOpts: Ref<DictListItem[]> = ref([]) // 模块字典选项
const dialogVisible = ref(false)
const formLoading = ref(false)
const selectedRule = ref('')
const ruleOpts: Ref<ScopeMapping[]> = ref([]) // 规则字典选项
const currentOriginCode = ref<string>('')
const editRowInfo: {
  relationId: string
  roleCode: string
  staffCode: string
  id: string
} = reactive({
  relationId: '',
  roleCode: '',
  staffCode: '',
  id: ''
})
// 打开弹窗

interface ListPermission {
  add: string
  edit: UserListPermission | RoleListPermission
}

const openDialog = async <T extends keyof ListPermission>(
  type: T,
  data: ListPermission[T]
) => {
  dialogTitle.value = type === 'add' ? '新增数据权限列表' : '编辑数据权限列表'
  currentType.value = type
  if (type === 'add') {
    currentOriginCode.value = data as ListPermission['add']
  }
  resetForm()
  await getMoudleDict()
  await getRuleDict()
  dialogVisible.value = true
  if (type === 'edit') {
    const { permissionCode, roleCode, relationId, staffCode } =
      data as ListPermission['edit']
    currentOriginCode.value =
      props.origin === 'roleCode' ? roleCode || '' : staffCode || ''
    editRowInfo.relationId = relationId || ''
    editRowInfo.staffCode = staffCode || ''
    editRowInfo.roleCode = roleCode || ''
    const params = {
      permissionCode
    }
    systemAPI
      .getPermissionDetail(params)
      .then((res: ResponseBody<PermissionData>) => {
        if (res && res.code === 200) {
          const {
            moduleCode,
            permissionCode,
            permissionName,
            id,
            dataScopeExpression,
            dataScope
          } = res.data || {}
          formData.permissionName = permissionName || ''
          formData.permissionCode = permissionCode
          formData.moduleCode = moduleCode ? [...moduleCode] : []
          formData.dataScope = dataScope || ''
          formData.dataScopeExpression = dataScopeExpression || ''
          editRowInfo.id = id + ''
        }
      })
  }
}
defineExpose({ openDialog })

// 校验
const formRules = reactive({
  permissionName: [
    { required: true, message: '权限名称不能为空', trigger: 'blur' }
  ],
  permissionCode: [
    { required: true, message: '权限编码不能为空', trigger: 'blur' }
  ],
  moduleCode: [{ required: true, message: '模块不能为空', trigger: 'change' }],
  dataScope: [{ required: true, message: '权限规则不能为空', trigger: 'blur' }],
  dataScopeExpression: [
    { required: true, message: '表达式不能为空', trigger: 'blur' }
  ]
})
// 提交
const emit = defineEmits(['roleList', 'userList'])
const submitForm = async () => {
  // 校验表单
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  let params: PermissionAssignRequest = {}
  if (currentType.value === 'add') {
    params = {
      ...formData,
      [props.origin]: currentOriginCode.value
    }
  } else if (currentType.value === 'edit') {
    params = {
      ...formData,
      ...editRowInfo
    }
  }
  systemAPI
    .subDataPermission(params)
    .then((res) => {
      if (res && res.code === 200) {
        ElMessage.success('提交成功')
        dialogVisible.value = false
        // 发送操作成功的事件
        props.origin === 'roleCode'
          ? emit('roleList', currentOriginCode.value)
          : emit('userList', currentOriginCode.value)
      }
    })
    .catch((err) => {
      dialogVisible.value = false
      console.log(err)
    })
}
// 展示公式
const editRuleHandler = () => {
  formulaShow.value = !formulaShow.value
}
// 选中公式
const selectUnitHandler = (unit: string) => {
  formData.dataScope += unit
}
// reset Form
const resetForm = () => {
  formData.permissionName = ''
  formData.permissionCode = ''
  formData.moduleCode = []
  formData.dataScope = ''
  formData.dataScopeExpression = ''
  selectedRule.value = ''
  formulaShow.value = false
  formRef.value?.resetFields()
}

// 获取模块字典信息
const getMoudleDict = () => {
  const params: DictListRequest = {
    dictType: 'data_scope_module',
    status: 0
  }
  systemAPI
    .getSingleDict(params)
    .then((res) => {
      if (res && res.code === 200) {
        dataOpts.value = res.data || []
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

// 获取公式映射字典
const getRuleDict = () => {
  systemAPI
    .getRuleList()
    .then((res) => {
      if (res && res.code === 200) {
        ruleOpts.value = res.data || []
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
// 选中规则
const ruleChange = (item: string) => {
  formData.dataScope += item
}
// 规则校验接口-获取表达式
const checkRulesHandler = () => {
  checkLoading.value = true
  const params: PermissionExpressionRequest = {
    dataScope: formData.dataScope || ''
  }
  systemAPI
    .checkRules(params)
    .then((res) => {
      checkLoading.value = false
      if (res && res.code === 200) {
        formData.dataScopeExpression = res?.data || ''
      }
    })
    .catch((err) => {
      checkLoading.value = false
      console.log(err)
    })
}
</script>

<style lang="scss" scoped>
.width-full {
  width: 100%;
}
.formula-cont {
  padding: 0 !important;
  width: 100%;
  border-top: 1px solid #cccccc;
  border-left: 1px solid #cccccc;
  p {
    display: flex;
    justify-content: space-between;
    margin: 0;
    span {
      border-right: 1px solid #cccccc;
      border-bottom: 1px solid #cccccc;
      text-align: center;
      cursor: pointer;
      flex: 1;
    }
    .equals {
      flex: 2;
    }
  }
}
</style>
