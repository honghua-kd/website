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
export interface OtherFileList {
  /**
   * 附件code
   */
  fileCode?: string | null
  /**
   * 附件备注
   */
  fileRemark?: string | null
  /**
   * 附件名称
   */
  fileName?: string | null
  /**
   * 上传用户
   */
  creatorName?: string | null
  /**
   * 上传时间
   */
  createTime?: string | null
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
   * 其它快递公司
   */
  expressCompanyOther?: string
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
  expressStatusRemark?: string
  /**
   * 寄送类型 0寄送 1接收
   */
  expressType?: number
  id?: string
  /**
   * 收件人地址
   */
  receiveAddress?: string
  /**
   * 收件人联系方式
   */
  receivePhone?: string
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
   * 寄送人地址
   */
  sendAddress?: string
  /**
   * 寄送人联系方式
   */
  sendPhone?: string
  /**
   * 更新人
   */
  updater?: string
  /**
   * 更新时间
   */
  updateTime?: string
  otherFileList: OtherFileList[]
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
  value: string
}

export interface TraceItem {
  /**
   * 轨迹描述
   */
  acceptStation: string
  /**
   * 轨迹发生时间
   */
  acceptTime: string
  /**
   * 增值物流状态，0-暂无轨迹信息 1-已揽收 2-在途中 201-到达派件城市 202-派件中 211-已放入快递柜或驿站 3-已签收 301-正常签收 302-派件异常后最终签收
   * 304-代收签收 311-快递柜或驿站签收 4-问题件 401-发货无信息 402-超时未签收 403-超时未更新 404-拒收(退件) 405-派件异常 406-退货签收
   * 407-退货未签收 412-快递柜或驿站超时未取 10-待揽件
   */
  action: string
  /**
   * 增值物流状态说明
   */
  actionDesc: string
  /**
   * 当前城市
   */
  location: string
  /**
   * 备注
   */
  remark: string
}
export interface TraceList {
  /**
   * 用户自定义回传字段
   */
  callback: null
  /**
   * 派件快递员
   */
  deliveryMan: null
  /**
   * 派件快递员手机号
   */
  deliveryManTel: null
  /**
   * 用户ID
   */
  ebusinessID: string
  /**
   * 所在城市
   */
  location: string
  /**
   * 物流单号
   */
  logisticCode: string
  /**
   * 下一站城市
   */
  nextCity: null
  /**
   * 订单编号
   */
  orderCode: null
  /**
   * 失败原因
   */
  reason: null
  /**
   * 快递公司编码
   */
  shipperCode: string
  /**
   * 普通物流状态
   */
  state: string
  /**
   * 增值物流状态
   */
  stateEx: string
  /**
   * 派件网点的名称
   */
  station: null
  /**
   * 派件网点的地址
   */
  stationAdd: null
  /**
   * 派件网点的电话
   */
  stationTel: null
  /**
   * 成功与否
   */
  success: boolean
  /**
   * 物流轨迹
   */
  traces: TraceItem[]
}

export interface ExpressDownLoad {
  /**
   * 附件code
   */
  fileCode: string
  /**
   * 异步或同步，0异步 1同步
   */
  sync: number
}
