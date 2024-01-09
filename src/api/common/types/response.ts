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

export type DictList = Record<string, DictItem[]>

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
  creatorName?: null | string
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

export interface ExpressDictItem {
  dictType?: string
  value: string | number | boolean
  label?: string | number
  colorType?: string
  cssClass?: string
}

export interface ProvinceResponse {
  /**
   * 行政规划代码
   */
  code: number
  /**
   * 级别 1-省, 2-市, 3-区
   */
  level: number
  /**
   * 行政规划名称
   */
  name: string
  /**
   * 父级行政规划代码
   */
  parentCode: number
  /**
   * 顶级行政区划代码
   */
  topParentCode: number
  /**
   * 是否有子集 0-没有, 1-有
   */
  haveChildren: number
}

// 查询树形字典数据
export interface DictDataTreeResponse {
  children?: DictDataTreeResponse[] | null
  colorType?: null | string
  cssClass?: null | string
  dataLevel?: number | null
  dictType?: null | string
  label?: null | string
  parentValue?: null | string
  remark?: null | string
  sort?: number | null
  status?: number | null
  value?: null | string
}

// 通用导出
export interface ExportBySelectResponse {
  /**
   * 附件code
   */
  fileCode?: string
  /**
   * 0异步 1同步
   */
  sync?: number
}
