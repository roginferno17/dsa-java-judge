"use client"

import { Search, X, ArrowRight, CornerDownLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  searchProblems,
  nextUnsolved,
  type DifficultyFilter,
  type StatusFilter,
  type IndexedProblem,
} from "@/lib/data/problem-index"
import { useProgressStore } from "@/lib/progress/store"

const DIFFICULTIES: DifficultyFilter[] = ["ALL", "EASY", "MEDIUM", "HARD"]
const STATUSES: { value: StatusFilter; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "UNSOLVED", label: "Unsolved" },
  { value: "ATTEMPTED", label: "Attempted" },
  { value: "SOLVED", label: "Solved" },
]

const difficultyClass: Record<string, string> = {
  EASY: "bg-easy/10 text-easy",
  MEDIUM: "bg-medium/10 text-medium",
  HARD: "bg-hard/10 text-hard",
}

/**
 * Search across all 398 problems, opened with Ctrl/Cmd+K or by clicking the box.
 *
 * Before this there was no way to find a problem except scrolling a step page,
 * which is fine at 20 problems and not at 398.
 */
export function ProblemSearch() {
  const router = useRouter()
  const problems = useProgressStore((s) => s.problems)

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("ALL")
  const [status, setStatus] = useState<StatusFilter>("ALL")
  const [highlighted, setHighlighted] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const statusOf = useCallback(
    (slug: string) => problems[slug]?.status ?? "NOT_STARTED",
    [problems],
  )

  const results = useMemo(
    () => searchProblems({ query, difficulty, status, statusOf }),
    [query, difficulty, status, statusOf],
  )

  // Ctrl/Cmd+K anywhere opens it; Escape closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((v) => !v)
      } else if (e.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // A changed filter can leave the stored index past the end of a shorter list,
  // so clamp when reading rather than correcting it in an effect.
  const activeIndex = results.length === 0 ? 0 : Math.min(highlighted, results.length - 1)

  const go = useCallback(
    (row: IndexedProblem) => {
      setOpen(false)
      router.push(`/problem/${row.slug}`)
    },
    [router],
  )

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlighted(Math.min(activeIndex + 1, results.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlighted(Math.max(activeIndex - 1, 0))
    } else if (e.key === "Enter" && results[activeIndex]) {
      e.preventDefault()
      go(results[activeIndex])
    }
  }

  // Keep the highlighted row inside the scroll container.
  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
    node?.scrollIntoView({ block: "nearest" })
  }, [activeIndex])

  const jumpToNext = () => {
    const row = nextUnsolved(statusOf)
    if (row) go(row)
  }

  if (!open) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setOpen(true)}
          className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:border-primary/50"
        >
          <Search className="h-4 w-4 flex-shrink-0" />
          <span className="flex-1">Search all problems…</span>
          <kbd className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] sm:inline">
            Ctrl K
          </kbd>
        </button>
        <button
          onClick={jumpToNext}
          className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-sm transition-colors hover:border-primary/50"
        >
          Next unsolved
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-background/70 p-4 pt-[10vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        className="flex max-h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search problems"
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setHighlighted(0)
            }}
            onKeyDown={onInputKey}
            placeholder="Search by title, step or topic…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close search"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 border-b border-border px-4 py-2.5">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => {
                setDifficulty(d)
                setHighlighted(0)
              }}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                difficulty === d
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {d === "ALL" ? "Any difficulty" : d[0] + d.slice(1).toLowerCase()}
            </button>
          ))}
          <div className="mx-1 h-4 w-px bg-border" />
          {STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => {
                setStatus(s.value)
                setHighlighted(0)
              }}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                status === s.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div ref={listRef} className="flex-1 overflow-y-auto">
          {results.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              Nothing matches those filters.
            </p>
          ) : (
            results.map((row, i) => {
              const current = statusOf(row.slug)
              return (
                <button
                  key={row.slug}
                  data-index={i}
                  onMouseEnter={() => setHighlighted(i)}
                  onClick={() => go(row)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    i === activeIndex ? "bg-secondary" : ""
                  }`}
                >
                  <span
                    className={`h-2 w-2 flex-shrink-0 rounded-full ${
                      current === "SOLVED"
                        ? "bg-easy"
                        : current === "ATTEMPTED"
                          ? "bg-medium"
                          : "bg-border"
                    }`}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm">{row.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      Step {row.stepNumber} · {row.topicTitle}
                    </span>
                  </span>
                  <span
                    className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${difficultyClass[row.difficulty]}`}
                  >
                    {row.difficulty}
                  </span>
                </button>
              )
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
          <span>
            {results.length} shown
            {results.length === 50 ? " (first 50)" : ""}
          </span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="h-3 w-3" /> to open · ↑↓ to move · Esc to close
          </span>
        </div>
      </div>
    </div>
  )
}
