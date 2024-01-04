import type { ISearchUnit } from '@/components/SearchBar/type'
import type { ITableConfigProps } from '@/components/Table/type'
export const tableConfig: ITableConfigProps[] = [
  {
    label: '文件名',
    prop: 'fileName',
    valueType: '',
    minWidth: 180,
    align: 'left',
    showOverflowTooltip: true,
    fixed: true,
    show: true,
    showDisabled: true,
    slotHeader: 'fileNameHeader'
  },
  {
    label: '登记证归档序号',
    prop: 'registerCardArchiveNo',
    valueType: '',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    show: true,
    showDisabled: true,
    headerIcon: true,
    slotHeader: 'registerCardArchiveNoHeader'
  },
  {
    label: '核对结果',
    prop: 'verifyResult',
    valueType: '',
    width: 110,
    align: 'center',
    showOverflowTooltip: true,
    show: true,
    showDisabled: true,
    headerIcon: true,
    slotHeader: 'verifyResultHeader'
  },
  {
    label: '*登记证编号',
    prop: 'registerCardNo',
    valueType: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    show: true,
    slotName: 'soltItem'
  },
  {
    label: '*车架号',
    prop: 'vinNo',
    valueType: '',
    width: 150,
    align: 'center',
    showOverflowTooltip: true,
    show: true,
    slotName: 'soltItem'
  },
  {
    label: '*发动机号',
    prop: 'engineNo',
    valueType: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    show: true,
    slotName: 'soltItem'
  },
  {
    label: '*发动机型号',
    prop: 'engineType',
    valueType: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    show: true,
    slotName: 'soltItem'
  },
  {
    label: '*车牌号',
    prop: 'licensePlateNo',
    valueType: '',
    width: 110,
    align: 'center',
    showOverflowTooltip: true,
    show: true,
    slotName: 'soltItem'
  },
  {
    label: '*机动车所有人',
    prop: 'vehicleOwner',
    valueType: '',
    width: 150,
    align: 'left',
    showOverflowTooltip: true,
    show: true,
    slotName: 'soltItem'
  },
  {
    label: '*车身颜色',
    prop: 'vehicleColor',
    valueType: '',
    width: 110,
    align: 'center',
    showOverflowTooltip: true,
    show: true,
    slotName: 'soltItem'
  },
  {
    label: '*使用性质',
    prop: 'useType',
    valueType: '',
    width: 110,
    align: 'center',
    showOverflowTooltip: true,
    show: true,
    slotName: 'soltItem'
  },
  {
    label: '*抵押权人',
    prop: 'mortgagee',
    valueType: '',
    width: 250,
    align: 'left',
    showOverflowTooltip: true,
    show: true,
    slotName: 'soltItem'
  },
  {
    label: '*统一社会信用代码',
    prop: 'mortgageeUscc',
    valueType: '',
    width: 170,
    align: 'center',
    showOverflowTooltip: true,
    show: true,
    slotName: 'soltItem'
  },
  {
    label: '*抵押登记日期',
    prop: 'mortgageRegisterDate',
    valueType: '',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    show: true,
    slotName: 'soltItem'
  },
  {
    label: '批次号',
    prop: 'batchNo',
    valueType: '',
    width: 170,
    align: 'center',
    showOverflowTooltip: true,
    show: true
  },
  {
    label: '关联合同号',
    prop: 'contractNo',
    valueType: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    show: true
  },
  {
    label: '所属系统',
    prop: 'belongSystem',
    valueType: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    show: true
  },
  {
    label: '挂靠商',
    prop: 'affiliatesName',
    valueType: '',
    width: 120,
    align: 'left',
    showOverflowTooltip: true,
    show: true
  },
  {
    label: '办事处',
    prop: 'agencyName',
    valueType: '',
    width: 120,
    align: 'left',
    showOverflowTooltip: true,
    show: true
  },
  {
    label: '渠道商',
    prop: 'channelName',
    valueType: '',
    width: 120,
    align: 'left',
    showOverflowTooltip: true,
    show: true
  },
  {
    label: '创建人',
    prop: 'creatorName',
    valueType: '',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    show: true
  },
  {
    label: '创建时间',
    prop: 'createTime',
    valueType: 'dateType',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    show: true
  },
  {
    label: '归档状态',
    prop: 'archivalStatus',
    valueType: '',
    width: 110,
    align: 'center',
    showOverflowTooltip: true,
    show: true
  },
  {
    label: '归档时间',
    prop: 'archivalDate',
    valueType: 'dateType',
    width: 160,
    align: 'center',
    showOverflowTooltip: false,
    show: true
  }
]

export const searchConfig: ISearchUnit[] = [
  [
    {
      compType: 'el-date-picker',
      colSpan: 12,
      label: '核验时间',
      valueType: 'datetime',
      propStart: 'startVerifyTime',
      propEnd: 'endVerifyTime',
      placeholderStart: '核验开始时间',
      placeholderEnd: '核验结束时间'
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '创建人',
      valueType: 'input',
      prop: 'creatorName',
      placeholder: '请输入创建人'
    },
    {
      compType: 'el-select',
      colSpan: 6,
      label: '核对结果',
      valueType: 'select',
      prop: 'verifyResult',
      placeholder: '请选择核对结果',
      options: 'OCR_STATUS'
    }
  ],
  [
    {
      compType: 'el-input',
      colSpan: 6,
      label: '批次号',
      valueType: 'input',
      prop: 'batchNo',
      placeholder: '请输入批次号'
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '发动机号',
      valueType: 'input',
      prop: 'engineNo',
      placeholder: '请输入发动机号'
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '发动机型号',
      valueType: 'input',
      prop: 'engineType',
      placeholder: '请输入发动机型号'
    },
    {
      compType: 'el-select',
      colSpan: 6,
      label: '归档状态',
      valueType: 'select',
      prop: 'archivalStatus',
      placeholder: '请选择归档状态',
      options: 'ARCHIVE_STATUS'
    }
  ],
  [
    {
      compType: 'el-input',
      colSpan: 6,
      label: '合同号',
      valueType: 'input',
      prop: 'contractNo',
      placeholder: '请输入合同号'
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '车牌号',
      valueType: 'input',
      prop: 'licensePlateNo',
      placeholder: '请输入车牌号'
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '车架号',
      valueType: 'input',
      prop: 'vinNo',
      placeholder: '请输入车架号'
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '办事处',
      valueType: 'input',
      prop: 'agencyName',
      placeholder: '请输入办事处'
    }
  ],
  [
    {
      compType: 'el-input',
      colSpan: 12,
      label: '挂靠商',
      valueType: 'input',
      prop: 'affiliatesName',
      placeholder: '请输入挂靠商'
    },
    {
      compType: 'el-input',
      colSpan: 12,
      label: '渠道商',
      valueType: 'input',
      prop: 'channelName',
      placeholder: '请输入渠道商'
    }
  ]
]
