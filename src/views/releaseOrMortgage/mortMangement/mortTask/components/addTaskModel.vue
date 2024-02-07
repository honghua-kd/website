<template>
  <el-dialog
    v-model="dialogVisible"
    title="新增抵押任务"
    width="950px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleClose"
  >
    <div>
      <SearchField
        :data="addTaskQueryConfig"
        v-model="queryParams"
        :labelWidth="130"
        :visibleRows="2"
        :colNum="3"
        @search="searchHandler"
        @reset="reset"
      />
      <TableField
        :loading="tableLoading"
        :data="tableData"
        :columns="addTaskQueryTableColumn"
        :page-total="pageTotal"
        v-model:pageSize="queryParams.pageSize"
        v-model:pageNo="queryParams.pageNo"
        @selection-change="selectData"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <template #action>
          <el-button link type="primary" @click="edit">编辑</el-button>
        </template>
      </TableField>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          :loading="okLoading"
          @click="onCloseModel('update-close')"
          >确 定</el-button
        >
        <el-button @click="onCloseModel('click-close')">取 消</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="editDialogVisible"
    title="编辑"
    width="500px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleCloseEdit"
  >
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="上牌城市" required>
        <AreaCascader :value="formData.area" />
      </el-form-item>
      <el-form-item label="车牌号">
        <el-row :gutter="10" style="width: 100%">
          <el-col :span="5">
            <el-select v-model="formData.city" placeholder="请选择" clearable>
              <el-option
                v-for="i in dictStore.dicts['MORTGAGE_CITYCONFIG'] || []"
                :key="i.value"
                :value="i.value"
                :label="i.label"
              />
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-select v-model="formData.no" placeholder="请选择" clearable>
              <el-option
                v-for="i in dictStore.dicts['MORTGAGE_CITYCONFIG_NO'] || []"
                :key="i.value"
                :value="i.value"
                :label="i.label"
              />
            </el-select>
          </el-col>
          <el-col :span="14">
            <el-input placeholder="请输入" clearable></el-input>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          :loading="editOkLoading"
          @click="closeEditModel(ruleFormRef, 'update-close')"
          >确 定</el-button
        >
        <el-button @click="closeEditModel(ruleFormRef, 'click-close')"
          >取 消</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { addTaskQueryConfig, addTaskQueryTableColumn } from '../data'
import { useDictStore } from '@/store/dict'

const dictStore = useDictStore()
const state = reactive({
  dialogVisible: false,
  editDialogVisible: false,
  queryParams: {
    pageSize: 10,
    pageNo: 1
  },
  tableLoading: false,
  tableData: [{}],
  pageTotal: 0,
  okLoading: false,
  editOkLoading: false,
  selectedArr: []
})
const {
  dialogVisible,
  editDialogVisible,
  queryParams,
  tableLoading,
  tableData,
  pageTotal,
  okLoading,
  editOkLoading
} = toRefs(state)
type formDataType = {
  area: string[]
  city: string
  no: string
}
const formData = reactive<formDataType>({
  area: [],
  city: '',
  no: ''
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({})

const emit = defineEmits<{
  (e: 'closeModel', type: string): void
}>()

const handleClose = () => {
  state.dialogVisible = false
}

// 弹窗 取消/确定
const onCloseModel = (type: string) => {
  if (type === 'update-close') {
    emit('closeModel', type)
  }
  state.dialogVisible = false
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
  state.dialogVisible = true
}

defineExpose({ open })

const edit = () => {
  state.editDialogVisible = true
}

const handleCloseEdit = () => {
  state.editDialogVisible = false
}

// 编辑弹窗 取消/确定
const closeEditModel = async (
  formEl: FormInstance | undefined,
  type: string
) => {
  if (type === 'click-close') {
    state.editDialogVisible = false
    return
  }
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      state.editDialogVisible = false
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
