import type { ITableConfigProps } from '@/components/Table/type'
export const tableConfig: ITableConfigProps[] = [
  {
    label: '序号',
    prop: '',
    width: '60',
    minWidth: '',
    fixed: true
  },
  {
    label: '公司名称',
    prop: 'supplierName',
    width: '120',
    minWidth: '',
    fixed: false
  },
  {
    label: '类型',
    prop: 'supplierTypeName',
    width: '60',
    minWidth: '',
    fixed: false
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
    fixed: false
  },
  {
    label: '联系电话',
    prop: 'phone',
    width: '100',
    minWidth: '',
    fixed: false
  },
  {
    label: '电子邮箱',
    prop: 'email',
    width: '100',
    minWidth: '',
    fixed: false
  },
  {
    label: '状态',
    prop: 'status',
    width: '100',
    minWidth: '',
    fixed: false
  },
  {
    label: '到期时间',
    prop: 'expireDate',
    width: '100',
    minWidth: '',
    fixed: false
  },
  {
    label: '提醒',
    prop: 'expireRemind',
    width: '100',
    minWidth: '',
    fixed: false
  },
  {
    label: '内部对接人',
    prop: 'innerInterfaceStaffName',
    width: '100',
    minWidth: '',
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
  {
    label: '序号',
    prop: '',
    width: '60',
    minWidth: '',
    fixed: true
  },
  {
    label: '省份',
    prop: 'provinceName',
    width: '',
    minWidth: '',
    fixed: false
  },
  {
    label: '城市',
    prop: 'cityName',
    width: '',
    minWidth: '',
    fixed: false
  },
  {
    label: '联系人',
    prop: 'contactsName',
    width: '',
    minWidth: '',
    fixed: false
  },
  {
    label: '联系电话',
    prop: 'phone',
    width: '',
    minWidth: '',
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
export const CityList = [
  {
    value: 1,
    label: 'Asia',
    children: [
      {
        value: 2,
        label: 'China',
        children: [
          { value: 3, label: 'Beijing' },
          { value: 4, label: 'Shanghai' },
          { value: 5, label: 'Hangzhou' }
        ]
      },
      {
        value: 6,
        label: 'Japan',
        children: [
          { value: 7, label: 'Tokyo' },
          { value: 8, label: 'Osaka' },
          { value: 9, label: 'Kyoto' }
        ]
      }
    ]
  },
  {
    value: 14,
    label: 'Europe',
    children: [
      {
        value: 15,
        label: 'France'
      },
      {
        value: 19,
        label: 'UK',
        children: [
          { value: 20, label: 'London' },
          { value: 21, label: 'Birmingham' },
          { value: 22, label: 'Manchester' }
        ]
      }
    ]
  }
]
export const SettlementColumn: ITableConfigProps[] = [
  {
    label: '序号',
    prop: '',
    width: '60',
    minWidth: '',
    fixed: true
  },
  {
    label: '省份',
    prop: 'provinceName',
    width: '',
    minWidth: '',
    fixed: false
  },
  {
    label: '城市',
    prop: 'cityName',
    width: '',
    minWidth: '',
    fixed: false
  },
  {
    label: '结算方式',
    prop: 'settlementWay',
    width: '',
    minWidth: '',
    fixed: false
  },
  {
    label: '结算金额',
    prop: 'amount',
    width: '',
    minWidth: '',
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
