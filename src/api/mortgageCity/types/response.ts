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
   * 创建时间
   */
  createTime?: null | string
  /**
   * 创建人
   */
  creator?: null | string
  /**
   * 是否删除
   */
  deleted?: boolean | null
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
   * 更新人
   */
  updater?: null | string
  /**
   * 更新时间
   */
  updateTime?: null | string
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
  /**
   * 是否有子集 0-没有, 1-有
   */
  haveChildren: number
}
