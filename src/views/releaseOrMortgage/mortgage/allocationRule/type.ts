export interface Children {
  /**
   * 二级来源名
   */
  label: string
  /**
   * 二级来源code
   */
  value: string
}
/**
 * 系统来源
 */
export interface SourceSystem12List {
  /**
   * 二级系统来源
   */
  children: Children[]
  /**
   * 一级来源名称
   */
  label: string
  /**
   * 一级来源code
   */
  value: string
}
export interface SmsTemplateRequest {
  /**
   * 业务类型
   */
  bizType: string
  /**
   * 页码，从 1 开始
   */
  pageNo: number
  /**
   * 每页条数
   */
  pageSize: number
  /**
   * 系统来源
   */
  sourceSystem12List: SourceSystem12List[]
  /**
   * 模板编码
   */
  templateCode: string
  /**
   * 模板名字
   */
  templateName: string
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
