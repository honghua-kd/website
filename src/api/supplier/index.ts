import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'

import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type { SupplierListRequest } from './types/request'
import type { RecordType } from './types/response'

const prefix = '/operations-mortgage'

export class SupplierAPI {
  private request: AxiosInstance
  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 分页查询车辆登记证信息列表
  getSupplierList(data: SupplierListRequest): Response<PageList<RecordType>> {
    return this.request({
      url: `${prefix}/admin-api/supplier/list`,
      method: 'post',
      data
    })
  }
}
