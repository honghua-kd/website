<template>
  <el-dialog
    v-model="modelVisible"
    title="选择审核路径"
    width="550px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleClose"
  ></el-dialog>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
type Iprops = {
  visible: boolean
  documentNos: string[]
}
const props = withDefaults(defineProps<Iprops>(), {
  visible: false,
  documentNos: () => []
})
const modelVisible = ref<boolean>(false)
// const approvalPath = ref<string>('')
watch(
  () => props.visible,
  (newVisible) => {
    modelVisible.value = newVisible
  }
)

const handleClose = () => {}
</script>
