import { create } from "zustand"

export type NoteSaveState = "idle" | "dirty" | "saving" | "saved" | "error"

interface NotesState {
  notes: Record<string, string>
  loaded: boolean
  saveState: NoteSaveState
  /** Slugs whose last write failed, so the UI can say which. */
  lastError: string | null

  load: () => Promise<void>
  setNote: (slug: string, text: string) => void
  flush: (slug: string) => Promise<void>
}

/**
 * Per-problem scratchpad notes.
 *
 * Typing updates local state immediately and schedules a write; the write is
 * debounced so a paragraph is one request rather than one per keystroke. The
 * timer lives outside the store because it is not state — re-rendering on every
 * keystroke because a timer id changed would be pointless work.
 */
let saveTimer: ReturnType<typeof setTimeout> | null = null
const SAVE_DELAY_MS = 600

async function persist(slug: string, text: string): Promise<void> {
  const res = await fetch("/api/notes", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug, text }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data?.error ?? `Save failed (${res.status})`)
  }
}

export const useNotesStore = create<NotesState>()((set, get) => ({
  notes: {},
  loaded: false,
  saveState: "idle",
  lastError: null,

  load: async () => {
    if (get().loaded) return
    try {
      const res = await fetch("/api/notes")
      if (!res.ok) {
        set({ loaded: true })
        return
      }
      const data = await res.json()
      const raw = (data?.notes ?? {}) as Record<string, { text?: string }>
      const notes: Record<string, string> = {}
      for (const [slug, note] of Object.entries(raw)) {
        if (typeof note?.text === "string") notes[slug] = note.text
      }
      set({ notes, loaded: true })
    } catch {
      // Offline or the route is down: keep whatever is in memory and carry on.
      set({ loaded: true })
    }
  },

  setNote: (slug, text) => {
    set((s) => ({ notes: { ...s.notes, [slug]: text }, saveState: "dirty", lastError: null }))
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      void get().flush(slug)
    }, SAVE_DELAY_MS)
  },

  flush: async (slug) => {
    if (saveTimer) {
      clearTimeout(saveTimer)
      saveTimer = null
    }
    const text = get().notes[slug] ?? ""
    set({ saveState: "saving" })
    try {
      await persist(slug, text)
      set({ saveState: "saved", lastError: null })
    } catch (error) {
      set({
        saveState: "error",
        lastError: error instanceof Error ? error.message : String(error),
      })
    }
  },
}))
