import type { DynamicFormDataItem } from '@/components/DynamicForm/type'
import { useOptions } from '@/hooks'
export const data: DynamicFormDataItem[] = [
  {
    prop: 'string1',
    label: '测试1',
    placeholder: '请输入测试1',
    type: 'el-input'
  },
  {
    prop: 'string2',
    label: '测试2',
    type: 'el-input',
    placeholder: '请输入测试2',
    rowSpan: 2
  },
  {
    label: '测试3',
    prop: 'string3',
    placeholder: '请输入测试3',
    type: 'el-input'
  },
  {
    label: '测试4',
    prop: 'string4',
    type: 'el-input',
    placeholder: '请输入测试4',
    rowSpan: 2
  },
  {
    label: '测试5',
    prop: 'string5',
    placeholder: '请输入测试5',
    type: 'el-input'
  },
  {
    label: '测试6',
    prop: 'string6',
    placeholder: '请选择测试6',
    options: useOptions('CONTRACT_SUBJECT'),
    type: 'el-select'
  },
  {
    label: '测试7',
    prop: 'string7',
    placeholder: '请输入测试7',
    type: 'el-input'
  }
]

export const searchData: DynamicFormDataItem[] = [
  {
    prop: 'searchString1',
    label: '测试1',
    placeholder: '请输入测试1',
    type: 'el-input'
  },
  {
    prop: 'searchString2',
    label: '测试2',
    type: 'el-input',
    placeholder: '请输入测试2'
  },
  {
    label: '测试3',
    prop: 'searchString3',
    placeholder: '请输入测试3',
    type: 'el-input'
  },
  {
    label: '测试4',
    prop: 'searchString4',
    type: 'el-input',
    placeholder: '请输入测试4'
  },
  {
    label: '测试5',
    prop: 'searchString5',
    placeholder: '请输入测试5',
    type: 'el-input'
  },
  {
    label: '测试6',
    prop: 'searchString6',
    placeholder: '请选择测试6',
    options: useOptions('CONTRACT_SUBJECT'),
    type: 'el-select'
  },
  {
    label: '测试7',
    prop: 'searchString7',
    placeholder: '请输入测试7',
    type: 'el-input',
    rowSpan: 2
  }
]
