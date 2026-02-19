import { authUseCases } from '@/features/auth/core'
import { cleanCookies } from '@/lib/cookies.utils'
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

// Refresh token flags managment with BroadcastChannel API to handle token refresh and logout on multiple tabs
let isRefreshing = false
const authChannel = new BroadcastChannel('auth')

authChannel.onmessage = (event) => {
  const { type, token } = event.data

  if (type === 'refresh_start') {
    isRefreshing = true
  }

  if (type === 'refresh_end') {
    isRefreshing = false
    processQueue(null, token)
  }

  if (type === 'logout') {
    isRefreshing = false
    globalThis.location.href = '/'
  }
}

export const getIsRefreshing = () => isRefreshing
export const setIsRefreshing = (value: boolean, token?: string) => {
  authChannel.postMessage({
    type: value ? 'refresh_start' : 'refresh_end',
    token,
  })
  isRefreshing = value
}

export const handleRefreshToken = async () => {
  setIsRefreshing(true)

  try {
    const currentRefreshToken = Cookies.get('refreshToken')

    if (!currentRefreshToken) {
      await handleLogout()
      return
    }

    const { accessToken, refreshToken } =
      await authUseCases.refreshToken(currentRefreshToken)

    Cookies.set('accessToken', accessToken)
    Cookies.set('refreshToken', refreshToken)
    setIsRefreshing(false)
    return accessToken
  } catch (error) {
    await handleLogout()
    throw error
  }
}

export const handleLogout = async () => {
  try {
    await authUseCases.logout()
  } finally {
    cleanCookies()
    authChannel.postMessage({ type: 'logout' })
    globalThis.location.href = '/'
  }
}

// Queue managment functions to retry requests after token refresh
const queue: {
  config: InternalAxiosRequestConfig
  resolve: (value: any) => void
  reject: (reason?: any) => void
}[] = []

export const processQueue = (
  error: AxiosError | null,
  token: string | null,
) => {
  for (const { config, resolve, reject } of queue) {
    if (error) {
      reject(error)
      continue
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    resolve(axios(config))
  }

  queue.length = 0
}

export const addToQueue = (config: InternalAxiosRequestConfig) =>
  new Promise((resolve, reject) => {
    queue.push({ config, resolve, reject })
  })
