import { NextRequest, NextResponse } from "next/server"
import {
  ActivityEvent,
  EventType,
  appendEvent,
  computeStats,
  isValidSlug,
  migrateSnapshotToLog,
  projectEvents,
  readEvents,
  writeSnapshot,
} from "@/lib/progress/events"

const EVENT_TYPES: EventType[] = ["ATTEMPT", "SOLVE", "UNSOLVE"]

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

/** GET /api/events?tz=Asia/Kolkata -> derived stats plus current problem state. */
export async function GET(request: NextRequest) {
  try {
    await ensureMigrated()
    const tz = request.nextUrl.searchParams.get("tz") ?? undefined
    const events = await readEvents()
    return NextResponse.json({
      stats: computeStats(events, tz),
      problems: projectEvents(events),
      eventCount: events.length,
    })
  } catch (error) {
    console.error("Failed to read activity log:", error)
    return NextResponse.json({ error: "Failed to read activity log" }, { status: 500 })
  }
}

/** POST /api/events  { type, slug, verdict?, runtimeMs? } */
export async function POST(request: NextRequest) {
  try {
    await ensureMigrated()
    const body = await request.json()

    if (!EVENT_TYPES.includes(body?.type)) {
      return NextResponse.json(
        { error: `type must be one of ${EVENT_TYPES.join(", ")}` },
        { status: 400 }
      )
    }
    if (!isValidSlug(body?.slug)) {
      return NextResponse.json({ error: "Invalid problem slug" }, { status: 400 })
    }

    const event: ActivityEvent = {
      ts: new Date().toISOString(),
      type: body.type,
      slug: body.slug,
      ...(typeof body.verdict === "string" ? { verdict: body.verdict.slice(0, 64) } : {}),
      ...(typeof body.runtimeMs === "number" && Number.isFinite(body.runtimeMs)
        ? { runtimeMs: Math.max(0, Math.floor(body.runtimeMs)) }
        : {}),
    }

    await appendEvent(event)

    // Keep the derived snapshot current so the file stays readable on its own.
    const events = await readEvents()
    const problems = projectEvents(events)
    await writeSnapshot({
      version: "2.0",
      lastUpdated: event.ts,
      problems,
    })

    return NextResponse.json({ ok: true, problems, event })
  } catch (error) {
    console.error("Failed to append activity event:", error)
    return NextResponse.json({ error: "Failed to record activity" }, { status: 500 })
  }
}
