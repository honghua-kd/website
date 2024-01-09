import type { ISearchUnit } from '@/components/SearchBar/type'
import type { ITableConfigProps } from '@/components/Table/type'
export const tableConfig: ITableConfigProps[] = [
  {
    label: '文件名',
    prop: 'fileName',
    minWidth: 180,
    align: 'left',
    showOverflowTooltip: true,
    fixed: true,
    forbiddenEdit: true,
    slotHeader: 'fileNameHeader'
  },
  {
    label: '登记证归档序号',
    prop: 'registerCardArchiveNo',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    forbiddenEdit: true,
    headerIcon: true,
    slotHeader: 'registerCardArchiveNoHeader'
  },
  {
    label: '核对结果',
    prop: 'verifyResult',
    width: 110,
    align: 'center',
    showOverflowTooltip: true,
    forbiddenEdit: true,
    headerIcon: true,
    slotHeader: 'verifyResultHeader'
  },
  {
    label: '*登记证编号',
    prop: 'registerCardNo',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    slotName: 'soltItem'
  },
  {
    label: '*车架号',
    prop: 'vinNo',
    width: 150,
    align: 'center',
    showOverflowTooltip: true,
    slotName: 'soltItem'
  },
  {
    label: '*发动机号',
    prop: 'engineNo',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    slotName: 'soltItem'
  },
  {
    label: '*发动机型号',
    prop: 'engineType',
    width: 120,
    align: 'center',
    showOverflowTooltip: true,
    slotName: 'soltItem'
  },
  {
    label: '*车牌号',
    prop: 'licensePlateNo',
    width: 110,
    align: 'center',
    showOverflowTooltip: true,
    slotName: 'soltItem'
  },
  {
    label: '*机动车所有人',
    prop: 'vehicleOwner',
    width: 150,
    align: 'left',
    showOverflowTooltip: true,
    slotName: 'soltItem'
  },
  {
    label: '*车身颜色',
    prop: 'vehicleColor',
    width: 110,
    align: 'center',
    showOverflowTooltip: true,
    slotName: 'soltItem'
  },
  {
    label: '*使用性质',
    prop: 'useType',
    width: 110,
    align: 'center',
    showOverflowTooltip: true,
    slotName: 'soltItem'
  },
  {
    label: '*抵押权人',
    prop: 'mortgagee',
    width: 250,
    align: 'left',
    showOverflowTooltip: true,
    slotName: 'soltItem'
  },
  {
    label: '*统一社会信用代码',
    prop: 'mortgageeUscc',
    width: 170,
    align: 'center',
    showOverflowTooltip: true,
    slotName: 'soltItem'
  },
  {
    label: '*抵押登记日期',
    prop: 'mortgageRegisterDate',
    width: 160,
    align: 'center',
    showOverflowTooltip: true,
    slotName: 'soltItem'
  },
  {
    label: '批次号',
    prop: 'batchNo',
    width: 170,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '关联合同号',
    prop: 'contractNo',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '所属系统',
    prop: 'belongSystem',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '挂靠商',
    prop: 'affiliatesName',
    width: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '办事处',
    prop: 'agencyName',
    width: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '渠道商',
    prop: 'channelName',
    width: 120,
    align: 'left',
    showOverflowTooltip: true
  },
  {
    label: '创建人',
    prop: 'creatorName',
    width: 120,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '创建时间',
    prop: 'createTime',
    type: 'date',
    width: 160,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '归档状态',
    prop: 'archivalStatus',
    width: 110,
    align: 'center',
    showOverflowTooltip: true
  },
  {
    label: '归档时间',
    prop: 'archivalDate',
    type: 'date',
    width: 160,
    align: 'center',
    showOverflowTooltip: false
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

export const searchConfig: ISearchUnit[] = [
  [
    {
      compType: 'date-range-picker',
      colSpan: 12,
      label: '核验时间',
      propStart: 'startVerifyTime',
      propEnd: 'endVerifyTime',
      placeholderStart: '核验开始时间',
      placeholderEnd: '核验结束时间'
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '创建人',
      prop: 'creatorName',
      placeholder: '请输入创建人'
    },
    {
      compType: 'el-select',
      colSpan: 6,
      label: '核对结果',
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
      prop: 'batchNo',
      placeholder: '请输入批次号'
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '发动机号',
      prop: 'engineNo',
      placeholder: '请输入发动机号'
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '发动机型号',
      prop: 'engineType',
      placeholder: '请输入发动机型号'
    },
    {
      compType: 'el-select',
      colSpan: 6,
      label: '归档状态',
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
      prop: 'contractNo',
      placeholder: '请输入合同号'
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '车牌号',
      prop: 'licensePlateNo',
      placeholder: '请输入车牌号'
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '车架号',
      prop: 'vinNo',
      placeholder: '请输入车架号'
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '办事处',
      prop: 'agencyName',
      placeholder: '请输入办事处'
    }
  ],
  [
    {
      compType: 'el-input',
      colSpan: 12,
      label: '挂靠商',
      prop: 'affiliatesName',
      placeholder: '请输入挂靠商'
    },
    {
      compType: 'el-input',
      colSpan: 12,
      label: '渠道商',
      prop: 'channelName',
      placeholder: '请输入渠道商'
    }
  ]
]
