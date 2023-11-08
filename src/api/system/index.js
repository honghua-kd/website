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

// 获取字典信息
export function getDict (params) {
  return request({
    url: `${prefix}/system/dict-data/list-all-simple`,
    method: 'get'
  })
}

// 获取部门信息
export function getDeptInfo (params) {
  return request({
    url: `${prefix}/system/dept/list-all-simple`,
    method: 'get'
  })
}

// 角色管理-数据权限提交接口
export function subDataPermission (data) {
  return request({
    url: `${prefix}/system/permission/assign-role-data-scope`,
    method: 'post',
    data
  })
}
