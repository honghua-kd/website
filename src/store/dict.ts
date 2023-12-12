import { ref, computed, Ref } from 'vue'
import { defineStore } from 'pinia'
import type { DictTypeAllItem } from '@/api'

export const useDictStore = defineStore('dict', () => {
  const dictMap: Ref<DictTypeAllItem[]> = ref([])

  const getDictMap = computed(() => {
    return dictMap.value
  })

  function setDictMap(val: DictTypeAllItem[]) {
    dictMap.value.splice(0, dictMap.value.length)
    dictMap.value.push(...val)
  }

  return {
    dictMap,
    getDictMap,
    setDictMap
  }
})
