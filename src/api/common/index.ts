import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response } from '../types/response'
import type {
  FilePreviewUrlRequest,
  ExportAssetStageResultRequest,
  RecordRequest
} from './types/request'
import type {
  UploadFile,
  FilePreviewList,
  DictList,
  RecordList
} from './types/response'
import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type { DictsRequest } from '../types/request'

const prefix = '/operations-management'

export class CommonAPI {
  private request: AxiosInstance
  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 上传文件 Response<UploadFile>
  uploadFiles(data: FormData): Response<UploadFile> {
    return this.request({
      url: `${prefix}/admin-api/file/attachment/upload`,
      method: 'post',
      headers: {
        'Content-Type': 'application/form-data'
      },
      data
    })
  }

  // 批量获取附件预览链接
  getPreviewUrl(data: FilePreviewUrlRequest): Response<FilePreviewList> {
    return this.request({
      url: `${prefix}/admin-api/file/attachment/batchGetAttachmentPreview`,
      method: 'post',
      // headers: {
      //   token: 'cb7716a22374ad4bc3acd59621f80b4d', // 联调使用
      //   'SSO-TOKEN': 'cb7716a22374ad4bc3acd59621f80b4d' // 联调使用
      // },
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

  // 文件导入结果下载
  getExportAssetStageResult(
    data: ExportAssetStageResultRequest
  ): Response<DictList> {
    return this.request({
      url: `${prefix}/admin-api/import/file/exportAssetStageResult`,
      method: 'post',
      data
    })
  }

  // 根据文件名下载指定模板文件
  getDownLoadTemplate(
    data: Omit<ExportAssetStageResultRequest, 'batchNo'>
  ): Response<DictList> {
    return this.request({
      url: `${prefix}/admin-api/import/file/downloadTemplate`,
      method: 'post',
      responseType: 'blob',
      data
    })
  }

  // 异步导入记录查询
  getAsyncImportRecord(data: RecordRequest): Response<RecordList> {
    return this.request({
      url: `${prefix}/admin-api/import/file/record/page`,
      method: 'post',
      data
    })
  }

  // 异步导出记录查询
  getAsyncExportRecord(
    data: RecordRequest
  ): Response<Omit<RecordList, 'batchNo' | 'msg'>> {
    return this.request({
      url: `${prefix}/admin-api/export/file/record/page`,
      method: 'post',
      data
    })
  }
}
