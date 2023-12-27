type OptionItemType = {
  label: string
  value: string
}
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
export type RecordType<T = any> = Record<string, T>
export type StateType = {
  formModel: {
    supplierName: string
    belongCompany: string
    provinceCode: number
    cityCode: number
    countyCode: number
    status: number
    supplierType: number
    expireDateStart: string
    expireDateEnd: string
    innerInterfaceStaffCode: string
    expireDate: string
  }
  statusArr: OptionItemType[]
  typeArr: OptionItemType[]
  actionList: OptionItemType[]
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
