import type { DynamicFormDataItem } from '@/components/DynamicForm/type'
import type { ITableConfigProps } from '@/components/Table/type'
import type { Btn } from './type'
import {
  Upload,
  Plus,
  Download,
  Select,
  Edit,
  Close,
  DArrowLeft,
  DArrowRight,
  Bell,
  ChatDotRound
} from '@element-plus/icons-vue'
import { useOptions } from '@/hooks'

export const searchAssignConfig: DynamicFormDataItem[] = [
  {
    prop: '',
    label: '合同编号',
    type: 'el-input',
    placeholder: '请输入'
  },
  {
    prop: '',
    label: '承租人',
    type: 'el-input',
    placeholder: '请输入'
  },
  {
    prop: '',
    label: '挂靠商',
    type: 'el-input',
    placeholder: '请输入'
  },
  {
    prop: '',
    label: '车架号',
    type: 'el-input',
    placeholder: '请输入'
  },
  {
    prop: '',
    label: '车牌号',
    type: 'el-input',
    placeholder: '请输入'
  },
  {
    prop: '',
    label: '放款类型',
    type: 'el-select',
    placeholder: '请选择'
  },
  {
    prop: '',
    label: '任务类型',
    type: 'el-select',
    placeholder: '请选择'
  },
  {
    prop: '',
    label: '合同状态',
    type: 'el-select',
    placeholder: '请选择'
  },
  {
    prop: '',
    label: '审批状态',
    type: 'el-select',
    placeholder: '请选择'
  },
  {
    prop: '',
    label: '抵押类型',
    type: 'el-select',
    placeholder: '请选择'
  },
  {
    prop: '',
    label: '上牌城市',
    slotName: 'area'
  },
  {
    prop: '',
    label: '分配方',
    slotName: 'assign',
    colspan: 2
  },
  {
    prop: 'createTime',
    label: '任务生成时间',
    placeholder: ['请选择开始时间', '请选择结束时间'],
    type: 'dynamic-date-picker',
    disabled: [false, false],
    clearable: true,
    colspan: 2
  }
]
export const searchAssignedConfig: DynamicFormDataItem[] = [
  {
    prop: '',
    label: '合同编号',
    type: 'el-input',
    placeholder: '请输入'
  },
  {
    prop: '',
    label: '承租人',
    type: 'el-input',
    placeholder: '请输入'
  },
  {
    prop: '',
    label: '车架号',
    type: 'el-input',
    placeholder: '请输入'
  },
  {
    prop: '',
    label: '车牌号',
    type: 'el-input',
    placeholder: '请输入'
  },
  {
    prop: '',
    label: '挂靠商',
    type: 'el-input',
    placeholder: '请输入'
  },
  {
    prop: '',
    label: '放款类型',
    type: 'el-select',
    placeholder: '请选择'
  },
  {
    prop: '',
    label: '合同状态',
    type: 'el-select',
    placeholder: '请选择'
  },
  {
    prop: '',
    label: '审批状态',
    type: 'el-select',
    placeholder: '请选择'
  },
  {
    prop: '',
    label: '抵押类型',
    type: 'el-select',
    placeholder: '请选择'
  },
  {
    prop: '',
    label: '登记证状态',
    type: 'el-select',
    placeholder: '请选择'
  },
  {
    prop: '',
    label: '抵押任务状态',
    type: 'el-select',
    placeholder: '请选择'
  },
  {
    prop: '',
    label: '上牌城市',
    slotName: 'area'
  },
  {
    prop: '',
    label: '分配方',
    slotName: 'assign',
    colspan: 2
  },
  {
    prop: 'createTime',
    label: '任务生成时间',
    placeholder: ['请选择开始时间', '请选择结束时间'],
    type: 'dynamic-date-picker',
    disabled: [false, false],
    clearable: true,
    colspan: 2
  },
  {
    prop: 'completeTime',
    label: '任务完成时间',
    placeholder: ['请选择开始时间', '请选择结束时间'],
    type: 'dynamic-date-picker',
    disabled: [false, false],
    clearable: true,
    colspan: 2
  }
]
export const assignTableColumn: ITableConfigProps[] = [
  {
    label: '抵押任务编号',
    prop: '',
    minWidth: 120,
    align: 'center',
    forbiddenEdit: true,
    showOverflowTooltip: true
  },
  {
    label: '合同编号',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '车架号',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '租赁物名称',
    prop: '',
    width: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '租赁物类型',
    prop: '',
    width: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '租赁物状态',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '放款类型',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '抵押主体',
    prop: '',
    width: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '抵押时效',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '合同剩余时间',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '运营剩余时间',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '分配方',
    prop: '',
    width: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '抵押类型',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '车牌号',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '上牌省份',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '上牌城市',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '承租人',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '起租日期',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '项目经理',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '项目所属部门',
    prop: '',
    width: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '审批状态',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '任务生成时间',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '任务完成时间',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    type: 'action',
    label: '操作',
    prop: '',
    width: 100,
    fixed: 'right',
    align: 'center'
  }
]
export const assignedTableColumn: ITableConfigProps[] = [
  {
    label: '抵押任务编号',
    prop: '',
    minWidth: 120,
    align: 'center',
    forbiddenEdit: true,
    showOverflowTooltip: true
  },
  {
    label: '合同编号',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '车架号',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '租赁物名称',
    prop: '',
    width: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '租赁物类型',
    prop: '',
    width: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '租赁物状态',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '放款类型',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '抵押主体',
    prop: '',
    width: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '抵押时效',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '合同剩余时间',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '运营剩余时间',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '分配方',
    prop: '',
    width: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '抵押类型',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '车牌号',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '上牌省份',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '上牌城市',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '承租人',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '挂靠商',
    prop: '',
    width: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '起租日期',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '项目经理',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '项目所属部门',
    prop: '',
    width: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '审批状态',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '任务生成时间',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '任务完成时间',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '抵押完成时间',
    prop: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '催办记录',
    prop: 'handle',
    width: 120,
    align: 'center'
  },
  {
    type: 'action',
    label: '操作',
    prop: '',
    width: 100,
    fixed: 'right',
    align: 'center'
  }
]
export const assignBtnList: Btn[] = [
  {
    name: '新增',
    value: 'add',
    type: 'primary',
    icon: Plus
  },
  {
    name: '下载',
    value: 'download',
    type: 'primary',
    icon: Download,
    tip: ''
  },
  {
    name: '确认分配',
    value: 'confirmDist',
    type: 'primary',
    icon: Select,
    tip: ''
  },
  {
    name: '退回',
    value: 'backMort',
    type: 'primary',
    icon: DArrowLeft,
    tip: ''
  },
  {
    name: '修改抵押类型',
    value: 'mortType',
    type: 'primary',
    icon: Edit,
    tip: ''
  },
  {
    name: '修改抵押时效',
    value: 'mortTime',
    type: 'primary',
    icon: Edit,
    tip: ''
  },
  {
    name: '修改分配方',
    value: 'editDistribution',
    type: 'primary',
    icon: Edit,
    tip: ''
  },
  {
    name: '执行自动分配结果',
    value: 'autoDist',
    type: 'primary',
    icon: Select,
    tip: ''
  },
  {
    name: '取消',
    value: 'cancel',
    type: 'primary',
    icon: Close,
    tip: ''
  }
]
export const assignedBtnList: Btn[] = [
  {
    name: '新增',
    value: 'add',
    type: 'primary',
    icon: Plus
  },
  {
    name: '下载',
    value: 'download',
    type: 'primary',
    icon: Download,
    tip: ''
  },
  {
    name: '转派',
    value: 'transfer',
    type: 'primary',
    icon: Select,
    tip: ''
  },
  {
    name: '退回',
    value: 'backMort',
    type: 'primary',
    icon: DArrowLeft,
    tip: ''
  },
  {
    name: '催办',
    value: 'hurry',
    type: 'primary',
    icon: Bell,
    tip: ''
  },
  {
    name: '发短信',
    value: 'sendMessage',
    type: 'primary',
    icon: ChatDotRound,
    tip: ''
  },
  {
    name: '修改抵押类型',
    value: 'mortType',
    type: 'primary',
    icon: Edit,
    tip: ''
  },
  {
    name: '完成抵押',
    value: 'completeMort',
    type: 'primary',
    icon: Select,
    tip: ''
  },
  {
    name: '移交登记证书',
    value: 'transferDoc',
    type: 'primary',
    icon: DArrowRight,
    tip: ''
  },
  {
    name: '新增办理进度',
    value: 'addProgress',
    type: 'primary',
    icon: Plus,
    tip: ''
  },
  {
    name: '导入办理进度',
    value: 'importProgress',
    type: 'primary',
    icon: Upload,
    tip: ''
  },
  {
    name: '取消',
    value: 'cancel',
    type: 'primary',
    icon: Close,
    tip: ''
  }
]
export const addTaskQueryConfig: DynamicFormDataItem[] = [
  {
    prop: '',
    label: '承租人',
    type: 'el-input',
    placeholder: '请输入'
  },
  {
    prop: '',
    label: '合同编号',
    type: 'el-input',
    placeholder: '请输入'
  },
  {
    prop: '',
    label: '车架号',
    type: 'el-input',
    placeholder: '请输入'
  },
  {
    prop: '',
    label: '是否完成抵押签约',
    type: 'el-select',
    placeholder: '请选择',
    options: useOptions('YESNO')
  },
  {
    prop: '',
    label: '是否收到抵押费用',
    type: 'el-select',
    placeholder: '请选择',
    options: useOptions('YESNO')
  }
]
export const addTaskQueryTableColumn: ITableConfigProps[] = [
  {
    label: '合同编号',
    prop: '',
    minWidth: 120,
    align: 'center',
    forbiddenEdit: true
  },
  {
    label: '车架号',
    prop: '',
    minWidth: 120,
    align: 'center',
    forbiddenEdit: true
  },
  {
    label: '租赁物名称',
    prop: '',
    minWidth: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '租赁物类型',
    prop: '',
    width: 120,
    align: 'center'
  },
  {
    label: '是否签署收费协议',
    prop: '',
    width: 120,
    align: 'center'
  },
  {
    label: '是否收到抵押费用',
    prop: '',
    width: 120,
    align: 'center'
  },
  {
    label: '是否委托运营',
    prop: '',
    width: 120,
    align: 'center'
  },
  {
    label: '上牌省份',
    prop: 'province',
    width: 120,
    align: 'center'
  },
  {
    label: '上牌城市',
    prop: 'city',
    width: 120,
    align: 'center'
  },
  {
    label: '车牌号',
    prop: 'carCode',
    width: 120,
    align: 'center'
  },
  {
    label: '承租人',
    prop: '',
    minWidth: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '起租日期',
    prop: '',
    width: 120,
    align: 'center'
  },
  {
    type: 'action',
    prop: '',
    label: '操作',
    width: 100,
    align: 'center',
    fixed: 'right'
  }
]
export const supplierQueryConfig: DynamicFormDataItem[] = [
  {
    prop: '',
    label: '供应商名称',
    type: 'el-input',
    placeholder: '请输入'
  }
]
export const supplierTableColumn: ITableConfigProps[] = [
  {
    label: '名称',
    prop: '',
    minWidth: 120,
    align: 'center',
    forbiddenEdit: true,
    showOverflowTooltip: true
  },
  {
    label: '所在城市',
    prop: '',
    width: 140,
    align: 'center'
  },
  {
    label: '合作状态',
    prop: '',
    width: 120,
    align: 'center'
  },
  {
    label: '合作结束日期',
    prop: '',
    width: 140,
    align: 'center'
  }
]
