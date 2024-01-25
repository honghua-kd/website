import type { ITableConfigProps } from '@/components/Table/type'
import type { ISearchUnit } from '@/components/SearchBar/type'
export const tableConfig: ITableConfigProps[] = [
  {
    label: '公司名称',
    prop: 'supplierName',
    width: '150',
    minWidth: '',
    fixed: true,
    showOverflowTooltip: true
  },
  {
    label: '类型',
    prop: 'supplierTypeName',
    minWidth: '120',
    fixed: false,
    showOverflowTooltip: true
  },
  {
    label: '归属公司',
    prop: 'belongCompanyName',
    width: '120',
    minWidth: '',
    fixed: false
  },
  {
    label: '负责区域',
    prop: 'coverArea',
    minWidth: '240',
    fixed: false
  },
  {
    label: '联系人',
    prop: 'contactName',
    width: '100',
    align: 'center',
    fixed: false
  },
  {
    label: '联系电话',
    prop: 'phone',
    width: '150',
    align: 'center',
    fixed: false
  },
  {
    label: '电子邮箱',
    prop: 'email',
    width: '150',
    minWidth: '',
    fixed: false
  },
  {
    label: '状态',
    prop: 'status',
    width: '100',
    minWidth: '',
    align: 'center',
    fixed: false
  },
  {
    label: '到期时间',
    prop: 'expireDate',
    width: '100',
    minWidth: '',
    align: 'center',
    fixed: false
  },
  {
    label: '提醒',
    prop: 'expireRemind',
    width: '100',
    minWidth: '',
    align: 'center',
    fixed: false
  },
  {
    label: '内部对接人',
    prop: 'innerInterfaceStaffName',
    width: '150',
    minWidth: '',
    align: 'center',
    fixed: false
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
export const PersonColumn: ITableConfigProps[] = [
  // {
  //   label: '序号',
  //   prop: '',
  //   width: '60',
  //   minWidth: '',
  //   fixed: true
  // },
  {
    label: '省份',
    prop: 'provinceName',
    width: '',
    align: 'center',
    fixed: false
  },
  {
    label: '城市',
    prop: 'cityName',
    width: '',
    align: 'center',
    fixed: false
  },
  {
    label: '联系人',
    prop: 'contactsName',
    width: '',
    align: 'center',
    fixed: false
  },
  {
    label: '联系电话',
    prop: 'phone',
    width: '',
    align: 'center',
    fixed: false
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
export const AccountColumn: ITableConfigProps[] = [
  // {
  //   label: '序号',
  //   prop: '',
  //   width: '60',
  //   minWidth: '',
  //   fixed: true
  // },
  {
    label: '账号名称',
    prop: 'accountName',
    width: '',
    align: 'center',
    fixed: false
  },
  {
    label: '电子邮箱',
    prop: 'email',
    width: '',
    align: 'center',
    fixed: false
  },
  {
    label: '联系电话',
    prop: 'phone',
    width: '',
    align: 'center',
    fixed: false
  },
  {
    label: '状态',
    prop: 'status',
    width: '',
    align: 'center',
    fixed: false
  },
  {
    label: '操作',
    prop: 'action',
    type: 'action',
    width: 180,
    align: 'center',
    fixed: 'right'
  }
]
export const SettlementColumn: ITableConfigProps[] = [
  // {
  //   label: '序号',
  //   prop: '',
  //   width: '60',
  //   minWidth: '',
  //   fixed: true
  // },
  {
    label: '省份',
    prop: 'provinceName',
    width: '',
    align: 'center',
    fixed: false
  },
  {
    label: '城市',
    prop: 'cityName',
    width: '',
    align: 'center',
    fixed: false
  },
  {
    label: '结算方式',
    prop: 'settlementWay',
    width: '',
    align: 'center',
    fixed: false
  },
  {
    label: '结算金额',
    prop: 'amount',
    width: '',
    align: 'center',
    fixed: false
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
export const searchConfig: ISearchUnit[] = [
  [
    {
      compType: 'el-input',
      colSpan: 6,
      label: '公司名称',
      prop: 'supplierName',
      options: '',
      placeholder: '请输入公司名称',
      maxlength: 50
    },
    {
      compType: '',
      colSpan: 6,
      label: '归属公司',
      prop: '',
      options: '',
      placeholder: '请选择',
      slotName: 'company'
    },
    {
      compType: '',
      colSpan: 6,
      label: '区域',
      prop: '',
      options: '',
      placeholder: '请选择',
      slotName: 'area'
    },
    {
      compType: 'el-select',
      colSpan: 6,
      label: '状态',
      prop: 'status',
      options: 'SUPPLIER_DETAIL_STATUS',
      placeholder: '请选择'
    }
  ],
  [
    {
      compType: 'el-select',
      colSpan: 6,
      label: '类型',
      prop: 'supplierType',
      options: 'SUPPLIER_DETAIL_TYPE',
      placeholder: '请选择'
    },
    {
      compType: '',
      colSpan: 12,
      label: '开始时间',
      prop: '',
      options: '',
      placeholder: '请选择',
      slotName: 'date'
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '内部对接人',
      prop: 'innerInterfaceStaffCode',
      options: '',
      placeholder: '请输入工号',
      maxlength: 50
    }
  ]
]
