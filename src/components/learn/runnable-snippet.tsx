"use client"

import Editor from "@monaco-editor/react"
import { Play, RotateCcw, Loader2, Check, AlertTriangle } from "lucide-react"
import { useState } from "react"
import type { Snippet } from "@/lib/data/java-guide"
import { useSettingsStore } from "@/lib/settings/store"

type RunState =
  | { kind: "idle" }
  | { kind: "running" }
  | { kind: "done"; stdout: string; stderr: string; status: string }

/**
 * One editable, runnable snippet.
 *
 * The code goes through the same /api/execute sandbox the judge uses, on its
 * STDIO path — the one that existed but had nothing calling it. Because the
 * editor is editable, the point is not only to read the output but to change a
 * line and watch it change.
 */
export function RunnableSnippet({ snippet }: { snippet: Snippet }) {
  const settings = useSettingsStore((s) => s.settings)
  const [code, setCode] = useState(snippet.code)
  const [run, setRun] = useState<RunState>({ kind: "idle" })

  const editorTheme =
    settings.editor.theme === "follow"
      ? settings.appearance.theme === "light"
        ? "vs"
        : "vs-dark"
      : settings.editor.theme

  const lineCount = code.split("\n").length
  const editorHeight = Math.min(Math.max(lineCount, 6), 26) * 19 + 16

  const execute = async () => {
    setRun({ kind: "running" })
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          executionMode: "STDIO",
          className: "Main",
          stdin: "",
          timeoutMs: settings.judge.timeLimitMs,
          memoryLimitMb: settings.judge.memoryLimitMb,
        }),
      })
      const data = await res.json()
      setRun({
        kind: "done",
        stdout: data.stdout ?? "",
        stderr: data.stderr ?? data.error ?? "",
        status: data.status ?? "RUNTIME_ERROR",
      })
    } catch (error) {
      setRun({
        kind: "done",
        stdout: "",
        stderr: error instanceof Error ? error.message : String(error),
        status: "RUNTIME_ERROR",
      })
    }
  }

  const edited = code !== snippet.code

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <h3 className="truncate text-sm font-semibold">{snippet.title}</h3>
        <div className="flex flex-shrink-0 items-center gap-1.5">
          {edited && (
            <button
              onClick={() => {
                setCode(snippet.code)
                setRun({ kind: "idle" })
              }}
              className="flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              title="Restore the original snippet"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          )}
          <button
            onClick={execute}
            disabled={run.kind === "running"}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {run.kind === "running" ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Play className="h-3 w-3" />
            )}
            Run
          </button>
        </div>
      </div>

      <Editor
        height={editorHeight}
        language="java"
        theme={editorTheme}
        value={code}
        onChange={(v) => setCode(v ?? "")}
        options={{
          minimap: { enabled: false },
          fontSize: settings.editor.fontSize,
          fontFamily: settings.editor.fontFamily,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          tabSize: settings.editor.tabSize,
          wordWrap: settings.editor.wordWrap ? "on" : "off",
          padding: { top: 8, bottom: 8 },
          renderLineHighlight: "none",
          overviewRulerLanes: 0,
          scrollbar: { vertical: "auto", horizontal: "auto" },
        }}
      />

      {run.kind === "done" && (
        <div className="border-t border-border bg-background/60 px-4 py-3">
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold">
            {run.status === "ACCEPTED" ? (
              <>
                <Check className="h-3.5 w-3.5 text-easy" />
                <span className="text-easy">Output</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-3.5 w-3.5 text-hard" />
                <span className="text-hard">{run.status.replace(/_/g, " ")}</span>
              </>
            )}
          </div>
          {run.stdout && (
            <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs text-foreground">
              {run.stdout}
            </pre>
          )}
          {run.stderr && (
            <pre className="mt-1.5 overflow-x-auto whitespace-pre-wrap font-mono text-xs text-hard">
              {run.stderr}
            </pre>
          )}
          {!run.stdout && !run.stderr && (
            <p className="font-mono text-xs text-muted-foreground">(no output)</p>
          )}
        </div>
      )}

      {snippet.note && (
        <p className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted-foreground">
          {snippet.note}
        </p>
      )}
    </div>
  )
}
