import { create } from 'zustand'

type SidebarStore = {
  servers: boolean
  updateServer: () => void
  currServer: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  servers: false,
  updateServer: () => set({ servers: true }),
  currServer: () => set({ servers: false }),
}))
