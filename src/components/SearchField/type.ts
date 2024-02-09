import type { DynamicFormProps } from '@/components/DynamicForm/type'

export type { DynamicFormDataItem } from '@/components/DynamicForm/type'

export interface SearchFieldProps extends DynamicFormProps {
  position?: 'bottom' | 'right' // 按钮位置
}
