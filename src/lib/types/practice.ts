/** A practice problem on an external site, linked from a curriculum topic. */
export interface PracticeLink {
  platform: "LEETCODE" | "CODEFORCES"
  title: string
  url: string
  /** LeetCode: EASY | MEDIUM | HARD. Codeforces: a numeric rating as a string. */
  difficulty: string
  /** Codeforces only, used to build the canonical problem URL. */
  contestId?: number
  index?: string
  /** Set when the problem is an analogue rather than the same problem. */
  note?: string
}
