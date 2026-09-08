import { NextRequest, NextResponse } from "next/server"
import { readFile, writeFile, rename, mkdir } from "fs/promises"
import { existsSync } from "fs"
import { join } from "path"
import { AppSettings, DEFAULT_SETTINGS, sanitizeSettings } from "@/lib/settings/types"

const DATA_DIR = join(process.cwd(), "user_data")
const SETTINGS_FILE = join(DATA_DIR, "settings.json")

async function readSettings(): Promise<AppSettings> {
  if (!existsSync(SETTINGS_FILE)) return DEFAULT_SETTINGS
  try {
    return sanitizeSettings(JSON.parse(await readFile(SETTINGS_FILE, "utf-8")))
  } catch {
    // A hand-edited or truncated file should not brick the app.
    return DEFAULT_SETTINGS
  }
}

export async function GET() {
  try {
    return NextResponse.json(await readSettings())
  } catch (error) {
    console.error("Failed to read settings:", error)
    return NextResponse.json(DEFAULT_SETTINGS)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const incoming = sanitizeSettings(await request.json())
    if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true })

    // temp + rename, so an interrupted write cannot truncate the file
    const tmp = `${SETTINGS_FILE}.${process.pid}.tmp`
    await writeFile(tmp, JSON.stringify(incoming, null, 2), "utf-8")
    await rename(tmp, SETTINGS_FILE)

    return NextResponse.json(incoming)
  } catch (error) {
    console.error("Failed to save settings:", error)
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true })
    const tmp = `${SETTINGS_FILE}.${process.pid}.tmp`
    await writeFile(tmp, JSON.stringify(DEFAULT_SETTINGS, null, 2), "utf-8")
    await rename(tmp, SETTINGS_FILE)
    return NextResponse.json(DEFAULT_SETTINGS)
  } catch (error) {
    console.error("Failed to reset settings:", error)
    return NextResponse.json({ error: "Failed to reset settings" }, { status: 500 })
  }
}
