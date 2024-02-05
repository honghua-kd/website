import type { TableProps, TableColumnCtx } from 'element-plus'

export type TableDataItem = Record<string, unknown>

export type TableColumn = TableColumnCtx<TableDataItem>

export interface ColumnsProps extends Partial<TableColumn> {
  type?: 'selection' | 'index' | 'expand' | 'date' | 'action'
  isDynamic?: boolean // 是否可动态显示
}

export interface TableFieldProps extends TableProps<TableDataItem> {
  columns: ColumnsProps[]
  loading?: boolean
  pagination?: boolean
  pageSize?: number
  pageNo?: number
  pageTotal?: number
}
