import type { IAuthRepository } from '../domain/auth.repository'

export const logoutUseCase =
  (repo: IAuthRepository): IAuthRepository['logout'] =>
  async () =>
    await repo.logout()
