<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="60%"
    >
      <el-form
        ref="formRef"
        :model="formParams"
        v-loading="formLoading"
        :rules="formRules"
        label-width="130px"
      >
        <el-form-item label="文件名">
          <el-link type="primary">{{ formParams.fileName }}</el-link>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="登记证编号" prop="registerNo">
              <el-input v-model="formParams.registerCardNo!.sourceValue" />
              <span class="detail">
                {{ formParams.registerCardNo?.targetValue }}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车架号" prop="vinNo">
              <el-input v-model="formParams.vinNo!.sourceValue" />
              <span class="detail">{{ formParams.vinNo?.targetValue }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车牌号" prop="licensePlateNo">
              <el-input v-model="formParams.licensePlateNo!.sourceValue" />
              <span class="detail">
                {{ formParams.licensePlateNo?.targetValue }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="发动机号" prop="engineNo">
              <el-input v-model="formParams.engineNo!.sourceValue" />
              <span class="detail">{{ formParams.engineNo?.targetValue }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发动机型号" prop="engineType">
              <el-input v-model="formParams.engineType!.sourceValue" />
              <span class="detail">
                {{ formParams.engineType?.targetValue }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机动车所有人" prop="vehicleOwner">
              <el-input v-model="formParams.vehicleOwner!.sourceValue" />
              <span class="detail">
                {{ formParams.vehicleOwner?.targetValue }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="车身颜色" prop="vehicleColor">
              <el-input v-model="formParams.vehicleColor!.sourceValue" />
              <span class="detail">
                {{ formParams.vehicleColor?.targetValue }}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用性质" prop="useType">
              <el-input v-model="formParams.useType!.sourceValue" />
              <span class="detail">{{ formParams.useType?.targetValue }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="抵押权人" prop="mortgagee">
              <el-select v-model="formParams.mortgagee!.sourceValue">
                <el-option
                  v-for="(item, index) in mortOpts"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <span class="detail">
                {{ formParams.mortgagee?.targetValue }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="统一社会信用代码" prop="mortgageeUscc">
              <el-input v-model="formParams.mortgageeUscc!.sourceValue" />
              <span class="detail">
                {{ formParams.mortgageeUscc?.targetValue }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="抵押日期" prop="mortgageRegisterDate">
              <el-date-picker
                v-model="formParams.mortgageRegisterDate!.sourceValue"
                type="date"
                placeholder="请选择日期"
                class="width-full"
              />
              <p class="detail">
                {{ formParams.mortgageRegisterDate?.targetValue }}
              </p>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button :disabled="formLoading" type="primary" @click="submitForm">
          保 存
        </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          关 闭
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { mortOpts } from './config'
import type { CardInfoIO, EditRegisterCardInfoRequest } from '@/api'
import { MortageAPI } from '@/api/mortgageRelease'
import { ElMessage } from 'element-plus'

const API = new MortageAPI()
const dialogTitle = ref<string>('编辑扫描结果')
const dialogVisible = ref<boolean>(false)
const formLoading = ref<boolean>(false)
const formRules = reactive({})
const formRef = ref()
const infoId = ref<string>('')
const formParams = reactive<CardInfoIO>({
  fileName: '',
  fileCode: '',
  registerCardNo: {
    sourceValue: '',
    targetValue: ''
  }, // 登记证编号
  vinNo: {
    sourceValue: '',
    targetValue: ''
  }, // 车架号
  licensePlateNo: {
    sourceValue: '',
    targetValue: ''
  }, // 车牌号
  engineNo: {
    sourceValue: '',
    targetValue: ''
  }, // 发动机号
  engineType: {
    sourceValue: '',
    targetValue: ''
  }, // 发动机型号
  vehicleOwner: {
    sourceValue: '',
    targetValue: ''
  }, // 机动车所有人
  vehicleColor: {
    sourceValue: '',
    targetValue: ''
  }, // 车身颜色
  useType: {
    sourceValue: '',
    targetValue: ''
  }, // 使用性质
  mortgagee: {
    sourceValue: '',
    targetValue: ''
  }, // 抵押权人
  mortgageeUscc: {
    sourceValue: '',
    targetValue: ''
  }, // 统一社会信用代码
  mortgageRegisterDate: {
    sourceValue: '',
    targetValue: ''
  } // 抵押日期
})

/** 打开弹窗 */
const open = (id: string) => {
  dialogVisible.value = true
  infoId.value = id
  const params = { id }
  formLoading.value = true
  API.getRegisterCardInfo(params)
    .then((res) => {
      formLoading.value = false
      if (res && res.code === 200) {
        formParams.fileName = res?.data?.fileName
        formParams.fileCode = res?.data?.fileCode
        formParams.registerCardNo = res?.data?.registerCardNo
        formParams.vinNo = res?.data?.vinNo
        formParams.licensePlateNo = res?.data?.licensePlateNo
        formParams.engineNo = res?.data?.engineNo
        formParams.engineType = res?.data?.engineType
        formParams.vehicleOwner = res?.data?.vehicleOwner
        formParams.vehicleColor = res?.data?.vehicleColor
        formParams.useType = res?.data?.useType
        formParams.mortgagee = res?.data?.mortgagee
        formParams.mortgageeUscc = res?.data?.mortgageeUscc
        formParams.mortgageRegisterDate = res?.data?.mortgageRegisterDate
      }
    })
    .catch((err: Error) => {
      formLoading.value = false
      throw err
    })
}

defineExpose({ open })

// 保存
const submitForm = () => {
  const params = {
    id: infoId.value,
    registerCardNo: formParams.registerCardNo?.sourceValue,
    vinNo: formParams.vinNo?.sourceValue,
    licensePlateNo: formParams.licensePlateNo?.sourceValue,
    engineNo: formParams.engineNo?.sourceValue,
    engineType: formParams.engineType?.sourceValue,
    vehicleOwner: formParams.vehicleOwner?.sourceValue,
    vehicleColor: formParams.vehicleColor?.sourceValue,
    useType: formParams.useType?.sourceValue,
    mortgagee: formParams.mortgagee?.sourceValue,
    mortgageeUscc: formParams.mortgageeUscc?.sourceValue
    // mortgageRegisterDate: new Date(
    //   formParams.mortgageRegisterDate?.sourceValue
    // ).getTime()
  } as EditRegisterCardInfoRequest
  API.editRegisterCardInfo(params)
    .then((res) => {
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '编辑成功'
        })
        dialogVisible.value = false
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
</script>

<style lang="scss" scoped>
.detail {
  color: #1893ff;
  line-height: 16px;
}
.width-full {
  width: 100%;
}
</style>
