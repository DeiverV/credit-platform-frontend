import { create } from 'zustand'

interface CreditsState {
  isCreateOpen: boolean
  setIsCreateOpen: (isCreateOpen: boolean) => void
}

export const useCreditsStore = create<CreditsState>((set) => ({
  isCreateOpen: false,
  setIsCreateOpen: (isCreateOpen) => set({ isCreateOpen }),
}))
