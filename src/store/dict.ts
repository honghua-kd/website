import { ref, computed, Ref } from 'vue'
import { defineStore } from 'pinia'

export const useDictStore = defineStore('dict', () => {
  const dictMap: Ref<Record<string, string>[]> = ref([])

  const getDictMap = computed(() => {
    return dictMap.value
  })
  function setDictMap(val: Record<string, string>[]) {
    dictMap.value.splice(0, dictMap.value.length)
    dictMap.value.push(...val)
  }

  return {
    dictMap,
    getDictMap,
    setDictMap
  }
})
