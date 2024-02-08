<template>
  <el-dialog
    v-bind="$attrs"
    v-model="visible"
    :title="$attrs.type === 'hurry' ? '催办提醒' : '催办反馈'"
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
      <el-form-item label="内容" required>
        <el-select placeholder="请选择" clearable style="width: 100%">
          <!-- 字典表需更换 -->
          <el-option
            v-for="i in dictStore.dicts['MORTGAGE_TASK_TYPE'] || []"
            :key="i.value"
            :value="i.value"
            :label="i.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          type="textarea"
          :placeholder="
            $attrs.type === 'hurry' ? '请输入，最多500字。' : '请填写补充说明'
          "
          :rows="4"
          clearable
          maxlength="500"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="person" label="被催人">
            <template #default="{ row }">
              <el-checkbox v-model="row.personSelected" :label="row.person">{{
                row.person
              }}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="types" label="通知方式">
            <template #default="{ row }">
              <el-checkbox-group v-model="row.typesSelected">
                <el-checkbox v-for="i in row.types" :key="i" :label="i">{{
                  i
                }}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-table-column>
        </el-table>
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
  <!-- 其他 -->
  <el-dialog
    v-model="otnersModelVisible"
    title="选择其他被催人"
    width="500px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleOthersClose"
  >
    <div class="other-filter">
      <el-select
        placeholder="请选择"
        filterable
        clearable
        style="width: 100%"
      />
    </div>
    <el-form
      ref="ruleOtherFormRef"
      :model="otherFormData"
      :rules="rulesOther"
      label-position="top"
    >
      <el-form-item>
        <el-checkbox-group>
          <el-checkbox v-for="i in othersPerson" :key="i" :label="i">{{
            i
          }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          :loading="otherOkLoading"
          @click="onCloseOthersModel(ruleOtherFormRef, 'update-close')"
          >确 定</el-button
        >
        <el-button @click="onCloseOthersModel(ruleOtherFormRef, 'click-close')"
          >取 消</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, computed, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useDictStore } from '@/store/dict'

const dictStore = useDictStore()

const state = reactive({
  visible: false,
  formData: {},
  okLoading: false,
  tableData: [
    {
      person: '分配人',
      personSelected: false,
      types: ['邮件', '短信', '系统消息'],
      typesSelected: []
    },
    {
      person: '所属业务人员',
      personSelected: false,
      types: ['邮件', '短信', '系统消息'],
      typesSelected: []
    },
    {
      person: '其他',
      personSelected: false,
      types: ['邮件', '短信', '系统消息'],
      typesSelected: []
    }
  ],
  otnersModelVisible: false,
  othersPerson: [
    '姜领 抵解押管理专员',
    '姜领 抵解押管理专员',
    '姜领 抵解押管理专员',
    '姜领 抵解押管理专员',
    '姜领 抵解押管理专员',
    '姜领 抵解押管理专员'
  ],
  otherFormData: {},
  otherOkLoading: false
})
const {
  visible,
  formData,
  okLoading,
  tableData,
  otnersModelVisible,
  othersPerson,
  otherFormData,
  otherOkLoading
} = toRefs(state)

const isOthersSelected = computed(() => {
  const obj = state.tableData.filter((i) => i.person === '其他')
  return obj ? obj[0].personSelected : false
})

watch(isOthersSelected, (newValue) => {
  state.otnersModelVisible = newValue
})

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  type: [
    {
      required: true,
      message: '请选择',
      trigger: 'change'
    }
  ]
})

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

// 打开弹窗
const open = () => {
  state.visible = true
}

defineExpose({ open })

const ruleOtherFormRef = ref<FormInstance>()
const rulesOther = reactive<FormRules>({})

const handleOthersClose = () => {
  state.otnersModelVisible = false
}

// 其他弹窗 取消/确定
const onCloseOthersModel = async (
  formEl: FormInstance | undefined,
  type: string
) => {
  if (type === 'click-close') {
    state.otnersModelVisible = false
    return
  }
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      state.otnersModelVisible = false
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style>
.other-filter {
  margin-bottom: 20px;
}
</style>
