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
        :model="formParamsRequest"
        v-loading="formLoading"
        :rules="formRules"
        label-width="130px"
      >
        <el-form-item label="文件名">
          <el-link type="primary">{{ fileParams.fileName }}</el-link>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="登记证编号" prop="registerNo">
              <el-input v-model="formParamsRequest.registerCardNo" />
              <span class="detail">
                {{ formParams.registerCardNo?.targetValue }}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车架号" prop="vinNo">
              <el-input v-model="formParamsRequest.vinNo" />
              <span class="detail">{{ formParams.vinNo?.targetValue }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车牌号" prop="licensePlateNo">
              <el-input v-model="formParamsRequest.licensePlateNo" />
              <span class="detail">
                {{ formParams.licensePlateNo?.targetValue }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="发动机号" prop="engineNo">
              <el-input v-model="formParamsRequest.engineNo" />
              <span class="detail">{{ formParams.engineNo?.targetValue }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发动机型号" prop="engineType">
              <el-input v-model="formParamsRequest.engineType" />
              <span class="detail">
                {{ formParams.engineType?.targetValue }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机动车所有人" prop="vehicleOwner">
              <el-input v-model="formParamsRequest.vehicleOwner" />
              <span class="detail">
                {{ formParams.vehicleOwner?.targetValue }}
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="车身颜色" prop="vehicleColor">
              <el-input v-model="formParamsRequest.vehicleColor" />
              <span class="detail">
                {{ formParams.vehicleColor?.targetValue }}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用性质" prop="useType">
              <el-input v-model="formParamsRequest.useType" />
              <span class="detail">{{ formParams.useType?.targetValue }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="抵押权人" prop="mortgagee">
              <el-select v-model="formParamsRequest.mortgagee">
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
              <el-input v-model="formParamsRequest.mortgageeUscc" />
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
                v-model="formParamsRequest.mortgageRegisterDate"
                type="date"
                placeholder="请选择日期"
                class="width-full"
              />
              <div class="detail">
                {{ formParams.mortgageRegisterDate?.targetValue }}
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-tooltip content="系统数据覆盖OCR识别结果" placement="top-start">
          <el-button
            :disabled="formLoading"
            type="primary"
            @click="coverChangeHandler"
          >
            覆 盖
          </el-button>
        </el-tooltip>

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
import type {
  CardInfoIO,
  EditRegisterCardInfoRequest,
  ModifiyInfo
} from '@/api'
import { MortageAPI } from '@/api/mortgageRelease'
import { ElMessage } from 'element-plus'

const API = new MortageAPI()
const dialogTitle = ref<string>('编辑扫描结果')
const dialogVisible = ref<boolean>(false)
const formLoading = ref<boolean>(false)
const formRules = reactive({})
const formRef = ref()
const infoId = ref<string>('')

const fileParams = reactive<Pick<CardInfoIO, 'fileCode' | 'fileName'>>({
  fileName: '',
  fileCode: ''
})

const formParamsRequest = reactive<ModifiyInfo>({
  registerCardNo: '', // 登记证编号
  vinNo: '', // 车架号
  licensePlateNo: '', // 车牌号
  engineNo: '', // 发动机号
  engineType: '', // 发动机型号
  vehicleOwner: '', // 机动车所有人
  vehicleColor: '', // 车身颜色
  useType: '', // 使用性质
  mortgagee: '', // 抵押权人
  mortgageeUscc: '', // 统一社会信用代码
  mortgageRegisterDate: '' // 抵押日期
})

// 存放原始数据
const formParams = reactive<CardInfoIO>({
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
        fileParams.fileName = res?.data?.fileName
        fileParams.fileCode = res?.data?.fileCode

        formParams.registerCardNo = res?.data?.registerCardNo
        formParamsRequest.registerCardNo =
          res?.data?.registerCardNo?.sourceValue

        formParams.vinNo = res?.data?.vinNo
        formParamsRequest.vinNo = res?.data?.vinNo?.sourceValue

        formParams.licensePlateNo = res?.data?.licensePlateNo
        formParamsRequest.licensePlateNo =
          res?.data?.licensePlateNo?.sourceValue

        formParams.engineNo = res?.data?.engineNo
        formParamsRequest.engineNo = res?.data?.engineNo?.sourceValue

        formParams.engineType = res?.data?.engineType
        formParamsRequest.engineType = res?.data?.engineType?.sourceValue

        formParams.vehicleOwner = res?.data?.vehicleOwner
        formParamsRequest.vehicleOwner = res?.data?.vehicleOwner?.sourceValue

        formParams.vehicleColor = res?.data?.vehicleColor
        formParamsRequest.vehicleColor = res?.data?.vehicleColor?.sourceValue

        formParams.useType = res?.data?.useType
        formParamsRequest.useType = res?.data?.useType?.sourceValue

        formParams.mortgagee = res?.data?.mortgagee
        formParamsRequest.mortgagee = res?.data?.mortgagee?.sourceValue

        formParams.mortgageeUscc = res?.data?.mortgageeUscc
        formParamsRequest.mortgageeUscc = res?.data?.mortgageeUscc?.sourceValue

        formParams.mortgageRegisterDate = res?.data?.mortgageRegisterDate

        formParamsRequest.mortgageRegisterDate =
          res?.data?.mortgageRegisterDate?.sourceValue
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
    ...formParamsRequest
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

// 覆盖功能
const coverChangeHandler = () => {
  if (formParams?.registerCardNo?.targetValue) {
    formParamsRequest.registerCardNo = formParams?.registerCardNo?.targetValue
  }

  if (formParams?.vinNo?.targetValue) {
    formParamsRequest.vinNo = formParams?.vinNo?.targetValue
  }

  if (formParams?.licensePlateNo?.targetValue) {
    formParamsRequest.licensePlateNo = formParams?.licensePlateNo?.targetValue
  }

  if (formParams?.engineNo?.targetValue) {
    formParamsRequest.engineNo = formParams?.engineNo?.targetValue
  }

  if (formParams?.engineType?.targetValue) {
    formParamsRequest.engineType = formParams?.engineType?.targetValue
  }

  if (formParams?.vehicleOwner?.targetValue) {
    formParamsRequest.vehicleOwner = formParams?.vehicleOwner?.targetValue
  }

  if (formParams?.vehicleColor?.targetValue) {
    formParamsRequest.vehicleColor = formParams?.vehicleColor?.targetValue
  }

  if (formParams?.useType?.targetValue) {
    formParamsRequest.useType = formParams?.useType?.targetValue
  }

  if (formParams?.mortgagee?.targetValue) {
    formParamsRequest.mortgagee = formParams?.mortgagee?.targetValue
  }

  if (formParams?.mortgageeUscc?.targetValue) {
    formParamsRequest.mortgageeUscc = formParams?.mortgageeUscc?.targetValue
  }

  if (formParams?.mortgageRegisterDate?.targetValue) {
    formParamsRequest.mortgageRegisterDate =
      formParams?.mortgageRegisterDate?.targetValue
  }
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
