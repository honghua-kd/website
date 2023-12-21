<template>
  <div>
    <el-dialog
      width="60%"
      :title="title"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="expressInfoForm" label-width="130px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="快递内容编号:" prop="expressNo">
              <el-input
                v-model="expressInfoForm.expressNo"
                clearable
                placeholder="请输入快递内容编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              class="express-com"
              label="快递内容类型:"
              prop="expressCompany"
            >
              <el-select
                v-model="expressInfoForm.expressCompanyStatus"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="(item, index) in archiveStatusOpts"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="类型对应编号:" prop="expressNo">
              <el-input
                v-model="expressInfoForm.expressNo"
                clearable
                placeholder="请输入类型对应编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联合同号:" prop="expressNo">
              <el-input
                v-model="expressInfoForm.expressNo"
                clearable
                placeholder="请输入关联合同号"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button type="primary"> 保 存 </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          关 闭
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, Ref, watch, onMounted } from 'vue'
defineProps({
  title: {
    type: String,
    default: ''
  }
})
const expressInfoForm = reactive({})
const dialogVisible = ref<boolean>(false)
/** 打开弹窗 */
const open = async (row: string) => {
  dialogVisible.value = true
}
defineExpose({ open })
</script>

<style scoped></style>
