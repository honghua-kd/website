<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="550px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
      :before-close="handleClose"
    >
      <div>
        <!-- <div>
          <el-button type="primary">新增</el-button>
        </div>
        <Table
          :columnConfig="documentVersionColumn"
          :data="documentVersionData"
          :setColumnEnable="false"
        ></Table> -->
        <el-form ref="ruleFormRef" :model="docInfoForm" :rules="rules">
          <el-form-item label="文书名称" prop="documentName" required>
            <el-input
              v-model="docInfoForm.documentName"
              :maxlength="50"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item label="文书类型" prop="documentType" required>
            <el-select v-model="docInfoForm.documentType" style="width: 100%">
              <el-option
                v-for="item in documentTypeOptions"
                :key="(item.value as string)"
                :label="(item.label as string)"
                :value="(item.value as string)"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="适用部门" prop="sourceSystem1" required>
            <el-checkbox-group v-model="docInfoForm.sourceSystem1">
              <el-checkbox
                v-for="item in systemOptions"
                :key="(item.value as string)"
                :label="(item.label as string)"
              />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="用印类型" prop="sealType" required>
            <el-select v-model="docInfoForm.sealType" style="width: 100%">
              <el-option
                v-for="item in sealOptions"
                :key="(item.value as string)"
                :label="(item.label as string)"
                :value="(item.value as string)" /></el-select
          ></el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCloseModel(ruleFormRef, 'click-close')"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="onCloseModel(ruleFormRef, 'update-close')"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="listDialogvisible" title="文书版本" width="900px">
      <Table
        :data="saveListInfo"
        :columnConfig="saveListColumn"
        :setColumnEnable="false"
      >
        <template #defalut="{ prop }">
          <span v-if="prop === 'index'">111</span>
        </template>
        <template #action>
          <el-button link type="danger">删除</el-button>
          <el-button link type="primary">上传</el-button></template
        >
      </Table>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs, watch } from 'vue'
import type { ModelStateType } from './type'
import type { FormInstance, FormRules } from 'element-plus'
import type { InternalRuleItem } from 'async-validator'
import type { DictListItem } from '@/api'
import Table from '@/components/Table/index.vue'
import { saveListColumn } from './data'

type Iprops = {
  visible: boolean
  title: string
  documentTypeOptions: DictListItem[]
  systemOptions: DictListItem[]
  sealOptions: DictListItem[]
}
const props = withDefaults(defineProps<Iprops>(), {
  visible: false,
  title: '',
  documentTypeOptions: () => [],
  systemOptions: () => [],
  sealOptions: () => []
})
const state = reactive<ModelStateType>({
  dialogVisible: false,
  docInfoForm: {
    documentName: '',
    documentType: '',
    sourceSystem1: [],
    sealType: ''
  },
  saveListInfo: [],
  listDialogvisible: false
})
const { dialogVisible, docInfoForm, saveListInfo, listDialogvisible } =
  toRefs(state)

watch([() => props.visible, () => props.title], ([newVisible]) => {
  state.dialogVisible = newVisible
})

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof docInfoForm>>({
  sourceSystem1: [
    {
      validator: (
        rule: InternalRuleItem,
        value: string[],
        callback: (error?: string | Error | undefined) => void
      ) => {
        if (value.length === 0) {
          callback(new Error('请选择适用部门'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  documentName: [
    {
      required: true,
      message: '请输入文书名称',
      trigger: 'blur'
    }
  ],
  documentType: [
    {
      required: true,
      message: '请选择文书类型',
      trigger: 'change'
    }
  ],
  sealType: [
    {
      required: true,
      message: '请选择用印类型',
      trigger: 'change'
    }
  ]
})

const onCloseModel = async (formEl: FormInstance | undefined, type: string) => {
  if (type === 'click-close') {
    emit('closeModel', {
      type
    })
    return
  }
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (type === 'update-close') {
        console.log(docInfoForm)
        state.dialogVisible = false
        state.listDialogvisible = true
        state.saveListInfo = [
          {
            documentName: docInfoForm.value.documentName,
            documentType: docInfoForm.value.documentType,
            sourceSystem1: docInfoForm.value.sourceSystem1,
            documentVersion: '',
            sealType: docInfoForm.value.sealType,
            fileCode: ''
          }
        ]
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const emit = defineEmits<{
  (e: 'closeModel', { type }: { type: string }): void
}>()
const handleClose = () => {
  emit('closeModel', {
    type: 'click-close'
  })
}
</script>
