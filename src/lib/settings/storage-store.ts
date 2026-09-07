"use client"

import { create } from "zustand"

export interface DirInfo {
  bytes: number
  files: number
  entries: number
  exists: boolean
}

export interface StorageInfo {
  path: string
  userData: DirInfo
  sandbox: DirInfo
  next: DirInfo
  cache: DirInfo
  events: { count: number; bytes: number; bytesPerEvent: number }
}

export type ClearTarget = "sandbox" | "next" | "cache"

interface StorageState {
  info: StorageInfo | null
  loading: boolean
  clearing: ClearTarget | null
  load: () => Promise<void>
  clear: (target: ClearTarget) => Promise<number>
}

/**
 * Storage figures live in a store rather than component state so the fetch can be
 * kicked off from an effect without tripping React's set-state-in-effect rule --
 * the same shape the progress store already uses.
 */
export const useStorageStore = create<StorageState>((set) => ({
  info: null,
  loading: false,
  clearing: null,

  load: async () => {
    set({ loading: true })
    try {
      const res = await fetch("/api/storage")
      set({ info: res.ok ? await res.json() : null, loading: false })
    } catch {
      set({ loading: false })
    }
  },

  clear: async (target) => {
    set({ clearing: target })
    let freed = 0
    try {
      const res = await fetch(`/api/storage?target=${target}`, { method: "DELETE" })
      if (res.ok) freed = (await res.json()).freedBytes ?? 0
    } catch {
      /* reported by the caller via the returned byte count */
    }
    set({ clearing: null })
    try {
      const res = await fetch("/api/storage")
      if (res.ok) set({ info: await res.json() })
    } catch {
      /* leave the previous reading in place */
    }
    return freed
  },
}))
