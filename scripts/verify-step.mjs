/**
 * Content gate for an authored curriculum step.
 *
 * A step does not ship until every problem in it passes all of:
 *
 *   1. the starter code COMPILES        — you can hit Run without a syntax error
 *   2. the starter code FAILS its tests — it is a starting point, not the answer
 *   3. a committed reference solution   — the problem is actually solvable as specified
 *      passes every sample AND hidden case
 *   4. learn content is present and not a copy of the previous problem
 *      (catches pasted boilerplate, which is the failure mode when authoring in bulk)
 *
 * Needs the dev server running:  npm run dev
 *
 *   node scripts/verify-step.mjs 01
 */

import { readFileSync, existsSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { pathToFileURL } from "node:url"

const ROOT = process.cwd()
const step = (process.argv[2] ?? "01").padStart(2, "0")
const BASE = process.argv[3] ?? "http://127.0.0.1:3000"
const SOLUTIONS = join(ROOT, "fixtures", "solutions", `step-${step}`)

const GREEN = "\x1b[32m"
const RED = "\x1b[31m"
const DIM = "\x1b[2m"
const OFF = "\x1b[0m"

let pass = 0
let fail = 0
const failures = []

const run = async (metadata, code, testCases) => {
  const res = await fetch(`${BASE}/api/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      executionMode: "FUNCTION",
      className: metadata.className,
      methodName: metadata.methodName,
      parameters: metadata.parameters,
      returnType: metadata.returnType,
      mutatedArgIndex: metadata.mutatedArgIndex ?? 0,
      comparison: metadata.comparison,
      testCases,
      timeoutMs: 8000,
      memoryLimitMb: 256,
    }),
  })
  return res.json()
}

const problems = (
  await import(pathToFileURL(join(ROOT, "src", "lib", "data", "problems", `step-${step}.ts`)).href)
)[`step${step}`]

const slugs = Object.keys(problems)
console.log(`Verifying step ${step} — ${slugs.length} problems\n`)

// Guard against pasted boilerplate: authoring in bulk makes it easy to leave a
// previous problem's complexity or intuition behind.
const seenIntuition = new Map()
const seenComplexity = new Map()

for (const slug of slugs) {
  const p = problems[slug]
  const problems_failed = []

  // --- static checks -------------------------------------------------------
  if (!p.description || p.description.length < 40) problems_failed.push("description missing or too short")
  if (!p.sampleTestCases?.length) problems_failed.push("no sample test cases")
  if (!p.hiddenTestCases?.length) problems_failed.push("no hidden test cases")
  if (!p.learn) {
    problems_failed.push("no learn content")
  } else {
    if (!p.learn.intuition || p.learn.intuition.length < 40) problems_failed.push("intuition missing or too short")
    if (!p.learn.approach?.length) problems_failed.push("no approach steps")
    if (!p.learn.optimal?.time) problems_failed.push("no optimal complexity")

    const prevI = seenIntuition.get(p.learn.intuition)
    if (prevI) problems_failed.push(`intuition is identical to ${prevI}`)
    seenIntuition.set(p.learn.intuition, slug)

    const key = `${p.learn.optimal.time}|${p.learn.optimal.idea}`
    const prevC = seenComplexity.get(key)
    if (prevC) problems_failed.push(`optimal complexity block is identical to ${prevC}`)
    seenComplexity.set(key, slug)
  }

  const solutionFile = join(SOLUTIONS, `${slug}.java`)
  if (!existsSync(solutionFile)) problems_failed.push(`no reference solution at fixtures/solutions/step-${step}/${slug}.java`)

  if (problems_failed.length) {
    fail++
    failures.push({ slug, reasons: problems_failed })
    console.log(`${RED}FAIL${OFF}  ${slug}`)
    problems_failed.forEach((r) => console.log(`        ${r}`))
    continue
  }

  const allCases = [...p.sampleTestCases, ...(p.hiddenTestCases ?? [])]

  // --- 1 & 2: starter code compiles, and fails ------------------------------
  const starter = await run(p, p.starterCode, allCases)
  if (starter.status === "COMPILATION_ERROR") {
    problems_failed.push(`starter code does not compile: ${(starter.error ?? "").split("\n")[0]}`)
  } else if (starter.status === "ACCEPTED") {
    problems_failed.push("starter code already passes — the test cases do not require a solution")
  }

  // --- 3: reference solution passes everything ------------------------------
  const reference = readFileSync(solutionFile, "utf-8")
  const solved = await run(p, reference, allCases)
  if (solved.status !== "ACCEPTED") {
    problems_failed.push(
      `reference solution did not pass: ${solved.status} ${solved.passed ?? 0}/${solved.total ?? "?"}` +
        (solved.error ? ` — ${solved.error.split("\n")[0]}` : "")
    )
    // The API masks hidden cases, which is right for a learner and useless when
    // authoring. Re-run with the hidden flag stripped to see what actually broke.
    const unmasked = await run(
      p,
      reference,
      allCases.map(({ isHidden, ...rest }) => rest)
    )
    const firstBad = (unmasked.results ?? []).find((r) => !r.passed)
    if (firstBad) {
      problems_failed.push(
        `  first failing case: input=${firstBad.input}  expected=${firstBad.expected}  got=${firstBad.actual}`
      )
    }
  }

  if (problems_failed.length) {
    fail++
    failures.push({ slug, reasons: problems_failed })
    console.log(`${RED}FAIL${OFF}  ${slug}`)
    problems_failed.forEach((r) => console.log(`        ${r}`))
  } else {
    pass++
    console.log(
      `${GREEN}ok${OFF}    ${slug.padEnd(30)} ${DIM}${p.sampleTestCases.length} shown + ${p.hiddenTestCases.length} hidden${OFF}`
    )
  }
}

// Any reference solution without a matching problem is dead weight.
if (existsSync(SOLUTIONS)) {
  const orphans = readdirSync(SOLUTIONS)
    .filter((f) => f.endsWith(".java"))
    .map((f) => f.replace(/\.java$/, ""))
    .filter((s) => !slugs.includes(s))
  if (orphans.length) console.log(`\n${RED}Orphaned reference solutions:${OFF} ${orphans.join(", ")}`)
}

console.log(`\n${"─".repeat(46)}`)
console.log(`${pass} passed, ${fail} failed of ${slugs.length}`)
if (fail) {
  console.log(`\nStep ${step} is NOT ready to ship.`)
  process.exit(1)
}
console.log(`${GREEN}Step ${step} verified.${OFF}`)
