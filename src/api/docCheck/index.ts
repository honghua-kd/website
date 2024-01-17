import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'

import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type {
  DocumentPageRequest,
  SaveOrUpdateDocRequest,
  InitiateApprovalRequest,
  SystemParamConfigRequest,
  EditParamConfigRequest
} from './types/request'
import type {
  DocumentPageResponse,
  SystemParamConfigResponse,
  GetDocumentParamResponse
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
}
