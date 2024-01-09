export interface Basic {
  code?: null | string
  name?: null | string
}
export type ContractStaus = Basic

export interface SourceSystem2 extends Basic {
  /**
   * 二级来源对应的合同状态，二级来源对应的合同编号
   */
  contractStatus?: ContractStaus[] | null
}

export interface SourceSystem1 extends Basic {
  /**
   * 一级来源对应的2级来源，一级来源对应的二级来源
   */
  system2?: SourceSystem2[] | null
}

export interface Document {
  documentNo?: string | null
  documentName?: string | null
  documentVersion?: string | null
}

interface ListCell {
  /**
   * 批次号
   */
  batchNo?: string
  /**
   * 合同状态 已拼接好
   */
  contractStatus?: null | string
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
   * 原始文书信息 详细信息
   */
  originalDocument?: Document[] | null
  /**
   * 原始文书名称 已用逗号拼接好
   */
  originalDocumentName?: null | string
  /**
   * 原始文书名称 已用逗号拼接好
   */
  originalDocumentNo?: null | string
  /**
   * 原始文书类型 已用逗号拼接好
   */
  originalDocumentType?: null | string
  /**
   * 原始文书版本 已用逗号拼接好
   */
  originalDocumentVersion?: null | string
  /**
   * 替换文书名称
   */
  replaceDocumentName?: null | string
  /**
   * 替换文书名称
   */
  replaceDocumentNo?: null | string
  /**
   * 替换文书类型
   */
  replaceDocumentType?: null | string
  /**
   * 替换文书版本
   */
  replaceDocumentVersion?: null | string
  /**
   * 状态 0-停用 1-启用
   */
  status?: number | null
  /**
   * 来源系统及合同状态 详细信息
   */
  systemContractStatus?: SourceSystem1[] | null
  /**
   * 更新人
   */
  updater?: null | string
  /**
   * 更新人名称
   */
  updaterName?: null | string
  /**
   * 更新人姓名
   */
  updaterTime?: null | string
}
export type SpecialListItem = Record<string, ListCell>
