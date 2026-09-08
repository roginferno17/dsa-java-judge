"use client"

import { useSyncExternalStore } from "react"

const emptySubscribe = () => () => {}

/**
 * True once the client has hydrated.
 *
 * useSyncExternalStore gives this directly from its server/client snapshot pair,
 * which avoids the setState-inside-an-effect pattern that triggers a cascading
 * re-render (and a React lint error).
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // client
    () => false // server
  )
}
