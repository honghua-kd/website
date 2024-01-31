import type {
  DocumentPageRequest,
  EditParamConfigList
} from '@/api/docCheck/types/request'
import type {
  DocumentPageResponse,
  GetDocumentParamResponse
} from '@/api/docCheck/types/response'
import type { RuleConditionBusiConfigDto } from '@/api/message/types/response'
import type { DictListItem } from '@/api'
import type { CascaderOption } from 'element-plus'
export type StateType = {
  queryParams: DocumentPageRequest
  pageTotal: number
  tableData: DocumentPageResponse[]
  tableLoading: boolean
  selectIdsArr: string[]
  systemOptions: DictListItem[]
  configVisible: boolean
  paramConfig: RuleConditionBusiConfigDto[]
  documentNo: string
  paramsConfigDetail: GetDocumentParamResponse[]
}

export type ConfigStateType = {
  dialogVisible: boolean
  configCascaderOptions: CascaderOption[]
  saveListForm: {
    saveListInfo: EditParamConfigList[]
  }
  itemIndex: number
}
