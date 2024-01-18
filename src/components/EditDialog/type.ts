import type { ISearchUnit } from '@/components/SearchBar/type'

interface IProps {
  modelValue: boolean
  title: string
  dialogWidth?: string | number
  loading?: boolean
  dialogContentConfig: ISearchUnit[]
  dictTypes?: string[]
  dialogQueryParams?: Record<string, unknown>
}

export { IProps }
