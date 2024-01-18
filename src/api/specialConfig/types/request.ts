import { PageRequest } from '@/api/types/request'

export type DictDataSimpleRespVO = string
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
export interface DocumentDTO {
  documentName?: null | string
  /**
   * 文书编号
   */
  documentNo?: null | string
  /**
   * 文书类型
   */
  documentType?: null | string
  /**
   * 文书版本
   */
  documentVersion?: null | string
  /**
   * 文件编号
   */
  fileCode?: null | string
  /**
   * 文件名称
   */
  fileName?: null | string
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
export interface SystemDocumentVO {
  /**
   * 审批流程ID
   */
  approvalBizInstanceId?: null | string
  /**
   * 审批流程名称
   */
  approvalBizInstanceName?: null | string
  /**
   * 审批业务编号
   */
  approvalBizKey?: null | string
  /**
   * 审批流程对应的key
   */
  approvalBizType?: null | string
  /**
   * 审核状态
   */
  approvalStatus?: null | string
  /**
   * 创建时间
   */
  createTime?: null | string
  /**
   * 创建人
   */
  creator?: null | string
  /**
   * 创建人名称
   */
  creatorName?: null | string
  /**
   * 文书名称
   */
  documentName?: null | string
  /**
   * 文书编号
   */
  documentNo?: null | string
  /**
   * 文书类型
   */
  documentType?: null | string
  /**
   * 文书版本
   */
  documentVersion?: null | string
  /**
   * 文件编号
   */
  fileCode?: null | string
  /**
   * 文件名称
   */
  fileName?: null | string
  /**
   * 是否有关联数据
   */
  hasAssociateData?: boolean | null
  /**
   * 主键id
   */
  id?: number | null
  /**
   * 备注
   */
  remark?: null | string
  /**
   * 用印类型
   */
  sealType?: null | string
  /**
   * 适用部门
   */
  sourceSystem1?: null | string
  /**
   * 适用部门详情
   */
  sourceSystemDetail?: DictDataSimpleRespVO[] | null
  /**
   * 是否启用 1-启用 0-停用
   */
  status?: number | null
  /**
   * 更新人
   */
  updater?: null | string
  /**
   * 更新人名称
   */
  updaterName?: null | string
  /**
   * 更新时间
   */
  updateTime?: null | string
}
export interface OriginalDocResponse {
  /**
   * 错误码
   */
  code?: number
  /**
   * 返回数据
   */
  data: DictDataSimpleRespVO[]
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
