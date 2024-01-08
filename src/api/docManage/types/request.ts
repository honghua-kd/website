import { PageRequest } from '@/api/types/request'
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
