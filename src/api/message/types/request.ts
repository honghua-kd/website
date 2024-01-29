/**
 * 一级系统
 */
export interface Children {
  /**
   * 二级来源名
   */
  label: string
  /**
   * 二级来源code
   */
  value: string
}
/**
 * 系统来源
 */
export interface SourceSystem12List {
  /**
   * 二级系统来源
   */
  children: Children[]
  /**
   * 一级来源名称
   */
  label: string
  /**
   * 一级来源code
   */
  value: string
}
export interface SmsTemplateRequest {
  /**
   * 业务类型
   */
  bizType: string
  /**
   * 页码，从 1 开始
   */
  pageNo: number
  /**
   * 每页条数
   */
  pageSize: number
  /**
   * 系统来源
   */
  sourceSystem12List: SourceSystem12List[]
  /**
   * 模板编码
   */
  templateCode: string
  /**
   * 模板名字
   */
  templateName: string
}

export interface DictTreeRequest {
  dictType?: null | string
  label?: null | string
  status?: number | null
}

export interface CreateTemplateRequest {
  /**
   * 业务类型
   */
  bizType: string
  /**
   * 联系人类型
   */
  contactorType: string
  /**
   * 系统来源
   */
  sourceSystem12List?: SourceSystem12List[]
  /**
   * 模板内容
   */
  templateContent: string
  /**
   * 模板名字
   */
  templateName: string
  /**
   * 模板类型
   */
  templateType: string
}
export interface RequestGetInfo {
  /**
   * 编号
   */
  id: number
}
export interface UpdateTemplateRequest extends CreateTemplateRequest {
  /**
   * 编号
   */
  id: string
}
export interface StatusRequest {
  /**
   * id
   */
  id: string
  /**
   * 状态
   */
  status: number
}
export interface DeleteRequest {
  /**
   * id
   */
  id: string
}
export interface SendMessageRequest {
  /**
   * 关联业务编号
   */
  bizRelation: string
  /**
   * 关联合同号
   */
  contractRelation: string
  /**
   * 页码，从1开始
   */
  pageNo: number
  /**
   * 每页条数
   */
  pageSize: number
  /**
   * 短信接收方
   */
  receiveName: string
  /**
   * 发送状态
   */
  sendStatus: string
  /**
   * 发送时间结束
   */
  sendTimeEnd: string
  /**
   * 发送时间开始
   */
  sendTimeStart: string
  /**
   * 模板编码
   */
  templateCode: string
  /**
   * 模板名字
   */
  templateName: string
  /**
   * 手机号码
   */
  userNumber: string
}
export interface ExportSendRequest {
  /**
   * 关联业务编号
   */
  bizRelation: string
  /**
   * 业务类型
   */
  bizType: string
  /**
   * 关联合同号
   */
  contractRelation: string
  /**
   * 发送时间结束
   */
  sendTimeEnd: string
  /**
   * 发送时间开始
   */
  sendTimeStart: string
  /**
   * 模板编码
   */
  templateCode: string
  /**
   * 模板名字
   */
  templateName: string
}
export interface BusRequest {
  /**
   * 字段中文名称(模糊查询)
   */
  busiFieldCnName?: string
  /**
   * 业务模块类型
   */
  busiType: string
}
