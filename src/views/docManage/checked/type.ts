import type {
  DocumentPageRequest,
  SaveOrUpdateDocRequest,
  EditParamConfigList
} from '@/api/docCheck/types/request'
import type {
  DocumentPageResponse,
  GetDocumentParamResponse,
  SystemParamConfigResponse
} from '@/api/docCheck/types/response'
import type { DictListItem } from '@/api'
import type { CascaderOption } from 'element-plus'
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
  configVisible: boolean
  paramConfig: SystemParamConfigResponse[]
  documentNo: string
  paramsConfigDetail: GetDocumentParamResponse[]
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
}

export type ConfigStateType = {
  dialogVisible: boolean
  configCascaderOptions: CascaderOption[]
  saveListForm: {
    saveListInfo: EditParamConfigList[]
  }
  itemIndex: number
}
