export interface DocumentPageResponse {
  /**
   * 审批流程ID 审批页面根据这个参数分页查询文书信息，还调用本接口
   */
  approvalBizInstanceId: null
  /**
   * 审批流程名称
   */
  approvalBizInstanceName: null
  /**
   * 审批业务编号 对应流程审批接口的bizKey参数
   */
  approvalBizKey: null
  /**
   * 审批流程对应的key 对应流程审批接口的bizKey参数
   */
  approvalBizType: null
  /**
   * 审核状态 字典表SYSTEM_DOCUMENT_APPROVAL_STATUS
   */
  approvalStatus: string
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 创建人
   */
  creator: string
  /**
   * 创建人名称
   */
  creatorName: string
  /**
   * 文书名称
   */
  documentName: string
  /**
   * 文书编号 更新时这个参数传过来
   */
  documentNo: string
  /**
   * 文书类型 字典表SYSTEM_DOCUMENT_TYPE
   */
  documentType: string
  /**
   * 文书版本
   */
  documentVersion: string
  /**
   * 文件编号
   */
  fileCode: string
  /**
   * 文件名称
   */
  fileName: string
  /**
   * 是否有关联数据 根据这个参数决定是否展示二级确认框
   */
  hasAssociateData: boolean
  /**
   * 主键ID 更新时这个参数传过来
   */
  id: string
  /**
   * 备注
   */
  remark: null
  /**
   * 用印类型 字典表SEAL_TYPE
   */
  sealType: string
  /**
   * 适用部门
   */
  sourceSystem1: string
  /**
   * 更新人
   */
  updater: string
  /**
   * 更新人名称
   */
  updaterName: string
  /**
   * 更新时间
   */
  updateTime: string
}
