import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDemoStore = defineStore('demo', () => {
  const name = ref('')
  const avatar = ref('')

  const getName = computed(() => {
    return name.value
  })

  function setName (val) {
    name.value = val
  }
  function setAvatar (val) {
    avatar.value = val
  }

  function getInfo (data) {
    setName(data.userName)
    setAvatar(data.avatar)
  }
  return {
    name,
    avatar,
    getName,
    setName,
    setAvatar,
    getInfo
  }
})
