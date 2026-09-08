"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

/**
 * Goes back through history, falling back to a sensible parent route.
 *
 * The fallback matters: a problem opened in a new window (or a link pasted
 * directly) has no history entry, and router.back() would do nothing at all.
 */
export function BackButton({
  fallbackHref = "/roadmap",
  label = "Back",
  className = "",
}: {
  fallbackHref?: string
  label?: string
  className?: string
}) {
  const router = useRouter()

  // Decided at click time rather than held in state: it needs no effect, and
  // history.length can change while the page is open.
  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back()
    else router.push(fallbackHref)
  }

  return (
    <button
      type="button"
      onClick={goBack}
      title="Go back"
      className={
        className ||
        "flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-2.5 py-1 text-xs font-semibold transition-all hover:border-primary/40 hover:bg-secondary active:scale-95"
      }
    >
      <ArrowLeft className="h-3.5 w-3.5 text-primary" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}
