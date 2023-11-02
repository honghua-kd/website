<template>
  <el-config-provider :locale="localLanguage">
    <el-scrollbar height="100vh" ref="scroll">
      <router-view></router-view>
    </el-scrollbar>
  </el-config-provider>
</template>

<script setup>
import { ref, watch } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { logout } from '@/api'
import { useRouter, useRoute, mitt } from '@toystory/lotso'

const localLanguage = ref(zhCn)

const scroll = ref(null)

const { router } = useRouter()

watch(
  () => router.currentRoute.value,
  () => {
    scroll.value.setScrollTop(0)
  }
)

// 监听脚手架广播出来的登出
mitt.on('logout', () => {
  logout().then(() => {
    const route = useRoute()
    const { fullPath } = route.value
    router.push(`/login?redirect=${encodeURIComponent(fullPath)}`)
    // SSO跳转
    // window.location.href = `${import.meta.env.VITE_APP_SSO_URL}?redirect_url=${window.location.href}`
  }).catch(err => {
    console.error(err)
  })
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: $base-font-size-default;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
