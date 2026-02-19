import { authRepository } from './infrastructure/auth.repository'
import { authUseCasesFactory } from './application'
import { creditsApi } from '@/features/shared/api/credits.api'

const authRepoFactory = () => authRepository(creditsApi)
const repo = authRepoFactory()

export const authUseCases = authUseCasesFactory(repo)
