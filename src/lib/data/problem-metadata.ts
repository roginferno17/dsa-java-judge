import type { ProblemMetadata } from "@/lib/types/judge"
import { step01 } from "@/lib/data/problems/step-01"
import { step02 } from "@/lib/data/problems/step-02"
import { step03 } from "@/lib/data/problems/step-03"
import { step04 } from "@/lib/data/problems/step-04"
import { step05 } from "@/lib/data/problems/step-05"
import { step06 } from "@/lib/data/problems/step-06"
import { step07 } from "@/lib/data/problems/step-07"

/**
 * Authored problem metadata, merged from one module per curriculum step.
 *
 * Steps are added one at a time, each gated by scripts/verify-step.mjs: the
 * starter code must compile AND fail, and a committed reference solution must
 * pass every sample and hidden case.
 */
export const problemRegistry: Record<string, ProblemMetadata> = {
  ...step01,
  ...step02,
  ...step03,
  ...step04,
  ...step05,
  ...step06,
  ...step07,
}

/**
 * Metadata for a problem, or null when it has not been authored yet.
 *
 * This used to fabricate an `int[] xxx(int[] nums)` signature with a test case the
 * starter code already passed, so 386 of 398 problems looked solvable and were
 * green before you wrote a line. Returning null instead lets the UI say so
 * honestly.
 */
export function getProblemMetadata(slug: string): ProblemMetadata | null {
  return problemRegistry[slug] ?? null
}

export function hasHarness(slug: string): boolean {
  return slug in problemRegistry
}

/** Slugs with a working judge harness, used for progress and filtering. */
export function authoredSlugs(): string[] {
  return Object.keys(problemRegistry)
}

export const authoredCount = Object.keys(problemRegistry).length
