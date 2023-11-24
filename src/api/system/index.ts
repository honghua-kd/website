import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { BaseResponse, OrgTree } from '../types'
import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'

const prefix = import.meta.env.VITE_APP_SERVICE_API

// 获得全部字典类型列表
interface DictResponse extends BaseResponse {
  data: Record<string, string>[]
}

interface DeptResponse extends BaseResponse {
  data: {
    orgList: OrgTree[]
  }
}

export class SystemAPI {
  private request: AxiosInstance

  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 获取角色列表
  getRoleList<T>(data?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/role/page`,
      method: 'post',
      data
    })
  }

  // 获取角色对应数据权限接口
  getRolePermiList<T>(params?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/role/list-permission`,
      method: 'get',
      params
    })
  }

  // 获取用户对应数据权限接口
  getUserPermiList<T>(params?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/user/list-permission`,
      method: 'get',
      params
    })
  }

  // 查询数据权限
  getPermissionDetail<T>(params?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/permission/data-scope`,
      method: 'get',
      params
    })
  }

  // 角色管理-数据权限提交接口(赋予数据权限)
  subDataPermission<T>(data?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/permission/assign-data-scope`,
      method: 'post',
      data
    })
  }

  // 角色管理-数据权限-删除数据权限关系
  delPermission<T>(params?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/permission/delete`,
      method: 'get',
      params
    })
  }

  // 角色管理-数据权限-获取字典信息
  getSingleDict<T>(data?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-data/list`,
      method: 'post',
      data
    })
  }

  // 角色管理-数据权限-获规则映射字典
  getRuleList(): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/scope-mapping/all`,
      method: 'post'
    })
  }

  // 角色管理-数据权限-规则校验接口

  checkRules<T>(data?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/permission/expression`,
      method: 'post',
      data
    })
  }

  // 字典管理-字典类型-获取字典列表
  getDictList<T>(data?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-type/page`,
      method: 'post',
      data
    })
  }

  // 字典管理-字典类型-新增字典
  createDict<T>(data?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-type/create`,
      method: 'post',
      data
    })
  }

  // 字典管理-字典类型-修改字典
  updateDict<T>(data?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-type/update`,
      method: 'post',
      data
    })
  }

  // 字典管理-字典类型-删除字典
  deleteDict<T>(params?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-type/delete`,
      method: 'get',
      params
    })
  }

  // 字典管理-字典数据-获取字典列表
  getDataDict<T>(data?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-data/page`,
      method: 'post',
      data
    })
  }

  getAllDictType(): Promise<DictResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-type/list-all-simple`,
      method: 'get'
    })
  }

  // 字典管理-字典数据-新增字典数据
  addDataDict<T>(data?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-data/create`,
      method: 'post',
      data
    })
  }

  // 字典管理-字典数据-修改字典数据
  modifyDataDict<T>(data?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-data/update`,
      method: 'post',
      data
    })
  }

  // 字典管理-字典数据-删除字典数据
  delDataDict<T>(params?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-data/delete`,
      method: 'get',
      params
    })
  }

  // 字典管理-字典数据-查询字典数据详细
  getDataDictDetail<T>(params?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-data/get`,
      method: 'get',
      params
    })
  }

  // 用户管理-批量获取部门信息

  getAllDept<T>(data?: T): Promise<DeptResponse> {
    return this.request({
      url: `${prefix}/admin-api/ehr/orgstructure/getAllDept`,
      method: 'post',
      data
    })
  }

  // 用户管理-查询部门下员工
  getDepartmentStaff<T>(data?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/ehr/orgstructure/getDepartmentStaff`,
      method: 'post',
      data
    })
  }

  // 用户管理-查询用户的下属
  getStaffSubordinates<T>(data?: T): Promise<BaseResponse> {
    return this.request({
      url: `${prefix}/admin-api/ehr/orgstructure/getStaffSubordinates`,
      method: 'post',
      data
    })
  }
}
