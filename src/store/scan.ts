import { ref, computed, Ref } from 'vue'
import { defineStore } from 'pinia'
import type { DictList } from '@/api'

export const useScanStore = defineStore('scan', () => {
  const scanDictObj: Ref<DictList> = ref({
    ARCHIVE_STATUS: [],
    OCR_STATUS: [],
    EXPRESS_COMPANY: [],
    EXPRESS_TYPE: [],
    EXPRESS_CONTENT: [],
    EXPRESS_STATUS: []
  })

  const getScanDict = computed(() => {
    return scanDictObj.value
  })

  function setScanDict(val: DictList) {
    scanDictObj.value = val
  }

  return {
    scanDictObj,
    setScanDict,
    getScanDict
  }
})
