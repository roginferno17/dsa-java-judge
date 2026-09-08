"use client"

import { motion } from "framer-motion"
import {
  ArrowLeft,
  Code2,
  Download,
  Copy,
  Check,
  NotebookPen,
  Search,
  ChevronRight,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { NavActions } from "@/components/layout/nav-actions"
import { problemIndex } from "@/lib/data/problem-index"
import { useHydrated } from "@/lib/hooks/use-hydrated"
import { useNotesStore } from "@/lib/notes/store"

const difficultyClass: Record<string, string> = {
  EASY: "bg-easy/10 text-easy",
  MEDIUM: "bg-medium/10 text-medium",
  HARD: "bg-hard/10 text-hard",
}

type SortMode = "recent" | "curriculum"

interface NoteRow {
  slug: string
  title: string
  step: number
  stepTitle: string
  topic: string
  difficulty: string
  text: string
  updatedAt: string | null
}

/** "3 days ago" reads better than a timestamp when scanning a list. */
function relativeTime(iso: string | null): string {
  if (!iso) return "date unknown"
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return "date unknown"

  const seconds = Math.round((Date.now() - then) / 1000)
  if (seconds < 60) return "just now"
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`
  const days = Math.round(hours / 24)
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`
  const months = Math.round(days / 30)
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`
  return `${Math.round(months / 12)} year${Math.round(months / 12) === 1 ? "" : "s"} ago`
}

function absoluteTime(iso: string | null): string {
  if (!iso) return ""
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleString()
}

/**
 * Every note in one place.
 *
 * Notes are stored per problem, so they never follow you to the next question —
 * which makes an overview the only way to read back what you have written.
 * Each entry carries the problem, its step and topic, and when it was last
 * touched, because a note without that context is usually unreadable a month
 * later.
 */
export default function NotesPage() {
  const hydrated = useHydrated()
  const notes = useNotesStore((s) => s.notes)
  const updatedAt = useNotesStore((s) => s.updatedAt)
  const loaded = useNotesStore((s) => s.loaded)
  const load = useNotesStore((s) => s.load)

  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortMode>("recent")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    void load()
  }, [load])

  const rows: NoteRow[] = useMemo(() => {
    if (!hydrated) return []
    const byslug = new Map(problemIndex.map((p) => [p.slug, p]))

    const out: NoteRow[] = []
    for (const [slug, text] of Object.entries(notes)) {
      if (!text || !text.trim()) continue
      const meta = byslug.get(slug)
      if (!meta) continue // a note for a problem no longer in the curriculum
      out.push({
        slug,
        title: meta.title,
        step: meta.stepNumber,
        stepTitle: meta.stepTitle,
        topic: meta.topicTitle,
        difficulty: meta.difficulty,
        text,
        updatedAt: updatedAt[slug] ?? null,
      })
    }

    const needle = query.trim().toLowerCase()
    const filtered = needle
      ? out.filter(
          (r) =>
            r.text.toLowerCase().includes(needle) ||
            r.title.toLowerCase().includes(needle) ||
            r.topic.toLowerCase().includes(needle) ||
            r.stepTitle.toLowerCase().includes(needle),
        )
      : out

    if (sort === "recent") {
      // Undated notes sort last rather than pretending to be oldest.
      filtered.sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""))
    } else {
      const order = new Map(problemIndex.map((p, i) => [p.slug, i]))
      filtered.sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0))
    }
    return filtered
  }, [hydrated, notes, updatedAt, query, sort])

  const totalNotes = hydrated
    ? Object.values(notes).filter((t) => t && t.trim()).length
    : 0

  /** Markdown, because notes are prose and this has to stay readable anywhere. */
  const buildMarkdown = (): string => {
    const order = new Map(problemIndex.map((p, i) => [p.slug, i]))
    const all = rows.slice().sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0))

    const lines: string[] = [
      "# DSA Java Judge — my notes",
      "",
      `Exported ${new Date().toLocaleString()} · ${all.length} note${all.length === 1 ? "" : "s"}`,
      "",
    ]

    let currentStep = -1
    for (const r of all) {
      if (r.step !== currentStep) {
        currentStep = r.step
        lines.push("", `## Step ${r.step} — ${r.stepTitle}`, "")
      }
      lines.push(`### ${r.title}`)
      lines.push("")
      lines.push(
        `*${r.topic} · ${r.difficulty} · written ${absoluteTime(r.updatedAt) || "date unknown"}*`,
      )
      lines.push("")
      lines.push(r.text.trim())
      lines.push("")
    }
    return lines.join("\n")
  }

  const download = () => {
    const blob = new Blob([buildMarkdown()], { type: "text/markdown;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `dsa-notes-${new Date().toISOString().slice(0, 10)}.md`
    a.click()
    // Revoking synchronously can cancel the download; the click is only queued here.
    setTimeout(() => URL.revokeObjectURL(url), 0)
  }

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(buildMarkdown())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked; the download button is the fallback.
    }
  }

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/roadmap"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Roadmap</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">DSA Java Judge</span>
            </div>
          </div>
          <NavActions />
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            <NotebookPen className="h-4 w-4" />
            Your notes
          </div>
          <h1 className="mb-3 text-4xl font-bold sm:text-5xl">Notes</h1>
          <p className="max-w-2xl text-lg text-muted-foreground" suppressHydrationWarning>
            {totalNotes === 0
              ? "Notes you write on a problem are kept with that problem. Once you have written some, they all show up here."
              : `Every note you have written, with the problem it belongs to and when you wrote it. ${totalNotes} in total.`}
          </p>
        </motion.div>

        {totalNotes > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 flex flex-wrap items-center gap-2"
          >
            <div className="flex min-w-[12rem] flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
              <Search className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your notes…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1">
              {(["recent", "curriculum"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setSort(m)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    sort === m
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m === "recent" ? "Most recent" : "Curriculum order"}
                </button>
              ))}
            </div>

            <button
              onClick={copyAll}
              className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2.5 text-sm transition-colors hover:border-primary/50"
              title="Copy every note as Markdown"
            >
              {copied ? <Check className="h-4 w-4 text-easy" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy all"}
            </button>

            <button
              onClick={download}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              title="Download every note as one Markdown file"
            >
              <Download className="h-4 w-4" />
              Export all
            </button>
          </motion.div>
        )}

        {!hydrated || !loaded ? (
          <p className="py-12 text-center text-sm text-muted-foreground">Loading your notes…</p>
        ) : totalNotes === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-secondary/20 p-10 text-center">
            <NotebookPen className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
            <p className="mb-1 text-sm font-semibold">No notes yet</p>
            <p className="mx-auto mb-5 max-w-md text-xs leading-relaxed text-muted-foreground">
              Open any problem and switch to the <b>Notes</b> tab. What tripped you up, the
              observation that made it click, the edge case you missed — it is all kept per problem,
              and collected here.
            </p>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
            >
              Go to the roadmap <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : rows.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Nothing matches &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <div className="space-y-4">
            {rows.map((r) => (
              <div
                key={r.slug}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border px-5 py-3">
                  <Link
                    href={`/problem/${r.slug}`}
                    className="group flex min-w-0 items-center gap-1.5 font-semibold hover:text-primary"
                  >
                    <span className="truncate">{r.title}</span>
                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                  <span
                    className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${difficultyClass[r.difficulty]}`}
                  >
                    {r.difficulty}
                  </span>
                  <span
                    className="ml-auto flex flex-shrink-0 items-center gap-1 text-xs text-muted-foreground"
                    title={absoluteTime(r.updatedAt)}
                    suppressHydrationWarning
                  >
                    <Clock className="h-3 w-3" />
                    {relativeTime(r.updatedAt)}
                  </span>
                </div>
                <div className="px-5 pb-2 pt-2 text-xs text-muted-foreground">
                  Step {r.step} · {r.stepTitle} · {r.topic}
                </div>
                <pre className="whitespace-pre-wrap px-5 pb-4 font-mono text-sm leading-relaxed text-foreground/90">
                  {r.text}
                </pre>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
