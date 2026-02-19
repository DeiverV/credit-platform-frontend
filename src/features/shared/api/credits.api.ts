import axios from 'axios'
import { env } from '@/config/env'

export const creditsApi = axios.create({
  baseURL: env.BASE_URL,
})
