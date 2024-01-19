import type {
  MortgageSubjectListRequest,
  MortgageSubjectListResponse,
  MortgageSubjectDetailResponse
} from '@/api'
export type StateType = {
  formModel: MortgageSubjectListRequest
  tableLoading: boolean
  tableData: MortgageSubjectListResponse[]
  pageTotal: number
  editModelVisible: boolean
  editModelTitle: string
  selectIdsArr: string[]
  detailData: MortgageSubjectDetailResponse
  areaCode: string[]
}
export type ModelStateType = {
  dialogVisible: boolean
  editForm: MortgageSubjectDetailResponse
  dialogTitle: string
  areaCode: string[]
}
