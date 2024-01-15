export interface DictDataSimpleRespVO {
  colorType?: null | string
  cssClass?: null | string
  dictType?: null | string
  label?: null | string
  value?: null | string
}
export interface DocumentPageResponse {
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
