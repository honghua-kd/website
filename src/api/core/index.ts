import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, AuthDataItem } from '../types'
import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'

const prefix = import.meta.env.VITE_APP_SERVICE_API

interface RoleItem {
  roleNo: string
  roleName: string
}

interface AuthData {
  role: RoleItem[]
  data: AuthDataItem[]
}

export class CoreAPI {
  private request: AxiosInstance

  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 获取用户信息
  getUserInfo<T>(params?: T): Response<Record<string, string>> {
    return this.request({
      url: `${prefix}/user/v1/getInfo`,
      method: 'get',
      params
    })
  }

  // 获取权限数据
  getAuthData<T extends object>(params?: T): Response<AuthData> {
    return this.request({
      url: `${prefix}/user/v1/getPermission`,
      method: 'get',
      params
    })
  }

  // 登出
  logout(): Response<null> {
    return this.request({
      url: `${prefix}/logout`,
      method: 'post'
    })
  }
}
