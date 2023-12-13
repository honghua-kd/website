export interface CardCell {
  /**
   * 挂靠商
   */
  affiliatesName?: string | null
  /**
   * 归档时间
   */
  archivalDate?: string | null
  /**
   * 归档状态
   */
  archivalStatus?: string | null
  /**
   * 处理批次号
   */
  batchNo?: string | null
  /**
   * 所属系统
   */
  belongSystem?: string | null
  /**
   * 渠道商
   */
  channelName?: string | null
  /**
   * 合同号
   */
  contractNo?: string | null
  /**
   * 创建时间
   */
  createTime: string | null
  /**
   * 创建人
   */
  creator: string | null
  /**
   * 发动机号
   */
  engineNo?: string | null
  /**
   * 发动机型号
   */
  engineType?: string | null
  /**
   * 文件编号
   */
  fileCode: string | null
  /**
   * 文件名称
   */
  fileName: string | null
  /**
   * id
   */
  id?: string | null
  /**
   * 车牌号
   */
  licensePlateNo?: string | null
  /**
   * 抵押权人
   */
  mortgagee?: string | null
  /**
   * 抵押权人统一社会信用代码
   */
  mortgageeUscc?: string | null
  /**
   * 抵押登记日期
   */
  mortgageRegisterDate?: string | null
  /**
   * 登记证归档序号
   */
  registerCardArchiveNo?: null | string
  /**
   * 登记证编号
   */
  registerCardNo?: string | null
  /**
   * 使用性质
   */
  useType?: string | null
  /**
   * 车身颜色
   */
  vehicleColor?: string | null
  /**
   * 机动车所有人
   */
  vehicleOwner?: string | null
  /**
   * 核验结果
   */
  verifyResult?: string | null
  /**
   * 车架号
   */
  vinNo?: string | null
}

export interface ModifiyInfo {
  /**
   * 发动机号
   */
  engineNo?: string
  /**
   * 发动机型号
   */
  engineType?: string

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
  mortgageRegisterDate?: string

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
interface FormOriginValueItem {
  sourceValue: string
  targetValue: string
}
type FormKey = keyof ModifiyInfo

export type FormOrigin = Record<FormKey, FormOriginValueItem>

export interface CardListItem extends CardCell {
  target: CardCell[]
  compareResult: string[]
}

export interface UploadFile {
  fileCode: string
  fileCodes?: string[]
}

export interface ExportFile {
  data: string | ArrayBuffer | ArrayBufferView | Blob
}

export interface FilePreviewItem {
  fileCode?: string
  fileName?: string
  filePreview?: string
}
export interface FilePreviewList {
  previewInfoList: FilePreviewItem[]
}

export interface MortgageeItem {
  mortgagee: string
  unifiedSocialCreditCode: string
}
