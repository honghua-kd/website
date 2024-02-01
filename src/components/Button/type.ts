import { Component } from 'vue'
export type BtnProps = {
  name: string
  size?: 'large' | 'default' | 'small'
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  text?: boolean
  link?: boolean
  disabled?: boolean
  icon?: string | Component
  soltName?: string
}
