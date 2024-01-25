import type {
  DocumentPageRequest,
  SaveOrUpdateDocRequest
} from '@/api/docCheck/types/request'
import type { DocumentPageResponse } from '@/api/docCheck/types/response'
import type { DictListItem, ApprovalPathResponse } from '@/api'
export type StateType = {
  queryParams: DocumentPageRequest
  pageTotal: number
  tableData: DocumentPageResponse[]
  tableLoading: boolean
  selectIdsArr: string[]
  editModelVisible: boolean
  editModelTitle: string
  systemOptions: DictListItem[]
  detailData: DocumentPageResponse
  importVisible: boolean
  pathOptions: ApprovalPathResponse[]
  approvalDialogVisible: boolean
  documentNos: string[]
}

export type EditDocInfo = {
  documentName: string
  documentType: string
  sourceSystem1: string[]
  sealType: string[]
  saveListInfo: SaveOrUpdateDocRequest[]
}
export type ModelStateType = {
  dialogVisible: boolean
  docInfoForm: EditDocInfo
  importVisible: boolean
  uploadItemIndex: number
}
