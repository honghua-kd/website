export type Response<T> = Promise<{
  msg?: string
  message?: string
  code: number
  data: T
  success: boolean
  time?: string
}>

export interface PageRequest {
  pageNo: number
  pageSize: number
}

export interface AuthDataItem {
  children: AuthDataItem[]
  elements: Array<string>
  menuType: number
  sort: number
  menu: string
}

export interface OrgTree {
  label: string
  orgName: string
  children?: OrgTree[]
}

export interface PageList<I> {
  list: I[]
  total: number
}

// 数据字典列表
export interface DictDataItem {
  colorType?: null | string
  createTime?: null | string
  cssClass?: null | string
  dictType?: null | string
  id?: null | number
  label?: null | string
  level?: null | number
  parentValue?: null | string
  remark?: null | string
  sort?: null | number
  status?: null | number
  value?: null | string
}

export interface DictListRequest {
  /**
   * 字典类型
   */
  dictType: string
  /**
   * 标签
   */
  label?: null | string
  /**
   * 状态
   */
  status?: null | string
}

// 获取字典数据
export interface DictDataDetail {
  colorType?: null | string
  createTime?: null | string
  cssClass?: null | string
  dictType?: null | string
  id?: number | null
  label?: null | string
  level?: number | null
  parentValue?: null | string
  remark?: null | string
  sort?: number | null
  status?: number | null
  value?: null | string
}
