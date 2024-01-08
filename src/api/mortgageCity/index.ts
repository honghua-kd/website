import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'

import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type {
  MartgageCityListRequest,
  EditMortgageCityRequest,
  CodeRequest
} from './types/request'
import type {
  MortgageCityListResponse,
  ProvinceResponse,
  CityExportResponse
} from './types/response'
const prefix = '/operations-management'

export class MortgageCityAPI {
  private request: AxiosInstance
  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 抵解押城市配置列表
  getMortgageCityList(
    data: MartgageCityListRequest
  ): Response<PageList<MortgageCityListResponse>> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/cityConfiguration/list`,
      method: 'post',
      data
    })
  }

  // 新增抵解押城市配置
  addMortgageCity(
    data: Omit<EditMortgageCityRequest, 'id'>
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/cityConfiguration/add`,
      method: 'post',
      data
    })
  }

  // 编辑抵解押城市配置
  editMortgageCity(
    data: EditMortgageCityRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/cityConfiguration/update`,
      method: 'post',
      data
    })
  }

  // 删除抵解押城市配置
  delMortgageCity(
    data: MartgageCityListRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/cityConfiguration/delete`,
      method: 'post',
      data
    })
  }

  // 抵解押城市配置信息批量导入
  mortgageCityBatchImport(
    data: FormData
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/cityConfiguration/importAsync`,
      method: 'post',
      data
    })
  }

  // 抵解押城市配置信息下载
  mortgageCityExport(
    data: MartgageCityListRequest
  ): Response<CityExportResponse> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/cityConfiguration/importAsync`,
      method: 'post',
      data
    })
  }

  // 获取所有省份信息
  getAllProvince(): Response<Omit<ProvinceResponse, 'haveChildren'>[]> {
    return this.request({
      url: `${prefix}/admin-api/area/getAllProvinces`,
      method: 'post'
    })
  }

  // 获取所有省份子节点信息
  getProvinceChildren(data: CodeRequest): Response<ProvinceResponse[]> {
    return this.request({
      url: `${prefix}/admin-api/area/getChildren`,
      method: 'post',
      data
    })
  }
}
