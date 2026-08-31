import { NextRequest, NextResponse } from "next/server"
import { executeJavaFunction, executeJava } from "@/lib/executor/sandbox"
import { ParameterDefinition, ComparisonConfig, StructuredTestCase } from "@/lib/types/judge"

interface ExecuteApiRequest {
  code: string
  mode?: "run" | "submit"
  executionMode?: "FUNCTION" | "STDIO"

  // Method signature for FUNCTION mode
  className?: string
  methodName?: string
  parameters?: ParameterDefinition[]
  returnType?: string
  comparison?: ComparisonConfig
  testCases?: StructuredTestCase[]

  // Legacy STDIO mode
  stdin?: string
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
      comparison,
      testCases,
      stdin,
    } = body

    // 1. Basic validation
    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Code is required" },
        { status: 400 }
      )
    }

    if (code.length > 65536) {
      return NextResponse.json(
        { error: "Code exceeds maximum allowable size (64KB)" },
        { status: 400 }
      )
    }

    // 2. Basic security filters for malicious process spawns
    const restrictedPatterns = [
      /Runtime\.getRuntime\(\)\.exec/,
      /ProcessBuilder/,
      /System\.exit/,
    ]

    for (const pattern of restrictedPatterns) {
      if (pattern.test(code)) {
        return NextResponse.json(
          {
            status: "COMPILATION_ERROR",
            error: "Restricted system API usage detected.",
          },
          { status: 400 }
        )
      }
    }

    // 3. FUNCTION Mode Execution (LeetCode-Style)
    if (executionMode === "FUNCTION" && methodName && parameters && returnType && testCases) {
      if (!Array.isArray(testCases) || testCases.length === 0) {
        return NextResponse.json(
          { error: "Test cases are required for execution" },
          { status: 400 }
        )
      }

      const result = await executeJavaFunction({
        code,
        className,
        methodName,
        parameters,
        returnType,
        comparison,
        testCases,
        timeoutMs: 5000,
      })

      return NextResponse.json({
        status: result.status,
        passed: result.passed,
        total: result.total,
        results: result.results,
        executionTimeMs: result.executionTimeMs,
        error: result.error,
      })
    }

    // 4. STDIO Mode Execution (Legacy Fallback)
    const stdioResult = await executeJava({
      code,
      stdin: stdin || "",
      timeoutMs: 5000,
    })

    return NextResponse.json({
      status: stdioResult.status,
      stdout: stdioResult.stdout,
      stderr: stdioResult.stderr,
      exitCode: stdioResult.exitCode,
      executionTimeMs: stdioResult.executionTimeMs,
    })
  } catch (error: any) {
    console.error("Execution handler error:", error)
    return NextResponse.json(
      {
        status: "RUNTIME_ERROR",
        error: "Internal execution error: " + (error.message || "Unknown error"),
      },
      { status: 500 }
    )
  }
}
