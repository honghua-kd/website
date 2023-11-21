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
      <el-form-item label="字典类型" prop="dictType" >
        <el-input v-model="formParams.dictType" disabled/>
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
      <el-form-item label="层级" prop="level">
        <el-input v-model="formParams.level" />
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
            <el-radio v-for="item in statusOpt"  :key="item.id" :label="item.value" >
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

<script setup>
import { ref, reactive } from 'vue'
import { addDataDict, modifyDataDict } from '@/api/system'
import { ElMessage } from 'element-plus'

const dialogTitle = ref('')
const dialogVisible = ref(false)
const currentType = ref('')
const formLoading = ref(false)
const formParams = reactive({
  id: '',
  dictType: '', // 字典类型
  label: '', // 数据标签
  value: '', // 数据键值
  parentValue: '', // 父级
  level: '', // 层级
  status: 0, // 状态
  sort: 0, // 排序
  remark: '' // 备注
})
const formRules = ref(null)
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

/** 打开弹窗 */
const open = (type, data) => {
  dialogVisible.value = true
  currentType.value = type
  dialogTitle.value = type === 'add' ? '新增字典数据' : '编辑字典数据'
  if (type === 'add') {
    formParams.dictType = data
  }
}
defineExpose({ open })
// 提交
const submitForm = () => {
  // 校验
  const { id, ...others } = formParams
  const params = currentType.value === 'add' ? { ...others } : { ...formParams }
  if (currentType.value === 'add') {
    addDataDict(params).then(res => {
      if (res && res.code === 200) {
        ElMessage('新增成功')
        emit('success')
        dialogVisible.value = false
      }
    }).catch(err => {
      console.log(err)
    })
  } else if (currentType.value === 'edit') {
    modifyDataDict(params).then(res => {
      if (res && res.code === 200) {
        ElMessage('修改成功')
        emit('success')
        dialogVisible.value = false
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang='scss' scoped>

</style>
