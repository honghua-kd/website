import { PageRequest } from '@/api/types/request'
export interface CityProvinceConfig {
  /**
   * 城市
   */
  cityCode?: string[] | null
  /**
   * 省份
   */
  provinceCode?: string[] | null
}
export interface MartgageCityListRequest extends PageRequest {
  /**
   * 主键id
   */
  ids?: string[] | null
  /**
   * 车牌代码
   */
  licensePlateCode?: null | string
  /**
   * 省份城市
   */
  provinceCityCodes?: CityProvinceConfig[] | null
}
export interface AddMortgageCityRequest {
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
}
export interface EditMortgageCityRequest {
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
}
export interface CodeRequest {
  /**
   * 行政规划代码
   */
  code: number
}
