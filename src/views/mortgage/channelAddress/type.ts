import type { CascaderOption } from 'element-plus'
import type {
  AgencyAddressListResponse,
  AgencyAddressDetailResponse
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
  fixed: boolean | string
  align: string
}
export type RecordType<T = any> = Record<string, T>
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
    agencyCode: string
    agencyName: string
    cityCode: string
    cityName: string
    pageNo: number
    pageSize: number
    provinceCode: string
    provinceName: string
    sourceSystem12ListParams: {
      label?: string | null | undefined
      value?: string | null | undefined
      chiuldren?: {
        label: string | null | undefined
        value: string | null | undefined
      }
    }[]
    sourceSystem12List: string[]
    areaCodeparams: string[]
  }
  sourceArr: CascaderOption[]
  tableLoading: boolean
  tableColumn: TableColumnType[]
  tableData: AgencyAddressListResponse[] | undefined
  tableActionList: OptionItemType[]
  pageTotal: number | undefined
  editModelVisible: boolean
  editModelTitle: string
  selectIdsArr: string[]
  detailData: AgencyAddressDetailResponse
  importVisible: boolean
}
export type ModelStateType = {
  dialogVisible: boolean
  editForm: RecordType
  dialogTitle: string
  systemSourceArr: CascaderOption[]
}
