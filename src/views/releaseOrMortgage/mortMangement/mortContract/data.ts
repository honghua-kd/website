import type { DynamicFormDataItem } from '@/components/SearchField/type'
import { useOptions } from '@/hooks'
import type { ColumnsProps } from '@/components/TableField/type'
export const searchConfig: DynamicFormDataItem[] = [
  {
    type: 'el-input',
    label: '合同编号',
    prop: '',
    placeholder: '请输入'
  },
  {
    type: 'el-input',
    label: '承租人',
    prop: '',
    placeholder: '请输入'
  },
  {
    type: 'el-input',
    label: '挂靠商',
    prop: '',
    placeholder: '请输入'
  },
  {
    type: 'el-input',
    label: '项目经理',
    prop: '',
    placeholder: '请输入'
  },
  {
    type: 'el-input',
    label: '车架号',
    prop: '',
    placeholder: '请输入'
  },
  {
    type: 'el-select',
    label: '合同状态',
    prop: '',
    options: useOptions('CONTRACT_SUBJECT'),
    placeholder: '请选择'
  },
  {
    type: 'el-select',
    label: '审批状态',
    prop: '',
    options: useOptions('CONTRACT_SUBJECT'),
    placeholder: '请选择'
  },
  {
    type: 'el-select',
    label: '是否申请抵押材料',
    prop: '',
    options: useOptions('CONTRACT_SUBJECT'),
    placeholder: '请选择'
  },
  {
    type: 'el-select',
    label: '是否完成抵押办理',
    prop: '',
    options: useOptions('CONTRACT_SUBJECT'),
    placeholder: '请选择'
  },
  {
    type: 'el-select',
    label: '是否委托运营',
    prop: '',
    options: useOptions('CONTRACT_SUBJECT'),
    placeholder: '请选择'
  },
  {
    type: 'el-select',
    label: '是否完成抵押签约',
    prop: '',
    options: useOptions('CONTRACT_SUBJECT'),
    placeholder: '请选择'
  },
  {
    type: 'el-select',
    label: '放款类型',
    prop: '',
    options: useOptions('CONTRACT_SUBJECT'),
    placeholder: '请选择'
  },
  {
    type: 'el-select',
    label: '抵押是否付费',
    prop: '',
    options: useOptions('CONTRACT_SUBJECT'),
    placeholder: '请选择'
  }
]
export const tableConfig: ColumnsProps[] = [
  {
    type: 'selection',
    width: 40,
    align: 'center',
    fixed: true
  },
  {
    label: '合同编号',
    prop: 'contractNo',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    fixed: true,
    isDynamic: true
  },
  {
    label: '车架号',
    prop: 'businessCategory',
    minWidth: 120,
    align: 'center',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '租赁物名称',
    prop: 'businessSubcategory',
    minWidth: 120,
    align: 'center',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '租赁物类型',
    prop: 'type',
    minWidth: 120,
    align: 'left',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '放款类型',
    prop: 'moneyType',
    width: 100,
    align: 'center',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '承租人',
    prop: 'rent',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '挂靠商',
    prop: 'bussiness',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '车牌号',
    prop: 'card',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '上牌省份',
    prop: 'province',
    width: 180,
    align: 'left',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '上牌城市',
    prop: 'city',
    width: 180,
    align: 'left',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '材料去向',
    prop: 'direction',
    width: 180,
    align: 'left',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '审批状态',
    prop: 'status',
    width: 180,
    align: 'left',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '是否完成抵押签约',
    prop: 'isMort',
    width: 180,
    align: 'left',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '抵押是否付费',
    prop: 'isPay',
    width: 180,
    align: 'left',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '是否委托运营',
    prop: 'isEntrust',
    width: 180,
    align: 'left',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '是否申请抵押材料',
    prop: 'isApply',
    width: 180,
    align: 'left',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '是否完成抵押办理',
    prop: 'isFinish',
    width: 180,
    align: 'left',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '客户自愿自助解抵押',
    prop: 'client',
    width: 180,
    align: 'left',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '起租日期',
    prop: 'startDate',
    width: 180,
    align: 'left',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '项目经理',
    prop: 'manager',
    width: 180,
    align: 'left',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '项目经理所属部门',
    prop: 'dept',
    width: 180,
    align: 'left',
    showOverflowTooltip: true,
    isDynamic: true
  },
  {
    label: '操作',
    type: 'action',
    width: 260,
    align: 'center',
    fixed: 'right'
  }
]
