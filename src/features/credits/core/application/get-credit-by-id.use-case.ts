import type { ICreditsRepository } from '../domain/credits.repository'

export const getCreditByIdUseCase =
  (repo: ICreditsRepository): ICreditsRepository['getCreditById'] =>
  async (id) =>
    await repo.getCreditById(id)
