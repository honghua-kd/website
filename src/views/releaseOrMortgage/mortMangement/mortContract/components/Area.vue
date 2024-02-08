<template>
  <el-cascader
    ref="cascader"
    style="width: 100%"
    v-model="state.value"
    placeholder="请选择"
    :props="areaProps"
    :options="areaOption"
    clearable
    @change="changeArea"
  />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { AgencyAPI } from '@/api'
import type {
  AllProvinceResponse,
  AreaChildrenResponse
} from '@/api/channel/types/response.ts'
import type { CascaderProps, CascaderOption } from 'element-plus'
const API = new AgencyAPI()
const props = defineProps({
  value: {
    type: Array<string>,
    default: () => {}
  },
  level: {
    type: Number,
    default: 1
  }
})
type StateType = {
  value: string[]
  provinceCode: string
  cityCode: string
  areaCode: string
}
const state = reactive<StateType>({
  value: [],
  provinceCode: '',
  cityCode: '',
  areaCode: ''
})
const cascader = ref()
interface OptionsItem {
  value?: string
  label?: string
  leaf: boolean
}
const areaOption = ref<OptionsItem[]>([])
onMounted(() => {
  // console.error(111)
})
const areaProps: CascaderProps = {
  lazy: true,
  multiple: false,
  async lazyLoad(node, resolve) {
    const nodes: CascaderOption[] = [] // 动态节点
    const { level } = node
    if (level === 0) {
      const resParent = await API.getAllProvince()
      if (resParent && resParent?.data) {
        resParent.data.map((item: AllProvinceResponse) => {
          const area = {
            value: String(item.code),
            label: item.name,
            leaf: level >= props.level
          }
          nodes.push(area)
        })
      }
    } else {
      const params = {
        code: node.value as number
      }
      const res = await API.getChildrenArea(params)
      if (res && res.data) {
        res.data.map((item: AreaChildrenResponse) => {
          const area = {
            value: String(item.code),
            label: item.name,
            leaf: level >= props.level
          }
          nodes.push(area)
        })
      }
    }
    resolve(nodes) // 回调
  }
}
const emit = defineEmits<{
  (
    e: 'changeAreaData',
    {
      provinceCode,
      cityCode,
      areaCode
    }: {
      provinceCode: string
      cityCode: string
      areaCode: string
    }
  ): void
}>()
watch(
  () => props.value,
  (newValue) => {
    state.value = newValue
    if (newValue) {
      state.provinceCode = newValue[0]
      state.cityCode = newValue[1]
      state.areaCode = newValue[2] ? newValue[2] : ''
    }
  },
  {
    immediate: true
  }
)
const changeArea = () => {
  if (state.value) {
    emit('changeAreaData', {
      provinceCode: state.value[0],
      cityCode: state.value[1],
      areaCode: state.value[2]
    })
  } else {
    emit('changeAreaData', {
      provinceCode: '',
      cityCode: '',
      areaCode: ''
    })
  }
}
</script>
