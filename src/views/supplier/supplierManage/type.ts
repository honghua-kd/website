// type OptionItemType = {
//   label: string
//   value: number | string
// }
type TableColumnType = {
  type: string
  label: string
  prop: string
  columnKey: string
  width: string
  minWidth: string
  fixed: boolean
  tooltip: boolean
}
export interface queryForm {
  name: string
  belongCompany: string
  provinceCode: number | ''
  cityCode: number | ''
  countyCode: number | ''
  status: number | ''
  expireDateStart: string
  expireDateEnd: string
  innerInterfaceStaffCode: string
  areaCode: number[]
  type: number | ''
  pageNo: number
  pageSize: number
}
export type RecordType<T = unknown> = Record<string, T>
export type StateType = {
  formModel: {
    name: string
    belongCompany: string
    provinceCode: number | ''
    cityCode: number | ''
    countyCode: number | ''
    status: number | ''
    expireDateStart: string
    expireDateEnd: string
    innerInterfaceStaffCode: string
    areaCode: number[]
    type: number | ''
    pageNo: number
    pageSize: number
  }
  tableColumn: TableColumnType[]
  tableData: RecordType[]
  pageTotal: number
  editModelVisible: boolean
}
export type ModelStateType = {
  dialogVisible: boolean
  editForm: RecordType
  step: number
  cancelButtonText: string
  okButtonText: string
  personColumn: TableColumnType[]
  personTableData: RecordType[]
  personModelVisible: boolean
  personTotal: number

  settlementColumn: TableColumnType[]
  settlementTableData: RecordType[]
  settlementModelVisible: boolean
  settlementTotal: number
}
export type PersonModelStateType = {
  dialogVisible: boolean
  editForm: RecordType
}
