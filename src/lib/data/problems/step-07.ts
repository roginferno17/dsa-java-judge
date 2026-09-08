import type { ProblemMetadata } from "@/lib/types/judge"
import { step07Backtracking } from "@/lib/data/problems/step-07-backtracking"
import { step07Basic } from "@/lib/data/problems/step-07-basic"

/** Step 7 — Recursion and Backtracking. Authored in groups and merged here. */
export const step07: Record<string, ProblemMetadata> = {
  ...step07Basic,
  ...step07Backtracking,
}
