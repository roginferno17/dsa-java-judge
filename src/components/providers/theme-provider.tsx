"use client"

import { useEffect } from "react"
import { useSettingsStore } from "@/lib/settings/store"

/**
 * Pulls settings from disk once on mount and keeps <html> in sync.
 *
 * The first paint is already correct thanks to the inline script in layout.tsx;
 * this reconciles with user_data/settings.json, which is the durable copy.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const load = useSettingsStore((s) => s.load)

  useEffect(() => {
    void load()
  }, [load])

  return <>{children}</>
}
