import type { ISearchUnit } from '@/components/SearchBar/type'
import type { ITableConfigProps } from '@/components/Table/type'

export const searchConfig: ISearchUnit[] = [
  [
    {
      compType: 'el-input',
      colSpan: 6,
      label: '文书名称',
      prop: 'documentName',
      placeholder: '请输入'
    },
    {
      compType: 'el-select',
      colSpan: 6,
      label: '文书类型',
      prop: 'documentType',
      placeholder: '请选择'
    },
    {
      compType: 'el-date-picker',
      colSpan: 12,
      label: '创建日期',
      propStart: 'createTimeStart',
      propEnd: 'createTimeEnd',
      placeholderStart: '开始时间',
      placeholderEnd: '结束时间'
    }
  ],
  [
    {
      compType: 'el-select',
      colSpan: 6,
      label: '审核状态',
      prop: 'approvalStatus',
      placeholder: '请选择'
    },
    {
      compType: 'el-select',
      colSpan: 6,
      label: '适用部门',
      prop: 'sourceSystem1',
      placeholder: '请选择'
    }
  ]
]
export const tableColumn: ITableConfigProps[] = [
  {
    label: '文书编号',
    prop: '',
    minWidth: 120,
    fixed: false,
    align: 'center',
    forbiddenEdit: true
  },
  {
    label: '文书名称',
    prop: '',
    minWidth: 120,
    fixed: false,
    align: 'center',
    forbiddenEdit: true
  }
]
