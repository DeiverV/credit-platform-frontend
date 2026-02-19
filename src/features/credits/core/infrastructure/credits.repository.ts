import type { RepositoryFactory } from '@/types/repository-factory.type'
import type { ICreditsRepository } from '../domain/credits.repository'
import type {
  ICreateCreditPayload,
  IListCreditsPayload,
} from '../domain/credits.types'

export const creditsRepository: RepositoryFactory<ICreditsRepository> = (
  api,
) => ({
  async createCredit(payload: ICreateCreditPayload) {
    const { data } = await api.post('/credit-applications', payload)
    return data
  },
  async getCreditById(id: string) {
    const { data } = await api.get(`/credit-applications/${id}`)
    return data
  },
  async listCredits(params: IListCreditsPayload) {
    const { data } = await api.get('/credit-applications', { params })
    return data
  },
})
