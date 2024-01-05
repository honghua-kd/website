import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'
import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type {
  NoticeIds,
  NoticeBaseRequest,
  NoticeListPageRequest,
  ChangeNoticeStatusRequest
} from './types/request'
import type { NoticeListItem } from './types/response'

const prefix = '/operations-management'

export class NoticeCenterAPI {
  private request: AxiosInstance
  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 消息中心列表查询分页
  getNoticeList(
    data: NoticeListPageRequest
  ): Response<PageList<NoticeListItem>> {
    return this.request({
      url: `${prefix}/admin-api/system/notice-center/page`,
      method: 'post',
      data
    })
  }

  // 批量更新消息状态接口(已读，未读)
  changeNoticeStatus(data: ChangeNoticeStatusRequest): Response<boolean> {
    return this.request({
      url: `${prefix}/admin-api/system/notice-center/change-status`,
      method: 'post',
      data
    })
  }

  // 批量删除消息
  deleteNotice(data: NoticeIds): Response<boolean> {
    return this.request({
      url: `${prefix}/admin-api/system/notice-center/delete`,
      method: 'post',
      data
    })
  }

  // 消息中心列表查询全量
  getAllNotice(data: NoticeBaseRequest): Response<NoticeListItem[]> {
    return this.request({
      url: `${prefix}/admin-api/system/notice-center/all`,
      method: 'post',
      data
    })
  }

  // 消息数量查询
  getNoticeCount(data: NoticeBaseRequest): Response<number> {
    return this.request({
      url: `${prefix}/admin-api/system/notice-center/count`,
      method: 'post',
      data
    })
  }
}
