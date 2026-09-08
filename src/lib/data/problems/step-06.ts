import type { ProblemMetadata } from "@/lib/types/judge"
import { step06Basics } from "@/lib/data/problems/step-06-basics"
import { step06Hard } from "@/lib/data/problems/step-06-hard"
import { step06Medium } from "@/lib/data/problems/step-06-medium"

/**
 * Step 6 — Linked Lists.
 *
 * Authored in groups (basics, medium, hard) and merged here for the registry and
 * the verification gate.
 */
export const step06: Record<string, ProblemMetadata> = {
  ...step06Basics,
  ...step06Medium,
  ...step06Hard,
}
