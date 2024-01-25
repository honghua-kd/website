import type { FormItemRule, FormRules } from 'element-plus'
import { ComponentsProps, ComponentsName } from './components'

export type BaseValueEnum = string | number | Date | boolean

export type FormModelValue = Record<
  string,
  BaseValueEnum | Array<BaseValueEnum>
>

// export type PickComponentProps<T> = T extends ComponentsName
//   ? ComponentsProps[T]
//   : never

export interface OptionItem {
  label?: string | number
  value: string | number | boolean | Record<string, string | number | boolean>
}

export interface BaseFormItemProps {
  type: ComponentsName // 组件类型
  slotName?: string // 插槽名称
  options?: OptionItem[] | Promise<OptionItem[]> // 选项数据，当type为select时必传
  label: string
  prop: string
  labelWidth?: string | number
  required?: boolean
  rules?: FormItemRule[]
  error?: string
  showMessage?: boolean
  inlineMessage?: string | boolean
  size?: '' | 'large' | 'default' | 'small'
  validateStatus?: '' | 'error' | 'validating' | 'success'
}

// export interface DynamicFormItemProps extends BaseFormItemProps {
//   modelValue: BaseValueEnum | Array<BaseValueEnum>
// }

export interface DynamicFormItemProps extends BaseFormItemProps {
  colspan?: number // 跨越的列数，不能大于colNum列数
  row?: number // 所在行
  col?: number // 所在列
}

export type DynamicFormDataItem = Omit<
  DynamicFormItemProps & ComponentsProps[ComponentsName],
  'modelValue'
>

export interface BaseFormProps {
  rules?: FormRules
  inline?: boolean
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string | number
  labelSuffix?: string
  hideRequiredAsterisk?: boolean
  requireAsteriskPosition?: 'left' | 'right'
  showMessage?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  validateOnRuleChange?: boolean
  size?: '' | 'large' | 'default' | 'small'
  disabled?: boolean
  scrollToError?: boolean
}

export interface DynamicFormProps extends BaseFormProps {
  // formItem的类型 与 组件类型 的集合
  data: DynamicFormDataItem[]
  modelValue: FormModelValue
  colNum?: number // 列数
  gutter?: number // 间隔距离
  visibleRows?: number // 高级搜索默认显示行数，不传为全部展示
}
