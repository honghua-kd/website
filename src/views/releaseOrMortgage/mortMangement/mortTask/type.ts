// import type { FormModelValue } from '@/components/DynamicForm/type'
import type { Component } from 'vue'
export type StateType = {
  tabActiveName: string
  // queryParams: FormModelValue
}
export type Btn = {
  name: string
  value: string
  type: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  icon: string | Component
  tip?: string
}
