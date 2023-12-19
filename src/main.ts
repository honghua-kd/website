import options from '@/config/setting'
import requestConfig from '@/config/request.config'

// framework
import {
  createFrameApp,
  useRouter,
  usePermission,
  useUserStore,
  useRoutesStore,
  store
} from '@toystory/lotso'
import '@toystory/lotso/dist/style.css'

import { CoreAPI } from '@/api'
import App from './App.vue'
import { setActivePinia } from 'pinia'

// 注册字节跳动图标
import iconPark from './plugin/icon-park'

// svg-icon
import 'virtual:svg-icons-register'

import { ElMessage, ElLoading } from 'element-plus'
// 注册框架，传入项目配置和store，页面路径
const app = createFrameApp(App, {
  options,
  requestConfig,
  constantFile: import.meta.glob('./pages/**/index.vue'),
  constantConfig: import.meta.globEager('./pages/**/config.ts'),
  asyncFile: import.meta.glob('./views/**/index.vue'),
  asyncConfig: import.meta.globEager('./views/**/config.ts')
})
setActivePinia(store)

app.use(ElLoading)
iconPark(app)

app.mount('#app')

// 使用脚手架自带的守卫
const { router } = useRouter()
const API = new CoreAPI()
const { handlePermission } = usePermission({
  // 需要把获取用户信息的方法和获取数据权限的方法传递给Permission hooks
  getUserInfo: async () => {
    const { data, msg, message } = await API.getUserInfo()
    const userStore = useUserStore()
    if (data && Object.prototype.toString.call(data) === '[object Object]') {
      userStore.setUserInfo(data)
      const targetSystemName = options.systemName || 'HTHX'
      userStore.setSystemCode(targetSystemName)
      window.localStorage.setItem('systemCode', targetSystemName)
      if (data.staffName) {
        userStore.handlerUserName(data.staffName)
      }
    } else {
      const errorMsg = msg || message || '系统错误，请稍后重试'
      userStore.resetToken()
      ElMessage.error(errorMsg)
      throw new Error(errorMsg)
    }
  },
  getAuthData: async () => {
    const userStore = useUserStore()
    const routesStore = useRoutesStore()
    const params = {
      systemCode: 'OPERATIONS'
    }
    await API.getAuthData(params)
      .then((response) => {
        userStore.setAuthDataFlag(true)
        if (
          response.data &&
          Object.prototype.toString.call(response.data) === '[object Object]'
        ) {
          const whiteAuthData = options.whiteAuthData || []
          const authData = response.data.data
          const { role } = response.data
          userStore.setRole(role || [])
          const data = [...whiteAuthData, ...authData]
          if (!data || !Array.isArray(data)) {
            console.error('权限数据错误')
          } else {
            userStore.setAuthData(data)
            routesStore.handleRoutes(data)
          }
        } else {
          const errorMsg =
            response.msg || response.message || '系统错误，请稍后重试'
          ElMessage.error(errorMsg)
          router.replace('/error?type=403')
          throw new Error(errorMsg)
        }
      })
      .catch((err) => {
        const status = err?.response?.status
        if (+status === 403) {
          router.replace('/error?type=403')
        } else {
          router.replace('/error?type=500')
        }
        userStore.setAuthDataFlag(true)
        throw new Error(err)
      })
  }
})
router.beforeEach((to, from, next) => {
  handlePermission(to, from, next)
})
