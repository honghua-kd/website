import type { ISearchUnit } from '@/components/SearchBar/type'
export const searchConfig: ISearchUnit[] = [
  [
    {
      compType: '',
      colSpan: 6,
      label: '来源系统',
      prop: '',
      placeholder: '请输入',
      slotName: 'sourceSystem'
    },
    {
      compType: 'el-input',
      colSpan: 6,
      label: '代理商/办事处',
      prop: 'agencyName',
      options: '',
      placeholder: '请输入'
    },
    {
      compType: '',
      colSpan: 6,
      label: '城市',
      prop: '',
      options: '',
      placeholder: '请选择',
      slotName: 'area'
    }
  ],
  []
]
