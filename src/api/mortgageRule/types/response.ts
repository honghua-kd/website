export interface RuleAction {
  /**
   * 分配人员(多人用逗号分割)
   */
  allocationPersonnel: string
  /**
   * 分配类型
   */
  allocationType: string
  /**
   * 是否自动分配 0:否 1:是
   */
  isAutoAllocation: string
  /**
   * 是否发送短信 0:否 1:是
   */
  isSendSms: string
  /**
   * 短信模板Code
   */
  smsTemplateCode?: string
}
export interface RuleItemResponse {
  /**
   * 是否用户自定义(0:否,1:是)
   */
  isCustom: number
  /**
   * 是否启用(0:否,1:是)
   */
  isUsed: number
  /**
   * 规则执行动作
   */
  ruleActionContent?: RuleAction
  /**
   * 规则对应的业务类型一级
   */
  ruleBusinessType1: string
  /**
   * 规则对应的业务类型二级
   */
  ruleBusinessType2: string
  /**
   * 规则Code(规则唯一标识)
   */
  ruleCode: string
  /**
   * 规则条件的执行表达式
   */
  ruleConditionExpressExec: string
  /**
   * 规则条件的原始表达式
   */
  ruleConditionExpressOriginal: string
  /**
   * 规则名称
   */
  ruleName: string
  /**
   * 规则备注
   */
  ruleNotes?: string
  /**
   * 规则优先级(1-999的数值,数值越大,优先级越高)
   */
  rulePriority?: number
  /**
   * 系统一级来源(多选用逗号分割)
   */
  sourceSystem1: string
  /**
   * 系统二级来源(多选用逗号分割)
   */
  sourceSystem2?: string
}

export interface ProvinceChild {
  /**
   * 子集
   */
  children: []
  /**
   * 行政规划代码
   */
  code: number
  /**
   * 是否有子集 0-没有, 1-有
   */
  haveChildren: number
  /**
   * 级别 1-省, 2-市, 3-区
   */
  level: number
  /**
   * 行政规划名称
   */
  name: string
  /**
   * 父级行政规划代码
   */
  parentCode: number
  /**
   * 顶级行政区划代码
   */
  topParentCode: number
}
export interface ProvinceCityResponse {
  /**
   * 子集
   */
  children: ProvinceChild[]
  /**
   * 行政规划代码
   */
  code: number
  /**
   * 是否有子集 0-没有, 1-有
   */
  haveChildren: number
  /**
   * 级别 1-省, 2-市, 3-区
   */
  level: number
  /**
   * 行政规划名称
   */
  name: string
  /**
   * 父级行政规划代码
   */
  parentCode: number
  /**
   * 顶级行政区划代码
   */
  topParentCode: number
}
