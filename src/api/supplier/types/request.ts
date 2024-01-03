import { PageRequest } from '@/api/types/request'
// 供应商管理列表
export interface SupplierListRequest extends PageRequest {
  // 归属公司
  belongCompany?: string | null | undefined
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

// 新增/编辑 供应商
export interface EditSupplierRequest {
  // 主键id
  id?: string
  // 账户名称
  accountName: string
  // 公司地址
  address: string
  // 银行账户
  bankAccount: string
  // 归属公司
  belongCompanyList: string[]
  // 公司规模,子账号数量
  companyScale: string
  // 联系人
  contactName: string
  // 电子邮箱
  email: string
  // 到期时间
  expireDate: string
  // 附件信息
  fileCodes?: string[]
  // 内部对接人工号
  innerInterfaceStaffCode: string
  // 内部对接人名称
  innerInterfaceStaffName: string
  // 开户银行
  openBank: string
  // 开户银行区域城市代码
  openBankCityCode: string
  // 开户银行区域城市名称
  openBankCityName: string
  // 开户行行号
  openBankCode?: string
  // 开户银行区域开户区/县代码
  openBankCountyCode: string
  // 开户银行区域开户区/县名称
  openBankCountyName: string
  // 开户银行区域省份代码
  openBankProCode: string
  // 开户银行区域省份名称
  openBankProName: string
  // 组织机构代码
  organCode: string
  // 联系电话
  phone: string
  // 邮编
  postcode: string
  // 登记注册号码
  registerCode: string
  // 登记注册号类型  枚举值：1=工商注册号;2=统一社会信用代码
  registerType: number
  // 签约时间
  signDate: string
  // 支行信息
  subBank: string
  // 供应商公司名称
  supplierName: string
  // 供应商类型类型    1-律所；2-委外机构；3-仓库；4-运输公司；5-收车公司；6-评估机构；7-设备处置平台机构
  supplierTypes: string[]
}

// 供应商详情
export interface SupplierDetailRequest {
  id: string
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
  supplierId: string
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
