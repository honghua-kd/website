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
  sourceSystem1?: string[]
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
  sealType: string[]
  /**
   * 适用部门
   */
  sourceSystem1: string[]
  // 自行添加属性
  fileName?: string
}

// 删除已审文书
export interface DeleteDocumentRequest {
  id: number
}

// 发起审核
export interface InitiateApprovalRequest {
  /**
   * 审批路径
   */
  approvalPath?: null | string
  /**
   * 待审批文书编号
   */
  documentNos: string[]
  /**
   * 备注
   */
  remark: string
}
