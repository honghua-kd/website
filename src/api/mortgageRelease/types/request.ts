import { PageRequest } from '@/api/types/request'

export interface VehiRegisterCardListRequest extends PageRequest {
  /**
   * 挂靠商
   */
  affiliatesName?: string | null | undefined
  /**
   * 办事处
   */
  agencyName?: string | null | undefined
  /**
   * 核验状态
   */
  archivalStatus?: string
  /**
   * 处理批次号
   */
  batchNo?: string | null | undefined
  /**
   * 渠道商
   */
  channelName?: string | null | undefined
  /**
   * 合同号
   */
  contractNo?: string | null | undefined
  /**
   * 创建人
   */
  creator?: string | null | undefined
  /**
   * 核验结束时间
   */
  endVerifyTime?: Date
  /**
   * 发动机号
   */
  engineNo?: string | null | undefined
  /**
   * 发动机型号
   */
  engineType?: string | null | undefined
  /**
   * 车牌号
   */
  licensePlateNo?: string | null | undefined

  /**
   * 核验开始时间
   */
  startVerifyTime?: Date
  /**
   * 核验结果
   */
  verifyResult?: string
  /**
   * 车架号
   */
  vinNo?: string | null | undefined
}

export interface DateRangeRequest {
  verifyTime: [Date, Date]
}

export interface SortParamsRequest {
  fileNameSort?: string
  registerCardArchiveNoSort?: string
  verifyResultSort?: string
}
