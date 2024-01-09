import type { ITableConfigProps } from '@/components/Table/type'
export const tableConfig: ITableConfigProps[] = [
  {
    label: '快递状态',
    prop: 'expressStatus',
    width: 110,
    fixed: true,
    align: 'center',
    showOverflowTooltip: true,

    forbiddenEdit: false
  },
  {
    label: '快递单号',
    prop: 'expressNo',
    minWidth: 160,
    align: 'left',
    fixed: true,
    showOverflowTooltip: true,

    forbiddenEdit: false
  },
  {
    label: '快递公司',
    prop: 'expressCompany',
    width: 110,
    align: 'center',
    showOverflowTooltip: true,

    forbiddenEdit: false
  },
  {
    label: '寄送/接收',
    prop: 'expressType',
    width: 110,
    fixed: true,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '寄送日期/接收日期',
    prop: 'sendTime',
    width: 150,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '快递主要内容',
    prop: 'expressContentList',
    minWidth: 160,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '内容备注',
    prop: 'expressContentRemark',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '寄送人',
    prop: 'sendUser',
    width: 110,

    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '收件人',
    prop: 'receiveUser',
    width: 110,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '登记时间',
    prop: 'createTime',
    width: 110,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '登记人',
    prop: 'creatorName',
    width: 110,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    width: 110,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '更新人',
    prop: 'updaterName',
    width: 110,
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
