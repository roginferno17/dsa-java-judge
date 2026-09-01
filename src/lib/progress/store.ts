import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ProblemStatus = "NOT_STARTED" | "ATTEMPTED" | "SOLVED"

export interface ProblemProgress {
  status: ProblemStatus
  attempts: number
  lastAttemptAt?: string
  solvedAt?: string
}

export interface ProgressState {
  problems: Record<string, ProblemProgress>
  isSyncing: boolean
  isDiskSynced: boolean
  lastSyncedAt: string | null

  // Actions
  syncWithDisk: () => Promise<void>
  markAttempted: (problemSlug: string) => void
  markSolved: (problemSlug: string) => void
  toggleSolved: (problemSlug: string) => void
  getProblemStatus: (problemSlug: string) => ProblemProgress
  getStepProgress: (stepNumber: number, problemSlugs: string[]) => {
    solved: number
    total: number
    percentage: number
  }
  getTopicProgress: (problemSlugs: string[]) => {
    solved: number
    total: number
    percentage: number
  }
  getOverallProgress: (totalProblems: number) => {
    solved: number
    total: number
    percentage: number
  }
  clearProgress: () => Promise<void>
}

const defaultProgress: ProblemProgress = {
  status: "NOT_STARTED",
  attempts: 0,
}

// Helper to push progress to local disk file via API
async function saveToDisk(problems: Record<string, ProblemProgress>) {
  try {
    const res = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problems }),
    })
    return res.ok
  } catch (error) {
    console.error("Failed to save progress to disk:", error)
    return false
  }
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      problems: {},
      isSyncing: false,
      isDiskSynced: false,
      lastSyncedAt: null,

      syncWithDisk: async () => {
        set({ isSyncing: true })
        try {
          const res = await fetch("/api/progress")
          if (res.ok) {
            const data = await res.json()
            const diskProblems: Record<string, ProblemProgress> = data.problems || {}
            const localProblems: Record<string, ProblemProgress> = get().problems || {}

            // Merge local and disk problems
            const merged: Record<string, ProblemProgress> = { ...diskProblems }
            for (const [slug, localProg] of Object.entries(localProblems)) {
              const diskProg = merged[slug]
              if (!diskProg) {
                merged[slug] = localProg
              } else {
                const finalStatus: ProblemStatus =
                  diskProg.status === "SOLVED" || localProg.status === "SOLVED"
                    ? "SOLVED"
                    : "ATTEMPTED"
                merged[slug] = {
                  status: finalStatus,
                  attempts: Math.max(diskProg.attempts, localProg.attempts),
                  lastAttemptAt: diskProg.lastAttemptAt || localProg.lastAttemptAt,
                  solvedAt: diskProg.solvedAt || localProg.solvedAt,
                }
              }
            }

            set({
              problems: merged,
              isSyncing: false,
              isDiskSynced: true,
              lastSyncedAt: new Date().toISOString(),
            })

            // Ensure disk has any newly merged local items
            await saveToDisk(merged)
          } else {
            set({ isSyncing: false, isDiskSynced: false })
          }
        } catch (error) {
          console.error("Failed to sync progress with disk:", error)
          set({ isSyncing: false, isDiskSynced: false })
        }
      },

      markAttempted: (problemSlug: string) => {
        set((state) => {
          const current = state.problems[problemSlug] || { ...defaultProgress }
          const newStatus: ProblemStatus =
            current.status === "SOLVED" ? "SOLVED" : "ATTEMPTED"
          const updatedItem: ProblemProgress = {
            ...current,
            status: newStatus,
            attempts: current.attempts + 1,
            lastAttemptAt: new Date().toISOString(),
          }
          const updatedProblems: Record<string, ProblemProgress> = {
            ...state.problems,
            [problemSlug]: updatedItem,
          }
          // Save in background to disk file
          saveToDisk(updatedProblems)
          return {
            problems: updatedProblems,
            isDiskSynced: true,
            lastSyncedAt: new Date().toISOString(),
          }
        })
      },

      markSolved: (problemSlug: string) => {
        set((state) => {
          const current = state.problems[problemSlug] || { ...defaultProgress }
          const updatedItem: ProblemProgress = {
            ...current,
            status: "SOLVED",
            attempts: current.attempts + 1,
            lastAttemptAt: new Date().toISOString(),
            solvedAt: new Date().toISOString(),
          }
          const updatedProblems: Record<string, ProblemProgress> = {
            ...state.problems,
            [problemSlug]: updatedItem,
          }
          // Save in background to disk file
          saveToDisk(updatedProblems)
          return {
            problems: updatedProblems,
            isDiskSynced: true,
            lastSyncedAt: new Date().toISOString(),
          }
        })
      },

      toggleSolved: (problemSlug: string) => {
        set((state) => {
          const current = state.problems[problemSlug] || { ...defaultProgress }
          const isCurrentlySolved = current.status === "SOLVED"
          const newStatus: ProblemStatus = isCurrentlySolved ? "NOT_STARTED" : "SOLVED"
          const updatedItem: ProblemProgress = {
            ...current,
            status: newStatus,
            attempts: current.attempts,
            lastAttemptAt: current.lastAttemptAt,
            solvedAt: isCurrentlySolved ? undefined : new Date().toISOString(),
          }
          const updatedProblems: Record<string, ProblemProgress> = {
            ...state.problems,
            [problemSlug]: updatedItem,
          }
          // Save immediately to local disk file
          saveToDisk(updatedProblems)
          return {
            problems: updatedProblems,
            isDiskSynced: true,
            lastSyncedAt: new Date().toISOString(),
          }
        })
      },

      getProblemStatus: (problemSlug: string) => {
        return get().problems[problemSlug] || { ...defaultProgress }
      },

      getStepProgress: (stepNumber: number, problemSlugs: string[]) => {
        const problems = get().problems
        const solved = problemSlugs.filter(
          (slug) => problems[slug]?.status === "SOLVED"
        ).length
        const total = problemSlugs.length
        return {
          solved,
          total,
          percentage: total > 0 ? Math.round((solved / total) * 100) : 0,
        }
      },

      getTopicProgress: (problemSlugs: string[]) => {
        const problems = get().problems
        const solved = problemSlugs.filter(
          (slug) => problems[slug]?.status === "SOLVED"
        ).length
        const total = problemSlugs.length
        return {
          solved,
          total,
          percentage: total > 0 ? Math.round((solved / total) * 100) : 0,
        }
      },

      getOverallProgress: (totalProblems: number) => {
        const problems = get().problems
        const solved = Object.values(problems).filter(
          (p) => p.status === "SOLVED"
        ).length
        return {
          solved,
          total: totalProblems,
          percentage:
            totalProblems > 0 ? Math.round((solved / totalProblems) * 100) : 0,
        }
      },

      clearProgress: async () => {
        set({ problems: {}, isDiskSynced: true, lastSyncedAt: new Date().toISOString() })
        try {
          await fetch("/api/progress", { method: "DELETE" })
        } catch (error) {
          console.error("Failed to delete progress from disk:", error)
        }
      },
    }),
    {
      name: "dsa-java-judge-progress",
    }
  )
)
