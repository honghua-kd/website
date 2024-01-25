import { useDictStore } from '@/store/dict'
import { useDicts } from './useDicts'
import { computed } from 'vue'

export const useOptions = async (dictName: string) => {
  const dictStore = useDictStore()
  const dictsData = computed(() => dictStore.dicts)
  if (Object.keys(dictsData.value).includes(dictName)) {
    return dictsData.value[dictName]
  }
  await useDicts([dictName])
  return dictsData.value[dictName] || []
}
