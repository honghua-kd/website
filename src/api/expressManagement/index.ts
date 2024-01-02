import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'

import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type {
  ExpressInfoCardListRequest,
  ExpressDetailInfoRequest,
  CheckExpressInfoRequest,
  DelExpressListRequest,
  ReceiveExpressInfoRequest,
  UsualAddressListRequest,
  DelUsualAddressRequest,
  AddUsualAddressRequest,
  ExportExpressRequest
} from './types/request'
import type {
  ExpressListItem,
  UsualAddressListItem,
  TraceList,
  ExpressDownLoad
} from './types/response'
import type { FileDownload, UploadFile } from '../common/types/response'
const prefix = '/operations-mortgage'

export class ExpressAPI {
  private request: AxiosInstance
  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 分页查询邮寄信息列表
  getExpressInfoCardList(
    data: ExpressInfoCardListRequest
  ): Response<PageList<ExpressListItem>> {
    return this.request({
      url: `${prefix}/admin-api/express/info/list`,
      method: 'post',
      data
    })
  }

  // 新增邮寄信息
  addExpressInfo(
    data: ExpressDetailInfoRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/express/info/add`,
      method: 'post',
      data
    })
  }

  // 编辑邮寄信息
  editExpressInfo(
    data: ExpressDetailInfoRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/express/info/update`,
      method: 'post',
      data
    })
  }

  // 查看邮寄信息详情
  checkExpressInfo(data: CheckExpressInfoRequest): Response<ExpressListItem> {
    return this.request({
      url: `${prefix}/admin-api/express/info/detail`,
      method: 'post',
      data
    })
  }

  // 删除邮寄信息
  delExpressInfo(
    data: DelExpressListRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/express/info/delete`,
      method: 'post',
      data
    })
  }

  // 批量接收邮寄信息
  batchReceiveExpressInfo(
    data: ReceiveExpressInfoRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/express/info/batch/receiving`,
      method: 'post',
      data
    })
  }

  // 获取物流信息详情
  getLogisticsInfo(data: CheckExpressInfoRequest): Response<TraceList> {
    return this.request({
      url: `${prefix}/admin-api/express/info/logistics/detail`,
      method: 'post',
      data
    })
  }

  // 快递内容编号自动生成
  getExpressContentNo(
    data: CheckExpressInfoRequest
  ): Response<string | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/express/info/content/number/auto`,
      method: 'post',
      data
    })
  }

  // 查询常用地址列表
  getUsualAddressList(
    data: UsualAddressListRequest
  ): Response<PageList<UsualAddressListItem>> {
    return this.request({
      url: `${prefix}/admin-api/express/usual/address/list`,
      method: 'post',
      data
    })
  }

  // 新增常用地址
  addUsualAddress(
    data: AddUsualAddressRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/express/usual/address/add`,
      method: 'post',
      data
    })
  }

  // 编辑常用地址
  editUsualAddress(
    data: AddUsualAddressRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/express/usual/address/update`,
      method: 'post',
      data
    })
  }

  // 删除常用地址
  delUsualAddress(
    data: DelUsualAddressRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/express/usual/address/delete`,
      method: 'post',
      data
    })
  }

  // 导入邮寄信息
  importPostInfo(
    data: DelUsualAddressRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgage/express/info/import`,
      method: 'post',
      data
    })
  }

  // 导出邮寄信息
  exportExpressContentInfo(
    data: ExportExpressRequest
  ): Response<ExpressDownLoad> {
    return this.request({
      url: `${prefix}/admin-api/express/info/export`,
      method: 'post',
      data
    })
  }

  // 快递内容导入
  importExpressContent(data: FormData): Response<UploadFile> {
    return this.request({
      url: `${prefix}/admin-api/express/info/content/import`,
      method: 'post',
      headers: {
        'Content-Type': 'application/form-data'
      },
      data
    })
  }

  // 其他附件下载
  downLoadOtherFile(data: CheckExpressInfoRequest): Promise<FileDownload> {
    return this.request({
      url: `${prefix}/admin-api/express/info/otherFile/export`,
      method: 'post',
      responseType: 'blob',
      data
    })
  }
}