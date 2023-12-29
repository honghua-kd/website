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
          <el-select style="width: 100%"></el-select>
        </el-form-item>
        <el-form-item label="渠道商/办事处">
          <el-input />
        </el-form-item>
        <el-form-item label="城市">
          <el-cascader
            style="width: 100%"
            v-model="editForm.areaCode"
            placeholder="请选择"
            :props="propsObj"
            :options="BasicData.cityList"
            collapse-tags
            collapse-tags-tooltip
            clearable
            @change="changeCity"
          />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input />
        </el-form-item>
        <el-row>
          <el-col :span="11"
            ><el-form-item label="联系人"> <el-input /> </el-form-item
          ></el-col>
          <el-col :span="2"></el-col>
          <el-col :span="11"
            ><el-form-item label="联系电话"> <el-input /> </el-form-item
          ></el-col>
        </el-row>
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
import type {
  RecordType,
  ModelStateType
} from '@/views/mortgage/channelAddress/type'
import BasicData from '@/views/mortgage/channelAddress/data'
import type { CascaderValue, CascaderProps } from 'element-plus'

type ModelPropsType = {
  visible: boolean
  formValue: RecordType
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
const onCloseModel = (type: string) => {
  emit('closeModel', {
    visible: false,
    type
  })
}

// 级联选择器属性
const propsObj = reactive<CascaderProps>({
  multiple: false
})
const changeCity = (value: CascaderValue): void => {
  console.log(value)
  console.log(editForm.value)
  const valueCopy = JSON.parse(JSON.stringify(value))
  console.log(valueCopy)
  valueCopy.forEach((i: number) => {
    console.log(i)
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
