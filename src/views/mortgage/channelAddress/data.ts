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
      fixed: true
    },
    {
      type: '',
      label: '来源系统',
      prop: '',
      columnKey: '',
      width: '',
      minWidth: '100',
      fixed: false
    },
    {
      type: '',
      label: '渠道商/办事处',
      prop: '',
      columnKey: '',
      width: '',
      minWidth: '120',
      fixed: false
    },
    {
      type: '',
      label: '省',
      prop: '',
      columnKey: '',
      width: '',
      minWidth: '100',
      fixed: false
    },
    {
      type: '',
      label: '市',
      prop: '',
      columnKey: '',
      width: '',
      minWidth: '100',
      fixed: false
    },
    {
      type: '',
      label: '区',
      prop: '',
      columnKey: '',
      width: '',
      minWidth: '100',
      fixed: false
    },
    {
      type: '',
      label: '详细地址',
      prop: '',
      columnKey: '',
      width: '',
      minWidth: '170',
      fixed: false
    },
    {
      type: '',
      label: '联系人',
      prop: '',
      columnKey: '',
      width: '100',
      minWidth: '',
      fixed: false
    },
    {
      type: '',
      label: '联系电话',
      prop: '',
      columnKey: '',
      width: '100',
      minWidth: '',
      fixed: false
    },
    {
      type: '',
      label: '创建人',
      prop: '',
      columnKey: '',
      width: '',
      minWidth: '100',
      fixed: false
    },
    {
      type: '',
      label: '创建时间',
      prop: '',
      columnKey: '',
      width: '100',
      minWidth: '',
      fixed: false
    },
    {
      type: '',
      label: '最后更新人',
      prop: '',
      columnKey: '',
      width: '',
      minWidth: '100',
      fixed: false
    },
    {
      type: '',
      label: '更新时间',
      prop: '',
      columnKey: '',
      width: '',
      minWidth: '100',
      fixed: false
    },
    {
      type: '',
      label: '操作',
      prop: '',
      columnKey: '',
      width: '120',
      minWidth: '',
      fixed: false
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
