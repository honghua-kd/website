import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'

const request = useRequest(requestConfig)

const prefix = import.meta.env.VITE_APP_SERVICE_API

// 获取角色列表
export function getRoleList (data) {
  return request({
    url: `${prefix}/admin-api/system/role/page`,
    method: 'post',
    data
  })
}

// 获取角色对应数据权限接口
export function getRolePermiList (params) {
  return request({
    url: `${prefix}/admin-api/system/role/list-permission`,
    method: 'get',
    params
  })
}

// 获取用户对应数据权限接口
export function getUserPermiList (params) {
  return request({
    url: `${prefix}/admin-api/system/user/list-permission`,
    method: 'get',
    params
  })
}

// 查询数据权限
export function getPermissionDetail (params) {
  return request({
    url: `${prefix}/admin-api/system/permission/data-scope`,
    method: 'get',
    params
  })
}

// 角色管理-数据权限提交接口(赋予数据权限)
export function subDataPermission (data) {
  return request({
    url: `${prefix}/admin-api/system/permission/assign-data-scope`,
    method: 'post',
    data
  })
}

// 角色管理-数据权限-删除数据权限关系
export function delPermission (params) {
  return request({
    url: `${prefix}/admin-api/system/permission/delete`,
    method: 'get',
    params
  })
}

// 角色管理-数据权限-获取字典信息
export function getSingleDict (data) {
  return request({
    url: `${prefix}/admin-api/system/dict-data/list`,
    method: 'post',
    data
  })
}

// 角色管理-数据权限-获规则映射字典
export function getRuleList () {
  return request({
    url: `${prefix}/admin-api/system/scope-mapping/all`,
    method: 'post'
  })
}

// 角色管理-数据权限-规则校验接口

export function checkRules (data) {
  return request({
    url: `${prefix}/admin-api/system/permission/expression`,
    method: 'post',
    data
  })
}

// 字典管理-字典类型-获取字典列表
export function getDictList (data) {
  return request({
    url: `${prefix}/admin-api/system/dict-type/page`,
    method: 'post',
    data
  })
}
// 字典管理-字典类型-新增字典
export function createDict (data) {
  return request({
    url: `${prefix}/admin-api/system/dict-type/create`,
    method: 'post',
    data
  })
}

// 字典管理-字典类型-修改字典
export function updateDict (data) {
  return request({
    url: `${prefix}/admin-api/system/dict-type/update`,
    method: 'post',
    data
  })
}
// 字典管理-字典类型-删除字典
export function deleteDict (params) {
  return request({
    url: `${prefix}/admin-api/system/dict-type/delete`,
    method: 'get',
    params
  })
}

// 字典管理-字典数据-获取字典列表
export function getDataDict (data) {
  return request({
    url: `${prefix}/admin-api/system/dict-data/page`,
    method: 'post',
    data
  })
}
// 获得全部字典类型列表
export function getAllDictType () {
  return request({
    url: `${prefix}/admin-api/system/dict-type/list-all-simple`,
    method: 'get'
  })
}

// 字典管理-字典数据-新增字典数据
export function addDataDict (data) {
  return request({
    url: `${prefix}/admin-api/system/dict-data/create`,
    method: 'post',
    data
  })
}

// 字典管理-字典数据-修改字典数据
export function modifyDataDict (data) {
  return request({
    url: `${prefix}/admin-api/system/dict-data/update`,
    method: 'post',
    data
  })
}

// 字典管理-字典数据-删除字典数据
export function delDataDict (params) {
  return request({
    url: `${prefix}/admin-api/system/dict-data/delete`,
    method: 'get',
    params
  })
}

// 字典管理-字典数据-查询字典数据详细
export function getDataDictDetail (params) {
  return request({
    url: `${prefix}/admin-api/system/dict-data/get`,
    method: 'get',
    params
  })
}

// 用户管理-批量获取部门信息
export function getAllDept (data) {
  return request({
    url: `${prefix}/admin-api/ehr/orgstructure/getAllDept`,
    method: 'post',
    data
  })
}
// 用户管理-查询部门下员工
export function getDepartmentStaff (data) {
  return request({
    url: `${prefix}/admin-api/ehr/orgstructure/getDepartmentStaff`,
    method: 'post',
    data
  })
}
// 用户管理-查询用户的下属
export function getStaffSubordinates (data) {
  return request({
    url: `${prefix}/admin-api/ehr/orgstructure/getStaffSubordinates`,
    method: 'post',
    data
  })
}
