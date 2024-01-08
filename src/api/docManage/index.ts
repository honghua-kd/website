import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'

import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type { DocumentPageRequest } from './types/request'
import type { DocumentPageResponse } from './types/response'

const prefix = '/operations-mortgage'
export class DocumentAPI {
  private request: AxiosInstance
  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 渠道商/办事处名单-列表
  getAgencyList(
    data: DocumentPageRequest
  ): Response<PageList<DocumentPageResponse>> {
    return this.request({
      url: `${prefix}/admin-api/system-document/page`,
      method: 'post',
      data
    })
  }
}
