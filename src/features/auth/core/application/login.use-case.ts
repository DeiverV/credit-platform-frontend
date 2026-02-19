import type { IAuthRepository } from '../domain/auth.repository'

export const loginUseCase =
  (repo: IAuthRepository): IAuthRepository['login'] =>
  async (payload) =>
    await repo.login(payload)
