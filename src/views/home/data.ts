import type { DynamicFormDataItem } from '@/components/DynamicForm/type'
export const data: DynamicFormDataItem[] = [
  {
    prop: 'string1',
    label: '测试1',
    type: 'el-input'
  },
  {
    prop: 'string2',
    label: '测试2',
    type: 'el-input',
    rowSpan: 2
  },
  {
    label: '测试3',
    prop: 'string3',
    type: 'el-input'
  },
  {
    label: '测试4',
    prop: 'string4',
    type: 'el-input',
    rowSpan: 2
  },
  {
    label: '测试5',
    prop: 'string5',
    type: 'el-input'
  },
  {
    label: '测试6',
    prop: 'string6',
    type: 'el-input'
  },
  {
    label: '测试7',
    prop: 'string7',
    type: 'el-input'
  }
]
