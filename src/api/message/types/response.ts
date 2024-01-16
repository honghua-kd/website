type children = {
  value: string
  label: string
}
type System12List = {
  value: string
  label: string
  children: children[]
}
export interface List {
  /**
   * 参数数组
   */
  bizType: null | string
  bizTypeName: string
  contactorType: string
  contactorTypeName: string
  /**
   * 编号
   */
  id: string
  /**
   * 短信类型，参见 SmsTemplateTypeEnum 枚举类
   */
  sourceSystem1: string
  /**
   * 开启状态，参见 CommonStatusEnum 枚举类
   */
  sourceSystem2: string
  status: number
  statusName: string
  /**
   * 模板名称
   */
  templateContent: string
  /**
   * 模板编码
   */
  templateName: string
  /**
   * 备注
   */
  templateType: null | string
  templateTypeName: string
  /**
   * 创建时间
   */
  updateTime: string
  sourceSystem12List?: System12List[] | null
}
export interface Data {
  /**
   * 数据
   */
  list: List[]
  /**
   * 总量
   */
  total: number
}

export interface MessageResponse<T> {
  code?: number
  data?: T
  msg?: string
}
export interface DictDataTreeRespVO {
  labelValue?: string
  children?: DictDataTreeRespVO[] | null
  colorType?: null | string
  cssClass?: null | string
  dataLevel?: number | null
  dictType?: null | string
  label?: null | string
  parentValue?: null | string
  remark?: null | string
  sort?: number | null
  status?: number | null
  value?: null | string
}
export interface CreateResponse {
  code?: number
  data?: string | number
  msg?: string
}
export interface UpdateResponse {
  code?: number
  data?: boolean | null
  msg?: string
}

export interface SendMessageList {
  /**
   * 关联业务编号
   */
  bizRelation?: string
  /**
   * 业务类型
   */
  bizType?: string
  /**
   * 业务类型中文
   */
  bizTypeName?: string
  /**
   * 关联合同号
   */
  contractRelation?: string
  /**
   * id
   */
  id: string
  /**
   * 接收方
   */
  receiveName?: string
  /**
   * 发送人工号
   */
  sender?: string
  /**
   * 发送人姓名
   */
  senderName?: string
  /**
   * 发送状态
   */
  sendStatus?: number
  /**
   * 发送状态中文
   */
  sendStatusName?: string
  /**
   * 发送时间
   */
  sendTime?: string
  /**
   * 一级系统来源
   */
  sourceSystem1?: string
  /**
   * 二级系统来源
   */
  sourceSystem2?: string
  /**
   * 模板编码
   */
  templateCode?: string
  /**
   * 短信内容
   */
  templateContent?: string
  /**
   * 模板名字
   */
  templateName?: string
  /**
   * 接收号码
   */
  userNumber?: string
}
export interface SendData {
  /**
   * 数据
   */
  list: SendMessageList[]
  /**
   * 总量
   */
  total: number
}
