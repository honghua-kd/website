<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center
      width="40%"
    >
      <el-form
        ref="formRef"
        :model="formParams"
        v-loading="formLoading"
        :label-width="px2rem('140px')"
      >
        <el-row>
          <el-col :span="20">
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
          <el-col :span="20">
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="车牌代码"
                  prop="carProvince"
                  :rules="[
                    { required: true, message: '不能为空', trigger: 'change' }
                  ]"
                >
                  <el-select
                    v-model="formParams.carProvince"
                    clearable
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in carProOpts"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  prop="carCode"
                  label-width="5px"
                  :rules="[
                    { required: true, message: '不能为空', trigger: 'change' }
                  ]"
                >
                  <el-select
                    v-model="formParams.carCode"
                    clearable
                    style="width: 100%"
                    multiple
                  >
                    <el-option
                      v-for="item in carNoOpts"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="是否可以办理抵押" prop="mortgageName">
              <el-select
                v-model="formParams.mortgageName"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in mortgageOpts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="是否可以办理解押" prop="dischargeName">
              <el-select
                v-model="formParams.dischargeName"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in releaseOpts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
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
import { ElForm, ElMessage } from 'element-plus'
import { px2rem } from '@/utils'
import type {
  MortgageCityListResponse,
  EditMortgageCityRequest,
  DictItem
} from '@/api'
import { useDictStore } from '@/store/dict'
import { CommonAPI, MortgageCityAPI } from '@/api'
import type { CascaderProps, CascaderOption } from 'element-plus'
const MortgageCityApi = new MortgageCityAPI()
const CommonApi = new CommonAPI()
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
      const resParent = await CommonApi.getAllProvince()
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
      const res = await CommonApi.getProvinceChildren(params)
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
  casOption.value = []
  const resParent = await CommonApi.getAllProvince()
  if (resParent && resParent?.data) {
    resParent?.data.map(async (item) => {
      const children: OptionsItem[] = []
      if (item.code === Number(formParams.provinceCode)) {
        const params = {
          code: Number(formParams.provinceCode)
        }
        const res = await CommonApi.getProvinceChildren(params)
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
interface ExtendParams {
  proandcity: string[]
  carCode: string[]
  carProvince?: string
  mortgageName: string
  dischargeName: string
}
const formParams = reactive<EditMortgageCityRequest & ExtendParams>({
  proandcity: [],
  id: '',
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  licensePlateCode: '',
  applyMortgage: 0,
  applyDischarge: 0,
  carProvince: '',
  carCode: [],
  mortgageName: '',
  dischargeName: ''
})
const formRef = ref<InstanceType<typeof ElForm>>()

const emit = defineEmits(['success'])
const submitForm = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  formParams.provinceCode = formParams.proandcity[0]
  formParams.cityCode = formParams.proandcity[1]
  formParams.provinceName =
    cascader.value.getCheckedNodes()[0].pathLabels[0] || ''
  formParams.cityName = cascader.value.getCheckedNodes()[0].pathLabels[1] || ''
  let codesArray = JSON.parse(JSON.stringify(formParams.carCode))
  if (formParams.carProvince) {
    codesArray = formParams.carCode.map(
      (item: string) => formParams.carProvince + item
    )
    formParams.licensePlateCode = codesArray.join(',')
  }
  const params = {
    id: formParams.id,
    provinceCode: formParams.provinceCode,
    provinceName: formParams.provinceName,
    cityCode: formParams.cityCode,
    cityName: formParams.cityName,
    licensePlateCode: formParams.licensePlateCode,
    applyMortgage: formParams.mortgageName === '是' ? 1 : 0,
    applyDischarge: formParams.dischargeName === '是' ? 1 : 0
  }
  if (dialogTitle.value === '新增') {
    MortgageCityApi.addMortgageCity(params)
      .then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '新增成功'
          })
          dialogVisible.value = false
          emit('success')
        }
      })
      .catch((err: Error) => {
        throw err
      })
  } else {
    MortgageCityApi.editMortgageCity(params)
      .then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '修改成功'
          })
          dialogVisible.value = false
          emit('success')
        }
      })
      .catch((err: Error) => {
        throw err
      })
  }
}
// 批量获取数据字典
const carProOpts: Ref<DictItem[]> = ref([])
const carNoOpts: Ref<DictItem[]> = ref([])
const mortgageOpts: Ref<DictItem[]> = ref([])
const releaseOpts: Ref<DictItem[]> = ref([])
const dictStore = useDictStore()
const getDicts = () => {
  carProOpts.value = dictStore.dicts.MORTGAGE_CITYCONFIG
  carNoOpts.value = dictStore.dicts.MORTGAGE_CITYCONFIG_NO
  mortgageOpts.value = dictStore.dicts.YESNO
  releaseOpts.value = dictStore.dicts.YESNO
}
const open = async (
  type: string,
  row: MortgageCityListResponse & { proandcity?: string[] | null }
) => {
  dialogTitle.value = type === 'add' ? '新增' : '编辑'
  getDicts()
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
    formParams.carProvince = formParams.licensePlateCode!.split(',')[0][0]
    formParams.carCode = []
    formParams.licensePlateCode!.split(',').forEach((item: string) => {
      formParams.carCode.push(item[1])
    })
    formParams.mortgageName = formParams.applyMortgage === 0 ? '否' : '是'
    formParams.dischargeName = formParams.applyDischarge === 0 ? '否' : '是'
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
    formParams.carProvince = ''
    formParams.carCode = []
    formParams.mortgageName = ''
    formParams.dischargeName = ''
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
