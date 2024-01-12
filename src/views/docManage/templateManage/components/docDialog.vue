<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @open="handleOpen"
      center
    >
      <el-form
        ref="formRef"
        :model="formParams"
        v-loading="formLoading"
        label-width="120px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="文书类型" prop="applicableType">
              <el-select
                v-model="formParams.applicableType"
                clearable
                placeholder="请选择"
                width="100%"
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
          <el-col :span="12">
            <el-form-item label="版本号" prop="agencyCode">
              <el-select
                v-model="formParams.applicableType"
                clearable
                placeholder="请选择"
                width="100%"
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
import type { MortgageDocumentVO } from '@/api/docCheck/types/response.ts'
import { CommonAPI } from '@/api'
import type { DictItem } from '@/api'
import { ElForm } from 'element-plus'

const dialogTitle: Ref<string> = ref('')
const dialogVisible: Ref<boolean> = ref(false)
const currentType: Ref<string> = ref('')
const formLoading: Ref<boolean> = ref(false)
const CommonApi = new CommonAPI()
// const API = new DocCheckAPI()
const documentType: Ref<DictItem[]> = ref([])
const handleOpen = () => {
  console.log('objecthandleOpenhandleOpen')
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
// type DocData = {}
type fronddd = {
  applicableType: string
}
const formParams = reactive<fronddd>({
  applicableType: ''
})
const formRef = ref<InstanceType<typeof ElForm>>()
const saveHandler = () => {}
const open = (type: string, row: MortgageDocumentVO) => {
  dialogVisible.value = true
  currentType.value = type
  dialogTitle.value = type === 'add' ? '文书' : '编辑'
  if (type === 'edit') {
    console.log(row)
  } else {
    console.log(3)
  }
}
defineExpose({ open })
</script>

<style scoped></style>
