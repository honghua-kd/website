# Table 组件

## Table 属性说明

```js
interface IProps {
  columnConfig: ITableConfigProps[]   // 表格column 配置接收字段
  data: TableRecord[]   // 表格渲染数据
  loading?: boolean    // loading
  height?: number     // 表格高度，通常为计算高度
  isSelected?: boolean  // 是否需要selection 功能 true | false，若默认的selection不满足，可以传入插槽 #selection
  pageTotal?: number  // 总页数 分页功能
  setColumnEnable?: boolean  // 控制表格列开关  true | false
}
```

## Table 回调方法

```js
const emit = defineEmits([
  'selection-change', // 选中表格回调
  'size-change', // 分页-切换pageSize
  'current-change', // 分页-切换页数
  'header-click' // 表头点击回调
])
```

## 配置表格列属性配置

```js
interface ITableConfigProps {
  label: string   // 表头名称
  prop: string    // 表字段名
  align?: string  // 'left' | 'right' | 'center'
  headerIcon?: string | boolean  // 自定义表头标识设置为 true
  slotName?: string    // 若column为自定义插槽，这个字段同步插槽名
  showOverflowTooltip?: boolean // 是否展示tooltip
  fixed?: string | boolean   // 是否固定-同步 element-plus table 的fixed 属性
  valueType?: string   // 该配置的类型，若时间格式 'dateType' | '' 默认展示行
  width?: string | number // 宽度
  minWidth?: string | number  // 最小宽度
  show?: boolean       // 和设置表格列功能同步，通常设置为true
  forbiddenEdit?: boolean  // 和设置表格列功能同步，若为true代表表格的固定列，不会被隐藏
  customStyle?: CustomStyleType  // 单元格 自定义样式 写法通style写法
  slotHeader?: string  // 若表头为自定义插槽，这个字段同步插槽名
}
```

## column 配置 demo

```js
export const tableConfig = [
  {
    label: '文件名',
    prop: 'fileName',
    valueType: '',
    minWidth: 180,
    align: 'left',
    showOverflowTooltip: true,
    fixed: true,
    show: true,
    forbiddenEdit: true,
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
    forbiddenEdit: true,
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
    forbiddenEdit: true,
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
```
