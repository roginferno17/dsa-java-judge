import { readFileSync } from "fs"
import { join } from "path"

/**
 * The harness source lives in a real .java file rather than a template literal.
 *
 * It used to be embedded in a TypeScript string, which meant every quote, newline
 * and backslash in the Java had to be hand-escaped -- 34 escape sequences, each one
 * a chance to silently emit invalid Java. Keeping it as a .java file means it is
 * syntax-checked, directly compilable (see scripts/driver-smoke.sh), and cannot be
 * corrupted by escaping mistakes.
 */
const DRIVER_PATH = join(process.cwd(), "src", "lib", "executor", "java", "__Driver__.java")

/** Marker the driver prints before its JSON verdict, so user stdout stays separable. */
export const RESULT_SENTINEL = "__JUDGE_RESULT__"

let cached: string | null = null

export function generateJavaDriverSource(): string {
  // Cache in production only. In dev the harness is read every time so that editing
  // __Driver__.java takes effect on the next run instead of needing a server restart.
  if (cached !== null && process.env.NODE_ENV === "production") return cached
  try {
    cached = readFileSync(DRIVER_PATH, "utf-8")
  } catch (err) {
    throw new Error(
      `Could not read the Java harness at ${DRIVER_PATH}. ` +
        `It ships with the app and must exist. Original error: ${(err as Error).message}`
    )
  }
  return cached
}
