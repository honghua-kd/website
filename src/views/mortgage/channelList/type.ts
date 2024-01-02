import type {
  AgencyListResponse,
  AgencyDetailResponse
} from '@/api/channel/types/response'
type OptionItemType = {
  label: string
  value: string | number
}
type TableColumnType = {
  type: string
  label: string
  prop: string
  columnKey: string
  width: string
  minWidth: string
  fixed: boolean
  align: string
}
// export type RecordType<T = any> = Record<string, T>
export type StateType = {
  formModel: {
    agencyName: string
    sourceSystem1: string
    sourceSystem2: string
    pageNo: number
    pageSize: number
  }
  sourceArr: OptionItemType[]
  tableLoading: boolean
  tableColumn: TableColumnType[]
  tableData: AgencyListResponse[] | undefined
  tableActionList: OptionItemType[]
  pageTotal: number | undefined
  editModelVisible: boolean
  editModelTitle: string
  selectIdsArr: string[]
  detailData: AgencyDetailResponse
}
export type ModelStateType = {
  dialogVisible: boolean
  editForm: AgencyDetailResponse
  dialogTitle: string
}
