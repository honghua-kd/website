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
}

export type EditDocInfo = {
  documentName: string
  documentType: string
  sourceSystem1: string[]
  sealType: string[]
}
export type ModelStateType = {
  dialogVisible: boolean
  docInfoForm: EditDocInfo
  saveListForm: {
    saveListInfo: SaveOrUpdateDocRequest[]
  }
  listDialogvisible: boolean
  importVisible: boolean
  uploadItemIndex: number
  approvalDialogVisible: boolean
  documentNos: string[]
}
