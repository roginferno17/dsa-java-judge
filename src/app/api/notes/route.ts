import { NextRequest, NextResponse } from "next/server"
import { readFile, writeFile, mkdir, rename } from "fs/promises"
import { join } from "path"
import { DATA_DIR, knownCurriculumSlugs } from "@/lib/progress/events"

/**
 * Per-problem scratchpad notes, kept in one JSON file.
 *
 * Notes live beside progress rather than in localStorage so they survive a
 * cleared browser and land in the same backup as everything else.
 */
const NOTES_FILE = join(DATA_DIR, "notes.json")

/** A note that would not fit in a reasonable scratchpad is almost certainly a bug. */
const MAX_NOTE_LENGTH = 20000

export interface StoredNote {
  text: string
  updatedAt: string
}

type NotesFile = Record<string, StoredNote>

const message = (error: unknown): string =>
  error instanceof Error ? error.message : String(error)

async function readNotes(): Promise<NotesFile> {
  try {
    const raw = await readFile(NOTES_FILE, "utf-8")
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object") return {}

    const out: NotesFile = {}
    for (const [slug, value] of Object.entries(parsed as Record<string, unknown>)) {
      const v = value as Record<string, unknown>
      if (!v || typeof v.text !== "string") continue
      out[slug] = {
        text: v.text.slice(0, MAX_NOTE_LENGTH),
        updatedAt: typeof v.updatedAt === "string" ? v.updatedAt : new Date().toISOString(),
      }
    }
    return out
  } catch {
    // Missing or unreadable: an empty set of notes is the right answer either way.
    return {}
  }
}

/** Temp file plus rename, so a crash mid-write cannot truncate the notes. */
async function writeNotes(notes: NotesFile): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true })
  const tmp = `${NOTES_FILE}.tmp`
  await writeFile(tmp, JSON.stringify(notes, null, 2), "utf-8")
  await rename(tmp, NOTES_FILE)
}

export async function GET() {
  try {
    return NextResponse.json({ notes: await readNotes() })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read notes", details: message(error) },
      { status: 500 },
    )
  }
}

/** PUT one note. An empty body deletes it rather than storing a blank entry. */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const slug = body?.slug
    const text = body?.text

    if (typeof slug !== "string" || typeof text !== "string") {
      return NextResponse.json({ error: "Expected { slug, text }" }, { status: 400 })
    }
    if (!knownCurriculumSlugs().has(slug)) {
      return NextResponse.json({ error: `Unknown problem '${slug}'` }, { status: 400 })
    }
    if (text.length > MAX_NOTE_LENGTH) {
      return NextResponse.json(
        { error: `Note is longer than ${MAX_NOTE_LENGTH} characters` },
        { status: 400 },
      )
    }

    const notes = await readNotes()
    if (text.trim().length === 0) delete notes[slug]
    else notes[slug] = { text, updatedAt: new Date().toISOString() }

    await writeNotes(notes)
    return NextResponse.json({ success: true, slug, saved: text.trim().length > 0 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save note", details: message(error) },
      { status: 500 },
    )
  }
}
