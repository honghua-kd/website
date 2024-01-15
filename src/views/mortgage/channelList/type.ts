import type {
  AgencyListResponse,
  AgencyDetailResponse
} from '@/api/channel/types/response'
import type { CascaderOption } from 'element-plus'
import type { ITableConfigProps } from '@/components/Table/type'
export type OptionItemType = {
  label: string
  value: string | number
  children?: OptionItemType
}
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
  children?: OptionItemTypeString[]
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
  tableColumn: ITableConfigProps[]
  tableData: AgencyListResponse[]
  pageTotal: number
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
