import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'

import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type {
  DocumentPageRequest,
  SaveOrUpdateDocRequest,
  SystemParamConfigRequest,
  EditParamConfigRequest,
  getTemplatePageRequest,
  SaveRequest,
  DeleteIdsRequest,
  MortgageSubjectRequest,
  InitiateApprovalRequest
} from './types/request'
import type {
  DocumentPageResponse,
  SystemParamConfigResponse,
  GetDocumentParamResponse,
  MortgageDocumentVO,
  DeleteResponse,
  MortgageSubjectInfoVO,
  DocumentNameResponse,
  SystemDocumentVO
} from './types/response'
import type { FileDownload } from '@/api'
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

  // 发起审核
  initiateApproval(
    data: InitiateApprovalRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/system-document/initiateApproval`,
      method: 'post',
      data
    })
  }

  // 修改状态
  editStatus(data: FormData): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/system-document/status`,
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/form-data'
      }
    })
  }

  // 测试文书
  testDocument(data: FormData): Promise<FileDownload> {
    return this.request({
      url: `${prefix}/admin-api/system-document/testDocument`,
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/form-data'
      },
      responseType: 'blob'
    })
  }

  // 获取文书参数
  getDocumentParam(data: FormData): Response<GetDocumentParamResponse[]> {
    return this.request({
      url: `${prefix}/admin-api/system-document/getDocumentParam`,
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/form-data'
      }
    })
  }

  // 获取文书参数配置
  getDocumentParamConfig(
    data: SystemParamConfigRequest
  ): Response<SystemParamConfigResponse[]> {
    return this.request({
      url: `${prefix}/admin-api/system-document/getDocumentParamConfig`,
      method: 'post',
      data
    })
  }

  // 配置文书参数
  paramConfig(
    data: EditParamConfigRequest[]
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/system-document/paramConfig`,
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
