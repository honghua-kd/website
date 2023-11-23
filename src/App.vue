<template>
  <el-config-provider :locale="localLanguage">
    <el-scrollbar height="100vh" ref="scroll">
      <router-view></router-view>
    </el-scrollbar>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { logout } from '@/api'
import { getAllDictType } from '@/api/system'
import { useRouter, useRoute, mitt } from '@toystory/lotso'
import { useDictStore } from '@/store/dict'
import type { ElScrollbar } from 'element-plus'

const localLanguage = ref(zhCn)

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

const { router } = useRouter()
const dictStore = useDictStore()
watch(
  () => router.currentRoute.value,
  () => {
    scrollbarRef.value?.setScrollTop(0)
  }
)

// 监听脚手架广播出来的登出
mitt.on('logout', () => {
  logout()
    .then(() => {
      const route = useRoute()
      const fullPath = route?.value.fullPath
      fullPath && router.push(`/login?redirect=${encodeURIComponent(fullPath)}`)
      // SSO跳转
      // window.location.href = `${import.meta.env.VITE_APP_SSO_URL}?redirect_url=${window.location.href}`
    })
    .catch((err) => {
      console.error(err)
    })
})

// 获取字典信息
const getDictInfo = () => {
  const dictCache = JSON.parse(sessionStorage.getItem('DICTMAP') || 'null')
  if (dictCache) {
    dictStore.setDictMap(dictCache)
    return
  }
  getAllDictType()
    .then((res) => {
      if (res && res.code === 200) {
        sessionStorage.setItem('DICTMAP', JSON.stringify(res.data))
        const dictMap = res.data
        dictStore.setDictMap(dictMap)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const init = () => {
  getDictInfo()
}
init()
</script>

<style lang="scss">
#app {
  font-size: $base-font-size-default;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
