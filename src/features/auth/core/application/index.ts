import { refreshTokenUseCase } from './refresh-token.use-case'
import { loginUseCase } from './login.use-case'
import { registerUseCase } from './register.use-case'
import { logoutUseCase } from './logout.use-case'
import type { IAuthRepository } from '../domain/auth.repository'

export const authUseCasesFactory = (repo: IAuthRepository) => ({
  login: loginUseCase(repo),
  register: registerUseCase(repo),
  refreshToken: refreshTokenUseCase(repo),
  logout: logoutUseCase(repo),
})
