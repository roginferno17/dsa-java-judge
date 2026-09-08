"use client"

import { useState, useCallback, useEffect, useMemo, use } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
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
  GraduationCap,
  NotebookPen,
  Loader2,
  ListFilter,
  Terminal,
  RotateCcw,
  Lock,
  FlaskConical,
  Keyboard,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { curriculum } from "@/lib/data/curriculum"
import { getDifficultyBg, formatProblemNumber } from "@/lib/utils"
import { useProgressStore } from "@/lib/progress/store"
import { ResizablePanel, VerticalResizablePanel } from "@/components/ui/resizable-panel"
import { BackButton } from "@/components/layout/back-button"
import { SettingsLink } from "@/components/layout/nav-actions"
import { getProblemMetadata } from "@/lib/data/problem-metadata"
import {
  ProblemLearnContent,
  ProblemMetadata,
  StructuredTestCase,
  TestResultItem,
} from "@/lib/types/judge"
import { useHydrated } from "@/lib/hooks/use-hydrated"
import { useCodeDraft } from "@/lib/hooks/use-code-draft"
import { PracticeCard } from "@/components/practice/practice-card"
import { ProblemNotes } from "@/components/notes/problem-notes"
import { getPracticeLinks } from "@/lib/data/practice"
import { useSettingsStore } from "@/lib/settings/store"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-editor-bg">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  ),
})

/** Locate a problem's step and topic. Cheap enough to run every render. */
function findInCurriculum(slug: string) {
  for (const s of curriculum) {
    for (const t of s.topics) {
      const p = t.problems.find((pr) => pr.slug === slug)
      if (p) return { currentStep: s, currentTopic: t, problem: p }
    }
  }
  return { currentStep: null, currentTopic: null, problem: null }
}

type Mode = "learn" | "test" | "notes"
type ResultTab = "cases" | "console"

interface ExecutionResult {
  status: string
  executionTime?: number
  error?: string
  stdout?: string
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
    case "MEMORY_LIMIT_EXCEEDED":
      return "Memory Limit Exceeded"
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
  // Keyed by slug: switching problems remounts the workspace, so every piece of
  // per-problem state resets naturally. The previous version cleared it with an
  // effect, which set state during render and cascaded an extra render.
  return <Workspace key={slug} slug={slug} />
}

function Workspace({ slug }: { slug: string }) {
  const metadata = getProblemMetadata(slug)
  // No harness authored yet. Shown as a designed state rather than a fabricated
  // signature with a test the starter code already passes.
  if (!metadata) return <UnauthoredProblem slug={slug} />
  return <AuthoredWorkspace slug={slug} metadata={metadata} />
}

function AuthoredWorkspace({ slug, metadata }: { slug: string; metadata: ProblemMetadata }) {
  const hydrated = useHydrated()

  const settings = useSettingsStore((s) => s.settings)
  // Settings -> Editor -> "Default mode when opening a problem".
  //
  // Derived rather than seeded into useState: the server renders before the
  // persisted settings exist, so initialising state from them would render
  // "test" on the server and "learn" on the client. Falling back to the setting
  // only once a tab has NOT been clicked keeps SSR and the client in agreement,
  // and the moment the user picks a tab their choice wins for the rest of the visit.
  const [chosenMode, setChosenMode] = useState<Mode | null>(null)
  const mode: Mode = chosenMode ?? (hydrated ? settings.editor.defaultMode : "test")
  const setMode = setChosenMode

  // Ctrl on Windows/Linux, Cmd on macOS. Resolved after hydration so the server
  // and client render the same thing.
  const modKey =
    hydrated && typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform)
      ? "Cmd"
      : "Ctrl"

  const { code, setCode, reset: resetCode, restored } = useCodeDraft(
    slug,
    metadata.starterCode,
    settings.editor.autoSaveDrafts
  )

  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<ExecutionResult | null>(null)
  const [expandedExample, setExpandedExample] = useState<number | null>(1)
  const [selectedTab, setSelectedTab] = useState(0)
  const [resultTab, setResultTab] = useState<ResultTab>("cases")
  const [failedSubmits, setFailedSubmits] = useState(0)

  const [customOpen, setCustomOpen] = useState(false)
  const [customInput, setCustomInput] = useState(() => {
    const first = metadata.sampleTestCases[0]
    return first ? JSON.stringify(first.inputs, null, 2) : "{}"
  })
  const [customError, setCustomError] = useState<string | null>(null)

  const { markAttempted, markSolved, toggleSolved, getProblemStatus } = useProgressStore()

  const practiceLinks = useMemo(
    () =>
      getPracticeLinks(slug, {
        cfRatingMin: settings.practice.cfRatingMin,
        cfRatingMax: settings.practice.cfRatingMax,
      }),
    [slug, settings.practice.cfRatingMin, settings.practice.cfRatingMax]
  )

  const { currentStep, currentTopic, problem } = findInCurriculum(slug)

  const problemData = problem ?? {
    number: 1,
    title: metadata.title,
    slug: metadata.slug,
    difficulty: "EASY" as const,
  }

  // Not manually memoized: the React Compiler cannot preserve a memo whose input
  // comes from a plain function call, and flattening one step is trivial anyway.
  const stepProblems = currentStep ? currentStep.topics.flatMap((t) => t.problems) : []
  const currentIndex = stepProblems.findIndex((p) => p.slug === slug)

  const prevProblem = currentIndex > 0 ? stepProblems[currentIndex - 1] : null
  const prevHref = prevProblem
    ? `/problem/${prevProblem.slug}`
    : currentStep
      ? `/roadmap/${currentStep.slug}`
      : "/roadmap"

  const nextProblem =
    currentIndex >= 0 && currentIndex < stepProblems.length - 1
      ? stepProblems[currentIndex + 1]
      : null
  const nextHref = nextProblem
    ? `/problem/${nextProblem.slug}`
    : currentStep
      ? `/roadmap/${currentStep.slug}`
      : "/roadmap"

  // Reflects the limits actually enforced, rather than a hardcoded string.
  const constraints = useMemo(
    () => [
      `Time Limit: ${(settings.judge.timeLimitMs / 1000).toFixed(1)} seconds`,
      `Memory Limit: ${settings.judge.memoryLimitMb} MB`,
      "Method must be public and match the signature",
    ],
    [settings.judge.timeLimitMs, settings.judge.memoryLimitMb]
  )

  const execute = useCallback(
    async (kind: "run" | "submit", testCases: StructuredTestCase[]) => {
      const setBusy = kind === "run" ? setIsRunning : setIsSubmitting
      setBusy(true)
      setResult(null)
      setSelectedTab(0)
      setResultTab("cases")

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
            mutatedArgIndex: metadata.mutatedArgIndex ?? 0,
            comparison: metadata.comparison,
            testCases,
            timeoutMs: settings.judge.timeLimitMs,
            memoryLimitMb: settings.judge.memoryLimitMb,
            stopOnFirstFailure: settings.judge.stopOnFirstFailure,
            mode: kind,
          }),
        })
        const data = await res.json()

        markAttempted(slug, data.status)
        const accepted = data.status === "ACCEPTED"
        if (kind === "submit") {
          if (accepted) markSolved(slug, data.status)
          else setFailedSubmits((n) => n + 1)
        }

        setResult({
          status: formatStatus(data.status),
          executionTime: data.executionTimeMs ?? 0,
          error: data.error || "",
          stdout: data.stdout || "",
          passed: data.passed,
          total: data.total,
          results: data.results,
        })

        // If it failed and you printed something, that print is probably what
        // you want to look at first.
        if (data.stdout && !accepted) setResultTab("console")
      } catch {
        setResult({
          status: "Runtime Error",
          error: "Could not reach the execution server. Is the dev server still running?",
        })
      } finally {
        setBusy(false)
      }
    },
    [
      code,
      metadata,
      markAttempted,
      markSolved,
      slug,
      settings.judge.timeLimitMs,
      settings.judge.memoryLimitMb,
      settings.judge.stopOnFirstFailure,
    ]
  )

  const handleRun = useCallback(
    () => execute("run", metadata.sampleTestCases),
    [execute, metadata.sampleTestCases]
  )

  // Submit adds the hidden cases. They were typed, populated for some problems,
  // and never actually sent -- Submit was identical to Run.
  const handleSubmit = useCallback(
    () => execute("submit", [...metadata.sampleTestCases, ...(metadata.hiddenTestCases ?? [])]),
    [execute, metadata.sampleTestCases, metadata.hiddenTestCases]
  )

  const handleRunCustom = useCallback(() => {
    let inputs: unknown
    try {
      inputs = JSON.parse(customInput)
    } catch (err) {
      setCustomError(`That is not valid JSON: ${(err as Error).message}`)
      return
    }
    setCustomError(null)
    // No expected value -- the point is to see what your code returns.
    void execute("run", [
      { inputs: inputs as Record<string, unknown>, expectedOutput: null },
    ])
  }, [customInput, execute])

  const busy = isRunning || isSubmitting

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key !== "Enter") return
      e.preventDefault()
      if (busy) return
      if (e.shiftKey) void handleSubmit()
      else void handleRun()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [busy, handleRun, handleSubmit])

  const isSolved = hydrated && getProblemStatus(slug).status === "SOLVED"

  const revealHidden =
    settings.judge.revealHiddenAfter > 0 && failedSubmits >= settings.judge.revealHiddenAfter

  const editorTheme =
    settings.editor.theme !== "follow"
      ? settings.editor.theme
      : settings.appearance.theme === "light"
        ? "vs"
        : "vs-dark"

  const signature = `public ${metadata.returnType} ${metadata.methodName}(${metadata.parameters
    .map((p) => `${p.type} ${p.name}`)
    .join(", ")})`

  // ---------------------------------------------------------------- left panel

  const leftPanel = (
    <div className="flex h-full flex-col overflow-y-auto bg-card p-6">
      {mode === "notes" ? (
        <ProblemNotes slug={slug} title={metadata.title} />
      ) : mode === "learn" ? (
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <BookOpen className="h-4 w-4" /> Learn
            </div>
            <h1 className="text-2xl font-bold">{metadata.title}</h1>
            {metadata.description && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {metadata.description}
              </p>
            )}
          </div>

          {metadata.learn ? (
            <LearnContent learn={metadata.learn} />
          ) : (
            /* Nothing is invented here. This panel used to print a hardcoded
               "Time: O(N) • Space: O(1)" on every problem regardless of the
               problem, which actively taught the wrong thing. */
            <div className="rounded-2xl border border-dashed border-border bg-secondary/20 p-5">
              <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
                <Lightbulb className="h-4 w-4 text-amber-400" />
                No explanation written for this problem yet
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Rather than show a generic explanation that might not apply here, this stays empty
                until a real one is written. The Test tab still works, and the practice links below
                cover the same ground.
              </p>
            </div>
          )}

          <div className="space-y-2 rounded-2xl border border-border bg-background p-4">
            <div className="text-xs font-semibold text-muted-foreground">Java method signature</div>
            <pre className="overflow-x-auto rounded-lg border border-border bg-secondary/40 p-3 font-mono text-xs text-primary">
              {signature}
            </pre>
          </div>

          <PracticeCard links={practiceLinks} />
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">
                {formatProblemNumber(problemData.number)}
              </span>
              <span
                className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getDifficultyBg(problemData.difficulty)}`}
              >
                {problemData.difficulty}
              </span>
              {currentTopic && (
                <span className="text-xs text-muted-foreground">• {currentTopic.title}</span>
              )}
            </div>
            <h1 className="text-2xl font-bold">{metadata.title}</h1>
            {metadata.description && (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {metadata.description}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-border bg-secondary/30 p-4">
            <div className="font-mono text-xs text-primary">
              {"// Method signature:"}
              <br />
              {signature}
            </div>
          </div>

          {/* Above the examples on purpose. At the bottom of this panel it sat
              roughly 1900px down and nobody ever scrolled to it. */}
          <PracticeCard links={practiceLinks} />

          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <ListFilter className="h-4 w-4 text-primary" /> Examples
            </h3>
            {metadata.sampleTestCases.map((example, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-border bg-background"
              >
                <button
                  onClick={() => setExpandedExample(expandedExample === idx + 1 ? null : idx + 1)}
                  className="flex w-full items-center justify-between p-3 text-xs font-medium transition-colors hover:bg-secondary/30"
                >
                  <span>Example {idx + 1}</span>
                  {expandedExample === idx + 1 ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedExample === idx + 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2.5 border-t border-border bg-secondary/10 p-3.5 text-xs"
                    >
                      <div>
                        <div className="mb-1 font-medium text-muted-foreground">Input:</div>
                        <pre className="overflow-x-auto rounded-lg border border-border/50 bg-background p-2.5 font-mono">
                          {typeof example.inputs === "object"
                            ? Object.entries(example.inputs)
                                .map(([k, v]) => `${k} = ${JSON.stringify(v)}`)
                                .join(", ")
                            : JSON.stringify(example.inputs)}
                        </pre>
                      </div>
                      <div>
                        <div className="mb-1 font-medium text-muted-foreground">Expected:</div>
                        <pre className="overflow-x-auto rounded-lg border border-border/50 bg-background p-2.5 font-mono text-easy">
                          {JSON.stringify(example.expectedOutput)}
                        </pre>
                      </div>
                      {example.explanation && (
                        <p className="leading-relaxed text-muted-foreground">
                          {example.explanation}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Constraints
            </h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {constraints.map((c, i) => (
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

  // --------------------------------------------------------------- right panel

  const editorTop = (
    <div className="flex h-full w-full flex-col overflow-hidden bg-card">
      {restored && (
        <div className="flex flex-shrink-0 items-center justify-between gap-2 border-b border-border bg-primary/5 px-3 py-1.5 text-[11px] text-muted-foreground">
          <span>Restored your saved draft for this problem.</span>
          <button
            onClick={resetCode}
            className="flex items-center gap-1 font-medium text-primary hover:underline"
          >
            <RotateCcw className="h-3 w-3" /> Reset to starter code
          </button>
        </div>
      )}
      <div className="min-h-0 w-full flex-1 overflow-hidden">
        <MonacoEditor
          height="100%"
          language="java"
          theme={editorTheme}
          value={code}
          onChange={(v) => v !== undefined && setCode(v)}
          options={{
            minimap: { enabled: settings.editor.minimap },
            fontSize: settings.editor.fontSize,
            fontFamily: settings.editor.fontFamily || "var(--font-geist-mono)",
            tabSize: settings.editor.tabSize,
            lineNumbers: settings.editor.lineNumbers ? "on" : "off",
            wordWrap: settings.editor.wordWrap ? "on" : "off",
            bracketPairColorization: { enabled: settings.editor.bracketColorization },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            renderLineHighlight: "line",
            cursorBlinking: "smooth",
            smoothScrolling: true,
          }}
        />
      </div>
    </div>
  )

  const resultsBottom = (
    <div className="flex h-full w-full flex-col overflow-hidden bg-background">
      <div className="flex flex-shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="hidden truncate font-mono text-xs text-muted-foreground sm:inline">
            Java 17+ • method invocation
          </span>
          <button
            onClick={() => setCustomOpen((v) => !v)}
            className={`flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[11px] font-medium transition-colors ${
              customOpen
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            <FlaskConical className="h-3 w-3" /> Custom input
          </button>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2.5">
          <span
            className="hidden items-center gap-1 text-[10px] text-muted-foreground sm:flex"
            title={`${modKey}+Enter runs · ${modKey}+Shift+Enter submits`}
          >
            <Keyboard className="h-3 w-3" />
            {modKey}+↵
          </span>
          <button
            onClick={handleRun}
            disabled={busy}
            title={`Run the sample cases (${modKey}+Enter)`}
            className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-3.5 py-1.5 text-xs font-semibold transition-all hover:bg-secondary/80 active:scale-95 disabled:opacity-50"
          >
            {isRunning ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
            ) : (
              <Play className="h-3.5 w-3.5 text-primary" />
            )}
            Run
          </button>
          <button
            onClick={handleSubmit}
            disabled={busy}
            title={`Run every case, including hidden ones (${modKey}+Shift+Enter)`}
            className="flex items-center gap-2 rounded-xl bg-easy px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-easy/20 transition-all hover:bg-easy/90 active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            Submit
          </button>
        </div>
      </div>

      {customOpen && (
        <div className="flex-shrink-0 space-y-2 border-b border-border bg-secondary/10 px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <label className="text-[11px] font-medium text-muted-foreground">
              Arguments as JSON — keys must match the parameter names
            </label>
            <button
              onClick={handleRunCustom}
              disabled={busy}
              className="flex-shrink-0 rounded-lg border border-border bg-secondary px-2.5 py-1 text-[11px] font-medium hover:bg-secondary/70 disabled:opacity-50"
            >
              Run with this input
            </button>
          </div>
          <textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            spellCheck={false}
            rows={4}
            className="w-full resize-y rounded-lg border border-border bg-background p-2.5 font-mono text-xs outline-none focus:border-primary"
          />
          {customError && <p className="text-[11px] text-hard">{customError}</p>}
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-secondary/20 px-4 py-2 backdrop-blur-md">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setResultTab("cases")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                resultTab === "cases"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Test cases
            </button>
            <button
              onClick={() => setResultTab("console")}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                resultTab === "console"
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Terminal className="h-3 w-3" />
              Console
              {result?.stdout ? <span className="h-1.5 w-1.5 rounded-full bg-primary" /> : null}
            </button>
          </div>
          {result?.passed !== undefined && result?.total !== undefined && (
            <span className="text-xs font-medium">
              {result.passed} / {result.total} passed
            </span>
          )}
        </div>

        {result ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div
              className={`flex items-center justify-between border-b border-border px-4 py-2.5 ${
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
                <span className="text-xs font-bold sm:text-sm">{result.status}</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{result.executionTime} ms</span>
              </div>
            </div>

            {resultTab === "console" ? (
              <div className="p-4">
                {result.stdout ? (
                  <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-editor-bg p-3 font-mono text-xs leading-relaxed">
                    {result.stdout}
                  </pre>
                ) : (
                  <p className="py-6 text-center text-xs leading-relaxed text-muted-foreground">
                    Nothing printed. Anything you write with{" "}
                    <code className="rounded bg-secondary px-1 py-0.5 font-mono">
                      System.out.println
                    </code>{" "}
                    appears here, and will not affect your verdict.
                  </p>
                )}
              </div>
            ) : (
              <>
                {result.error && (
                  <div className="border-b border-border bg-hard/5 p-4">
                    <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-hard">
                      <AlertTriangle className="h-3.5 w-3.5" /> Error
                    </div>
                    <pre className="whitespace-pre-wrap rounded-lg border border-hard/20 bg-background p-3 font-mono text-xs leading-relaxed text-hard">
                      {result.error}
                    </pre>
                  </div>
                )}

                {result.results && result.results.length > 0 && (
                  <div className="space-y-3 p-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {result.results.map((tr, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedTab(idx)}
                          className={`flex flex-shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
                            selectedTab === idx
                              ? "border-primary bg-primary/10 font-semibold text-primary"
                              : "border-border bg-secondary/50 text-muted-foreground hover:bg-secondary"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${tr.passed ? "bg-easy" : "bg-hard"}`}
                          />
                          {tr.hidden ? <Lock className="h-3 w-3" /> : null}
                          Case {idx + 1}
                        </button>
                      ))}
                    </div>

                    {result.results[selectedTab] && (
                      <CaseDetail
                        item={result.results[selectedTab]}
                        revealHidden={revealHidden}
                        failedSubmits={failedSubmits}
                        revealAfter={settings.judge.revealHiddenAfter}
                      />
                    )}
                  </div>
                )}
              </>
            )}
          </motion.div>
        ) : (
          <div className="px-4 py-8 text-center text-xs leading-relaxed text-muted-foreground">
            Run or submit to see results.
            <br />
            <span className="font-mono">{modKey}+Enter</span> runs the samples,{" "}
            <span className="font-mono">{modKey}+Shift+Enter</span> submits everything.
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <nav className="relative flex h-12 w-full flex-shrink-0 items-center justify-between border-b border-border bg-background px-3 sm:px-4">
        <div className="z-10 flex min-w-0 items-center gap-2 pr-4 sm:gap-3">
          <Link
            href={prevHref}
            title={prevProblem ? `Previous: ${prevProblem.title}` : "Back to step"}
            className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-2.5 py-1 text-xs font-semibold transition-all hover:border-primary/40 hover:bg-secondary active:scale-95"
          >
            <ChevronLeft className="h-3.5 w-3.5 text-primary" />
            <span className="hidden md:inline">Prev</span>
          </Link>

          {/* Distinct from Prev: Prev walks the curriculum in order, Back returns
              to wherever you actually came from. */}
          <BackButton
            fallbackHref={currentStep ? `/roadmap/${currentStep.slug}` : "/roadmap"}
            className="flex flex-shrink-0 items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          />

          <div className="h-4 w-px flex-shrink-0 bg-border" />

          <div className="flex min-w-0 items-center gap-2">
            <span className="flex-shrink-0 font-mono text-xs text-muted-foreground">
              {formatProblemNumber(problemData.number)}
            </span>
            <span className="max-w-[110px] truncate text-xs font-semibold sm:max-w-[160px] sm:text-sm md:max-w-[220px]">
              {problemData.title}
            </span>
            <span
              className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${getDifficultyBg(problemData.difficulty)}`}
            >
              {problemData.difficulty}
            </span>

            <button
              type="button"
              onClick={() => toggleSolved(slug)}
              title={isSolved ? "Mark as not completed" : "Mark as completed"}
              className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs font-medium transition-all hover:bg-secondary"
            >
              {isSolved ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-easy" />
                  <span className="hidden text-xs font-semibold text-easy sm:inline">Solved</span>
                </>
              ) : (
                <>
                  <Circle className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="hidden text-xs text-muted-foreground sm:inline">Mark Solved</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="pointer-events-auto absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-1 rounded-xl border border-border bg-secondary/80 p-1 shadow-sm">
            <button
              onClick={() => setMode("learn")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                mode === "learn"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
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
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Test</span>
            </button>
            <button
              onClick={() => setMode("notes")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                mode === "notes"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <NotebookPen className="h-3.5 w-3.5" />
              <span>Notes</span>
            </button>
          </div>
        </div>

        <div className="z-10 ml-auto flex flex-shrink-0 items-center gap-2 pl-4">
          <SettingsLink compact />
          <Link
            href={nextHref}
            title={nextProblem ? `Next: ${nextProblem.title}` : "Finish step"}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-2.5 py-1 text-xs font-semibold transition-all hover:border-primary/40 hover:bg-secondary active:scale-95"
          >
            <span className="hidden md:inline">Next</span>
            <ChevronRight className="h-3.5 w-3.5 text-primary" />
          </Link>
        </div>
      </nav>

      <div className="min-h-0 w-full flex-1 overflow-hidden">
        <ResizablePanel
          left={leftPanel}
          right={
            <VerticalResizablePanel
              top={editorTop}
              bottom={resultsBottom}
              defaultTopHeight={settings.appearance.panelSplitV}
              minTopHeight={20}
              maxTopHeight={80}
              storageKey="dsa-java-judge:panel:editor"
            />
          }
          defaultLeftWidth={settings.appearance.panelSplitH}
          minLeftWidth={25}
          maxLeftWidth={70}
          storageKey="dsa-java-judge:panel:workspace"
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------

function CaseDetail({
  item,
  revealHidden,
  failedSubmits,
  revealAfter,
}: {
  item: TestResultItem
  revealHidden: boolean
  failedSubmits: number
  revealAfter: number
}) {
  if (item.hidden && !revealHidden) {
    return (
      <div className="rounded-xl border border-border bg-secondary/20 p-4 text-xs">
        <div className="mb-1 flex items-center gap-1.5 font-semibold">
          <Lock className="h-3.5 w-3.5 text-muted-foreground" />
          Hidden test case
        </div>
        <p className="leading-relaxed text-muted-foreground">
          {item.passed
            ? "Your solution handled this one."
            : "Your solution did not handle this one."}{" "}
          {revealAfter > 0
            ? `Details unlock after ${revealAfter} failed submits (${failedSubmits} so far).`
            : "Turn on Settings → Judge → Reveal hidden cases if you want to see the details."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2.5 rounded-xl border border-border bg-secondary/20 p-3.5 text-xs">
      <div>
        <div className="mb-1 font-semibold text-muted-foreground">Input</div>
        <pre className="whitespace-pre-wrap rounded-lg border border-border/50 bg-background p-2.5 font-mono">
          {item.input}
        </pre>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div>
          <div className="mb-1 font-semibold text-muted-foreground">Expected</div>
          <pre className="whitespace-pre-wrap rounded-lg border border-border/50 bg-background p-2.5 font-mono text-easy">
            {item.expected}
          </pre>
        </div>
        <div>
          <div className="mb-1 font-semibold text-muted-foreground">Your output</div>
          <pre
            className={`whitespace-pre-wrap rounded-lg border border-border/50 bg-background p-2.5 font-mono ${
              item.passed ? "text-easy" : "text-hard"
            }`}
          >
            {item.actual}
          </pre>
        </div>
      </div>
      {item.error && (
        <pre className="whitespace-pre-wrap rounded-lg border border-hard/20 bg-hard/5 p-2.5 font-mono text-hard">
          {item.error}
        </pre>
      )}
    </div>
  )
}

function Disclosure({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string
  icon: React.ElementType
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-3 text-xs font-semibold transition-colors hover:bg-secondary/30"
      >
        <span className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-primary" />
          {title}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border bg-secondary/10 p-3.5 text-xs leading-relaxed"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Authored teaching content, revealed a step at a time.
 *
 * Progressive disclosure is deliberate: looking up the approach should be a
 * decision you make, not something you stumble into while reading the intuition.
 */
function LearnContent({ learn }: { learn: ProblemLearnContent }) {
  return (
    <div className="space-y-3">
      <Disclosure title="Intuition" icon={Lightbulb} defaultOpen>
        <p className="text-muted-foreground">{learn.intuition}</p>
      </Disclosure>

      <Disclosure title="Approach" icon={Target}>
        <ol className="list-inside list-decimal space-y-1.5 text-muted-foreground">
          {learn.approach.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </Disclosure>

      {learn.pitfalls && learn.pitfalls.length > 0 && (
        <Disclosure title="Common mistakes" icon={AlertTriangle}>
          <ul className="list-inside list-disc space-y-1.5 text-muted-foreground">
            {learn.pitfalls.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </Disclosure>
      )}

      <Disclosure title="Complexity" icon={Clock}>
        <div className="space-y-2">
          {learn.bruteForce && (
            <div>
              <div className="font-medium">Brute force</div>
              <p className="text-muted-foreground">{learn.bruteForce.idea}</p>
              <p className="font-mono text-[11px] text-muted-foreground">
                Time {learn.bruteForce.time} · Space {learn.bruteForce.space}
              </p>
            </div>
          )}
          <div>
            <div className="font-medium">Optimal</div>
            <p className="text-muted-foreground">{learn.optimal.idea}</p>
            <p className="font-mono text-[11px] text-muted-foreground">
              Time {learn.optimal.time} · Space {learn.optimal.space}
            </p>
          </div>
        </div>
      </Disclosure>

      {learn.javaToolkit && learn.javaToolkit.length > 0 && (
        <Disclosure title="Java you will need" icon={Code2}>
          <ul className="space-y-1">
            {learn.javaToolkit.map((t, i) => (
              <li key={i} className="font-mono text-[11px] text-muted-foreground">
                {t}
              </li>
            ))}
          </ul>
        </Disclosure>
      )}
    </div>
  )
}

/**
 * A problem that is listed in the curriculum but has no judge harness yet.
 *
 * Deliberately not a dead end and deliberately not a fake: the header, difficulty,
 * navigation, notes and the Mark Solved toggle all still work, and the practice
 * links point at the same material elsewhere. What it never does is show a test
 * case that passes on the starter code and call that progress.
 */
function UnauthoredProblem({ slug }: { slug: string }) {
  const { currentStep, currentTopic, problem } = findInCurriculum(slug)
  const hydrated = useHydrated()
  const { toggleSolved, getProblemStatus } = useProgressStore()
  const cfMin = useSettingsStore((s) => s.settings.practice.cfRatingMin)
  const cfMax = useSettingsStore((s) => s.settings.practice.cfRatingMax)
  const links = getPracticeLinks(slug, { cfRatingMin: cfMin, cfRatingMax: cfMax })

  const isSolved = hydrated && getProblemStatus(slug).status === "SOLVED"
  const title = problem?.title ?? slug.replace(/-/g, " ")

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-6">
          <BackButton fallbackHref={currentStep ? `/roadmap/${currentStep.slug}` : "/roadmap"} />
          <div className="min-w-0 flex-1 truncate text-sm font-semibold">{title}</div>
          {problem && (
            <span
              className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${getDifficultyBg(problem.difficulty)}`}
            >
              {problem.difficulty}
            </span>
          )}
        </div>
      </nav>

      <main className="mx-auto max-w-3xl space-y-6 px-6 py-10">
        <div>
          {problem && currentTopic && (
            <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-mono">{formatProblemNumber(problem.number)}</span>
              <span>• {currentTopic.title}</span>
            </div>
          )}
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>

        <div className="rounded-2xl border border-dashed border-border bg-secondary/20 p-6">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <FlaskConical className="h-4 w-4 text-primary" />
            No judge harness for this one yet
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Problems are given a proper harness one curriculum step at a time — a real method
            signature, worked examples and hidden edge cases. This one has not been written yet, and
            showing you a placeholder test that passes on the starter code would be worse than
            showing nothing.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            You can still solve it on LeetCode or Codeforces below, and mark it done here.
          </p>
        </div>

        <PracticeCard links={links} />

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => toggleSolved(slug)}
            className="flex items-center gap-2 rounded-xl border border-border bg-secondary/60 px-4 py-2 text-sm font-medium transition-all hover:bg-secondary"
          >
            {isSolved ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-easy" />
                <span className="text-easy">Solved</span>
              </>
            ) : (
              <>
                <Circle className="h-4 w-4 text-muted-foreground" />
                Mark as solved
              </>
            )}
          </button>
          <Link
            href={currentStep ? `/roadmap/${currentStep.slug}` : "/roadmap"}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to {currentStep?.title ?? "roadmap"}
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          Prefer to hide these entirely? Settings → Curriculum → Hide problems without a judge
          harness.
        </p>
      </main>
    </div>
  )
}
