import type { ITableConfigProps } from '@/components/Table/type'
import type { ISearchUnit } from '@/components/SearchBar/type'
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
export const searchConfig: ISearchUnit[] = [
  [
    {
      compType: 'el-input',
      colSpan: 6,
      label: '快递单号',
      prop: 'expressNo',
      options: '',
      placeholder: '请输入快递单号',
      maxlength: 50
    },
    {
      compType: 'el-select',
      colSpan: 6,
      label: '快递公司',
      prop: 'expressCompany',
      options: 'EXPRESS_COMPANY',
      placeholder: '请选择快递公司'
    },
    {
      compType: '',
      colSpan: 6,
      label: '登记时间',
      prop: '',
      options: '',
      placeholder: '请选择登记时间',
      slotName: 'date'
    },
    {
      compType: 'el-select',
      colSpan: 6,
      label: '寄送/接收',
      prop: 'expressType',
      options: 'EXPRESS_TYPE',
      placeholder: '请选择寄送/接收'
    }
  ],
  [
    {
      compType: 'el-select',
      colSpan: 6,
      label: '快递内容',
      prop: 'expressContent',
      options: 'EXPRESS_CONTENT',
      placeholder: '请选择快递内容'
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '快递备注',
      prop: 'expressContentRemark',
      options: '',
      placeholder: '请输入快递备注',
      maxlength: 50
    }
  ]
]
