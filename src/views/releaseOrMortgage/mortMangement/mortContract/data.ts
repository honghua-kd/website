import type { DynamicFormDataItem } from '@/components/SearchField/type'
import type { ITableConfigProps } from '@/components/Table/type'
import { useOptions } from '@/hooks'
export const searchConfig: DynamicFormDataItem[] = [
  {
    type: 'el-input',
    label: '合同编号',
    prop: '',
    placeholder: '请输入'
  } ,
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
export const tableConfig: ITableConfigProps[] = [
  {
    label: '合同编号',
    prop: 'contractNo',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    forbiddenEdit: true
  },
  {
    label: '车架号',
    prop: 'businessCategory',
    minWidth: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '租赁物名称',
    prop: 'businessSubcategory',
    minWidth: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '租赁物类型',
    prop: '',
    minWidth: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '放款类型',
    prop: 'creatorName',
    width: 100,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '承租人',
    prop: 'createTime',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '挂靠商',
    prop: 'updaterName',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '车牌号',
    prop: 'updateTime',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '上牌省份',
    prop: 'remark',
    width: 180,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '上牌城市',
    prop: 'remark',
    width: 180,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '材料去向',
    prop: 'remark',
    width: 180,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '审批状态',
    prop: 'remark',
    width: 180,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '是否完成抵押签约',
    prop: 'remark',
    width: 180,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '抵押是否付费',
    prop: 'remark',
    width: 180,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '是否委托运营',
    prop: 'remark',
    width: 180,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '是否申请抵押材料',
    prop: 'remark',
    width: 180,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '是否完成抵押办理',
    prop: 'remark',
    width: 180,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '客户自愿自助解抵押',
    prop: 'remark',
    width: 180,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '起租日期',
    prop: 'remark',
    width: 180,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '项目经理',
    prop: 'remark',
    width: 180,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '项目经理所属部门',
    prop: 'remark',
    width: 180,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '操作',
    prop: 'action',
    type: 'action',
    width: 260,
    align: 'center',
    fixed: 'right'
  }
]
