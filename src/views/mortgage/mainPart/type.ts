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
    name: string
    source: string
  }
  sourceArr: OptionItemType[]
  actionList: OptionItemType[]
  tableColumn: TableColumnType[]
  tableData: RecordType[]
  pageTotal: number
  editModelVisible: boolean
}
export type ModelStateType = {
  dialogVisible: boolean
  editForm: RecordType
}
