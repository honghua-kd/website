<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="60%"
    >
      <el-form ref="formRef" :model="formParamsRequest" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="联系人名称:"
              prop="contractName"
              :rules="[{ required: true }]"
            >
              <el-input
                v-model="basicInfoForm.contractName"
                clearable
                placeholder="请输入联系人名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人电话:" prop="contractWay">
              <el-input
                v-model="basicInfoForm.contractWay"
                clearable
                placeholder="请输入联系人电话"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱:" prop="email">
              <el-input
                v-model="basicInfoForm.email"
                clearable
                placeholder="请输入联系人名称"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item label="地址:" prop="address">
              <el-input
                v-model="basicInfoForm.address"
                clearable
                placeholder="请输入地址"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button type="primary"> 新 增 </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          取 消
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { UploadFilled, Delete, ZoomIn } from '@element-plus/icons-vue'
import { ElMessage, ElForm } from 'element-plus'
import type { UploadFile, UploadRawFile } from 'element-plus'

const dialogTitle = ref<string>('联系人信息')
const dialogVisible = ref<boolean>(false)
const basicInfoForm = reactive({})
/** 打开弹窗 */
const open = () => {
  dialogVisible.value = true
}
defineExpose({ open })
</script>

<style lang="scss" scoped></style>
