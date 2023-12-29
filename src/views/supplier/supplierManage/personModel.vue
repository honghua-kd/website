<template>
  <el-dialog
    class="edit-supplier-dialog"
    v-model="dialogVisible"
    title="城市联系人"
    width="400px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleClose"
  >
    <el-form :model="editForm" label-width="120px" label-position="top">
      <el-form-item label="城市">
        <el-cascader
          placeholder="请选择城市"
          style="width: 100%"
          :options="BasicData.cityList"
          :props="cascaderProps"
          collapse-tags
          collapse-tags-tooltip
          clearable
        />
      </el-form-item>
      <el-form-item label="联系人">
        <el-input placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input placeholder="请输入联系电话"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="clickButton('click-close')">取消</el-button>
        <el-button type="primary" @click="clickButton('update-close')"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, toRefs, watch } from 'vue'
import BasicData from '@/views/supplier/supplierManage/data'
import type {
  RecordType,
  PersonModelStateType
} from '@/views/supplier/supplierManage/type'

const cascaderProps = { multiple: true }

type ModelPropsType = {
  visible: boolean
  formValue: RecordType
}
const props = withDefaults(defineProps<ModelPropsType>(), {
  visible: false,
  formValue: () => ({})
})
const state = reactive<PersonModelStateType>({
  dialogVisible: false,
  editForm: {}
})
const { dialogVisible, editForm } = toRefs(state)

watch(
  [() => props.visible, () => props.formValue],
  ([newVisible, newValue]) => {
    state.dialogVisible = newVisible
    state.editForm = newValue
  },
  {
    immediate: true
  }
)

const emit = defineEmits<{
  (e: 'closeModel', { visible, type }: { visible: boolean; type: string }): void
}>()
const handleClose = () => {
  emit('closeModel', {
    visible: false,
    type: 'click-close'
  })
}
const clickButton = (value: string) => {
  emit('closeModel', {
    visible: false,
    type: value
  })
}
</script>

<style scope lang="scss"></style>
