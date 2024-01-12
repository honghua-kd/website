import { PageRequest } from '@/api/types/request'

export interface SpecialBasicRequest {
  originalDocumentType?: string | null
  replaceDocumentType?: string | null
}

export type SpecialListRequest = SpecialBasicRequest & PageRequest

export interface ChangeStatusRequest {
  batchNo?: string | null
  status?: number | null
}

type SysContractStatus = string[]
export interface EditRequest {
  batchNo?: string
  originalDocumentNo?: string[]
  replaceDocumentNo?: string
  systemContractStatus: SysContractStatus[]
}
