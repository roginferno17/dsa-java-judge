"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  AppSettings,
  DEFAULT_SETTINGS,
  sanitizeSettings,
  themeStyleVars,
} from "@/lib/settings/types"

export { SETTINGS_STORAGE_KEY } from "@/lib/settings/storage-key"
import { SETTINGS_STORAGE_KEY } from "@/lib/settings/storage-key"

interface SettingsState {
  settings: AppSettings
  loaded: boolean
  saving: boolean
  load: () => Promise<void>
  update: (patch: DeepPartial<AppSettings>) => void
  reset: () => Promise<void>
  importSettings: (raw: unknown) => void
  exportTheme: () => string
}

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] }

function merge(base: AppSettings, patch: DeepPartial<AppSettings>): AppSettings {
  const out = { ...base } as Record<string, unknown>
  for (const [k, v] of Object.entries(patch)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      out[k] = { ...(base[k as keyof AppSettings] as object), ...v }
    } else if (v !== undefined) {
      out[k] = v
    }
  }
  return sanitizeSettings(out)
}

/** Apply the theme to <html> immediately -- no waiting on a network round trip. */
export function applySettingsToDocument(settings: AppSettings) {
  if (typeof document === "undefined") return
  const root = document.documentElement
  root.setAttribute("data-theme", settings.appearance.theme)

  // Clear any previously injected custom values before applying the new set,
  // otherwise switching away from "custom" would leave stale overrides behind.
  const stale: string[] = []
  for (let i = 0; i < root.style.length; i++) {
    const name = root.style.item(i)
    if (name.startsWith("--")) stale.push(name)
  }
  stale.forEach((n) => root.style.removeProperty(n))

  for (const [k, v] of Object.entries(themeStyleVars(settings.appearance))) {
    root.style.setProperty(k, v)
  }
}

let saveTimer: ReturnType<typeof setTimeout> | null = null

async function persistToDisk(settings: AppSettings) {
  try {
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    })
  } catch (error) {
    console.error("Failed to persist settings:", error)
  }
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: DEFAULT_SETTINGS,
      loaded: false,
      saving: false,

      load: async () => {
        try {
          const res = await fetch("/api/settings")
          if (res.ok) {
            const settings = sanitizeSettings(await res.json())
            set({ settings, loaded: true })
            applySettingsToDocument(settings)
            return
          }
        } catch {
          /* offline or first run: keep whatever localStorage had */
        }
        set({ loaded: true })
        applySettingsToDocument(get().settings)
      },

      update: (patch) => {
        const settings = merge(get().settings, patch)
        set({ settings, saving: true })
        applySettingsToDocument(settings)

        // Debounced: dragging a colour picker should not write the file per frame.
        if (saveTimer) clearTimeout(saveTimer)
        saveTimer = setTimeout(async () => {
          await persistToDisk(settings)
          set({ saving: false })
        }, 400)
      },

      reset: async () => {
        set({ settings: DEFAULT_SETTINGS })
        applySettingsToDocument(DEFAULT_SETTINGS)
        try {
          await fetch("/api/settings", { method: "DELETE" })
        } catch (error) {
          console.error("Failed to reset settings:", error)
        }
      },

      importSettings: (raw) => {
        const settings = sanitizeSettings(raw)
        set({ settings })
        applySettingsToDocument(settings)
        void persistToDisk(settings)
      },

      exportTheme: () =>
        JSON.stringify(
          {
            name: "dsa-java-judge-theme",
            version: "1.0",
            appearance: get().settings.appearance,
          },
          null,
          2
        ),
    }),
    {
      name: SETTINGS_STORAGE_KEY,
      // Mirrored to localStorage purely so the first paint is correct;
      // user_data/settings.json remains the durable copy.
      partialize: (state) => ({ settings: state.settings }),
    }
  )
)
