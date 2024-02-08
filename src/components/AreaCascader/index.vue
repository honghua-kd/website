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
import type { CascaderProps, CascaderOption, CascaderValue } from 'element-plus'
const API = new AgencyAPI()
type IProps = {
  value: string[]
  multiple?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  value: () => [],
  multiple: false
})
type StateType = {
  value: string[]
  provinceCode: string
  provinceName: string
  cityCode: string
  cityName: string
}
const state = reactive<StateType>({
  value: [],
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: ''
})
const cascader = ref()
interface OptionsItem {
  value?: string
  label?: string
  leaf: boolean
}
const areaOption = ref<OptionsItem[]>([])
// const initOptions = async () => {
//   const resParent = await API.getAllProvince()
//   if (resParent && resParent?.data) {
//     resParent.data.map(async (item: AllProvinceResponse) => {
//       const children: OptionsItem[] = []
//       if (item.code === Number(state.provinceCode)) {
//         const params = {
//           code: Number(state.provinceCode)
//         }
//         const res = await API.getChildrenArea(params)
//         if (res && res.data) {
//           res.data.map((item: AreaChildrenResponse) => {
//             const area = {
//               value: String(item.code),
//               label: item.name,
//               leaf: true
//             }
//             children.push(area)
//           })
//         }
//       }
//       const resArea = {
//         value: String(item.code),
//         label: item.name,
//         children: children,
//         leaf: false
//       }
//       areaOption.value.push(resArea)
//     })
//   }
// }
onMounted(() => {
  // initOptions()
})
const areaProps: CascaderProps = {
  lazy: true,
  multiple: props.multiple,
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
            leaf: level >= 1
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
            leaf: level >= 1
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
      provinceName,
      cityCode,
      cityName
    }: {
      provinceCode: string
      provinceName: string
      cityCode: string
      cityName: string
    }
  ): void
}>()
watch(
  () => props.value,
  (newValue) => {
    state.value = newValue
    state.provinceCode = newValue[0]
    state.cityCode = newValue[1]
  },
  {
    immediate: true
  }
)
const changeArea = (value: CascaderValue) => {
  if (props.multiple) {
    const provinceCode: string[] = []
    const cityCode: string[] = []
    const valueClone = value as string[][]
    valueClone.forEach((i: string[]) => {
      provinceCode.push(i[0])
      cityCode.push(i[1])
    })
    emit('changeAreaData', {
      provinceCode: [...new Set(provinceCode)].join(','),
      provinceName: '',
      cityCode: [...new Set(cityCode)].join(','),
      cityName: ''
    })
  } else {
    if (state.value) {
      emit('changeAreaData', {
        provinceCode: state.value[0],
        provinceName: cascader.value.getCheckedNodes()[0].pathLabels[0] || '',
        cityCode: state.value[1],
        cityName: cascader.value.getCheckedNodes()[0].pathLabels[1] || ''
      })
    } else {
      emit('changeAreaData', {
        provinceCode: '',
        provinceName: '',
        cityCode: '',
        cityName: ''
      })
    }
  }
}
</script>
