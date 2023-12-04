export default {
  hidden: false,
  title: '核验车辆登记证',
  icon: 'scan',
  name: 'scanAndVerify'
}

export const verifyOpts = [
  {
    label: '全部',
    value: 1
  },
  {
    label: '处理中',
    value: 2
  },
  {
    label: '未通过',
    value: 3
  },
  {
    label: '通过',
    value: 4
  }
]

export const archiveStatusOpts = [
  {
    label: '全部',
    value: 1
  },
  {
    label: '已归档',
    value: 2
  },
  {
    label: '未归档',
    value: 3
  }
]

export const mortOpts = [
  {
    label: '海通恒信国际融资租赁股份有限公司',
    value: 1
  },
  {
    label: '海通恒信国际融资租赁（天津）有限公司',
    value: 2
  },
  {
    label: '海通恒运融资租赁（上海）有限公司',
    value: 3
  },
  {
    label: '海通恒信小微融资租赁（上海）有限公司',
    value: 4
  }
]
