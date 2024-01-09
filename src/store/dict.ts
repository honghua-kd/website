import { ref, computed, Ref } from 'vue'
import { defineStore } from 'pinia'
import type { DictTypeAllItem, DictList } from '@/api'

export const useDictStore = defineStore('dict', () => {
  const dictMap: Ref<DictTypeAllItem[]> = ref([])
  const dicts: Ref<DictList> = ref({})

  const getDictMap = computed(() => {
    return dictMap.value
  })

  function setDictMap(val: DictTypeAllItem[]) {
    dictMap.value.splice(0, dictMap.value.length)
    dictMap.value.push(...val)
  }

  function setDicts(data: DictList) {
    dicts.value = Object.assign({}, dicts.value, data)
  }

  return {
    dictMap,
    dicts,
    getDictMap,
    setDictMap,
    setDicts
  }
})
