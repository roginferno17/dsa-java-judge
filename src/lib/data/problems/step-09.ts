import type { ProblemMetadata } from "@/lib/types/judge"
import { step09Design } from "@/lib/data/problems/step-09-design"
import { step09Notation } from "@/lib/data/problems/step-09-notation"
import { step09Monotonic } from "@/lib/data/problems/step-09-monotonic"
import { step09Cache } from "@/lib/data/problems/step-09-cache"

/** Step 9 — Stack and Queues (30). */
export const step09: Record<string, ProblemMetadata> = {
  ...step09Design,
  ...step09Notation,
  ...step09Monotonic,
  ...step09Cache,
}
