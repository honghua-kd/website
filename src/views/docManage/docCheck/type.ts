import type {
  DocumentPageRequest,
  SaveOrUpdateDocRequest
} from '@/api/docCheck/types/request'
import type { DocumentPageResponse } from '@/api/docCheck/types/response'
import type { DictListItem } from '@/api'
export type StateType = {
  queryParams: DocumentPageRequest
  pageTotal: number
  tableData: DocumentPageResponse[]
  tableLoading: boolean
  selectIdsArr: string[]
  editModelVisible: boolean
  editModelTitle: string
  documentTypeOptions: DictListItem[]
  systemOptions: DictListItem[]
  sealOptions: DictListItem[]
}

export type EditDocInfo = {
  documentName: string
  documentType: string
  sourceSystem1: string[]
  sealType: string
}
export type ModelStateType = {
  dialogVisible: boolean
  docInfoForm: EditDocInfo
  saveListInfo: SaveOrUpdateDocRequest[]
}
