<template>
  <div>
    <el-card>
      <el-form :model="queryParams" ref="formRef">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="规则名称:" prop="chepai">
              <el-input
                v-model="queryParams.isUsed"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="适用业务类型:" prop="city">
              <el-select
                v-model="queryParams.isUsed"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in statusOpts"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="规则状态:" prop="chepai">
              <el-select
                v-model="queryParams.isUsed"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in statusOpts"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="searchHandler"> 查询 </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-row :gutter="8" style="margin: 10px 0">
      <el-col :span="1.5">
        <el-button type="primary" @click="addHandler"> 新增 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" @click="importHandler"> 批量导入 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" @click="downloadTemplate">
          下载导入模版
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary"> 下载 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary"> 删除 </el-button>
      </el-col>
    </el-row>
    <!-- <Table
      :isSelected="true"
      :data="tableData"
      :columnConfig="Columns"
      :loading="tableLoading"
      :page-total="pageTotal"
      :setColumnEnable="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @selection-change="selectionChangeHandler"
      @header-click="headerClickHandler"
    >
      <template #column-switch="{ row, prop }">
        <el-switch v-model="row[prop]" @click="editHandler(row[prop])" />
      </template>
      <template #action="scope">
        <el-button link type="primary" @click="editHandler(scope.row)">
          编辑
        </el-button>
        <el-button link type="primary" @click="handleDelect(scope.row)">
          删除
        </el-button>
      </template>
    </Table> -->
    <OperDialog ref="operRef" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import OperDialog from './components/operDialog.vue'
import { RuleAPI, CommonAPI } from '@/api'
import { handleDownloadFile } from '@/utils'
const CommonApi = new CommonAPI()
const RuleApi = new RuleAPI()
import type { RuleListRequest } from '@/api'
const statusOpts = reactive([
  {
    dictLabel: '城',
    dictValue: 1
  },
  {
    dictLabel: '市',
    dictValue: 0
  }
])
const queryParams = reactive<RuleListRequest>({
  pageNo: 1,
  pageSize: 10,
  isUsed: 0,
  ruleBusinessType1: '',
  ruleBusinessType2: ''
})

const searchHandler = () => {
  queryParams.pageNo = 1
  getList()
}
const getList = async () => {
  RuleApi.getRuleList(queryParams)
    .then((res) => {
      console.error(res)
    })
    .catch((err: Error) => {
      throw err
    })
}
const operRef = ref()
const addHandler = () => {
  operRef.value.open('add')
}
const importHandler = () => {}
// 下载模板
const downloadTemplate = () => {
  const params = {
    bizType: ''
  }
  CommonApi.getDownLoadTemplate(params)
    .then((res) => {
      handleDownloadFile(res)
    })
    .catch((err: Error) => {
      throw err
    })
}
</script>

<style scoped></style>
