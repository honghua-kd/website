import type { ITableConfigProps } from '@/components/Table/type'
import type { MortgageSubjectListResponse } from '@/api/mainPart/types/response'
type OptionItemType = {
  label: string
  value: string | number
}
export type StateType = {
  formModel: {
    contactAddressCityCode?: string
    contactAddressProvinceCode?: string
    mortgageSubjectName?: string
    pageNo: number
    pageSize: number
  }
  tableLoading: boolean
  tableColumn: ITableConfigProps[]
  tableData: MortgageSubjectListResponse[]
  tableActionList: OptionItemType[]
  pageTotal: number
  editModelVisible: boolean
  editModelTitle: string
  selectIdsArr: string[]
  detailData: object
  areaCode: string[]
}
export type ModelStateType = {
  dialogVisible: boolean
  editForm: object
  dialogTitle: string
}
