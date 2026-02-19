import axios, { AxiosError, HttpStatusCode } from 'axios'
import {
  getIsRefreshing,
  addToQueue,
  processQueue,
  handleRefreshToken,
} from '@/features/auth/api/refresh-manager'

export const refreshInterceptor = async (error: AxiosError) => {
  const originalRequest = error.config!
  const status = error.response?.status

  if (status === HttpStatusCode.Unauthorized) {
    if (getIsRefreshing()) return addToQueue(originalRequest)

    try {
      const token = await handleRefreshToken()
      processQueue(null, token || null)
      originalRequest.headers.Authorization = `Bearer ${token}`
      return await axios(originalRequest)
    } catch (error) {
      processQueue(error as AxiosError, null)
      throw error
    }
  }

  throw error
}
