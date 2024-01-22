import type { CascaderOption } from 'element-plus'
import type {
  AgencyAddressListResponse,
  AgencyAddressDetailResponse
} from '@/api/channel/types/response'
import type { ITableConfigProps } from '@/components/Table/type'
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
  tableColumn: ITableConfigProps[]
  tableData: AgencyAddressListResponse[]
  pageTotal: number
  editModelVisible: boolean
  editModelTitle: string
  selectIdsArr: string[]
  detailData: AgencyAddressDetailResponse
  importVisible: boolean
}
export type ModelStateType = {
  dialogVisible: boolean
  editForm: AgencyAddressDetailResponse
  dialogTitle: string
  systemSourceArr: CascaderOption[]
}
