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
  fixed: boolean
}
export type RecordType<T = any> = Record<string, T>
export type StateType = {
  formModel: {
    agencyName: string
    sourceSystem1: string
    sourceSystem2: string
    pageNo: number
    pageSize: number
  }
  sourceArr: OptionItemType[]
  actionList: OptionItemType[]
  tableColumn: TableColumnType[]
  tableData: RecordType[]
  tableActionList: OptionItemType[]
  pageTotal: number
  editModelVisible: boolean
  editModelTitle: string
}
export type ModelStateType = {
  dialogVisible: boolean
  editForm: RecordType
  dialogTitle: string
}
