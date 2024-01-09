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

/**
 * AttachmentRelationQueryDTO
 */
export interface RelationListRequest {
  /**
   * 业务大类
   */
  businessCategory?: null | string
  /**
   * 业务单号
   */
  businessNo?: null | string
  /**
   * 业务单号
   */
  businessNoList?: string[] | null
  /**
   * 业务子类
   */
  businessSubCategory?: null | string
}

export interface BatchExportRequest {
  /**
   * 业务大类
   */
  businessCategory: string
  /**
   * 业务单号
   */
  businessNo?: string
  /**
   * 业务小类
   */
  businessSubcategory: string
  /**
   * 附件code集合
   */
  fileCodeList?: string[]
  /**
   * 是否生成excel
   */
  makeExcel: boolean
}
export interface BaseProvincesList<I> {
  data?: I[]
  msg?: string
  code: number
}
export interface ProvincesChildrenRequest {
  code: number

  /**
   * DictDataTreeReqVO
   */
}
export interface DictTreeRequest {
  dictType?: null | string
  label?: null | string
  status?: number | null
}
