<template>
  <div>
    <el-dialog v-model="dialogVisible" title="数据权限">
      <el-form ref="formRef" :model="formData" v-loading="formLoading">
        <el-form-item label="角色名称">
          <el-tag>{{ formData.name }}</el-tag>
        </el-form-item>
        <el-form-item label="角色标识">
          <el-tag>{{ formData.code }}</el-tag>
        </el-form-item>
        <el-form-item label="权限范围">
          <el-select v-model="formData.dataScope">
            <el-option
              v-for="item in dataOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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

defineProps({
  roleDataPerm: {
    type: Object,
    default: () => { }
  }
})

const formData = reactive({
  id: 0,
  name: '',
  code: '',
  dataScope: undefined,
  dataScopeDeptIds: []
})
const dataOpts = ref([])
const dialogVisible = ref(false)
const formLoading = ref(false)
// 打开弹窗
const openDialog = (data) => {
  dialogVisible.value = true
  const dictStore = useDictStore()
  dataOpts.value = dictStore?.getDictMap && dictStore?.getDictMap.get('system_data_scope')
  const { id, name, code, dataScope } = data
  formData.id = id
  formData.name = name
  formData.code = code
  formData.dataScope = dataScope
}
defineExpose({ openDialog })
// 提交
const submitForm = () => {
  console.log('test')
}

</script>

<style lang='scss' scoped>
</style>
