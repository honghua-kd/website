import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response } from '../types/response'

import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'

import type {
  SmsTemplateRequest,
  DictTreeRequest,
  CreateTemplateRequest,
  UpdateTemplateRequest,
  StatusRequest,
  DeleteRequest,
  SendMessageRequest,
  ExportSendRequest
} from './types/request'
import type {
  Data,
  DictDataTreeRespVO,
  CreateResponse,
  UpdateResponse,
  SendData
} from './types/response'

import type { FileDownload } from '../common/types/response'

const prefix = '/operations-management/admin-api'

export class MessageAPI {
  private request: AxiosInstance
  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 查询树形字典数据 来源系统
  getSystemDictTree(data: DictTreeRequest): Response<DictDataTreeRespVO[]> {
    return this.request({
      url: `${prefix}/system/dict-data/tree`,
      method: 'post',
      data
    })
  }

  // 获得短信模板分页
  getSmsTemplatePage(data: SmsTemplateRequest): Response<Data> {
    return this.request({
      url: `${prefix}/system/sms-template/page`,
      method: 'post',
      data
    })
  }

  // 创建短信模板
  createSmsTemplate(data: CreateTemplateRequest): Response<CreateResponse> {
    return this.request({
      url: `${prefix}/system/sms-template/create`,
      method: 'post',
      data
    })
  }

  // 更新短信模板
  updateSmsTemplate(data: UpdateTemplateRequest): Response<UpdateResponse> {
    return this.request({
      url: `${prefix}/system/sms-template/update`,
      method: 'post',
      data
    })
  }

  // 短信模板停用/启用
  updateChangeStatus(data: StatusRequest): Response<CreateResponse> {
    return this.request({
      url: `${prefix}/system/sms-template/changeStatus`,
      method: 'post',
      data
    })
  }

  // 删除短信模板
  deleteSmsTemplate(data: DeleteRequest): Response<UpdateResponse> {
    return this.request({
      url: `${prefix}/system/sms-template/delete`,
      method: 'post',
      data
    })
  }

  // 发送记录查询页
  getSendPageRecord(data: SendMessageRequest): Response<SendData> {
    return this.request({
      url: `${prefix}/system/sms-send/pageRecord`,
      method: 'post',
      data
    })
  }

  // 消息记录页导出
  exportExcelSendMessage(data: ExportSendRequest): Promise<FileDownload> {
    return this.request({
      url: `${prefix}/system/sms-send/exportExcel`,
      method: 'post',
      responseType: 'blob',
      data
    })
  }
}
