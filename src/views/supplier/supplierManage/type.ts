// type OptionItemType = {
//   label: string
//   value: number | string
// }
import type {
  CityContactsListResponse,
  AccountResponse,
  SupplierListResponse
} from '@/api'
type TableColumnType = {
  type: string
  label: string
  prop: string
  columnKey: string
  width: string
  minWidth: string
  fixed: boolean
  tooltip: boolean
}
export type queryForm = {
  supplierName: string
  belongCompany: string
  provinceCode: number | ''
  cityCode: number | ''
  countyCode: number | ''
  status: number | ''
  expireDateStart: string
  expireDateEnd: string
  innerInterfaceStaffCode: string
  supplierType: number | ''
  pageNo: number
  pageSize: number
}
export type RecordType<T = unknown> = Record<string, T>
export type StateType = {
  formModel?: {
    name?: string
    belongCompany?: string
    provinceCode?: number | ''
    cityCode?: number | ''
    countyCode?: number | ''
    status?: number | ''
    expireDateStart?: string
    expireDateEnd?: string
    innerInterfaceStaffCode?: string
    areaCode?: number[]
    type?: number | ''
    pageNo?: number
    pageSize?: number
  }
  tableColumn?: TableColumnType[]
  tableData: SupplierListResponse[]
  pageTotal: number
  editModelVisible: boolean
}

export interface AttachmentDetailDto {
  /**
   * 附件编号
   * 附件编号
   */
  fileCode?: string
  /**
   * 文件备注
   * 文件备注
   */
  fileDesc?: string
  /**
   * 文件名
   * 文件名
   */
  fileName?: string
  /**
   * 上传时间
   * 上传时间
   */
  uploadTime?: string
  remark?: string
}

/**
 * SupplierBankAccountVo
 */
export interface SupplierBankAccountVo {
  /**
   * 账户名称
   * 账户名称
   */
  accountName?: string
  /**
   * 银行账户
   * 银行账户
   */
  bankAccount?: string
  /**
   * 创建时间
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人
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
   * 是否是主账户 0=不是; 1=是
   */
  mainAccountFlag?: number
  /**
   * 开户银行
   * 开户银行
   */
  openBank?: string
  /**
   * 开户银行区域城市code
   */
  openBankCityCode?: number
  /**
   * 开户银行区域城市name
   */
  openBankCityName: string
  /**
   * 开户行行号
   * 开户行行号
   */
  openBankCode?: string
  /**
   * 开户银行区域开户区/县code
   */
  openBankCountyCode?: number
  /**
   * 开户银行区域开户区/县name
   */
  openBankCountyName?: string
  /**
   * 开户银行区域省份code
   */
  openBankProCode?: number
  /**
   * 开户银行区域省份name
   */
  openBankProName: string
  /**
   * 状态 0=停用;1=启用
   * 状态 0=停用;1=启用
   */
  status?: number
  /**
   * 支行信息
   * 支行信息
   */
  subBank?: string
  /**
   * 供应商id
   * 供应商id
   */
  supplierId?: string
  /**
   * 更新人
   * 更新人
   */
  updater?: string
  /**
   * 更新时间
   * 更新时间
   */
  updateTime?: string
}
export interface FileItem {
  fileCode?: string
  remark: string
  fileName?: string
  uploadTime: string
}
export interface EditForm {
  /**
   * 公司地址
   * 公司地址
   */
  address?: string
  /**
   * 附件信息
   * 附件信息
   */
  attachmentInfoList: AttachmentDetailDto[]
  /**
   * 账号信息
   * 账号信息
   */
  bankAccountList: SupplierBankAccountVo[]
  /**
   * 归属公司编码集合
   * 归属公司编码集合
   */
  belongCompanyCodes?: string[]
  /**
   * 归属公司名称集合
   * 归属公司名称集合
   */
  belongCompanyNames: string[]
  /**
   * 公司规模,子账号数量
   */
  companyScale?: string
  /**
   * 联系人
   * 联系人
   */
  contactName?: string
  /**
   * 负责区域
   * 负责区域
   */
  coverArea?: string
  /**
   * 创建时间
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人
   * 创建人
   */
  creator?: string
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
   * 登记注册号类型  SUPPLIER_REGISTER_TYPE_1=工商注册号;SUPPLIER_REGISTER_TYPE_2=统一社会信用代码
   * 登记注册号类型名称  值:SUPPLIER_REGISTER_TYPE_1=工商注册号;SUPPLIER_REGISTER_TYPE_2=统一社会信用代码
   */
  registerType?: string
  /**
   * 登记注册号类型名称  值:工商注册号;统一社会信用代码
   */
  registerTypeName?: string
  /**
   * 签约时间
   * 签约时间
   */
  signDate?: string
  /**
   * 状态,SUPPLIER_DETAIL_STATUS_0=已过期;SUPPLIER_DETAIL_STATUS_1=合作中;SUPPLIER_DETAIL_STATUS_2=已停用
   * 状态,SUPPLIER_DETAIL_STATUS_0=已过期;SUPPLIER_DETAIL_STATUS_1=合作中;SUPPLIER_DETAIL_STATUS_2=已停用
   */
  status?: string
  /**
   * 状态,已过期;合作中;已停用
   */
  statusName?: string
  /**
   * 供应商编码
   * 供应商编码
   */
  supplierCode?: string
  /**
   * 供应商公司名称
   * 供应商公司名称
   */
  supplierName?: string
  /**
   * 供应商类型名称
   */
  supplierTypeNames: string[]
  /**
   * 类型
   * SUPPLIER_DETAIL_TYPE_1-律所；SUPPLIER_DETAIL_TYPE_2-委外机构；SUPPLIER_DETAIL_TYPE_3-仓库；SUPPLIER_DETAIL_TYPE_4-运输公司；SUPPLIER_DETAIL_TYPE_5-收车公司；SUPPLIER_DETAIL_TYPE_6-评估机构；SUPPLIER_DETAIL_TYPE_7-设备处置平台机构
   * 类型
   * SUPPLIER_DETAIL_TYPE_1-律所；SUPPLIER_DETAIL_TYPE_2-委外机构；SUPPLIER_DETAIL_TYPE_3-仓库；SUPPLIER_DETAIL_TYPE_4-运输公司；SUPPLIER_DETAIL_TYPE_5-收车公司；SUPPLIER_DETAIL_TYPE_6-评估机构；SUPPLIER_DETAIL_TYPE_7-设备处置平台机构
   */
  supplierTypes: string[]
  /**
   * 更新人
   * 更新人
   */
  updater?: string
  /**
   * 更新时间
   * 更新时间
   */
  updateTime?: string
  belongCompanyList: string[]
  accountName: string
  bankAccount: string
  openBank: string
  subBank: string
  openBankCode: string
  openBankProCode: string
  openBankProName: string
  openBankCityCode: string
  openBankCityName: string
  openBankCountyCode: string
  openBankCountyName: string
  files: FileItem[]
  accountTableData?: []
  areaCode?: string[]
}
export type ModelStateType = {
  dialogVisible: boolean
  editForm: EditForm
  step: number
  cancelButtonText: string
  okButtonText: string
  personColumn?: TableColumnType[]
  accountColumn?: TableColumnType[]
  personTableData: CityContactsListResponse[]
  personModelVisible?: boolean
  personTotal: number
  pagePersonSize?: number
  pagePersonNo?: number
  pageSettleSize?: number
  pageSettlenNo?: number
  settlementColumn?: TableColumnType[]
  settlementTableData: CityContactsListResponse[]
  settlementModelVisible?: boolean
  settlementTotal: number
  accountTableData: AccountResponse[]
  accountModelVisible?: boolean
  accountTotal?: number
  accountSize?: number
  accountNo?: number
}
export type PersonModelStateType = {
  dialogVisible: boolean
  editForm: RecordType
}

export type DictParams = {
  label?: string | number | symbol
  value?: string | number | symbol
}
