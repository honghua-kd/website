export type firstTableDataType = {
  supplierName?: string
  supplierTypeName?: string
  coverArea?: string
  contactName?: string
  phone?: string
  belongCompanyName?: string
}
export type secondTableDataType = {
  uid?: string
  list?: string
  coverArea?: string
  contactName?: string
  phone?: string
  belongCompanyName?: string
  startTime?: string
  endTime?: string
  status?: string
  time?: string
  adress?: string
  name?: string
  mailingStatus?: string
  mailingTime?: string
}
export type progressTableDataType = {
  supplierName?: string
  supplierTypeName?: string
  coverArea?: string
  contactName?: string
  phone?: string
  belongCompanyName?: string
  emails?: string
}
export type businessLeftTableDataType = {
  supplierName?: string
  supplierTypeName?: string
  coverArea?: string
  contactName?: string
  phone?: string
  belongCompanyName?: string
  emails?: string
}
export type businessRightTableDataType = {
  supplierName?: string
  supplierTypeName?: string
  coverArea?: string
  contactName?: string
  phone?: string
  belongCompanyName?: string
  emails?: string
}
export type settlementTableDataType = {
  supplierName?: string
  supplierTypeName?: string
  coverArea?: string
  contactName?: string
  phone?: string
  belongCompanyName?: string
  emails?: string
  time?: string
}
export type operatingTableType = {
  id: number
  Fileds: string
  beforeUpdate: string
  update: string
}
