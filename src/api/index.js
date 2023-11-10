import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'

const request = useRequest(requestConfig)

const prefix = import.meta.env.VITE_APP_SERVICE_API

// 获取用户信息
export function getUserInfo (params) {
  return request({
    url: `${prefix}/user/v1/getInfo`,
    method: 'get',
    params
  })
}

// 获取权限数据
export function getAuthData (params) {
  return request({
    url: `${prefix}/user/v1/getPermission`,
    method: 'get',
    params
  })
}

// 登出
export function logout () {
  return request({
    url: `${prefix}/logout`,
    method: 'post'
  })
}
