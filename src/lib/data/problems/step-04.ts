import type { ProblemMetadata } from "@/lib/types/judge"
import { step04OneD } from "@/lib/data/problems/step-04-1d"
import { step04TwoD } from "@/lib/data/problems/step-04-2d"

/**
 * Step 4 — Binary Search.
 *
 * Authored in groups (1D arrays, search space, 2D matrices) and merged here for
 * the registry and the verification gate.
 */
export const step04: Record<string, ProblemMetadata> = {
  ...step04OneD,
  ...step04TwoD,
}
