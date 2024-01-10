import type { ISearchUnit } from '@/components/SearchBar/type'
import type { ITableConfigProps } from '@/components/Table/type'
export const searchConfig: ISearchUnit[] = [
  [
    {
      compType: 'el-select',
      colSpan: 10,
      label: '原始文书类型',
      prop: 'originalDocumentType',
      placeholder: '请选择原始文书类型',
      options: 'SYSTEM_DOCUMENT_TYPE'
    },
    {
      compType: 'el-select',
      colSpan: 10,
      label: '替换文书类型',
      prop: 'replaceDocumentType',
      placeholder: '请选择替换文书类型',
      options: 'SYSTEM_DOCUMENT_TYPE'
    }
  ]
]

export const tableConfig: ITableConfigProps[] = [
  {
    label: '原始文书名称',
    prop: 'originalDocumentName',
    minWidth: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '原始文书类型',
    prop: 'originalDocumentType',
    minWidth: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '原始文书版本',
    prop: 'originalDocumentVersion',
    minWidth: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '合同状态',
    prop: 'contractStatus',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '替换文书名称',
    prop: 'replaceDocumentName',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '替换文书类型',
    prop: 'replaceDocumentType',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '替换文书版本',
    prop: 'replaceDocumentVersion',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '状态',
    prop: 'status',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    slotName: 'column-switch'
  },
  {
    label: '创建人',
    prop: 'creatorName',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 120,
    type: 'date',
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '最后更新人',
    prop: 'updaterName',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '更新时间',
    prop: 'updaterTime',
    width: 120,
    type: 'date',
    align: 'center',
    showOverflowTooltip: true
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
