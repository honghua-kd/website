import type { FormItemRule } from 'element-plus'
// FormProps

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormModelValue = Record<string, any>

type FormModelKeys = keyof FormModelValue

export interface BaseFormItemProps {
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
  label: string
  prop: string
  modelValue: FormModelValue[FormModelKeys]
  type: string // 组件类型
  rowSpan?: number // 跨越的行数，不能大于colNum列数
  row?: number // 所在行
  col?: number // 所在列
  dicts?: string[] // 字典表字段
}

export interface DynamicFormProps {
  data: DynamicFormItemProps[]
  modelValue: FormModelValue
  colNum?: number // 列数
  gutter?: number // 间隔距离
  defaultShowRow?: number // 默认显示行数，-1为不显示高级搜索
}
