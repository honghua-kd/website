<template>
  <el-dialog
    v-model="visible"
    title="催办记录"
    width="500px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleClose"
  >
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          :loading="okLoading"
          @click="onCloseModel('update-close')"
          >反馈当前进度</el-button
        >
        <el-button type="primary" @click="onCloseModel('click-close')"
          >催 办</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue'

const activities = [
  {
    content: 'Event start',
    timestamp: '2018-04-15'
  },
  {
    content: 'Approved',
    timestamp: '2018-04-13'
  },
  {
    content: 'Success',
    timestamp: '2018-04-11'
  }
]

const state = reactive({
  visible: false,
  okLoading: false
})
const { visible, okLoading } = toRefs(state)

const emit = defineEmits<{
  (e: 'closeModel', type: string): void
}>()

const handleClose = () => {
  state.visible = false
}

// 弹窗 取消/确定
const onCloseModel = (type: string) => {
  if (type === 'click-close') {
    state.visible = false
    return
  }
  emit('closeModel', type)
  state.visible = false
}

// 打开弹窗
const open = () => {
  state.visible = true
}

defineExpose({ open })
</script>
<style lang="scss">
.confirm-dist {
  text-align: center;
  > p {
    // font-size: 16px;
    font-weight: bold;
  }
  .blue-text {
    color: #409eff;
  }
}
</style>
