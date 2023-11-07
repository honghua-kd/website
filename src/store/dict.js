import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDictStore = defineStore('dict', () => {
  const dictMap = ref(null)

  const getDictMap = computed(() => {
    return dictMap.value
  })
  function setDictMap (val) {
    dictMap.value = val
  }

  return {
    dictMap,
    getDictMap,
    setDictMap
  }
})
