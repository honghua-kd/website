export interface ResponseBody<T> {
  msg?: string
  message?: string
  code: number
  data?: T | null
  success: boolean
  time?: string
}
export type Response<T> = Promise<ResponseBody<T>>
export interface PageList<I> {
  list: I[]
  total: number
  pageNo?: number
  pageSize?: number
  totalPage?: number
}
