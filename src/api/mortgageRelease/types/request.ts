import { PageRequest } from '@/api/types/request'
import { UploadUserFile } from 'element-plus'
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
  creatorName?: string | null | undefined
  /**
   * 创建人工号
   */
  creator?: string | null | undefined

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
  startVerifyTime?: string | number
  /**
   * 核验结束时间
   */
  endVerifyTime?: string | number
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
export interface DelRegisterCardRequest {
  ids: string[]
}

export interface GetRegisterCardInfoRequest {
  id: string
}

export interface EditRegisterCardInfoRequest {
  /**
   * 发动机号
   */
  engineNo?: string
  /**
   * 发动机型号
   */
  engineType?: string
  /**
   * 主表数据id
   */
  id: string
  /**
   * 车牌号
   */
  licensePlateNo?: string
  /**
   * 抵押权人
   */
  mortgagee?: string
  /**
   * 抵押权人统一社会信用代码
   */
  mortgageeUscc?: string
  /**
   * 抵押登记日期
   */
  mortgageRegisterDate?: number | Date
  /**
   * 登记证编号
   */
  registerCardNo?: string
  /**
   * 使用性质
   */
  useType?: string
  /**
   * 车身颜色
   */
  vehicleColor?: string
  /**
   * 机动车所有人
   */
  vehicleOwner?: string
  /**
   * 车架号
   */
  vinNo?: string
}

export interface UploadFileListItemRequest extends UploadUserFile {
  fileCode?: string
  fileCreateTime?: number | string
  url?: string
}
export interface UploadFileRequest {
  batchNo: string
  fileInfoList: UploadFileListItemRequest[]
}

export interface FilePreviewUrlRequest {
  fileCodes: Array<string | undefined>
}

export interface MortgageeType {
  mortgageeType: string
}
