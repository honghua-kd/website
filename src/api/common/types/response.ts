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

export interface FileDownload {
  data: string | ArrayBuffer | ArrayBufferView | Blob
  headers: {
    'content-disposition': string
  }
}
