<template>
  <el-dialog
    class="main-part-model"
    v-model="dialogVisible"
    :title="dialogTitle"
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
          <!-- <el-upload
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
          </el-upload> -->
          <el-radio-group v-model="condition" class="ml-4">
            <el-radio label="contractSubject" size="large">合同主体</el-radio>
            <el-radio label="capitalInfo" size="large">资方信息</el-radio>
            <el-radio label="高薪小贷" size="large">高薪小贷</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="condition === 'contractSubject'" label="合同主体">
          <el-select
            v-model="editForm.contractSubject"
            multiple
            collapse-tags
            collapse-tags-tooltip
            placeholder="Select"
            style="width: 240px"
          >
            <!-- <el-option
              v-for="item in contractSubjectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            /> -->
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="condition === 'capitalInfo'"
          label="资方信息"
        ></el-form-item>
        <el-form-item
          v-if="condition === '高薪小贷'"
          label="高薪小贷"
        ></el-form-item>
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
        <el-form-item label="省/市">
          <!-- <AreaCasder
            :value="editForm.areaCode"
            @changeAreaData="changeAreaData"
          /> -->
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
// import { Plus } from '@element-plus/icons-vue'
import type { ModelStateType } from '@/views/mortgage/mainPart/type'
import type { MortgageSubjectListResponse } from '@/api/mainPart/types/response'
// import AreaCasder from '@/components/AreaCascader/index.vue'

type ModelPropsType = {
  visible: boolean
  formValue: MortgageSubjectListResponse
  title: string
}
const props = withDefaults(defineProps<ModelPropsType>(), {
  visible: false,
  formValue: () => ({
    /**
     * 资方信息
     */
    capitalInfo: '',
    /**
     * 联系地址-城市code
     */
    contactAddressCityCode: '',
    /**
     * 联系地址-城市名称
     */
    contactAddressCityName: '',
    /**
     * 联系地址-详细地址
     */
    contactAddressDetail: '',
    /**
     * 联系地址-省份code
     */
    contactAddressProvinceCode: '',
    /**
     * 联系地址-省份名称
     */
    contactAddressProvinceName: '',
    /**
     * 联系人
     */
    contactName: '',
    /**
     * 联系电话
     */
    contactPhone: '',
    /**
     * 合同主体
     */
    contractSubject: '',
    /**
     * 创建时间
     */
    createTime: '',
    /**
     * 创建者
     */
    creatorName: '',
    /**
     * 抵押主体全称
     */
    mortgageSubjectAllName: '',
    /**
     * 抵押主体唯一Code
     */
    mortgageSubjectCode: '',
    /**
     * 抵押主体名称
     */
    mortgageSubjectName: '',
    /**
     * 抵押主体类型
     */
    mortgageSubjectType: '',
    /**
     * 组织机构代码
     */
    organizationCode: '',
    /**
     * 注册地址
     */
    registeredAddress: '',
    /**
     * 更新者
     */
    updaterName: '',
    /**
     * 更新时间
     */
    updateTime: ''
  }),
  title: ''
})

const state = reactive<ModelStateType>({
  dialogVisible: false,
  editForm: {
    /**
     * 资方信息
     */
    capitalInfo: '',
    /**
     * 联系地址-城市code
     */
    contactAddressCityCode: '',
    /**
     * 联系地址-城市名称
     */
    contactAddressCityName: '',
    /**
     * 联系地址-详细地址
     */
    contactAddressDetail: '',
    /**
     * 联系地址-省份code
     */
    contactAddressProvinceCode: '',
    /**
     * 联系地址-省份名称
     */
    contactAddressProvinceName: '',
    /**
     * 联系人
     */
    contactName: '',
    /**
     * 联系电话
     */
    contactPhone: '',
    /**
     * 合同主体
     */
    contractSubject: '',
    /**
     * 创建时间
     */
    createTime: '',
    /**
     * 创建者
     */
    creatorName: '',
    /**
     * 抵押主体全称
     */
    mortgageSubjectAllName: '',
    /**
     * 抵押主体唯一Code
     */
    mortgageSubjectCode: '',
    /**
     * 抵押主体名称
     */
    mortgageSubjectName: '',
    /**
     * 抵押主体类型
     */
    mortgageSubjectType: '',
    /**
     * 组织机构代码
     */
    organizationCode: '',
    /**
     * 注册地址
     */
    registeredAddress: '',
    /**
     * 更新者
     */
    updaterName: '',
    /**
     * 更新时间
     */
    updateTime: ''
  },
  dialogTitle: '',
  condition: ''
})
const { dialogVisible, editForm, dialogTitle, condition } = toRefs(state)
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
