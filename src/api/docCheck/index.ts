import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'

import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type {
  DocumentPageRequest,
  SaveOrUpdateDocRequest
} from './types/request'
import type { DocumentPageResponse } from './types/response'

const prefix = '/operations-management'
export class DocCheckAPI {
  private request: AxiosInstance
  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 分页查询文书信息
  getDocumentList(
    data: DocumentPageRequest
  ): Response<PageList<DocumentPageResponse>> {
    return this.request({
      url: `${prefix}/admin-api/system-document/page`,
      method: 'post',
      data
    })
  }

  // 保存或编辑文书信息
  saveOrUpdateDocument(
    data: SaveOrUpdateDocRequest[]
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/system-document/saveOrUpdate`,
      method: 'post',
      data
    })
  }

  // 删除已审文书
  deleteDocument(data: FormData): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/system-document/delete`,
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/form-data'
      }
    })
  }
}
