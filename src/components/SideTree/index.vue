<template>
  <div class="container">
   <el-tree :data="orgList" :props="defaultProps" @node-click="handleNodeClick" highlight-current/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAllDept } from '@/api/system'

const emit = defineEmits(['getSelect'])
const defaultProps = {
  children: 'childOrgList',
  label: 'orgName'
}
const orgList = ref([])
/** 定义方法 */
const handleNodeClick = (data) => {
  emit('getSelect', data)
}
const init = () => {
  getAllDept().then(res => {
    if (res && res.code === 200) {
      orgList.value = res?.data?.orgList
    }
  })
}
init()
</script>

<style lang='scss' scoped>
.container {
  width: 100%;
  padding: 10px 0px;
}

.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

:deep(.el-tree-node__content) {
  margin-bottom: 4px;
  height: auto;
}
</style>
