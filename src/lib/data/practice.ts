import type { PracticeLink } from "@/lib/types/practice"
import { codeforcesPractice } from "@/lib/data/generated/codeforces-practice"
import { curriculum } from "@/lib/data/curriculum"

/**
 * Hand-mapped LeetCode equivalents, keyed by curriculum problem slug.
 *
 * These are per-problem because curriculum slugs do not match LeetCode's
 * (kadanes-algorithm -> maximum-subarray, sort-012 -> sort-colors), so each one
 * has to be looked up rather than derived. Populated alongside each step's
 * problem metadata; a slug that is absent simply shows no LeetCode link, which is
 * better than guessing wrong.
 */
export const leetcodePractice: Record<string, PracticeLink[]> = {
  "two-sum": [
    { platform: "LEETCODE", title: "Two Sum", url: "https://leetcode.com/problems/two-sum/", difficulty: "EASY" },
  ],
  "largest-element-array": [
    { platform: "LEETCODE", title: "Maximum Value of an Ordered Triplet I", url: "https://leetcode.com/problems/maximum-value-of-an-ordered-triplet-i/", difficulty: "EASY", note: "Closest LeetCode analogue; the original is a GeeksforGeeks problem." },
  ],
  "check-sorted-array": [
    { platform: "LEETCODE", title: "Check if Array Is Sorted and Rotated", url: "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/", difficulty: "EASY" },
  ],
  "remove-duplicates-sorted": [
    { platform: "LEETCODE", title: "Remove Duplicates from Sorted Array", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", difficulty: "EASY" },
  ],
  "kadanes-algorithm": [
    { platform: "LEETCODE", title: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray/", difficulty: "MEDIUM" },
  ],
  "stock-buy-sell": [
    { platform: "LEETCODE", title: "Best Time to Buy and Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: "EASY" },
  ],
  "find-missing-number": [
    { platform: "LEETCODE", title: "Missing Number", url: "https://leetcode.com/problems/missing-number/", difficulty: "EASY" },
  ],
  "check-palindrome": [
    { platform: "LEETCODE", title: "Palindrome Number", url: "https://leetcode.com/problems/palindrome-number/", difficulty: "EASY" },
  ],
  "reverse-a-number": [
    { platform: "LEETCODE", title: "Reverse Integer", url: "https://leetcode.com/problems/reverse-integer/", difficulty: "MEDIUM" },
  ],
  "fibonacci-number": [
    { platform: "LEETCODE", title: "Fibonacci Number", url: "https://leetcode.com/problems/fibonacci-number/", difficulty: "EASY" },
  ],
  "sort-012": [
    { platform: "LEETCODE", title: "Sort Colors", url: "https://leetcode.com/problems/sort-colors/", difficulty: "MEDIUM" },
  ],
  "second-largest-element": [
    { platform: "LEETCODE", title: "Third Maximum Number", url: "https://leetcode.com/problems/third-maximum-number/", difficulty: "EASY", note: "Same idea, one rank further down." },
  ],
}

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
