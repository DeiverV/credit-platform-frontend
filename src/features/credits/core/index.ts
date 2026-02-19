import { creditsRepository } from './infrastructure/credits.repository'
import { creditsUseCasesFactory } from './application'
import { creditsApi } from '@/features/shared/api/credits.api'

const creditsRepoFactory = () => creditsRepository(creditsApi)
const repo = creditsRepoFactory()

export const creditsUseCases = creditsUseCasesFactory(repo)
