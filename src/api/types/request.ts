export interface PageRequest {
  pageNo: number
  pageSize: number
}

export interface DictsRequest {
  dictTypes: string[]
  status?: string
}
