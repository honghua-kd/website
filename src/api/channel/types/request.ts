import { PageRequest } from '@/api/types/request'

// 渠道商/办事处名单-列表
export interface AgencyListRequest extends PageRequest {
  /**
   * 渠道商/办事处名称
   */
  agencyName?: string
  /**
   * 系统来源
   */
  sourceSystem12List?: {
    label?: string | null | undefined
    value?: string | null | undefined
    chiuldren?: {
      label: string | null | undefined
      value: string | null | undefined
    }
  }[]
}

// 渠道商/办事处名单-详情
export interface AgencyDetailRequest {
  /**
   * 主键ids
   */
  id: string
}

// 渠道商/办事处名单-新增
export interface AgencySaveRequest {
  /**
   * 渠道商/办事处名称
   */
  agencyName: string | undefined
  /**
   * 是否生成待收款项清单（是-1，否-0）
   */
  createGatherFlag: number | undefined
  /**
   * 系统来源1
   */
  sourceSystem1?: null | string
  /**
   * 系统来源2
   */
  sourceSystem2: string | undefined
  /**
   * 未收费办理是都需审批（是-1，否-0）
   */
  unpaidNeedApproveFlag: number | undefined
}

// 渠道商/办事处名单-编辑
export interface AgencyEditRequest {
  /**
   * 渠道商/办事处名称
   */
  agencyName: string | undefined
  /**
   * 是否生成待收款项清单（是-1，否-0）
   */
  createGatherFlag: boolean | string | number | undefined
  /**
   * 主键id
   */
  id: number | undefined | string
  /**
   * 系统来源1
   */
  sourceSystem1?: null | string
  /**
   * 系统来源2
   */
  sourceSystem2: string | undefined
  /**
   * 未收费办理是都需审批（是-1，否-0）
   */
  unpaidNeedApproveFlag: boolean | string | number | undefined
}

// 渠道商/办事处名单-删除
export interface AgencyDeleteRequest {
  /**
   * 主键ids
   */
  ids: string[]
}

// 渠道商/办事处名单-导出
export interface AgencyExportRequest {
  /**
   * 渠道商/办事处名称
   */
  agencyName?: string
  /**
   * 主键id列表
   */
  ids?: string[]
  /**
   * 系统来源1
   */
  sourceSystem1?: string
  /**
   * 系统来源2
   */
  sourceSystem2?: string
}

// 渠道商/办事处地址-列表
export interface AgencyAddressListRequest extends PageRequest {
  /**
   * 代理商/办事处编码
   */
  agencyCode?: string
  /**
   * 代理商/办事处
   */
  agencyName?: string
  /**
   * 城市编码
   */
  cityCode?: string
  /**
   * 城市
   */
  cityName?: string
  pageNo: number
  pageSize: number
  /**
   * 省份编码
   */
  provinceCode?: string
  /**
   * 省份
   */
  provinceName?: string
  /**
   * 系统来源
   */
  sourceSystem12List?: {
    label?: string | null | undefined
    value?: string | null | undefined
    chiuldren?: {
      label: string | null | undefined
      value: string | null | undefined
    }
  }[]
}

// 渠道商/办事处地址-详情
export interface AgencyAddressDetailRequest {
  /**
   * 主键id
   */
  id: string
}

// 渠道商/办事处地址-新增
export interface AgencyAddressSaveRequest {
  /**
   * 地址
   */
  address?: string
  /**
   * 渠道商/办事处名称
   */
  agencyName: string
  /**
   * 城市编码
   */
  cityCode: string
  /**
   * 城市名称
   */
  cityName: string
  /**
   * 联系人
   */
  contact?: string
  /**
   * 区编码
   */
  districtCode?: string
  /**
   * 区名称
   */
  districtName?: string
  /**
   * 电话
   */
  phone?: string
  /**
   * 省份编码
   */
  provinceCode: string
  /**
   * 省份名称
   */
  provinceName: string
  /**
   * 来源系统1
   */
  sourceSystem1?: null | string
  /**
   * 来源系统2
   */
  sourceSystem2: string
}

// 渠道商/办事处地址-编辑
export interface AgencyAddressEditRequest {
  /**
   * 地址
   */
  address?: string
  /**
   * 渠道商/办事处名称
   */
  agencyName: string
  /**
   * 城市编码
   */
  cityCode: string
  /**
   * 城市
   */
  cityName: string
  /**
   * 联系人
   */
  contact?: string
  /**
   * 区编码
   */
  districtCode?: string
  /**
   * 区
   */
  districtName?: string
  /**
   * 主键
   */
  id: string
  /**
   * 电话
   */
  phone?: string
  /**
   * 省份编码
   */
  provinceCode: string
  /**
   * 省份
   */
  provinceName: string
  /**
   * 系统来源1
   */
  sourceSystem1?: null | string
  /**
   * 系统来源2
   */
  sourceSystem2: string
}

// 渠道商/办事处地址-删除
export interface AgencyAddressDeleteRequest {
  /**
   * 主键id
   */
  ids: string[]
}

// 渠道商/办事处地址-导出
export interface AgencyAddressExportRequest {
  /**
   * 代理商/办事处
   */
  agencyName?: string
  /**
   * 城市
   */
  cityCode?: string
  /**
   * 主键id列表
   */
  ids?: string[]
  /**
   * 省份
   */
  provinceCode?: string
  /**
   * 来源系统1
   */
  sourceSystem1?: string
  /**
   * 来源系统2
   */
  sourceSystem2?: string
}

// 下载导入模版
export interface downLoadTemplateRequest {
  bizType?: string
}

// 获取子一层区域
export interface AreaChildrenRequest {
  code: number
}
