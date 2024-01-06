<template>
  <div>
    <div class="scan-search-container" ref="searchBoxRef">
      <SearchBar
        v-model="queryParams"
        :dictArray="dictTypes"
        :searchConfig="searchConfig"
        :showExpand="true"
        @reset="reset"
        @search="searchHandler"
      />
    </div>
    <el-row>
      <el-col>
        <el-tooltip content="导出" placement="top-start">
          <el-button type="primary" :icon="Download" @click="handleSendExport">
            导出
          </el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <Table
      :data="tableData"
      :loading="tableLoading"
      :columnConfig="tableConfig"
      :isSelected="true"
      :page-total="pageTotal"
      :setColumnEnable="true"
      row-key="id"
      :tree-props="{ children: 'target' }"
      v-model:pageSize="queryParams.pageSize"
      v-model:pageNo="queryParams.pageNo"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #default="{ row, prop }">
        <span v-if="prop === 'sourceSystem1Str'">
          {{ row.sourceSystem1Str + ' ' + row.sourceSystem2Str }}
        </span>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Download } from '@element-plus/icons-vue'
import Table from '@/components/Table/index.vue'
import type { ITableConfigProps } from '@/components/Table/type'
import type { ISearchUnit } from '@/components/SearchBar/type'
import { reactive, ref, Ref, onMounted } from 'vue'
import type { SendMessageList } from '@/api/message/types/response.ts'
import type {
  SendMessageRequest,
  ExportSendRequest
} from '@/api/message/types/request.ts'
import { handleDownloadFile } from '@/utils'

import { MessageAPI } from '@/api'
const API = new MessageAPI()
const dictTypes = ['ARCHIVE_STATUS', 'OCR_STATUS']

onMounted(() => {
  searchHandler()
})
const tableData: Ref<SendMessageList[]> = ref([])
const tableLoading: Ref<boolean> = ref(false)
const pageTotal: Ref<number> = ref(0) // 列表的总页数
const queryParams = reactive<SendMessageRequest>({
  pageNo: 1,
  pageSize: 20,
  templateName: '',
  templateCode: '',
  sendTimeStart: '',
  sendTimeEnd: '',
  contractRelation: '',
  bizRelation: '',
  sendStatus: '',
  userNumber: '',
  receiveName: ''
})
const exportParams = reactive<ExportSendRequest>({
  templateName: '',
  templateCode: '',
  bizType: '',
  contractRelation: '',
  bizRelation: '',
  sendTimeStart: '',
  sendTimeEnd: ''
})
const searchHandler = async () => {
  API.getSendPageRecord(queryParams).then((res) => {
    if (res.code === 200 && res.data) {
      tableData.value = res?.data?.list
      pageTotal.value = res?.data?.total
    }
  })
}
// 分页
const handleCurrentChange = (val: number) => {
  queryParams.pageNo = val
  searchHandler()
}

// 页面条数改变
const handleSizeChange = (val: number) => {
  queryParams.pageSize = val
  searchHandler()
}
const reset = () => {
  queryParams.pageNo = 0
  queryParams.pageSize = 0
  queryParams.templateName = ''
  queryParams.templateCode = ''
  queryParams.sendTimeStart = ''
  queryParams.sendTimeEnd = ''
  queryParams.contractRelation = ''
  queryParams.bizRelation = ''
  queryParams.sendStatus = ''
  queryParams.userNumber = ''
  queryParams.receiveName = ''
  searchHandler()
}
const handleSendExport = () => {
  exportParams.templateName = queryParams.templateName
  exportParams.templateCode = queryParams.templateCode
  exportParams.contractRelation = queryParams.contractRelation
  exportParams.bizRelation = queryParams.bizRelation
  exportParams.sendTimeStart = queryParams.sendTimeStart
  exportParams.sendTimeEnd = queryParams.sendTimeEnd
  API.exportExcelSendMessage(exportParams).then((res) => {
    handleDownloadFile(res)
    ElMessage({
      type: 'success',
      message: '操作成功'
    })
  })
}
const searchConfig: ISearchUnit[] = [
  {
    compType: 'el-input',
    colSpan: 6,
    label: '短信接收方',
    prop: 'receiveName',
    placeholder: '请输入短信接收方'
  },
  {
    compType: 'el-input',
    colSpan: 6,
    label: '短信接收号码',
    prop: 'userNumber',
    placeholder: '请输入短信接收号码'
  },
  {
    compType: 'el-input',
    colSpan: 6,
    label: '关联业务编号',
    prop: 'bizRelation',
    placeholder: '请输入关联业务编号'
  },
  // {
  //   compType: 'el-select',
  //   colSpan: 6,
  //   label: '发送状态',
  //   prop: 'sendStatus',
  //   placeholder: '请选择发送状态',
  //   options: 'OCR_STATUS'
  // },
  {
    compType: 'el-input',
    colSpan: 6,
    label: '模板名字',
    prop: 'templateName',
    placeholder: '请输入模板名字'
  },
  {
    compType: 'el-input',
    colSpan: 6,
    label: '合同号',
    prop: 'contractRelation',
    placeholder: '请输入合同号'
  },
  {
    compType: 'el-input',
    colSpan: 6,
    label: '模板编号',
    prop: 'templateCode',
    placeholder: '请输入模板编号'
  },
  {
    compType: 'el-date-picker',
    colSpan: 12,
    label: '短信发送时间',
    propStart: 'sendTimeStart',
    propEnd: 'sendTimeEnd',
    placeholderStart: '开始时间',
    placeholderEnd: '结束时间'
  }
]
const tableConfig: ITableConfigProps[] = [
  {
    label: '来源系统',
    prop: 'sourceSystem1Str',
    width: 160,
    align: 'left',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '业务类型',
    prop: 'bizTypeName',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '模板编号',
    prop: 'templateName',
    width: 200,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '模板名称',
    prop: 'templateContent',
    width: 260,
    align: 'left',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '关联合同号',
    prop: 'contractRelation',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '关联业务编号',
    prop: 'bizRelation',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '短信接收方',
    prop: 'receiveName',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  // {
  //   label: '使用模板',
  //   prop: 'updateTime',
  //   width: 160,
  //   align: 'center',
  //   showOverflowTooltip: true,
  //   fixed: false,
  //   forbiddenEdit: false
  // },
  {
    label: '短信内容',
    prop: 'templateContent',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '短信发送状态',
    prop: 'sendStatusName',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '发送人',
    prop: 'senderName',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  },
  {
    label: '发送时间',
    prop: 'sendTime',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    fixed: false,
    forbiddenEdit: false
  }
]
</script>

<style lang="scss" scoped>
.scan-search-container {
  width: 100%;
}
.scan-search-bar {
  padding: 6px 10px;
  width: calc(100% - 216px);
}
.search-btn {
  padding: 6px 10px;
  height: 44px;
}
.arrow {
  margin-bottom: 10px;
  text-align: center;
  color: $base-color-primary;
  cursor: pointer;
}
</style>
