/**
 * @description 配置axios请求基础信息
 */
import { getToken } from '@/utils/auth'
import type { RequestConfig } from '@toystory/lotso'
import { ElMessageBox, ElMessage } from 'element-plus'
import { CoreAPI } from '@/api/core'

const requestConfig: RequestConfig = {
  // axios 基础url地址
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 为开发服务器配置 CORS。默认启用并允许任何源，传递一个 选项对象 来调整行为或设为 false 表示禁用
  cors: true,
  // 根据后端定义配置
  contentType: 'application/json;charset=UTF-8',
  // 消息框消失时间
  messageDuration: 3000,
  // 最长请求时间
  requestTimeout: 60000,
  // 请求拦截自定义函数，接收config参数
  handleRequest: (config) => {
    if (!config) return
    // 是否需要设置 token
    const needToken = (config.headers || {}).isToken !== false
    // 这里是在本系统内进行的添加
    if (getToken() && needToken) {
      config.headers.Authorization = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers.token = getToken()
    }
    // 这里是为提供外链的比如OA的内嵌iframe提供的，开发过程中发现cookie等在外链iframe中表现有bug，故采用lostorage,后期可优化
    if (!getToken() && window.localStorage.getItem('tokenOutlinkOA')) {
      const token = window.localStorage.getItem('tokenOutlinkOA')
      config.headers.Authorization = 'Bearer ' + token // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers.token = token
    }
  },
  // 返回成功拦截自定义函数，接收response参数
  // handleResSuccess: undefined,
  handleResSuccess: (response) => {
    const API = new CoreAPI()
    const code = response.data?.code
    const msg = response.data?.msg
    if (code === undefined) {
      // 文件流
      return Promise.resolve(response)
    } else if (+code === 200 || +code === 0) {
      return Promise.resolve(response.data)
    } else if (+code === 401) {
      ElMessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        API.logout()
          .then((res) => {
            console.log(res)
            window.location.href = '/'
          })
          .catch((err: Error) => {
            throw err
          })
      })
    } else {
      ElMessage({
        type: 'error',
        message: msg,
        duration: 1500
      })
      return Promise.reject(msg)
    }
  },
  // 返回成功拦截自定义函数，接收response error参数
  handleResError: undefined
}
export default requestConfig
