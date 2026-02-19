import type {
  IListCreditsPayload,
  IListCreditsResponse,
  ICreateCreditPayload,
  ICreditApplication,
} from './credits.types'

export interface ICreditsRepository {
  createCredit: (params: ICreateCreditPayload) => Promise<ICreditApplication>
  getCreditById: (id: string) => Promise<ICreditApplication>
  listCredits: (params: IListCreditsPayload) => Promise<IListCreditsResponse>
}
