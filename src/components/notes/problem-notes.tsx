"use client"

import { NotebookPen, Check, AlertTriangle, Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useNotesStore } from "@/lib/notes/store"

/**
 * A scratchpad for one problem.
 *
 * Plain text rather than rendered markdown: rendering would mean a new
 * dependency and a preview toggle, and what a scratchpad is actually for is
 * capturing a thought before it goes. Notes are saved to
 * user_data/notes.json a moment after you stop typing, and on unmount.
 */
export function ProblemNotes({ slug, title }: { slug: string; title: string }) {
  const notes = useNotesStore((s) => s.notes)
  const loaded = useNotesStore((s) => s.loaded)
  const saveState = useNotesStore((s) => s.saveState)
  const lastError = useNotesStore((s) => s.lastError)
  const load = useNotesStore((s) => s.load)
  const setNote = useNotesStore((s) => s.setNote)
  const flush = useNotesStore((s) => s.flush)

  useEffect(() => {
    void load()
  }, [load])

  // Leaving the page mid-debounce would otherwise lose the last few seconds.
  useEffect(() => {
    return () => {
      void flush(slug)
    }
  }, [slug, flush])

  const value = notes[slug] ?? ""

  return (
    <div className="flex h-full flex-col gap-3">
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <NotebookPen className="h-4 w-4" /> Notes
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your own notes on this problem — what tripped you up, the idea you want to remember.
          Saved automatically to <code className="font-mono text-xs text-primary">user_data/notes.json</code>.
        </p>
      </div>

      <textarea
        value={value}
        onChange={(e) => setNote(slug, e.target.value)}
        onBlur={() => void flush(slug)}
        placeholder={
          loaded
            ? "Nothing here yet.\n\nSome things worth writing down:\n  · the observation that made it click\n  · the edge case you missed the first time\n  · what you would look for next time you see this shape"
            : "Loading…"
        }
        spellCheck={false}
        className="min-h-[240px] flex-1 resize-none rounded-xl border border-border bg-background p-4 font-mono text-sm leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/50"
      />

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{value.length.toLocaleString()} characters</span>
        <span className="flex items-center gap-1.5">
          {saveState === "saving" && (
            <>
              <Loader2 className="h-3 w-3 animate-spin" /> Saving…
            </>
          )}
          {saveState === "saved" && (
            <>
              <Check className="h-3 w-3 text-easy" /> Saved
            </>
          )}
          {saveState === "dirty" && <>Unsaved changes</>}
          {saveState === "error" && (
            <>
              <AlertTriangle className="h-3 w-3 text-hard" />
              <span className="text-hard">{lastError ?? "Save failed"}</span>
            </>
          )}
        </span>
      </div>
    </div>
  )
}
