import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'

import type { CascaderOption } from 'element-plus'

import type {
  RoleDO,
  DictDataItem,
  DictDataDetail,
  RoleListPermission,
  UserListPermission,
  PermissionData,
  PermissionAssign,
  ScopeMapping,
  DictTypePage,
  DictTypeAllItem,
  OrgStructure,
  StaffList,
  ExpDetail,
  DictDataSimpleRespVO
} from './types/response'

import type {
  DictListRequest,
  RolePageRequest,
  RoleListPermissionRequest,
  UserListPermissionRequest,
  PermissionDataRequest,
  PermissionAssignRequest,
  PermissionDelRequest,
  ScopeMappingRequest,
  PermissionExpressionRequest,
  DictTypePageRequest,
  DictTypeCreateRequest,
  DictTypeUpdateRequest,
  DictTypeDelRequest,
  DictDataPageRequest,
  DictDataCreateRequest,
  DictDataUpdateRequest,
  DictDataDelRequest,
  DictDataGetRequest,
  GetDepartmentStaffRequest,
  GetStaffSubordinatesRequest,
  GetExpDetailRequest,
  DelExpRequest,
  CreateExpRequest,
  StaffInfoRequest,
  childrenRequest
} from './types/request'
import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'

const prefix = '/operations-management'
export class SystemAPI {
  private request: AxiosInstance

  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 获取角色列表
  getRoleList(data: RolePageRequest): Response<PageList<RoleDO>> {
    return this.request({
      url: `${prefix}/admin-api/system/role/page`,
      method: 'post',
      data
    })
  }

  // 获取角色对应数据权限接口
  getRolePermiList(
    params: RoleListPermissionRequest
  ): Response<RoleListPermission[]> {
    return this.request({
      url: `${prefix}/admin-api/system/role/list-permission`,
      method: 'get',
      params
    })
  }

  // 获取用户对应数据权限接口
  getUserPermiList(
    params: UserListPermissionRequest
  ): Response<UserListPermission[]> {
    return this.request({
      url: `${prefix}/admin-api/system/user/list-permission`,
      method: 'get',
      params
    })
  }

  // 查询数据权限
  getPermissionDetail(params: PermissionDataRequest): Response<PermissionData> {
    return this.request({
      url: `${prefix}/admin-api/system/permission/data-scope`,
      method: 'get',
      params
    })
  }

  // 角色管理-数据权限提交接口(赋予数据权限)
  subDataPermission(data: PermissionAssignRequest): Response<PermissionAssign> {
    return this.request({
      url: `${prefix}/admin-api/system/permission/assign-data-scope`,
      method: 'post',
      data
    })
  }

  // 角色管理-数据权限-删除数据权限关系
  delPermission(
    params: PermissionDelRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/system/permission/delete`,
      method: 'get',
      params
    })
  }

  // 角色管理-数据权限-获取字典信息
  getSingleDict(data: DictListRequest): Response<CascaderOption[]> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-data/list`,
      method: 'post',
      data
    })
  }

  // 角色管理-数据权限-获规则映射字典
  getRuleList(data?: ScopeMappingRequest): Response<ScopeMapping[]> {
    return this.request({
      url: `${prefix}/admin-api/system/scope-mapping/all`,
      method: 'post',
      data
    })
  }

  // 角色管理-数据权限-规则校验接口
  checkRules(data: PermissionExpressionRequest): Response<string | null> {
    return this.request({
      url: `${prefix}/admin-api/system/permission/expression`,
      method: 'post',
      data
    })
  }

  // 字典管理-字典类型-获取字典列表
  getDictList(data: DictTypePageRequest): Response<PageList<DictTypePage>> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-type/page`,
      method: 'post',
      data
    })
  }

  // 字典管理-字典类型-新增字典
  createDict(data: DictTypeCreateRequest): Response<null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-type/create`,
      method: 'post',
      data
    })
  }

  // 字典管理-字典类型-修改字典
  updateDict(data: DictTypeUpdateRequest): Response<boolean | null> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-type/update`,
      method: 'post',
      data
    })
  }

  // 字典管理-字典类型-删除字典
  deleteDict(params: DictTypeDelRequest): Response<boolean | null> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-type/delete`,
      method: 'get',
      params
    })
  }

  // 字典管理-字典数据-获取字典列表
  getDataDict(data: DictDataPageRequest): Response<PageList<DictDataItem>> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-data/page`,
      method: 'post',
      data
    })
  }

  getAllDictType(): Response<DictTypeAllItem[]> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-type/list-all-simple`,
      method: 'get'
    })
  }

  // 字典管理-字典数据-新增字典数据
  addDataDict(data: DictDataCreateRequest): Response<number> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-data/create`,
      method: 'post',
      data
    })
  }

  // 字典管理-字典数据-修改字典数据
  modifyDataDict(data: DictDataUpdateRequest): Response<boolean> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-data/update`,
      method: 'post',
      data
    })
  }

  // 字典管理-字典数据-删除字典数据
  delDataDict(params: DictDataDelRequest): Response<boolean> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-data/delete`,
      method: 'get',
      params
    })
  }

  // 字典管理-字典数据-查询字典数据详细
  getDataDictDetail(params: DictDataGetRequest): Response<DictDataDetail> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-data/get`,
      method: 'get',
      params
    })
  }

  // 用户管理-批量获取部门信息

  getAllDept(): Response<OrgStructure> {
    return this.request({
      url: `${prefix}/admin-api/ehr/orgstructure/getAllDept`,
      method: 'post'
    })
  }

  // 用户管理-分页查询部门下员工
  getDepartmentStaff(data: GetDepartmentStaffRequest): Response<StaffList> {
    return this.request({
      url: `${prefix}/admin-api/ehr/orgstructure/getDepartmentAndSubordinates`,
      method: 'post',
      data
    })
  }

  // 用户管理-查询用户的下属
  getStaffSubordinates(data: GetStaffSubordinatesRequest): Response<StaffList> {
    return this.request({
      url: `${prefix}/admin-api/ehr/orgstructure/getStaffSubordinates`,
      method: 'post',
      data
    })
  }

  // 公式编辑模块-查询字典数据详细
  getExpDetail(params: GetExpDetailRequest): Response<ExpDetail> {
    return this.request({
      url: `${prefix}/admin-api/system/scope-mapping/info`,
      method: 'get',
      params
    })
  }

  // 公式编辑模块-删除映射
  delExp(params: DelExpRequest): Response<boolean> {
    return this.request({
      url: `${prefix}/admin-api/system/scope-mapping/delete`,
      method: 'get',
      params
    })
  }

  // 公式编辑模块-保存映射
  saveScopeMapping(data: CreateExpRequest): Response<ExpDetail> {
    return this.request({
      url: `${prefix}/admin-api/system/scope-mapping/save`,
      method: 'post',
      data
    })
  }

  // 查询员工信息
  getStaffInfo(data: StaffInfoRequest): Response<StaffList> {
    return this.request({
      url: `${prefix}/admin-api/ehr/orgstructure/getDepartmentStaff`,
      method: 'post',
      data
    })
  }

  // 查询子级字典数据
  getchildrenInfo(data: childrenRequest): Response<DictDataSimpleRespVO[]> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-data/children`,
      method: 'post',
      data
    })
  }
}
