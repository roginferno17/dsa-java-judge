import type { ProblemMetadata } from "@/lib/types/judge"
import { step13Traversals } from "@/lib/data/problems/step-13-traversals"
import { step13Medium } from "@/lib/data/problems/step-13-medium"
import { step13Hard } from "@/lib/data/problems/step-13-hard"

/** Step 13 — Binary Trees (34). */
export const step13: Record<string, ProblemMetadata> = {
  ...step13Traversals,
  ...step13Medium,
  ...step13Hard,
}
