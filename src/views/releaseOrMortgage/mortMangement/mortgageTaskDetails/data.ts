import type { ITableConfigProps } from '@/components/Table/type'
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
  }
]
