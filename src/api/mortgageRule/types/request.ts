import { PageRequest } from '@/api/types/request'
export interface RuleListRequest extends PageRequest {
  /**
   * 是否启用(0:否,1:是)
   */
  isUsed?: number
  /**
   * 规则对应的业务类型一级
   */
  ruleBusinessType1?: string
  /**
   * 规则对应的业务类型二级
   */
  ruleBusinessType2?: string
}
export interface RuleActionRequest {
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
export interface AddRuleRequest {
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
  ruleActionContent: RuleActionRequest
  /**
   * 规则对应的业务类型一级
   */
  ruleBusinessType1: string
  /**
   * 规则对应的业务类型二级
   */
  ruleBusinessType2: string
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

export interface OnOffRequest {
  /**
   * 是否启用(0:否,1:是)
   */
  isUsed: number
  /**
   * 规则Code(规则唯一标识)
   */
  ruleCode: string
}
