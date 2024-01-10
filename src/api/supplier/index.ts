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
  DeleteCityContactsRequest,
  AddSettleRequest,
  EditSettleRequest,
  AccountRequest,
  AddAccountRequest,
  EditAccountRequest,
  DelAccountRequest
} from './types/request'
import type {
  SupplierListResponse,
  SupplierDetailResponse,
  exportSupplierListResponse,
  CityContactsListResponse,
  AccountResponse
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
      url: `${prefix}/admin-api/mortgage/supplier/list`,
      method: 'post',
      data
    })
  }

  // 供应商详情
  supplierDetail(
    data: SupplierDetailRequest
  ): Response<PageList<SupplierDetailResponse>> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/getDetail`,
      method: 'post',
      data
    })
  }

  // 新增供应商
  addSupplier(data: EditSupplierRequest): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/add`,
      method: 'post',
      data
    })
  }

  // 编辑供应商
  editSupplier(
    data: EditSupplierRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/edit`,
      method: 'post',
      data
    })
  }

  // 删除供应商
  supplierDelete(
    data: SupplierDetailRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/delete`,
      method: 'post',
      data
    })
  }

  // 停用
  supplierDisable(
    data: SupplierDetailRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/disable`,
      method: 'post',
      data
    })
  }

  // 启用
  supplierEnable(
    data: SupplierDetailRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/enable`,
      method: 'post',
      data
    })
  }

  // 导出
  exportSupplier(
    data: ExportSupplierListRequest
  ): Promise<exportSupplierListResponse> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/export`,
      method: 'post',
      data
    })
  }

  // 城市联系人列表
  getCityContactsList(
    data: CityContactsListRequest
  ): Response<PageList<CityContactsListResponse>> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/cityContacts/list`,
      method: 'post',
      data
    })
  }

  // 新增城市联系人
  addCityContacts(
    data: AddCityContactsRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/cityContacts/add`,
      method: 'post',
      data
    })
  }

  // 编辑城市联系人
  editCityContacts(
    data: EditCityContactsRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/cityContacts/edit`,
      method: 'post',
      data
    })
  }

  // 删除城市联系人
  deleteCityContacts(
    data: DeleteCityContactsRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/cityContacts/delete`,
      method: 'post',
      data
    })
  }

  // 结算列表
  getSettleList(
    data: CityContactsListRequest
  ): Response<PageList<CityContactsListResponse>> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/settlementWay/list`,
      method: 'post',
      data
    })
  }

  // 新增结算
  addSettleContacts(
    data: AddSettleRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/settlementWay/add`,
      method: 'post',
      data
    })
  }

  // 编辑结算
  editSettleContacts(
    data: EditSettleRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/settlementWay/edit`,
      method: 'post',
      data
    })
  }

  // 删除结算
  deleteSettleContacts(
    data: DeleteCityContactsRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/settlementWay/delete`,
      method: 'post',
      data
    })
  }

  // 账号列表
  getAccountList(data: AccountRequest): Response<PageList<AccountResponse>> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/account/list`,
      method: 'post',
      data
    })
  }

  // 新增账号
  addAccount(data: AddAccountRequest): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/account/add`,
      method: 'post',
      data
    })
  }

  // 编辑账号
  editAccount(data: EditAccountRequest): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/account/edit`,
      method: 'post',
      data
    })
  }

  // 删除账号
  delAccount(data: DelAccountRequest): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/supplier/account/delete`,
      method: 'post',
      data
    })
  }
}
