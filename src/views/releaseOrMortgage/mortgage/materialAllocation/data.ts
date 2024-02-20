import type { DynamicFormDataItem } from '@/components/SearchField/type'
import type { ColumnsProps } from '@/components/TableField/type'
import type { ISearchUnit } from '@/components/SearchBar/type'

export const searchConfig: DynamicFormDataItem[] = [
  {
    type: 'el-input',
    label: '规则名称',
    prop: 'name'
  }
]
export const tableConfig: ColumnsProps[] = [
  {
    type: 'selection',
    width: 40,
    align: 'center',
    fixed: true
  },
  {
    label: '规则名称',
    prop: 'name',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    fixed: true,
    isDynamic: true
  },
  {
    label: '状态',
    prop: 'status',
    minWidth: 120,
    align: 'center',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '最新执行日期',
    prop: 'businessSubcategory',
    minWidth: 120,
    align: 'center',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '创建人',
    prop: 'person',
    minWidth: 120,
    showOverflowTooltip: true,
    isDynamic: true,
    align: 'center'
  },
  {
    label: '创建时间',
    prop: 'moneyType',
    width: 100,
    align: 'center',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '最后更新人',
    prop: 'rent',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '更新时间',
    prop: 'bussiness',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '操作',
    type: 'action',
    width: 260,
    align: 'center',
    fixed: 'right'
  }
]
export const dialogContentConfig: ISearchUnit[] = [
  [
    {
      compType: 'el-input',
      label: '规则名称',
      prop: 'name',
      placeholder: '请输入规则名称',
      colSpan: 24
    }
  ]
]
