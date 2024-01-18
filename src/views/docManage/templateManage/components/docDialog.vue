<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      @open="handleOpen"
    >
      <el-form
        ref="formRef"
        :model="formParams"
        v-loading="formLoading"
        label-width="80px"
        :rules="formRules"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="文书类型" prop="applicableType">
              <el-select
                v-model="formParams.applicableType"
                clearable
                placeholder="请选择"
                width="100%"
                @change="handleAppType"
              >
                <el-option
                  v-for="item in documentType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文书名称" prop="applicableName">
              <el-select
                v-model="formParams.applicableName"
                clearable
                placeholder="请选择"
                width="100%"
                @change="handleAppName"
              >
                <el-option
                  v-for="item in documentName"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="版本号" prop="applicableVersion">
              <el-select
                v-model="formParams.applicableVersion"
                clearable
                placeholder="请选择"
                width="100%"
              >
                <el-option
                  v-for="item in documentVersion"
                  :key="item.documentNo"
                  :label="item.documentVersion"
                  :value="
                    item.documentNo +
                    ',' +
                    item.documentVersion +
                    ',' +
                    item.documentName
                  "
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="saveHandler"> 保 存 </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          关 闭
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, reactive } from 'vue'
import type { SystemDocumentVO } from '@/api/docCheck/types/response'
import { DocCheckAPI, CommonAPI } from '@/api'
import type { DictItem } from '@/api'
import { ElForm } from 'element-plus'

const emit = defineEmits(['success'])

const dialogTitle: Ref<string> = ref('')
const dialogVisible: Ref<boolean> = ref(false)
const currentType: Ref<string> = ref('')
const formLoading: Ref<boolean> = ref(false)
const CommonApi = new CommonAPI()
const API = new DocCheckAPI()
// const API = new DocCheckAPI()
const documentType: Ref<DictItem[]> = ref([])
const documentName: Ref<string[]> = ref([])
const documentVersion: Ref<SystemDocumentVO[]> = ref([])
const formRules = reactive({
  applicableType: [
    { required: true, message: '文书类型不能为空', trigger: 'change' }
  ],
  applicableName: [
    { required: true, message: '文书名称不能为空', trigger: 'change' }
  ],
  applicableVersion: [
    { required: true, message: '版本号不能为空', trigger: 'change' }
  ]
})
const handleOpen = () => {
  getDicts()
}
const getDicts = () => {
  const dictTypes = ['SYSTEM_DOCUMENT_TYPE']
  const params = {
    dictTypes
  }
  CommonApi.getDictsList(params)
    .then((res) => {
      if (res && res.code === 200) {
        documentType.value = res?.data?.SYSTEM_DOCUMENT_TYPE as DictItem[]
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
const handleAppType = (e: string) => {
  const formData = new FormData()
  formData.append('documentType', e)
  API.getByDocumentNameByType(formData)
    .then((res) => {
      if (res && res.code === 200) {
        documentName.value = res?.data || []
        documentVersion.value = []
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
const handleAppName = (e: string) => {
  const formData = new FormData()
  formData.append('documentType', formParams.applicableType)
  formData.append('documentName', e)
  API.getByDocumentByNameAndType(formData)
    .then((res) => {
      if (res && res.code === 200) {
        documentVersion.value = res?.data || []
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
type applicableFrom = {
  applicableType: string
  applicableName: string
  applicableVersion: string
}
const formParams = reactive<applicableFrom>({
  applicableType: '',
  applicableName: '',
  applicableVersion: ''
})
const formRef = ref<InstanceType<typeof ElForm>>()
const saveHandler = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  const applic = formParams.applicableVersion.split(',')
  emit('success', applic[0], applic[1], applic[2])
  dialogVisible.value = false
}
const open = (type: string) => {
  dialogVisible.value = true
  currentType.value = type
  dialogTitle.value = type === 'add' ? '选择文书' : '编辑'
  formParams.applicableType = ''
  formParams.applicableName = ''
  formParams.applicableVersion = ''
}
defineExpose({ open })
</script>

<style scoped></style>
