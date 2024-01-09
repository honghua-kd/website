<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="second-title">基础信息</div>
      <el-form
        ref="formRef"
        :model="formParams"
        v-loading="formLoading"
        :label-width="px2rem('120px')"
        :rules="formRules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="规则名称" prop="market" align="center">
              <el-input
                v-model="formParams.chepai"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务类型" prop="type" align="center">
              <el-select
                v-model="formParams.type"
                clearable
                placeholder="请选择"
                style="width: 100%"
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
            <el-form-item label="数据来源" prop="laiyuan" align="center">
              <el-select
                v-model="formParams.laiyuan"
                clearable
                placeholder="请选择"
                style="width: 100%"
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
            <el-form-item label="城市" prop="city" align="center">
              <el-cascader
                ref="cascader"
                clearable
                :options="casOption"
                filterable
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="second-title">分配规则</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="分配类型" prop="market" align="center">
              <el-select
                v-model="formParams.market"
                clearable
                placeholder="请选择"
                style="width: 100%"
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
            <el-form-item label="分配人员" prop="market" align="center">
              <el-select
                v-model="formParams.market"
                clearable
                placeholder="请选择"
                style="width: 100%"
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
            <el-form-item label="是否自动分配" prop="market" align="center">
              <el-select
                v-model="formParams.market"
                clearable
                placeholder="请选择"
                style="width: 100%"
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
            <el-form-item label="是否发送短信" prop="market" align="center">
              <el-select
                v-model="formParams.market"
                clearable
                placeholder="请选择"
                style="width: 100%"
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
            <el-form-item label="短信模版" prop="market" align="center">
              <el-select
                v-model="formParams.market"
                clearable
                placeholder="请选择"
                style="width: 100%"
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
import { px2rem } from '@/utils'
import { ElForm } from 'element-plus'
const dialogTitle: Ref<string> = ref('新增')
const dialogVisible: Ref<boolean> = ref(false)
const formLoading: Ref<boolean> = ref(false)
const currentType: Ref<string> = ref('')
const casOption = ref([])
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
  type: string
  laiyuan: string
}
const formParams = reactive<paramsForm>({
  city: '',
  market: '',
  chepai: '',
  type: '',
  laiyuan: ''
})
const formRules = reactive({
  type: [{ required: true, message: '任务类型不能为空', trigger: 'change' }],
  laiyuan: [{ required: true, message: '数据来源不能为空', trigger: 'change' }],
  city: [{ required: true, message: '任务类型不能为空', trigger: 'change' }]
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
  dialogTitle.value = type === 'add' ? '新增任务分配规则' : '编辑任务分配规则'
  if (type === 'edit') {
    console.log('object', row)
    // formParams.id = row?.id
    // formParams.name = row?.name
    // formParams.type = row?.type
    // formParams.status = row?.status || 0
    // formParams.remark = row?.remark
  }
  initOptions()
}
const initOptions = async () => {}
defineExpose({ open })
</script>

<style lang="scss" scoped>
.second-title {
  margin-bottom: 20px;
  font-size: $base-font-size-big;
}
.city-select {
  margin-left: 1%;
  width: 48%;
}
:deep(.el-dialog__header) {
  text-align: initial;
}
.base-title {
  margin-bottom: 20px;
}
</style>
