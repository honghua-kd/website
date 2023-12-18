<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="60%"
    >
      <div class="routes-list">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in routes"
            :key="index"
            :timestamp="activity.scanDateTime + '&nbsp  ' + activity.remark"
          >
            {{ activity.cxPackageMessage }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { logisticsRoutes } from './logisticsRoutes'
import { MoreFilled } from '@element-plus/icons-vue'

import { ref, reactive, computed, onMounted } from 'vue'
const dialogTitle = ref<string>('物流信息')
const dialogVisible = ref<boolean>(false)
const routes = logisticsRoutes.reverse()

/** 打开弹窗 */
const open = () => {
  dialogVisible.value = true
}
defineExpose({ open })
</script>

<style lang="scss" scoped>
.routes-list {
  overflow-y: auto;
  padding-top: 10px;
  height: 45vh;
  :deep(.el-timeline-item__timestamp) {
    line-height: 18px;
  }
}
</style>
