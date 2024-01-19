export const ARCHIVE_STATUS = {
  ALL: 'ALL',
  ACHIVED: 'ARCHIVE_STATUS_YES', // 已归档
  UNACHIVED: 'ARCHIVE_STATUS_NO' // 未归档
}

export const VERIFY_RESULTS = {
  ALL: 'ALL',
  PASS: 'OCR_STATUS_YES', // 已通过
  PROCESSING: 'OCR_STATUS_PRO', // 处理中
  FAIL: 'OCR_STATUS_NO' // 未通过
}

export const DICT_TYPES = [
  'ARCHIVE_STATUS',
  'OCR_STATUS',
  'EXPRESS_STATUS',
  'EXPRESS_CONTENT',
  'EXPRESS_COMPANY',
  'EXPRESS_TYPE',
  'NOTICE_MESSGAE_TYPE',
  'NOTICE_STATUS',
  'SYSTEM_DOCUMENT_TYPE',
  'YESNO',
  'MORTGAGE_CITYCONFIG',
  'MORTGAGE_CITYCONFIG_NO',
  'SUPPLIER_DETAIL_STATUS',
  'SOURCE_SYSTEM',
  'SUPPLIER_DETAIL_TYPE',
  'SUPPLIER_SETTLEMENT_WAY',
  'SUPPLIER_REGISTER_TYPE',
  'SUPPLIER_ACCOUNT_STATUS',
  'SEAL_TYPE',
  'SOURCE_SYSTEM',
  'MORTGAGE_TASK_TYPE',
  'MORTGAGE_ALLOCATION_TYPE',
  'ENABLE_DISABLE_STATUS',
  'CONTRACT_SUBJECT',
  'MORTGAGE_CAPITAL_INFO',
  'MORTGAGE_SUBJECT_TYPE',
  'SYSTEM_DOCUMENT_APPROVAL_STATUS',
  'START_STOP_TASK_STATUS',
  'DOCUMENT_PARAM_TYPE',
  'DOCUMENT_TEMPLATE_APPLICABLE_TYPE',
  'SMS_SEND_STATUS'
]

export const NOTICE_STATUS = {
  UNREAD: 0,
  READ: 1
}
