import type { ISearchUnit } from '@/components/SearchBar/type'
import type { ITableConfigProps } from '@/components/Table/type'

export const searchConfig: ISearchUnit[] = [
  [
    {
      compType: 'el-input',
      colSpan: 8,
      label: '模板名称',
      prop: 'fileName',
      placeholder: '请输入模板名称',
      options: 'NOTICE_STATUS'
    },
    {
      compType: 'el-input',
      colSpan: 8,
      label: '附件代码',
      prop: 'fileCode',
      placeholder: '请输入附件代码'
    },
    {
      compType: 'el-cascader',
      colSpan: 8,
      label: '业务类型',
      prop: 'businessCategory',
      placeholder: '请选择业务类型',
      slotName: 'businessCategory'
      // BUSINESS_TEMPLATE_TYPE
    }
  ]
]

export const tableConfig: ITableConfigProps[] = [
  {
    label: '模板名称',
    prop: 'fileName',
    minWidth: 120,
    align: 'left',
    showOverflowTooltip: true,
    forbiddenEdit: true,
    slotName: 'title'
  },
  {
    label: '业务大类',
    prop: 'businessCategory',
    minWidth: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '业务小类',
    prop: 'businessSubcategory',
    minWidth: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '附件代码',
    prop: 'fileCode',
    minWidth: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '上传人',
    prop: 'creatorName',
    width: 100,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '上传时间',
    prop: 'createTime',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '更新人',
    prop: 'updaterName',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '备注',
    prop: 'remark',
    width: 180,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '操作',
    prop: 'action',
    type: 'action',
    width: 160,
    align: 'center',
    fixed: 'right'
  }
]
