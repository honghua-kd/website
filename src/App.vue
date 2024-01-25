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
import { CoreAPI } from '@/api'
import { useRouter, mitt } from '@toystory/lotso'
import { useNoticeCenter, useDicts } from '@/hooks'
import { DICT_TYPES } from '@/constants'
import type { ElScrollbar } from 'element-plus'

const localLanguage = ref(zhCn)

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

const { router } = useRouter()

// 获取字典
useDicts(DICT_TYPES)

// 启用消息中心
useNoticeCenter()

watch(
  () => router.currentRoute.value,
  () => {
    scrollbarRef.value?.setScrollTop(0)
  }
)

const coreAPI = new CoreAPI()
// 监听脚手架广播出来的登出
mitt.on('logout', () => {
  coreAPI
    .logout()
    .then(() => {
      // SSO跳转
      window.location.href = `${
        import.meta.env.VITE_APP_SSO_URL
      }?redirect_url=${window.location.href}`
    })
    .catch((err) => {
      console.error(err)
    })
})
</script>

<style lang="scss">
#app {
  font-size: $base-font-size-default;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
// .admin-container {
//   .el-menu {
//     /* logo */
//     .sidebar-logo-container {
//       .sidebar-title {
//         color: #000000 !important;
//       }
//       .sidebar-logo {
//         width: 29px;
//         height: 29px;
//       }
//     }
//     .el-menu-item,
//     .el-sub-menu__title {
//       height: 40px;
//       font-size: 14px !important;
//       line-height: 40px;
//       color: #4e5969 !important;
//       .menu-icon {
//         margin-right: 8px;
//         height: 40px !important;
//       }
//       .svg-icon {
//         color: #4e5969 !important;
//       }
//       &:hover {
//         background: #f2f3f5 !important;
//       }
//     }
//     .el-menu-item.is-active {
//       background: #f2f3f5 !important;
//       .title {
//         color: $base-color-primary !important;
//       }
//       .svg-icon {
//         color: $base-color-primary !important;
//       }
//     }
//   }
// }
</style>
