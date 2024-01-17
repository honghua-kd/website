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
      options: 'SYSTEM_DOCUMENT_TYPE',
      placeholder: '请选择'
    },
    {
      compType: 'date-range-picker',
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
      options: 'SYSTEM_DOCUMENT_APPROVAL_STATUS',
      placeholder: '请选择'
    },
    {
      compType: '',
      colSpan: 6,
      label: '适用部门',
      prop: '',
      options: '',
      placeholder: '请选择',
      slotName: 'sourceSystem1'
    }
  ]
]
export const tableColumn: ITableConfigProps[] = [
  {
    label: '文书编号',
    prop: 'documentNo',
    minWidth: 220,
    fixed: false,
    align: 'center',
    forbiddenEdit: true
  },
  {
    label: '文书名称',
    prop: 'documentName',
    width: 120,
    fixed: false,
    align: 'center',
    forbiddenEdit: true,
    showOverflowTooltip: true
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
    prop: 'fileName',
    width: 150,
    fixed: false,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '审核状态',
    prop: 'approvalStatus',
    width: 120,
    fixed: false,
    align: 'center'
  },
  {
    label: '备注',
    prop: 'remark',
    width: 150,
    fixed: false,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '创建人',
    prop: 'creatorName',
    width: '',
    minWidth: '100',
    fixed: false,
    align: 'center'
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: '140',
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
    align: 'center'
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    width: '',
    minWidth: '140',
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
    label: '文书名称',
    prop: 'documentName',
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
    width: '80',
    align: 'center'
  },
  {
    label: '附件信息',
    prop: 'fileCode',
    width: '130',
    align: 'left',
    showOverflowTooltip: true
  },
  {
    type: 'action',
    label: '操作',
    prop: 'action',
    width: '100',
    align: 'center'
  }
]
