<template>
  <el-dialog
    class="edit-supplier-dialog"
    v-model="dialogVisible"
    :title="dialogTitle"
    width="400px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <el-form :model="basicInfoForm" label-width="120px" label-position="top">
      <el-form-item label="用户名" prop="contactsName">
        <el-input
          placeholder="请输入用户名"
          v-model="basicInfoForm.accountName"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input
          placeholder="请输入联系电话"
          v-model="basicInfoForm.phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          placeholder="请输入邮箱"
          v-model="basicInfoForm.email"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="addHandler"> 确 定 </el-button>
      <el-button type="primary" @click="dialogVisible = false">
        取 消
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, Ref } from 'vue'
import { SupplierAPI } from '@/api'
import type { AddAccountRequest, EditAccountRequest } from '@/api'
import { ElForm, ElMessage } from 'element-plus'
const API = new SupplierAPI()
const dialogVisible = ref<boolean>(false)
type QueryParam = EditAccountRequest & AddAccountRequest
const basicInfoForm = reactive<QueryParam>({
  id: '',
  supplierId: '',
  accountName: '',
  email: '',
  phone: ''
})

/** 打开弹窗 */
const dialogTitle: Ref<string> = ref('新增供应商账号')
const open = async (row?: string, no?: string) => {
  dialogTitle.value = no === 'sid' ? '新增供应商账号' : '编辑供应商账号'
  dialogVisible.value = true
  if (no === 'sid') {
    basicInfoForm.supplierId = row
    basicInfoForm.accountName = ''
    basicInfoForm.email = ''
    basicInfoForm.phone = ''
  } else {
    const data = JSON.parse(JSON.stringify(row))
    basicInfoForm.id = data.id
    basicInfoForm.accountName = data.accountName
    basicInfoForm.email = data.email
    basicInfoForm.phone = data.phone
  }
}
const emit = defineEmits(['success'])
const addHandler = () => {
  if (dialogTitle.value === '新增供应商账号') {
    const params = {
      supplierId: basicInfoForm.supplierId,
      accountName: basicInfoForm.accountName,
      email: basicInfoForm.email,
      phone: basicInfoForm.phone
    }
    API.addAccount(params)
      .then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '新增成功'
          })
          dialogVisible.value = false
          emit('success')
        }
      })
      .catch((err: Error) => {
        throw err
      })
  } else {
    const params = {
      id: basicInfoForm.id,
      accountName: basicInfoForm.accountName,
      email: basicInfoForm.email,
      phone: basicInfoForm.phone
    }
    API.editAccount(params)
      .then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '修改成功'
          })
          dialogVisible.value = false
          emit('success')
        }
      })
      .catch((err: Error) => {
        throw err
      })
  }
}
defineExpose({ open })
</script>

<style scope lang="scss"></style>
