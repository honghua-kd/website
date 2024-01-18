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
/**
 * com.hthx.operations.module.mortgage.dto.document.DocumentDTO
 *
 * DocumentDTO
 */
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
 * com.hthx.operations.module.mortgage.vo.document.MortgageDocumentVO
 *
 * MortgageDocumentVO
 */
export interface MortgageDocumentVO {
  /**
   * 渠道商/办事处 code
   */
  agencyCode?: null | string
  /**
   * 渠道商/办事处 name
   */
  agencyName?: null | string
  /**
   * 适用任务类型
   */
  applicableType?: null | string
  /**
   * 城市code
   */
  cityCode?: null | string
  /**
   * 城市name
   */
  cityName?: null | string
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
   * 文书清单 拼接好的名称
   */
  documentNames?: null | string
  /**
   * 文书编号
   */
  documentNo?: null | string
  /**
   * 具体文书信息
   */
  documents: DocumentDTO[]
  /**
   * 主键id
   */
  id: number
  /**
   * 抵押主体
   */
  mortgageSubjectCode: null | string
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
   * 状态
   */
  status?: number | null
  /**
   * 文书模板编号
   */
  templateCode?: null | string
  /**
   * 文书模板名称
   */
  templateName?: null | string
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
  updateTime?: null | string
}
export interface DeleteResponse {
  code?: number
  data?: boolean | null
  msg?: string
}
export interface MortgageSubjectInfoVO {
  /**
   * 联系地址-城市code
   */
  contactAddressCityCode?: null | string
  /**
   * 联系地址-城市名称
   */
  contactAddressCityName?: null | string
  /**
   * 联系地址-详细地址
   */
  contactAddressDetail?: null | string
  /**
   * 联系地址-区县编码
   */
  contactAddressDistrictCode?: null | string
  /**
   * 联系地址-区县名称
   */
  contactAddressDistrictName?: null | string
  /**
   * 联系地址-省份code
   */
  contactAddressProvinceCode?: null | string
  /**
   * 联系地址-省份名称
   */
  contactAddressProvinceName?: null | string
  /**
   * 联系人
   */
  contactName?: null | string
  /**
   * 联系电话
   */
  contactPhone?: null | string
  /**
   * 合同主体/资方信息
   */
  contractSubject?: string[] | null
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
   * 主键id
   */
  id?: null | string
  /**
   * 全称
   */
  mortgageSubjectAllName: string
  /**
   * 抵押主体唯一Code
   */
  mortgageSubjectCode?: null | string
  /**
   * 抵押主体名称
   */
  mortgageSubjectName: string
  /**
   * 抵押主体类型
   */
  mortgageSubjectType: string
  /**
   * 组织机构代码
   */
  organizationCode: string
  /**
   * 注册地址
   */
  registeredAddress: string
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
export type DocumentNameResponse = string[]

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
  documentNo: string
  /**
   * 文书类型
   */
  documentType?: null | string
  /**
   * 文书版本
   */
  documentVersion: string
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
