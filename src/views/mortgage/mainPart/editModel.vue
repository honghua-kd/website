<template>
  <el-dialog
    class="main-part-model"
    v-model="dialogVisible"
    title="新增"
    width="700px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleClose"
  >
    <div>
      <el-form :model="editForm" label-width="120px">
        <el-form-item label="名称" width="500">
          <el-input />
        </el-form-item>
        <el-form-item label="条件">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
          >
            <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
          >
            <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
          >
            <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="组织机构代码">
          <el-input />
        </el-form-item>
        <el-form-item label="全称呼">
          <el-input />
        </el-form-item>
        <el-form-item label="注册地址">
          <el-input />
        </el-form-item>
        <span>联系地址</span>
        <!-- <el-form-item label="省份">
          <el-select> </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select> </el-select>
        </el-form-item> -->
        <el-form-item label="省/市">
          <el-cascader
            placeholder="请选择"
            style="width: 100%"
            :options="BasicData.cityList"
            clearable
          />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input />
        </el-form-item>
        <el-form-item label="优先级">
          <el-input />
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
import { Plus } from '@element-plus/icons-vue'
import type { RecordType, ModelStateType } from '@/views/mortgage/mainPart/type'
import BasicData from '@/views/mortgage/mainPart/data'

type ModelPropsType = {
  visible: boolean
  formValue: RecordType
}
const props = withDefaults(defineProps<ModelPropsType>(), {
  visible: false,
  formValue: () => ({})
})

const state = reactive<ModelStateType>({
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
const onCloseModel = (type: string) => {
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
