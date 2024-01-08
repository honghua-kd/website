/**
 * 抵押主体分页数据
 */
export interface MortgageSubjectListResponse {
  /**
   * 资方信息
   */
  capitalInfo?: string
  /**
   * 联系地址-城市code
   */
  contactAddressCityCode: string
  /**
   * 联系地址-城市名称
   */
  contactAddressCityName: string
  /**
   * 联系地址-详细地址
   */
  contactAddressDetail: string
  /**
   * 联系地址-省份code
   */
  contactAddressProvinceCode: string
  /**
   * 联系地址-省份名称
   */
  contactAddressProvinceName: string
  /**
   * 联系人
   */
  contactName: string
  /**
   * 联系电话
   */
  contactPhone: string
  /**
   * 合同主体
   */
  contractSubject?: string
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 创建者
   */
  creatorName: string
  /**
   * 抵押主体全称
   */
  mortgageSubjectAllName: string
  /**
   * 抵押主体唯一Code
   */
  mortgageSubjectCode: string
  /**
   * 抵押主体名称
   */
  mortgageSubjectName: string
  /**
   * 抵押主体类型
   */
  mortgageSubjectType: string
  /**
   * 组织机构代码
   */
  organizationCode: string
  /**
   * 注册地址
   */
  registeredAddress: string
  /**
   * 更新者
   */
  updaterName?: string
  /**
   * 更新时间
   */
  updateTime?: string
}

/**
 * 查询合同主体(全量)
 */
export interface ContractSubjectResponse {
  /**
   * 合同主体列表
   */
  list: string[]
}
