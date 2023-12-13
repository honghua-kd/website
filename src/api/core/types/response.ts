export interface AuthDataItem {
  children: AuthDataItem[]
  elements: Array<string>
  menuType: number
  sort: number
  menu: string
}

export interface UploadFile {
  fileCode: string
  fileCodes?: string[]
}
