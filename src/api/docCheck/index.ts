import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'

import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type {
  DocumentPageRequest,
  SaveOrUpdateDocRequest,
  getTemplatePageRequest,
  SaveRequest,
  DeleteIdsRequest,
  MortgageSubjectRequest
} from './types/request'
import type {
  DocumentPageResponse,
  MortgageDocumentVO,
  DeleteResponse,
  MortgageSubjectInfoVO,
  DocumentNameResponse,
  SystemDocumentVO
} from './types/response'

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

  // 文书模板分页查询
  getDocumentTemplatePage(
    data: getTemplatePageRequest
  ): Response<PageList<MortgageDocumentVO>> {
    return this.request({
      url: `${prefix}/admin-api/mortgage-document-template/page`,
      method: 'post',
      data
    })
  }

  // 删除文书模板
  editDocumentTemplateDelete(data: DeleteIdsRequest): Response<DeleteResponse> {
    return this.request({
      url: `${prefix}/admin-api/mortgage-document-template/delete`,
      method: 'post',
      data
    })
  }

  // 文书模板修改状态
  updateDocumentTemplateStatus(
    data: FormData
  ): Response<PageList<DeleteResponse>> {
    return this.request({
      url: `${prefix}/admin-api/mortgage-document-template/status`,
      method: 'post',
      headers: {
        'Content-Type': 'application/form-data'
      },
      data
    })
  }

  // 文书模板修改
  saveOrUpdateDocumentTemplate(
    data: SaveRequest
  ): Response<PageList<DeleteResponse>> {
    return this.request({
      url: `${prefix}/admin-api/mortgage-document-template/saveOrUpdate`,
      method: 'post',
      data
    })
  }

  // 查询抵押主体(全量)
  queryMortgageSubject(
    data: MortgageSubjectRequest
  ): Response<MortgageSubjectInfoVO[]> {
    return this.request({
      url: `${prefix}/admin-api/mortgageSubject/queryMortgageSubject`,
      method: 'post',
      data
    })
  }

  // 根据文书类型获取文书名称
  getByDocumentNameByType(data: FormData): Response<DocumentNameResponse> {
    return this.request({
      url: `/operations-management/admin-api/system-document/getByDocumentNameByType`,
      method: 'post',
      headers: {
        'Content-Type': 'application/form-data'
      },
      data
    })
  }

  // 根据文书类型，文书名称获取文书信息
  getByDocumentByNameAndType(data: FormData): Response<SystemDocumentVO[]> {
    return this.request({
      url: `/operations-management/admin-api/system-document/getByDocumentByNameAndType`,
      method: 'post',
      headers: {
        'Content-Type': 'application/form-data'
      },
      data
    })
  }
}
