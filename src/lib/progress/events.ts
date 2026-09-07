import { appendFile, mkdir, readFile, writeFile, rename } from "fs/promises"
import { existsSync } from "fs"
import { join } from "path"

/**
 * Append-only activity log.
 *
 * progress.json alone cannot support streaks or a heatmap: it keeps one
 * lastAttemptAt per problem, overwritten on every action, so it records current
 * state and not history. This log is the source of truth; progress.json is a
 * derived snapshot that can be rebuilt from it at any time.
 *
 * Appends are also safer than the previous whole-file rewrites, which raced each
 * other and silently dropped updates.
 */

export const DATA_DIR = join(process.cwd(), "user_data")
export const EVENTS_FILE = join(DATA_DIR, "events.jsonl")
export const PROGRESS_FILE = join(DATA_DIR, "progress.json")

export type EventType = "ATTEMPT" | "SOLVE" | "UNSOLVE"
export type ProblemStatus = "NOT_STARTED" | "ATTEMPTED" | "SOLVED"

export interface ActivityEvent {
  /** UTC ISO timestamp. Day bucketing happens later, in the configured timezone. */
  ts: string
  type: EventType
  slug: string
  verdict?: string
  runtimeMs?: number
}

export interface ProblemProgress {
  status: ProblemStatus
  attempts: number
  lastAttemptAt?: string
  solvedAt?: string
}

export interface ProgressSnapshot {
  version: string
  lastUpdated: string
  problems: Record<string, ProblemProgress>
}

export interface ActivityStats {
  currentStreak: number
  longestStreak: number
  solvedToday: number
  totalSolved: number
  totalAttempts: number
  activeDays: number
  /** dayKey (YYYY-MM-DD in the configured timezone) -> problems solved that day. */
  perDay: Record<string, number>
  firstActivity: string | null
  lastActivity: string | null
}

const EMPTY_SNAPSHOT: ProgressSnapshot = {
  version: "2.0",
  lastUpdated: new Date(0).toISOString(),
  problems: {},
}

// ---------------------------------------------------------------------------
// Writing
// ---------------------------------------------------------------------------

/**
 * Serialises every append through one chain. Node can interleave concurrent
 * appendFile calls, and a torn line would corrupt the log permanently.
 */
let writeChain: Promise<unknown> = Promise.resolve()

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = writeChain.then(task, task)
  writeChain = run.catch(() => {})
  return run
}

async function ensureDataDir(): Promise<void> {
  if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true })
}

export function isValidSlug(slug: unknown): slug is string {
  return typeof slug === "string" && /^[a-z0-9][a-z0-9-]{0,120}$/.test(slug)
}

export async function appendEvent(event: ActivityEvent): Promise<void> {
  if (!isValidSlug(event.slug)) throw new Error(`Invalid slug: ${String(event.slug)}`)
  await enqueue(async () => {
    await ensureDataDir()
    // One JSON object per line, newline-terminated, never rewritten.
    await appendFile(EVENTS_FILE, JSON.stringify(event) + "\n", "utf-8")
  })
}

export async function appendEvents(events: ActivityEvent[]): Promise<void> {
  const valid = events.filter((e) => isValidSlug(e.slug))
  if (!valid.length) return
  await enqueue(async () => {
    await ensureDataDir()
    await appendFile(EVENTS_FILE, valid.map((e) => JSON.stringify(e)).join("\n") + "\n", "utf-8")
  })
}

/** Write via temp file + rename so a crash can never leave a truncated snapshot. */
export async function writeSnapshot(snapshot: ProgressSnapshot): Promise<void> {
  await enqueue(async () => {
    await ensureDataDir()
    const tmp = `${PROGRESS_FILE}.${process.pid}.tmp`
    await writeFile(tmp, JSON.stringify(snapshot, null, 2), "utf-8")
    await rename(tmp, PROGRESS_FILE)
  })
}

// ---------------------------------------------------------------------------
// Reading
// ---------------------------------------------------------------------------

export async function readEvents(): Promise<ActivityEvent[]> {
  if (!existsSync(EVENTS_FILE)) return []
  const raw = await readFile(EVENTS_FILE, "utf-8")
  const out: ActivityEvent[] = []
  for (const line of raw.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed) continue
    try {
      const parsed = JSON.parse(trimmed) as ActivityEvent
      // A partially written final line is possible if the process died mid-append;
      // skip it rather than failing the whole read.
      if (parsed && typeof parsed.ts === "string" && isValidSlug(parsed.slug)) {
        out.push(parsed)
      }
    } catch {
      /* ignore a corrupt line */
    }
  }
  return out
}

export async function readSnapshot(): Promise<ProgressSnapshot> {
  if (!existsSync(PROGRESS_FILE)) return { ...EMPTY_SNAPSHOT, problems: {} }
  try {
    const parsed = JSON.parse(await readFile(PROGRESS_FILE, "utf-8"))
    if (parsed && typeof parsed === "object" && parsed.problems) {
      return {
        version: typeof parsed.version === "string" ? parsed.version : "2.0",
        lastUpdated:
          typeof parsed.lastUpdated === "string" ? parsed.lastUpdated : new Date().toISOString(),
        problems: sanitizeProblems(parsed.problems),
      }
    }
  } catch {
    /* unreadable snapshot: rebuild from the log instead */
  }
  return { ...EMPTY_SNAPSHOT, problems: {} }
}

const STATUSES: ProblemStatus[] = ["NOT_STARTED", "ATTEMPTED", "SOLVED"]

/** Accept only well-formed records; the file is user-editable. */
export function sanitizeProblems(input: unknown): Record<string, ProblemProgress> {
  const out: Record<string, ProblemProgress> = {}
  if (!input || typeof input !== "object") return out
  for (const [slug, value] of Object.entries(input as Record<string, unknown>)) {
    if (!isValidSlug(slug) || !value || typeof value !== "object") continue
    const v = value as Record<string, unknown>
    const status = STATUSES.includes(v.status as ProblemStatus)
      ? (v.status as ProblemStatus)
      : "NOT_STARTED"
    const attempts =
      typeof v.attempts === "number" && Number.isFinite(v.attempts) && v.attempts >= 0
        ? Math.floor(v.attempts)
        : 0
    out[slug] = {
      status,
      attempts,
      ...(typeof v.lastAttemptAt === "string" ? { lastAttemptAt: v.lastAttemptAt } : {}),
      ...(typeof v.solvedAt === "string" ? { solvedAt: v.solvedAt } : {}),
    }
  }
  return out
}

// ---------------------------------------------------------------------------
// Derivation
// ---------------------------------------------------------------------------

/** Replay the log into current state. */
export function projectEvents(events: ActivityEvent[]): Record<string, ProblemProgress> {
  const problems: Record<string, ProblemProgress> = {}
  const ordered = [...events].sort((a, b) => a.ts.localeCompare(b.ts))

  for (const e of ordered) {
    const cur = problems[e.slug] ?? { status: "NOT_STARTED" as ProblemStatus, attempts: 0 }
    switch (e.type) {
      case "ATTEMPT":
        problems[e.slug] = {
          ...cur,
          status: cur.status === "SOLVED" ? "SOLVED" : "ATTEMPTED",
          attempts: cur.attempts + 1,
          lastAttemptAt: e.ts,
        }
        break
      case "SOLVE":
        problems[e.slug] = {
          ...cur,
          status: "SOLVED",
          lastAttemptAt: e.ts,
          solvedAt: cur.solvedAt ?? e.ts,
        }
        break
      case "UNSOLVE":
        // Un-marking must actually stick. The old merge coerced any non-SOLVED
        // pair to ATTEMPTED, so un-marking silently came back as attempted.
        problems[e.slug] = {
          status: cur.attempts > 0 ? "ATTEMPTED" : "NOT_STARTED",
          attempts: cur.attempts,
          ...(cur.lastAttemptAt ? { lastAttemptAt: cur.lastAttemptAt } : {}),
        }
        break
    }
  }
  return problems
}

export async function rebuildSnapshot(): Promise<ProgressSnapshot> {
  const events = await readEvents()
  const snapshot: ProgressSnapshot = {
    version: "2.0",
    lastUpdated: new Date().toISOString(),
    problems: projectEvents(events),
  }
  await writeSnapshot(snapshot)
  return snapshot
}

/**
 * Seed the log from a pre-existing progress.json so upgrading loses nothing.
 * Runs once: if the log already exists it is left alone.
 */
export async function migrateSnapshotToLog(): Promise<boolean> {
  if (existsSync(EVENTS_FILE)) return false
  const snapshot = await readSnapshot()
  const entries = Object.entries(snapshot.problems)
  if (!entries.length) return false

  const seeded: ActivityEvent[] = []
  for (const [slug, p] of entries) {
    const when = p.lastAttemptAt || p.solvedAt || snapshot.lastUpdated || new Date().toISOString()
    for (let i = 0; i < Math.max(p.attempts, p.status === "NOT_STARTED" ? 0 : 1); i++) {
      seeded.push({ ts: when, type: "ATTEMPT", slug, verdict: "MIGRATED" })
    }
    if (p.status === "SOLVED") {
      seeded.push({ ts: p.solvedAt || when, type: "SOLVE", slug, verdict: "MIGRATED" })
    }
  }
  if (!seeded.length) return false
  seeded.sort((a, b) => a.ts.localeCompare(b.ts))
  await appendEvents(seeded)
  return true
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export function resolveTimeZone(tz?: string): string {
  if (tz) {
    try {
      new Intl.DateTimeFormat("en-CA", { timeZone: tz })
      return tz
    } catch {
      /* fall through to the system zone */
    }
  }
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
}

/**
 * YYYY-MM-DD in the given timezone. A streak needs a fixed definition of "day";
 * bucketing by UTC would break it for anyone not on UTC.
 */
export function dayKey(iso: string, timeZone: string): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso))
}

function addDays(key: string, delta: number): string {
  const [y, m, d] = key.split("-").map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d))
  dt.setUTCDate(dt.getUTCDate() + delta)
  return dt.toISOString().slice(0, 10)
}

export function computeStats(events: ActivityEvent[], tz?: string): ActivityStats {
  const timeZone = resolveTimeZone(tz)
  const perDay: Record<string, number> = {}
  const solvedSlugs = new Set<string>()
  const unsolvedSlugs = new Set<string>()
  let totalAttempts = 0
  let first: string | null = null
  let last: string | null = null

  const ordered = [...events].sort((a, b) => a.ts.localeCompare(b.ts))

  for (const e of ordered) {
    if (!first || e.ts < first) first = e.ts
    if (!last || e.ts > last) last = e.ts
    if (e.type === "ATTEMPT") totalAttempts++
    if (e.type === "SOLVE") {
      solvedSlugs.add(e.slug)
      unsolvedSlugs.delete(e.slug)
      // Count the day a problem was solved; re-solving the same problem on the
      // same day should not inflate the heatmap.
      const key = dayKey(e.ts, timeZone)
      perDay[key] = (perDay[key] ?? 0) + 1
    }
    if (e.type === "UNSOLVE") {
      solvedSlugs.delete(e.slug)
      unsolvedSlugs.add(e.slug)
    }
  }

  const days = Object.keys(perDay).sort()
  const daySet = new Set(days)

  let longestStreak = 0
  let run = 0
  let prev: string | null = null
  for (const d of days) {
    run = prev && addDays(prev, 1) === d ? run + 1 : 1
    if (run > longestStreak) longestStreak = run
    prev = d
  }

  const today = dayKey(new Date().toISOString(), timeZone)
  const yesterday = addDays(today, -1)

  // The streak survives until the end of today: not having solved anything yet
  // today does not break a run that was alive yesterday.
  let cursor: string | null = null
  if (daySet.has(today)) cursor = today
  else if (daySet.has(yesterday)) cursor = yesterday

  let currentStreak = 0
  while (cursor && daySet.has(cursor)) {
    currentStreak++
    cursor = addDays(cursor, -1)
  }

  return {
    currentStreak,
    longestStreak,
    solvedToday: perDay[today] ?? 0,
    totalSolved: solvedSlugs.size,
    totalAttempts,
    activeDays: days.length,
    perDay,
    firstActivity: first,
    lastActivity: last,
  }
}
