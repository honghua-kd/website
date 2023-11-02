import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'

const request = useRequest(requestConfig)

const prefix = import.meta.env.VITE_APP_SERVICE_API

// 获取用户信息
export function getUserInfo (params) {
  return request({
    url: `${prefix}/getUserInfo`,
    method: 'get',
    params
  })
}

// 获取权限数据
export function getAuthData (data) {
  return request({
    url: `${prefix}/authDataOutput/frontData`,
    method: 'post',
    data
  })
}

// 登出
export function logout () {
  return request({
    url: `${prefix}/logout`,
    method: 'post'
  })
}
