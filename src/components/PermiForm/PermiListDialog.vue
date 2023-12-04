<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-row class="add-btn">
        <el-button @click="addPermiHandler('add', currentRowNo)" type="primary">
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
        <el-table-column
          align="center"
          label="权限编码"
          prop="permissionCode"
        />
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button
              link
              type="primary"
              @click="editHandler('edit', scope.row)"
            >
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
    <DataPermissonForm
      ref="dataPermissionFormRef"
      @roleList="getRolePerList"
      @userList="getUserPerList"
      :origin="origin"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import DataPermissonForm from '@/components/PermiForm/DataPermissonForm.vue'
import { SystemAPI } from '@/api'
import type {
  UserListPermissionRequest,
  ResponseBody,
  UserListPermission,
  RoleListPermission,
  PermissionDelRequest,
  RoleDO,
  StaffListItem
} from '@/api'

const tableLoading = ref(false)
const permiList: Ref<UserListPermission[] | RoleListPermission[]> = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('数据权限')
const formLoading = ref(false)
const currentRowNo: Ref<string> = ref('')
const emit = defineEmits(['success'])
const origin = ref('')

const systemAPI = new SystemAPI()
// 获取角色对应数据权限
const getRolePerList = (roleCode: string) => {
  const params: RoleListPermission = {
    roleCode
  }
  systemAPI
    .getRolePermiList(params)
    .then((res) => {
      if (res && res.code === 200) {
        permiList.value = res.data || []
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

// 获取用户对应数据权限
const getUserPerList = (staffCode: string) => {
  const params: UserListPermissionRequest = {
    staffCode
  }
  systemAPI
    .getUserPermiList(params)
    .then((res: ResponseBody<UserListPermission[]>) => {
      if (res && res.code === 200) {
        permiList.value = res.data || []
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
/** 打开弹窗 */
const openDialog = (
  from: 'roleCode' | 'staffCode',
  row: RoleDO & StaffListItem
) => {
  dialogVisible.value = true
  origin.value = from
  if (from === 'roleCode') {
    const { roleNo } = row
    currentRowNo.value = roleNo || ''
    getRolePerList(roleNo || '')
  } else if (from === 'staffCode') {
    const { staffCode } = row
    currentRowNo.value = staffCode || ''
    getUserPerList(staffCode || '')
  }
}
defineExpose({ openDialog })

// 新增数据权限
const dataPermissionFormRef = ref<InstanceType<typeof DataPermissonForm>>()
const addPermiHandler = (type: 'add' | 'edit', data: string) => {
  dataPermissionFormRef.value?.openDialog(type, data)
}
// 修改
const editHandler = (
  type: 'edit',
  row: UserListPermission | RoleListPermission
) => {
  dataPermissionFormRef.value?.openDialog(type, row)
}
// 删除
const delHandler = (row: UserListPermission | RoleListPermission) => {
  // 二次确认
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      const { id, roleCode } = row

      const params: PermissionDelRequest = {
        id
      }
      // 调用删除接口
      systemAPI.delPermission(params).then((res) => {
        if (res && res.code === 200 && res.data === true) {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          getRolePerList(roleCode || '')
        }
      })
    })
    .catch(() => {
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

<style lang="scss" scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.add-btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
