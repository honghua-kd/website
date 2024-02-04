<template>
  <el-dialog
    v-model="visible"
    title="分配抵押任务"
    width="500px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleClose"
  >
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="分配至">
        <el-select
          v-model="formData.type"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option label="供应商" value="供应商" />
          <el-option label="业务运营部" value="业务运营部" />
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select
          v-if="formData.type === '供应商'"
          placeholder="请选择"
          style="width: 100%"
          @click="openSupplier"
        ></el-select>
        <el-select
          v-if="formData.type === '业务运营部'"
          placeholder="请选择"
          style="width: 100%"
        ></el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          :loading="okLoading"
          @click="onCloseModel(ruleFormRef, 'update-close')"
          >确 定</el-button
        >
        <el-button @click="onCloseModel(ruleFormRef, 'click-close')"
          >取 消</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="supplierVisible"
    title="供应商"
    width="600px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleSupplierClose"
  >
    <div>
      <SearchField
        :data="supplierQueryConfig"
        v-model="queryParams"
        :labelWidth="110"
        :visibleRows="2"
        :colNum="1"
        @search="searchHandler"
        @reset="reset"
      />
      <Table
        :loading="tableLoading"
        :data="tableData"
        :columnConfig="supplierTableColumn"
        :page-total="pageTotal"
        v-model:pageSize="queryParams.pageSize"
        v-model:pageNo="queryParams.pageNo"
        @selection-change="selectData"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <template #selection>
          <el-table-column
            type="selection"
            :width="40"
            :selectable="() => true"
            :fixed="true"
            align="center"
          />
        </template>
      </Table>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          :loading="supplierOkLoading"
          @click="onCloseSupplierModel('update-close')"
          >确 定</el-button
        >
        <el-button @click="onCloseSupplierModel('click-close')"
          >取 消</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { supplierQueryConfig, supplierTableColumn } from '../data'

const state = reactive({
  visible: false,
  supplierVisible: false,
  queryParams: {
    pageSize: 10,
    pageNo: 1
  },
  tableLoading: false,
  tableData: [{}],
  pageTotal: 0,
  formData: { type: '供应商' },
  okLoading: false,
  supplierOkLoading: false,
  selectedArr: []
})
const {
  visible,
  supplierVisible,
  queryParams,
  tableLoading,
  tableData,
  pageTotal,
  formData,
  okLoading,
  supplierOkLoading
} = toRefs(state)

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({})

const emit = defineEmits<{
  (e: 'closeModel', type: string): void
}>()

const handleClose = () => {
  state.visible = false
}

// 弹窗 取消/确定
const onCloseModel = async (formEl: FormInstance | undefined, type: string) => {
  if (type === 'click-close') {
    state.visible = false
    return
  }
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit('closeModel', type)
      state.visible = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 查询
const searchHandler = () => {}

// 重置
const reset = () => {}

// 表格数据选择
const selectData = () => {
  state.selectedArr = []
}

// 分页条数改变
const handleSizeChange = () => {}

// 翻页
const handleCurrentChange = () => {}

// 打开弹窗
const open = () => {
  state.visible = true
}

defineExpose({ open })

// 打开供应商弹窗
const openSupplier = () => {
  state.supplierVisible = true
}

const handleSupplierClose = () => {
  state.supplierVisible = false
}

// 供应商弹窗 确定/取消
const onCloseSupplierModel = (type: string) => {
  if (type === 'click-close') {
    state.supplierVisible = false
    state.tableData = []
  } else {
    if (state.selectedArr.length === 0) {
      ElMessage({
        type: 'error',
        message: '请选择供应商'
      })
      return
    }
    state.supplierVisible = false
  }
}
</script>
