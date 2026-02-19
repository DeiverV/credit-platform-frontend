export interface IUserCredentials {
  email: string
  password: string
}

export interface IAuthResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    email: string
    role: string
  }
}
