import type { ICreditsRepository } from '../domain/credits.repository'

export const getListCreditsUseCase =
  (repo: ICreditsRepository): ICreditsRepository['listCredits'] =>
  async (params) =>
    await repo.listCredits(params)
