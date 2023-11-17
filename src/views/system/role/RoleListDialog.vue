<template>
  <div>
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-row class="addBtn">
        <el-button @click="addPermiHandler('add')" type="primary">
          新 增
        </el-button>
      </el-row>
      <el-table
        :data="permiList"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        border
        v-loading="tableLoading"
      >
        <!-- <el-table-column align="center" label="工号" prop="staffCode" />
        <el-table-column align="center" label="角色编码" prop="roleCode" /> -->
        <el-table-column align="center" label="权限编码" prop="permissionCode" />
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button link type="primary" @click="editHandler('edit',scope.row)">
              修改
            </el-button>
            <el-button link type="warning" @click="delHandler(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button :disabled="formLoading" type="primary" @click="submitForm">
          确 定
        </el-button>
      </template>
    </el-dialog>
    <RoleDataPermissonForm ref="dataPermissionFormRef" @success="getRolePerList" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import RoleDataPermissonForm from './RoleDataPermissonForm.vue'
import { getRolePermiList, delPermission } from '@/api/system'
const tableLoading = ref(false)
const permiList = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('数据权限')
const formLoading = ref(false)

const emit = defineEmits(['success'])

// 获取角色对应数据权限
const getRolePerList = (roleCode) => {
  const params = {
    roleCode
  }
  getRolePermiList(params).then(res => {
    if (res && res.code === 200) {
      permiList.value = res.data
    }
  })
}
/** 打开弹窗 */
const openDialog = (row) => {
  dialogVisible.value = true
  const { roleNo } = row
  getRolePerList(roleNo)
}
defineExpose({ openDialog })

// 新增数据权限
const dataPermissionFormRef = ref()
const addPermiHandler = (type) => {
  dataPermissionFormRef.value.openDialog(type)
}
// 修改
const editHandler = (type, row) => {
  dataPermissionFormRef.value.openDialog(type, row)
}
// 删除
const delHandler = (row) => {
  // 二次确认
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const { id, roleNo } = row
    const params = {
      id
    }
    // 调用删除接口
    delPermission(params).then(res => {
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        getRolePerList(roleNo)
      }
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '删除失败'
    })
  })
}

// 提交选中数据权限
const submitForm = () => {
  dialogVisible.value = false
  emit('success')
}
</script>

<style lang='scss' scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.addBtn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
