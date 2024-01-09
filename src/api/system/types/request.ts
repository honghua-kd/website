import { PageRequest } from '@/api/types/request'
// 数据字典列表
export interface DictListRequest {
  /**
   * 字典类型
   */
  dictType: string
  /**
   * 标签
   */
  label?: string
  /**
   * 状态
   */
  status?: number | string
}

// 获得角色分页
export interface RolePageRequest extends PageRequest {
  roleName?: string
  roleNo?: string
  roleCode?: string
  status?: number
  createTime?: [Date, Date] // 创建时间
}

// 获取角色对应数据权限
export type RoleListPermissionRequest = Pick<RolePageRequest, 'roleCode'>

// 获取用户的数据权限列表
export interface UserListPermissionRequest {
  /**
   * 工号
   */
  staffCode?: string
}

// 查询数据权限
export interface PermissionDataRequest {
  /**
   * 权限编码
   */
  permissionCode?: string
}

// 赋予数据权限
export interface PermissionAssignRequest {
  /**
   * 权限规则
   */
  dataScope?: string | null
  /**
   * 规则表达式
   */
  dataScopeExpression?: string | null
  /**
   * 主键，新增为空
   */
  id?: string | number | null
  /**
   * 模块编码，多选，分号分隔
   */
  moduleCode?: string[]
  /**
   * 权限编码，不能重复
   */
  permissionCode?: string | null
  /**
   * 权限名称
   */
  permissionName?: string | null
  /**
   * 关系主键，新增为空
   */
  relationId?: string | number | null
  /**
   * 角色编码，为角色赋权时，不能为空
   */
  roleCode?: null | string
  /**
   * 工号，为人员赋权时，不能为空
   */
  staffCode?: null | string
}

// 删除数据权限关系
export interface PermissionDelRequest {
  /**
   * 关系表主键
   */
  id?: number
}

// 获取所有映射配置
export interface ScopeMappingRequest {
  /**
   * 显示名称
   */
  forwordName?: null | string
  /**
   * 关键字映射编码，模糊匹配
   */
  keywordCode?: null | string
  /**
   * 关键字名称，模糊匹配
   */
  keywordName?: null | string
}

// 公式解析
export interface PermissionExpressionRequest {
  /**
   * 规则公式
   */
  dataScope: string
}

// 获得字典类型的分页列表
export interface DictTypePageRequest extends PageRequest {
  name?: string
  status?: string
  type?: string
}

// 创建字典类型
export interface DictTypeCreateRequest {
  name?: null | string
  remark?: null | string
  status?: number
  type?: null | string
}

// 修改字典类型
export interface DictTypeUpdateRequest {
  id?: number | null
  name?: null | string
  remark?: null | string
  status?: number
  type?: null | string
}

// 删除字典类型
export interface DictTypeDelRequest {
  id?: number
}

// 获得字典类型的分页列表
export interface DictDataPageRequest extends PageRequest {
  dictType?: string
  label?: string
  status?: string | number | undefined
}

// 新增字典数据
export interface DictDataCreateRequest {
  colorType?: null | string
  cssClass?: null | string
  dictType?: null | string
  label?: null | string
  level?: number | null
  dataLevel?: string | number | null
  parentValue?: null | string
  remark?: null | string
  sort?: number
  status?: number
  value?: null | string
}

// 修改字典数据
export interface DictDataUpdateRequest extends DictDataCreateRequest {
  id: number | string
}

// 删除字典数据
export interface DictDataDelRequest {
  id: number | string
}
// 查询字典数据详细
export type DictDataGetRequest = DictDataDelRequest

// 查询部门下员工
export interface GetDepartmentStaffRequest extends PageRequest {
  orgCodeList: string[]
  onJobStatusList?: string[]
}

// 查询用户的下属
export interface BaseStaffRequest {
  staffName?: null | string

  staffCode: string
}

// 查询用户信息

export type StaffInfoRequest = BaseStaffRequest &
  PageRequest & {
    orgCode?: string
  }
export interface GetStaffSubordinatesRequest extends PageRequest {
  /**
   * 员工工号
   */
  staffCodeList?: string[]
  /**
   * 在职状态
   */
  onJobStatusList?: null | string[]
}

export interface GetExpDetailRequest {
  /**
   * 表达式ID
   */
  id: string | number | undefined
}

export type DelExpRequest = GetExpDetailRequest

export interface CreateExpRequest {
  /**
   * 显示名称，用于前端呈现
   */
  forwordName?: string | undefined
  /**
   * 主键，新增为空
   */
  id?: string | number | undefined
  /**
   * 关键字映射编码
   */
  keywordCode?: string | undefined
  /**
   * 关键字名称
   */
  keywordName?: string | undefined
  /**
   * 数据接口地址
   */
  url?: string | undefined
}

export interface TemplateImportResultRequest {
  /**
   * 大类
   */
  businessCategory: string
  /**
   * 小类
   */
  businessSubcategory: string
}

export interface TemplateListRequest {
  /**
   * 业务大类
   */
  businessCategory?: null | string
  /**
   * 业务小类
   */
  businessSubcategory?: null | string
  /**
   * 文件code
   */
  fileCode?: null | string
  /**
   * 文件名称（前端下载后展示名称）
   */
  fileName?: null | string
  /**
   * 主键
   */
  id?: number | null
}

export interface TemplateDelRequest {
  /**
   * 主键
   */
  id?: string | null
  /**
   * 主键list
   */
  idList?: string[] | null
}

export interface TemplateAddRequest {
  /**
   * 业务大类
   */
  businessCategory?: null | string
  /**
   * 业务小类
   */
  businessSubcategory?: null | string
  /**
   * 文件code
   */
  fileCode?: null | string
  /**
   * 文件名称（前端下载后展示名称）
   */
  fileName?: null | string
  /**
   * 备注
   */
  remark?: null | string
}

export interface TemplateEditRequest extends TemplateAddRequest {
  /**
   * 主键
   */
  id: number | null
}
