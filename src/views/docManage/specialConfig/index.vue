<template>
  <div>
    <!-- 搜索工作栏 -->
    <div class="scan-search-container" ref="searchBoxRef">
      <SearchBar
        v-model="queryParams"
        :dictArray="dictTypes"
        :searchConfig="searchConfig"
        :showExpand="false"
        @reset="reset"
        @search="searchHandler"
        :labelWidth="'120px'"
        :is-search-btn="true"
      />
    </div>
    <el-divider border-style="dashed" />
    <Table
      :data="tableData"
      :loading="tableLoading"
      :columnConfig="tableConfig"
      :isSelected="true"
      :page-total="pageTotal"
      :setColumnEnable="true"
      :height="tableHeight"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @selection-change="selectionChangeHandler"
      @size-change="getList"
      @current-change="getList"
    >
      <!-- 批量操作 -->
      <template #btnsBox>
        <el-button type="primary" :icon="Plus" @click="addHandler">
          新增
        </el-button>
      </template>
      <template #column-switch="{ row, prop }">
        <el-switch
          v-model="row[prop]"
          @click="switchHandler(row.batchNo, row[prop])"
          :active-value="1"
          :inactive-value="0"
        />
      </template>

      <template #action="scope">
        <el-button link type="primary" @click="editHandler(scope.row.batchNo)">
          编辑
        </el-button>
        <el-button link type="danger" @click="delHandler(scope.row.batchNo)">
          删除
        </el-button>
      </template>
    </Table>
    <EditDialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :dialog-content-config="dialogContentConfig"
      :dictTypes="dictTypes"
      v-model:dialogQueryParams="dialogQueryParams"
    >
      <template #default>
        <SearchBar
          v-model="dialogQueryParams"
          :dictArray="dictTypes"
          :searchConfig="dialogContentConfig"
          :showExpand="false"
          :labelWidth="'120px'"
          :is-search-btn="false"
        >
          <!-- <template #originalDocument>
            <el-input
              v-model="dialogQueryParams.replaceDocumentNo"
              placeholder="请输入"
            />
          </template> -->
          <template #replaceDocument>
            <el-input
              v-model="dialogQueryParams.replaceDocumentNo"
              placeholder="请输入"
            />
          </template>
        </SearchBar>
      </template>
    </EditDialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref, computed } from 'vue'
import SearchBar from '@/components/SearchBar/index.vue'
import EditDialog from '@/components/EditDialog/index.vue'
import { searchConfig, tableConfig, dialogContentConfig } from './data'
import { Plus } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { SpecialConfigAPI } from '@/api'
import type { SpecialListItem, SpecialListRequest, EditRequest } from '@/api'

const API = new SpecialConfigAPI()
const queryParams = reactive<SpecialListRequest>({
  pageNo: 1,
  pageSize: 10
})
const dialogQueryParams = reactive<EditRequest>({
  batchNo: '',
  originalDocumentNo: [],
  replaceDocumentNo: '',
  systemContractStatus: [[]]
})

const dictTypes = ['SYSTEM_DOCUMENT_TYPE']
const tableData = reactive<SpecialListItem[]>([])
const tableLoading = ref<boolean>(false)
const pageTotal: Ref<number> = ref(0) // 列表的总页数

// 表格最大高度
const searchBoxRef = ref()
const tableHeight = computed(() => {
  if (searchBoxRef.value?.clientHeight) {
    const height = Number(
      document.documentElement.clientHeight -
        200 -
        searchBoxRef.value?.clientHeight
    )
    return height
  } else {
    const height = Number(document.documentElement.clientHeight - 200)
    return height
  }
})

// 选择的数据
const selectData = reactive<SpecialListItem[]>([])
const selectionChangeHandler = (item: SpecialListItem[]) => {
  selectData.splice(0, selectData.length)
  selectData.push(...item)
}

// 重置
const reset = () => {
  queryParams.pageNo = 1
  queryParams.pageSize = 10
  queryParams.replaceDocumentType = ''
  queryParams.originalDocumentType = ''
}

// 查询
const searchHandler = () => {
  queryParams.pageNo = 1
  getList()
}

// 获取列表
const getList = () => {
  const params = {
    ...queryParams
  }
  API.getSpecialList(params).then((res) => {
    if (res && res.code === 200) {
      tableData.splice(0, tableData.length)
      tableData.push(...(res?.data?.list || []))
      pageTotal.value = res?.data?.total || 0
    }
  })
}

// 新增
const dialogTitle = ref<string>('')
const dialogVisible = ref<boolean>(false)

const addHandler = () => {
  dialogVisible.value = true
  dialogTitle.value = '新增文书'
}

// 编辑
const editHandler = (id: string) => {
  console.log('id', id)
  dialogVisible.value = true
  dialogTitle.value = '编辑文书'
}
// 删除
const delHandler = (batchNo: string) => {
  // 二次确认
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 调用删除接口
      const params = {
        batchNo
      }

      API.delDocConfig(params).then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          getList()
        }
      })
    })
    .catch((err: Error) => {
      throw err
    })
}

// 状态开关
const switchHandler = (batchNo: string, status: number) => {
  const params = {
    batchNo,
    status
  }

  API.changeStatus(params).then((res) => {
    if (res && res.code === 200) {
      getList()
    }
  })
}

const init = () => {
  searchHandler()
}
init()
</script>

<style lang="scss" scoped></style>
