/**
 * Generates Codeforces practice suggestions for every curriculum topic.
 *
 * Codeforces has a real, documented public API. problemset.problems needs no
 * authentication and is rate limited to one request per two seconds:
 *   https://codeforces.com/apiHelp/methods
 *
 * This script runs ONCE and writes a committed data file. The app itself never
 * calls codeforces.com at runtime.
 *
 *   node scripts/fetch-codeforces.mjs [--refresh]
 *
 * The raw API response is cached under user_data/cache/ (git-ignored), so re-runs
 * are free unless --refresh is passed.
 */

import { mkdirSync, existsSync, readFileSync, writeFileSync, statSync } from "node:fs"
import { join, dirname } from "node:path"
import { pathToFileURL } from "node:url"

const ROOT = process.cwd()
const CACHE_DIR = join(ROOT, "user_data", "cache")
const CACHE_FILE = join(CACHE_DIR, "codeforces-problemset.json")
const OUT_FILE = join(ROOT, "src", "lib", "data", "generated", "codeforces-practice.ts")
const API = "https://codeforces.com/api/problemset.problems"
const CACHE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

const refresh = process.argv.includes("--refresh")

/**
 * Curriculum topic -> Codeforces tags and a rating band.
 *
 * Bands are deliberately gentle. Someone still learning Java syntax is served far
 * better by a well-known 800-1200 problem than by a "correct" but brutal one, so
 * early steps stay low and only genuinely advanced topics go above 1900.
 */
const TOPIC_MAP = {
  // Step 1 - basics
  "user-input-output": { tags: ["implementation"], min: 800, max: 800 },
  "data-types": { tags: ["implementation", "math"], min: 800, max: 900 },
  "if-else-statements": { tags: ["implementation"], min: 800, max: 900 },
  "switch-statement": { tags: ["implementation"], min: 800, max: 900 },
  "arrays-strings-basics": { tags: ["implementation", "strings"], min: 800, max: 1000 },
  "for-loops": { tags: ["implementation", "brute force"], min: 800, max: 900 },
  "while-loops": { tags: ["implementation", "brute force"], min: 800, max: 1000 },
  functions: { tags: ["implementation"], min: 800, max: 1000 },
  "time-complexity": { tags: ["brute force", "math"], min: 900, max: 1200 },
  patterns: { tags: ["implementation"], min: 800, max: 1000 },
  "java-collections": { tags: ["data structures", "sortings"], min: 900, max: 1200 },
  "basic-math-problems": { tags: ["math", "number theory"], min: 800, max: 1200 },
  "recursion-basics": { tags: ["dfs and similar", "brute force"], min: 900, max: 1300 },
  hashing: { tags: ["hashing", "data structures"], min: 900, max: 1300 },

  // Step 2 - sorting
  "sorting-algorithms": { tags: ["sortings"], min: 800, max: 1200 },

  // Step 3 - arrays
  "easy-array-problems": { tags: ["implementation", "greedy"], min: 800, max: 1100 },
  "medium-array-problems": { tags: ["two pointers", "greedy", "sortings"], min: 1100, max: 1500 },
  "hard-array-problems": { tags: ["data structures", "constructive algorithms"], min: 1500, max: 1900 },

  // Step 4 - binary search
  "binary-search-1d": { tags: ["binary search"], min: 900, max: 1300 },
  "binary-search-space": { tags: ["binary search", "ternary search"], min: 1300, max: 1700 },
  "binary-search-2d": { tags: ["binary search", "implementation"], min: 1200, max: 1600 },

  // Step 5 - strings
  "string-problems": { tags: ["strings", "implementation"], min: 900, max: 1400 },

  // Step 6 - linked list (no CF equivalent; closest is pointer/list manipulation)
  "singly-linked-list-basics": { tags: ["implementation", "data structures"], min: 800, max: 1100 },
  "doubly-linked-list": { tags: ["data structures", "implementation"], min: 1000, max: 1400 },
  "medium-linked-list": { tags: ["two pointers", "data structures"], min: 1200, max: 1600 },
  "hard-linked-list": { tags: ["data structures", "constructive algorithms"], min: 1500, max: 1900 },

  // Step 7 - recursion & backtracking
  "basic-recursion": { tags: ["dfs and similar", "brute force"], min: 900, max: 1300 },
  "subsequence-patterns": { tags: ["bitmasks", "brute force"], min: 1200, max: 1600 },
  "combination-subset": { tags: ["combinatorics", "bitmasks"], min: 1300, max: 1700 },
  "hard-recursion-backtracking": { tags: ["dfs and similar", "brute force"], min: 1700, max: 2100 },

  // Step 8 - bit manipulation
  "bit-manipulation-concepts": { tags: ["bitmasks", "math"], min: 900, max: 1400 },
  "bit-manipulation-problems": { tags: ["bitmasks"], min: 1300, max: 1800 },

  // Step 9 - stacks & queues
  "stack-queue-implementation": { tags: ["data structures", "implementation"], min: 900, max: 1300 },
  "infix-prefix-postfix": { tags: ["expression parsing", "implementation"], min: 1200, max: 1700 },
  "monotonic-stack": { tags: ["data structures", "two pointers"], min: 1400, max: 1900 },
  "cache-design": { tags: ["data structures", "implementation"], min: 1400, max: 1800 },

  // Step 10 - sliding window
  "sliding-window-problems": { tags: ["two pointers", "sliding window"], min: 1200, max: 1700 },

  // Step 11 - heaps
  "heap-basics": { tags: ["data structures", "greedy"], min: 1000, max: 1400 },
  "medium-heap": { tags: ["data structures", "greedy"], min: 1400, max: 1800 },
  "hard-heap": { tags: ["data structures"], min: 1700, max: 2100 },

  // Step 12 - greedy
  "greedy-problems": { tags: ["greedy"], min: 900, max: 1500 },

  // Step 13 - binary trees
  "tree-traversals": { tags: ["trees", "dfs and similar"], min: 1000, max: 1400 },
  "medium-tree": { tags: ["trees", "dfs and similar"], min: 1400, max: 1800 },
  "hard-tree": { tags: ["trees", "dp"], min: 1700, max: 2200 },

  // Step 14 - BST
  "bst-basics": { tags: ["trees", "data structures"], min: 1100, max: 1500 },
  "medium-bst": { tags: ["trees", "data structures"], min: 1400, max: 1800 },
  "hard-bst": { tags: ["trees", "data structures"], min: 1700, max: 2100 },

  // Step 15 - graphs
  "graph-basics": { tags: ["graphs", "dfs and similar"], min: 1000, max: 1400 },
  "bfs-dfs": { tags: ["dfs and similar", "graphs", "shortest paths"], min: 1200, max: 1700 },
  "shortest-path": { tags: ["shortest paths", "graphs"], min: 1500, max: 2000 },
  "mst-advanced": { tags: ["dsu", "graphs", "trees"], min: 1600, max: 2100 },

  // Step 16 - DP
  "1d-dp": { tags: ["dp"], min: 1000, max: 1400 },
  "2d-dp": { tags: ["dp"], min: 1300, max: 1700 },
  "dp-strings": { tags: ["dp", "strings"], min: 1500, max: 1900 },
  "dp-knapsack": { tags: ["dp"], min: 1400, max: 1800 },
  "dp-stocks": { tags: ["dp", "greedy"], min: 1300, max: 1700 },
  "dp-lis": { tags: ["dp", "binary search"], min: 1500, max: 1900 },
  "dp-squares": { tags: ["dp"], min: 1500, max: 1900 },

  // Step 17 - tries
  "trie-basics": { tags: ["string suffix structures", "strings"], min: 1400, max: 1900 },
  "trie-problems": { tags: ["string suffix structures", "bitmasks"], min: 1600, max: 2100 },

  // Step 18 - advanced strings
  "string-matching": { tags: ["string suffix structures", "hashing", "strings"], min: 1600, max: 2100 },
  "advanced-string-problems": { tags: ["strings", "hashing"], min: 1500, max: 2000 },
}

async function fetchProblemset() {
  if (!refresh && existsSync(CACHE_FILE)) {
    const age = Date.now() - statSync(CACHE_FILE).mtimeMs
    if (age < CACHE_MAX_AGE_MS) {
      console.log(`Using cached problemset (${Math.round(age / 3600000)}h old). --refresh to re-fetch.`)
      return JSON.parse(readFileSync(CACHE_FILE, "utf-8"))
    }
  }

  console.log(`Fetching ${API} ...`)
  // One request total. The documented limit is 1 per 2 seconds; we make a single
  // call and cache it, so there is nothing to throttle.
  const res = await fetch(API, {
    headers: { "User-Agent": "dsa-java-judge/1.0 (local practice-link generator)" },
  })
  if (!res.ok) throw new Error(`Codeforces API returned HTTP ${res.status}`)

  const body = await res.json()
  if (body.status !== "OK") throw new Error(`Codeforces API status: ${body.status} ${body.comment ?? ""}`)

  mkdirSync(CACHE_DIR, { recursive: true })
  writeFileSync(CACHE_FILE, JSON.stringify(body), "utf-8")
  console.log(`Cached to ${CACHE_FILE}`)
  return body
}

function pickForTopic(problems, { tags, min, max }, used) {
  const wanted = new Set(tags)
  const candidates = problems.filter((p) => {
    if (typeof p.rating !== "number" || p.rating < min || p.rating > max) return false
    if (!p.tags?.some((t) => wanted.has(t))) return false
    if (used.has(`${p.contestId}${p.index}`)) return false
    // Div-2-style lettered problems only; gym and acmsguru have different URLs.
    return typeof p.contestId === "number" && /^[A-Z]\d?$/.test(p.index ?? "")
  })

  // Most-solved first: the best known problems have the cleanest statements, which
  // matters a lot when you are still learning to read them.
  candidates.sort((a, b) => (b.solvedCount ?? 0) - (a.solvedCount ?? 0))

  const chosen = candidates.slice(0, 2)
  chosen.forEach((p) => used.add(`${p.contestId}${p.index}`))
  return chosen
}

async function main() {
  const body = await fetchProblemset()
  const problems = body.result.problems
  const stats = body.result.problemStatistics ?? []

  const solvedBy = new Map()
  for (const s of stats) solvedBy.set(`${s.contestId}${s.index}`, s.solvedCount)
  for (const p of problems) p.solvedCount = solvedBy.get(`${p.contestId}${p.index}`) ?? 0

  console.log(`Problemset: ${problems.length} problems, ${stats.length} with solve counts`)

  const curriculum = (
    await import(pathToFileURL(join(ROOT, "src", "lib", "data", "curriculum.ts")).href)
  ).curriculum

  const allTopics = curriculum.flatMap((s) => s.topics.map((t) => t.slug))
  const unmapped = allTopics.filter((t) => !TOPIC_MAP[t])
  const stale = Object.keys(TOPIC_MAP).filter((t) => !allTopics.includes(t))

  if (unmapped.length) console.warn(`\n!! ${unmapped.length} topics have no mapping:`, unmapped)
  if (stale.length) console.warn(`\n!! ${stale.length} mappings refer to topics that no longer exist:`, stale)

  const used = new Set()
  const out = {}
  let picked = 0
  let empty = 0

  for (const step of curriculum) {
    for (const topic of step.topics) {
      const cfg = TOPIC_MAP[topic.slug]
      if (!cfg) continue
      const chosen = pickForTopic(problems, cfg, used)
      if (!chosen.length) {
        empty++
        continue
      }
      out[topic.slug] = chosen.map((p) => ({
        platform: "CODEFORCES",
        title: `${p.contestId}${p.index} — ${p.name}`,
        url: `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`,
        difficulty: String(p.rating),
        contestId: p.contestId,
        index: p.index,
      }))
      picked += chosen.length
    }
  }

  const header = `/**
 * GENERATED FILE - do not edit by hand.
 *
 * Produced by scripts/fetch-codeforces.mjs from the Codeforces public API
 * (problemset.problems). Re-run that script to regenerate:
 *
 *   node scripts/fetch-codeforces.mjs --refresh
 *
 * The running app never contacts codeforces.com; these are plain links.
 *
 * Generated: ${new Date().toISOString().slice(0, 10)}
 * Source problems: ${problems.length}
 */

import { PracticeLink } from "@/lib/types/practice"

export const codeforcesPractice: Record<string, PracticeLink[]> = ${JSON.stringify(out, null, 2)}

export const codeforcesTopicCount = ${Object.keys(out).length}
`

  mkdirSync(dirname(OUT_FILE), { recursive: true })
  writeFileSync(OUT_FILE, header, "utf-8")

  console.log(`\nWrote ${OUT_FILE}`)
  console.log(`  ${Object.keys(out).length}/${allTopics.length} topics covered, ${picked} problems`)
  if (empty) console.log(`  ${empty} topics matched nothing in their rating band`)

  const ratings = Object.values(out).flat().map((p) => Number(p.difficulty))
  ratings.sort((a, b) => a - b)
  console.log(`  rating range: ${ratings[0]} - ${ratings[ratings.length - 1]}, median ${ratings[Math.floor(ratings.length / 2)]}`)
}

main().catch((err) => {
  console.error("\nFailed:", err.message)
  process.exit(1)
})
