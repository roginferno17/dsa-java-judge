"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const PREFIX = "dsa-java-judge:code:"

const keyFor = (slug: string) => `${PREFIX}${slug}`

function readDraft(slug: string): string | null {
  if (typeof window === "undefined") return null
  try {
    return window.localStorage.getItem(keyFor(slug))
  } catch {
    return null
  }
}

/** Every saved draft, used by the "clear all drafts" action in Settings. */
export function clearAllDrafts(): number {
  if (typeof window === "undefined") return 0
  let removed = 0
  try {
    const keys: string[] = []
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i)
      if (k?.startsWith(PREFIX)) keys.push(k)
    }
    keys.forEach((k) => {
      window.localStorage.removeItem(k)
      removed++
    })
  } catch {
    /* ignore */
  }
  return removed
}

/**
 * Editor contents for one problem, kept across navigation and reloads.
 *
 * Previously the editor was reset to the starter code on every slug change, so
 * clicking Next and coming back discarded everything you had written -- the most
 * damaging papercut in the app.
 *
 * Drafts live in localStorage rather than the activity log: they are per-machine
 * scratch, they change on every keystroke, and they should not bloat the history.
 */
export function useCodeDraft(slug: string, starterCode: string, enabled: boolean) {
  // Lazily initialised rather than loaded in an effect. The caller mounts this
  // under a key of the problem slug, so switching problems remounts the hook and
  // the initialiser runs again -- no effect, and no cascading render.
  const [code, setCode] = useState(() => {
    const draft = enabled ? readDraft(slug) : null
    return draft ?? starterCode
  })
  const [restored] = useState(() => {
    const draft = enabled ? readDraft(slug) : null
    return draft !== null && draft !== starterCode
  })
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounced write: typing should not hit storage on every keystroke.
  useEffect(() => {
    if (!enabled) return
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      try {
        if (code === starterCode) window.localStorage.removeItem(keyFor(slug))
        else window.localStorage.setItem(keyFor(slug), code)
      } catch {
        /* private mode or quota exceeded */
      }
    }, 500)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [code, slug, starterCode, enabled])

  const reset = useCallback(() => {
    setCode(starterCode)
    try {
      window.localStorage.removeItem(keyFor(slug))
    } catch {
      /* ignore */
    }
  }, [slug, starterCode])

  return { code, setCode, reset, restored }
}
