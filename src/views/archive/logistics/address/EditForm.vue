<template>
  <div>
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="60%"
    >
      <el-form
        ref="formRef"
        :model="basicInfoForm"
        :label-width="px2rem('100px')"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="联系人名称:"
              prop="userName"
              :rules="[
                { required: true, message: '联系人名称不能为空' },
                {
                  max: 200,
                  message: '内容超长',
                  trigger: 'change'
                }
              ]"
            >
              <el-input
                v-model="basicInfoForm.userName"
                clearable
                placeholder="请输入联系人名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="联系人电话:"
              prop="userPhone"
              :rules="[
                {
                  message: '请输入正确的电话号码',
                  type: 'string',
                  pattern: /^1[3456789]\d{9}$/,
                  trigger: 'change'
                }
              ]"
            >
              <el-input
                v-model="basicInfoForm.userPhone"
                clearable
                placeholder="请输入联系人电话"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="邮箱:"
              prop="userMail"
              :rules="[
                {
                  type: 'email',
                  message: '请输入正确的邮箱地址',
                  trigger: ['blur', 'change']
                }
              ]"
            >
              <el-input
                v-model="basicInfoForm.userMail"
                clearable
                placeholder="请输入联系人邮箱"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item
              label="地址:"
              prop="userAddress"
              :rules="[
                {
                  max: 200,
                  message: '内容超长',
                  trigger: 'change'
                }
              ]"
            >
              <el-input
                v-model="basicInfoForm.userAddress"
                clearable
                placeholder="请输入地址"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="addHandler"> 保 存 </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          取 消
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElForm } from 'element-plus'
import type { UsualAddressListItem } from '@/api'
import { ExpressAPI } from '@/api'
import { px2rem } from '@/utils'
const formRef = ref<InstanceType<typeof ElForm>>()
const API = new ExpressAPI()
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
const dialogVisible = ref<boolean>(false)
const basicInfoForm = reactive<UsualAddressListItem>({
  id: '',
  userName: '',
  userPhone: '',
  userMail: '',
  userAddress: '',
  province: '',
  city: '',
  area: '',
  value: ''
})
const emit = defineEmits(['success'])
const addHandler = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  if (props.title === '新增联系人信息') {
    const params = {
      userName: basicInfoForm.userName,
      userPhone: basicInfoForm.userPhone,
      userMail: basicInfoForm.userMail,
      userAddress: basicInfoForm.userAddress
    }
    API.addUsualAddress(params)
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
        console.log(err)
      })
  } else {
    const params = {
      userName: basicInfoForm.userName,
      userPhone: basicInfoForm.userPhone,
      userMail: basicInfoForm.userMail,
      userAddress: basicInfoForm.userAddress,
      id: basicInfoForm.id
    }
    API.editUsualAddress(params)
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
        console.log(err)
      })
  }
}
/** 打开弹窗 */
const open = (row?: string) => {
  dialogVisible.value = true
  if (row) {
    const data = JSON.parse(JSON.stringify(row))
    basicInfoForm.id = data.id
    basicInfoForm.userName = data.userName
    basicInfoForm.userPhone = data.userPhone
    basicInfoForm.userMail = data.userMail
    basicInfoForm.userAddress = data.userAddress
    basicInfoForm.province = data.province
    basicInfoForm.city = data.city
    basicInfoForm.area = data.area
  } else {
    basicInfoForm.id = ''
    basicInfoForm.userName = ''
    basicInfoForm.userPhone = ''
    basicInfoForm.userMail = ''
    basicInfoForm.userAddress = ''
    basicInfoForm.province = ''
    basicInfoForm.city = ''
    basicInfoForm.area = ''
  }
}
defineExpose({ open })
</script>

<style lang="scss" scoped></style>
