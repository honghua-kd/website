import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'
import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type {
  SpecialListRequest,
  saveRequest,
  ChangeDetailResponse,
  OriginalDocResponse
} from './types/request'
import type { SpecialListItem } from './types/response'
// import type {CascaderOption} from 'element-plus'

const prefix = '/operations-mortgage/admin-api'
const specialPrefix = '/operations-management/admin-api'

export class SpecialConfigAPI {
  private request: AxiosInstance
  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 特殊文书配置列表
  getSpecialList(
    data: SpecialListRequest
  ): Response<PageList<SpecialListItem>> {
    return this.request({
      url: `${prefix}/mortgage-document-replace/page`,
      method: 'post',
      data
    })
  }

  // 修改状态
  changeStatus(data: FormData): Response<boolean | null> {
    return this.request({
      url: `${prefix}/mortgage-document-replace/status`,
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/form-data'
      }
    })
  }

  // 删除特殊文书配置
  delDocConfig(data: FormData): Response<boolean | null> {
    return this.request({
      url: `${prefix}/mortgage-document-replace/delete`,
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/form-data'
      }
    })
  }

  // 一级文书
  getOriginalDoc(data: FormData): Response<string[]> {
    return this.request({
      url: `${specialPrefix}/system-document/getByDocumentNameByType`,
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/form-data'
      }
    })
  }

  // 二级文书
  getOReplaceDoc(data: FormData): Response<Record<string, string | number>[]> {
    return this.request({
      url: `${specialPrefix}/system-document/getByDocumentByNameAndType`,
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/form-data'
      }
    })
  }

  // 获取文书详情
  getSpecialDetail(data: FormData): Response<ChangeDetailResponse> {
    return this.request({
      url: `${prefix}/mortgage-document-replace/detail`,
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/form-data'
      }
    })
  }

  // 保存或编辑
  saveOrUpdate(data: saveRequest): Response<OriginalDocResponse> {
    return this.request({
      url: `${prefix}/mortgage-document-replace/saveOrUpdate`,
      method: 'post',
      data
    })
  }
}
