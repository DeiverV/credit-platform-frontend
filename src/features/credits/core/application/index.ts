import { getCreditByIdUseCase } from './get-credit-by-id.use-case'
import { getListCreditsUseCase } from './get-list-credits.use-case'
import { createCreditUseCase } from './create-credit.use-case'
import type { ICreditsRepository } from '../domain/credits.repository'

export const creditsUseCasesFactory = (repo: ICreditsRepository) => ({
  getCreditById: getCreditByIdUseCase(repo),
  getListCredits: getListCreditsUseCase(repo),
  createCredit: createCreditUseCase(repo),
})
