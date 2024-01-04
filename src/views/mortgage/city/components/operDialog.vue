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
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="省市"
              prop="proandcity"
              :rules="[
                { required: true, message: '不能为空', trigger: 'change' }
              ]"
            >
              <el-cascader
                ref="cascader"
                v-model="formParams.proandcity"
                clearable
                :props="props"
                :options="casOption"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否可以办理抵押" prop="applyDischarge">
              <el-select
                v-model="formParams.applyMortgage"
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
            <el-form-item label="是否可以办理解押" prop="applyDischarge">
              <el-select
                v-model="formParams.applyDischarge"
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
                v-model="formParams.licensePlateCode"
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
                v-model="formParams.licensePlateCode"
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
import type { MortgageCityListResponse, EditMortgageCityRequest } from '@/api'
import { MortgageCityAPI } from '@/api'
import type { CascaderProps, CascaderOption } from 'element-plus'
const MortgageCityApi = new MortgageCityAPI()
const dialogTitle: Ref<string> = ref('新增')
const dialogVisible: Ref<boolean> = ref(false)
const formLoading: Ref<boolean> = ref(false)
interface OptionsItem {
  value?: string
  label?: string
  leaf: boolean
}
const casOption = ref<OptionsItem[]>([])
const cascader = ref()
const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const nodes: CascaderOption[] = [] // 动态节点
    const { level } = node
    if (level === 0) {
      const resParent = await MortgageCityApi.getAllProvince()
      if (resParent && resParent?.data) {
        resParent?.data.map((item) => {
          const area = {
            value: item.code,
            label: item.name,
            leaf: level >= 1
          }
          nodes.push(area)
        })
      }
    } else {
      const params = {
        code: node.value as number
      }
      const res = await MortgageCityApi.getProvinceChildren(params)
      if (res && res.data) {
        res?.data.map((item) => {
          const area = {
            value: item.code,
            label: item.name,
            leaf: level >= 1
          }
          nodes.push(area)
        })
      }
    }
    resolve(nodes) // 回调
  }
}

const initOptions = async () => {
  const resParent = await MortgageCityApi.getAllProvince()
  if (resParent && resParent?.data) {
    resParent?.data.map(async (item) => {
      const children: OptionsItem[] = []
      if (item.code === Number(formParams.provinceCode)) {
        const params = {
          code: Number(formParams.provinceCode)
        }
        const res = await MortgageCityApi.getProvinceChildren(params)
        if (res && res.data) {
          res?.data.map((item) => {
            const area = {
              value: String(item.code),
              label: item.name,
              leaf: true
            }
            children.push(area)
          })
        }
      }
      const resArea = {
        value: String(item.code),
        label: item.name,
        children: children,
        leaf: false
      }
      casOption.value.push(resArea)
    })
  }
}
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
const formParams = reactive<EditMortgageCityRequest & { proandcity: string[] }>(
  {
    proandcity: [],
    id: '',
    provinceCode: '',
    provinceName: '',
    cityCode: '',
    cityName: '',
    licensePlateCode: '',
    applyMortgage: 0,
    applyDischarge: 0
  }
)
const formRef = ref<InstanceType<typeof ElForm>>()

const submitForm = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  formParams.provinceCode = formParams.proandcity[0]
  formParams.cityCode = formParams.proandcity[1]
  formParams.provinceName =
    cascader.value.getCheckedNodes()[0].pathLabels[0] || ''
  formParams.cityName = cascader.value.getCheckedNodes()[0].pathLabels[1] || ''
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
const open = async (
  type: string,
  row: MortgageCityListResponse & { proandcity?: string[] | null }
) => {
  dialogTitle.value = type === 'add' ? '新增' : '编辑'
  if (type === 'edit') {
    formParams.id = row.id
    formParams.provinceCode = row.provinceCode
    formParams.provinceName = row.provinceName
    formParams.cityCode = row.cityCode
    formParams.cityName = row.cityName
    formParams.proandcity = row.proandcity || []
    formParams.licensePlateCode = row.licensePlateCode
    formParams.applyMortgage = row.applyMortgage || 0
    formParams.applyDischarge = row.applyDischarge || 0
    await initOptions()
  } else {
    formParams.id = ''
    formParams.provinceCode = ''
    formParams.provinceName = ''
    formParams.cityCode = ''
    formParams.cityName = ''
    formParams.licensePlateCode = ''
    formParams.applyMortgage = 0
    formParams.applyDischarge = 0
    formParams.proandcity = []
  }
  dialogVisible.value = true
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
