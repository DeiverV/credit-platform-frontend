import axios from 'axios'
import { env } from '@/config/env'
import { tokenInterceptor } from './interceptors/token.interceptor'
import { refreshInterceptor } from './interceptors/refresh-token.interceptor'

export const creditsApi = axios.create({
  baseURL: env.BASE_URL,
})

creditsApi.interceptors.request.use(
  (requestConfig) => tokenInterceptor(requestConfig),
  (error) => Promise.reject(error),
)
creditsApi.interceptors.response.use(
  (response) => response,
  (error) => refreshInterceptor(error),
)
