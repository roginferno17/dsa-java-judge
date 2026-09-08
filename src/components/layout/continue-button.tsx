"use client"

import { ArrowRight, PlayCircle } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"
import { resumeTarget } from "@/lib/data/problem-index"
import { useHydrated } from "@/lib/hooks/use-hydrated"
import { useProgressStore } from "@/lib/progress/store"

/**
 * Picks up where you left off.
 *
 * Renders a stable placeholder until hydration, because progress lives in
 * localStorage and does not exist during the server render — without that the
 * server and client would disagree about which problem this points at.
 */
export function ContinueButton({ className = "" }: { className?: string }) {
  const hydrated = useHydrated()
  const problems = useProgressStore((s) => s.problems)

  const target = useMemo(() => (hydrated ? resumeTarget(problems) : null), [hydrated, problems])

  const label =
    !hydrated || !target
      ? "Continue"
      : target.reason === "resume"
        ? "Continue"
        : target.reason === "next"
          ? "Next problem"
          : "Start Step 1"

  // Everything solved is the one case with nowhere to continue to.
  const href = target ? `/problem/${target.row.slug}` : "/roadmap"

  const base =
    "group flex items-center gap-2 rounded-xl border border-border bg-secondary px-8 py-3 text-base font-semibold transition-colors hover:bg-secondary/80"

  return (
    <Link href={href} className={className || base} suppressHydrationWarning>
      <PlayCircle className="h-5 w-5 flex-shrink-0 text-primary" />
      <span className="flex flex-col items-start leading-tight">
        <span suppressHydrationWarning>{label}</span>
        {target && (
          <span
            className="max-w-[16rem] truncate text-xs font-normal text-muted-foreground"
            suppressHydrationWarning
          >
            {target.row.title}
          </span>
        )}
      </span>
      <ArrowRight className="h-5 w-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
    </Link>
  )
}
