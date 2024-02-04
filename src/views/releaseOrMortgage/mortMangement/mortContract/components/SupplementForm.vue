<template>
  <div>
    <el-dialog
      v-model="alertVisible"
      :title="title"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="40%"
      top="10vh"
    >
      <el-row style="margin-bottom: 10px">
        <el-col class="text-red">
          如需委托业务运营部办理抵押，必须补充，车牌号，预估上牌城市，抵押办理联系人。
        </el-col>
        <el-col class="text-red"
          >如需申请抵押材料，必须补充预估上牌城市，材料去向。</el-col
        >
      </el-row>
      <el-form
        ref="feebackFormRef"
        :model="formParams"
        :label-width="px2rem('130px')"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="抵押主体" prop="">
              <el-select
                v-model="a"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in mortSubjectOpts"
                  :key="String(item.value)"
                  :label="String(item.label)"
                  :value="String(item.value)"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="9">
            <el-form-item label="车牌号" prop="">
              <el-select
                v-model="a"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in dictStore.dicts.MORTGAGE_CITYCONFIG"
                  :key="String(item.value)"
                  :label="String(item.label)"
                  :value="String(item.value)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="" prop="" label-width="0px">
              <el-select
                v-model="a"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in dictStore.dicts.MORTGAGE_CITYCONFIG_NO"
                  :key="String(item.value)"
                  :label="String(item.label)"
                  :value="String(item.value)"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="" prop="" label-width="0px">
              <el-input style="width: 100%" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="预估上牌城市" prop="">
              <Area
                :value="formParams.plateCity"
                :level="1"
                @changeAreaData="changeArea"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="抵解押办理联系人" prop="">
              <el-input style="width: 100%" placeholder="请输入联系人姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="" prop="" label-width="0px">
              <el-input style="width: 100%" placeholder="请输入联系人电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="材料去向" prop="direction">
              <el-select
                v-model="formParams.direction"
                clearable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in directionOpts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="formParams.direction === 'a'">
          <el-row>
            <el-col :span="24">
              <el-form-item label="材料寄送地址" prop="">
                <Area
                  :value="formParams.sendAdderss"
                  :level="2"
                  @changeAreaData="changeAddress"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="" prop="">
                <el-input style="width: 100%" placeholder="请输入详细地址" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人" prop="">
                <el-input style="width: 100%" placeholder="请输入联系人" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="">
                <el-input style="width: 100%" placeholder="请输入联系电话" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-if="formParams.direction === 'c'">
          <el-row :gutter="5">
            <el-col :span="10">
              <el-form-item label="移交至" prop="direction">
                <el-select
                  v-model="formParams.direction"
                  clearable
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in directionOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="" prop="direction" label-width="0px">
                <el-select
                  v-model="formParams.direction"
                  clearable
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in directionOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="" prop="direction" label-width="0px">
                <el-select
                  v-model="formParams.direction"
                  clearable
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in directionOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <template #footer>
        <el-button @click="alertVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="submit"> 确认 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref, computed, nextTick } from 'vue'
import type {
  SupplierDetailResponse,
  SupplierListResponse,
  DictDataTreeResponse
} from '@/api'
import { CommonAPI } from '@/api'
const CommonApi = new CommonAPI()
import { useDictStore } from '@/store/dict'
import { px2rem, handleDownloadFile } from '@/utils'
import Area from './Area.vue'
const alertVisible = ref(false)
const title = ref<string>('补充信息')
const formParams = reactive({
  direction: 'a',
  plateCity: ['150000', '150100'],
  sendAdderss: ['150000', '150200', '150202']
})
const directionOpts = ref([
  {
    label: '移交客户',
    value: 'a'
  },
  {
    label: '移交运营',
    value: 'b'
  },
  {
    label: '移交其他',
    value: 'c'
  }
])
type AreaInterface = {
  provinceCode: string
  cityCode: string
  areaCode: string
}
const changeArea = (val: AreaInterface) => {
  formParams.plateCity = [val.provinceCode, val.cityCode]
}
const changeAddress = (val: AreaInterface) => {
  formParams.sendAdderss = [val.provinceCode, val.cityCode, val.areaCode]
}
const mortSubjectOpts = ref<DictDataTreeResponse[]>([])
const getDicts = () => {
  const params = {
    dictType: 'SOURCE_SYSTEM'
  }
  CommonApi.getDictTreeList(params)
    .then((res) => {
      if (res && res.code === 200) {
        mortSubjectOpts.value = res.data?.map((item) => {
          return {
            label: item.label,
            value: item.value
          }
        }) as DictDataTreeResponse[]
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const dictStore = useDictStore()
const open = (id: string) => {
  alertVisible.value = true
  getDicts()
  // id请求
}
defineExpose({ open })
</script>
<style lang="scss" scoped>
.text-al {
  margin-bottom: 10px;
  font-size: $base-font-size-big;
  text-align: center;
}
.text-red {
  margin-bottom: 5px;
  font-size: $base-font-size-small;
  color: $base-color-red;
}
:deep(.el-dialog__body) {
  padding-top: 5px;
}
</style>
