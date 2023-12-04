<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="formRef"
        :model="formParams"
        v-loading="formLoading"
        :rules="formRules"
        label-width="80px"
      >
        <el-form-item label="字典类型" prop="dictType">
          <el-input v-model="formParams.dictType" disabled />
        </el-form-item>
        <el-form-item label="数据标签" prop="label">
          <el-input v-model="formParams.label" />
        </el-form-item>
        <el-form-item label="数据键值" prop="value">
          <el-input v-model="formParams.value" />
        </el-form-item>
        <el-form-item label="父级" prop="parentValue">
          <el-input v-model="formParams.parentValue" />
        </el-form-item>
        <el-form-item label="层级" prop="dataLevel">
          <el-input v-model="formParams.dataLevel" />
        </el-form-item>
        <el-form-item label="显示排序" prop="sort">
          <el-input-number
            v-model="formParams.sort"
            class="mx-4"
            :min="1"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formParams.status" class="ml-4">
            <el-radio
              v-for="item in statusOpt"
              :key="item.id"
              :label="item.value"
            >
              {{ item.label }}
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
import { ElMessage, ElForm } from 'element-plus'
import type { DictDataUpdateRequest } from '@/api'
const API = new SystemAPI()
const dialogTitle: Ref<string> = ref('')
const formRef = ref<InstanceType<typeof ElForm>>()
const dialogVisible: Ref<boolean> = ref(false)
const currentType: Ref<string> = ref('')
const formLoading: Ref<boolean> = ref(false)
const formParams = reactive<DictDataUpdateRequest>({
  id: '',
  dictType: '', // 字典类型
  label: '', // 数据标签
  value: '', // 数据键值
  parentValue: '', // 父级
  dataLevel: '', // 层级
  status: 0, // 状态
  sort: 0, // 排序
  remark: '' // 备注
})
const statusOpt = ref([
  {
    id: 1,
    label: '开启',
    value: 0
  },
  {
    id: 2,
    label: '关闭',
    value: 1
  }
])
const emit = defineEmits(['success'])
// 校验
const formRules = reactive({
  label: [{ required: true, message: '数据标签不能为空', trigger: 'blur' }],
  value: [{ required: true, message: '数据键值不能为空', trigger: 'blur' }],
  parentValue: [{ required: true, message: '父级不能为空', trigger: 'blur' }],
  dataLevel: [{ required: true, message: '层级不能为空', trigger: 'blur' }],
  sort: [{ required: true, message: '排序不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '状态不能为空', trigger: 'change' }]
})

/** 打开弹窗 */
const open = async (type: string, data: string & number) => {
  dialogVisible.value = true
  currentType.value = type
  dialogTitle.value = type === 'add' ? '新增字典数据' : '编辑字典数据'
  resetForm()
  if (type === 'add') {
    formParams.dictType = data
  } else if (type === 'edit') {
    formParams.id = data
    await getDetailHandler(data)
  }
}
defineExpose({ open })

// 获取详情数据
const getDetailHandler = async (id: string) => {
  const params = {
    id
  }
  API.getDataDictDetail(params).then((res) => {
    if (res && res.code === 200) {
      formParams.dictType = res?.data?.dictType
      formParams.label = res?.data?.label
      formParams.value = res?.data?.value
      formParams.parentValue = res?.data?.parentValue
      formParams.dataLevel = res?.data?.dataLevel
      formParams.status = res?.data?.status || 0
      formParams.sort = res?.data?.sort || 0
      formParams.remark = res?.data?.remark
    }
  })
}
// 提交
const submitForm = async () => {
  // 校验
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  const { id, ...others } = formParams
  const addParams = { ...others }
  const editParams = { ...formParams }
  console.log(id)
  formLoading.value = true
  if (currentType.value === 'add') {
    API.addDataDict(addParams)
      .then((res) => {
        formLoading.value = false
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '新增成功'
          })
          emit('success')
          dialogVisible.value = false
        }
      })
      .catch((err) => {
        console.log(err)
      })
    return
  }
  if (currentType.value === 'edit') {
    API.modifyDataDict(editParams)
      .then((res) => {
        formLoading.value = false
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '修改成功'
          })
          emit('success')
          dialogVisible.value = false
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const resetForm = () => {
  formParams.id = ''
  formParams.dictType = ''
  formParams.label = ''
  formParams.value = ''
  formParams.parentValue = ''
  formParams.dataLevel = ''
  formParams.status = 0
  formParams.sort = 0
  formParams.remark = ''
  formRef.value?.resetFields()
}
</script>

<style lang="scss" scoped></style>
