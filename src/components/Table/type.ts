type TableRecord = Record<string, any>
type CustomStyleType = Record<string, string>

interface ITableConfigProps {
  label: string
  prop: string
  align?: string
  headerIcon?: string | boolean
  slotName?: string
  showOverflowTooltip?: boolean
  fixed?: string | boolean
  type?: 'date' | 'text' | 'action'
  width?: string | number
  minWidth?: string | number
  hide?: boolean
  forbiddenEdit?: boolean
  customStyle?: CustomStyleType
  slotHeader?: string
}

interface IProps {
  columnConfig: ITableConfigProps[]
  data: TableRecord[]
  loading?: boolean
  height?: number
  isSelected?: boolean
  pageSize?: number
  pageNo?: number
  pageTotal?: number
  setColumnEnable?: boolean
}

type IColumnState = {
  checkAll: boolean
  checkedConfig: string[]
  checkboxTableConfig: ITableConfigProps[]
  isIndeterminate: boolean
  tableConfig: ITableConfigProps[]
}

export { TableRecord, CustomStyleType, IProps, IColumnState, ITableConfigProps }
