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
            <el-form-item label="快递内容编号:" prop="contentNo">
              <el-input
                v-model="expressInfoForm.contentNo"
                clearable
                placeholder="请输入快递内容编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              class="express-com"
              label="快递内容类型:"
              prop="contentType"
            >
              <el-select
                v-model="expressInfoForm.contentType"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="(item, index) in contentTypeOpts"
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
            <el-form-item label="类型对应编号:" prop="contentTypeNumber">
              <el-input
                v-model="expressInfoForm.contentTypeNumber"
                clearable
                placeholder="请输入类型对应编号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联合同号:" prop="contractNo">
              <el-input
                v-model="expressInfoForm.contractNo"
                clearable
                placeholder="请输入关联合同号"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="saveExpressHandler">
          保 存
        </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          关 闭
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { warn } from 'console'
import { ref, reactive, Ref, watch, onMounted } from 'vue'
defineProps({
  title: {
    type: String,
    default: ''
  }
})
let expressInfoForm = reactive({})
const dialogVisible = ref<boolean>(false)

const emit = defineEmits(['editcontent'])
const saveExpressHandler = () => {
  dialogVisible.value = false
  emit('editcontent', expressInfoForm)
}
/** 打开弹窗 */
const open = async (row: string) => {
  dialogVisible.value = true
  if (row) {
    expressInfoForm = row
  } else {
    expressInfoForm.id = ''
    expressInfoForm.contentNo = ''
    expressInfoForm.contentType = ''
    expressInfoForm.contentTypeNumber = ''
    expressInfoForm.contractNo = ''
  }
}
defineExpose({ open })
</script>

<style scoped></style>
