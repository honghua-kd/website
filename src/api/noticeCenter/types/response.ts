export interface NoticeListItem {
  content: string
  createTime: string
  flowId: string
  id: string
  receiver: string
  receiverName: string
  router: string
  routerParam: Record<string, string>
  sender: string
  senderName: string
  status: number
  title: string
  type: number
}
