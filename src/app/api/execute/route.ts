import { NextRequest, NextResponse } from "next/server"
import { executeJavaFunction, executeJava } from "@/lib/executor/sandbox"
import {
  ParameterDefinition,
  ComparisonConfig,
  StructuredTestCase,
} from "@/lib/types/judge"

interface ExecuteApiRequest {
  code: string
  mode?: "run" | "submit"
  executionMode?: "FUNCTION" | "STDIO"
  className?: string
  methodName?: string
  parameters?: ParameterDefinition[]
  returnType?: string
  mutatedArgIndex?: number
  comparison?: ComparisonConfig
  testCases?: StructuredTestCase[]
  timeoutMs?: number
  memoryLimitMb?: number
  stopOnFirstFailure?: boolean
  stdin?: string
}

const MAX_CODE_BYTES = 65536
const SAFE_IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]{0,63}$/

/** Clamp caller-supplied limits so a request cannot ask for an unbounded run. */
const clamp = (v: unknown, lo: number, hi: number, dflt: number): number => {
  const n = typeof v === "number" && Number.isFinite(v) ? v : dflt
  return Math.min(Math.max(n, lo), hi)
}

export async function POST(request: NextRequest) {
  try {
    const body: ExecuteApiRequest = await request.json()
    const {
      code,
      executionMode = "FUNCTION",
      className = "Solution",
      methodName,
      parameters,
      returnType,
      mutatedArgIndex,
      comparison,
      testCases,
      stdin,
    } = body

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Code is required" }, { status: 400 })
    }
    if (Buffer.byteLength(code, "utf8") > MAX_CODE_BYTES) {
      return NextResponse.json(
        { error: "Code exceeds the maximum size (64KB)" },
        { status: 400 }
      )
    }

    // className reaches the filesystem and (previously) a shell command line, so it
    // must be a plain Java identifier -- this blocks both path traversal and any
    // attempt at argument injection.
    if (!SAFE_IDENTIFIER.test(className)) {
      return NextResponse.json(
        { error: "Invalid class name. Use a plain Java identifier." },
        { status: 400 }
      )
    }
    if (methodName !== undefined && !SAFE_IDENTIFIER.test(methodName)) {
      return NextResponse.json(
        { error: "Invalid method name. Use a plain Java identifier." },
        { status: 400 }
      )
    }

    const timeoutMs = clamp(body.timeoutMs, 1000, 15000, 5000)
    const memoryLimitMb = clamp(body.memoryLimitMb, 64, 1024, 256)

    // A speed bump, not a sandbox: string concatenation or reflection defeats it
    // trivially. Real isolation would need a container -- see README.
    const restrictedPatterns = [
      /Runtime\s*\.\s*getRuntime\s*\(\s*\)\s*\.\s*exec/,
      /ProcessBuilder/,
      /System\s*\.\s*exit/,
    ]
    for (const pattern of restrictedPatterns) {
      if (pattern.test(code)) {
        return NextResponse.json(
          {
            status: "COMPILATION_ERROR",
            error:
              "This solution uses a restricted API (process spawning or System.exit). Solve the problem with plain Java instead.",
          },
          { status: 400 }
        )
      }
    }

    if (
      executionMode === "FUNCTION" &&
      methodName &&
      parameters &&
      returnType &&
      testCases
    ) {
      if (!Array.isArray(testCases) || testCases.length === 0) {
        return NextResponse.json(
          { error: "Test cases are required for execution" },
          { status: 400 }
        )
      }
      if (!Array.isArray(parameters)) {
        return NextResponse.json({ error: "Invalid parameters" }, { status: 400 })
      }

      const result = await executeJavaFunction({
        code,
        className,
        methodName,
        parameters,
        returnType,
        mutatedArgIndex,
        comparison,
        testCases,
        timeoutMs,
        memoryLimitMb,
        stopOnFirstFailure: body.stopOnFirstFailure === true,
      })

      return NextResponse.json({
        status: result.status,
        passed: result.passed,
        total: result.total,
        // Hidden cases report a verdict but never leak their input or expected value.
        results: result.results.map((r) =>
          r.hidden
            ? {
                passed: r.passed,
                hidden: true,
                input: "Hidden",
                expected: "Hidden",
                actual: r.passed ? "Hidden" : "Incorrect",
                executionTimeMs: r.executionTimeMs,
              }
            : r
        ),
        executionTimeMs: result.executionTimeMs,
        stdout: result.stdout,
        error: result.error,
      })
    }

    const stdioResult = await executeJava({
      code,
      stdin: typeof stdin === "string" ? stdin : "",
      timeoutMs,
      memoryLimitMb,
    })

    return NextResponse.json({
      status: stdioResult.status,
      stdout: stdioResult.stdout,
      stderr: stdioResult.stderr,
      exitCode: stdioResult.exitCode,
      executionTimeMs: stdioResult.executionTimeMs,
    })
  } catch (error) {
    console.error("Execution handler error:", error)
    return NextResponse.json(
      {
        status: "RUNTIME_ERROR",
        error: "Internal execution error: " + ((error as Error).message || "Unknown error"),
      },
      { status: 500 }
    )
  }
}
