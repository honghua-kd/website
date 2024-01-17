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
  sealTypeDetail?: DictDataSimpleRespVO[] | null
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

// 获取文书参数配置

export interface ColumnList {
  /**
   * 列名
   */
  column: string
  /**
   * 列中文名
   */
  columnName: string
}
export interface SystemParamConfigResponse {
  /**
   * 表对应的列
   */
  columnList: ColumnList[]
  /**
   * 表名
   */
  table: string
  /**
   * 表中文名
   */
  tableName: string
}

// 获取文书参数
export interface GetDocumentParamResponse {
  /**
   * 批量出具是否空白 1-空白 0-不空白
   */
  batchBlank?: number | null
  /**
   * 书签名称
   */
  bookmarkName?: null | string
  /**
   * 书签参数
   */
  bookmarkParam?: null | string
  /**
   * 列名
   */
  column?: null | string
  /**
   * 文书编号
   */
  documentNo?: null | string
  /**
   * 主键ID
   */
  id?: number | null
  /**
   * 变量表达式
   */
  paramExpression?: null | string
  /**
   * 变量表达式(中文转义后)
   */
  paramExpressionStr?: null | string
  /**
   * 参数类型（0-普通字段属性  1-list集合）
   */
  paramType?: number | null
  /**
   * 表名
   */
  table?: null | string
}
