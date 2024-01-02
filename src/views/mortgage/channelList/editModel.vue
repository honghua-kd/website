<template>
  <el-dialog
    class="main-part-model"
    v-model="dialogVisible"
    :title="dialogTitle"
    width="550px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleClose"
  >
    <div>
      <el-form :model="editForm" label-position="top">
        <el-form-item label="来源系统">
          <el-select
            v-model="editForm.sourceSystem2"
            style="width: 100%"
          ></el-select>
        </el-form-item>
        <el-form-item label="渠道商/办事处">
          <el-input v-model="editForm.agencyName" />
        </el-form-item>
        <el-form-item label="是否生成待收款项清单">
          <el-select v-model="editForm.createGatherFlag" style="width: 100%">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="未收费办理是否需审批">
          <el-select
            v-model="editForm.unpaidNeedApproveFlag"
            style="width: 100%"
          >
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCloseModel('click-close')">取消</el-button>
        <el-button type="primary" @click="onCloseModel('update-close')"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { watch, toRefs, reactive } from 'vue'
import type { ModelStateType } from '@/views/mortgage/channelList/type'
import type { AgencyDetailResponse } from '@/api/channel/types/response'
import { AgencyAPI } from '@/api'
const API = new AgencyAPI()

type ModelPropsType = {
  visible: boolean
  formValue: AgencyDetailResponse
  title: string
}
const props = withDefaults(defineProps<ModelPropsType>(), {
  visible: false,
  formValue: () => ({}),
  title: ''
})

const state = reactive<ModelStateType>({
  dialogVisible: false,
  editForm: {},
  dialogTitle: ''
})
const { dialogVisible, editForm, dialogTitle } = toRefs(state)
watch(
  [() => props.visible, () => props.formValue, () => props.title],
  ([newVisible, newValue, newTitle]) => {
    state.dialogVisible = newVisible
    state.editForm = newValue
    state.dialogTitle = newTitle
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
const onCloseModel = async (type: string) => {
  console.log(editForm.value)
  if (type === 'update-close') {
    if (dialogTitle.value === '编辑') {
      const params = {
        agencyName: editForm.value.agencyName,
        id: editForm.value.id,
        sourceSystem2: editForm.value.sourceSystem2,
        unpaidNeedApproveFlag: editForm.value.unpaidNeedApproveFlag,
        createGatherFlag: editForm.value.createGatherFlag
      }
      await API.getAgencyEdit(params)
    }
    if (dialogTitle.value === '新增') {
      const params = {
        agencyName: editForm.value.agencyName,
        sourceSystem2: editForm.value.sourceSystem2,
        unpaidNeedApproveFlag: editForm.value.unpaidNeedApproveFlag,
        createGatherFlag: editForm.value.createGatherFlag
      }
      await API.getAgencySave(params)
    }
  }
  emit('closeModel', {
    visible: false,
    type
  })
}
</script>
<style lang="scss">
.main-part-model {
  .dialog-footer {
    button:first-child {
      margin-right: 10px;
    }
  }
  .avatar-uploader {
    .avatar {
      display: block;
      width: 100px;
      height: 100px;
    }
    .el-upload {
      position: relative;
      overflow: hidden;
      margin-right: 30px;
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      transition: var(--el-transition-duration-fast);
      cursor: pointer;
      &:hover {
        border-color: var(--el-color-primary);
      }
    }
  }
  .el-icon.avatar-uploader-icon {
    width: 100px;
    height: 100px;
    font-size: 28px;
    text-align: center;
    color: #8c939d;
  }
}
</style>
