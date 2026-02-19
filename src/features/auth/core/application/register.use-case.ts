import type { IAuthRepository } from '../domain/auth.repository'

export const registerUseCase =
  (repo: IAuthRepository): IAuthRepository['register'] =>
  async (payload) =>
    await repo.register(payload)
