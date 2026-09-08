import { NextRequest, NextResponse } from "next/server"
import { readdir, stat, rm } from "fs/promises"
import { existsSync } from "fs"
import { join } from "path"

const ROOT = process.cwd()

const TARGETS = {
  user_data: join(ROOT, "user_data"),
  sandbox: join(ROOT, ".sandbox"),
  next: join(ROOT, ".next"),
  cache: join(ROOT, "user_data", "cache"),
} as const

type TargetName = keyof typeof TARGETS

interface DirInfo {
  bytes: number
  files: number
  entries: number
  exists: boolean
}

async function measure(dir: string, depth = 0): Promise<DirInfo> {
  if (!existsSync(dir)) return { bytes: 0, files: 0, entries: 0, exists: false }
  let bytes = 0
  let files = 0
  let entries = 0
  try {
    const names = await readdir(dir, { withFileTypes: true })
    if (depth === 0) entries = names.length
    for (const entry of names) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) {
        const sub = await measure(full, depth + 1)
        bytes += sub.bytes
        files += sub.files
      } else if (entry.isFile()) {
        try {
          bytes += (await stat(full)).size
          files++
        } catch {
          /* vanished mid-walk */
        }
      }
    }
  } catch {
    /* unreadable */
  }
  return { bytes, files, entries, exists: true }
}

/** GET /api/storage -> real on-disk sizes, so the numbers are measured not guessed. */
export async function GET() {
  try {
    const [userData, sandbox, next, cache] = await Promise.all([
      measure(TARGETS.user_data),
      measure(TARGETS.sandbox),
      measure(TARGETS.next),
      measure(TARGETS.cache),
    ])

    let eventCount = 0
    let eventBytes = 0
    const eventsFile = join(TARGETS.user_data, "events.jsonl")
    if (existsSync(eventsFile)) {
      const { readFile } = await import("fs/promises")
      const raw = await readFile(eventsFile, "utf-8")
      eventBytes = Buffer.byteLength(raw, "utf8")
      eventCount = raw.split("\n").filter((l) => l.trim()).length
    }

    return NextResponse.json({
      path: ROOT,
      userData,
      sandbox,
      next,
      cache,
      events: {
        count: eventCount,
        bytes: eventBytes,
        bytesPerEvent: eventCount ? Math.round(eventBytes / eventCount) : 0,
      },
    })
  } catch (error) {
    console.error("Failed to measure storage:", error)
    return NextResponse.json({ error: "Failed to measure storage" }, { status: 500 })
  }
}

/**
 * DELETE /api/storage?target=sandbox|next|cache
 *
 * events.jsonl is deliberately not offered: it is ~100 bytes per event and
 * deleting it would silently destroy the streak and heatmap history.
 */
export async function DELETE(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("target") as TargetName | null

  if (!target || !["sandbox", "next", "cache"].includes(target)) {
    return NextResponse.json(
      { error: "target must be one of: sandbox, next, cache" },
      { status: 400 }
    )
  }

  try {
    const dir = TARGETS[target]
    const before = await measure(dir)
    await rm(dir, { recursive: true, force: true })
    return NextResponse.json({
      ok: true,
      target,
      freedBytes: before.bytes,
      freedFiles: before.files,
    })
  } catch (error) {
    console.error(`Failed to clear ${target}:`, error)
    return NextResponse.json({ error: `Failed to clear ${target}` }, { status: 500 })
  }
}
