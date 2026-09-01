import { NextRequest, NextResponse } from "next/server"
import { readFile, writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

const DATA_DIR = join(process.cwd(), "user_data")
const PROGRESS_FILE = join(DATA_DIR, "progress.json")

interface ProgressFileStructure {
  version: string
  lastUpdated: string
  problems: Record<
    string,
    {
      status: "NOT_STARTED" | "ATTEMPTED" | "SOLVED"
      attempts: number
      lastAttemptAt?: string
      solvedAt?: string
    }
  >
}

async function ensureDataDirectory() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
}

// GET: Read current progress from local file
export async function GET() {
  try {
    await ensureDataDirectory()

    if (!existsSync(PROGRESS_FILE)) {
      const initialData: ProgressFileStructure = {
        version: "1.0",
        lastUpdated: new Date().toISOString(),
        problems: {},
      }
      await writeFile(PROGRESS_FILE, JSON.stringify(initialData, null, 2), "utf-8")
      return NextResponse.json(initialData)
    }

    const content = await readFile(PROGRESS_FILE, "utf-8")
    const parsed: ProgressFileStructure = JSON.parse(content)
    return NextResponse.json(parsed)
  } catch (error: any) {
    console.error("Error reading progress file:", error)
    return NextResponse.json(
      { error: "Failed to read progress", details: error.message },
      { status: 500 }
    )
  }
}

// POST: Save/Sync progress to local file
export async function POST(request: NextRequest) {
  try {
    await ensureDataDirectory()

    const body = await request.json()
    const problems = body.problems || {}

    const updatedData: ProgressFileStructure = {
      version: "1.0",
      lastUpdated: new Date().toISOString(),
      problems,
    }

    await writeFile(PROGRESS_FILE, JSON.stringify(updatedData, null, 2), "utf-8")

    return NextResponse.json({
      success: true,
      lastUpdated: updatedData.lastUpdated,
      totalProblemsTracked: Object.keys(problems).length,
    })
  } catch (error: any) {
    console.error("Error saving progress file:", error)
    return NextResponse.json(
      { error: "Failed to save progress", details: error.message },
      { status: 500 }
    )
  }
}

// DELETE: Reset local progress file
export async function DELETE() {
  try {
    await ensureDataDirectory()

    const resetData: ProgressFileStructure = {
      version: "1.0",
      lastUpdated: new Date().toISOString(),
      problems: {},
    }

    await writeFile(PROGRESS_FILE, JSON.stringify(resetData, null, 2), "utf-8")

    return NextResponse.json({ success: true, message: "Progress reset successfully" })
  } catch (error: any) {
    console.error("Error resetting progress file:", error)
    return NextResponse.json(
      { error: "Failed to reset progress", details: error.message },
      { status: 500 }
    )
  }
}
