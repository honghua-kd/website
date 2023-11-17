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

// 获取字典信息
export function getDict (params) {
  return request({
    url: `${prefix}/system/dict-data/list-all-simple`,
    method: 'get'
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
// 获取部门信息
export function getDeptInfo (params) {
  return request({
    url: `${prefix}/system/dept/list-all-simple`,
    method: 'get'
  })
}

// 字典管理-获取字典列表
export function getDictList (data) {
  return request({
    url: `${prefix}/system/dict-type/page`,
    method: 'post',
    data
  })
}
