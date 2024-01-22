<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      center
      @open="handleOpen"
    >
      <el-form
        ref="formRef"
        :model="formParams"
        v-loading="formLoading"
        label-width="120px"
        :rules="formRules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="文书模板名称" prop="templateName">
              <el-input
                v-model.trim="formParams.templateName"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="适用任务类型" prop="applicableType">
              <el-select
                v-model="formParams.applicableType"
                clearable
                placeholder="请选择"
                width="100%"
              >
                <el-option
                  v-for="item in applicableTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="城市" prop="cityForm">
              <AreaCasder :value="cityForm" @changeAreaData="changeAreaData" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="渠道商/办事处" prop="agencyCode">
              <el-select
                v-model="formParams.agencyCode"
                clearable
                placeholder="请选择"
                width="100%"
                @change="handleAgency"
              >
                <el-option
                  v-for="item in applicableTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="抵押主体" prop="mortgageSubjectCode">
              <el-select
                v-model="formParams.mortgageSubjectCode"
                clearable
                placeholder="请选择"
                width="100%"
              >
                <el-option
                  v-for="item in mortgageType"
                  :key="(item.mortgageSubjectCode as string)"
                  :label="item.mortgageSubjectName"
                  :value="(item.mortgageSubjectCode as string)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优先级" prop="priority">
              <el-input
                v-model.trim="formParams.priority"
                placeholder="数字越大优先级越高"
                clearable
                type="number"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input v-model.trim="formParams.remark" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="选择文书" prop="documents">
              <el-row style="margin-top: 15px">
                <el-tag
                  v-for="(item, index) in formParams.documents"
                  :key="item.documentNo"
                  closable
                  style="margin-right: 10px; margin-bottom: 8px"
                  @close="deleteOverdue(index)"
                >
                  {{
                    (item.documentName || '') +
                    ' ' +
                    (item.documentVersion || '')
                  }}
                </el-tag>
              </el-row>
              <el-row>
                <el-col>
                  <el-button type="text" @click="addHandler">+添加</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button :disabled="formLoading" type="primary" @click="submitForm">
          确 定
        </el-button>
      </template>
    </el-dialog>
    <docDialog ref="docRef" @success="handleSuccess" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref } from 'vue'
import type {
  MortgageDocumentVO,
  MortgageSubjectInfoVO,
  DocumentDTO
} from '@/api/docCheck/types/response.ts'
import type { SaveRequest } from '@/api/docCheck/types/request.ts'
import { ElForm, ElMessage } from 'element-plus'
import AreaCasder from '@/components/AreaCascader/index.vue'
import { DocCheckAPI, CommonAPI } from '@/api'
import docDialog from './docDialog.vue'
import type { DictItem } from '@/api'

const CommonApi = new CommonAPI()
const API = new DocCheckAPI()
const dialogTitle: Ref<string> = ref('')
const dialogVisible: Ref<boolean> = ref(false)
const currentType: Ref<string> = ref('')
const formLoading: Ref<boolean> = ref(false)
const cityForm: Ref<string[]> = ref([])
const applicableTypeList: Ref<DictItem[]> = ref([])
const mortgageType = ref<MortgageSubjectInfoVO[]>([])

const emit = defineEmits(['getList'])

const formParams = reactive<SaveRequest>({
  id: null,
  templateName: '',
  applicableType: '',
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  agencyCode: '',
  agencyName: '',
  mortgageSubjectCode: '',
  priority: null,
  remark: '',
  documents: [],
  documentNo: []
})
const formRules = reactive({
  templateName: [
    { required: true, message: '模板名称不能为空', trigger: 'blur' }
  ],
  applicableType: [
    { required: true, message: '适用任务类型不能为空', trigger: 'blur' }
  ],
  priority: [{ required: true, message: '优先级不能为空', trigger: 'blur' }],
  documents: [
    { required: true, message: '文书不能为空', trigger: ['blur', 'change'] }
  ]
})
const handleOpen = () => {
  getDicts()
}
const getDicts = () => {
  const dictTypes = ['DOCUMENT_TEMPLATE_APPLICABLE_TYPE']
  const params = {
    dictTypes
  }
  CommonApi.getDictsList(params)
    .then((res) => {
      if (res && res.code === 200) {
        applicableTypeList.value = res?.data
          ?.DOCUMENT_TEMPLATE_APPLICABLE_TYPE as DictItem[]
      }
    })
    .catch((err: Error) => {
      throw err
    })
  API.queryMortgageSubject({}).then((res) => {
    if (res && res.code === 200 && res?.data) {
      mortgageType.value = res.data ? res.data : []
    }
  })
}
const formRef = ref<InstanceType<typeof ElForm>>()
const changeAreaData = ({
  provinceCode,
  provinceName,
  cityCode,
  cityName
}: {
  provinceCode: string
  provinceName: string
  cityCode: string
  cityName: string
}) => {
  formParams.provinceCode = provinceCode
  formParams.provinceName = provinceName
  formParams.cityCode = cityCode
  formParams.cityName = cityName
  if (provinceCode === '' && cityCode === '') {
    cityForm.value = []
  } else {
    cityForm.value = [provinceCode, cityCode]
  }
}
const handleAgency = (val: string) => {
  const selectOption = applicableTypeList.value.find(
    (item) => item.value === val
  )
  formParams.agencyName = selectOption?.label
}
const submitForm = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  formLoading.value = true
  const dNo = formParams.documents.map((el: DocumentDTO) => {
    return el.documentNo
  })
  formParams.documentNo = dNo
  API.saveOrUpdateDocumentTemplate(formParams).then((res) => {
    if (res && res.code === 200 && res?.data) {
      ElMessage({
        type: 'success',
        message: '操作成功'
      })
      formLoading.value = false
      dialogVisible.value = false
      emit('getList')
    }
  })
}
const handleSuccess = (ids: string, version: string, name: string) => {
  formParams.documents?.push({
    documentName: name,
    documentVersion: version,
    documentNo: ids
  })
}
const deleteOverdue = (tag: number) => {
  formParams.documents.splice(tag, 1)
}
const docRef = ref()
const addHandler = () => {
  docRef.value.open('add')
}

const open = (type: string, row: MortgageDocumentVO) => {
  dialogVisible.value = true
  currentType.value = type
  dialogTitle.value = type === 'add' ? '新增' : '编辑'
  if (type === 'edit') {
    formParams.id = row?.id
    formParams.templateName = row?.templateName
    formParams.applicableType = row?.applicableType as string
    formParams.provinceCode = row?.provinceCode
    formParams.provinceName = row?.provinceName
    formParams.cityCode = row?.cityCode
    formParams.cityName = row?.cityName
    formParams.agencyCode = row?.agencyCode as string
    formParams.agencyName = row?.agencyName
    formParams.mortgageSubjectCode = row?.mortgageSubjectCode as string
    formParams.priority = row?.priority
    formParams.remark = row?.remark
    cityForm.value = [row?.provinceCode as string, row?.cityCode as string]
    formParams.documents = row?.documents || []
  } else {
    formParams.templateName = ''
    formParams.applicableType = ''
    formParams.provinceCode = ''
    formParams.provinceName = ''
    formParams.cityCode = ''
    formParams.cityName = ''
    formParams.agencyCode = ''
    formParams.agencyName = ''
    formParams.mortgageSubjectCode = ''
    formParams.priority = null
    formParams.remark = ''
    cityForm.value = []
    formParams.documents = []
    formParams.id = null
  }
}
defineExpose({ open })
</script>

<style scoped></style>
