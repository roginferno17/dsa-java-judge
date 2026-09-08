import type { ProblemMetadata } from "@/lib/types/judge"
import { step11Basics } from "@/lib/data/problems/step-11-basics"
import { step11Problems } from "@/lib/data/problems/step-11-problems"

/** Step 11 — Heaps (17). */
export const step11: Record<string, ProblemMetadata> = {
  ...step11Basics,
  ...step11Problems,
}
