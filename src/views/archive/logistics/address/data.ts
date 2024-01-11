import type { ITableConfigProps } from '@/components/Table/type'
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
