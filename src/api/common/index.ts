import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response } from '../types/response'
import type {
  FilePreviewUrlRequest,
  ExportAssetStageResultRequest,
  RecordRequest,
  RelationListRequest,
  BatchExportRequest,
  DictTreeRequest
} from './types/request'
import type {
  UploadFile,
  FilePreviewList,
  DictList,
  RecordList,
  FileDownload,
  RelationListItem,
  DictDataTreeResponse
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

  // 批量上传文件 Response<UploadFile>
  uploadFilesBatch(data: FormData): Response<UploadFile> {
    return this.request({
      url: `${prefix}/admin-api/file/attachment/uploadBatch`,
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
      data
    })
  }

  // 获取单个文件预览地址链接-decode
  getSinglePreviewURL(data: { fileCode?: string }): Response<FilePreviewList> {
    return this.request({
      url: `${prefix}/admin-api/file/attachment/getAttachmentPreviewDecode`,
      method: 'post',
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
  ): Promise<FileDownload> {
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

  // 异步上传导入
  getAsyncImport(data: FormData): Response<UploadFile> {
    return this.request({
      url: `${prefix}/admin-api/import/file/record/importAsync`,
      method: 'post',
      headers: {
        'Content-Type': 'application/form-data'
      },
      data
    })
  }

  // 附件关系信息列表
  getRelationList(data: RelationListRequest): Response<RelationListItem[]> {
    return this.request({
      url: `${prefix}/admin-api/system/attachment/relation/list`,
      method: 'post',
      data
    })
  }

  // 下载接口
  downLoadFiles(data: Pick<RecordList, 'fileCode'>): Promise<FileDownload> {
    return this.request({
      url: `${prefix}/admin-api/file/attachment/downloadAttachment`,
      method: 'post',
      responseType: 'blob',
      params: data
    })
  }

  // 通用打包下载接口
  batchExport(data: BatchExportRequest): Promise<FileDownload> {
    return this.request({
      url: `${prefix}/admin-api/file/attachment/batchExport`,
      method: 'post',
      responseType: 'blob',
      data
    })
  }

  // 查询树形字典数据
  getDictTreeList(data: DictTreeRequest): Response<DictDataTreeResponse> {
    return this.request({
      url: `${prefix}/admin-api/system/dict-data/tree`,
      method: 'post',
      data
    })
  }
}
