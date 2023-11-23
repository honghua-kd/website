import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { BaseResponse, AuthDataItem } from '@/types/api'

const prefix = import.meta.env.VITE_APP_SERVICE_API

interface UserInfoResponse extends BaseResponse {
  data: Record<string, string>
}

interface RoleItem {
  roleNo: string
  roleName: string
}

interface AuthDataResponse extends BaseResponse {
  data: {
    role: RoleItem[]
    data: AuthDataItem[]
  }
}

// 获取用户信息
export function getUserInfo<T>(params?: T): Promise<UserInfoResponse> {
  const request = useRequest(requestConfig)
  return request({
    url: `${prefix}/user/v1/getInfo`,
    method: 'get',
    params
  })
}

// 获取权限数据
export function getAuthData<T extends object>(
  params?: T
): Promise<AuthDataResponse> {
  const request = useRequest(requestConfig)
  return request({
    url: `${prefix}/user/v1/getPermission`,
    method: 'get',
    params
  })
}

// 登出
export function logout(): Promise<BaseResponse> {
  const request = useRequest(requestConfig)
  return request({
    url: `${prefix}/logout`,
    method: 'post'
  })
}
