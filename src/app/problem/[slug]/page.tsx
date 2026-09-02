"use client"

import { useState, useCallback, use } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  BookOpen,
  Code2,
  Play,
  Send,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
  XCircle,
  Clock,
  Cpu,
  Lightbulb,
  AlertTriangle,
  Target,
  Zap,
  GraduationCap,
  Loader2,
  ListFilter,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { curriculum } from "@/lib/data/curriculum"
import { getDifficultyBg, formatProblemNumber } from "@/lib/utils"
import { useProgressStore } from "@/lib/progress/store"
import { ResizablePanel } from "@/components/ui/resizable-panel"
import { getProblemMetadata } from "@/lib/data/problem-metadata"
import { TestResultItem } from "@/lib/types/judge"
import { useHydrated } from "@/lib/hooks/use-hydrated"

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-[#1e1e1e]">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  ),
})

type Mode = "learn" | "test"

interface ExecutionResult {
  status: string
  output?: string
  executionTime?: number
  memoryUsed?: number
  error?: string
  passed?: number
  total?: number
  results?: TestResultItem[]
}

function formatStatus(status: string): string {
  switch (status?.toUpperCase()) {
    case "ACCEPTED":
      return "Accepted"
    case "WRONG_ANSWER":
      return "Wrong Answer"
    case "COMPILATION_ERROR":
      return "Compilation Error"
    case "RUNTIME_ERROR":
      return "Runtime Error"
    case "TIME_LIMIT_EXCEEDED":
      return "Time Limit Exceeded"
    default:
      return status || "Unknown"
  }
}

export default function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const [mode, setMode] = useState<Mode>("test")
  const metadata = getProblemMetadata(slug)
  const hydrated = useHydrated()

  const [code, setCode] = useState<string>(metadata.starterCode)
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<ExecutionResult | null>(null)
  const [expandedExample, setExpandedExample] = useState<number | null>(1)
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const { markAttempted, markSolved, toggleSolved, getProblemStatus } = useProgressStore()

  // Find the problem in curriculum for breadcrumbs
  let problem = null
  let step = null
  for (const s of curriculum) {
    for (const t of s.topics) {
      const p = t.problems.find((pr) => pr.slug === slug)
      if (p) {
        problem = p
        step = s
        break
      }
    }
  }

  const problemData = problem || {
    number: 1,
    title: metadata.title,
    slug: metadata.slug,
    difficulty: "EASY" as const,
  }

  const sampleConstraints = [
    "Time Limit: 5.0 seconds",
    "Memory Limit: 256 MB",
    "Method must be public and match signature",
  ]

  const handleRun = useCallback(async () => {
    setIsRunning(true)
    setResult(null)
    setSelectedTab(0)
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          executionMode: "FUNCTION",
          className: metadata.className,
          methodName: metadata.methodName,
          parameters: metadata.parameters,
          returnType: metadata.returnType,
          comparison: metadata.comparison,
          testCases: metadata.sampleTestCases,
          mode: "run",
        }),
      })
      const data = await res.json()
      markAttempted(slug)
      setResult({
        status: formatStatus(data.status),
        executionTime: data.executionTimeMs || 0,
        error: data.error || "",
        passed: data.passed,
        total: data.total,
        results: data.results,
      })
    } catch (err: any) {
      setResult({ status: "Runtime Error", error: err.message || "Failed to execute" })
    }
    setIsRunning(false)
  }, [code, slug, metadata, markAttempted])

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    setResult(null)
    setSelectedTab(0)
    try {
      const allTestCases = [
        ...metadata.sampleTestCases,
        ...(metadata.hiddenTestCases || []),
      ]

      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          executionMode: "FUNCTION",
          className: metadata.className,
          methodName: metadata.methodName,
          parameters: metadata.parameters,
          returnType: metadata.returnType,
          comparison: metadata.comparison,
          testCases: allTestCases,
          mode: "submit",
        }),
      })
      const data = await res.json()
      markAttempted(slug)
      if (data.status === "ACCEPTED") {
        markSolved(slug)
      }
      setResult({
        status: formatStatus(data.status),
        executionTime: data.executionTimeMs || 0,
        error: data.error || "",
        passed: data.passed,
        total: data.total,
        results: data.results,
      })
    } catch (err: any) {
      setResult({ status: "Runtime Error", error: err.message || "Failed to submit" })
    }
    setIsSubmitting(false)
  }, [code, slug, metadata, markAttempted, markSolved])

  // Left panel content
  const leftPanel = (
    <div className="h-full overflow-y-auto">
      <AnimatePresence mode="wait">
        {mode === "learn" ? (
          <motion.div key="learn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
            <div className="mb-8">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <Lightbulb className="h-5 w-5 text-medium" /> Concept
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Understanding algorithmic approaches, time/space complexity trade-offs, and edge case handling for <strong>{problemData.title}</strong>.
              </p>
            </div>
            <div className="mb-8">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Target className="h-5 w-5 text-primary" /> Target Method Signature
              </h3>
              <div className="rounded-xl border border-border bg-secondary/30 p-4 font-mono text-sm text-primary">
                public {metadata.returnType} {metadata.methodName}(
                {metadata.parameters.map((p, i) => (
                  <span key={p.name} className="text-foreground">
                    {i > 0 && ", "}
                    <span className="text-blue-400">{p.type}</span> {p.name}
                  </span>
                ))}
                )
              </div>
            </div>
            <div className="mb-8">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Zap className="h-5 w-5 text-easy" /> Key Principles
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-easy" /> Function-based execution: Arguments are parsed and passed directly to your method</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-easy" /> Return values are evaluated as the final answer</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-easy" /> Fresh instance allocated per test case to avoid state leakage</li>
              </ul>
            </div>
            <div className="mb-8">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <AlertTriangle className="h-5 w-5 text-hard" /> Common Mistakes
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2"><XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-hard" /> Using Scanner or System.in (not required for LeetCode-style judges)</li>
                <li className="flex items-start gap-2"><XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-hard" /> Printing instead of returning the result object</li>
                <li className="flex items-start gap-2"><XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-hard" /> Off-by-one errors and array bounds violations</li>
              </ul>
            </div>
          </motion.div>
        ) : (
          <motion.div key="test" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
            <h2 className="mb-4 text-xl font-bold">{problemData.title}</h2>
            <div className="mb-6 text-muted-foreground leading-relaxed">
              Given the method signature below, implement the required algorithm and return the computed answer.
            </div>

            <div className="mb-6 rounded-xl border border-border bg-secondary/30 p-3.5 font-mono text-xs text-foreground">
              <span className="text-muted-foreground">// Method signature:</span>
              <div className="mt-1 text-primary">
                public {metadata.returnType} {metadata.methodName}(
                {metadata.parameters.map((p, i) => (
                  <span key={p.name} className="text-foreground">
                    {i > 0 && ", "}
                    <span className="text-blue-400">{p.type}</span> {p.name}
                  </span>
                ))}
                )
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ListFilter className="h-4 w-4 text-primary" /> Examples
              </h3>
              {metadata.sampleTestCases.map((tc, idx) => {
                const id = tc.id || idx + 1
                const inputStr = Object.entries(tc.inputs)
                  .map(([k, v]) => `${k} = ${JSON.stringify(v)}`)
                  .join(", ")

                return (
                  <div key={id} className="rounded-xl border border-border bg-secondary/30 overflow-hidden">
                    <button
                      onClick={() => setExpandedExample(expandedExample === id ? null : id)}
                      className="flex w-full items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
                    >
                      <span className="text-sm font-medium">Example {id}</span>
                      {expandedExample === id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </button>
                    <AnimatePresence>
                      {expandedExample === id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="border-t border-border p-4 space-y-3 bg-card/50">
                            <div>
                              <span className="text-xs font-semibold text-muted-foreground">Input:</span>
                              <pre className="mt-1 rounded-lg bg-background p-2.5 font-mono text-xs text-foreground whitespace-pre-wrap">{inputStr}</pre>
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-muted-foreground">Expected Return:</span>
                              <pre className="mt-1 rounded-lg bg-background p-2.5 font-mono text-xs text-easy whitespace-pre-wrap">{JSON.stringify(tc.expectedOutput)}</pre>
                            </div>
                            {tc.explanation && (
                              <div>
                                <span className="text-xs font-semibold text-muted-foreground">Explanation:</span>
                                <p className="mt-1 text-xs text-muted-foreground">{tc.explanation}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            <div className="mt-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Constraints</h3>
              <ul className="space-y-1.5">
                {sampleConstraints.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />{c}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  // Right panel content
  const rightPanel = (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-hidden">
        <MonacoEditor
          height="100%"
          language="java"
          theme="vs-dark"
          value={code}
          onChange={(v) => v !== undefined && setCode(v)}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "var(--font-geist-mono)",
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            padding: { top: 16, bottom: 16 },
            renderLineHighlight: "line",
            bracketPairColorization: { enabled: true },
            cursorBlinking: "smooth",
            smoothScrolling: true,
          }}
        />
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between border-t border-border bg-background px-4 py-3">
        <div className="text-xs text-muted-foreground font-mono">
          Java 17+ • LeetCode Method Invocation
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2 text-xs font-semibold transition-all hover:bg-secondary/80 disabled:opacity-50"
          >
            {isRunning ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <Play className="h-4 w-4 text-primary" />}
            Run
          </button>
          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-2 rounded-xl bg-easy px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-easy/90 disabled:opacity-50 shadow-sm shadow-easy/20"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Submit
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="border-t border-border bg-background max-h-[300px] overflow-y-auto">
        <div className="px-4 py-2.5 border-b border-border flex items-center justify-between bg-secondary/20">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Testcase Results</h3>
          {result && result.passed !== undefined && result.total !== undefined && (
            <span className="text-xs font-medium text-foreground">
              {result.passed} / {result.total} Passed
            </span>
          )}
        </div>

        {result ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Status Header */}
            <div
              className={`flex items-center justify-between px-4 py-3 border-b border-border ${
                result.status === "Accepted"
                  ? "bg-easy/10 text-easy"
                  : result.status === "Wrong Answer"
                  ? "bg-hard/10 text-hard"
                  : "bg-amber-400/10 text-amber-400"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {result.status === "Accepted" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
                <span className="font-bold text-sm">{result.status}</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{result.executionTime} ms</span>
                </div>
              </div>
            </div>

            {/* Error Message if any */}
            {result.error && (
              <div className="p-4 border-b border-border bg-hard/5">
                <div className="mb-1.5 text-xs font-semibold text-hard flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" /> Error Details:
                </div>
                <pre className="rounded-lg bg-background p-3 font-mono text-xs text-hard whitespace-pre-wrap border border-hard/20 leading-relaxed">
                  {result.error}
                </pre>
              </div>
            )}

            {/* Individual Test Cases Tabs */}
            {result.results && result.results.length > 0 && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1">
                  {result.results.map((tr, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTab(idx)}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${
                        selectedTab === idx
                          ? "border-primary bg-primary/10 text-primary font-semibold"
                          : "border-border bg-secondary/50 text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          tr.passed ? "bg-easy" : "bg-hard"
                        }`}
                      />
                      Case {idx + 1}
                    </button>
                  ))}
                </div>

                {/* Selected Test Case Content */}
                {result.results[selectedTab] && (
                  <div className="rounded-xl border border-border bg-secondary/20 p-3.5 space-y-2.5 text-xs">
                    <div>
                      <div className="font-semibold text-muted-foreground mb-1">Input:</div>
                      <pre className="rounded-lg bg-background p-2.5 font-mono text-foreground whitespace-pre-wrap border border-border/50">
                        {result.results[selectedTab].input}
                      </pre>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="font-semibold text-muted-foreground mb-1">Expected:</div>
                        <pre className="rounded-lg bg-background p-2.5 font-mono text-easy whitespace-pre-wrap border border-border/50">
                          {result.results[selectedTab].expected}
                        </pre>
                      </div>
                      <div>
                        <div className="font-semibold text-muted-foreground mb-1">Output:</div>
                        <pre
                          className={`rounded-lg bg-background p-2.5 font-mono whitespace-pre-wrap border border-border/50 ${
                            result.results[selectedTab].passed ? "text-easy" : "text-hard"
                          }`}
                        >
                          {result.results[selectedTab].actual}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ) : (
          <div className="px-4 py-8 text-center text-xs text-muted-foreground">
            Run or submit your solution to view test case results.
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex h-screen flex-col">
      {/* Navigation */}
      <nav className="flex h-12 flex-shrink-0 items-center justify-between border-b border-border bg-background px-4">
        <div className="flex items-center gap-4">
          <Link href={step ? `/roadmap/${step.slug}` : "/roadmap"} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm hidden sm:inline">{step ? step.title : "Roadmap"}</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-muted-foreground">{formatProblemNumber(problemData.number)}</span>
            <span className="text-sm font-medium">{problemData.title}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium border ${getDifficultyBg(problemData.difficulty)}`}>{problemData.difficulty}</span>
            <button
              type="button"
              onClick={() => toggleSolved(slug)}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border border-border bg-secondary/50 hover:bg-secondary transition-all"
              title={
                (hydrated ? getProblemStatus(slug).status : "NOT_STARTED") === "SOLVED"
                  ? "Click to mark as not completed"
                  : "Click to mark as completed"
              }
            >
              {(hydrated ? getProblemStatus(slug).status : "NOT_STARTED") === "SOLVED" ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-easy" />
                  <span className="text-easy font-semibold">Solved</span>
                </>
              ) : (
                <>
                  <Circle className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Mark Solved</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setMode("learn")} className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${mode === "learn" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
            <GraduationCap className="h-4 w-4" /> Learn
          </button>
          <button onClick={() => setMode("test")} className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${mode === "test" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
            <Code2 className="h-4 w-4" /> Test
          </button>
        </div>
      </nav>

      {/* Resizable IDE layout */}
      <ResizablePanel left={leftPanel} right={rightPanel} defaultLeftWidth={40} minLeftWidth={25} maxLeftWidth={70} />
    </div>
  )
}
