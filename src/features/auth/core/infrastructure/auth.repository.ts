import type { RepositoryFactory } from '@/types/repository-factory.type'
import type { IAuthRepository } from '../domain/auth.repository'
import type { IUserCredentials } from '../domain/auth.types'
import Cookies from 'js-cookie'

export const authRepository: RepositoryFactory<IAuthRepository> = (api) => ({
  async login(payload: IUserCredentials) {
    const { data } = await api.post('/auth/login', payload)
    return data
  },
  async register(payload: IUserCredentials) {
    const { data } = await api.post('/auth/register', payload)
    return data
  },
  async refreshToken(refreshToken: string) {
    const { data } = await api.post('/auth/refresh', { refreshToken })
    return data
  },
  async logout() {
    await api.post('/auth/logout', undefined, {
      headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
    })
  },
})
