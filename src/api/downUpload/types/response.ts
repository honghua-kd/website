export interface ImportTableItem {
  batchNo?: string
  fileName?: string
  fileCode?: string
  importType?: string
  status?: number
  creatorName?: string
  createTime?: string
  msg?: string
}
export interface ExportTableItem {
  fileName?: string
  fileCode?: string
  downloadType?: string
  status?: number
  creatorName?: string
  createTime?: string
}