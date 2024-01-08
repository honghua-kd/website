import type { ISearchUnit } from '@/components/SearchBar/type'
import type { ITableConfigProps } from '@/components/Table/type'

export const searchConfig: ISearchUnit[] = [
  [
    {
      compType: 'el-select',
      colSpan: 12,
      label: '状态',
      prop: 'status',
      placeholder: '请选择状态',
      options: 'NOTICE_STATUS'
    },
    {
      compType: 'el-select',
      colSpan: 12,
      label: '消息类型',
      prop: 'type',
      placeholder: '请选择消息类型',
      options: 'NOTICE_MESSGAE_TYPE'
    }
  ]
]

export const tableConfig: ITableConfigProps[] = [
  {
    label: '标题',
    prop: 'title',
    minWidth: 120,
    align: 'left',
    showOverflowTooltip: true,
    forbiddenEdit: true,
    slotName: 'title'
  },
  {
    label: '内容',
    prop: 'content',
    minWidth: 240,
    align: 'left',
    showOverflowTooltip: true,
    forbiddenEdit: true
  },
  {
    label: '消息类型',
    prop: 'type',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    forbiddenEdit: false,
    slotName: 'noticeType'
  },
  {
    label: '消息状态',
    prop: 'status',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    forbiddenEdit: false,
    slotName: 'noticeStatus'
  },
  {
    label: '发送人',
    prop: 'senderName',
    width: 100,
    align: 'center',
    showOverflowTooltip: true,
    forbiddenEdit: false
  },
  {
    label: '发送人工号',
    prop: 'sender',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    forbiddenEdit: false
  },
  {
    label: '发送时间',
    prop: 'createTime',
    width: 180,
    align: 'center',
    showOverflowTooltip: true,
    forbiddenEdit: false
  },
  {
    label: '操作',
    prop: 'action',
    type: 'action',
    width: 120,
    align: 'center',
    fixed: 'right'
  }
]
