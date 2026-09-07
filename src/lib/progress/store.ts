import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ProblemStatus = "NOT_STARTED" | "ATTEMPTED" | "SOLVED"

export interface ProblemProgress {
  status: ProblemStatus
  attempts: number
  lastAttemptAt?: string
  solvedAt?: string
}

export interface ActivityStats {
  currentStreak: number
  longestStreak: number
  solvedToday: number
  totalSolved: number
  totalAttempts: number
  activeDays: number
  perDay: Record<string, number>
  firstActivity: string | null
  lastActivity: string | null
}

interface Progress {
  solved: number
  total: number
  percentage: number
}

/** What an import actually did, so the UI can say something specific. */
export interface ImportResult {
  ok: boolean
  imported: number
  rejected: number
  error?: string
}

export interface ProgressState {
  problems: Record<string, ProblemProgress>
  stats: ActivityStats | null
  isSyncing: boolean
  isDiskSynced: boolean
  lastSyncedAt: string | null

  syncWithDisk: () => Promise<void>
  markAttempted: (slug: string, verdict?: string) => void
  markSolved: (slug: string, verdict?: string) => void
  toggleSolved: (slug: string) => void
  getProblemStatus: (slug: string) => ProblemProgress
  getStepProgress: (stepNumber: number, slugs: string[]) => Progress
  getTopicProgress: (slugs: string[]) => Progress
  getOverallProgress: (totalProblems: number, knownSlugs?: string[]) => Progress
  clearProgress: (purgeHistory?: boolean) => Promise<void>
  importProgress: (problems: Record<string, ProblemProgress>) => Promise<ImportResult>
}

const defaultProgress: ProblemProgress = { status: "NOT_STARTED", attempts: 0 }

const ratio = (solved: number, total: number): Progress => ({
  solved,
  total,
  percentage: total > 0 ? Math.round((solved / total) * 100) : 0,
})

/**
 * The zone used to decide where one day ends and the next begins.
 *
 * Read straight from persisted settings rather than through the settings store,
 * so this module stays independent of it. Falls back to the browser zone.
 */
function activeTimeZone(): string {
  try {
    const raw = localStorage.getItem("dsa-java-judge-settings")
    if (raw) {
      const tz = JSON.parse(raw)?.state?.settings?.data?.timeZone
      if (typeof tz === "string" && tz) return tz
    }
  } catch {
    /* fall through to the browser zone */
  }
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
  } catch {
    return "UTC"
  }
}

/**
 * Record an activity event on the server, which appends to the log and returns
 * the freshly projected state.
 *
 * This used to be a fire-and-forget whole-file write called from inside the
 * zustand `set` updater -- a side effect in a reducer, with unordered writes that
 * clobbered each other. Now the server owns ordering and we adopt its answer.
 */
async function recordEvent(
  type: "ATTEMPT" | "SOLVE" | "UNSOLVE",
  slug: string,
  verdict?: string
): Promise<Record<string, ProblemProgress> | null> {
  try {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, slug, verdict }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return (data?.problems as Record<string, ProblemProgress>) ?? null
  } catch (error) {
    console.error(`Failed to record ${type} for ${slug}:`, error)
    return null
  }
}

/** Optimistic local update, then reconcile with whatever the server projects. */
function applyEvent(
  set: (u: Partial<ProgressState> | ((s: ProgressState) => Partial<ProgressState>)) => void,
  type: "ATTEMPT" | "SOLVE" | "UNSOLVE",
  slug: string,
  optimistic: (current: ProblemProgress) => ProblemProgress,
  verdict?: string
) {
  set((state) => ({
    problems: {
      ...state.problems,
      [slug]: optimistic(state.problems[slug] ?? { ...defaultProgress }),
    },
    isSyncing: true,
  }))

  void recordEvent(type, slug, verdict).then(async (problems) => {
    set(() => ({
      ...(problems ? { problems } : {}),
      isSyncing: false,
      isDiskSynced: problems !== null,
      lastSyncedAt: new Date().toISOString(),
    }))
    // Refresh derived stats so the streak and heatmap react immediately.
    if (problems) {
      try {
        const res = await fetch(`/api/events?tz=${encodeURIComponent(activeTimeZone())}`)
        if (res.ok) set({ stats: (await res.json()).stats ?? null })
      } catch {
        /* the next full sync will pick it up */
      }
    }
  })
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      problems: {},
      stats: null,
      isSyncing: false,
      isDiskSynced: false,
      lastSyncedAt: null,

      syncWithDisk: async () => {
        set({ isSyncing: true })
        try {
          const res = await fetch(`/api/events?tz=${encodeURIComponent(activeTimeZone())}`)
          if (!res.ok) {
            set({ isSyncing: false, isDiskSynced: false })
            return
          }
          const data = await res.json()
          // The append-only log on disk is authoritative -- no client-side merge.
          // The old merge coerced any non-SOLVED pair to ATTEMPTED, which quietly
          // resurrected problems the user had un-marked.
          set({
            problems: (data.problems as Record<string, ProblemProgress>) ?? {},
            stats: (data.stats as ActivityStats) ?? null,
            isSyncing: false,
            isDiskSynced: true,
            lastSyncedAt: new Date().toISOString(),
          })
        } catch (error) {
          console.error("Failed to sync progress with disk:", error)
          set({ isSyncing: false, isDiskSynced: false })
        }
      },

      markAttempted: (slug, verdict) =>
        applyEvent(
          set,
          "ATTEMPT",
          slug,
          (cur) => ({
            ...cur,
            status: cur.status === "SOLVED" ? "SOLVED" : "ATTEMPTED",
            attempts: cur.attempts + 1,
            lastAttemptAt: new Date().toISOString(),
          }),
          verdict
        ),

      markSolved: (slug, verdict) =>
        applyEvent(
          set,
          "SOLVE",
          slug,
          (cur) => {
            const now = new Date().toISOString()
            return { ...cur, status: "SOLVED", lastAttemptAt: now, solvedAt: cur.solvedAt ?? now }
          },
          verdict
        ),

      toggleSolved: (slug) => {
        const isSolved = get().problems[slug]?.status === "SOLVED"
        if (isSolved) {
          applyEvent(set, "UNSOLVE", slug, (cur) => ({
            status: cur.attempts > 0 ? "ATTEMPTED" : "NOT_STARTED",
            attempts: cur.attempts,
            ...(cur.lastAttemptAt ? { lastAttemptAt: cur.lastAttemptAt } : {}),
          }))
        } else {
          applyEvent(set, "SOLVE", slug, (cur) => {
            const now = new Date().toISOString()
            return { ...cur, status: "SOLVED", solvedAt: cur.solvedAt ?? now }
          })
        }
      },

      getProblemStatus: (slug) => get().problems[slug] ?? { ...defaultProgress },

      getStepProgress: (_stepNumber, slugs) =>
        ratio(slugs.filter((s) => get().problems[s]?.status === "SOLVED").length, slugs.length),

      getTopicProgress: (slugs) =>
        ratio(slugs.filter((s) => get().problems[s]?.status === "SOLVED").length, slugs.length),

      getOverallProgress: (totalProblems, knownSlugs) => {
        const problems = get().problems
        // Only count slugs that still exist in the curriculum, so a renamed or
        // removed problem cannot inflate the total.
        const solved = knownSlugs
          ? knownSlugs.filter((s) => problems[s]?.status === "SOLVED").length
          : Object.values(problems).filter((p) => p.status === "SOLVED").length
        return ratio(solved, totalProblems)
      },

      clearProgress: async (purgeHistory = false) => {
        set({ problems: {}, stats: null, isSyncing: true })
        try {
          await fetch(`/api/progress${purgeHistory ? "?purge=1" : ""}`, { method: "DELETE" })
        } catch (error) {
          console.error("Failed to delete progress from disk:", error)
        }
        set({ isSyncing: false, isDiskSynced: true, lastSyncedAt: new Date().toISOString() })
        await get().syncWithDisk()
      },

      /**
       * Restore a backup. The server validates and sanitises the payload and
       * mirrors it into the activity log, so the heatmap and streak stay
       * consistent with the restored snapshot; we then re-read from disk rather
       * than trusting what we sent.
       */
      importProgress: async (problems) => {
        set({ isSyncing: true })
        try {
          const res = await fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ problems }),
          })
          const data = await res.json()
          if (!res.ok) {
            set({ isSyncing: false })
            return { ok: false, imported: 0, rejected: 0, error: data?.error ?? "Import failed" }
          }
          await get().syncWithDisk()
          return {
            ok: true,
            imported: data.totalProblemsTracked ?? 0,
            rejected: data.rejectedEntries ?? 0,
          }
        } catch (error) {
          set({ isSyncing: false })
          return {
            ok: false,
            imported: 0,
            rejected: 0,
            error: error instanceof Error ? error.message : String(error),
          }
        }
      },
    }),
    {
      name: "dsa-java-judge-progress",
      // Persist data only. isSyncing used to be persisted too, so a tab closed
      // mid-sync came back with a spinner stuck on forever.
      partialize: (state) => ({ problems: state.problems }),
    }
  )
)
