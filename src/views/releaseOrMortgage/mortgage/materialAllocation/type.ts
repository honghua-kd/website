import type { AgencyDetailResponse } from '@/api/materialAllocation/types/response'

type SearchList = {
  pageNo: number
  pageSize: number
  name?: string
}
export type tableDataType = {
  id: number
  name: string
  status: number
  businessSubcategory: string
  person: string
  moneyType: string
  rent: string
  bussiness: string
}
export type RuleForm = {
  name: string
  region: string
  count: string
  date1: string
  date2: string
  delivery: boolean
  type: string[]
  resource: string
  desc: string
}
export type StateType = {
  queryParams: SearchList
  tableData: tableDataType[]
  pageTotal: number
  detailData: AgencyDetailResponse
}

export type ModelPropsType = {
  visible: boolean
  formValue: AgencyDetailResponse
  title: string
  // sourceArr: CascaderOption[]
}
export type ModelStateType = {
  editForm: AgencyDetailResponse
}
