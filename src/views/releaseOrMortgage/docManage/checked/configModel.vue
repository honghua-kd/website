<template>
  <el-dialog
    v-model="dialogVisible"
    title="参数配置"
    width="880px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleClose"
  >
    <el-button
      style="margin-bottom: 10px"
      :icon="Plus"
      type="primary"
      @click="addTableItem"
      >新增</el-button
    >
    <el-form ref="ruleSaveListForm" :model="saveListForm" :show-message="false">
      <el-table
        class="save-list-table"
        :data="saveListForm.saveListInfo"
        :header-cell-style="{
          background: '#eef1f6',
          color: '#606266',
          textAlign: 'center'
        }"
        border
        :cell-style="{ borderRight: '1px solid #fff' }"
      >
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="bookmarkName" label="书签名称">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`saveListInfo.${$index}.bookmarkName`"
              :rules="ruleSaveListFormRules.bookmarkName"
            >
              <el-input
                placeholder="请输入"
                v-model.trim="row.bookmarkName"
                :maxlength="50"
                clearable
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="bookmarkParam" label="书签参数">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`saveListInfo.${$index}.bookmarkParam`"
              :rules="ruleSaveListFormRules.bookmarkParam"
            >
              <el-input
                placeholder="请输入"
                v-model.trim="row.bookmarkParam"
                :maxlength="50"
                clearable
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="tableAndColumn" label="变量表达式" :width="200">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`saveListInfo.${$index}.tableAndColumn`"
              :rules="ruleSaveListFormRules.tableAndColumn"
            >
              <el-cascader
                v-model="row.tableAndColumn"
                :options="configCascaderOptions"
                filterable
                clearable
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="paramType" label="参数类型" :width="150">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`saveListInfo.${$index}.paramType`"
              :rules="ruleSaveListFormRules.paramType"
            >
              <el-select v-model="row.paramType" style="width: 100%" clearable>
                <el-option
                  v-for="item in paramTypeOptions"
                  :key="(item.value as string)"
                  :label="(item.label as string)"
                  :value="(item.value as string)"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="batchBlank" label="批量出具是否空白">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="`saveListInfo.${$index}.batchBlank`"
              :rules="ruleSaveListFormRules.batchBlank"
            >
              <el-select v-model="row.batchBlank" style="width: 100%" clearable>
                <el-option
                  v-for="item in yesOrNoOptions"
                  :key="(item.value as string)"
                  :label="(item.label as string)"
                  :value="(item.value as string)"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" :width="80" align="center">
          <template #default="scope">
            <!-- <el-button
              v-if="
                saveListForm.saveListInfo.length > 1 ||
                props.paramsConfigDetail.length > 0
              "
              link
              type="danger"
              @click="removeTableItem(scope.$index, scope.row)"
              >删除</el-button
            > -->
            <el-button
              link
              type="danger"
              @click="removeTableItem(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeConfigModel(ruleSaveListForm, 'click-close')"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="closeConfigModel(ruleSaveListForm, 'update-close')"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, watch, toRefs, ref } from 'vue'
import type { ConfigStateType } from './type'
import type {
  DictListItem,
  SystemParamConfigResponse,
  ColumnList,
  EditParamConfigList,
  GetDocumentParamResponse
} from '@/api'
import type { FormInstance, FormRules, CascaderOption } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { InternalRuleItem } from 'async-validator'
import { DocCheckAPI } from '@/api'

const API = new DocCheckAPI()
type Iprops = {
  configVisible: boolean
  paramConfig: SystemParamConfigResponse[]
  paramTypeOptions: DictListItem[]
  yesOrNoOptions: DictListItem[]
  documentNo: string
  paramsConfigDetail: GetDocumentParamResponse[]
}
const props = withDefaults(defineProps<Iprops>(), {
  configVisible: false,
  paramConfig: () => [],
  paramTypeOptions: () => [],
  yesOrNoOptions: () => [],
  documentNo: '',
  paramsConfigDetail: () => []
})

const state = reactive<ConfigStateType>({
  dialogVisible: false,
  configCascaderOptions: [],
  saveListForm: {
    saveListInfo: [
      {
        batchBlank: '',
        bookmarkName: '',
        bookmarkParam: '',
        column: '',
        paramType: '',
        table: '',
        tableAndColumn: []
      }
    ]
  },
  itemIndex: -1
})

const { dialogVisible, configCascaderOptions, saveListForm } = toRefs(state)

watch(
  [
    () => props.configVisible,
    () => props.paramConfig,
    () => props.paramsConfigDetail
  ],
  ([newVisible, newConfig, newConfigDetail]) => {
    state.dialogVisible = newVisible
    // 当前无配置
    if (newConfigDetail.length === 0) {
      state.saveListForm.saveListInfo = [
        {
          batchBlank: '',
          bookmarkName: '',
          bookmarkParam: '',
          column: '',
          paramType: '',
          table: '',
          tableAndColumn: []
        }
      ]
    } else {
      // 当前有配置
      const list: EditParamConfigList[] = []
      newConfigDetail.forEach((i) => {
        list.push({
          batchBlank: `${i.batchBlank}` as string,
          bookmarkName: i.bookmarkName as string,
          bookmarkParam: i.bookmarkParam as string,
          column: i.column as string,
          paramType: `${i.paramType}` as string,
          table: i.table as string,
          tableAndColumn: [i.table as string, i.column as string]
        })
      })
      state.saveListForm.saveListInfo = list
    }
    const result: CascaderOption[] = []
    newConfig.forEach((i: SystemParamConfigResponse) => {
      const obj: CascaderOption = {
        label: i.tableName as string,
        value: i.table as string,
        children: []
      }
      i.columnList?.forEach((j: ColumnList) => {
        obj.children?.push({
          label: j.columnName as string,
          value: j.column as string
        })
      })
      result.push(obj)
    })
    state.configCascaderOptions = result
  }
)

// 新增表格项
const addTableItem = () => {
  state.saveListForm.saveListInfo.push({
    batchBlank: '',
    bookmarkName: '',
    bookmarkParam: '',
    column: '',
    paramType: '',
    table: '',
    tableAndColumn: []
  })
}

// 移除表格项
const removeTableItem = (index: number, row: EditParamConfigList) => {
  console.log(index, row)
  state.itemIndex = index
  const saveListInfoClone = JSON.parse(
    JSON.stringify(state.saveListForm.saveListInfo)
  )
  saveListInfoClone.splice(index, 1)
  state.saveListForm.saveListInfo = saveListInfoClone
}

const ruleSaveListForm = ref<FormInstance>()
const ruleSaveListFormRules = reactive<FormRules>({
  bookmarkName: [
    {
      validator: (
        rule: InternalRuleItem,
        value: string,
        callback: (error?: string | Error | undefined) => void
      ) => {
        if (!value || value.trim() === '') {
          callback(new Error('请输入'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  bookmarkParam: [
    {
      validator: (
        rule: InternalRuleItem,
        value: string,
        callback: (error?: string | Error | undefined) => void
      ) => {
        if (!value || value.trim() === '') {
          callback(new Error('请输入'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  batchBlank: [
    {
      required: true,
      message: '请选择',
      trigger: 'change'
    }
  ],
  paramType: [
    {
      required: true,
      message: '请选择',
      trigger: 'change'
    }
  ],
  tableAndColumn: [
    {
      required: true,
      message: '请选择',
      trigger: 'change'
    }
  ]
})

const emit = defineEmits<{
  (e: 'closeModel', { type }: { type: string }): void
}>()

const handleClose = () => {
  emit('closeModel', {
    type: 'click-close'
  })
}

const closeConfigModel = async (
  formEl: FormInstance | undefined,
  type: string
) => {
  if (type === 'click-close') {
    emit('closeModel', {
      type
    })
    return
  }
  if (!formEl) return
  // 接口交互
  if (type === 'update-close') {
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        console.log(state.saveListForm.saveListInfo)
        const params: EditParamConfigList[] = []
        state.saveListForm.saveListInfo.forEach((i) => {
          params.push({
            batchBlank: i.batchBlank,
            bookmarkName: i.bookmarkName,
            bookmarkParam: i.bookmarkParam,
            column: i.tableAndColumn ? i.tableAndColumn[1] : '',
            paramType: i.paramType,
            table: i.tableAndColumn ? i.tableAndColumn[0] : ''
          })
        })
        const res = await API.paramConfig({
          documentNo: props.documentNo,
          paramList: params
        })
        if (res && res.code === 200) {
          emit('closeModel', {
            type
          })
        }
      } else {
        console.log('error submit!', fields)
      }
    })
  }
}
</script>
<style lang="scss">
.save-list-table {
  .el-form-item {
    margin-bottom: 0 !important;
  }
}
</style>
