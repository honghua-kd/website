import type { DictItem } from '@/api'
import type { CascaderProps } from 'element-plus'
interface ISearchConfigBase {
  compType: string
  colSpan: number
  label: string
  placeholder?: string
  options?: string
  slotName?: string
  maxlength?: number
  multiple?: boolean
}

interface ISearchConfigCommon extends ISearchConfigBase {
  prop: string
}

interface ISearchConfigTimer extends ISearchConfigBase {
  propStart: string
  propEnd: string
  placeholderStart?: string
  placeholderEnd?: string
}
interface ISearchConfigCascader extends ISearchConfigCommon {
  cascaderProps: CascaderProps
}

type ISearchProps =
  | ISearchConfigCommon
  | ISearchConfigTimer
  | ISearchConfigCascader

type ISearchUnit = ISearchProps[]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type queryState = Record<string, any>
type dictState = Record<string, DictItem[]>

interface IProps {
  searchConfig: ISearchUnit[]
  modelValue: queryState
  dictArray?: string[]
  showExpand?: boolean
  labelWidth?: string
  isSearchBtn?: boolean
}

export {
  IProps,
  dictState,
  queryState,
  ISearchConfigTimer,
  ISearchConfigCommon,
  ISearchConfigCascader,
  ISearchUnit
}
