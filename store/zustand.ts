import { create } from 'zustand'

type SidebarStore = {
  servers: boolean
  addServer: () => void
  currServer: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  servers: false,
  addServer: () => set({ servers: true }),
  currServer: () => set({ servers: false }),
}))
