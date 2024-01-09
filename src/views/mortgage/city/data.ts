import type { ITableConfigProps } from '@/components/Table/type'

export const tableConfig: ITableConfigProps[] = [
  {
    label: '省份',
    prop: 'provinceName',
    align: 'center',
    minWidth: 120,
    showOverflowTooltip: true
  },
  {
    label: '城市',
    prop: 'cityName',
    minWidth: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '车牌代码',
    prop: 'licensePlateCode',
    minWidth: 200,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '是否可以办理抵押',
    prop: 'applyMortgage',
    width: 150,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '是否可以办理解押',
    prop: 'applyDischarge',
    width: 150,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '创建人',
    prop: 'creatorName',
    width: 150,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: 200,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '最后更新人',
    prop: 'updaterName',
    width: 150,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    width: 200,
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
