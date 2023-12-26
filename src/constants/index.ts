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

export const EXPRESS_STATUS = {
  RECEIVE: 1, // 已接收
  REJECT: 0, // 未接收
  PROBLEM: 2 // 问题件
}

export const EXPRESS_TYPE = {
  RECEIVE: 1, // 接收
  SEND: 0 // 寄送
}
