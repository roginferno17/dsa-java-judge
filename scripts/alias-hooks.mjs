/**
 * Resolves the "@/..." path alias from tsconfig for plain `node` runs.
 *
 * Next.js understands the alias; bare Node does not, so the verification scripts
 * could not import the data modules without it.
 */
import { pathToFileURL } from "node:url"
import { join } from "node:path"

const SRC = join(process.cwd(), "src")

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const target = join(SRC, specifier.slice(2))
    // Try the path as given, then the TypeScript extensions Next would add.
    for (const candidate of [target, `${target}.ts`, `${target}.tsx`, join(target, "index.ts")]) {
      try {
        return await nextResolve(pathToFileURL(candidate).href, context)
      } catch {
        /* try the next candidate */
      }
    }
  }
  return nextResolve(specifier, context)
}
