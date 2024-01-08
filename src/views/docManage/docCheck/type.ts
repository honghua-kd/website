import type { DocumentPageRequest } from '@/api/docManage/types/request'
import type { DocumentPageResponse } from '@/api/docManage/types/response'
export type StateType = {
  queryParams: DocumentPageRequest
  pageTotal: number
  tableData: DocumentPageResponse[]
  tableLoading: boolean
  selectIdsArr: string[]
}
