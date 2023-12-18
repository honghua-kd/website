<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="50%"
    >
      <el-upload>
        上传文件: &nbsp;&nbsp;&nbsp;<el-button type="primary"
          >选择文件</el-button
        >
      </el-upload>
      <template #footer>
        <el-button> 模板下载 </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          导入
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

const dialogTitle = ref<string>('批量导入')
const dialogVisible = ref<boolean>(false)
/** 打开弹窗 */
const open = () => {
  dialogVisible.value = true
}
defineExpose({ open })
</script>

<style scoped></style>
