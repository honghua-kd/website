// 供应商列表
export interface SupplierListResponse {
  //  归属公司
  belongCompany?: string
  //  联系人
  contactName?: string
  //  负责区域
  coverArea?: string
  // 创建时间
  createdTime?: string
  // 创建人
  creator?: string
  // 电子邮箱
  email?: string
  // 到期时间
  expireDate?: string
  // 到期提醒
  expireRemind?: string
  // 供应商id
  id?: string
  // 内部对接人工号
  innerInterfaceStaffCode?: string
  // 内部对接人名称
  innerInterfaceStaffName?: string
  // 联系电话
  phone?: string
  // 状态,0=已过期;1=合作中;2=已停用
  status?: number
  // 供应商编码
  supplierCode?: string
  // 供应商公司名称
  supplierName?: string
  // 供应商类型
  supplierTypeName?: string
  // 更新时间
  updatedTime?: string
  // 更新人
  updater?: string
}

interface AttachmentInfoDTO {
  /**
   * 附件编号
   */
  fileCode?: string
  /**
   * 文件备注
   */
  fileDesc?: string
  /**
   * 文件名
   */
  fileName?: string
  /**
   * 上传时间
   */
  uploadTime?: string
}
interface SupplierBankAccountVo {
  /**
   * 账户名称
   */
  accountName?: string
  /**
   * 银行账户
   */
  bankAccount?: string
  /**
   * 创建时间
   */
  createdTime?: string
  /**
   * 创建人
   */
  creator?: string
  /**
   * 供应商银行账户id
   * 主键id
   */
  id?: string
  /**
   * 是否是主账户 0=不是; 1=是
   */
  mainAccountFlag?: number
  /**
   * 开户银行
   */
  openBank?: string
  /**
   * 开户银行区域
   */
  openBankArea?: string
  /**
   * 开户行行号
   */
  openBankCode?: string
  /**
   * 状态 0=停用;1=启用
   */
  status?: number
  /**
   * 支行信息
   */
  subBank?: string
  /**
   * 供应商id
   */
  supplierId?: string
  /**
   * 更新时间
   */
  updatedTime?: string
  /**
   * 更新人
   */
  updater?: string
}
// 供应商详情
export interface SupplierDetailResponse {
  /**
   * 公司地址
   */
  address?: string
  /**
   * 附件信息
   */
  attachmentInfoList?: AttachmentInfoDTO[]
  /**
   * 账号信息
   */
  bankAccountList?: SupplierBankAccountVo[]
  /**
   * 归属公司编码集合
   */
  belongCompanyCodes?: string[]
  /**
   * 归属公司名称集合
   */
  belongCompanyNames?: string[]
  /**
   * 联系人
   */
  contactName?: string
  /**
   * 负责区域
   */
  coverArea?: string
  /**
   * 创建时间
   */
  createdTime?: string
  /**
   * 创建人
   */
  creator?: string
  /**
   * 电子邮箱
   */
  email?: string
  /**
   * 到期时间
   */
  expireDate?: string
  /**
   * 主键id
   */
  id?: string
  /**
   * 内部对接人工号
   */
  innerInterfaceStaffCode?: string
  /**
   * 内部对接人名称
   */
  innerInterfaceStaffName?: string
  /**
   * 组织机构代码
   */
  organCode?: string
  /**
   * 联系电话
   */
  phone?: string
  /**
   * 邮编
   */
  postcode?: string
  /**
   * 签约时间
   */
  signDate?: string
  /**
   * 状态,0=已过期;1=合作中;2=已停用
   */
  status?: number
  /**
   * 供应商编码
   */
  supplierCode?: string
  /**
   * 供应商公司名称
   */
  supplierName?: string
  /**
   * 供应商类型     1-律所；2-委外机构；3-仓库；4-运输公司；5-收车公司；6-评估机构；7-设备处置平台机构';
   */
  supplierTypes?: number[]
  /**
   * 更新时间
   */
  updatedTime?: string
  /**
   * 更新人
   */
  updater?: string
}
// 供应商导出
export interface exportSupplierListResponse {
  /**
   * 附件code，如果是同步导出，会返回附件编号，根据附件编号下载
   */
  fileCode?: null | string
  /**
   * 0异步 1同步
   */
  sync: number
}

// 城市联系人列表
export interface CityContactsListResponse {
  /**
   * 城市行政规划代码
   */
  cityCode?: number
  /**
   * 城市行政规划名称
   */
  cityName?: string
  /**
   * 联系人名称
   */
  contactsName?: string
  /**
   * 创建时间
   */
  createdTime?: string
  /**
   * 创建人
   */
  creator?: string
  /**
   * 城市联系人主键id
   * 主键id
   */
  id?: string
  /**
   * 联系电话
   */
  phone?: string
  /**
   * 省份行政规划代码
   */
  provinceCode?: number
  /**
   * 省份行政规划名称
   */
  provinceName?: string
  /**
   * 更新时间
   */
  updatedTime?: string
  /**
   * 更新人
   */
  updater?: string
}

export interface AccountResponse {
  /**
   * 省份行政规划名称
   * 账号名称
   */
  accountName?: string
  /**
   * 账号
   * 账号
   */
  accountNo?: string
  /**
   * 电子邮箱
   * 电子邮箱
   */
  email?: string
  /**
   * 主键id
   * 主键id
   */
  id?: string
  /**
   * 联系电话
   * 联系电话
   */
  phone?: string
  /**
   * 状态,0=停用；1=启用
   * 状态,0=停用；1=启用
   */
  status?: number
  /**
   * 供应商id
   * 供应商id
   */
  supplierId?: string
}
