"use client"

import { useState, useCallback, useEffect, use } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  BookOpen,
  Code2,
  Play,
  Send,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  XCircle,
  Clock,

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
import { ResizablePanel, VerticalResizablePanel } from "@/components/ui/resizable-panel"
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

  // Reset editor code and results when navigating between problems
  useEffect(() => {
    setCode(metadata.starterCode)
    setResult(null)
    setSelectedTab(0)
  }, [slug, metadata.starterCode])

  // Dynamic hierarchy lookup: Find current step, subtopic, and ordered step problems
  let currentStep: (typeof curriculum)[0] | null = null
  let currentTopic: (typeof curriculum)[0]["topics"][0] | null = null
  let problem = null

  for (const s of curriculum) {
    for (const t of s.topics) {
      const p = t.problems.find((pr) => pr.slug === slug)
      if (p) {
        problem = p
        currentTopic = t
        currentStep = s
        break
      }
    }
    if (problem) break
  }

  const problemData = problem || {
    number: 1,
    title: metadata.title,
    slug: metadata.slug,
    difficulty: "EASY" as const,
  }

  // Flatten all problems of the current step to build the ordered sequence
  const stepProblems = currentStep
    ? currentStep.topics.flatMap((t) => t.problems)
    : []

  const currentIndex = stepProblems.findIndex((p) => p.slug === slug)

  // Compute Previous problem / step boundary
  const hasPrevProblem = currentIndex > 0
  const prevProblem = hasPrevProblem ? stepProblems[currentIndex - 1] : null
  const prevHref = hasPrevProblem && prevProblem
    ? `/problem/${prevProblem.slug}`
    : currentStep
    ? `/roadmap/${currentStep.slug}`
    : "/roadmap"
  const prevTitle = hasPrevProblem && prevProblem
    ? `Previous: ${prevProblem.title}`
    : `Back to Step: ${currentStep?.title || "Roadmap"}`

  // Compute Next problem / step boundary
  const hasNextProblem = currentIndex >= 0 && currentIndex < stepProblems.length - 1
  const nextProblem = hasNextProblem ? stepProblems[currentIndex + 1] : null
  const nextHref = hasNextProblem && nextProblem
    ? `/problem/${nextProblem.slug}`
    : currentStep
    ? `/roadmap/${currentStep.slug}`
    : "/roadmap"
  const nextTitle = hasNextProblem && nextProblem
    ? `Next: ${nextProblem.title}`
    : `Finish Step: ${currentStep?.title || "Roadmap"}`

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
    } catch {
      setResult({
        status: "Runtime Error",
        error: "Failed to connect to execution server.",
      })
    } finally {
      setIsRunning(false)
    }
  }, [code, metadata, markAttempted, slug])

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
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
          mode: "submit",
        }),
      })
      const data = await res.json()
      markAttempted(slug)
      const passed = data.status === "ACCEPTED" || data.status === "Accepted"
      if (passed) {
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
    } catch {
      setResult({
        status: "Runtime Error",
        error: "Failed to connect to execution server.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [code, metadata, markAttempted, markSolved, slug])

  // Left panel content: Problem Description / Learn Mode
  const leftPanel = (
    <div className="flex h-full flex-col overflow-y-auto bg-card p-6">
      {mode === "learn" ? (
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <BookOpen className="h-4 w-4" /> Comprehensive Learning Guide
            </div>
            <h1 className="text-2xl font-bold">{metadata.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {metadata.description}
            </p>
          </div>

          {/* Deep Concept Breakdown */}
          <div className="rounded-2xl border border-border bg-secondary/20 p-5 space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
              <Lightbulb className="h-4 w-4 text-amber-400" /> Core Concepts & Intuition
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Mastering this problem requires understanding key algorithmic patterns. Focus on the constraints and think about optimal space vs. time trade-offs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="rounded-xl border border-border bg-background/60 p-3">
                <div className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1">
                  <Target className="h-3.5 w-3.5 text-easy" /> Optimal Approach
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  Time: O(N) • Space: O(1)
                </div>
              </div>
              <div className="rounded-xl border border-border bg-background/60 p-3">
                <div className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1">
                  <Zap className="h-3.5 w-3.5 text-medium" /> Method Invocation
                </div>
                <div className="text-xs text-muted-foreground font-mono truncate">
                  {metadata.className}.{metadata.methodName}()
                </div>
              </div>
            </div>
          </div>

          {/* Method Signature Box */}
          <div className="rounded-2xl border border-border bg-background p-4 space-y-2">
            <div className="text-xs font-semibold text-muted-foreground">Java Method Signature:</div>
            <pre className="text-xs font-mono text-primary overflow-x-auto p-3 rounded-lg bg-secondary/40 border border-border">
              public {metadata.returnType} {metadata.methodName}({metadata.parameters.map(p => `${p.type} ${p.name}`).join(", ")})
            </pre>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header info */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">
                {formatProblemNumber(problemData.number)}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium border ${getDifficultyBg(problemData.difficulty)}`}>
                {problemData.difficulty}
              </span>
              {currentTopic && (
                <span className="text-xs text-muted-foreground">• {currentTopic.title}</span>
              )}
            </div>
            <h1 className="text-2xl font-bold">{metadata.title}</h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {metadata.description}
            </p>
          </div>

          {/* Signature info */}
          <div className="rounded-xl border border-border bg-secondary/30 p-4">
            <div className="text-xs font-mono text-primary">
              {"// Method signature:"}<br />
              public {metadata.returnType} {metadata.methodName}({metadata.parameters.map(p => `${p.type} ${p.name}`).join(", ")})
            </div>
          </div>

          {/* Examples */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
              <ListFilter className="h-4 w-4 text-primary" /> Examples
            </h3>
            {metadata.sampleTestCases.map((example, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-background overflow-hidden">
                <button
                  onClick={() => setExpandedExample(expandedExample === idx + 1 ? null : idx + 1)}
                  className="w-full flex items-center justify-between p-3 text-xs font-medium hover:bg-secondary/30 transition-colors"
                >
                  <span>Example {idx + 1}</span>
                  {expandedExample === idx + 1 ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>
                <AnimatePresence>
                  {expandedExample === idx + 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border p-3.5 space-y-2.5 text-xs bg-secondary/10"
                    >
                      <div>
                        <div className="text-muted-foreground mb-1 font-medium">Input:</div>
                        <pre className="p-2.5 rounded-lg bg-background font-mono text-foreground border border-border/50 overflow-x-auto">
                          {typeof example.inputs === "object"
                            ? Object.entries(example.inputs)
                                .map(([k, v]) => `${k} = ${JSON.stringify(v)}`)
                                .join(", ")
                            : JSON.stringify(example.inputs)}
                        </pre>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1 font-medium">Expected Return:</div>
                        <pre className="p-2.5 rounded-lg bg-background font-mono text-easy border border-border/50 overflow-x-auto">
                          {JSON.stringify(example.expectedOutput)}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Constraints */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Constraints</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {sampleConstraints.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )

  // Right Panel: Editor (Top) + Action Bar & Testcase Results (Bottom) via VerticalResizablePanel
  const editorTop = (
    <div className="flex h-full w-full flex-col overflow-hidden bg-card">
      <div className="flex-1 min-h-0 w-full overflow-hidden">
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
            automaticLayout: true,
            wordWrap: "on",
            padding: { top: 16, bottom: 16 },
            renderLineHighlight: "line",
            bracketPairColorization: { enabled: true },
            cursorBlinking: "smooth",
            smoothScrolling: true,
          }}
        />
      </div>
    </div>
  )

  const resultsBottom = (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background">
      {/* Action Bar */}
      <div className="flex items-center justify-between border-b border-border bg-background px-4 py-2.5 flex-shrink-0">
        <div className="text-xs text-muted-foreground font-mono truncate">
          Java 17+ • LeetCode Method Invocation
        </div>
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-3.5 py-1.5 text-xs font-semibold transition-all hover:bg-secondary/80 active:scale-95 disabled:opacity-50"
          >
            {isRunning ? <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" /> : <Play className="h-3.5 w-3.5 text-primary" />}
            Run
          </button>
          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-2 rounded-xl bg-easy px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-easy/90 active:scale-95 disabled:opacity-50 shadow-sm shadow-easy/20"
          >
            {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            Submit
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="px-4 py-2 border-b border-border flex items-center justify-between bg-secondary/20 sticky top-0 z-10 backdrop-blur-md">
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
              className={`flex items-center justify-between px-4 py-2.5 border-b border-border ${
                result.status === "Accepted"
                  ? "bg-easy/10 text-easy"
                  : result.status === "Wrong Answer"
                  ? "bg-hard/10 text-hard"
                  : "bg-amber-400/10 text-amber-400"
              }`}
            >
              <div className="flex items-center gap-2">
                {result.status === "Accepted" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <span className="font-bold text-xs sm:text-sm">{result.status}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
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
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {result.results.map((tr, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTab(idx)}
                      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium border transition-all ${
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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

  const rightPanel = (
    <VerticalResizablePanel
      top={editorTop}
      bottom={resultsBottom}
      defaultTopHeight={55}
      minTopHeight={20}
      maxTopHeight={80}
    />
  )

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Navigation Header */}
      <nav className="relative flex h-12 w-full flex-shrink-0 items-center justify-between border-b border-border bg-background px-3 sm:px-4">
        {/* LEFT: Previous Button + Breadcrumbs + Problem Details */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-4 z-10">
          {/* Previous Button */}
          <Link
            href={prevHref}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-2.5 py-1 text-xs font-semibold text-foreground transition-all hover:bg-secondary hover:border-primary/40 active:scale-95 flex-shrink-0"
            title={prevTitle}
          >
            <ChevronLeft className="h-3.5 w-3.5 text-primary" />
            <span className="hidden md:inline">Prev</span>
          </Link>

          {/* Breadcrumb to step */}
          <Link
            href={currentStep ? `/roadmap/${currentStep.slug}` : "/roadmap"}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            title={currentStep ? `Step ${currentStep.stepNumber}: ${currentStep.title}` : "Roadmap"}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden lg:inline font-medium truncate max-w-[120px]">
              {currentStep ? currentStep.title : "Roadmap"}
            </span>
          </Link>

          <div className="h-4 w-px bg-border flex-shrink-0" />

          {/* Problem Details */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-xs text-muted-foreground flex-shrink-0">
              {formatProblemNumber(problemData.number)}
            </span>
            <span className="text-xs sm:text-sm font-semibold truncate max-w-[110px] sm:max-w-[160px] md:max-w-[220px]">
              {problemData.title}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium border flex-shrink-0 ${getDifficultyBg(
                problemData.difficulty
              )}`}
            >
              {problemData.difficulty}
            </span>

            {/* Solved Status Toggle */}
            <button
              type="button"
              onClick={() => toggleSolved(slug)}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border border-border bg-secondary/50 hover:bg-secondary transition-all flex-shrink-0"
              title={
                (hydrated ? getProblemStatus(slug).status : "NOT_STARTED") === "SOLVED"
                  ? "Click to mark as not completed"
                  : "Click to mark as completed"
              }
            >
              {(hydrated ? getProblemStatus(slug).status : "NOT_STARTED") === "SOLVED" ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-easy" />
                  <span className="text-easy font-semibold hidden sm:inline text-xs">Solved</span>
                </>
              ) : (
                <>
                  <Circle className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground hidden sm:inline text-xs">Mark Solved</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* CENTER: Learn / Test Mode Toggle — Perfectly Centered Relative to Full Viewport/Header Width */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <div className="flex items-center gap-1 rounded-xl bg-secondary/80 p-1 border border-border shadow-sm">
            <button
              onClick={() => setMode("learn")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                mode === "learn"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Learn</span>
            </button>
            <button
              onClick={() => setMode("test")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                mode === "test"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Test</span>
            </button>
          </div>
        </div>

        {/* RIGHT: Next Button */}
        <div className="flex items-center gap-2 flex-shrink-0 z-10 ml-auto pl-4">
          <Link
            href={nextHref}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-2.5 py-1 text-xs font-semibold text-foreground transition-all hover:bg-secondary hover:border-primary/40 active:scale-95"
            title={nextTitle}
          >
            <span className="hidden md:inline">Next</span>
            <ChevronRight className="h-3.5 w-3.5 text-primary" />
          </Link>
        </div>
      </nav>

      {/* Resizable Split Workspace (Left: Description, Right: Editor + Results) */}
      <div className="flex-1 min-h-0 w-full overflow-hidden">
        <ResizablePanel
          left={leftPanel}
          right={rightPanel}
          defaultLeftWidth={40}
          minLeftWidth={25}
          maxLeftWidth={70}
        />
      </div>
    </div>
  )
}
