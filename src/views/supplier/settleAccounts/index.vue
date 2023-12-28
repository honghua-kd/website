<template>
  <div class="settle-container">
    <!-- filter -->
    <el-card :body-style="{ padding: '10px 10px 0px' }">
      <el-form :inline="true" :model="formModel" class="filter-form">
        <el-form-item label="供应商名称">
          <el-input v-model="formModel.supplierName" />
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="formModel.city" />
        </el-form-item>
        <el-form-item label="结算状态">
          <el-select v-model="formModel.status">
            <el-option
              v-for="item in statusArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="抵押主体">
          <el-select placeholder="请选择" v-model="formModel.mortgageMain">
            <el-option
              v-for="item in mortgageMainArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="合同归属">
          <el-select placeholder="请选择" v-model="formModel.contractBelong">
            <el-option
              v-for="item in contractBelongArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="合同号">
          <el-input v-model="formModel.contractCode" />
        </el-form-item>
        <el-form-item label="订单类型">
          <el-select v-model="formModel.orderType">
            <el-option
              v-for="item in ordertypeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="完成时间">
          <el-date-picker
            v-model="formModel.finishTime"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="A hh:mm:ss"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="search">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- action -->
    <div class="action">
      <el-button
        v-for="i in actionList"
        :key="i.value"
        type="primary"
        @click="action(i.value)"
        >{{ i.label }}</el-button
      >
    </div>
    <!-- list -->
    <div class="list">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @select="selectData"
        @select-all="selectAllData"
      >
        <el-table-column
          v-for="i in tableColumn"
          :key="i.label"
          :type="i.type"
          :prop="i.prop"
          :label="i.label"
          :width="i.width"
          :fixed="i.fixed"
        >
          <template v-if="i.label === '操作'">
            <el-button link type="primary">结算</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        background
        layout="total,sizes,prev, pager, next"
        :page-sizes="[10, 20, 50, 100]"
        :total="pageTotal"
        class="table-page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      custom-class="complete-settlement-dialog"
      v-model="dialogVisible"
      title=""
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
      :before-close="handleClose"
    >
      <div class="img-div">
        <img :src="completeSvg" alt="" />
        <p>完成结算</p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import BasicData from '@/views/supplier/settleAccounts/data'
import type {
  StateType,
  RecordType
} from '@/views/supplier/settleAccounts/type.ts'
import completeSvg from '@/assets/common/complete.svg'
const state = reactive<StateType>({
  formModel: {
    supplierName: '',
    city: '',
    status: '',
    mortgageMain: '',
    contractBelong: '',
    contractCode: '',
    orderType: '',
    finishTime: ''
  },
  statusArr: [
    {
      label: '已回笼',
      value: '已回笼'
    },
    {
      label: '未回笼',
      value: '未回笼'
    }
  ],
  ordertypeArr: [
    {
      label: '抵押',
      value: '抵押'
    },
    {
      label: '批量抵押',
      value: '批量抵押'
    },
    {
      label: '解押',
      value: '解押'
    },
    {
      label: '补证',
      value: '补证'
    }
  ],
  mortgageMainArr: [],
  contractBelongArr: [],
  actionList: [
    {
      label: '下载',
      value: 'download'
    },
    {
      label: '批量结算',
      value: '批量结算'
    }
  ],
  tableColumn: BasicData.tableColumn,
  tableData: [],
  pageTotal: 100,
  dialogVisible: false
})
const {
  formModel,
  statusArr,
  ordertypeArr,
  mortgageMainArr,
  contractBelongArr,
  actionList,
  tableColumn,
  tableData,
  pageTotal,
  dialogVisible
} = toRefs(state)

const search = () => {}
const handleSizeChange = () => {}
const handleCurrentChange = () => {}

const action = (val: string | number) => {
  console.log(val)
  if (val === '批量结算') {
    state.dialogVisible = true
  }
}

const selectAllData = (selection: RecordType[]) => {
  console.log(selection)
}
const selectData = (selection: RecordType[], row: RecordType) => {
  console.log(selection, row)
}

const handleClose = (done: () => void) => {
  done()
}
</script>

<style lang="scss" scoped>
.settle-container {
  .filter-form {
    .el-form-item {
      align-items: center;
    }
  }
  .action {
    margin: 10px 0;
  }
  .list {
    margin-bottom: 20px;
  }
  .page {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
<style lang="scss">
.complete-settlement-dialog {
  .img-div {
    text-align: center;
    img {
      width: 50px;
    }
    p {
      font-size: $base-font-size-big;
      font-weight: bolder;
      color: $base-color-black;
    }
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    border-top: 1px solid #e6e6e6;
    .el-button {
      margin: 0 10px;
      width: 100px;
    }
  }
}
</style>
