<template>
  <div>
    <el-dialog
      width="60%"
      :title="title"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
      @close="resetForm"
      v-if="dialogVisible"
    >
      <el-form ref="expressRef" :model="expressInfoForm" label-width="130px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="快递内容编号:" prop="contentNo">
              <el-input
                v-model="expressInfoForm.contentNo"
                clearable
                placeholder="请输入快递内容编号"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              class="express-com"
              label="快递内容类型:"
              prop="contentType"
            >
              <el-select
                v-model="expressInfoForm.contentType"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="(item, index) in expressContentOpts"
                  :key="index"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="类型对应编号:" prop="contentTypeNumber">
              <el-input
                v-model="expressInfoForm.contentTypeNumber"
                clearable
                :placeholder="contentTypePlaceHolder"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关联合同号:" prop="contractNo">
              <el-input
                v-model="expressInfoForm.contractNo"
                clearable
                disabled
                placeholder="请输入关联合同号"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="saveExpressHandler">
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
import { ref, reactive, Ref, watch } from 'vue'
import type { DictItem } from '@/api'
import { ExpressAPI } from '@/api'
const API = new ExpressAPI()
const expressInfoForm = reactive({
  id: '',
  contentNo: '',
  contentType: '',
  contentTypeNumber: '',
  contractNo: ''
})
const dialogVisible = ref<boolean>(false)
const expressRef = ref()
const emit = defineEmits(['editcontent'])
const saveExpressHandler = () => {
  dialogVisible.value = false
  const params = JSON.parse(JSON.stringify(expressInfoForm))
  emit('editcontent', params)
}
/** 打开弹窗 */
const open = async (row?: string) => {
  dialogVisible.value = true
  getDicts()
  if (typeof row === 'object') {
    const data = JSON.parse(JSON.stringify(row))
    expressInfoForm.id = data.id
    expressInfoForm.contentNo = data.contentNo
    expressInfoForm.contentType = data.contentType
    expressInfoForm.contentTypeNumber = data.contentTypeNumber
    expressInfoForm.contractNo = data.contractNo
  } else {
    getExpressContentNo(row)
    expressInfoForm.id = ''
    expressInfoForm.contentNo = ''
    expressInfoForm.contentType = ''
    expressInfoForm.contentTypeNumber = ''
    expressInfoForm.contractNo = ''
  }
}
const getExpressContentNo = (no: string) => {
  const params = {
    expressNo: no
  }
  API.getExpressContentNo(params)
    .then((res) => {
      if (res && res.code === 200) {
        expressInfoForm.contentNo = res?.data || ''
      }
    })
    .catch((err: Error) => {
      console.log(err)
    })
}
const expressContentOpts: Ref<DictItem[]> = ref([])
const getDicts = () => {
  expressContentOpts.value = JSON.parse(localStorage.getItem('EXPRESS_CONTENT'))
  expressContentOpts.value.forEach((item) => {
    item.value = Number(item.value)
  })
}
const resetForm = () => {
  expressRef.value.resetFields()
}
defineExpose({ open })
const contentTypePlaceHolder = ref('')
watch(
  () => expressInfoForm.contentType,
  (val) => {
    if (val === '登记证') {
      contentTypePlaceHolder.value = '请输入车架号'
    } else if (val === '抵押材料') {
      contentTypePlaceHolder.value = '请输入抵押任务号'
    } else if (val === '解压材料') {
      contentTypePlaceHolder.value = '请输入解押任务号'
    } else if (val === '发票') {
      contentTypePlaceHolder.value = '请输入发票号码'
    } else if (val === '其他') {
      contentTypePlaceHolder.value = '请输入XX编号'
    } else {
      contentTypePlaceHolder.value = ''
    }
  },
  {
    immediate: true
  }
)
</script>

<style scoped></style>
