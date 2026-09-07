/**
 * Gate for the Java syntax track.
 *
 * Every snippet on every page is compiled and run through the same sandbox the
 * judge uses, and its stdout is compared against the expectedOutput recorded
 * beside it. A page here therefore cannot teach code that fails to compile, or
 * that prints something other than what the prose claims it prints.
 *
 * Usage: node --import ./scripts/register-alias.mjs scripts/verify-java-guide.mjs
 * Requires the dev server on http://127.0.0.1:3000.
 */
import { pathToFileURL } from "node:url"
import { join } from "node:path"

const ROOT = process.cwd()
const BASE = process.env.JUDGE_URL ?? "http://127.0.0.1:3000"

const GREEN = "\x1b[32m"
const RED = "\x1b[31m"
const DIM = "\x1b[2m"
const OFF = "\x1b[0m"

/** Windows sends \r\n; the expected strings are written with \n. */
const normalise = (s) => (s ?? "").replace(/\r\n/g, "\n").replace(/\s+$/, "")

async function run(code) {
  const res = await fetch(`${BASE}/api/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      executionMode: "STDIO",
      className: "Main",
      stdin: "",
      timeoutMs: 8000,
      memoryLimitMb: 256,
    }),
  })
  return res.json()
}

const { javaGuide } = await import(
  pathToFileURL(join(ROOT, "src", "lib", "data", "java-guide.ts")).href
)

let passed = 0
let failed = 0
const failures = []

console.log(`\nVerifying the Java guide — ${javaGuide.length} lessons\n`)

for (const lesson of javaGuide) {
  console.log(`${DIM}${lesson.slug}${OFF}`)
  for (const snippet of lesson.snippets) {
    const label = `  ${snippet.title}`

    if (!snippet.code.includes("class Main")) {
      failed++
      failures.push(`${lesson.slug} / ${snippet.title}: class must be named Main`)
      console.log(`${RED}FAIL${OFF}${label}  class must be named Main`)
      continue
    }

    const result = await run(snippet.code)

    if (result.status !== "ACCEPTED") {
      failed++
      const detail = normalise(result.stderr) || result.error || result.status
      failures.push(`${lesson.slug} / ${snippet.title}: ${result.status}\n${detail}`)
      console.log(`${RED}FAIL${OFF}${label}  ${result.status}`)
      continue
    }

    const actual = normalise(result.stdout)
    const expected = normalise(snippet.expectedOutput)
    if (actual !== expected) {
      failed++
      failures.push(
        `${lesson.slug} / ${snippet.title}: output mismatch\n` +
          `  expected: ${JSON.stringify(expected)}\n` +
          `  actual:   ${JSON.stringify(actual)}`,
      )
      console.log(`${RED}FAIL${OFF}${label}  output mismatch`)
      continue
    }

    passed++
    console.log(`${GREEN}ok${OFF}  ${label}`)
  }
}

console.log("\n──────────────────────────────────────────────")
console.log(`${passed} passed, ${failed} failed of ${passed + failed}`)

if (failures.length) {
  console.log(`\n${RED}Failures${OFF}`)
  for (const f of failures) console.log(`\n${f}`)
  console.log(`\n${RED}The Java guide is NOT ready to ship.${OFF}`)
  process.exit(1)
}

console.log(`${GREEN}Java guide verified.${OFF}`)
