export default {
  hidden: false,
  title: '核验车辆登记证',
  icon: 'scan',
  name: 'scanAndVerify'
}

export const verifyOpts = [
  {
    label: '全部',
    value: 'all'
  },
  {
    label: '处理中',
    value: 'OCR_STATUS_PRO'
  },
  {
    label: '未通过',
    value: 'OCR_STATUS_NO'
  },
  {
    label: '通过',
    value: 'OCR_STATUS_YES'
  }
]

export const archiveStatusOpts = [
  {
    label: '全部',
    value: 'all'
  },
  {
    label: '已归档',
    value: 'ARCHIVE_STATUS_YES'
  },
  {
    label: '未归档',
    value: 'ARCHIVE_STATUS_NO'
  }
]

export const mortOpts = [
  {
    label: '海通恒信国际融资租赁股份有限公司',
    value: '1'
  },
  {
    label: '海通恒信国际融资租赁（天津）有限公司',
    value: '2'
  },
  {
    label: '海通恒运融资租赁（上海）有限公司',
    value: '3'
  },
  {
    label: '海通恒信小微融资租赁（上海）有限公司',
    value: '4'
  }
]
