// 上传记录
export interface UploadFileRequest {
  startCreateTime?: string
  endCreateTime?: number | string
  pageNo: number
  pageSize: number
}
export interface downParms {
  fileCode?: string
}
export interface errDownParms {
  batchNo?: string
  bizType?: string
}
