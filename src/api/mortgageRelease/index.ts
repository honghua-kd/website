import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'
import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type { VehiRegisterCardListRequest } from './types/request'
import type { CardInfoIO } from './types/response'

const prefix = import.meta.env.VITE_APP_SERVICE_API

export class MortageAPI {
  private request: AxiosInstance
  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 分页查询车辆登记证信息列表
  getVehiRegisterCardList(
    data: VehiRegisterCardListRequest
  ): Response<PageList<CardInfoIO>> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/vehicleRegisterCard/list`,
      method: 'post',
      data
    })
  }
}
