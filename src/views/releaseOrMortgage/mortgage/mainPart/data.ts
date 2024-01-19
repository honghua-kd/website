import type { ISearchUnit } from '@/components/SearchBar/type'
import type { ITableConfigProps } from '@/components/Table/type'
export const searchConfig: ISearchUnit[] = [
  [
    {
      compType: 'el-input',
      colSpan: 6,
      label: '抵押主体名称',
      prop: 'mortgageSubjectName',
      placeholder: '请输入',
      maxlength: 50
    },
    {
      compType: 'el-select',
      colSpan: 6,
      label: '城市',
      prop: '',
      options: '',
      placeholder: '请选择',
      slotName: 'area'
    }
  ],
  []
]
export const tableColumn: ITableConfigProps[] = [
  {
    label: '抵押主体名称',
    prop: 'mortgageSubjectName',
    width: 120,
    align: 'left',
    forbiddenEdit: true,
    showOverflowTooltip: true
  },
  {
    label: '全称',
    prop: 'mortgageSubjectAllName',
    width: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '组织机构代码',
    prop: 'organizationCode',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '省',
    prop: 'contactAddressProvinceName',
    width: 150,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '市',
    prop: 'contactAddressCityName',
    width: 150,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '详细地址',
    prop: 'contactAddressDetail',
    width: 200,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '注册地址',
    prop: 'registeredAddress',
    width: 200,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '联系人',
    prop: 'contactName',
    width: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '联系电话',
    prop: 'contactPhone',
    width: 100,
    align: 'center'
  },
  {
    label: '创建人',
    prop: 'creatorName',
    minWidth: 100,
    fixed: false,
    align: 'center'
  },
  {
    label: '创建时间',
    prop: 'createTime',
    minWidth: 140,
    align: 'center'
  },
  {
    label: '最后更新人',
    prop: 'updaterName',
    minWidth: 100,
    align: 'center'
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    minWidth: 140,
    align: 'center'
  },
  {
    type: 'action',
    label: '操作',
    prop: '',
    width: 120,
    fixed: 'right',
    align: 'center'
  }
]
