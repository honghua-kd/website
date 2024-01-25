import type { ITableConfigProps } from '@/components/Table/type'
import type { ISearchUnit } from '@/components/SearchBar/type'
export const tableConfig: ITableConfigProps[] = [
  {
    label: '联系人名称',
    prop: 'userName',
    width: 240,
    fixed: true,
    align: 'center',
    showOverflowTooltip: true,

    forbiddenEdit: false
  },
  {
    label: '联系人电话',
    prop: 'userPhone',
    minWidth: 240,
    align: 'center',
    fixed: true,
    showOverflowTooltip: true,

    forbiddenEdit: false
  },
  {
    label: '地址',
    prop: 'userAddress',
    minWidth: 240,
    align: 'center',
    showOverflowTooltip: true,

    forbiddenEdit: false
  },
  {
    label: '邮箱',
    prop: 'userMail',
    width: 240,
    fixed: true,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '操作',
    prop: 'action',
    type: 'action',
    width: 240,
    align: 'center',
    fixed: 'right'
  }
]
export const searchConfig: ISearchUnit[] = [
  [
    {
      compType: 'el-input',
      colSpan: 6,
      label: '联系人名称',
      prop: 'userName',
      options: '',
      placeholder: '请输入联系人名称',
      maxlength: 50
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '联系电话',
      prop: 'userPhone',
      options: '',
      placeholder: '请输入联系电话',
      maxlength: 50
    }
  ],
  []
]
