# operations-management-web系统
基于Vue3.0，使用Element Plus框架，Vite构建

## 安装
```bash
yarn add @toystory/lotso -S
# OR
npm i @toystory/lotso -S
```

## 使用

### 一、注册
在main.js中引入，示例如下：
```js
import options from '@/config/setting'
import requestConfig from '@/config/request.config'

import { createFrameApp, useRouter, usePermission, useUserStore, useRoutesStore } from '@toystory/lotso'
import '@toystory/lotso/dist/style.css'

import { getUserInfo, getAuthData } from '@/api'
import App from './App.vue'


// 注册框架，传入项目配置和store，页面路径
const app = createFrameApp(App, {
  options,
  requestConfig,
  constantFile: import.meta.glob('./pages/**/index.vue'),
  constantConfig: import.meta.globEager('./pages/**/config.js'),
  // 若配置接管权限路由，无需引入asyncFile
  asyncFile: import.meta.glob('./views/**/index.vue'),
  asyncConfig: import.meta.globEager('./views/**/config.js')
})

app.mount('#app')

// 使用脚手架自带的守卫
const { router } = useRouter()
const { handlePermission } = usePermission({
  // 需要把获取用户信息的方法和获取数据权限的方法传递给Permission hooks
  getUserInfo: async () => {
    // ...
  },
  getAuthData: async () => {
    // ...
  }
})
router.beforeEach((to, from, next) => {
  handlePermission(to, from, next)
})
```

### 二、配置文件参考

1. setting.js

```js
export default {
  // 是否显示顶部进度条
  progressBar: true,
  // 菜单栏默认打开路由
  defaultOpeneds: [],
  // vertical布局时是否只保持一个子菜单的展开
  uniqueOpened: false,
  // token名称
  tokenName: 'accessToken',
  // 是否跳过登录
  skipLogin: true,
  // default language
  lang: 'zh-cn',
  // 标题
  title: '海通恒信后台管理系统',
  // 系统名称
  systemName: 'HTHX-ADMIN',
  // 版权信息
  copyrightZh: '版权所有 © 海通恒信国际融资租赁股份有限公司 未经许可不得复制、转载或摘编，违者必究！',
  copyrightEn: 'Copyright © Haitong Unitrust International Leasing CO.,LTD.All Rights Reserved',
  // 默认主题颜色
  themeColor: '#005BAC',
  // 默认左侧菜单背景颜色
  leftMenuBgColor: '#0d153c',
  // 默认顶部菜单背景颜色
  topMenuBgColor: '#ffffff',
  // 默认左侧菜单文字颜色
  leftMenuTextColor: '#FFF',
  // 默认顶部菜单文字颜色
  topMenuTextColor: '#333',
  // 是否显示用户名
  showName: false,
  // 头部工具栏布局
  showHeaderBar: false,
  // 是否显示页面底部自定义版权信息
  footerCopyright: true,
  // token失效回退到登录页时是否记录本次的路由
  recordRoute: true,
  // 是否显示全屏
  fullScreen: true,
  // 是否显示刷新
  refresh: true,
  // 是否显示通知
  notice: true,
  // 是否显示面包导航
  isBreadcrumb: true,
  // 是否显示logo
  isLogo: true,
  // logo图片 相对于public/static/image的路径
  logo: 'logo.png',
  // 菜单栏logo
  sideLogo: 'side-logo.png',
  // 是否显示标签
  tag: true,
  // 是否展开菜单
  collapse: false,
  // 路由白名单不经过token校验的路由
  routesWhiteList: ['/login', '/register', '/404', '/401'],
  // 权限信息白名单
  whiteAuthData: [
    {
      children: [
        {
          children: [],
          elements: [],
          menuType: 3,
          sort: 0,
          menu: 'homeIndex'
        }
      ],
      elements: [],
      menuType: 3,
      sort: 0,
      menu: 'home'
    }
  ],
  // 默认首页页面
  defaultPath: '/home',
  // 默认添加进路由表中的路由
  defaultRoutes: [],
  // 是否使用hash模式
  useHash: false,
  // base路径
  baseURL: '',
  // 登录页面路径，默认为'/login'，可配置SSO路径，建议用环境变量
  loginPath: import.meta.env.VITE_APP_SSO_URL
}
```
2. request.config.js

```js
export default {
  // axios 基础url地址
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 网关请求地址前缀:
  gatewayPrefix: import.meta.env.VITE_APP_GATEWAY,
  // 为开发服务器配置 CORS。默认启用并允许任何源，传递一个 选项对象 来调整行为或设为 false 表示禁用
  cors: true,
  // 根据后端定义配置
  contentType: 'application/json;charset=UTF-8',
  // 消息框消失时间
  messageDuration: 3000,
  // 最长请求时间
  requestTimeout: 60000,
  // 请求拦截自定义函数，接收config参数
  handleRequest: config => {
    // do something ...
  },
  // 返回成功拦截自定义函数，接收response参数
  handleResSuccess: undefined,
  // 返回成功拦截自定义函数，接收response error参数
  handleResError: undefined
}
```
3. compile.config.js

```js
export default {
  // 项目部署的基础路径
  base: '/',
  // 静态资源服务的文件夹 类型 string | false
  publicDir: 'public',
  // 存储缓存文件的目录
  cacheDir: 'node_modules/.vite',
  // 输出路径
  outDir: 'dist',
  // 为开发服务器配置 CORS。默认启用并允许任何源，传递一个 选项对象 来调整行为或设为 false 表示禁用
  cors: true,
  // 生成静态资源的存放路径
  assetsDir: 'static/',
  // 构建后是否生成 source map 文件
  sourcemap: process.env.NODE_ENV !== 'production',
  // chunk 大小警告的限制
  chunkSizeWarningLimit: 2000,
  // 启用/禁用 CSS 代码拆分
  // 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
  cssCodeSplit: true,
  // 启用/禁用 brotli 压缩大小报告
  brotliSize: false,
  // 指定服务器应该监听哪个 IP 地址
  host: '0.0.0.0',
  // 指定开发服务器端口
  port: '8899',
  // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
  strictPort: false,
  // 服务器启动时自动在浏览器中打开应用程序 此值为字符串时，会被用作 URL 的路径名
  open: true,
  // 调整控制台输出的级别 'info' | 'warn' | 'error' | 'silent'
  logLevel: 'info',
  // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
  clearScreen: false,
  // 是否删除生产环境console
  dropConsole: process.env.NODE_ENV === 'production',
  // 是否删除生产环境debugger
  dropDebugger: process.env.NODE_ENV === 'production',
  // 代理后端地址
  proxy: {
    // 正则表达式写法
    '^/api/.*': {
      target: 'http://10.102.2.222:19005',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  },
  // 是否使用mock数据
  useMock: true
}

```



## API

### `createFrameApp()`

框架初始化注册函数，创建一个应用实例

```js
createFrameApp(rootComponent: Component, options: object): App
```

有两个必传参数，其中第一个参数是根组件。第二个参数是要传递给框架的配置参数。

示例：

```js
import options from '@/config/setting' // 配置文件，请参考上方说明
import requestConfig from '@/config/request.config' // 配置文件，请参考上方说明

import { createFrameApp } from '@toystory/lotso'
import '@toystory/lotso/dist/style.css'
import App from './App.vue'

// 注册框架，传入项目配置和store，页面路径
const app = createFrameApp(App, {
  options,
  requestConfig,
  constantFile: import.meta.glob('./pages/**/index.vue'),
  constantConfig: import.meta.globEager('./pages/**/config.js'),
  // 若配置接管权限路由，无需引入asyncFile
  asyncFile: import.meta.glob('./views/**/index.vue'),
  asyncConfig: import.meta.globEager('./views/**/config.js')
})
app.mount('#app')
```



### `useRouter()`

脚手架已接管路由管理，可用此方法访问路由，类似于`VueRouter`提供的`useRouter`方法

**返回对象包含四个值：**

1. `constantRoutes`

不参与权限校验管理生成的路由集合，即初始化时通过`constantFile`与`constantConfig`传入的文件

2. `asyncRoutes`

参与权限校验管理的路由集合，即初始化时通过`asyncFile`与`asyncConfig`传入的文件

3. `router`

`VueRouter`提供的原生 router 对象

4. `resetRouter()`

重置Router方法



### `useRoute()`

可用此方法返回当前路由对象

示例：

```js
import { useRouter, useRoute } from '@toystory/lotso'

const { constantRoutes, asyncRoutes, router, resetRouter } = useRouter()
const route = useRoute()

function pushWithQuery(query) {
    router.push({
      name: 'search',
      query: {
        ...route.query,
        ...query,
      },
    })
}
```



### `usePermission()`

权限管理的钩子函数，必传对象参数`getUserInfo`与`getAuthData`，分别为获取用户信息方法与获取权限数据方法，返回值必须分别为用户信息数据与权限数据，建议两个方法内为调用获取用户信息接口与调用权限数据接口

返回值为权限处理导航守卫方法，使用方式参考如下

示例：

```js
import { useRouter, usePermission } from '@toystory/lotso'
import { getUserInfo, getAuthData } from '@/api'
import { ElMessage } from 'element-plus'

// 使用脚手架自带的守卫
const { router } = useRouter()
const { handlePermission } = usePermission({
  // 需要把获取用户信息的方法和获取数据权限的方法传递给Permission hooks
  getUserInfo: async () => {
    const { data, msg, message } = await getUserInfo()
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
    await getAuthData().then(response => {
      userStore.setAuthDataFlag(true)
      if (response.data && Object.prototype.toString.call(response.data) === '[object Object]') {
        const whiteAuthData = options.whiteAuthData
        const authData = response.data.data
        const { role } = response.data
        userStore.setRole(role || [])
        const data = [
          ...whiteAuthData,
          ...authData
        ]
        if (!data || !Array.isArray(data)) {
          console.error('权限数据错误')
        } else {
          userStore.setAuthData(data)
          routesStore.handleRoutes(data)
        }
      } else {
        const errorMsg = response.msg || response.message || '系统错误，请稍后重试'
        ElMessage.error(errorMsg)
        throw new Error(errorMsg)
      }
    }).catch(err => {
      userStore.setAuthDataFlag(true)
      throw new Error(err)
    })
  }
})
router.beforeEach((to, from, next) => {
  handlePermission(to, from, next)
})

```

### `useRequest()`

脚手架中包装好的请求拦截器钩子函数，一般在包装api请求方法中使用

示例：

```js
import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'

const request = useRequest(requestConfig)

export function createPoint(data) {
  return request({
    url: '/point/create'p
    method: 'post',
    data
  })
}
```

### `setConfig()`

修改传入脚手架中的配置项

```
setConfig(options: object)
```



### `getConfig()`

获取脚手架中的某个配置项

示例：

```js
const copyrightZh = getConfig('copyrightZh')
```



### `setupStore()`

脚手架封装的注册pinia实例的方法，已默认在脚手架中注册，正常情况无需重复注册



### `useUserStore()`

调用该钩子函数可以使用脚手架内部注册的pinia模块：userStore，pinia使用方法可参考官方文档

- state

  | key          | 类型    | 描述                 |
  | ------------ | ------- | -------------------- |
  | token        | string  | 登录秘钥             |
  | username     | string  | 用户名               |
  | userInfo     | object  | 用户信息             |
  | avatar       | string  | 头像                 |
  | authDataFlag | boolean | 是否拉取权限数据标识 |
  | isChangeUser | boolean | 是否更换用户标识     |
  | systemCode   | string  | 系统编码             |
  | authData     | Array   | 权限数据             |
  | role         | object  | 角色信息             |

- getters

  | 方法                | 返回值  | 描述                 |
  | ------------------- | ------- | -------------------- |
  | `getToken()`        | string  | 获取登录秘钥         |
  | `getUsername()`     | string  | 获取用户名           |
  | `getAvatar()`       | string  | 获取头像             |
  | `getUserInfo()`     | object  | 获取用户信息         |
  | `getAuthDataFlag()` | boolean | 获取拉取权限数据标识 |
  | `getIsChangeUser()` | boolean | 获取更换用户标识     |
  | `getSystemCode()`   | string  | 获取系统编码         |
  | `getAuthData()`     | Array   | 获取权限数据         |

- actions

  | 方法                        | 入参类型 | 描述                         |
  | --------------------------- | -------- | ---------------------------- |
  | `setToken(val)`             | string   | 存储登录秘钥                 |
  | `setUsername(val)`          | string   | 存储用户名                   |
  | `setAvatar(val)`            | string   | 存储头像                     |
  | `setSystemCode(val)`        | string   | 存储系统编码                 |
  | `setAuthDataFlag(flag)`     | boolean  | 设置拉取权限数据标识         |
  | `setIsChangeUser(flag)`     | boolean  | 设置更换用户标识             |
  | `setUserInfo(data)`         | object   | 存储用户信息                 |
  | `setAuthData(data)`         | Array    | 存储权限数据                 |
  | `setRole(data)`             | object   | 存储角色信息                 |
  | `handlerUserName(userName)` | string   | 处理用户名来判断用户是否变更 |
  | `resetInfo()`               | \        | 清除用户信息                 |
  | `resetToken()`              | \        | 清除登录信息                 |



### `useTabsBarStore()`

- state

  | key           | 类型    | 描述            |
  | ------------- | ------- | --------------- |
  | visitedRoutes | Array   | tabs的路由列表  |
  | isTabsShow    | boolean | 是否显示tabsBar |

- getters

  | 方法                 | 返回值  | 描述                |
  | -------------------- | ------- | ------------------- |
  | `getVisitedRoutes()` | Array   | 获取tabs的路由列表  |
  | `getIsTabsShow()`    | boolean | 获取是否显示tabsBar |

- actions

  | 方法                        | 入参类型  | 描述                  |
  | --------------------------- | --------- | --------------------- |
  | `addVisitedRoute(route)`    | route对象 | 存储登录秘钥          |
  | `toggleTabsShow()`          | \         | 显示/隐藏tabsBar      |
  | `delRoute(route)`           | route对象 | 删除tab               |
  | `delOthersRoutes(route)`    | route对象 | 删除除此以外的所有tab |
  | `delLeftRoutes(route)`      | route对象 | 删除左边的所有tab     |
  | `delRightRoutes(route)`     | route对象 | 删除右边的所有tab     |
  | `delAllRoutes()`            | \         | 删除所有tab           |
  | `updateVisitedRoute(route)` | route对象 | 更新tab信息           |



### `useRoutesStore()`

- state

  | key            | 类型  | 描述             |
  | -------------- | ----- | ---------------- |
  | routes         | Array | 所有路由         |
  | asyncRoutes    | Array | 已注册的动态路由 |
  | topMenuRoutes  | Array | 顶部菜单路由     |
  | leftMenuRoutes | Array | 左边菜单路由     |

- getters

  | 方法                  | 返回值 | 描述                 |
  | --------------------- | ------ | -------------------- |
  | `getRoutes()`         | Array  | 获取所有路由         |
  | `getAsyncRoutes()`    | Array  | 获取已注册的动态路由 |
  | `getTopMenuRoutes()`  | Array  | 获取顶部菜单路由     |
  | `getLeftMenuRoutes()` | Array  | 获取左边菜单路由     |

- actions

  | 方法                     | 入参类型 | 描述                 |
  | ------------------------ | -------- | -------------------- |
  | `handleRoutes(authData)` | 权限数据 | 根据权限数据注册路由 |
  | `setAllRoutes()`         | \        | 注册所有路由         |



### `useNoticeStore()`

- state

  | key            | 类型     | 描述         |
  | -------------- | -------- | ------------ |
  | noticeList     | Array    | 通知列表     |
  | messageList    | Array    | 消息列表     |
  | mailList       | Array    | 邮件列表     |
  | noticeCallback | Function | 通知回调函数 |
  | badge          | String   | 通知栏角标   |

- getters

  | 方法               | 返回值 | 描述         |
  | ------------------ | ------ | ------------ |
  | `getNoticeList()`  | Array  | 获取通知列表 |
  | `getMessageList()` | Array  | 获取消息列表 |
  | `getMailList()`    | Array  | 获取邮件列表 |

- actions

  | 方法                       | 入参类型 | 描述                 |
  | -------------------------- | -------- | -------------------- |
  | `setNoticeList(data)`      | Array    | 设置通知列表         |
  | `setMessageList(data)`     | Array    | 设置消息列表         |
  | `setMailList(data)`        | Array    | 设置邮件列表         |
  | `setNoticeCallback(cb)`    | Function | 设置通知点击回调函数 |
  | `emitNoticeCallback(item)` | Object   | 执行通知点击回调函数 |
  | `setBadge(data)`           | String   | 设置通知栏角标       |



### `useSettingStore()`

> 该store内的数据与方法主要为脚手架内部调用状态使用，请谨慎调用！



### `mitt`

脚手架封装的mitt对象，用于监听脚手架广播出来的事件或自定义广播

包含`on`（监听），`off`（取消监听），`emit`（广播）三个方法

示例：

```js
import { mitt } from '@toystory/lotso'

mitt.on('logout', () => {
  // ...
})
```



### `vpermission`

脚手架封装的指令方法，已默认在脚手架中注册，正常情况无需重复注册。

传入disabled参数可使无权限的按钮等禁用，避免被移除。

```vue
<el-button v-permission="'default'">Default</el-button>
<el-button v-permission:disabled="'default'" type="info">Info</el-button>
```



### `store`

pinia实例，脚手架内部注册完成后的暴露出来的pinia实例



### `layout`

layout组件vue全局注册对象，已默认在脚手架中注册，正常情况无需重复注册



### `Layout`

`Layout` vue组件模块，即包含菜单与工具栏的框架



### `ParentView`

`ParentView` vue组件模块，即不包含菜单的框架
