import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response } from '../types/response'
import type { FilePreviewUrlRequest } from './types/request'
import type { UploadFile, FilePreviewList, DictList } from './types/response'
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
}
