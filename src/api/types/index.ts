export interface BaseResponse {
  msg?: string
  message?: string
  code: number
  data: object
  success: boolean
  time?: string
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
