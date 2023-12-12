import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'
import type { DictsRequest } from '../types/request'

import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type {
  VehiRegisterCardListRequest,
  DelRegisterCardRequest,
  GetRegisterCardInfoRequest,
  EditRegisterCardInfoRequest,
  UploadFileRequest,
  FilePreviewUrlRequest,
  MortgageeType
} from './types/request'
import type {
  FormOrigin,
  CardListItem,
  UploadFile,
  FilePreviewList,
  DictList,
  MortgageeItem,
  CardCell
} from './types/response'
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

  // 上传文件
  uploadFiles(data: FormData): Response<UploadFile> {
    return this.request({
      url: `${prefix}/admin-api/file/attachment/uploadAttachment`,
      method: 'post',
      headers: {
        'Content-Type': 'application/form-data'
      },
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
  ): Promise<string | ArrayBuffer | ArrayBufferView | Blob> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/vehicleRegisterCard/export`,
      method: 'post',
      responseType: 'blob',
      data
    })
  }

  // 批量获取附件预览链接
  getPreviewUrl(data: FilePreviewUrlRequest): Response<FilePreviewList> {
    return this.request({
      url: `${prefix}/admin-api/file/attachment/batchGetAttachmentPreview`,
      method: 'post',
      data
    })
  }

  // 批量获取数据字典
  getDictsList(data: DictsRequest): Response<DictList> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-data/batchList`,
      method: 'post',
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
