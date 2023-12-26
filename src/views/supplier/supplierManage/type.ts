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
    companyName: string
    belongCompany: string
    province: string
    city: string
    area: string
    status: string
    type: string
    expireTime: string
    inPerson: string
  }
  statusArr: OptionItemType[]
  typeArr: OptionItemType[]
  actionList: OptionItemType[]
  tableColumn: TableColumnType[]
  tableData: RecordType[]
  pageTotal: number
  editModelVisible: boolean
}
