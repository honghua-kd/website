export interface AgencyDetailResponse {
  agencyName: string
  sourceSystem: string
  Contract: string[]
  taskType: string[]
  DischargeCharge?: number | null | undefined
  certificateStatus: string[]
  channel?: number | null | undefined
  Submission: string[]
  MaterialDestination: number
}
