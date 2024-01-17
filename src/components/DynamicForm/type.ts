import type { FormItemRule, FormRules, ElSelect, ElInput } from 'element-plus'
import type { DynamicDatePickerProps } from './components/DynamicDatePicker/type'

export type ElSelectProps = InstanceType<typeof ElSelect>['$props']
export type ElInputProps = InstanceType<typeof ElInput>['$props']

interface ComponentsProps {
  'el-select': ElSelectProps
  'el-input': ElInputProps
  'dynamic-date-picker': DynamicDatePickerProps
}

export type BaseValueEnum = string | number | Date | boolean

export type FormModelValue = Record<
  string,
  BaseValueEnum | Array<BaseValueEnum>
>

type PickComponentProps<T extends keyof ComponentsProps> = ComponentsProps[T]

export interface BaseFormItemProps {
  type: keyof ComponentsProps // 组件类型
  slotName?: string // 插槽名称
  dicts?: string[] // 字典表字段
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

export interface DynamicFormItemProps extends BaseFormItemProps {
  modelValue: BaseValueEnum | Array<BaseValueEnum>
}

export interface ExtendsFormItemProps extends BaseFormItemProps {
  rowSpan?: number // 跨越的行数，不能大于colNum列数
  row?: number // 所在行
  col?: number // 所在列
}

export type DynamicFormDataItem = ExtendsFormItemProps &
  PickComponentProps<ExtendsFormItemProps['type']>

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
  data: DynamicFormDataItem[]
  modelValue: FormModelValue
  colNum?: number // 列数
  gutter?: number // 间隔距离
  defaultShowRow?: number // 默认显示行数，-1为不显示高级搜索
}
