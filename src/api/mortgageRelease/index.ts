import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'
import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type {
  VehiRegisterCardListRequest,
  DelRegisterCardRequest,
  GetRegisterCardInfoRequest,
  EditRegisterCardInfoRequest
} from './types/request'
import type { CardInfoIO, CardListItem } from './types/response'

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
  ): Response<PageList<CardListItem>> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/vehicleRegisterCard/list`,
      method: 'post',
      data
    })
  }

  // 删除车辆登记证数据
  delRegisterCard(
    data: DelRegisterCardRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/vehicleRegisterCard/delete`,
      method: 'post',
      data
    })
  }

  // 获取车辆登记证信息
  getRegisterCardInfo(data: GetRegisterCardInfoRequest): Response<CardInfoIO> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/vehicleRegisterCard/getInfo`,
      method: 'post',
      data
    })
  }

  // 编辑车辆登记证信息
  editRegisterCardInfo(
    data: EditRegisterCardInfoRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/vehicleRegisterCard/edit`,
      method: 'post',
      data
    })
  }

  // 归档
  achiveRegisterCard(
    data: DelRegisterCardRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/vehicleRegisterCard/archive`,
      method: 'post',
      data
    })
  }
}
