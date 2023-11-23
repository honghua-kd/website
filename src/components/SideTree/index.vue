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
          <el-empty description="暂无数据" :image-size="100" />
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import { getAllDept } from '@/api/system'
import { Search } from '@element-plus/icons-vue'
import debounce from 'lodash.debounce'
import { ElTree } from 'element-plus'
import type { OrgTree } from '@/types/api'

const emit = defineEmits(['getSelect'])
const defaultProps = {
  children: 'childOrgList',
  label: 'orgName'
}
const treeRef = ref<InstanceType<typeof ElTree>>()
const orgList: Ref<OrgTree[]> = ref([])
const treeLoading = ref(false)
const searchKey = ref('')
/** 定义方法 */
const handleNodeClick = (data: OrgTree) => {
  emit('getSelect', data)
}
const searchHandler = debounce((value) => {
  treeRef.value!.filter(value)
}, 500)

interface Tree {
  [key: string]: unknown
}

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return (data.orgName as string).includes(value)
}

const init = () => {
  treeLoading.value = true
  getAllDept()
    .then((res) => {
      treeLoading.value = false
      if (res && res.code === 200) {
        orgList.value = res?.data?.orgList
      }
    })
    .catch((err) => {
      treeLoading.value = false
      throw new Error(err)
    })
}
init()
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  width: 100%;
  flex-direction: column;
}
.searchbar {
  margin-bottom: 10px;
}
.empty-container {
  width: 100%;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  color: var(--el-color-primary);
  cursor: pointer;
}
:deep(.el-tree-node__content) {
  margin-bottom: 4px;
  height: auto;
}
</style>
