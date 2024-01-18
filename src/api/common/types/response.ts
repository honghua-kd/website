import { RawAxiosRequestHeaders } from 'axios'

export interface UploadFile {
  fileCode: string
  fileCodes?: string[]
}
export interface FilePreviewItem {
  fileCode?: string
  fileName?: string
  filePreview?: string
}
export interface FilePreviewList {
  previewInfoList: FilePreviewItem[]
}

export interface DictItem {
  dictType?: string
  value: string
  label: string
  colorType?: string
  cssClass?: string
}

export type DictList = Record<string, DictItem[]>

interface FileHeader extends RawAxiosRequestHeaders {
  'content-disposition'?: string
}
export interface FileDownload {
  data: string | ArrayBuffer | ArrayBufferView | Blob
  headers: FileHeader
}

export interface RecordList {
  /**
   * 批次号
   */
  batchNo: string
  /**
   * 上传时间
   */
  createTime: string
  /**
   * 上传人
   */
  creatorName: string
  /**
   * 文件code
   */
  fileCode: string
  /**
   * 文件名
   */
  fileName: string
  /**
   * 导入类型
   */
  importType: string
  /**
   * 说明（失败原因+下载地址）
   */
  msg: null | string
  /**
   * 处理状态（0待处理，1成功，2失败，3处理中）
   */
  status: number
}

export interface RelationListItem {
  /**
   * 附件FILECODE
   */
  attachmentId?: null | string
  /**
   * 附件名称
   */
  attachmentName?: null | string
  /**
   * 业务大类
   */
  businessCategory?: null | string
  /**
   * 业务单号
   */
  businessNo?: null | string
  /**
   * 业务子类
   */
  businessSubcategory?: null | string
  /**
   * 创建时间
   */
  createTime?: null | string
  /**
   * 创建者，目前使用 SysUser 的 id 编号
   *
   * 使用 String 类型的原因是，未来可能会存在非数值的情况，留好拓展性。
   */
  creator?: null | string
  creatorName?: null | string
  /**
   * 是否删除
   */
  deleted?: boolean | null
  /**
   * 文件全名称（带后缀）
   */
  fileName?: null | string
  /**
   * 附件地址
   */
  filePath?: null | string
  /**
   * 文件大小
   */
  fileSize?: number | null
  /**
   * 文件类型后缀
   */
  fileType?: null | string
  /**
   * id
   */
  id?: number | null
  /**
   * 备注
   */
  remark?: null | string
  /**
   * 更新者，目前使用 SysUser 的 id 编号
   *
   * 使用 String 类型的原因是，未来可能会存在非数值的情况，留好拓展性。
   */
  updater?: null | string
  /**
   * 最后更新时间
   */
  updateTime?: null | string
}
export interface RelationList {
  /**
   * 错误码
   */
  code?: number | null
  /**
   * 返回数据
   */
  data?: RelationListItem[] | null
  /**
   * 错误提示，用户可阅读
   */
  msg?: null | string
}

export interface ExpressDictItem {
  dictType?: string
  value: string | number | boolean
  label?: string | number
  colorType?: string
  cssClass?: string
}
export interface AllProvincesResponse {
  /**
   * 行政规划代码
   */
  code: number
  /**
   * 级别 1-省, 2-市, 3-区
   */
  level: number
  /**
   * 行政规划名称
   */
  name: string
  /**
   * 父级行政规划代码
   */
  parentCode: number
  /**
   * 顶级行政区划代码
   */
  topParentCode: number
  /**
   * 是否有子集 0-没有, 1-有
   */
  haveChildren: number
}
export interface ProvinceResponse {
  /**
   * 行政规划代码
   */
  code: number
  /**
   * 级别 1-省, 2-市, 3-区
   */
  level: number
  /**
   * 行政规划名称
   */
  name: string
  /**
   * 父级行政规划代码
   */
  parentCode: number
  /**
   * 顶级行政区划代码
   */
  topParentCode: number
}

// 查询树形字典数据
export interface DictDataTreeResponse {
  children?: DictDataTreeResponse[] | null
  colorType?: null | string
  cssClass?: null | string
  dataLevel?: number | null
  dictType?: null | string
  label?: null | string
  parentValue?: null | string
  remark?: null | string
  sort?: number | null
  status?: number | null
  value?: null | string
}

// 通用导出
export interface ExportBySelectResponse {
  /**
   * 附件code
   */
  fileCode?: string
  /**
   * 0异步 1同步
   */
  sync?: number
}
export interface ProvincesChildrenResponse {
  /**
   * 行政规划代码
   */
  code: number
  /**
   * 是否有子集 0-没有, 1-有
   */
  haveChildren: number
  /**
   * 级别 1-省, 2-市, 3-区
   */
  level: number
  /**
   * 行政规划名称
   */
  name: string
  /**
   * 父级行政规划代码
   */
  parentCode: number
  /**
   * 顶级行政区划代码
   */
  topParentCode: number
}

export interface OrgstructureStaffDto {
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
export interface OrgstructureOrgPositionDto {
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
  positionEmpList?: OrgstructureStaffDto[] | null
  /**
   * 以下字段来源于EHR
   * 岗位等级
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
export interface OrgstructureInfoDto {
  /**
   * 下一层级的组织列表
   */
  childOrgList?: OrgstructureInfoDto[] | null
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
  parentOrg?: OrgstructureInfoDto
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
  positionList?: OrgstructureOrgPositionDto[] | null
}

export interface DeptResponse {
  /**
   * 组织列表
   */
  orgList?: OrgstructureInfoDto[] | null
}
