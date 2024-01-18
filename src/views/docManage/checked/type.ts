import type { DocumentPageRequest } from '@/api/docCheck/types/request'
import type { DocumentPageResponse } from '@/api/docCheck/types/response'
import type { DictListItem, ApprovalPathResponse } from '@/api'
export type StateType = {
  queryParams: DocumentPageRequest
  pageTotal: number
  tableData: DocumentPageResponse[]
  tableLoading: boolean
  selectIdsArr: string[]
  systemOptions: DictListItem[]
  detailData: DocumentPageResponse
  importVisible: boolean
  pathOptions: ApprovalPathResponse[]
}
