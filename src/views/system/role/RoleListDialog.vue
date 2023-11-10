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
        <el-table-column type="selection" width="80" label="全选" />
        <el-table-column align="center" label="权限编码" prop="permiCode" />
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button link type="primary" @click="editHandler(scope.row)">
              修改
            </el-button>
            <el-button link type="warning" @click="delHandler(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-button :disabled="formLoading" type="primary" @click="submitForm">
          确 定
        </el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </template>
    </el-dialog>
    <RoleDataPermissonForm ref="dataPermissionFormRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import RoleDataPermissonForm from './RoleDataPermissonForm.vue'

const tableLoading = ref(false)
const permiList = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('数据权限')
defineEmits(['success'])

/** 打开弹窗 */
const openDialog = (type, row) => {
  dialogVisible.value = true
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
const delHandler = (id) => {
  // 二次确认
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 调用删除接口
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    // searchHandler()
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '删除失败'
    })
  })
}

// 提交选中数据权限
const submitForm = () => {

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
