<template>
  <div class="container">
     <el-input
      v-model="searchKey"
      class="searchbar"
      placeholder="请输入部门"
      :prefix-icon="Search"
      @input="searchHandler"
      clearable
    />
   <el-tree
      ref="treeRef"
      :data="orgList"
      :props="defaultProps"
      @node-click="handleNodeClick"
      highlight-current
      :filter-node-method="filterNode"
      v-loading="treeLoading"
    >
    <template #empty>
      <div class="empty-container">
        <el-empty description="暂无数据" :image-size="100"/>
      </div>
    </template>
  </el-tree>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAllDept } from '@/api/system'
import { Search } from '@element-plus/icons-vue'
import debounce from 'lodash.debounce'

const emit = defineEmits(['getSelect'])
const defaultProps = {
  children: 'childOrgList',
  label: 'orgName'
}
const treeRef = ref(null)
const orgList = ref([])
const treeLoading = ref(false)
const searchKey = ref('')
/** 定义方法 */
const handleNodeClick = (data) => {
  emit('getSelect', data)
}
const searchHandler = debounce((value) => {
  treeRef.value.filter(value)
}, 500)

const filterNode = (name, data) => {
  if (!name) return true
  return data.orgName.includes(name)
}

const init = () => {
  treeLoading.value = true
  getAllDept().then(res => {
    treeLoading.value = false
    if (res && res.code === 200) {
      orgList.value = res?.data?.orgList
    }
  }).catch(err => {
    treeLoading.value = false
    throw new Error(err)
  })
}
init()
</script>

<style lang='scss' scoped>

.container {
  width: 100%;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.searchbar {
  margin-bottom:10px;
}

.empty-container {
  width:100%;
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
