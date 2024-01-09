import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'
import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type { SpecialListRequest, ChangeStatusRequest } from './types/request'
import type { SpecialListItem } from './types/response'

const prefix = '/operations-mortgage/admin-api'

export class SpecialConfigAPI {
  private request: AxiosInstance
  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 特殊文书配置列表
  getSpecialList(
    data: SpecialListRequest
  ): Response<PageList<SpecialListItem>> {
    return this.request({
      url: `${prefix}/mortgage-document-replace/page`,
      method: 'post',
      data
    })
  }

  // 修改状态
  changeStatus(data: ChangeStatusRequest): Response<boolean | null> {
    return this.request({
      url: `${prefix}/mortgage-document-replace/status`,
      method: 'post',
      data
    })
  }

  // 删除特殊文书配置
  delDocConfig(
    data: Pick<ChangeStatusRequest, 'batchNo'>
  ): Response<boolean | null> {
    return this.request({
      url: `${prefix}/mortgage-document-replace/delete`,
      method: 'post',
      data
    })
  }
}
