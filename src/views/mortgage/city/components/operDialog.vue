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
        :label-width="px2rem('140px')"
        :rules="formRules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="省市"
              prop="market"
              :rules="[
                { required: true, message: '不能为空', trigger: 'change' }
              ]"
            >
              <el-cascader
                v-model="selCity"
                :props="props"
                clearable
                @change="changeCity"
                style="wdith: 100%"
              />
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
            <el-form-item label="是否可以办理解押" prop="market">
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
import { px2rem } from '@/utils'
import type { MortgageCityListResponse,EditMortgageCityRequest } from '@/api'
import { CommonAPI, MortgageCityAPI } from '@/api'
const MortgageCityApi = new MortgageCityAPI()
const dialogTitle: Ref<string> = ref('新增')
const dialogVisible: Ref<boolean> = ref(false)
const formLoading: Ref<boolean> = ref(false)
const statusOpts = reactive([
  {
    dictLabel: '是',
    dictValue: 1
  },
  {
    dictLabel: '否',
    dictValue: 0
  }
])
const formParams = reactive<EditMortgageCityRequest>({
  id: '',
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  licensePlateCode: '',
  applyMortgage: 0,
  applyDischarge: 0
})
const formRef = ref<InstanceType<typeof ElForm>>()

const submitForm = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  if (dialogTitle.value === '新增') {
    MortgageCityApi.addMortgageCity(formParams)
      .then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '新增成功'
          })
          dialogVisible.value = false
        }
      })
      .catch((err: Error) => {
        throw err
      })
  } else {
    MortgageCityApi.editMortgageCity(formParams)
      .then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '修改成功'
          })
          dialogVisible.value = false
        }
      })
      .catch((err: Error) => {
        throw err
      })
  }
}
const open = (type: string, row: MortgageCityListResponse) => {
  dialogVisible.value = true
  dialogTitle.value = type === 'add' ? '新增' : '编辑'
  if (type === 'edit') {
    formParams.id = row.id
    formParams.provinceCode = row.provinceCode
    formParams.provinceName = row.provinceName
    formParams.cityCode = row.cityCode
    formParams.cityName = row.cityName
    formParams.licensePlateCode = row.licensePlateCode
    formParams.applyMortgage = row.applyMortgage
    formParams.applyDischarge = row.applyDischarge
  } else {
    formParams.id = ''
    formParams.provinceCode = ''
    formParams.provinceName = ''
    formParams.cityCode = ''
    formParams.cityName = ''
    formParams.licensePlateCode = ''
    formParams.applyMortgage = 0
    formParams.applyDischarge = 0
  }
}
defineExpose({ open })
</script>

<style lang="scss" scoped>
.city-select {
  margin-left: 1%;
  width: 28%;
}
:deep(.el-dialog__header) {
  text-align: initial;
}
</style>
