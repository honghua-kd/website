import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'

const request = useRequest(requestConfig)

const prefix = import.meta.env.VITE_APP_SERVICE_API

// 获取角色列表
export function getRoleList (data) {
  return request({
    url: `${prefix}/system/role/page`,
    method: 'post',
    data
  })
}

// 获取用户列表
export function getUserList (data) {
  return request({
    url: `${prefix}/system/user/page`,
    method: 'post',
    data
  })
}
