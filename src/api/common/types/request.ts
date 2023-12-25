export interface FilePreviewUrlRequest {
  fileCodes: Array<string | undefined>
}

export interface ExportAssetStageResultRequest {
  batchNo?: string
  bizType?: string
}

export interface RecordRequest {
  /**
   * 上传时间结束时间
   */
  endCreateTime: null | string
  /**
   * 页码
   */
  pageNo: number
  /**
   * 条数
   */
  pageSize: number
  /**
   * 上传时间开始时间
   */
  startCreateTime: null | string
}
