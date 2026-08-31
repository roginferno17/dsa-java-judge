import { execSync, spawn } from "child_process"
import { writeFile, readFile, mkdir, rm } from "fs/promises"
import { join } from "path"
import { randomUUID } from "crypto"
import { generateJavaDriverSource } from "@/lib/executor/java-driver"
import {
  FunctionExecutionRequest,
  JudgeExecutionResult,
  StructuredTestCase,
  ParameterDefinition,
} from "@/lib/types/judge"

export interface ExecutionRequest {
  code: string
  stdin?: string
  timeoutMs?: number
  memoryLimitMb?: number
}

export interface ExecutionResult {
  stdout: string
  stderr: string
  exitCode: number
  executionTimeMs: number
  memoryUsedMb: number
  status:
    | "ACCEPTED"
    | "WRONG_ANSWER"
    | "COMPILATION_ERROR"
    | "RUNTIME_ERROR"
    | "TIME_LIMIT_EXCEEDED"
    | "MEMORY_LIMIT_EXCEEDED"
}

const SANDBOX_DIR = join(process.cwd(), ".sandbox")
const DEFAULT_TIMEOUT_MS = 5000
const DEFAULT_MEMORY_MB = 256

/**
 * Extract public class name from Java source code.
 */
function extractClassName(code: string): string {
  const match = code.match(/public\s+class\s+(\w+)/)
  if (match) return match[1]
  const matchClass = code.match(/class\s+(\w+)/)
  return matchClass ? matchClass[1] : "Solution"
}

/**
 * Format input display string for test cases (e.g. "nums = [2, 7, 11, 15], target = 9")
 */
function formatInputDisplay(
  inputs: Record<string, any> | any[],
  parameters: ParameterDefinition[]
): string {
  if (Array.isArray(inputs)) {
    return inputs
      .map((val, i) => {
        const paramName = parameters[i]?.name || `arg${i}`
        return `${paramName} = ${JSON.stringify(val)}`
      })
      .join(", ")
  }

  if (typeof inputs === "object" && inputs !== null) {
    return Object.entries(inputs)
      .map(([key, val]) => `${key} = ${JSON.stringify(val)}`)
      .join(", ")
  }

  return String(inputs)
}

/**
 * LeetCode-style Typed Function Execution
 */
export async function executeJavaFunction(
  request: FunctionExecutionRequest
): Promise<JudgeExecutionResult> {
  const {
    code,
    className = "Solution",
    methodName,
    parameters,
    returnType,
    comparison,
    testCases,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = request

  const jobId = randomUUID()
  const jobDir = join(SANDBOX_DIR, jobId)

  try {
    await mkdir(jobDir, { recursive: true })

    // 1. Prepare structured testcases payload for Java driver
    const normalizedTestCases = testCases.map((tc, idx) => {
      let inputsArray: any[] = []
      if (Array.isArray(tc.inputs)) {
        inputsArray = tc.inputs
      } else if (typeof tc.inputs === "object" && tc.inputs !== null) {
        const objInputs = tc.inputs as Record<string, any>
        inputsArray = parameters.map((p) => objInputs[p.name])
      } else {
        inputsArray = [tc.inputs]
      }

      return {
        id: tc.id || idx + 1,
        inputs: inputsArray,
        expected: tc.expectedOutput,
        inputDisplay: formatInputDisplay(tc.inputs, parameters),
      }
    })

    const payload = {
      className,
      methodName,
      parameterTypes: parameters.map((p) => p.type),
      returnType,
      orderMatters: comparison?.orderMatters ?? true,
      testCases: normalizedTestCases,
    }

    // 2. Write Java and JSON files
    const solutionFile = `${className}.java`
    await writeFile(join(jobDir, solutionFile), code, "utf-8")
    await writeFile(join(jobDir, "__Driver__.java"), generateJavaDriverSource(), "utf-8")
    await writeFile(join(jobDir, "__testcases__.json"), JSON.stringify(payload, null, 2), "utf-8")

    const startTime = Date.now()

    // 3. Compile both Solution.java and __Driver__.java
    try {
      execSync(`javac "${solutionFile}" "__Driver__.java"`, {
        timeout: 10000,
        cwd: jobDir,
        stdio: "pipe",
      })
    } catch (err: any) {
      const compileErr = err.stderr?.toString() || err.stdout?.toString() || "Compilation failed"
      // Filter out internal driver compilation noise if any
      const cleanedErr = compileErr
        .split("\n")
        .filter((line: string) => !line.includes("__Driver__.java"))
        .join("\n")
        .trim()

      return {
        status: "COMPILATION_ERROR",
        passed: 0,
        total: testCases.length,
        results: [],
        executionTimeMs: Date.now() - startTime,
        error: cleanedErr || compileErr,
      }
    }

    // 4. Run __Driver__ with timeout
    return new Promise((resolve) => {
      const child = spawn("java", ["__Driver__"], {
        cwd: jobDir,
        timeout: timeoutMs,
        stdio: ["pipe", "pipe", "pipe"],
      })

      let stdout = ""
      let stderr = ""

      child.stdout.on("data", (data) => {
        stdout += data.toString()
      })

      child.stderr.on("data", (data) => {
        stderr += data.toString()
      })

      child.on("close", (code) => {
        const executionTimeMs = Date.now() - startTime

        if (executionTimeMs >= timeoutMs) {
          resolve({
            status: "TIME_LIMIT_EXCEEDED",
            passed: 0,
            total: testCases.length,
            results: [],
            executionTimeMs,
            error: "Time Limit Exceeded (5000ms)",
          })
          return
        }

        try {
          const parsed = JSON.parse(stdout.trim())
          resolve({
            status: parsed.status || (code === 0 ? "ACCEPTED" : "RUNTIME_ERROR"),
            passed: parsed.passed ?? 0,
            total: parsed.total ?? testCases.length,
            results: parsed.results || [],
            executionTimeMs: parsed.executionTimeMs || executionTimeMs,
            error: parsed.error,
          })
        } catch (jsonErr) {
          if (stderr || stdout) {
            resolve({
              status: "RUNTIME_ERROR",
              passed: 0,
              total: testCases.length,
              results: [],
              executionTimeMs,
              error: (stderr || stdout).trim(),
            })
          } else {
            resolve({
              status: "RUNTIME_ERROR",
              passed: 0,
              total: testCases.length,
              results: [],
              executionTimeMs,
              error: "Process exited unexpectedly without output.",
            })
          }
        }
      })

      child.on("error", (err) => {
        resolve({
          status: "RUNTIME_ERROR",
          passed: 0,
          total: testCases.length,
          results: [],
          executionTimeMs: Date.now() - startTime,
          error: err.message,
        })
      })
    })
  } finally {
    // Cleanup temporary job folder
    await rm(jobDir, { recursive: true, force: true }).catch(() => {})
  }
}

/**
 * Legacy STDIO Execution (Backward Compatibility)
 */
export async function executeJava(request: ExecutionRequest): Promise<ExecutionResult> {
  const {
    code,
    stdin = "",
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = request

  const jobId = randomUUID()
  const jobDir = join(SANDBOX_DIR, jobId)

  try {
    await mkdir(jobDir, { recursive: true })

    const className = extractClassName(code)
    const fileName = `${className}.java`
    const filePath = join(jobDir, fileName)

    await writeFile(filePath, code, "utf-8")
    const startTime = Date.now()

    // Compile
    try {
      execSync(`javac "${fileName}"`, {
        timeout: 10000,
        cwd: jobDir,
        stdio: "pipe",
      })
    } catch (err: any) {
      return {
        stdout: "",
        stderr: err.stderr?.toString() || "Compilation failed",
        exitCode: 1,
        executionTimeMs: Date.now() - startTime,
        memoryUsedMb: 0,
        status: "COMPILATION_ERROR",
      }
    }

    // Run
    return new Promise((resolve) => {
      const child = spawn("java", [className], {
        cwd: jobDir,
        timeout: timeoutMs,
        stdio: ["pipe", "pipe", "pipe"],
      })

      let stdout = ""
      let stderr = ""

      child.stdout.on("data", (data) => {
        stdout += data.toString()
      })

      child.stderr.on("data", (data) => {
        stderr += data.toString()
      })

      if (stdin) {
        child.stdin.write(stdin)
      }
      child.stdin.end()

      child.on("close", (code) => {
        const executionTimeMs = Date.now() - startTime

        if (executionTimeMs >= timeoutMs) {
          resolve({
            stdout,
            stderr,
            exitCode: code || 1,
            executionTimeMs,
            memoryUsedMb: 0,
            status: "TIME_LIMIT_EXCEEDED",
          })
          return
        }

        if (stderr.includes("Exception") || stderr.includes("Error")) {
          resolve({
            stdout,
            stderr,
            exitCode: code || 1,
            executionTimeMs,
            memoryUsedMb: 0,
            status: "RUNTIME_ERROR",
          })
          return
        }

        resolve({
          stdout: stdout.trim(),
          stderr: stderr.trim(),
          exitCode: code || 0,
          executionTimeMs,
          memoryUsedMb: 0,
          status: code === 0 ? "ACCEPTED" : "RUNTIME_ERROR",
        })
      })

      child.on("error", (err) => {
        resolve({
          stdout,
          stderr: err.message,
          exitCode: 1,
          executionTimeMs: Date.now() - startTime,
          memoryUsedMb: 0,
          status: "RUNTIME_ERROR",
        })
      })
    })
  } finally {
    await rm(jobDir, { recursive: true, force: true }).catch(() => {})
  }
}
