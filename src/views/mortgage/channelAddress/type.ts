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
  align: string
}
export type RecordType<T = any> = Record<string, T>
export type StateType = {
  formModel: {
    name: string
    source: string
    areaCode: number[]
  }
  sourceArr: OptionItemType[]
  tableLoading: boolean
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
