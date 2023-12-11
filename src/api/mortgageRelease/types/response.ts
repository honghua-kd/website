/**
 * 发动机号
 */
export interface EngineNo {
  compareResult?: boolean | null
  sourceValue?: string | null
  targetValue?: string | null
  /**
   * 最终选中数据
   */
  tempValue?: string | null
}

/**
 * 发动机型号
 */
export interface EngineType {
  compareResult?: boolean | null
  sourceValue?: string | null
  targetValue?: string | null
  /**
   * 最终选中数据
   */
  tempValue?: string | null
}

/**
 * 车牌号
 */
export interface LicensePlateNo {
  compareResult?: boolean | null
  sourceValue?: string | null
  targetValue?: string | null
  /**
   * 最终选中数据
   */
  tempValue?: string | null
}

/**
 * 抵押登记日期
 */
export interface MortgageRegisterDate {
  compareResult?: boolean | null
  sourceValue?: string
  targetValue?: string
  /**
   * 最终选中数据
   */
  tempValue?: string | null
}

/**
 * 抵押权人
 */
export interface Mortgagee {
  compareResult?: boolean | null
  sourceValue?: string
  targetValue?: string
  /**
   * 最终选中数据
   */
  tempValue?: string | null
}

/**
 * 抵押权人统一社会信用代码
 */
export interface MortgageeUscc {
  compareResult?: boolean | null
  sourceValue?: string | null
  targetValue?: string | null
  /**
   * 最终选中数据
   */
  tempValue?: string | null
}

/**
 * 登记证编号
 */
export interface RegisterCardNo {
  /**
   * 比较结果
   */
  compareResult?: boolean | null
  /**
   * 主表数据
   */
  sourceValue?: string | null
  /**
   * 同步表数据
   */
  targetValue?: string | null
  /**
   * 最终选中数据
   */
  tempValue?: string | null
}

/**
 * 使用性质
 */
export interface UseType {
  compareResult?: boolean | null
  sourceValue?: string | null
  targetValue?: string | null
  /**
   * 最终选中数据
   */
  tempValue?: string | null
}

/**
 * 车身颜色
 */
export interface VehicleColor {
  compareResult?: boolean | null
  sourceValue?: string | null
  targetValue?: string | null
  /**
   * 最终选中数据
   */
  tempValue?: string | null
}

/**
 * 机动车所有人
 */
export interface VehicleOwner {
  compareResult?: boolean | null
  sourceValue?: string | null
  targetValue?: string | null
  /**
   * 最终选中数据
   */
  tempValue?: string | null
}

/**
 * 车架号
 */
export interface VinNo {
  compareResult?: boolean | null
  sourceValue?: string | null
  targetValue?: string | null
  /**
   * 最终选中数据
   */
  tempValue?: string | null
}

export interface CardInfoIO {
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
  createTime?: string | null
  /**
   * 创建人
   */
  creator?: string | null
  /**
   * 发动机号
   */
  engineNo?: EngineNo | null
  /**
   * 发动机型号
   */
  engineType?: EngineType | null
  /**
   * 文件编号
   */
  fileCode?: string | null
  /**
   * 文件名称
   */
  fileName?: string | null
  /**
   * id
   */
  id?: string | null
  /**
   * 车牌号
   */
  licensePlateNo?: LicensePlateNo | null
  /**
   * 抵押权人
   */
  mortgagee?: Mortgagee
  /**
   * 抵押权人统一社会信用代码
   */
  mortgageeUscc?: MortgageeUscc
  /**
   * 抵押登记日期
   */
  mortgageRegisterDate?: MortgageRegisterDate | null
  /**
   * 登记证归档序号
   */
  registerCardArchiveNo?: null | string
  /**
   * 登记证编号
   */
  registerCardNo?: RegisterCardNo | null
  /**
   * 使用性质
   */
  useType?: UseType | null
  /**
   * 车身颜色
   */
  vehicleColor?: VehicleColor | null
  /**
   * 机动车所有人
   */
  vehicleOwner?: VehicleOwner | null
  /**
   * 核验结果
   */
  verifyResult?: string | null
  /**
   * 车架号
   */
  vinNo?: VinNo | null
}

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
  engineNo?: string | null
  /**
   * 发动机型号
   */
  engineType?: string | null

  /**
   * 车牌号
   */
  licensePlateNo?: string | null
  /**
   * 抵押权人
   */
  mortgagee?: string
  /**
   * 抵押权人统一社会信用代码
   */
  mortgageeUscc?: string | null
  /**
   * 抵押登记日期
   */
  mortgageRegisterDate?: string

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
   * 车架号
   */
  vinNo?: string | null
}

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

export interface DictItem {
  dictType?: string
  value: string
  label: string
  colorType?: string
  cssClass?: string
}
export interface DictList {
  ARCHIVE_STATUS?: DictItem[] | null
  OCR_STATUS?: DictItem[] | null
}
