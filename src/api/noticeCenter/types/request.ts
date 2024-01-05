import { PageRequest } from '@/api/types/request'

export interface NoticeBaseRequest {
  /**
   * 接收人，消息接收人
   */
  receiver?: string
  /**
   * 状态，已读，未读
   */
  status?: number | null
  /**
   * 消息类型
   */
  type?: number | null
}
// 消息中心列表查询分页
export type NoticeListPageRequest = NoticeBaseRequest & PageRequest

export interface NoticeIds {
  /**
   * id，id数组
   */
  ids: string[]
}
export interface ChangeNoticeStatusRequest extends NoticeIds {
  /**
   * 消息状态，已读_1，未读_0
   */
  status: number
}
