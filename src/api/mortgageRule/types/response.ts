export interface RuleItemResponse {
  /**
   * 分配规则唯一Code
   */
  allocationRuleCode: string
  /**
   * 规则名称
   */
  allocationRuleName: string
  /**
   * 分配类型
   */
  allocationType: string
  /**
   * 分配人员工号(或者供应商编号),多个人员用逗号分割
   */
  allocationUserCode: string
  /**
   * 分配人员名称(或者供应商名称),多个人员用逗号分割
   */
  allocationUserName: string
  /**
   * 城市code
   */
  cityCode: string
  /**
   * 城市名称
   */
  cityName: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建者工号
   */
  creator?: string
  /**
   * 创建者名称
   */
  creatorName?: string
  /**
   * 是否自动分配 0：否 1：是
   */
  isAutoAllocation: number
  /**
   * 是否发送短信 0：否 1：是
   */
  isSendSms: number
  /**
   * 是否启用 0：否 1：是
   */
  isUsed?: number
  /**
   * 最新执行时间
   */
  lastExecTime?: string
  /**
   * 省份code
   */
  provinceCode: string
  /**
   * 省份名称
   */
  provinceName: string
  /**
   * 短信模板Code
   */
  smsTemplateCode: string
  /**
   * 系统一级来源
   */
  sourceSystem1: string
  /**
   * 系统二级来源
   */
  sourceSystem2: string
  /**
   * 任务类型
   */
  taskType: string
  /**
   * 更新者工号
   */
  updater?: string
  /**
   * 更新者
   */
  updaterName?: string
  /**
   * 更新时间
   */
  updateTime?: string
}
