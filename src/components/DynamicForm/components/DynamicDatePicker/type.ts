export interface DynamicDatePickerProps {
  modelValue: [Date, Date] | [string, string]
  readonly?: [boolean, boolean]
  disabled?: [boolean, boolean]
  size?: '' | 'large' | 'default' | 'small'
  editable?: [boolean, boolean]
  clearable?: boolean
  placeholder?: [string, string]
  dateType?: 'year' | 'month' | 'date' | 'datetime' | 'week'
  format?: string
  valueFormat?: string
  defaultValue?: [Date, Date]
  validateEvent?: boolean
  disabledDate?: [(data: Date) => boolean, (data: Date) => boolean]
}
