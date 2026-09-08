/**
 * Turns the hand-written LeetCode mapping into a committed data file.
 *
 * The mapping in src/lib/data/leetcode-map.ts is curriculum slug -> LeetCode
 * slug, and nothing else. Everything shown to the user — the real title, the
 * real difficulty, whether it is a Premium problem — is pulled from LeetCode's
 * public catalogue here, so a title can never drift from the actual problem and
 * a made-up slug cannot survive.
 *
 *   node scripts/fetch-leetcode.mjs [--refresh]
 *
 * A slug that is not in the catalogue is a hard error rather than a link that
 * quietly 404s. Premium problems are reported and skipped: linking someone to a
 * paywall is worse than showing no link.
 *
 * Runs ONCE and writes a committed file. The app never calls leetcode.com.
 * The raw response is cached under user_data/cache/ (git-ignored).
 */

import { mkdirSync, existsSync, readFileSync, writeFileSync, statSync } from "node:fs"
import { join, dirname } from "node:path"
import { pathToFileURL } from "node:url"

const ROOT = process.cwd()
const CACHE_DIR = join(ROOT, "user_data", "cache")
const CACHE_FILE = join(CACHE_DIR, "leetcode-problems.json")
const OUT_FILE = join(ROOT, "src", "lib", "data", "generated", "leetcode-practice.ts")
const API = "https://leetcode.com/api/problems/all/"
const CACHE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

const refresh = process.argv.includes("--refresh")

const GREEN = "\x1b[32m"
const RED = "\x1b[31m"
const YELLOW = "\x1b[33m"
const DIM = "\x1b[2m"
const OFF = "\x1b[0m"

const LEVEL = { 1: "EASY", 2: "MEDIUM", 3: "HARD" }

async function loadCatalogue() {
  if (!refresh && existsSync(CACHE_FILE)) {
    const age = Date.now() - statSync(CACHE_FILE).mtimeMs
    if (age < CACHE_MAX_AGE_MS) {
      console.log(`${DIM}Using cached catalogue (${Math.round(age / 86400000)}d old). --refresh to refetch.${OFF}`)
      return JSON.parse(readFileSync(CACHE_FILE, "utf-8"))
    }
  }

  console.log("Fetching the LeetCode problem catalogue...")

  // leetcode.com resets the connection often enough that a single attempt is
  // not a fair test of whether it is reachable.
  let json = null
  let lastError = null
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(API, {
        headers: { "User-Agent": "Mozilla/5.0 (dsa-java-judge build script)" },
        signal: AbortSignal.timeout(30000),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      json = await res.json()
      break
    } catch (err) {
      lastError = err
      const cause = err?.cause?.code ? ` (${err.cause.code})` : ""
      console.log(`${DIM}  attempt ${attempt} failed${cause}; retrying...${OFF}`)
      await new Promise((r) => setTimeout(r, attempt * 2000))
    }
  }
  if (!json) {
    throw new Error(
      `Could not reach leetcode.com after 4 attempts: ${lastError?.message ?? "unknown"}`,
    )
  }

  mkdirSync(CACHE_DIR, { recursive: true })
  writeFileSync(CACHE_FILE, JSON.stringify(json), "utf-8")
  return json
}

const catalogue = await loadCatalogue()
const rows = catalogue.stat_status_pairs ?? []
if (rows.length < 1000) throw new Error(`Catalogue looks wrong: only ${rows.length} problems`)

/** slug -> { title, difficulty, premium } */
const byslug = new Map()
for (const r of rows) {
  byslug.set(r.stat.question__title_slug, {
    title: r.stat.question__title,
    difficulty: LEVEL[r.difficulty.level] ?? "MEDIUM",
    premium: Boolean(r.paid_only),
  })
}
console.log(`${DIM}Catalogue: ${byslug.size} problems${OFF}\n`)

const { leetcodeMap } = await import(
  pathToFileURL(join(ROOT, "src", "lib", "data", "leetcode-map.ts")).href
)
const { curriculum } = await import(
  pathToFileURL(join(ROOT, "src", "lib", "data", "curriculum.ts")).href
)

const curriculumSlugs = new Set(
  curriculum.flatMap((s) => s.topics.flatMap((t) => t.problems.map((p) => p.slug))),
)

const errors = []
const premiumSkipped = []
const out = {}
let linkCount = 0

for (const [slug, entries] of Object.entries(leetcodeMap)) {
  if (!curriculumSlugs.has(slug)) {
    errors.push(`"${slug}" is not a curriculum problem`)
    continue
  }

  const links = []
  for (const entry of Array.isArray(entries) ? entries : [entries]) {
    const lcSlug = typeof entry === "string" ? entry : entry.slug
    const note = typeof entry === "string" ? undefined : entry.note

    const found = byslug.get(lcSlug)
    if (!found) {
      errors.push(`${slug}: LeetCode has no problem "${lcSlug}"`)
      continue
    }
    if (found.premium) {
      premiumSkipped.push(`${slug} -> ${lcSlug} (${found.title})`)
      continue
    }

    links.push({
      platform: "LEETCODE",
      title: found.title,
      url: `https://leetcode.com/problems/${lcSlug}/`,
      difficulty: found.difficulty,
      ...(note ? { note } : {}),
    })
    linkCount++
  }

  if (links.length) out[slug] = links
}

if (premiumSkipped.length) {
  console.log(`${YELLOW}Skipped ${premiumSkipped.length} Premium problem(s) — a paywalled link is worse than none:${OFF}`)
  for (const p of premiumSkipped) console.log(`  ${p}`)
  console.log("")
}

if (errors.length) {
  console.log(`${RED}${errors.length} problem(s) with the mapping:${OFF}`)
  for (const e of errors) console.log(`  ${e}`)
  console.log(`\n${RED}Nothing written.${OFF}`)
  process.exit(1)
}

const body = `/**
 * GENERATED FILE - do not edit by hand.
 *
 * Produced by scripts/fetch-leetcode.mjs from the hand-written mapping in
 * src/lib/data/leetcode-map.ts, joined against LeetCode's public problem
 * catalogue. Titles and difficulties come from the catalogue, so they cannot
 * drift from the real problem, and a slug that does not exist fails the build
 * rather than shipping a dead link.
 *
 * Regenerate with:
 *
 *   node scripts/fetch-leetcode.mjs --refresh
 *
 * The running app never contacts leetcode.com; these are plain links.
 *
 * Generated: ${new Date().toISOString().slice(0, 10)}
 * Catalogue size: ${byslug.size}
 * Curriculum problems linked: ${Object.keys(out).length}
 */

import type { PracticeLink } from "@/lib/types/practice"

export const leetcodePractice: Record<string, PracticeLink[]> = ${JSON.stringify(out, null, 2)}
`

mkdirSync(dirname(OUT_FILE), { recursive: true })
writeFileSync(OUT_FILE, body, "utf-8")

const pct = Math.round((Object.keys(out).length / curriculumSlugs.size) * 100)
console.log(`${GREEN}Wrote ${OUT_FILE}${OFF}`)
console.log(`  ${Object.keys(out).length}/${curriculumSlugs.size} curriculum problems linked (${pct}%), ${linkCount} links total`)
