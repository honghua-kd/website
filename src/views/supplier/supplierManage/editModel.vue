<template>
  <el-dialog
    class="edit-supplier-dialog"
    v-model="dialogVisible"
    title="新增供应商"
    width="700px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    :before-close="handleClose"
  >
    <div>
      <el-steps
        :active="step"
        align-center
        style="margin: 10px auto 30px; width: 300px"
      >
        <el-step />
        <el-step />
        <el-step />
      </el-steps>
      <el-form
        v-show="step === 1"
        :model="editForm"
        label-width="120px"
        label-position="top"
        inline
      >
        <div class="type-title">基础信息</div>
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-form-item
              label="公司名称"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-input placeholder="请输入公司名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="组织机构代码"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-input placeholder="请输入组织机构代码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-form-item
              label="登记注册号类型"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-select
                style="width: 100%"
                placeholder="请选择登记注册号类型"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="登记注册号码"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-input placeholder="请输入登记注册号码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-form-item
              label="合作商类型"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-select
                style="width: 100%"
                placeholder="请选择合作商类型"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="公司规模"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-input placeholder="请输入公司规模" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-form-item
              label="归属"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-select
                style="width: 100%"
                placeholder="请选择归属公司"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="到期日期"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-date-picker
                style="width: 100%"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-form-item
              label="签约日期"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-date-picker
                style="width: 100%"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="type-title">联系信息</div>
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-form-item
              label="内部对接人"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-input placeholder="请输入内部对接人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="联系人"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-input placeholder="请输入联系人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-form-item
              label="联系电话"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-input placeholder="请输入联系电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="公司地址"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-input placeholder="请输入公司地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-form-item
              label="联系人邮箱"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-input placeholder="请输入联系人邮箱"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="邮编"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-input placeholder="请输入邮编"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="type-title">账号信息</div>
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-form-item
              label="账户名称"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-input placeholder="请输入账户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="银行账户"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-input placeholder="请输入银行账户"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-form-item
              label="开户银行"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-input placeholder="请输入开户银行"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="支行"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-input placeholder="请输入支行"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width: 100%">
          <el-col :span="12">
            <el-form-item
              label="开户银行区域"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-row style="width: 100%" :gutter="5">
                <el-col :span="8">
                  <el-select placeholder="省份"></el-select>
                </el-col>
                <el-col :span="8">
                  <el-select placeholder="城市"></el-select>
                </el-col>
                <el-col :span="8">
                  <el-select placeholder="区域"></el-select>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="开户行行号"
              :rules="[{ required: true, message: 'required' }]"
            >
              <el-input placeholder="请输入开户行行号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="type-title">附件上传</div>
        <el-row style="width: 100%">
          <el-form-item>
            <el-upload>
              <el-button type="primary">选取文件</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  请上传大小不超过 <span class="t-red">20MB</span>，格式为
                  <span class="t-red"
                    >zip/rar/txt/doc/docx/xls/xlsx/ppt/pptx/pdf</span
                  >
                  的文件
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCloseModel('click-close')">取消</el-button>
        <el-button type="primary" @click="clickButton(buttonText)">{{
          buttonText
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { watch, toRefs, reactive } from 'vue'
import type { RecordType } from './type'

type IProps = {
  visible: boolean
  formValue: RecordType
}
type IState = {
  dialogVisible: boolean
  editForm: RecordType
  step: number
  buttonText: string
}
const props = withDefaults(defineProps<IProps>(), {
  visible: false,
  formValue: () => ({})
})
const state = reactive<IState>({
  dialogVisible: false,
  editForm: {},
  step: 1,
  buttonText: '下一步'
})
const { dialogVisible, editForm, step, buttonText } = toRefs(state)
watch(
  [() => props.visible, () => props.formValue],
  ([newVisible, newValue]) => {
    state.step = 1
    state.dialogVisible = newVisible
    state.editForm = newValue
  },
  {
    immediate: true
  }
)
watch(step, (newValue) => {
  console.log(newValue)
  state.buttonText = newValue === 3 ? '确认' : '下一步'
})

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

const clickButton = (value: string) => {
  if (value === '下一步') {
    state.step++
  } else {
    // 提交
    onCloseModel('update-close')
  }
}
</script>
<style lang="scss" scoped>
.edit-supplier-dialog {
  .dialog-footer {
    button:first-child {
      margin-right: 10px;
    }
  }
  .type-title {
    margin: 20px 0;
    padding-left: 6px;
    height: 14px;
    font-size: 14px;
    font-weight: bolder;
    border-left: 4px solid #1890ff;
    line-height: 14px;
  }
  .t-red {
    color: red;
  }
}
</style>
