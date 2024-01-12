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
  documents?: DocumentDTO[] | null
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
