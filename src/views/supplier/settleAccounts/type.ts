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
}
export type RecordType<T = any> = Record<string, T>
export type StateType = {
  formModel: {
    supplierName: string
    city: string
    status: string
    mortgageMain: string
    contractBelong: string
    contractCode: string
    orderType: string
    finishTime: string
  }
  statusArr: OptionItemType[]
  ordertypeArr: OptionItemType[]
  mortgageMainArr: OptionItemType[]
  contractBelongArr: OptionItemType[]
  actionList: OptionItemType[]
  tableColumn: TableColumnType[]
  tableData: RecordType[]
  pageTotal: number
  dialogVisible: boolean
}
