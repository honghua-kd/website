import { PageRequest } from '@/api/types/request'

export interface SpecialBasicRequest {
  originalDocumentType?: string | null
  replaceDocumentType?: string | null
}

export type SpecialListRequest = SpecialBasicRequest & PageRequest

export interface ChangeStatusRequest {
  batchNo?: string | null
  status?: number | null
}

type SysContractStatus = string[]
type replaceItem = Record<string, string>

export interface EditRequest {
  batchNo?: string
  originalDocumentNo?: replaceItem[] | string[]
  replaceDocumentNo?: replaceItem[] | string[]
  systemContractStatus: SysContractStatus[]
  originalDocumentNofirst: string
  originalDocumentNoSecond: string
  originalDocumentNoThree: string[]
  replaceDocumentNofirst: string
  replaceDocumentNoSecond: string
  replaceDocumentNoThree: string
}
export interface ChangeDetailResponse {
  /**
   * 批次号
   */
  batchNo?: null | string
  /**
   * 原始文书信息 详细信息
   */
  originalDocument?: replaceItem[] | null
  /**
   * 替换文书 详细信息
   */
  replaceDocument?: replaceItem[] | null
  /**
   * 来源系统及合同状态 详细信息
   */
  systemContractStatus: Array<string[]> | null
}
export interface DocumentTypeRequest {
  documentType?: string
  documentName?: string
}
export interface OriginalDocResponse {
  /**
   * 错误码
   */
  code?: number
  /**
   * 返回数据
   */
  data: string[]
  /**
   * 错误提示，用户可阅读
   */
  msg?: null | string
}

export interface saveRequest {
  batchNo?: null | string
  /**
   * 原始文书编号
   */
  originalDocumentNo?: string[] | null
  /**
   * 替换文书编号
   */
  replaceDocumentNo?: null | string
  /**
   * 来源系统及合同状态
   */
  systemContractStatus?: Array<string[]> | null
}
