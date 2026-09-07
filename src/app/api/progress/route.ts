import { NextRequest, NextResponse } from "next/server"
import {
  ActivityEvent,
  ProgressSnapshot,
  appendEvents,
  migrateSnapshotToLog,
  readSnapshot,
  rebuildSnapshot,
  sanitizeProblems,
  writeSnapshot,
} from "@/lib/progress/events"

/**
 * Seed the log from a legacy progress.json. migrateSnapshotToLog() is already a
 * no-op once the log exists, so this needs no in-process latch -- and must not
 * have one, or the log could never be rebuilt after being cleared.
 */
async function ensureMigrated() {
  try {
    await migrateSnapshotToLog()
  } catch (err) {
    console.error("Progress migration failed:", err)
  }
}

const message = (error: unknown): string =>
  error instanceof Error ? error.message : String(error)

/** GET: current progress snapshot, rebuilt from the log if the file is missing. */
export async function GET() {
  try {
    await ensureMigrated()
    const snapshot = await readSnapshot()
    if (!Object.keys(snapshot.problems).length) {
      // Either a fresh install or a lost snapshot; the log is authoritative.
      return NextResponse.json(await rebuildSnapshot())
    }
    return NextResponse.json(snapshot)
  } catch (error) {
    console.error("Error reading progress file:", error)
    return NextResponse.json(
      { error: "Failed to read progress", details: message(error) },
      { status: 500 }
    )
  }
}

/**
 * POST: import a snapshot (backup restore).
 *
 * Normal day-to-day updates go through /api/events instead; this endpoint exists
 * for restoring a backup, and validates the payload rather than trusting it.
 */
export async function POST(request: NextRequest) {
  try {
    await ensureMigrated()
    const body = await request.json()

    if (!body || typeof body !== "object" || typeof body.problems !== "object") {
      return NextResponse.json(
        { error: "Expected an object with a 'problems' map" },
        { status: 400 }
      )
    }

    const problems = sanitizeProblems(body.problems)
    const rejected = Object.keys(body.problems ?? {}).length - Object.keys(problems).length

    const now = new Date().toISOString()
    const snapshot: ProgressSnapshot = { version: "2.0", lastUpdated: now, problems }
    await writeSnapshot(snapshot)

    // Mirror the import into the log so streaks and the heatmap stay consistent.
    const imported: ActivityEvent[] = []
    for (const [slug, p] of Object.entries(problems)) {
      if (p.status === "SOLVED") {
        imported.push({ ts: p.solvedAt || now, type: "SOLVE", slug, verdict: "IMPORTED" })
      } else if (p.status === "ATTEMPTED") {
        imported.push({ ts: p.lastAttemptAt || now, type: "ATTEMPT", slug, verdict: "IMPORTED" })
      }
    }
    await appendEvents(imported)

    return NextResponse.json({
      success: true,
      lastUpdated: now,
      totalProblemsTracked: Object.keys(problems).length,
      ...(rejected > 0 ? { rejectedEntries: rejected } : {}),
    })
  } catch (error) {
    console.error("Error saving progress file:", error)
    return NextResponse.json(
      { error: "Failed to save progress", details: message(error) },
      { status: 500 }
    )
  }
}

/**
 * DELETE: reset the snapshot.
 *
 * The activity log is deliberately left intact -- it is the historical record, and
 * wiping it would destroy the heatmap. Pass ?purge=1 to erase history too.
 */
export async function DELETE(request: NextRequest) {
  try {
    const purge = request.nextUrl.searchParams.get("purge") === "1"
    const now = new Date().toISOString()

    await writeSnapshot({ version: "2.0", lastUpdated: now, problems: {} })

    if (purge) {
      const { writeFile } = await import("fs/promises")
      const { EVENTS_FILE } = await import("@/lib/progress/events")
      await writeFile(EVENTS_FILE, "", "utf-8")
    }

    return NextResponse.json({
      success: true,
      message: purge
        ? "Progress and activity history erased."
        : "Progress reset. Activity history kept — use ?purge=1 to erase it as well.",
      historyKept: !purge,
    })
  } catch (error) {
    console.error("Error resetting progress file:", error)
    return NextResponse.json(
      { error: "Failed to reset progress", details: message(error) },
      { status: 500 }
    )
  }
}
