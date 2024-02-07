import { ElInput, ElSelect, ElDatePicker } from 'element-plus'
import DynamicDatePicker from './components/DynamicDatePicker/index.vue'

import type { InputProps, ISelectProps, DatePickerProps } from 'element-plus'

// 注册组件
export const componentsMap = {
  'el-select': ElSelect,
  'el-input': ElInput,
  'el-date-picker': ElDatePicker,
  'dynamic-date-picker': DynamicDatePicker
}

import type { DynamicDatePickerProps } from './components/DynamicDatePicker/type'

export type ElSelectProps = ISelectProps
export type ElInputProps = InputProps
export type ElDatePickerProps = DatePickerProps
// 注册组件类型
export interface ComponentsProps {
  'el-select': ISelectProps
  'el-input': InputProps
  'el-date-picker': DatePickerProps
  'dynamic-date-picker': DynamicDatePickerProps
}

export type ComponentsName =
  | 'el-select'
  | 'el-input'
  | 'el-date-picker'
  | 'dynamic-date-picker'
