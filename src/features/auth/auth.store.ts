import { create, type StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthUser {
  id: string
  email: string
  role: string
}

interface AuthState {
  user: AuthUser | null
  setUser: (user: AuthUser) => void
  clearUser: () => void
}

const s: StateCreator<AuthState> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
})

export const useAuthStore = create<AuthState>()(
  persist(s, {
    name: 'auth',
  }),
)
