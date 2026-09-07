import { execFile, spawn } from "child_process"
import { writeFile, mkdir, rm, readdir, stat } from "fs/promises"
import { join } from "path"
import { randomUUID } from "crypto"
import { generateJavaDriverSource, RESULT_SENTINEL } from "@/lib/executor/java-driver"
import {
  FunctionExecutionRequest,
  JudgeExecutionResult,
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
  status: JudgeStatus
}

type JudgeStatus =
  | "ACCEPTED"
  | "WRONG_ANSWER"
  | "COMPILATION_ERROR"
  | "RUNTIME_ERROR"
  | "TIME_LIMIT_EXCEEDED"
  | "MEMORY_LIMIT_EXCEEDED"

const SANDBOX_DIR = join(process.cwd(), ".sandbox")
const DEFAULT_TIMEOUT_MS = 5000
const DEFAULT_MEMORY_MB = 256
const COMPILE_TIMEOUT_MS = 20000
const STALE_SANDBOX_MS = 60 * 60 * 1000

/** A legal Java identifier. Anything else is rejected before it reaches the filesystem. */
const SAFE_CLASS_NAME = /^[A-Za-z_][A-Za-z0-9_]{0,63}$/

let staleSweepDone = false

/**
 * Job directories used to leak: cleanup ran in a `finally` that fired the moment the
 * run promise was returned -- i.e. while the JVM was still starting. Sweep anything
 * older than an hour once per process, so previously orphaned runs get collected too.
 */
async function cleanupStaleSandboxes(): Promise<void> {
  if (staleSweepDone) return
  staleSweepDone = true
  try {
    const entries = await readdir(SANDBOX_DIR)
    const cutoff = Date.now() - STALE_SANDBOX_MS
    await Promise.all(
      entries.map(async (name) => {
        try {
          const dir = join(SANDBOX_DIR, name)
          const info = await stat(dir)
          if (info.mtimeMs < cutoff) await rm(dir, { recursive: true, force: true })
        } catch {
          /* another run may have removed it already */
        }
      })
    )
  } catch {
    /* .sandbox does not exist yet */
  }
}

function execFileAsync(
  file: string,
  args: string[],
  opts: { cwd: string; timeout: number }
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    execFile(file, args, { ...opts, windowsHide: true }, (err, stdout, stderr) => {
      if (err) reject(Object.assign(err, { stdout, stderr }))
      else resolve({ stdout, stderr })
    })
  })
}

/**
 * javac emits three lines per error (message, source line, caret). The old filter
 * dropped only lines containing "__Driver__.java", orphaning the other two.
 */
function cleanCompilerOutput(raw: string): string {
  const lines = raw.split(/\r?\n/)
  const kept: string[] = []
  let skipping = false

  for (const line of lines) {
    const startsBlock = /^\S.*\.java:\d+:/.test(line)
    if (startsBlock) skipping = line.includes("__Driver__.java")
    if (skipping) continue
    if (/^\d+ (error|warning)s?$/.test(line.trim())) continue
    kept.push(line)
  }
  return kept.join("\n").trim()
}

/**
 * Beginner-facing translation of the most common javac errors. The raw compiler
 * output is always kept below this, never replaced by it.
 */
function explainCompilerError(raw: string): string {
  const hints: string[] = []
  const add = (h: string) => {
    if (!hints.includes(h)) hints.push(h)
  }

  if (/cannot find symbol/.test(raw)) {
    add("cannot find symbol — a name is misspelt, declared in another scope, or needs an import (e.g. `import java.util.*;`).")
  }
  if (/incompatible types/.test(raw)) {
    add("incompatible types — the value's type does not match the variable or return type. Check for a missing cast, or int vs long.")
  }
  if (/missing return statement/.test(raw)) {
    add("missing return statement — at least one path through the method returns nothing. Every branch must return.")
  }
  if (/';' expected|reached end of file while parsing|illegal start of/.test(raw)) {
    add("syntax error — usually a missing semicolon or an unbalanced brace. Check the line above the one reported.")
  }
  if (/method .* cannot be applied|no suitable method/.test(raw)) {
    add("wrong arguments — the number or types of arguments do not match the method signature.")
  }
  if (/variable .* might not have been initialized/.test(raw)) {
    add("uninitialised variable — Java requires a value before first use; give it one at declaration.")
  }
  if (/unreachable statement/.test(raw)) {
    add("unreachable code — statements after a return or break can never run.")
  }
  if (/is public, should be declared in a file named/.test(raw)) {
    add("class name mismatch — the class must be named exactly as the problem specifies, or not be `public`.")
  }

  return hints.length ? hints.map((h) => `• ${h}`).join("\n") : ""
}

/** Split the child's stdout into the user's own prints and the driver's verdict JSON. */
function splitDriverOutput(raw: string): { userOut: string; verdict: string | null } {
  const at = raw.lastIndexOf(RESULT_SENTINEL)
  if (at === -1) return { userOut: raw, verdict: null }
  return {
    userOut: raw.slice(0, at),
    verdict: raw.slice(at + RESULT_SENTINEL.length).trim(),
  }
}

function formatInputDisplay(
  inputs: Record<string, unknown> | unknown[],
  parameters: ParameterDefinition[]
): string {
  if (Array.isArray(inputs)) {
    return inputs
      .map((val, i) => `${parameters[i]?.name || `arg${i}`} = ${JSON.stringify(val)}`)
      .join(", ")
  }
  if (typeof inputs === "object" && inputs !== null) {
    return Object.entries(inputs)
      .map(([key, val]) => `${key} = ${JSON.stringify(val)}`)
      .join(", ")
  }
  return String(inputs)
}

function extractClassName(code: string): string {
  const pub = code.match(/public\s+(?:final\s+|abstract\s+)?class\s+(\w+)/)
  if (pub) return pub[1]
  const any = code.match(/class\s+(\w+)/)
  return any ? any[1] : "Solution"
}

/**
 * LeetCode-style typed function execution.
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
    memoryLimitMb = DEFAULT_MEMORY_MB,
    mutatedArgIndex = 0,
    stopOnFirstFailure = false,
  } = request

  const total = testCases.length
  const fail = (status: JudgeStatus, error: string, ms = 0): JudgeExecutionResult => ({
    status,
    passed: 0,
    total,
    results: [],
    executionTimeMs: ms,
    error,
  })

  if (!SAFE_CLASS_NAME.test(className)) {
    return fail("COMPILATION_ERROR", `Invalid class name '${className}'.`)
  }

  await cleanupStaleSandboxes()

  const jobDir = join(SANDBOX_DIR, randomUUID())
  // Cleanup is deliberately NOT in a `finally`: in an async function `finally` runs
  // the instant `return` is evaluated, which previously deleted the .class files
  // while the JVM was still loading them.
  const cleanup = () => {
    void rm(jobDir, { recursive: true, force: true }).catch(() => {})
  }

  try {
    await mkdir(jobDir, { recursive: true })

    const normalizedTestCases = testCases.map((tc, idx) => {
      let inputsArray: unknown[]
      if (Array.isArray(tc.inputs)) {
        inputsArray = tc.inputs
      } else if (typeof tc.inputs === "object" && tc.inputs !== null) {
        const obj = tc.inputs as Record<string, unknown>
        inputsArray = parameters.map((p) => obj[p.name])
      } else {
        inputsArray = [tc.inputs]
      }
      return {
        id: tc.id ?? idx + 1,
        inputs: inputsArray,
        expected: tc.expectedOutput,
        hidden: tc.isHidden === true,
        inputDisplay: formatInputDisplay(tc.inputs, parameters),
      }
    })

    const payload = {
      className,
      methodName,
      parameterTypes: parameters.map((p) => p.type),
      returnType,
      orderMatters: comparison?.orderMatters ?? true,
      mutatedArgIndex,
      stopOnFirstFailure,
      testCases: normalizedTestCases,
    }

    const solutionFile = `${className}.java`
    await Promise.all([
      writeFile(join(jobDir, solutionFile), code, "utf-8"),
      writeFile(join(jobDir, "__Driver__.java"), generateJavaDriverSource(), "utf-8"),
      writeFile(join(jobDir, "__testcases__.json"), JSON.stringify(payload), "utf-8"),
    ])

    // --- compile (async: execSync used to block the whole Node event loop) ---
    try {
      await execFileAsync("javac", ["-encoding", "UTF-8", solutionFile, "__Driver__.java"], {
        cwd: jobDir,
        timeout: COMPILE_TIMEOUT_MS,
      })
    } catch (err) {
      const e = err as NodeJS.ErrnoException & { stdout?: string; stderr?: string }
      if (e.code === "ENOENT") {
        cleanup()
        return fail(
          "COMPILATION_ERROR",
          "Could not run `javac`. Install a JDK (17 or newer) and make sure it is on your PATH."
        )
      }
      const raw = (e.stderr || e.stdout || "Compilation failed").toString()
      const cleaned = cleanCompilerOutput(raw) || raw.trim()
      const hint = explainCompilerError(raw)
      cleanup()
      return fail("COMPILATION_ERROR", hint ? `${hint}\n\n${cleaned}` : cleaned)
    }

    // --- run: the clock starts AFTER compilation, so javac's 1-2s is not
    //     charged against the time limit (which used to cause false TLEs) ---
    const runStart = Date.now()

    return await new Promise<JudgeExecutionResult>((resolve) => {
      const child = spawn(
        "java",
        [`-Xmx${memoryLimitMb}m`, "-Xss64m", "-XX:+UseSerialGC", "-cp", ".", "__Driver__"],
        { cwd: jobDir, stdio: ["pipe", "pipe", "pipe"], windowsHide: true }
      )

      let stdout = ""
      let stderr = ""
      let settled = false
      let timedOut = false

      const finish = (result: JudgeExecutionResult) => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        cleanup()
        resolve(result)
      }

      const timer = setTimeout(() => {
        timedOut = true
        child.kill("SIGKILL")
      }, timeoutMs)

      child.stdout.on("data", (d) => {
        stdout += d.toString()
      })
      child.stderr.on("data", (d) => {
        stderr += d.toString()
      })

      // Nothing is piped in; leaving stdin open makes code that reads System.in
      // hang until the timeout instead of failing fast.
      child.stdin.end()

      child.on("error", (err) => {
        finish(
          fail(
            "RUNTIME_ERROR",
            err.message.includes("ENOENT")
              ? "Could not run `java`. Install a JDK (17 or newer) and make sure it is on your PATH."
              : err.message,
            Date.now() - runStart
          )
        )
      })

      child.on("close", () => {
        const elapsed = Date.now() - runStart

        if (timedOut) {
          return finish({
            ...fail("TIME_LIMIT_EXCEEDED", "", elapsed),
            error: `Time Limit Exceeded (${timeoutMs}ms). Look for a loop that never ends or an approach that is too slow.`,
          })
        }

        const { userOut, verdict } = splitDriverOutput(stdout)

        if (verdict) {
          try {
            const parsed = JSON.parse(verdict)
            return finish({
              status: parsed.status ?? "RUNTIME_ERROR",
              passed: parsed.passed ?? 0,
              total: parsed.total ?? total,
              results: parsed.results ?? [],
              executionTimeMs: parsed.executionTimeMs ?? elapsed,
              error: parsed.error,
              stdout: parsed.stdout || userOut,
            })
          } catch {
            /* fall through to the diagnostics below */
          }
        }

        // No verdict: the JVM died before the driver could report.
        const combined = `${stderr}\n${stdout}`
        if (/OutOfMemoryError|GC overhead limit/.test(combined)) {
          return finish({
            ...fail("MEMORY_LIMIT_EXCEEDED", "", elapsed),
            error: `Memory Limit Exceeded (${memoryLimitMb}MB). Check for an array sized far larger than needed, or unbounded growth.`,
            stdout: userOut,
          })
        }
        if (/StackOverflowError/.test(combined)) {
          return finish({
            ...fail("RUNTIME_ERROR", "", elapsed),
            error: "Stack overflow — your recursion never reached its base case.",
            stdout: userOut,
          })
        }

        finish({
          ...fail("RUNTIME_ERROR", "", elapsed),
          error:
            (stderr || stdout).trim() ||
            "The program exited without producing a result.",
          stdout: userOut,
        })
      })
    })
  } catch (err) {
    cleanup()
    return fail("RUNTIME_ERROR", (err as Error).message)
  }
}

/**
 * Plain stdin/stdout execution, used by the Java syntax track's runnable snippets.
 */
export async function executeJava(request: ExecutionRequest): Promise<ExecutionResult> {
  const {
    code,
    stdin = "",
    timeoutMs = DEFAULT_TIMEOUT_MS,
    memoryLimitMb = DEFAULT_MEMORY_MB,
  } = request

  const className = extractClassName(code)
  const base: ExecutionResult = {
    stdout: "",
    stderr: "",
    exitCode: 1,
    executionTimeMs: 0,
    memoryUsedMb: 0,
    status: "RUNTIME_ERROR",
  }

  if (!SAFE_CLASS_NAME.test(className)) {
    return { ...base, status: "COMPILATION_ERROR", stderr: `Invalid class name '${className}'.` }
  }

  await cleanupStaleSandboxes()

  const jobDir = join(SANDBOX_DIR, randomUUID())
  const cleanup = () => {
    void rm(jobDir, { recursive: true, force: true }).catch(() => {})
  }

  try {
    await mkdir(jobDir, { recursive: true })
    const fileName = `${className}.java`
    await writeFile(join(jobDir, fileName), code, "utf-8")

    try {
      await execFileAsync("javac", ["-encoding", "UTF-8", fileName], {
        cwd: jobDir,
        timeout: COMPILE_TIMEOUT_MS,
      })
    } catch (err) {
      const e = err as NodeJS.ErrnoException & { stdout?: string; stderr?: string }
      const raw = (e.stderr || e.stdout || "Compilation failed").toString()
      const hint = explainCompilerError(raw)
      cleanup()
      return {
        ...base,
        status: "COMPILATION_ERROR",
        stderr: hint ? `${hint}\n\n${raw.trim()}` : raw.trim(),
      }
    }

    const runStart = Date.now()

    return await new Promise<ExecutionResult>((resolve) => {
      const child = spawn(
        "java",
        [`-Xmx${memoryLimitMb}m`, "-Xss64m", "-cp", ".", className],
        { cwd: jobDir, stdio: ["pipe", "pipe", "pipe"], windowsHide: true }
      )

      let stdout = ""
      let stderr = ""
      let settled = false
      let timedOut = false

      const finish = (result: ExecutionResult) => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        cleanup()
        resolve(result)
      }

      const timer = setTimeout(() => {
        timedOut = true
        child.kill("SIGKILL")
      }, timeoutMs)

      child.stdout.on("data", (d) => {
        stdout += d.toString()
      })
      child.stderr.on("data", (d) => {
        stderr += d.toString()
      })

      if (stdin) child.stdin.write(stdin)
      child.stdin.end()

      child.on("error", (err) => {
        finish({ ...base, stderr: err.message, executionTimeMs: Date.now() - runStart })
      })

      child.on("close", (code) => {
        const executionTimeMs = Date.now() - runStart
        const out = { stdout: stdout.trim(), stderr: stderr.trim(), executionTimeMs, memoryUsedMb: 0 }

        if (timedOut) {
          return finish({ ...out, exitCode: 124, status: "TIME_LIMIT_EXCEEDED" })
        }
        if (/OutOfMemoryError/.test(stderr)) {
          return finish({ ...out, exitCode: code ?? 1, status: "MEMORY_LIMIT_EXCEEDED" })
        }
        finish({
          ...out,
          exitCode: code ?? 0,
          status: code === 0 ? "ACCEPTED" : "RUNTIME_ERROR",
        })
      })
    })
  } catch (err) {
    cleanup()
    return { ...base, stderr: (err as Error).message }
  }
}
