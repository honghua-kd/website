import type { CascaderProps } from 'element-plus'
import type { DictItem } from '@/api'

interface IFormItemConfigBase {
  compType: string
  colSpan: number
  label: string
  prop: string | string[]
  placeholder?: string | string[]
  options?: string
  slotName?: string
  multiple?: boolean
}

interface ISearchConfigCascader extends IFormItemConfigBase {
  cascaderProps: CascaderProps
}

type IFormItemProp = IFormItemConfigBase | ISearchConfigCascader
interface IFormItemProps {
  formItem: IFormItemProp
  dictArray?: string[]
}
type dictState = Record<string, DictItem[]>

export { IFormItemProps, dictState, IFormItemConfigBase, ISearchConfigCascader }
