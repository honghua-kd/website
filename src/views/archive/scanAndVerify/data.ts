export default {
  tableConfig: [
    {
      label: '文件名',
      prop: 'fileName',
      valueType: 'custom',
      minWidth: 180,
      align: 'left',
      showOverflowTooltip: true,
      fixed: true,
      show: true,
      showDisabled: true
    },
    {
      label: '登记证归档序号',
      prop: 'registerCardArchiveNo',
      valueType: 'custom',
      width: 160,
      align: 'center',
      showOverflowTooltip: true,
      show: true,
      showDisabled: true
    },
    {
      label: '核对结果',
      prop: 'verifyResult',
      valueType: 'custom',
      width: 110,
      align: 'center',
      showOverflowTooltip: true,
      show: true,
      showDisabled: true
    },
    {
      label: '*登记证编号',
      prop: 'registerCardNo',
      valueType: 'soltItem',
      width: 120,
      align: 'center',
      showOverflowTooltip: true,
      show: true
    },
    {
      label: '*车架号',
      prop: 'vinNo',
      valueType: 'soltItem',
      width: 150,
      align: 'center',
      showOverflowTooltip: true,
      show: true
    },
    {
      label: '*发动机号',
      prop: 'engineNo',
      valueType: 'soltItem',
      width: 120,
      align: 'center',
      showOverflowTooltip: true,
      show: true
    },
    {
      label: '*发动机型号',
      prop: 'engineType',
      valueType: 'soltItem',
      width: 120,
      align: 'center',
      showOverflowTooltip: true,
      show: true
    },
    {
      label: '*车牌号',
      prop: 'licensePlateNo',
      valueType: 'soltItem',
      width: 110,
      align: 'center',
      showOverflowTooltip: true,
      show: true
    },
    {
      label: '*机动车所有人',
      prop: 'vehicleOwner',
      valueType: 'soltItem',
      width: 150,
      align: 'left',
      showOverflowTooltip: true,
      show: true
    },
    {
      label: '*车身颜色',
      prop: 'vehicleColor',
      valueType: 'soltItem',
      width: 110,
      align: 'center',
      showOverflowTooltip: true,
      show: true
    },
    {
      label: '*使用性质',
      prop: 'useType',
      valueType: 'soltItem',
      width: 110,
      align: 'center',
      showOverflowTooltip: true,
      show: true
    },
    {
      label: '*抵押权人',
      prop: 'mortgagee',
      valueType: 'soltItem',
      width: 250,
      align: 'left',
      showOverflowTooltip: true,
      show: true
    },
    {
      label: '*统一社会信用代码',
      prop: 'mortgageeUscc',
      valueType: 'soltItem',
      width: 170,
      align: 'center',
      showOverflowTooltip: true,
      show: true
    },
    {
      label: '*抵押登记日期',
      prop: 'mortgageRegisterDate',
      valueType: 'soltItem',
      width: 160,
      align: 'center',
      showOverflowTooltip: true,
      show: true
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
      valueType: '',
      width: 160,
      align: 'center',
      showOverflowTooltip: true,
      show: true
    },
    {
      label: '归档状态',
      prop: 'archivalStatus',
      valueType: 'archivalStatus',
      width: 110,
      align: 'center',
      showOverflowTooltip: true,
      show: true
    },
    {
      label: '归档时间',
      prop: 'archivalDate',
      valueType: '',
      width: 160,
      align: 'center',
      showOverflowTooltip: false,
      show: true
    }
  ]
}
