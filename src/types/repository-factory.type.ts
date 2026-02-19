import type { AxiosInstance } from 'axios'

export type RepositoryFactory<T> = (api: AxiosInstance) => T
