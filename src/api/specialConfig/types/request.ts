import { PageRequest } from '@/api/types/request'

export interface SpecialBasicRequest {
  originalDocumentType?: string | null
  replaceDocumentType?: string | null
}

export type SpecialListRequest = SpecialBasicRequest & PageRequest
