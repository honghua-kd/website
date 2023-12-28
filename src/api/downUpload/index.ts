import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'

import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'

import type { UploadFileRequest, downParms } from './types/request'
import type { ImportTableItem, ExportTableItem } from './types/response'

import type { FileDownload } from '../common/types/response'

const prefix = '/operations-management/admin-api'

export class RecordAPI {
  private request: AxiosInstance
  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 页面异步导入记录查询
  uploadImportRecordPage(
    data: UploadFileRequest
  ): Response<PageList<ImportTableItem>> {
    return this.request({
      url: `${prefix}/import/file/record/page`,
      method: 'post',
      data
    })
  }

  // 页面异步导出记录查询
  uploadExportRecordPage(
    data: UploadFileRequest
  ): Response<PageList<ExportTableItem>> {
    return this.request({
      url: `${prefix}/export/file/record/page`,
      method: 'post',
      data
    })
  }

  // 下载接口
  downLoadFiles(data: downParms): Promise<FileDownload> {
    return this.request({
      url: `${prefix}/file/attachment/downloadAttachment`,
      method: 'post',
      responseType: 'blob',
      params: data
    })
  }
}
