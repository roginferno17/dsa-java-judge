import { curriculum } from "@/lib/data/curriculum"
import { hasHarness } from "@/lib/data/problem-metadata"

/** One row per curriculum problem, flattened so search does not have to walk the tree. */
export interface IndexedProblem {
  slug: string
  title: string
  difficulty: "EASY" | "MEDIUM" | "HARD"
  stepNumber: number
  stepTitle: string
  stepSlug: string
  topicTitle: string
  /** Whether the judge can actually run this one. */
  authored: boolean
  /** Lowercased title plus step and topic, so a query can match any of them. */
  haystack: string
}

/**
 * Built once at module load. 398 rows is small enough that filtering the whole
 * list on every keystroke is imperceptible, so there is no index structure here
 * beyond the flattening itself.
 */
export const problemIndex: IndexedProblem[] = curriculum.flatMap((step) =>
  step.topics.flatMap((topic) =>
    topic.problems.map((problem) => ({
      slug: problem.slug,
      title: problem.title,
      difficulty: problem.difficulty,
      stepNumber: step.stepNumber,
      stepTitle: step.title,
      stepSlug: step.slug,
      topicTitle: topic.title,
      authored: hasHarness(problem.slug),
      haystack: `${problem.title} ${step.title} ${topic.title} ${problem.slug}`.toLowerCase(),
    })),
  ),
)

/**
 * Subsequence match, the same rule editors use for file pickers: every character
 * of the query must appear in order, but not necessarily adjacently. "lnkls"
 * finds "Reverse a Linked List".
 */
function subsequenceScore(haystack: string, query: string): number | null {
  if (query.length === 0) return 0

  let score = 0
  let hay = 0
  let lastMatch = -2

  for (let q = 0; q < query.length; q++) {
    const target = query[q]
    let found = -1
    while (hay < haystack.length) {
      if (haystack[hay] === target) {
        found = hay
        hay++
        break
      }
      hay++
    }
    if (found < 0) return null

    // Adjacent characters and word starts are what make a match feel intentional.
    if (found === lastMatch + 1) score += 3
    if (found === 0 || haystack[found - 1] === " " || haystack[found - 1] === "-") score += 2
    lastMatch = found
  }

  // Prefer shorter titles when the score ties, so exact-ish matches float up.
  return score * 1000 - haystack.length
}

export type StatusFilter = "ALL" | "SOLVED" | "UNSOLVED" | "ATTEMPTED"
export type DifficultyFilter = "ALL" | "EASY" | "MEDIUM" | "HARD"

export interface SearchOptions {
  query: string
  difficulty: DifficultyFilter
  status: StatusFilter
  /** Slug to status, from the progress store. */
  statusOf: (slug: string) => "NOT_STARTED" | "ATTEMPTED" | "SOLVED"
  limit?: number
}

export function searchProblems({
  query,
  difficulty,
  status,
  statusOf,
  limit = 50,
}: SearchOptions): IndexedProblem[] {
  const needle = query.trim().toLowerCase()

  const scored: { row: IndexedProblem; score: number }[] = []
  for (const row of problemIndex) {
    if (difficulty !== "ALL" && row.difficulty !== difficulty) continue

    if (status !== "ALL") {
      const current = statusOf(row.slug)
      if (status === "SOLVED" && current !== "SOLVED") continue
      if (status === "ATTEMPTED" && current !== "ATTEMPTED") continue
      if (status === "UNSOLVED" && current === "SOLVED") continue
    }

    const score = needle ? subsequenceScore(row.haystack, needle) : 0
    if (score === null) continue
    scored.push({ row, score })
  }

  // With no query the curriculum order is the meaningful one; with a query,
  // relevance is, and ties fall back to curriculum order because sort is stable.
  if (needle) scored.sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((entry) => entry.row)
}

/** The first problem in curriculum order that has not been solved. */
export function nextUnsolved(
  statusOf: (slug: string) => "NOT_STARTED" | "ATTEMPTED" | "SOLVED",
): IndexedProblem | null {
  return problemIndex.find((row) => statusOf(row.slug) !== "SOLVED") ?? null
}
