import type {
  AgencyListResponse,
  AgencyDetailResponse
} from '@/api/channel/types/response'
import type { CascaderOption } from 'element-plus'
export type OptionItemType = {
  label: string
  value: string | number
  children?: OptionItemType
}
type TableColumnType = {
  type: string
  label: string
  prop: string
  columnKey: string
  width: string
  minWidth: string
  fixed: boolean | string
  align: string
}
// export type RecordType<T = any> = Record<string, T>
export type sourceListItem = {
  label?: string | null | undefined
  value?: string | null | undefined
  chuildren?: {
    label: string | null | undefined
    value: string | null | undefined
  }[]
}
export type OptionItemTypeString = {
  label: string
  value: string
  children?: OptionItemTypeString
}
export type StateType = {
  formModel: {
    agencyName: string
    sourceSystem12List: string[]
    pageNo: number
    pageSize: number
    sourceSystem12ListParams: sourceListItem[]
  }
  sourceArr: CascaderOption[]
  tableLoading: boolean
  tableColumn: TableColumnType[]
  tableData: AgencyListResponse[] | undefined
  tableActionList: OptionItemType[]
  pageTotal: number | undefined
  editModelVisible: boolean
  editModelTitle: string
  selectIdsArr: string[]
  detailData: AgencyDetailResponse
  importVisible: boolean
}
export type ModelStateType = {
  dialogVisible: boolean
  editForm: AgencyDetailResponse
  dialogTitle: string
  systemSourceArr: CascaderOption[]
}
