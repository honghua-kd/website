import { RawAxiosRequestHeaders } from 'axios'

export interface UploadFile {
  fileCode: string
  fileCodes?: string[]
}
export interface FilePreviewItem {
  fileCode?: string
  fileName?: string
  filePreview?: string
}
export interface FilePreviewList {
  previewInfoList: FilePreviewItem[]
}

export interface DictItem {
  dictType?: string
  value: string
  label: string
  colorType?: string
  cssClass?: string
}

interface DictTypes {
  ARCHIVE_STATUS: string
  OCR_STATUS: string
}

type DictType = keyof DictTypes

export type DictList = Record<DictType, DictItem[]>

interface FileHeader extends RawAxiosRequestHeaders {
  'content-disposition'?: string
}
export interface FileDownload {
  data: string | ArrayBuffer | ArrayBufferView | Blob
  headers: FileHeader
}

export interface RecordList {
  /**
   * 批次号
   */
  batchNo: string
  /**
   * 上传时间
   */
  createTime: string
  /**
   * 上传人
   */
  creatorName: string
  /**
   * 文件code
   */
  fileCode: string
  /**
   * 文件名
   */
  fileName: string
  /**
   * 导入类型
   */
  importType: string
  /**
   * 说明（失败原因+下载地址）
   */
  msg: null | string
  /**
   * 处理状态（0待处理，1成功，2失败，3处理中）
   */
  status: number
}
