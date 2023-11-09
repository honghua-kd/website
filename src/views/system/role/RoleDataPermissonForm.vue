<template>
  <div>
    <el-dialog v-model="dialogVisible" title="数据权限">
      <el-form ref="formRef" :model="formData" v-loading="formLoading">
        <el-form-item label="角色名称：">
          <el-tag>{{ formData.name }}</el-tag>
        </el-form-item>
        <el-form-item label="角色标识：">
          <el-tag>{{ formData.code }}</el-tag>
        </el-form-item>
        <el-form-item label="权限范围：">
          <el-select v-model="formData.dataScope">
            <el-option
              v-for="item in dataOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="权限范围选择：" v-if="formData.dataScope === 2">
          <el-card shadow="never" style="width: 80%">
            <el-tree
              ref="treeRef"
              :data="deptOptions"
              show-checkbox
              default-expand-all
              node-key="id"
              highlight-current
              :props="defaultProps"
              @check="getCheckedNodesHandler"
            />
          </el-card>
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
import { getDeptInfo, subDataPermission } from '@/api/system'
import { ElMessage } from 'element-plus'

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
const deptOptions = ref([]) // 部门树形结构
const treeRef = ref() // 菜单树组件 Ref

const dialogVisible = ref(false)
const formLoading = ref(false)
// 打开弹窗
const openDialog = async (data) => {
  dialogVisible.value = true
  await getDeptTree()
  const dictStore = useDictStore()
  dataOpts.value = dictStore?.getDictMap && dictStore?.getDictMap.get('system_data_scope')
  const { id, name, code, dataScope, dataScopeDeptIds } = data
  formData.id = id
  formData.name = name
  formData.code = code
  formData.dataScope = dataScope
  dataScopeDeptIds?.forEach((deptId) => {
    treeRef.value.setChecked(deptId, true, false)
  })
}
defineExpose({ openDialog })
// 提交
const emit = defineEmits(['success'])
const submitForm = () => {
  const { id, dataScope, dataScopeDeptIds } = formData
  const params = {
    roleId: id,
    dataScope,
    dataScopeDeptIds
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
const defaultProps = {
  children: 'children',
  label: 'name'
}
// 获取部门信息
const getDeptTree = () => {
  getDeptInfo().then(res => {
    if (res && res.code === 200) {
      deptOptions.value = res.data
    }
  }).catch(err => {
    console.log(err)
  })
}
// 获取选中节点信息
const getCheckedNodesHandler = (item, checked) => {
  const { checkedKeys } = checked
  formData.dataScopeDeptIds = [...checkedKeys]
}
</script>

<style lang='scss' scoped>
</style>
