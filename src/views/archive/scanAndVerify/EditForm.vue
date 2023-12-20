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
          <div class="file-name" @click="openFileHandler">
            {{ fileParams.fileName }}
          </div>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="登记证编号"
              prop="registerNo"
              class="width-full"
            >
              <div class="detail-container width-full">
                <el-input
                  v-model="formParamsRequest.registerCardNo"
                  class="width-full"
                  clearable
                />
                <span class="detail">
                  {{ formParams.registerCardNo?.targetValue }}
                </span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车架号" prop="vinNo">
              <div class="detail-container width-full">
                <el-input
                  v-model="formParamsRequest.vinNo"
                  clearable
                  class="width-full"
                />
                <span class="detail">{{ formParams.vinNo?.targetValue }}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="车牌号"
              prop="licensePlateNo"
              class="width-full"
            >
              <div class="detail-container width-full">
                <el-input
                  v-model="formParamsRequest.licensePlateNo"
                  class="width-full"
                  clearable
                />
                <span class="detail">
                  {{ formParams.licensePlateNo?.targetValue }}
                </span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="发动机号" prop="engineNo" class="width-full">
              <div class="detail-container width-full">
                <el-input
                  v-model="formParamsRequest.engineNo"
                  class="width-full"
                  clearable
                />
                <span class="detail">{{
                  formParams.engineNo?.targetValue
                }}</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="发动机型号"
              prop="engineType"
              class="width-full"
            >
              <div class="detail-container width-full">
                <el-input
                  v-model="formParamsRequest.engineType"
                  class="width-full"
                  clearable
                />
                <span class="detail">
                  {{ formParams.engineType?.targetValue }}
                </span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="机动车所有人"
              prop="vehicleOwner"
              class="width-full"
            >
              <div class="detail-container width-full">
                <el-input
                  v-model="formParamsRequest.vehicleOwner"
                  class="width-full"
                  clearable
                />
                <span class="detail">
                  {{ formParams.vehicleOwner?.targetValue }}
                </span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="车身颜色"
              prop="vehicleColor"
              class="width-full"
            >
              <div class="detail-container width-full">
                <el-input
                  v-model="formParamsRequest.vehicleColor"
                  class="width-full"
                  clearable
                />
                <span class="detail">
                  {{ formParams.vehicleColor?.targetValue }}
                </span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="使用性质" prop="useType" class="width-full">
              <div class="detail-container width-full">
                <el-input
                  v-model="formParamsRequest.useType"
                  class="width-full"
                  clearable
                />
                <span class="detail">{{
                  formParams.useType?.targetValue
                }}</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="抵押权人" prop="mortgagee" class="width-full">
              <div class="detail-container width-full">
                <el-select
                  v-model="formParamsRequest.mortgagee"
                  class="width-full"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in mortgageeOpts"
                    :key="index"
                    :label="item.mortgagee"
                    :value="item.mortgagee"
                  />
                </el-select>
                <div class="detail">
                  {{ formParams.mortgagee?.targetValue }}
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="统一社会信用代码"
              prop="mortgageeUscc"
              class="width-full"
            >
              <div class="detail-container width-full">
                <el-input
                  v-model="formParamsRequest.mortgageeUscc"
                  class="width-full"
                  clearable
                />
                <div class="detail" style="display: inline">
                  {{ formParams.mortgageeUscc?.targetValue }}
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="抵押日期"
              prop="mortgageRegisterDate"
              class="width-full"
            >
              <div class="detail-container width-full">
                <el-date-picker
                  v-model="formParamsRequest.mortgageRegisterDate"
                  type="date"
                  placeholder="请选择日期"
                  class="width-full"
                  clearable
                />
                <div class="detail">
                  {{ formParams.mortgageRegisterDate?.targetValue }}
                </div>
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
    <Preview
      v-model="previewVisible"
      :fileUrl="previewUrl"
      title="文件预览"
      :fileName="preFileName"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, Ref, watch } from 'vue'
import type { ModifiyInfo, FormOrigin, MortgageeItem, CardCell } from '@/api'
import { MortageAPI } from '@/api'
import { ElMessage } from 'element-plus'
import Preview from '@/components/Preview/index.vue'
import { openLink, isPdf } from '@/utils'
import { useGetPreviewURL } from '@/hooks'
import dayjs from 'dayjs'

const API = new MortageAPI()
const dialogTitle = ref<string>('编辑扫描结果')
const dialogVisible = ref<boolean>(false)
const formLoading = ref<boolean>(false)
const formRules = reactive({})
const formRef = ref()
const infoId = ref<string>('')
const emit = defineEmits(['success'])

const fileParams = reactive<Pick<CardCell, 'fileCode' | 'fileName'>>({
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
const open = async (id: string) => {
  infoId.value = id
  formLoading.value = true
  await getCardInfo(id)
  await getMortList()
  dialogVisible.value = true
}

defineExpose({ open })

// 保存
const submitForm = () => {
  const { mortgageRegisterDate, ...others } = formParamsRequest
  const params = {
    id: infoId.value,
    mortgageRegisterDate: dayjs(mortgageRegisterDate).format(
      'YYYY-MM-DD HH:mm:ss'
    ),
    ...others
  }
  API.editRegisterCardInfo(params)
    .then((res) => {
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '编辑成功'
        })
        emit('success')
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

// 打开预览功能
const previewVisible = ref<boolean>(false)
const previewUrl = ref<string>('')
const preFileName = ref<string>('')

const openFileHandler = async () => {
  const fileCode = fileParams?.fileCode || ''
  const { preUrl, fileName } = await useGetPreviewURL(fileCode)
  previewUrl.value = preUrl
  preFileName.value = fileName
  if (!previewUrl.value) {
    ElMessage.error('读取上传文件URL出错')
  }
  // 临时添加，PDF 文件直接打开预览
  if (isPdf(preFileName.value)) {
    openLink(previewUrl.value, '_blank')
    return
  }

  previewVisible.value = true
}

// 获取抵押人字典信息
const mortgageeOpts: Ref<MortgageeItem[]> = ref([])
const getMortList = () => {
  const params = {
    mortgageeType: 'HAITONG'
  }
  API.getMortgageList(params)
    .then((res) => {
      if (res && res.code === 200) {
        mortgageeOpts.value = res?.data || []
      }
    })
    .catch((err: Error) => {
      throw err
    })
}

// 获取详情接口
const getCardInfo = (id: string) => {
  const params = { id }
  API.getRegisterCardInfo(params)
    .then((res) => {
      formLoading.value = false
      if (res && res.code === 200) {
        fileParams.fileName = res?.data?.fileName || ''
        fileParams.fileCode = res?.data?.fileCode || ''
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

// 监听 抵解押切换
watch(
  () => formParamsRequest.mortgagee,
  () => {
    const filterCell = mortgageeOpts.value.filter((item) => {
      return item.mortgagee === formParamsRequest.mortgagee
    })
    formParamsRequest.mortgageeUscc =
      filterCell && filterCell[0]?.unifiedSocialCreditCode
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="scss" scoped>
.detail-container {
  display: flex;
  flex-direction: column;
}
.detail {
  padding: 4px;
  color: #1893ff;
  line-height: 16px;
}
.width-full {
  width: 100%;
}
.file-name {
  display: inline-block;
  padding-bottom: 10px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: $base-color-primary;
  cursor: pointer;
}
.file-name:hover {
  text-decoration: underline;
  text-underline-position: under;
  text-underline-offset: 4px;
}
</style>
