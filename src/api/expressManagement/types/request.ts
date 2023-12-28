import { PageRequest } from '@/api/types/request'
import { OtherFileList } from './response'
export interface ExpressInfoCardListRequest extends PageRequest {
  /**
   * 登记时间 yyyy-MM-dd
   */
  createTime: string
  /**
   * 快递公司
   */
  expressCompany: string
  /**
   * 快递内容
   */
  expressContent: string
  /**
   * 内容备注
   */
  expressContentRemark: string
  /**
   * 快递单号
   */
  expressNo: string
  /**
   * 快递类型 寄送类型 0寄送 1接收
   */
  expressType: number | string
}

export interface ExpressContentListRequest {
  /**
   * 快递内容编号
   */
  contentNo?: string
  /**
   * 快递内容类型
   */
  contentType?: string
  /**
   * 快递内容类型编号
   */
  contentTypeNumber?: string
  /**
   * 关联合同编号
   */
  contractNo?: string
  id?: string
}
export interface ExpressDetailInfoRequest {
  /**
   * 登记时间
   */
  createTime: string
  /**
   * 登记人
   */
  creator: string
  /**
   * 快递公司
   */
  expressCompany: string
  /**
   * 快递内容
   */
  expressContentList: ExpressContentListRequest[]
  /**
   * 快递内容备注
   */
  expressContentRemark: string
  /**
   * 快递单号
   */
  expressNo: string
  /**
   * 快递状态 0未接收 1已接收 2问题件
   */
  expressStatus: number
  /**
   * 问题件描述
   */
  expressStatusRemark: string
  /**
   * 寄送类型 0寄送 1接收
   */
  expressType: number
  id: string
  otherFileList: OtherFileList[]
  /**
   * 收件人地址
   */
  receiveAddress: string
  /**
   * 收件人联系方式
   */
  receivePhone: string
  /**
   * 接收时间
   */
  receiveTime: string
  /**
   * 收件人
   */
  receiveUser: string
  /**
   * 寄送人地址
   */
  sendAddress: string
  /**
   * 寄送人联系方式
   */
  sendPhone: string
  /**
   * 寄送日期
   */
  sendTime: string
  /**
   * 寄送人
   */
  sendUser: string
  /**
   * 修改人
   */
  updater: string
  /**
   * 修改时间
   */
  updateTime: string
}

export interface CheckExpressInfoRequest {
  /**
   * 快递单号
   */
  expressNo?: string | null | undefined
}

export interface DelExpressInfoRequest {
  /**
   * 快递单号
   */
  expressNo?: string[]
}

export interface DelExpressListRequest {
  /**
   * 快递单号
   */
  expressNoList?: string[]
}

export interface ReceiveExpressInfoRequest {
  /**
   * 快递单号
   */
  expressNos?: string[]
}

export interface UsualAddressListRequest {
  /**
   * 联系人
   */
  userName: string
  /**
   * 联系方式
   */
  userPhone: string
}

export interface DelUsualAddressRequest {
  id?: number
}

export interface AddUsualAddressRequest {
  /**
   * 用户地址
   */
  userAddress: string
  /**
   * 用户邮箱
   */
  userMail: string
  /**
   * 用户名
   */
  userName: string
  /**
   * 用户联系方式
   */
  userPhone: string
}

export interface ExportExpressRequest {
  /**
   * 登记时间，yyyy-MM-dd
   */
  createTime?: string
  /**
   * 快递公司
   */
  expressCompany?: string
  /**
   * 快递内容
   */
  expressContent?: string
  /**
   * 内容备注
   */
  expressContentRemark?: string
  /**
   * 快递单号
   */
  expressNo?: string
  /**
   * 快递类型，0寄送 1接收
   */
  expressType?: number | string
}
