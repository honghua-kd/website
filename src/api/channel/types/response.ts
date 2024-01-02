// 渠道商/办事处名单-列表
export interface AgencyListResponse {
  /**
   * 渠道商/办事处编码
   */
  agencyCode: string
  /**
   * 渠道商/办事处名称
   */
  agencyName: string
  /**
   * 是否生成待收款项清单（是-1，否-0）
   */
  createGatherFlag: number
  createTime: string
  creator: string
  creatorName: string
  /**
   * id
   */
  id: string
  /**
   * 系统来源1
   */
  sourceSystem1: string
  /**
   * 系统来源2
   */
  sourceSystem2: string
  /**
   * 未收费办理是都需审批（是-1，否-0）
   */
  unpaidNeedApproveFlag: number
  updatedTime?: null | string
  updater?: null | string
  updaterName?: null | string
}

// 渠道商/办事处名单-详情
export interface AgencyDetailResponse {
  /**
   * 渠道商/办事处编码
   */
  agencyCode?: string
  /**
   * 渠道商/办事处名称
   */
  agencyName?: string
  /**
   * 是否生成待收款项清单（是-1，否-0）
   */
  createGatherFlag?: number
  /**
   * id
   */
  id?: string
  /**
   * 系统来源1
   */
  sourceSystem1?: string
  /**
   * 系统来源2
   */
  sourceSystem2?: string
  /**
   * 未收费办理是都需审批（是-1，否-0）
   */
  unpaidNeedApproveFlag?: number
}

// 渠道商/办事处名单-导出
export interface AgencyExportResponse {
  /**
   * 附件code
   */
  fileCode?: string
  /**
   * 0异步 1同步
   */
  sync?: number
}

// 渠道商/办事处地址-列表
export interface AgencyAddressListResponse {
  /**
   * 地址
   */
  address?: null | string
  /**
   * 渠道商/办事处编码
   */
  agencyCode: string
  /**
   * 渠道商/办事处名称
   */
  agencyName: string
  /**
   * 城市编码
   */
  cityCode: string
  /**
   * 城市名称
   */
  cityName: string
  /**
   * 联系人
   */
  contact?: null | string
  /**
   * 创建时间
   */
  createdTime: string
  /**
   * 创建人
   */
  creator: string
  /**
   * 创建人名称
   */
  creatorName: string
  /**
   * 区编码
   */
  districtCode?: null | string
  /**
   * 区名称
   */
  districtName?: null | string
  /**
   * id
   */
  id: string
  /**
   * 电话
   */
  phone?: null | string
  /**
   * 省份编码
   */
  provinceCode: string
  /**
   * 省份名称
   */
  provinceName: string
  /**
   * 来源系统1
   */
  sourceSystem1: string
  /**
   * 来源系统2
   */
  sourceSystem2: string
  /**
   * 更新时间
   */
  updatedTime?: null | string
  /**
   * 更新人
   */
  updater?: null | string
  /**
   * 更新人名称
   */
  updaterName: string
}

// 渠道商/办事处地址-详情
export interface AgencyAddressDetailResponse {
  /**
   * 地址
   */
  address?: string
  /**
   * 代理商/办事处编码
   */
  agencyCode: string
  /**
   * 代理商/办事处
   */
  agencyName: string
  /**
   * 城市编码
   */
  cityCode: string
  /**
   * 城市
   */
  cityName: string
  /**
   * 联系人
   */
  contact?: string
  /**
   * 区编码
   */
  districtCode: string
  /**
   * 区
   */
  districtName?: string
  id: string
  /**
   * 电话
   */
  phone?: string
  /**
   * 省份编码
   */
  provinceCode: string
  /**
   * 省份
   */
  provinceName: string
  /**
   * 来源系统1
   */
  sourceSystem1: string
  /**
   * 来源系统2
   */
  sourceSystem2: string
}

// 渠道商/办事处地址-导出
export interface AgencyAddressExportResponse {
  /**
   * 附件code
   */
  fileCode?: string
  /**
   * 0异步 1同步
   */
  sync?: number
}
