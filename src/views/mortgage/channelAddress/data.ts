export default {
  actionList: [
    {
      label: '批量导入',
      value: 'batchImport'
    },
    {
      label: '下载导入模版',
      value: 'downloadTemplate'
    },
    {
      label: '新增',
      value: 'add'
    },
    {
      label: '下载',
      value: 'download'
    },
    {
      label: '删除',
      value: 'delete'
    }
  ],
  tableColumn: [
    {
      type: 'selection',
      label: '',
      prop: '',
      columnKey: '',
      width: '40',
      minWidth: '',
      fixed: true,
      align: 'center'
    },
    {
      type: '',
      label: '来源系统',
      prop: 'sourceSystem2',
      columnKey: 'sourceSystem2',
      width: '',
      minWidth: '100',
      fixed: false,
      align: 'center'
    },
    {
      type: '',
      label: '渠道商/办事处',
      prop: 'agencyName',
      columnKey: 'agencyName',
      width: '',
      minWidth: '120',
      fixed: false,
      align: 'left'
    },
    {
      type: '',
      label: '省',
      prop: 'provinceName',
      columnKey: 'provinceName',
      width: '',
      minWidth: '100',
      fixed: false,
      align: 'center'
    },
    {
      type: '',
      label: '市',
      prop: 'cityName',
      columnKey: 'cityName',
      width: '',
      minWidth: '100',
      fixed: false,
      align: 'center'
    },
    // {
    //   type: '',
    //   label: '区',
    //   prop: '',
    //   columnKey: '',
    //   width: '',
    //   minWidth: '100',
    //   fixed: false,
    //   align: 'center'
    // },
    {
      type: '',
      label: '详细地址',
      prop: 'address',
      columnKey: 'address',
      width: '',
      minWidth: '170',
      fixed: false,
      align: 'left'
    },
    {
      type: '',
      label: '联系人',
      prop: 'contact',
      columnKey: 'contact',
      width: '100',
      minWidth: '',
      fixed: false,
      align: 'left'
    },
    {
      type: '',
      label: '联系电话',
      prop: 'phone',
      columnKey: 'phone',
      width: '100',
      minWidth: '',
      fixed: false,
      align: 'center'
    },
    {
      type: '',
      label: '创建人',
      prop: 'creatorName',
      columnKey: 'creatorName',
      width: '',
      minWidth: '100',
      fixed: false,
      align: 'left'
    },
    {
      type: '',
      label: '创建时间',
      prop: 'createTime',
      columnKey: 'createTime',
      width: '100',
      minWidth: '',
      fixed: false,
      align: 'center'
    },
    {
      type: '',
      label: '最后更新人',
      prop: 'updaterName',
      columnKey: 'updaterName',
      width: '',
      minWidth: '100',
      fixed: false,
      align: 'left'
    },
    {
      type: '',
      label: '更新时间',
      prop: 'updateTime',
      columnKey: 'updateTime',
      width: '',
      minWidth: '100',
      fixed: false,
      align: 'center'
    },
    {
      type: '',
      label: '操作',
      prop: 'action',
      columnKey: 'action',
      width: '120',
      minWidth: '',
      fixed: 'right',
      align: 'center'
    }
  ],
  tableActionList: [
    {
      label: '编辑',
      value: 'edit'
    },
    {
      label: '删除',
      value: 'delete'
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
        },
        {
          value: 10,
          label: 'Korea',
          children: [
            { value: 11, label: 'Seoul' },
            { value: 12, label: 'Busan' },
            { value: 13, label: 'Taegu' }
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
          label: 'France',
          children: [
            { value: 16, label: 'Paris' },
            { value: 17, label: 'Marseille' },
            { value: 18, label: 'Lyon' }
          ]
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
}
