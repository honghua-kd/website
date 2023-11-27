export interface ResponseBody<T> {
  msg?: string
  message?: string
  code: number
  data?: T | null
  success: boolean
  time?: string
}

export type Response<T> = Promise<ResponseBody<T>>

export interface AuthDataItem {
  children: AuthDataItem[]
  elements: Array<string>
  menuType: number
  sort: number
  menu: string
}

export interface PageList<I> {
  list: I[]
  total: number
}

// 数据字典列表
export interface DictListItem {
  colorType?: null | string
  createTime?: null | string
  cssClass?: null | string
  dictType?: null | string
  id?: null | number
  label?: null | string
  level?: null | number
  dataLevel?: null | number
  parentValue?: null | string
  remark?: null | string
  sort?: null | number
  status?: null | number
  value?: null | string
}

// 获取字典数据
export interface DictDataDetail {
  colorType?: null | string
  createTime?: null | string
  cssClass?: null | string
  dictType?: null | string
  id?: number | null
  label?: null | string
  level?: number | null
  dataLevel?: null | number
  parentValue?: null | string
  remark?: null | string
  sort?: number | null
  status?: number | null
  value?: null | string
}

// 获得角色分页
export interface RoleDO {
  createTime?: null | string
  creator?: null | string
  dataScope?: number | null
  dataScopeDeptIds?: number[] | null
  deleted?: boolean | null
  id?: number | null
  remark?: null | string
  roleName?: null | string
  roleNo?: null | string
  sort?: number | null
  status?: number | null
  type?: number | null
  updater?: null | string
  updateTime?: null | string
}

// 获取角色对应数据权限
export interface RoleListPermission {
  id?: number
  permissionCode?: string
  roleCode?: string
  staffCode?: null | string
  relationId?: string
}

// 获取用户的数据权限列表
export interface UserListPermission {
  id?: number
  permissionCode?: string
  roleCode?: null
  staffCode?: string
  relationId?: string
}

// 查询数据权限
export interface PermissionData {
  dataScope: null | string
  dataScopeExpression: null | string
  id: number
  moduleCode: string[]
  permissionCode?: null | string
  permissionName?: null | string
}

// 赋予数据权限
export interface PermissionAssign {
  /**
   * 权限规则
   */
  dataScope: string
  /**
   * 权限规则表达式
   */
  dataScopeExpression: string
  /**
   * 主键
   */
  id: number
  /**
   * 模块名称
   */
  moduleCode: string
  /**
   * 权限编码
   */
  permissionCode: string
  /**
   * 权限名称
   */
  permissionName: string
  /**
   * 关系表主键
   */
  relationId?: number | null
  /**
   * 角色编码
   */
  roleCode?: null | string
  /**
   * 工号
   */
  staffCode?: null | string
}

export interface ScopeMapping {
  /**
   * 显示名称
   */
  forwordName?: string
  /**
   * 主键
   */
  id?: number
  /**
   * 映射编码
   */
  keywordCode?: string
  /**
   * 关键字
   */
  keywordName?: string
  /**
   * 数据接口地址
   */
  url?: string
}

// 获得字典类型的分页列表
export interface DictTypePage {
  createTime?: null | string
  id?: number | null
  name?: null | string
  remark?: null | string
  status?: number | null
  type?: null | string
}

// 获得字典类型的分页列表
export interface DictDataItem {
  colorType?: null | string
  createTime?: null | string
  cssClass?: null | string
  dictType?: null | string
  id?: number | null
  label?: null | string
  level?: number | null
  parentValue?: null | string
  remark?: null | string
  sort?: number | null
  status?: number | null
  value?: null | string
}

// 获得全部字典类型列表
export interface DictTypeAllItem {
  id?: number | null
  name?: null | string
  type?: null | string
}

// 员工信息
export interface StaffInfo {
  /**
   * 区域
   */
  area?: null | string
  /**
   * 邮箱
   */
  email?: null | string
  /**
   * 扩展字段，用户自定义输入
   */
  extData?: null | string
  /**
   * 入职日期
   */
  firstHiredDate?: null | string
  /**
   * 性别, 男/女/未知
   */
  gender?: null | string
  /**
   * 是否为内部员工 1：是  0：否
   */
  isInnerFlag?: null | string
  /**
   * 离职日期
   */
  leaveDate?: null | string
  /**
   * 手机号
   */
  mobile?: null | string
  /**
   * 办公室电话
   */
  officePhone?: null | string
  /**
   * 在职状态
   */
  onJobStatus?: null | string
  /**
   * 一级部门编号
   */
  org1Code?: null | string
  /**
   * 一级部门名称
   */
  org1Name?: null | string
  /**
   * 二级部门编号
   */
  org2Code?: null | string
  /**
   * 二级部门名称
   */
  org2Name?: null | string
  /**
   * 三级部门编号
   */
  org3Code?: null | string
  /**
   * 三级部门名称
   */
  org3Name?: null | string
  /**
   * 管理单元
   */
  ouid?: number | null
  /**
   * 管理单元名称
   */
  ouidName?: null | string
  /**
   * 岗位code
   */
  positionCode?: null | string
  /**
   * 岗位名
   */
  positionName?: null | string
  /**
   * 直线上级工号
   */
  reportToStaffCode?: null | string
  /**
   * 直线上级姓名
   */
  reportToStaffName?: null | string
  /**
   * 工号
   */
  staffCode?: null | string
  /**
   * 姓名
   */
  staffName?: null | string
}

// 岗位信息
export interface PositionInfo {
  /**
   * 是否启用，0=启用，1=禁用
   */
  disabled?: number | null
  /**
   * 禁用开始时间
   */
  disabledDate?: null | string
  /**
   * 扩展字段，用户自定义输入
   */
  extData?: null | string
  /**
   * 是否为内部岗位 1：是  0：否
   */
  isInnerFlag?: null | string
  /**
   * 岗位代码(用户自定义)
   */
  positionAuthCode?: null | string
  /**
   * 岗位归属部门编号
   */
  positionBelongOrgCode?: null | string
  /**
   * 岗位归属部门编号
   */
  positionBelongOrgName?: null | string
  /**
   * 岗位编号
   */
  positionCode?: null | string
  /**
   * 岗位下的员工列表
   */
  positionEmpList?: StaffInfo[] | null
  /**
   * 以下字段来源于EHR
   */
  positionGrade?: null | string
  /**
   * 岗位等级名称
   */
  positionGradeName?: null | string
  /**
   * 岗位名称
   */
  positionName?: null | string
  /**
   * 岗位类别编号
   */
  positionProperty?: null | string
  /**
   * 岗位类别名称
   */
  positionPropertyName?: null | string
}

// 组织架构信息
export interface OrgInfoItem {
  /**
   * 下一层级的组织列表
   */
  childOrgList?: OrgInfoItem[] | null
  /**
   * 是否失效,0=正常 1=失效
   */
  disabled?: number | null
  /**
   * 是否启用 1:启用，0:禁用
   */
  enabled?: number | null
  /**
   * 扩展字段，用户自定义输入
   */
  extData?: null | string
  /**
   * 是否为内部部门 1：是  0：否
   */
  isInnerFlag?: null | string
  /**
   * 是否虚拟部门 0：否，1：是
   */
  isVirtualFlag?: number | null
  /**
   * 分管领导工号
   */
  managerLeaderStaffCode?: null | string
  /**
   * 分管领导名称
   */
  managerLeaderStaffName?: null | string
  /**
   * 负责人工号
   */
  managerStaffCode?: null | string
  /**
   * 负责人名称
   */
  managerStaffName?: null | string
  /**
   * 组织代码
   */
  orgAuthCode?: null | string
  /**
   * 组织编号
   */
  orgCode?: null | string
  /**
   * 组织级别编号
   */
  orgGradeCode?: null | string
  /**
   * 组织级别名称
   */
  orgGradeName?: null | string
  /**
   * 组织名称
   */
  orgName?: null | string
  /**
   * 组织类别编号
   */
  orgPropertyCode?: null | string
  /**
   * 组织类别名称
   */
  orgPropertyName?: null | string
  /**
   * 组织类型编号
   */
  orgTypeCode?: null | string
  /**
   * 组织类型名称
   */
  orgTypeName?: null | string
  /**
   * 管理单元id
   */
  ouid?: number | null
  /**
   * 管理单元名称
   */
  ouidName?: null | string
  /**
   * 上级树形层级
   */
  parentOrg?: OrgInfoItem
  /**
   * 上级组织编号
   */
  parentOrgCode?: null | string
  /**
   * 上级组织名称
   */
  parentOrgName?: null | string
  /**
   * 岗位列表
   */
  positionList?: PositionInfo[] | null
}

// 获取全量组织架构数据
export interface OrgStructure {
  /**
   * 组织列表
   */
  orgList?: OrgInfoItem[] | null
}

// 查询部门下员工
export interface StaffListItem {
  /**
   * 区域
   */
  area?: null | string
  /**
   * 邮箱
   */
  email?: null | string
  /**
   * 扩展字段，用户自定义输入
   */
  extData?: null | string
  /**
   * 入职日期
   */
  firstHiredDate?: null | string
  /**
   * 性别, 男/女/未知
   */
  gender?: null | string
  /**
   * 是否为内部员工 1：是  0：否
   */
  isInnerFlag?: null | string
  /**
   * 离职日期
   */
  leaveDate?: null | string
  /**
   * 手机号
   */
  mobile?: null | string
  /**
   * 办公室电话
   */
  officePhone?: null | string
  /**
   * 在职状态
   */
  onJobStatus?: null | string
  /**
   * 一级部门编号
   */
  org1Code?: null | string
  /**
   * 一级部门名称
   */
  org1Name?: null | string
  /**
   * 二级部门编号
   */
  org2Code?: null | string
  /**
   * 二级部门名称
   */
  org2Name?: null | string
  /**
   * 三级部门编号
   */
  org3Code?: null | string
  /**
   * 三级部门名称
   */
  org3Name?: null | string
  /**
   * 管理单元
   */
  ouid?: number | null
  /**
   * 管理单元名称
   */
  ouidName?: null | string
  /**
   * 岗位code
   */
  positionCode?: null | string
  /**
   * 岗位名
   */
  positionName?: null | string
  /**
   * 直线上级工号
   */
  reportToStaffCode?: null | string
  /**
   * 直线上级姓名
   */
  reportToStaffName?: null | string
  /**
   * 工号
   */
  staffCode?: null | string
  /**
   * 姓名
   */
  staffName?: null | string
}

export interface StaffList {
  /**
   * 员工列表
   */
  staffList?: StaffListItem[] | null
  total?: number
}
