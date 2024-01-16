import { PageRequest } from '@/api/types/request'
// 供应商管理列表
export interface SupplierListRequest extends PageRequest {
  // 归属公司
  belongCompany?: string
  /**
   * 城市行政规划代码
   */
  cityCode?: number | ''
  /**
   * 区/县行政规划代码
   */
  countyCode?: number | ''
  /**
   * 到期时间-结束时间 (时间格式:yyyy-MM-dd)
   */
  expireDateEnd?: string
  /**
   * 到期时间-开始时间 (时间格式:yyyy-MM-dd)
   */
  expireDateStart?: string
  /**
   * 内部对接人工号
   */
  innerInterfaceStaffCode?: string
  /**
   * 供应商公司名称
   */
  name?: string
  /**
   * 省份行政规划代码
   */
  provinceCode?: number | ''
  /**
   * 状态,0=已过期;1=合作中;2=已停用
   */
  status?: number | ''
  /**
   * 类型    1-律所；2-委外机构；3-仓库；4-运输公司；5-收车公司；6-评估机构；7-设备处置平台机构
   */
  type?: number | ''
}

// 新增/编辑 供应商
export interface SupplierAttachmentReqDto {
  /**
   * 附件编号
   */
  fileCode?: string
  /**
   * 附件备注
   */
  remark?: string
}

export interface EditSupplierRequest {
  /**
   * 账户名称
   * 账户名称
   */
  accountName?: string
  /**
   * 公司地址
   * 公司地址
   */
  address?: string
  /**
   * 银行账户
   * 银行账户
   */
  bankAccount?: string
  /**
   * 归属公司
   * 归属公司
   */
  belongCompanyList?: string[]
  /**
   * 公司规模
   * 公司规模,子账号数量
   */
  companyScale?: string
  /**
   * 联系人
   * 联系人
   */
  contactName?: string
  /**
   * 电子邮箱
   * 电子邮箱
   */
  email?: string
  /**
   * 到期时间
   * 到期时间
   */
  expireDate?: string
  /**
   * 附件信息
   * 附件信息
   */
  files?: SupplierAttachmentReqDto[]
  /**
   * 供应商id
   * 主键id
   */
  id?: string
  /**
   * 内部对接人工号
   * 内部对接人工号
   */
  innerInterfaceStaffCode?: string
  /**
   * 内部对接人名称
   * 内部对接人名称
   */
  innerInterfaceStaffName?: string
  /**
   * 开户银行
   * 开户银行
   */
  openBank?: string
  /**
   * 开户银行区域城市代码
   * 开户银行区域城市代码
   */
  openBankCityCode?: number | string
  /**
   * 开户银行区域城市名称
   * 开户银行区域城市名称
   */
  openBankCityName?: string
  /**
   * 开户行行号
   * 开户行行号
   */
  openBankCode?: string
  /**
   * 开户银行区域开户区/县代码
   * 开户银行区域开户区/县代码
   */
  openBankCountyCode?: number | string
  /**
   * 开户银行区域开户区/县名称
   * 开户银行区域开户区/县名称
   */
  openBankCountyName?: string
  /**
   * 开户银行区域省份代码
   * 开户银行区域省份代码
   */
  openBankProCode?: number | string
  /**
   * 开户银行区域省份名称
   * 开户银行区域省份名称
   */
  openBankProName?: string
  /**
   * 组织机构代码
   * 组织机构代码
   */
  organCode?: string
  /**
   * 联系电话
   * 联系电话
   */
  phone?: string
  /**
   * 邮编
   * 邮编
   */
  postcode?: string
  /**
   * 登记注册号码
   * 登记注册号码
   */
  registerCode?: string
  /**
   * 登记注册号类型  枚举值：SUPPLIER_REGISTER_TYPE_1=工商注册号;SUPPLIER_REGISTER_TYPE_2=统一社会信用代码
   * 登记注册号类型  枚举值：SUPPLIER_REGISTER_TYPE_1=工商注册号;SUPPLIER_REGISTER_TYPE_2=统一社会信用代码
   */
  registerType?: string
  /**
   * 签约时间
   * 签约时间
   */
  signDate?: string
  /**
   * 支行信息
   * 支行信息
   */
  subBank?: string
  /**
   * 供应商公司名称
   * 供应商公司名称
   */
  supplierName?: string
  /**
   * 类型
   * SUPPLIER_DETAIL_TYPE_1-律所；SUPPLIER_DETAIL_TYPE_2-委外机构；SUPPLIER_DETAIL_TYPE_3-仓库；SUPPLIER_DETAIL_TYPE_4-运输公司；SUPPLIER_DETAIL_TYPE_5-收车公司；SUPPLIER_DETAIL_TYPE_6-评估机构；SUPPLIER_DETAIL_TYPE_7-设备处置平台机构
   * 供应商类型
   */
  supplierTypes?: string[]
}

// 供应商详情
export interface SupplierDetailRequest {
  id?: string | null | undefined
}

// 导出
export interface ExportSupplierListRequest {
  // 归属公司
  belongCompany?: number | null | undefined
  // 城市行政规划代码
  cityCode?: number | null | undefined
  // 区/县行政规划代码
  countyCode?: number | null | undefined
  // 到期时间-结束时间 (时间格式:yyyy-MM-dd)
  expireDateEnd?: string | null | undefined
  // 到期时间-开始时间 (时间格式:yyyy-MM-dd)
  expireDateStart?: string | null | undefined
  // 内部对接人工号
  innerInterfaceStaffCode?: string | null | undefined
  // 省份行政规划代码
  provinceCode?: number | null | undefined
  // 状态,0=已过期;1=合作中;2=已停用; 状态,0=停用;1=启用
  status?: number | null | undefined
  // 供应商公司名称
  supplierName?: string | null | undefined
  // 供应商类型 1-律所；2-委外机构；3-仓库；4-运输公司；5-收车公司；6-评估机构；7-设备处置平台机构
  supplierType?: number | null | undefined
}

// 城市联系人列表
export interface CityContactsListRequest extends PageRequest {
  /**
   * 城市名称模糊检索条件
   */
  cityName?: string
  /**
   * 省份名称模糊检索条件
   */
  provinceName?: string
}

// 新增城市联系人
export interface AddCityContactsRequest {
  /**
   * 城市行政规划代码
   */
  cityCode: number
  /**
   * 城市行政规划名称
   */
  cityName: string
  /**
   * 联系人名称
   */
  contactsName?: string
  /**
   * 联系电话
   */
  phone?: string
  /**
   * 省份行政规划代码
   */
  provinceCode: number
  /**
   * 省份行政规划名称
   */
  provinceName: string
  /**
   * 供应商id
   */
  supplierId?: string
}

// 编辑城市联系人
export interface EditCityContactsRequest {
  /**
   * 城市行政规划代码
   */
  cityCode: number
  /**
   * 城市行政规划名称
   */
  cityName: string
  /**
   * 联系人名称
   */
  contactsName?: string
  /**
   * 城市联系人id
   */
  id: string
  /**
   * 联系电话
   */
  phone?: string
  /**
   * 省份行政规划代码
   */
  provinceCode: number
  /**
   * 省份行政规划名称
   */
  provinceName: string
}

// 删除城市联系人
export interface DeleteCityContactsRequest {
  id: string
}

export interface AddSettleRequest {
  /**
   * 结算金额
   */
  amount: number | string
  /**
   * 城市行政规划代码
   */
  cityCode: number
  /**
   * 城市行政规划名称
   */
  cityName: string
  /**
   * 省份行政规划代码
   */
  provinceCode: number
  /**
   * 省份行政规划名称
   */
  provinceName: string
  /**
   * 结算方式,SUPPLIER_SETTLEMENT_WAY_1=手动汇款;SUPPLIER_SETTLEMENT_WAY_2=自动扣款
   */
  settlementWay: string
  /**
   * 供应商id
   */
  supplierId?: string
}

/**
 * SettlementWayEditReq
 */
export interface EditSettleRequest {
  /**
   * 结算金额
   */
  amount: number | string
  /**
   * 城市行政规划代码
   */
  cityCode: number
  /**
   * 城市行政规划名称
   */
  cityName: string
  /**
   * 结算方式id
   */
  id: string
  /**
   * 省份行政规划代码
   */
  provinceCode: number
  /**
   * 省份行政规划名称
   */
  provinceName: string
  /**
   * 结算方式,SUPPLIER_SETTLEMENT_WAY_1=手动汇款;SUPPLIER_SETTLEMENT_WAY_2=自动扣款
   */
  settlementWay: string
}

export interface AccountRequest {
  /**
   * 供应商id
   * 供应商id
   */
  supplierId: string
}
export interface AddAccountRequest {
  /**
   * 省份行政规划名称
   * 账号名称
   */
  accountName: string
  /**
   * 电子邮箱
   * 电子邮箱
   */
  email: string
  /**
   * 联系电话
   * 联系电话
   */
  phone: string
  /**
   * 供应商id
   * 供应商id
   */
  supplierId?: string
}
export interface EditAccountRequest {
  /**
   * 账号名称
   * 账号名称
   */
  accountName: string
  /**
   * 电子邮箱
   * 电子邮箱
   */
  email: string
  /**
   * 供应商账号id
   * 供应商账号id
   */
  id: string
  /**
   * 联系电话
   * 联系电话
   */
  phone: string
}
export interface DelAccountRequest {
  /**
   * 供应商账号id
   * 供应商账号id
   */
  id: string
}
export interface EnableAccountRequest {
  /**
   * 供应商账号id
   * 供应商账号id
   */
  id: string
  /**
   * 状态,0=停用；1=启用
   * 状态,0=停用；1=启用
   */
  status: number
}
export interface DeleteFileRequest {
  /**
   * 附件编号集合
   */
  fileCodes?: string[]
  /**
   * 供应商id
   */
  supplierId?: string
}
