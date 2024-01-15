import { PageRequest } from '@/api/types/request'
// 分页查询文书信息
export interface DocumentPageRequest extends PageRequest {
  /**
   * 审核状态
   */
  approvalStatus?: null | string
  /**
   * 创建时间结束
   */
  createTimeEnd?: null | string
  /**
   * 创建时间开始
   */
  createTimeStart?: null | string
  /**
   * 文书名称
   */
  documentName?: null | string
  /**
   * 文书类型
   */
  documentType?: null | string
  /**
   * 页面标识，1-文书审核页面 2-已审文书页面
   */
  pageFlag: number
  /**
   * 页码
   */
  pageNo: number
  /**
   * 页面大小
   */
  pageSize: number
  /**
   * 适用部门
   */
  sourceSystem1?: string[] | null
  /**
   * 文书状态 0-停用 1-启用
   */
  status?: number | null
}

// 保存或编辑文书信息
export interface SaveOrUpdateDocRequest {
  /**
   * 文书名称
   */
  documentName: string
  /**
   * 文书编号 更新时传递
   */
  documentNo?: string
  /**
   * 文书类型 字典表SYSTEM_DOCUMENT_TYPE
   */
  documentType: string
  /**
   * 文书版本
   */
  documentVersion: string
  /**
   * 文件code 附件上传接口返回
   */
  fileCode: string
  /**
   * 主键ID 更新时传递
   */
  id?: number
  /**
   * 用印类型 字典表 SEAL_TYPE
   */
  sealType: string
  /**
   * 适用部门
   */
  sourceSystem1: string[]
}

/**
 * MortgageDocumentPageReq
 */
export interface getTemplatePageRequest {
  /**
   * 适用业务类型
   */
  applicableType: string
  /**
   * 城市code
   */
  cityCode?: null | string
  /**
   * 页码，从 1 开始
   */
  pageNo: number
  /**
   * 每页条数
   */
  pageSize: number
  /**
   * 省code
   */
  provinceCode?: null | string
  /**
   * 状态 0-停用 1-启用
   */
  status: number | string
  /**
   * 文书模板编号
   */
  templateCode?: null | string
  /**
   * 文书模板名称
   */
  templateName?: null | string
}
// export interface DeleteRequest: string[]
export interface UpdateRequest {
  /**
   * 文书模板主键ID
   */
  id: number
  /**
   * 启停状态 0-停用 1-启用
   */
  status: number
}
export interface DocumentDTO {
  /**
   * 文书名称
   */
  documentName?: null | string
  /**
   * 文书编号
   */
  documentNo: string
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
/**
 * MortgageDocumentAddReq
 */
export interface SaveRequest {
  /**
   * 渠道商/办事处 code
   */
  agencyCode: string
  /**
   * 渠道商/办事处 name
   */
  agencyName?: null | string
  /**
   * 适用任务类型
   */
  applicableType: string
  /**
   * 城市code
   */
  cityCode?: null | string
  /**
   * 城市name
   */
  cityName?: null | string
  /**
   * 文书编号
   */
  documentNo: string[]
  /**
   * 文书
   */
  documents: DocumentDTO[]
  /**
   * 主键ID，更新时传递
   */
  id?: number | null
  /**
   * 抵押主体
   */
  mortgageSubjectCode: string
  /**
   * 优先级
   */
  priority?: number | null
  /**
   * 省code
   */
  provinceCode?: null | string
  /**
   * 省name
   */
  provinceName?: null | string
  /**
   * 备注
   */
  remark?: null | string
  /**
   * 文书模板名称
   */
  templateName?: null | string
}

type Cell = string | number

export type DeleteIdsRequest = Cell[]
/**
 * MortgageSubjectInfoExportReq
 */
export interface MortgageSubjectRequest {
  /**
   * 城市
   */
  cities?: string[] | null
  /**
   * 选中行id
   */
  ids?: number[] | null
  /**
   * 抵押主体名称
   */
  mortgageSubjectName?: null | string
  /**
   * 省份
   */
  provinces?: string[] | null
}
export interface DocumentNameRequest {
  /**
   * 文书类型
   */
  documentType?: string
}
export interface ByNameAndTypeRequest {
  /**
   * 文书名称
   */
  documentName?: string
  /**
   * 文书类型
   */
  documentType?: string
}
