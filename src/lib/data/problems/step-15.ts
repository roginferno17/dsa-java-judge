import type { ProblemMetadata } from "@/lib/types/judge"
import { step15Basics } from "@/lib/data/problems/step-15-basics"
import { step15Advanced } from "@/lib/data/problems/step-15-advanced"

/** Step 15 — Graphs (25). */
export const step15: Record<string, ProblemMetadata> = {
  ...step15Basics,
  ...step15Advanced,
}
