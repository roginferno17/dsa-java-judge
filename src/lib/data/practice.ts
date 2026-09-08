import type { PracticeLink } from "@/lib/types/practice"
import { codeforcesPractice } from "@/lib/data/generated/codeforces-practice"
import { leetcodePractice } from "@/lib/data/generated/leetcode-practice"
import { curriculum } from "@/lib/data/curriculum"


/** Which topic a problem belongs to, so Codeforces suggestions can be found. */
const topicBySlug: Record<string, string> = (() => {
  const map: Record<string, string> = {}
  for (const step of curriculum) {
    for (const topic of step.topics) {
      for (const problem of topic.problems) map[problem.slug] = topic.slug
    }
  }
  return map
})()

export interface PracticeOptions {
  /** Filters Codeforces suggestions to the band chosen in Settings. */
  cfRatingMin?: number
  cfRatingMax?: number
}

/**
 * Practice links for a problem: its LeetCode equivalent where one is mapped, plus
 * Codeforces problems drawn from the same topic.
 */
export function getPracticeLinks(
  problemSlug: string,
  options: PracticeOptions = {}
): PracticeLink[] {
  const { cfRatingMin = 0, cfRatingMax = 4000 } = options

  const leetcode = leetcodePractice[problemSlug] ?? []

  const topic = topicBySlug[problemSlug]
  const codeforces = (topic ? (codeforcesPractice[topic] ?? []) : []).filter((p) => {
    const rating = Number(p.difficulty)
    return !Number.isFinite(rating) || (rating >= cfRatingMin && rating <= cfRatingMax)
  })

  return [...leetcode, ...codeforces]
}

/** Codeforces suggestions for a whole topic, used on the step pages. */
export function getTopicPractice(
  topicSlug: string,
  options: PracticeOptions = {}
): PracticeLink[] {
  const { cfRatingMin = 0, cfRatingMax = 4000 } = options
  return (codeforcesPractice[topicSlug] ?? []).filter((p) => {
    const rating = Number(p.difficulty)
    return !Number.isFinite(rating) || (rating >= cfRatingMin && rating <= cfRatingMax)
  })
}

export function hasLeetCodeMapping(problemSlug: string): boolean {
  return (leetcodePractice[problemSlug]?.length ?? 0) > 0
}

/**
 * LeetCode's own topic tag per curriculum step.
 *
 * 114 of the 398 problems have no honest one-to-one LeetCode equivalent — most
 * of Step 1 is Java syntax, the infix/postfix conversions have no counterpart,
 * and neither does most of the doubly-linked-list work. Showing nothing there
 * reads as a broken feature rather than an accurate answer, so those problems
 * link to the whole LeetCode topic instead. It is honest and still useful.
 */
const LEETCODE_TAG_BY_STEP: Record<number, { tag: string; label: string }> = {
  1: { tag: "array", label: "Array" },
  2: { tag: "sorting", label: "Sorting" },
  3: { tag: "array", label: "Array" },
  4: { tag: "binary-search", label: "Binary Search" },
  5: { tag: "string", label: "String" },
  6: { tag: "linked-list", label: "Linked List" },
  7: { tag: "recursion", label: "Recursion" },
  8: { tag: "bit-manipulation", label: "Bit Manipulation" },
  9: { tag: "stack", label: "Stack" },
  10: { tag: "sliding-window", label: "Sliding Window" },
  11: { tag: "heap-priority-queue", label: "Heap" },
  12: { tag: "greedy", label: "Greedy" },
  13: { tag: "binary-tree", label: "Binary Tree" },
  14: { tag: "binary-search-tree", label: "Binary Search Tree" },
  15: { tag: "graph", label: "Graph" },
  16: { tag: "dynamic-programming", label: "Dynamic Programming" },
  17: { tag: "trie", label: "Trie" },
  18: { tag: "string-matching", label: "String Matching" },
}

const stepBySlug: Record<string, number> = (() => {
  const map: Record<string, number> = {}
  for (const step of curriculum) {
    for (const topic of step.topics) {
      for (const problem of topic.problems) map[problem.slug] = step.stepNumber
    }
  }
  return map
})()

/**
 * The LeetCode topic page for a problem's step, but only when that problem has
 * no direct LeetCode match. Returns null when a real link already exists, so
 * the fallback never competes with the actual problem.
 */
export function getLeetCodeTopicFallback(
  problemSlug: string,
): { url: string; label: string } | null {
  if ((leetcodePractice[problemSlug]?.length ?? 0) > 0) return null
  const step = stepBySlug[problemSlug]
  const entry = step ? LEETCODE_TAG_BY_STEP[step] : undefined
  if (!entry) return null
  return { url: `https://leetcode.com/tag/${entry.tag}/`, label: entry.label }
}
