import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'

const prefix = import.meta.env.VITE_APP_SERVICE_API

// 获取用户信息
export function getUserInfo (params) {
  const request = useRequest(requestConfig)
  return request({
    url: `${prefix}/user/v1/getInfo`,
    method: 'get',
    params
  })
}

// 获取权限数据
export function getAuthData (params) {
  const request = useRequest(requestConfig)
  return request({
    url: `${prefix}/user/v1/getPermission`,
    method: 'get',
    params
  })
}

// 登出
export function logout () {
  const request = useRequest(requestConfig)
  return request({
    url: `${prefix}/logout`,
    method: 'post'
  })
}
