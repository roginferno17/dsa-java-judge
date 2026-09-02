"use client"

import { useEffect, useState } from "react"

/**
 * Hook to check if component has mounted and hydrated on client.
 * Prevents React hydration mismatch when reading client-only state (localStorage / Zustand persist).
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return hydrated
}
