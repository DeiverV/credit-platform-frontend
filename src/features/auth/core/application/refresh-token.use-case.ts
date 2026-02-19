import type { IAuthRepository } from '../domain/auth.repository'

export const refreshTokenUseCase =
  (repo: IAuthRepository): IAuthRepository['refreshToken'] =>
  async (refreshToken) =>
    await repo.refreshToken(refreshToken)
