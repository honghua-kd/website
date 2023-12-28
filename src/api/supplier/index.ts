import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'

import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type {
  SupplierListRequest,
  EditSupplierRequest,
  SupplierDetailRequest,
  ExportSupplierListRequest,
  CityContactsListRequest,
  AddCityContactsRequest,
  EditCityContactsRequest,
  DeleteCityContactsRequest
} from './types/request'
import type {
  SupplierListResponse,
  SupplierDetailResponse,
  exportSupplierListResponse,
  CityContactsListResponse
} from './types/response'

const prefix = '/operations-mortgage'

export class SupplierAPI {
  private request: AxiosInstance
  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 供应商列表
  getSupplierList(
    data: SupplierListRequest
  ): Response<PageList<SupplierListResponse>> {
    return this.request({
      url: `${prefix}/admin-api/supplier/list`,
      method: 'post',
      data
    })
  }

  // 供应商详情
  supplierDetail(
    data: SupplierDetailRequest
  ): Response<PageList<SupplierDetailResponse>> {
    return this.request({
      url: `${prefix}/admin-api/supplier/getDetail`,
      method: 'post',
      data
    })
  }

  // 新增供应商
  addSupplier(data: EditSupplierRequest): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/supplier/add`,
      method: 'post',
      data
    })
  }

  // 编辑供应商
  edditSupplier(
    data: EditSupplierRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/supplier/edit`,
      method: 'post',
      data
    })
  }

  // 删除
  supplierDelete(
    data: SupplierDetailRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/supplier/delete`,
      method: 'post',
      data
    })
  }

  // 停用
  supplierDisable(
    data: SupplierDetailRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/supplier/disable`,
      method: 'post',
      data
    })
  }

  // 启用
  supplierEnable(
    data: SupplierDetailRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/supplier/enable`,
      method: 'post',
      data
    })
  }

  // 导出
  exportSupplier(
    data: ExportSupplierListRequest
  ): Promise<exportSupplierListResponse> {
    return this.request({
      url: `${prefix}/admin-api/supplier/export`,
      method: 'post',
      data
    })
  }

  // 城市联系人列表
  getCityContactsList(
    data: CityContactsListRequest
  ): Response<PageList<CityContactsListResponse>> {
    return this.request({
      url: `${prefix}/admin-api/supplier/cityContacts/list`,
      method: 'post',
      data
    })
  }

  // 新增城市联系人
  addCityContacts(
    data: AddCityContactsRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/supplier/cityContacts/add`,
      method: 'post',
      data
    })
  }

  // 编辑城市联系人
  editCityContacts(
    data: EditCityContactsRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/supplier/cityContacts/edit`,
      method: 'post',
      data
    })
  }

  // 删除城市联系人
  deleteCityContacts(
    data: DeleteCityContactsRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/supplier/cityContacts/delete`,
      method: 'post',
      data
    })
  }
}
