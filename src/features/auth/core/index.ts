import { authRepository } from './infrastructure/auth.repository'
import { authUseCasesFactory } from './application'
import { authApi } from '@/features/auth/api/auth.api'

const authRepoFactory = () => authRepository(authApi)
const repo = authRepoFactory()

export const authUseCases = authUseCasesFactory(repo)
