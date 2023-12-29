import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'

import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type {
  AgencyListRequest,
  AgencyDetailRequest,
  AgencySaveRequest,
  AgencyEditRequest,
  AgencyDeleteRequest,
  AgencyExportRequest,
  AgencyAddressListRequest,
  AgencyAddressDetailRequest,
  AgencyAddressSaveRequest,
  AgencyAddressEditRequest,
  AgencyAddressDeleteRequest,
  AgencyAddressExportRequest
} from './types/request'
import type {
  AgencyListResponse,
  AgencyDetailResponse,
  AgencyExportResponse,
  AgencyAddressListResponse,
  AgencyAddressDetailResponse,
  AgencyAddressExportResponse
} from './types/response'

const prefix = '/operations-mortgage'
export class AgencyAPI {
  private request: AxiosInstance
  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 渠道商/办事处名单-列表
  getAgencyList(
    data: AgencyListRequest
  ): Response<PageList<AgencyListResponse>> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/agency/config/page`,
      method: 'post',
      data
    })
  }

  // 渠道商/办事处名单-详情
  getAgencyDetail(data: AgencyDetailRequest): Response<AgencyDetailResponse> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/agency/config/detail`,
      method: 'post',
      data
    })
  }

  // 渠道商/办事处名单-编辑
  getAgencyEdit(data: AgencyEditRequest): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/agency/config/edit`,
      method: 'post',
      data
    })
  }

  // 渠道商/办事处名单-新增
  getAgencySave(data: AgencySaveRequest): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/agency/config/save`,
      method: 'post',
      data
    })
  }

  // 渠道商/办事处名单-删除
  getAgencyDelete(
    data: AgencyDeleteRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/agency/config/delete`,
      method: 'post',
      data
    })
  }

  // 渠道商/办事处名单-导出
  getAgencyExport(data: AgencyExportRequest): Response<AgencyExportResponse> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/agency/config/export`,
      method: 'post',
      data
    })
  }

  // 渠道商/办事处名单-列表
  getAgencyAddressList(
    data: AgencyAddressListRequest
  ): Response<PageList<AgencyAddressListResponse>> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/agency/address/page`,
      method: 'post',
      data
    })
  }

  // 渠道商/办事处名单-详情
  getAgencyAddressDetail(
    data: AgencyAddressDetailRequest
  ): Response<AgencyAddressDetailResponse> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/agency/address/detail`,
      method: 'post',
      data
    })
  }

  // 渠道商/办事处名单-编辑
  getAgencyAddressEdit(
    data: AgencyAddressEditRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/agency/address/edit`,
      method: 'post',
      data
    })
  }

  // 渠道商/办事处名单-新增
  getAgencyAddressSave(
    data: AgencyAddressSaveRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/agency/address/save`,
      method: 'post',
      data
    })
  }

  // 渠道商/办事处名单-删除
  getAgencyAddressDelete(
    data: AgencyAddressDeleteRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/agency/address/delete`,
      method: 'post',
      data
    })
  }

  // 渠道商/办事处名单-导出
  getAgencyAddressExport(
    data: AgencyAddressExportRequest
  ): Response<AgencyAddressExportResponse> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/agency/address/export`,
      method: 'post',
      data
    })
  }
}
