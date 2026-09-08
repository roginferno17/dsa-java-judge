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
