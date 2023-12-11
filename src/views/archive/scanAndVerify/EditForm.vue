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
  ModifiyInfo,
  FormOrigin
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
const formParams = reactive<FormOrigin>({
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
        const keysArr = Object.keys(formParams)

        for (let i = 0; i < keysArr.length; i++) {
          const keyModify = keysArr[i] as keyof ModifiyInfo
          formParamsRequest[keyModify] =
            res?.data?.[keyModify]?.sourceValue || ''
          const keyFormOrigin = keysArr[i] as keyof FormOrigin
          formParams[keyFormOrigin].sourceValue =
            res?.data?.[keyFormOrigin]?.sourceValue || ''
          formParams[keyFormOrigin].targetValue =
            res?.data?.[keyFormOrigin]?.targetValue || ''
        }
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
  const keysArr = Object.keys(formParams)
  for (let i = 0; i < keysArr.length; i++) {
    const keyOrigin = keysArr[i] as keyof FormOrigin
    const keyModify = keysArr[i] as keyof ModifiyInfo
    if (formParams[keyOrigin].targetValue) {
      formParamsRequest[keyModify] = formParams[keyOrigin].targetValue
    }
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
