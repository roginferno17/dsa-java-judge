import type { ProblemMetadata } from "@/lib/types/judge"
import { step16Basics } from "@/lib/data/problems/step-16-basics"
import { step16Strings } from "@/lib/data/problems/step-16-strings"
import { step16Advanced } from "@/lib/data/problems/step-16-advanced"

/** Step 16 — Dynamic Programming (34). */
export const step16: Record<string, ProblemMetadata> = {
  ...step16Basics,
  ...step16Strings,
  ...step16Advanced,
}
