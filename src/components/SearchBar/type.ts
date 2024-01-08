import type { DictItem } from '@/api'

interface ISearchConfigBase {
  compType: string
  colSpan: number
  label: string
  placeholder?: string
  options?: string
  slotName?: string
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

type ISearchProps = ISearchConfigCommon | ISearchConfigTimer

type ISearchUnit = ISearchProps[]

type queryState = Record<string, unknown>
type dictState = Record<string, DictItem[]>

interface IProps {
  searchConfig: ISearchUnit[]
  modelValue: queryState
  dictArray?: string[]
  showExpand?: boolean
  labelWidth?: string
}

export {
  IProps,
  dictState,
  queryState,
  ISearchConfigTimer,
  ISearchConfigCommon,
  ISearchUnit
}
