import type { ITableConfigProps } from '@/components/Table/type'
export const tableConfig: ITableConfigProps[] = [
  {
    label: '规则名称',
    prop: 'allocationRuleName',
    width: '150',
    align: 'center',
    fixed: true,
    showOverflowTooltip: true
  },
  {
    label: '任务类型',
    prop: 'taskType',
    width: '120',
    align: 'center'
  },
  {
    label: '数据来源',
    prop: 'sourceSystem2',
    minWidth: '160',
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '省份',
    prop: 'provinceName',
    width: '120',
    align: 'center'
  },
  {
    label: '城市',
    prop: 'cityName',
    width: '120',
    align: 'center'
  },
  {
    label: '分配类型',
    prop: 'allocationType',
    width: '',
    align: 'center'
  },
  {
    label: '分配人员',
    prop: 'allocationUserName',
    width: '180',
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '是否自动分配',
    prop: 'isAutoAllocation',
    width: '120',
    align: 'center'
  },
  {
    label: '是否发送短信',
    prop: 'isSendSms',
    width: '120',
    align: 'center'
  },
  {
    label: '短信模版',
    prop: 'smsTemplateCode',
    width: '150',
    align: 'center'
  },
  {
    label: '状态',
    prop: 'isUsed',
    width: '120',
    align: 'center'
  },
  {
    label: '最新执行日期',
    prop: 'lastExecTime',
    width: '150',
    align: 'center'
  },
  {
    label: '创建人',
    prop: 'creatorName',
    width: '120',
    align: 'center'
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: '150',
    align: 'center'
  },
  {
    label: '最后更新人',
    prop: 'updaterName',
    width: '120',
    align: 'center'
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    width: '150',
    align: 'center'
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
export const tableEmployeeConfig: ITableConfigProps[] = [
  {
    label: '姓名',
    prop: 'staffName',
    width: '150',
    align: 'center'
  },
  {
    label: '工号',
    prop: 'staffCode',
    width: '120',
    align: 'center'
  },
  {
    label: '管理单元',
    prop: 'ouidName',
    width: '120',
    align: 'center'
  },
  {
    label: '一级部门',
    prop: 'org1Name',
    width: '120',
    align: 'center'
  },
  {
    label: '二级部门',
    prop: 'org2Name',
    width: '120',
    align: 'center'
  },
  {
    label: '岗位名称',
    prop: 'positionName',
    width: '',
    align: 'center'
  }
]
export const tableSupplierConfig: ITableConfigProps[] = [
  {
    label: '名称',
    prop: 'supplierName',
    align: 'center'
  },
  {
    label: '所在城市',
    prop: 'coverArea',
    align: 'center'
  },
  {
    label: '合作状态',
    prop: 'status',
    align: 'center'
  },
  {
    label: '合作结束日期',
    prop: 'expireDate',
    align: 'center'
  }
]
