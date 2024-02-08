import type { ColumnsProps } from '@/components/TableField/type'
export default {
  headerTableData: [
    { name: 'DY2300001', value: '待分配' },
    { name: '任务时效', value: '60天' },
    { name: '合同剩余时间', value: '60天' },
    { name: '运营剩余时间', value: '60天' },
    { name: '经办', value: '业务运营部-张三' },
    { name: '任务分配时间', value: '2022-11-01' },
    { name: '任务完成时间', value: '2022-11-01' },
    { name: '承租人', value: '李四' },
    { name: '合同编号', value: 'L21C1566003' },
    { name: '车架号', value: 'S32445666' }
  ],
  informationData: [
    { name: '合同编号', value: 1 },
    { name: '承租人', value: 2 },
    { name: '租赁物名称', value: 3 },
    { name: '机动车所有人', value: 4 },
    { name: '合同状态', value: 5 },
    { name: '抵押主体', value: 6 },
    { name: '租赁物类型', value: 7 },
    { name: '上牌城市', value: 8 },
    { name: '起租日期', value: 9 },
    { name: '抵押是否签约', value: 10 },
    { name: '车架号', value: 11 },
    { name: '渠道商 / 办事处', value: 12 },
    { name: '到期日期', value: 13 },
    { name: '抵押费用是否支付', value: 14 },
    { name: '车牌号', value: 15 },
    { name: '合同时效剩余天数', value: 16 },
    { name: '抵押权人', value: 17 },
    { name: '发动机号', value: 18 },
    { name: '项目经理', value: 19 },
    { name: '抵押联系人姓名', value: 20 },
    { name: '设备金额', value: 21 },
    { name: '项目经理所属部门', value: 22 },
    { name: '抵押联系人电话', value: 23 },
    { name: '放款类型', value: 24 }
  ],
  linkData: [
    { name: '基本信息', value: 'information' },
    { name: '任务详情', value: 'taskDetails' },
    { name: '材料明细', value: 'materialDetail' },
    { name: '进度信息', value: 'progress' },
    { name: '营业执照', value: 'businessLicense' },
    { name: '完成凭证', value: 'proofCompletion' },
    { name: '催办记录', value: 'callRecord' },
    { name: '审批记录', value: 'approvalRecord' },
    { name: '附件', value: 'attachment' },
    { name: '结算记录', value: 'settlementRecord' },
    { name: '操作记录', value: 'operatingRecord' }
  ]
}
export const tableConfig: ColumnsProps[] = [
  {
    label: '公司名称',
    prop: 'supplierName',
    minWidth: '150',
    showOverflowTooltip: true
  },
  {
    label: '类型',
    prop: 'supplierTypeName',
    fixed: false,
    showOverflowTooltip: true
  },
  {
    label: '归属公司',
    prop: 'belongCompanyName',
    fixed: false
  },
  {
    label: '负责区域',
    prop: 'coverArea',
    fixed: false
  },
  {
    label: '联系人',
    prop: 'contactName',
    align: 'center',
    fixed: false
  },
  {
    label: '联系电话',
    prop: 'phone',
    align: 'center',
    fixed: false
  },
  {
    label: '电子邮箱',
    prop: 'email',
    fixed: false
  },
  {
    label: '操作',
    fixed: false,
    type: 'action',
    width: '100'
  }
]
export const progressTableConfig: ColumnsProps[] = [
  {
    label: '进度人',
    prop: 'supplierName',
    minWidth: '150',
    showOverflowTooltip: true
  },
  {
    label: '进度人所属公司',
    prop: 'supplierTypeName',
    fixed: false,
    showOverflowTooltip: true
  },
  {
    label: '进度时间',
    prop: 'belongCompanyName',
    fixed: false
  },
  {
    label: '操作时间',
    prop: 'coverArea',
    fixed: false
  },
  {
    label: '进度结果（一级)',
    prop: 'contactName',
    align: 'center',
    fixed: false
  },
  {
    label: '进度结果（二级)',
    prop: 'phone',
    align: 'center',
    fixed: false
  },
  {
    label: '补充说明',
    prop: 'email',
    fixed: false
  },
  {
    label: '操作',
    fixed: false,
    type: 'action',
    width: '100'
  }
]
export const MaterialDetailTableConfig: ColumnsProps[] = [
  {
    label: '最终去向',
    prop: 'supplierName',
    minWidth: '150',
    showOverflowTooltip: true,
    align: 'center'
  },
  {
    label: '邮寄人',
    prop: 'supplierTypeName',
    align: 'center',
    fixed: false,
    showOverflowTooltip: true
  },
  {
    label: '接受人',
    prop: 'belongCompanyName',
    align: 'center',
    fixed: false
  },
  {
    label: '邮寄时间',
    prop: 'coverArea',
    align: 'center',
    fixed: false
  },
  {
    label: '邮寄地址',
    prop: 'contactName',
    align: 'center',
    fixed: false
  },
  {
    label: '接收地址',
    prop: 'phone',
    align: 'center',
    fixed: false
  },
  {
    label: '操作',
    fixed: false,
    type: 'action',
    width: '60',
    align: 'center'
  }
]
export const MaterialDetailSecondTableConfig: ColumnsProps[] = [
  {
    label: '任务编号',
    prop: 'uid',
    minWidth: '150',
    showOverflowTooltip: true,
    align: 'center'
  },
  {
    label: '材料清单',
    prop: 'list',
    align: 'center',
    fixed: false,
    showOverflowTooltip: true
  },
  {
    label: '材料去向',
    prop: 'belongCompanyName',
    align: 'center',
    fixed: false
  },
  {
    label: '最终材料去向',
    prop: 'coverArea',
    align: 'center',
    fixed: false
  },
  {
    label: '任务生成时间',
    prop: 'startTime',
    align: 'center',
    fixed: false
  },
  {
    label: '任务完成时间',
    prop: 'endTime',
    align: 'center',
    fixed: false
  },
  {
    label: '抵押材料状态',
    prop: 'status',
    align: 'center',
    fixed: false
  },
  {
    label: '材料出具时间',
    prop: 'time',
    align: 'center',
    fixed: false
  },
  {
    label: '寄送地址',
    prop: 'adress',
    align: 'center',
    fixed: false
  },
  {
    label: '寄送联系人',
    prop: 'name',
    align: 'center',
    fixed: false
  },
  {
    label: '寄送联系电话',
    prop: 'phone',
    align: 'center',
    fixed: false
  },
  {
    label: '寄出状态',
    prop: 'mailingStatus',
    align: 'center',
    fixed: false
  },
  {
    label: '寄出时间',
    prop: 'mailingTime',
    align: 'center',
    fixed: false
  },
  {
    label: '操作',
    fixed: false,
    type: 'action',
    width: '60',
    align: 'center'
  }
]
export const businessLeftTableConfig: ColumnsProps[] = [
  {
    label: '营业执照编号',
    prop: 'supplierName',
    minWidth: '150',
    showOverflowTooltip: true
  },
  {
    label: '执照主体',
    prop: 'supplierTypeName',
    fixed: false,
    showOverflowTooltip: true
  },
  {
    label: '供应商',
    prop: 'belongCompanyName',
    fixed: false
  },
  {
    label: '历史流转城',
    prop: 'coverArea',
    fixed: false
  },
  {
    label: '所在日期',
    prop: 'contactName',
    align: 'center',
    fixed: false
  },
  {
    label: '目前状态',
    prop: 'phone',
    align: 'center',
    fixed: false
  },
  {
    label: '距离今天已',
    prop: 'email',
    fixed: false
  }
]
export const businessRightTableConfig: ColumnsProps[] = [
  {
    label: '营业执照编号',
    prop: 'supplierName',
    minWidth: '150',
    showOverflowTooltip: true
  },
  {
    label: '执照主体',
    prop: 'supplierTypeName',
    fixed: false,
    showOverflowTooltip: true
  },
  {
    label: '供应商',
    prop: 'belongCompanyName',
    fixed: false
  },
  {
    label: '预计流转城市',
    prop: 'coverArea',
    fixed: false
  },
  {
    label: '预计调度日期',
    prop: 'contactName',
    align: 'center',
    fixed: false
  },
  {
    label: '距离今天',
    prop: 'phone',
    align: 'center',
    fixed: false
  }
]
export const settlementTableConfig: ColumnsProps[] = [
  {
    label: '应付金额',
    prop: 'supplierName',
    minWidth: '150',
    showOverflowTooltip: true
  },
  {
    label: '实付金额',
    prop: 'supplierTypeName',
    fixed: false,
    showOverflowTooltip: true
  },
  {
    label: '结算方式',
    prop: 'belongCompanyName',
    fixed: false
  },
  {
    label: '应收方',
    prop: 'coverArea',
    fixed: false
  },
  {
    label: '是否支付',
    prop: 'contactName',
    align: 'center',
    fixed: false
  },
  {
    label: '支付时间',
    prop: 'phone',
    align: 'center',
    fixed: false
  },
  {
    label: '生成时间',
    prop: 'time',
    align: 'center',
    fixed: false
  }
]
