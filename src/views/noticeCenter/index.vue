<template>
  <div class="page-notice-center">
    <!-- 搜索工作栏 -->
    <div class="scan-search-container" ref="searchBoxRef">
      <SearchBar
        v-model="queryParams"
        :dictArray="dictTypes"
        :searchConfig="searchConfig"
        :showExpand="false"
        @reset="reset"
        @search="getList"
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
      :actionWidth="px2rem('100px')"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @selection-change="selectionChangeHandler"
      @size-change="getList"
      @current-change="getList"
    >
      <!-- 批量操作 -->
      <template #btnsBox>
        <el-tooltip content="需勾选下方条目，方可操作" placement="top-start">
          <el-button
            type="primary"
            :icon="Finished"
            @click="markHandler(selectIds)"
          >
            标记已读
          </el-button>
        </el-tooltip>
        <el-tooltip content="需勾选下方条目，方可操作" placement="top-start">
          <el-button
            type="primary"
            :icon="Delete"
            @click="delHandler(selectIds)"
          >
            删除
          </el-button>
        </el-tooltip>
      </template>
      <!-- 表格插槽 -->
      <template #title="{ row }">
        <el-link @click="clickTitle(row)">{{ row.title }}</el-link>
      </template>
      <template #noticeType="{ row }">
        {{ filterDictLabel('NOTICE_MESSGAE_TYPE', row.type) }}
      </template>
      <template #noticeStatus="{ row }">
        <el-tag
          class="ml-2"
          :type="+row.status === NOTICE_STATUS.UNREAD ? 'danger' : 'info'"
          >{{ filterDictLabel('NOTICE_STATUS', row.status) }}</el-tag
        >
      </template>
      <template #action="scope">
        <el-button
          v-if="scope.row.status === NOTICE_STATUS.UNREAD"
          link
          type="primary"
          @click="markHandler([scope.row.id])"
        >
          标记已读
        </el-button>
        <el-button link type="danger" @click="delHandler([scope.row.id])">
          删除
        </el-button>
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import { searchConfig, tableConfig } from './data'
import { reactive, ref, computed } from 'vue'
import { NOTICE_STATUS } from '@/constants'
import { NoticeCenterAPI } from '@/api'
import { NoticeListItem } from '@/api/noticeCenter/types/response'
import { Finished, Delete } from '@element-plus/icons-vue'
import { useDictStore } from '@/store/dict'
import { px2rem } from '@/utils'
import { useRouter } from '@toystory/lotso'
import { ElMessageBox, ElMessage } from 'element-plus'

const dictTypes = ['NOTICE_MESSGAE_TYPE', 'NOTICE_STATUS']

const API = new NoticeCenterAPI()
const dictStore = useDictStore()

// const typesDict = computed(() => {
//   return dictStore.dicts.NOTICE_MESSGAE_TYPE
// })

// const statusDict = computed(() => {
//   return dictStore.dicts.NOTICE_STATUS
// })

const filterDictLabel = (dictCode: string, value: string | number) => {
  return dictStore.dicts[dictCode].find((item) => item.value === String(value))
    ?.label
}

const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  status: null,
  type: null
})

// 重置
const reset = () => {
  queryParams.status = null
  queryParams.type = null
}

const tableLoading = ref(false)
const tableData = reactive<NoticeListItem[]>([])
const pageTotal = ref(0)

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
const selectData = reactive<NoticeListItem[]>([])
const selectionChangeHandler = (item: NoticeListItem[]) => {
  selectData.splice(0, selectData.length)
  selectData.push(...item)
}

const selectIds = computed(() => {
  return selectData.map((item) => {
    return item.id
  })
})

const getList = () => {
  API.getNoticeList(queryParams).then((res) => {
    if (res.data) {
      tableData.splice(0, tableData.length)
      tableData.push(...(res.data.list || []))
      pageTotal.value = Number(res.data.total)
    }
  })
}

// 标记已读
const markHandler = (ids: string[]) => {
  if (!ids.length) {
    ElMessage.error('请选择需要标记的信息')
    return
  }
  API.changeNoticeStatus({
    ids,
    status: NOTICE_STATUS.READ
  }).then(() => {
    getList()
  })
}

// 删除
const delHandler = (ids: string[]) => {
  if (!ids.length) {
    ElMessage.error('请选择需要删除的信息')
    return
  }
  // 二次确认
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    API.deleteNotice({
      ids
    }).then(() => {
      getList()
    })
  })
}

// 跳转
const { router } = useRouter()
const clickTitle = (row: NoticeListItem) => {
  if (row.router) {
    router.push({
      path: row.router,
      query: row.routerParam
    })
  }
}

getList()
</script>

<style lang="scss" scoped>
.table-btn-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}
// .page-notice-center {
// }
</style>
