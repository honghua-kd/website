import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'

import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type {
  VehiRegisterCardListRequest,
  DelRegisterCardRequest,
  GetRegisterCardInfoRequest,
  EditRegisterCardInfoRequest,
  UploadFileRequest,
  MortgageeType
} from './types/request'
import type {
  FormOrigin,
  CardListItem,
  MortgageeItem,
  CardCell
} from './types/response'

import type { FileDownload } from '../common/types/response'

const prefix = '/operations-mortgage'

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
      headers: {
        token: 'cb7716a22374ad4bc3acd59621f80b4d', // 联调使用
        'SSO-TOKEN': 'cb7716a22374ad4bc3acd59621f80b4d' // 联调使用
      },
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
  getRegisterCardInfo(
    data: GetRegisterCardInfoRequest
  ): Response<FormOrigin & Pick<CardCell, 'fileName' | 'fileCode'>> {
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

  // 识别 & 核验接口

  uploadRegisterCard(
    data: UploadFileRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/vehicleRegisterCard/upload`,
      method: 'post',
      data
    })
  }

  // 导出识别结果接口
  downLoadFiles(
    data: Omit<VehiRegisterCardListRequest, 'pageNo' | 'pageSize'>
  ): Promise<FileDownload> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/vehicleRegisterCard/export`,
      method: 'post',
      responseType: 'blob',
      data
    })
  }

  getMortgageList(data: MortgageeType): Response<MortgageeItem[]> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/mortgagee/list`,
      method: 'post',
      data
    })
  }
}
