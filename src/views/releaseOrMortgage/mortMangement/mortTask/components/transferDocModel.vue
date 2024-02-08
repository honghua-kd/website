<template>
  <el-dialog
    v-model="visible"
    title="移交登记证书"
    width="350px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleClose"
  >
    <div class="confirm-dist">
      <p>您已选择<span class="blue-text">20</span>个抵押任务</p>
      <p>是否确认移交至档案管理部</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          :loading="okLoading"
          @click="onCloseModel('update-close')"
          >确 定</el-button
        >
        <el-button @click="onCloseModel('click-close')">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue'

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
