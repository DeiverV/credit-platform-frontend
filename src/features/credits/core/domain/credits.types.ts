export type Country = 'CO' | 'MX'
export type CreditStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'PROCESSING'

export interface ICreditApplication {
  id: string
  country: string
  fullName: string
  documentType: string
  documentId: string
  requestedAmount: number
  monthlyIncome: number
  status: string
  riskScore: number
  riskNotes: string
  applicationDate: string
  createdAt: string
  updatedAt: string
}

export interface ICreateCreditPayload {
  country: Country
  fullName: string
  documentId: string
  requestedAmount: number
  monthlyIncome: number
}

export interface IListCreditsPayload {
  page?: number
  limit?: number
  toDate?: string
  fromDate?: string
  status?: CreditStatus
  country?: Country
}

export interface IListCreditsResponse {
  data: ICreditApplication[]
  total: number
  page: number
  limit: number
  totalPages: number
}
