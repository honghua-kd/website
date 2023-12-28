<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center
    >
      <el-form
        ref="formRef"
        :model="formParams"
        v-loading="formLoading"
        label-width="80px"
        :rules="formRules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="省份" prop="market">
              <el-select
                v-model="formParams.market"
                clearable
                placeholder="请选择省份"
              >
                <el-option
                  v-for="item in statusOpts"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="城市" prop="city">
              <el-select
                v-model="formParams.city"
                clearable
                placeholder="请选择城市"
              >
                <el-option
                  v-for="item in statusOpts"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否可以办理抵押" prop="market">
              <el-select
                v-model="formParams.market"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in statusOpts"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否可以办理解押" prop="market">
              <el-select
                v-model="formParams.market"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in statusOpts"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="车牌代码" prop="market">
              <el-select
                v-model="formParams.market"
                clearable
                placeholder="请选择"
                class="city-select"
              >
                <el-option
                  v-for="item in statusOpts"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
              <el-select
                v-model="formParams.market"
                clearable
                placeholder="请选择"
                class="city-select"
              >
                <el-option
                  v-for="item in statusOpts"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
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
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref } from 'vue'
import { ElForm } from 'element-plus'
const dialogTitle: Ref<string> = ref('新增')
const dialogVisible: Ref<boolean> = ref(false)
const formLoading: Ref<boolean> = ref(false)
const currentType: Ref<string> = ref('')
const statusOpts = reactive([
  {
    dictLabel: '城',
    dictValue: 1
  },
  {
    dictLabel: '市',
    dictValue: 0
  }
])
interface paramsForm {
  city: string
  market: string
  chepai: string
}
const formParams = reactive<paramsForm>({
  city: '',
  market: '',
  chepai: ''
})
const formRules = reactive({
  city: [{ required: true, message: '城市不能为空', trigger: 'change' }]
})
const formRef = ref<InstanceType<typeof ElForm>>()

const submitForm = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  console.log('object')
}
interface TableItem {
  id: number
  downloadPerson: string
  downloadTime: string
  status: string
  isDiYa: boolean
  isJieYa: boolean
}
const open = (type: string, row: TableItem) => {
  dialogVisible.value = true
  currentType.value = type
  dialogTitle.value = type === 'add' ? '新增' : '编辑'
  if (type === 'edit') {
    console.log('object', row)
    // formParams.id = row?.id
    // formParams.name = row?.name
    // formParams.type = row?.type
    // formParams.status = row?.status || 0
    // formParams.remark = row?.remark
  }
}
defineExpose({ open })
</script>

<style lang="scss" scoped>
.city-select {
  margin-left: 1%;
  width: 48%;
}
:deep(.el-dialog__header) {
  text-align: initial;
}
:deep(.el-form-item__label) {
  line-height: normal;
  text-align: end;
}
</style>
