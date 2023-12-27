import { PageRequest } from '@/api/types/request'
export interface SupplierListRequest extends PageRequest {
  supplierName?: string
  belongCompany?: string
  provinceCode?: number
  cityCode?: number
  countyCode?: number
  status?: number
  supplierType?: number
  expireDateStart?: string
  expireDateEnd?: string
  innerInterfaceStaffCode?: string
}
