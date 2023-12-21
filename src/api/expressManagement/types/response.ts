export interface ExpressContentList {
  /**
   * 快递内容号 快递单号+001
   */
  contentNo?: string
  /**
   * 快递内容类型
   */
  contentType?: string
  /**
   * 快递类型内容编号
   */
  contentTypeNumber?: string
  /**
   * 关联合同
   */
  contractNo?: string
  id?: string
}

export interface ExpressListItem {
  /**
   * 登记时间
   */
  createTime?: string
  /**
   * 登记人
   */
  creator?: string
  /**
   * 快递公司
   */
  expressCompany?: string
  /**
   * 快递单号
   */
  expressNo?: string
  /**
   * 快递状态 0未接收 1已接收 2问题件
   */
  expressStatus?: number
  /**
   * 快递内容
   */
  expressContentList?: ExpressContentList[]
  /**
   * 快递内容备注
   */
  expressContentRemark?: string
  /**
   * 快递描述：问题件描述
   */
  expressStatusRemark: string
  /**
   * 寄送类型 0寄送 1接收
   */
  expressType?: number
  id?: string
  /**
   * 接收时间
   */
  receiveTime?: string
  /**
   * 接收人
   */
  receiveUser?: string
  /**
   * 寄送日期
   */
  sendTime?: string
  /**
   * 寄送人
   */
  sendUser?: string
  /**
   * 更新人
   */
  updater?: string
  /**
   * 更新时间
   */
  updateTime?: string
}

export interface UsualAddressListItem {
  /**
   * 区
   */
  area?: string
  /**
   * 市
   */
  city?: string
  id?: string
  /**
   * 省
   */
  province?: string
  /**
   * 用户地址
   */
  userAddress?: string
  /**
   * 用户邮箱
   */
  userMail?: string
  /**
   * 用户名
   */
  userName?: string
  /**
   * 用户联系方式
   */
  userPhone?: string
}
