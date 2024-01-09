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
    prop: 'documentNo',
    minWidth: 120,
    fixed: false,
    align: 'center',
    forbiddenEdit: true
  },
  {
    label: '文书名称',
    prop: 'documentName',
    minWidth: 120,
    fixed: false,
    align: 'center',
    forbiddenEdit: true
  },
  {
    label: '文件类型',
    prop: 'documentType',
    minWidth: 120,
    fixed: false,
    align: 'center'
  },
  {
    label: '文件版本',
    prop: 'documentVersion',
    minWidth: 120,
    fixed: false,
    align: 'center'
  },
  {
    label: '适用部门',
    prop: 'sourceSystem1',
    minWidth: 120,
    fixed: false,
    align: 'center'
  },
  {
    label: '用印类型',
    prop: 'sealType',
    minWidth: 120,
    fixed: false,
    align: 'center'
  },
  {
    label: '文书文件',
    prop: 'fileCode',
    minWidth: 120,
    fixed: false,
    align: 'center'
  },
  {
    label: '审核状态',
    prop: 'approvalStatus',
    minWidth: 120,
    fixed: false,
    align: 'center'
  },
  {
    label: '备注',
    prop: 'remark',
    minWidth: 120,
    fixed: false,
    align: 'center'
  },
  {
    label: '创建人',
    prop: 'creatorName',
    width: '',
    minWidth: '100',
    fixed: false,
    align: 'left'
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: '130',
    minWidth: '',
    fixed: false,
    align: 'center'
  },
  {
    label: '最后更新人',
    prop: 'updaterName',
    width: '',
    minWidth: '100',
    fixed: false,
    align: 'left'
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    width: '',
    minWidth: '130',
    fixed: false,
    align: 'center'
  },
  {
    type: 'action',
    label: '操作',
    prop: 'action',
    width: '120',
    minWidth: '',
    fixed: 'right',
    align: 'center'
  }
]
export const saveListColumn: ITableConfigProps[] = [
  {
    label: '排序',
    prop: 'index',
    width: '40',
    align: 'canter'
  },
  {
    label: '文书名称',
    prop: 'documentName',
    width: '',
    minWidth: '130',
    fixed: false,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '文书类型',
    prop: 'documentType',
    width: '',
    minWidth: '100',
    align: 'center'
  },
  {
    label: '文书版本',
    prop: 'documentVersion',
    width: '',
    minWidth: '100',
    align: 'center'
  },
  {
    label: '附件信息',
    prop: 'fileCode',
    width: '',
    minWidth: '130',
    align: 'left',
    showOverflowTooltip: true
  },
  {
    type: 'action',
    label: '操作',
    prop: 'action',
    width: '100',
    align: 'canter'
  }
]
