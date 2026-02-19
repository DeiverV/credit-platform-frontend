import type { InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

export const tokenInterceptor = (requestConfig: InternalAxiosRequestConfig) => {
  const token = Cookies.get('accessToken')

  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`
  }

  return requestConfig
}
