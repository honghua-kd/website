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
