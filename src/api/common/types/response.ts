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

export interface RelationListItem {
  /**
   * 附件FILECODE
   */
  attachmentId?: null | string
  /**
   * 附件名称
   */
  attachmentName?: null | string
  /**
   * 业务大类
   */
  businessCategory?: null | string
  /**
   * 业务单号
   */
  businessNo?: null | string
  /**
   * 业务子类
   */
  businessSubcategory?: null | string
  /**
   * 创建时间
   */
  createTime?: null | string
  /**
   * 创建者，目前使用 SysUser 的 id 编号
   *
   * 使用 String 类型的原因是，未来可能会存在非数值的情况，留好拓展性。
   */
  creator?: null | string
  /**
   * 是否删除
   */
  deleted?: boolean | null
  /**
   * 文件全名称（带后缀）
   */
  fileName?: null | string
  /**
   * 附件地址
   */
  filePath?: null | string
  /**
   * 文件大小
   */
  fileSize?: number | null
  /**
   * 文件类型后缀
   */
  fileType?: null | string
  /**
   * id
   */
  id?: number | null
  /**
   * 备注
   */
  remark?: null | string
  /**
   * 更新者，目前使用 SysUser 的 id 编号
   *
   * 使用 String 类型的原因是，未来可能会存在非数值的情况，留好拓展性。
   */
  updater?: null | string
  /**
   * 最后更新时间
   */
  updateTime?: null | string
}
export interface RelationList {
  /**
   * 错误码
   */
  code?: number | null
  /**
   * 返回数据
   */
  data?: RelationListItem[] | null
  /**
   * 错误提示，用户可阅读
   */
  msg?: null | string
}
