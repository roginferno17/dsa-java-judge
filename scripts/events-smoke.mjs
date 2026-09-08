/**
 * Tests for the append-only activity log and the streak/heatmap maths.
 *
 * Runs against a throwaway directory, so it never touches real progress.
 *   node scripts/events-smoke.mjs
 */

import { mkdtempSync, rmSync, readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { pathToFileURL } from "node:url"

const REPO = process.cwd()
const work = mkdtempSync(join(tmpdir(), "events-smoke-"))
mkdirSync(join(work, "user_data"), { recursive: true })
// DATA_DIR is derived from cwd at module load, so chdir before importing.
process.chdir(work)

const mod = await import(
  pathToFileURL(join(REPO, "src", "lib", "progress", "events.ts")).href
)
const {
  appendEvent,
  readEvents,
  projectEvents,
  rebuildSnapshot,
  computeStats,
  readSnapshot,
  sanitizeProblems,
  migrateSnapshotToLog,
  EVENTS_FILE,
  PROGRESS_FILE,
} = mod

let pass = 0
let fail = 0
const check = (name, ok, detail = "") => {
  if (ok) {
    pass++
    console.log(`  PASS  ${name}${detail ? `  ${detail}` : ""}`)
  } else {
    fail++
    console.log(`  FAIL  ${name}${detail ? `  ${detail}` : ""}`)
  }
}

console.log("Activity log & streak tests")
console.log("===========================")

// 1. Concurrent appends must all land intact.
//    The previous store rewrote the whole file per action and dropped writes.
{
  const N = 500
  await Promise.all(
    Array.from({ length: N }, (_, i) =>
      appendEvent({ ts: new Date(Date.now() + i).toISOString(), type: "ATTEMPT", slug: `p-${i}` })
    )
  )
  const events = await readEvents()
  const lines = readFileSync(EVENTS_FILE, "utf-8").trim().split("\n")
  check(
    `${N} concurrent appends all land`,
    events.length === N && lines.length === N,
    `-> ${events.length} parsed, ${lines.length} lines`
  )

  const slugs = new Set(events.map((e) => e.slug))
  check("no appends lost or duplicated", slugs.size === N, `-> ${slugs.size} distinct slugs`)
}

// 2. A torn final line (process killed mid-append) must not poison the read.
{
  writeFileSync(EVENTS_FILE, readFileSync(EVENTS_FILE, "utf-8") + '{"ts":"2026-01-01T00:00', "utf-8")
  const events = await readEvents()
  check("truncated trailing line is skipped, not fatal", events.length === 500, `-> ${events.length}`)
}

// 3. rebuildSnapshot must reproduce the projection exactly.
{
  const snap = await rebuildSnapshot()
  const direct = projectEvents(await readEvents())
  check(
    "rebuildSnapshot matches projectEvents byte-for-byte",
    JSON.stringify(snap.problems) === JSON.stringify(direct),
    `-> ${Object.keys(snap.problems).length} problems`
  )
  const onDisk = JSON.parse(readFileSync(PROGRESS_FILE, "utf-8"))
  check(
    "snapshot on disk matches what was returned",
    JSON.stringify(onDisk.problems) === JSON.stringify(snap.problems)
  )
}

// 4. Un-marking a solved problem must stick.
//    The old merge coerced any non-SOLVED pair to ATTEMPTED on the next sync.
{
  const events = [
    { ts: "2026-03-01T10:00:00.000Z", type: "ATTEMPT", slug: "two-sum" },
    { ts: "2026-03-01T10:05:00.000Z", type: "SOLVE", slug: "two-sum" },
    { ts: "2026-03-02T09:00:00.000Z", type: "UNSOLVE", slug: "two-sum" },
  ]
  const p = projectEvents(events)["two-sum"]
  check(
    "un-marking a solved problem sticks",
    p.status === "ATTEMPTED" && p.attempts === 1,
    `-> status=${p.status} attempts=${p.attempts}`
  )

  const never = projectEvents([
    { ts: "2026-03-01T10:00:00.000Z", type: "SOLVE", slug: "never-tried" },
    { ts: "2026-03-02T10:00:00.000Z", type: "UNSOLVE", slug: "never-tried" },
  ])["never-tried"]
  check(
    "un-marking something never attempted returns to NOT_STARTED",
    never.status === "NOT_STARTED",
    `-> ${never.status}`
  )
}

// 5. Streak maths, in a fixed timezone.
{
  const TZ = "Asia/Kolkata" // UTC+5:30, so UTC-bucketing would give wrong answers
  const solve = (ts, slug) => ({ ts, type: "SOLVE", slug })

  // 23:59 then 00:01 local = two separate days.
  const twoDays = computeStats(
    [
      solve("2026-03-01T18:29:00.000Z", "a"), // 23:59 IST on Mar 1
      solve("2026-03-01T18:31:00.000Z", "b"), // 00:01 IST on Mar 2
    ],
    TZ
  )
  check(
    "23:59 -> 00:01 local counts as two days",
    twoDays.activeDays === 2 && twoDays.longestStreak === 2,
    `-> activeDays=${twoDays.activeDays} longest=${twoDays.longestStreak}`
  )

  // The same two instants in UTC fall on one day - proving tz is actually applied.
  const utc = computeStats(
    [solve("2026-03-01T18:29:00.000Z", "a"), solve("2026-03-01T18:31:00.000Z", "b")],
    "UTC"
  )
  check(
    "the same instants bucket differently under UTC",
    utc.activeDays === 1,
    `-> UTC activeDays=${utc.activeDays} vs IST ${twoDays.activeDays}`
  )

  // A gap resets the current run but preserves the longest.
  const gap = computeStats(
    [
      solve("2026-03-01T06:00:00.000Z", "a"),
      solve("2026-03-02T06:00:00.000Z", "b"),
      solve("2026-03-03T06:00:00.000Z", "c"),
      // skips Mar 4
      solve("2026-03-05T06:00:00.000Z", "d"),
    ],
    TZ
  )
  check(
    "a skipped day preserves the longest streak",
    gap.longestStreak === 3,
    `-> longest=${gap.longestStreak}`
  )

  // Current streak is measured from today, with yesterday still counting.
  const today = new Date()
  const iso = (daysAgo) =>
    new Date(today.getTime() - daysAgo * 86400000).toISOString()
  const live = computeStats([solve(iso(2), "x"), solve(iso(1), "y"), solve(iso(0), "z")], TZ)
  check("three consecutive days ending today = streak 3", live.currentStreak === 3, `-> ${live.currentStreak}`)

  const yesterdayOnly = computeStats([solve(iso(2), "x"), solve(iso(1), "y")], TZ)
  check(
    "streak survives until end of today when nothing solved yet today",
    yesterdayOnly.currentStreak === 2,
    `-> ${yesterdayOnly.currentStreak}`
  )

  const stale = computeStats([solve(iso(5), "x"), solve(iso(4), "y")], TZ)
  check("a run that ended days ago is no longer current", stale.currentStreak === 0, `-> ${stale.currentStreak}`)
}

// 6. Heatmap counts equal the events in that day's local window.
{
  const TZ = "Asia/Kolkata"
  const stats = computeStats(
    [
      { ts: "2026-03-01T06:00:00.000Z", type: "SOLVE", slug: "a" },
      { ts: "2026-03-01T07:00:00.000Z", type: "SOLVE", slug: "b" },
      { ts: "2026-03-01T08:00:00.000Z", type: "SOLVE", slug: "c" },
      { ts: "2026-03-02T06:00:00.000Z", type: "SOLVE", slug: "d" },
    ],
    TZ
  )
  check(
    "heatmap cell count matches that day's solves",
    stats.perDay["2026-03-01"] === 3 && stats.perDay["2026-03-02"] === 1,
    `-> ${JSON.stringify(stats.perDay)}`
  )
  check("totalSolved counts distinct problems", stats.totalSolved === 4, `-> ${stats.totalSolved}`)
}

// 7. Untrusted snapshot input is rejected field by field.
{
  const cleaned = sanitizeProblems({
    "good-slug": { status: "SOLVED", attempts: 3, solvedAt: "2026-01-01T00:00:00.000Z" },
    "Bad Slug!": { status: "SOLVED", attempts: 1 },
    "../../etc/passwd": { status: "SOLVED", attempts: 1 },
    "bad-status": { status: "PWNED", attempts: -5 },
    "not-an-object": "nope",
  })
  check(
    "malformed progress entries are dropped or coerced",
    Object.keys(cleaned).length === 2 &&
      cleaned["good-slug"].attempts === 3 &&
      cleaned["bad-status"].status === "NOT_STARTED" &&
      cleaned["bad-status"].attempts === 0,
    `-> kept ${JSON.stringify(Object.keys(cleaned))}`
  )
}

// 8. Migration from a pre-existing progress.json must lose nothing.
{
  const work2 = mkdtempSync(join(tmpdir(), "events-migrate-"))
  mkdirSync(join(work2, "user_data"), { recursive: true })
  writeFileSync(
    join(work2, "user_data", "progress.json"),
    JSON.stringify({
      version: "1.0",
      lastUpdated: "2026-02-01T00:00:00.000Z",
      problems: {
        "two-sum": { status: "SOLVED", attempts: 4, solvedAt: "2026-01-15T00:00:00.000Z" },
        "kadanes-algorithm": { status: "ATTEMPTED", attempts: 2, lastAttemptAt: "2026-01-20T00:00:00.000Z" },
        "sort-012": { status: "NOT_STARTED", attempts: 0 },
      },
    }),
    "utf-8"
  )
  process.chdir(work2)
  const fresh = await import(
    pathToFileURL(join(REPO, "src", "lib", "progress", "events.ts")).href + "?v=2"
  )
  await fresh.migrateSnapshotToLog()
  const projected = fresh.projectEvents(await fresh.readEvents())
  check(
    "migration preserves every solved and attempted mark",
    projected["two-sum"]?.status === "SOLVED" &&
      projected["two-sum"]?.attempts === 4 &&
      projected["kadanes-algorithm"]?.status === "ATTEMPTED",
    `-> ${JSON.stringify(projected)}`
  )
  process.chdir(work)
  rmSync(work2, { recursive: true, force: true })
}

console.log("\n===========================")
console.log(`passed: ${pass}   failed: ${fail}`)

process.chdir(REPO)
rmSync(work, { recursive: true, force: true })
process.exit(fail === 0 ? 0 : 1)
