export default {
  tableColumn: [
    {
      type: 'selection',
      label: '',
      prop: '',
      columnKey: '',
      width: '40',
      minWidth: '',
      fixed: true,
      tooltip: false
    },
    {
      type: 'index',
      label: '序号',
      prop: '',
      columnKey: '',
      width: '60',
      minWidth: '',
      fixed: true,
      tooltip: false
    },
    {
      type: '',
      label: '公司名称',
      prop: 'supplierName',
      columnKey: 'supplierName',
      width: '120',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '类型',
      prop: 'supplierTypeName',
      columnKey: 'supplierTypeName',
      width: '60',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '所属公司',
      prop: 'belongCompany',
      columnKey: 'belongCompany',
      width: '120',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '负责区域',
      prop: 'coverArea',
      columnKey: 'coverArea',
      width: '100',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '联系人',
      prop: 'contactName',
      columnKey: 'contactName',
      width: '',
      minWidth: '100',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '联系电话',
      prop: 'phone',
      columnKey: 'phone',
      width: '100',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '电子邮箱',
      prop: 'email',
      columnKey: 'email',
      width: '100',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '状态',
      prop: 'status',
      columnKey: 'status',
      width: '100',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '到期时间',
      prop: 'expireDate',
      columnKey: 'expireDate',
      width: '100',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '提醒',
      prop: 'expireRemind',
      columnKey: 'expireRemind',
      width: '100',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '内部对接人',
      prop: 'innerInterfaceStaffName',
      columnKey: 'innerInterfaceStaffName',
      width: '100',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '操作',
      prop: '',
      columnKey: '',
      width: '200',
      minWidth: '',
      fixed: false,
      tooltip: false
    }
  ],
  personColumn: [
    {
      type: 'index',
      label: '序号',
      prop: '',
      columnKey: '',
      width: '60',
      minWidth: '',
      fixed: true,
      tooltip: false
    },
    {
      type: '',
      label: '省份',
      prop: 'provinceName',
      columnKey: '',
      width: '',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '城市',
      prop: 'cityName',
      columnKey: '',
      width: '',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '联系人',
      prop: 'contactsName',
      columnKey: '',
      width: '',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '联系电话',
      prop: 'phone',
      columnKey: 'phone',
      width: '',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '操作',
      prop: '',
      columnKey: '',
      width: '',
      minWidth: '',
      fixed: false,
      tooltip: false
    }
  ],
  cityList: [
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
  ],
  settlementColumn: [
    {
      type: 'index',
      label: '序号',
      prop: '',
      columnKey: '',
      width: '60',
      minWidth: '',
      fixed: true,
      tooltip: false
    },
    {
      type: '',
      label: '省份',
      prop: 'province',
      columnKey: '',
      width: '',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '城市',
      prop: '',
      columnKey: '',
      width: '',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '结算方式',
      prop: '',
      columnKey: '',
      width: '',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '结算金额',
      prop: '',
      columnKey: '',
      width: '',
      minWidth: '',
      fixed: false,
      tooltip: false
    },
    {
      type: '',
      label: '操作',
      prop: '',
      columnKey: '',
      width: '',
      minWidth: '',
      fixed: false,
      tooltip: false
    }
  ]
}
