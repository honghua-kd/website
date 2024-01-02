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
    <div class="tree-box">
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
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import { SystemAPI } from '@/api'
import { Search } from '@element-plus/icons-vue'
import debounce from 'lodash.debounce'
import { ElTree } from 'element-plus'
import type { ResponseBody, OrgStructure, OrgInfoItem } from '@/api'

const emit = defineEmits(['getSelect'])
const defaultProps = {
  children: 'childOrgList',
  label: 'orgName'
}
const treeRef = ref<InstanceType<typeof ElTree>>()
const orgList: Ref<OrgInfoItem[]> = ref([])
const treeLoading: Ref<boolean> = ref(false)
const searchKey: Ref<string> = ref('')

const systemAPI = new SystemAPI()

const props = withDefaults(
  defineProps<{
    height: string
  }>(),
  {
    height: ''
  }
)
const treehight = computed(() => props.height)

/** 定义方法 */
const handleNodeClick = (data: OrgInfoItem) => {
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
  systemAPI
    .getAllDept()
    .then((res: ResponseBody<OrgStructure>) => {
      treeLoading.value = false
      if (res && res?.code === 200) {
        orgList.value = res?.data?.orgList || []
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
  position: relative;
  padding: 45px 0 15px;
  width: 100%;
  .searchbar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    margin-bottom: 10px;
  }
  .tree-box {
    overflow: auto;
    max-height: v-bind(treehight);
  }
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
