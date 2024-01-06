export default {
  tableColumn: [
    {
      label: '来源系统',
      prop: 'sourceSystem2',
      minWidth: 120,
      fixed: false,
      align: 'center'
    },
    {
      label: '渠道商/办事处',
      prop: 'agencyName',
      minWidth: 120,
      fixed: false,
      align: 'left'
    },
    {
      label: '是否生成代收款项清单',
      prop: 'createGatherFlag',
      minWidth: 170,
      fixed: false,
      align: 'center'
    },
    {
      label: '未收费办理是否需审批',
      prop: 'unpaidNeedApproveFlag',
      minWidth: 170,
      fixed: false,
      align: 'center'
    },
    {
      label: '创建人',
      prop: 'creatorName',
      minWidth: 100,
      fixed: false,
      align: 'left'
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: 130,
      fixed: false,
      align: 'center'
    },
    {
      label: '最后更新人',
      prop: 'updaterName',
      minWidth: 100,
      fixed: false,
      align: 'left'
    },
    {
      label: '更新时间',
      prop: 'updateTime',
      minWidth: 130,
      fixed: false,
      align: 'center'
    },
    {
      type: 'action',
      label: '操作',
      prop: 'action',
      width: 120,
      fixed: 'right',
      align: 'center'
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
  ]
}
