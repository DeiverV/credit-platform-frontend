import type { IAuthResponse, IUserCredentials } from './auth.types'

export interface IAuthRepository {
  login: (payload: IUserCredentials) => Promise<IAuthResponse>
  register: (payload: IUserCredentials) => Promise<IAuthResponse>
  refreshToken: (refreshToken: string) => Promise<IAuthResponse>
  logout: () => Promise<void>
}
