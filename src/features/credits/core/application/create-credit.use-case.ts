import type { ICreditsRepository } from '../domain/credits.repository'

export const createCreditUseCase =
  (repo: ICreditsRepository): ICreditsRepository['createCredit'] =>
  async (params) =>
    await repo.createCredit(params)
