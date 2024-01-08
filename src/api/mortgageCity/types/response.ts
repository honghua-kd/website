export interface MortgageCityListResponse {
  /**
   * 是否可以办理解押
   */
  applyDischarge?: number | null
  /**
   * 是否可以办理抵押
   */
  applyMortgage?: number | null
  /**
   * 城市代码
   */
  cityCode?: null | string
  /**
   * 城市名称
   */
  cityName?: null | string
  /**
   * 创建时间
   */
  createTime?: null | string
  /**
   * 创建人
   */
  creator?: null | string
  /**
   * 创建人名称
   */
  creatorName?: null | string
  /**
   * 主键id
   */
  id?: null | string
  /**
   * 车牌代码
   */
  licensePlateCode?: null | string
  /**
   * 省份代码
   */
  provinceCode?: null | string
  /**
   * 省份名称
   */
  provinceName?: null | string
  /**
   * 更新人
   */
  updater?: null | string
  /**
   * 更新人名称
   */
  updaterName?: null | string
  /**
   * 更新时间
   */
  updateTime?: null | string
}

export interface CityExportResponse {
  /**
   * 附件code
   */
  fileCode: string
}
