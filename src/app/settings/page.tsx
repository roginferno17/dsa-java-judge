"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Palette,
  Code2,
  Gavel,
  ExternalLink,
  ListChecks,
  Database,
  HardDrive,
  RotateCcw,
  Download,
  Upload,
  Trash2,
  Check,
  Loader2,
} from "lucide-react"
import { BackButton } from "@/components/layout/back-button"
import { useSettingsStore } from "@/lib/settings/store"
import { CUSTOM_TOKENS, DEFAULT_SETTINGS, ThemePreset } from "@/lib/settings/types"
import { useProgressStore } from "@/lib/progress/store"
import { useHydrated } from "@/lib/hooks/use-hydrated"
import { ClearTarget, useStorageStore } from "@/lib/settings/storage-store"

const fmtBytes = (n: number): string => {
  if (n <= 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const i = Math.min(Math.floor(Math.log(n) / Math.log(1024)), units.length - 1)
  return `${(n / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-border bg-card overflow-hidden">
      <header className="border-b border-border bg-secondary/30 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">{title}</h2>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </header>
      <div className="divide-y divide-border">{children}</div>
    </section>
  )
}

function Row({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 sm:pr-6">
        <div className="text-sm font-medium">{label}</div>
        {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  )
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 flex-shrink-0 rounded-full border transition-colors ${
        checked ? "border-primary bg-primary" : "border-border bg-secondary"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4.5 w-4.5 rounded-full bg-background transition-transform ${
          checked ? "translate-x-5.5" : "translate-x-0.5"
        }`}
        style={{ height: 18, width: 18, transform: `translateX(${checked ? 22 : 3}px)` }}
      />
    </button>
  )
}

function Choice<T extends string | number>({
  value,
  options,
  onChange,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-secondary/50 p-1">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          onClick={() => onChange(o.value)}
          className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
            value === o.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function NumberInput({
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: {
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  onChange: (v: number) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const n = Number(e.target.value)
          if (Number.isFinite(n)) onChange(Math.min(Math.max(n, min), max))
        }}
        className="w-24 rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm tabular-nums outline-none focus:border-primary"
      />
      {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
    </div>
  )
}

// ---------------------------------------------------------------------------

export default function SettingsPage() {
  const hydrated = useHydrated()
  const { settings, update, reset, importSettings, exportTheme } = useSettingsStore()
  const clearProgress = useProgressStore((s) => s.clearProgress)

  const storage = useStorageStore((s) => s.info)
  const busy = useStorageStore((s) => s.clearing)
  const loadStorage = useStorageStore((s) => s.load)
  const clearStorage = useStorageStore((s) => s.clear)
  const [note, setNote] = useState<string | null>(null)
  const themeFileRef = useRef<HTMLInputElement>(null)
  const backupFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    void loadStorage()
  }, [loadStorage])

  const flash = (msg: string) => {
    setNote(msg)
    setTimeout(() => setNote(null), 4000)
  }

  const clearTarget = async (target: ClearTarget, label: string) => {
    const freed = await clearStorage(target)
    flash(`Cleared ${label} — freed ${fmtBytes(freed)}.`)
  }

  const download = (name: string, content: string) => {
    const blob = new Blob([content], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    a.remove()
    // Deferred: revoking synchronously can cancel the download in some browsers.
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const zones =
    typeof Intl.supportedValuesOf === "function"
      ? Intl.supportedValuesOf("timeZone")
      : []
  const detectedZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const a = settings.appearance
  const e = settings.editor
  const j = settings.judge
  const p = settings.practice
  const c = settings.curriculum
  const d = settings.data

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <BackButton fallbackHref="/" />
            <div className="h-4 w-px bg-border" />
            <h1 className="text-lg font-bold">Settings</h1>
          </div>
          <Link
            href="/roadmap"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Roadmap
          </Link>
        </div>
      </nav>

      {note && (
        <div className="mx-auto mt-4 max-w-4xl px-6">
          <div className="flex items-center gap-2 rounded-xl border border-easy/30 bg-easy/10 px-4 py-2.5 text-sm text-easy">
            <Check className="h-4 w-4 flex-shrink-0" />
            {note}
          </div>
        </div>
      )}

      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        {/* ---------------- Appearance ---------------- */}
        <Section
          icon={Palette}
          title="Appearance"
          description="Colours, shape and typography. Everything routes through CSS tokens."
        >
          <Row label="Theme" hint="Custom unlocks the colour editor below.">
            <Choice<ThemePreset>
              value={a.theme}
              onChange={(theme) => update({ appearance: { theme } })}
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
                { value: "blue", label: "Blue" },
                { value: "custom", label: "Custom" },
              ]}
            />
          </Row>

          {a.theme === "custom" && (
            <div className="px-5 py-4">
              <div className="mb-3 text-xs text-muted-foreground">
                Colours apply live. Anything left unset falls back to the dark palette.
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {CUSTOM_TOKENS.map((token) => {
                  const current =
                    a.custom[token] ??
                    (typeof window !== "undefined"
                      ? getComputedStyle(document.documentElement)
                          .getPropertyValue(`--${token}`)
                          .trim() || "#000000"
                      : "#000000")
                  return (
                    <label key={token} className="flex items-center gap-2">
                      <input
                        type="color"
                        value={/^#[0-9a-fA-F]{6}$/.test(current) ? current : "#000000"}
                        onChange={(ev) =>
                          update({
                            appearance: { custom: { ...a.custom, [token]: ev.target.value } },
                          })
                        }
                        className="h-8 w-8 flex-shrink-0 cursor-pointer rounded-lg border border-border bg-transparent p-0"
                      />
                      <span className="truncate font-mono text-[11px] text-muted-foreground">
                        {token}
                      </span>
                    </label>
                  )
                })}
              </div>
              <button
                type="button"
                onClick={() => update({ appearance: { custom: {} } })}
                className="mt-3 text-xs text-muted-foreground underline hover:text-foreground"
              >
                Clear custom colours
              </button>
            </div>
          )}

          <Row label="Corner radius" hint="Applies to cards, buttons and inputs.">
            <NumberInput
              value={a.radius}
              min={0}
              max={2}
              step={0.05}
              suffix="rem"
              onChange={(radius) => update({ appearance: { radius } })}
            />
          </Row>

          <Row label="Interface font size">
            <NumberInput
              value={a.uiFontSize}
              min={12}
              max={22}
              suffix="px"
              onChange={(uiFontSize) => update({ appearance: { uiFontSize } })}
            />
          </Row>

          <Row label="Interface font" hint="Leave blank to use the built-in Geist font.">
            <input
              type="text"
              value={a.uiFontFamily}
              placeholder="e.g. Inter, Segoe UI"
              onChange={(ev) => update({ appearance: { uiFontFamily: ev.target.value } })}
              className="w-52 rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-primary"
            />
          </Row>

          <Row label="Share your theme" hint="Export a theme file, or load one you were sent.">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => download("dsa-judge-theme.json", exportTheme())}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/70"
              >
                <Download className="h-3.5 w-3.5" /> Export
              </button>
              <button
                type="button"
                onClick={() => themeFileRef.current?.click()}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/70"
              >
                <Upload className="h-3.5 w-3.5" /> Import
              </button>
              <input
                ref={themeFileRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={async (ev) => {
                  const file = ev.target.files?.[0]
                  if (!file) return
                  try {
                    const parsed = JSON.parse(await file.text())
                    importSettings({ ...settings, appearance: parsed.appearance ?? parsed })
                    flash("Theme imported.")
                  } catch {
                    flash("That file could not be read as a theme.")
                  }
                  ev.target.value = ""
                }}
              />
            </div>
          </Row>
        </Section>

        {/* ---------------- Editor ---------------- */}
        <Section
          icon={Code2}
          title="Editor"
          description="How the code editor behaves and looks."
        >
          <Row label="Editor theme" hint="“Follow” matches the app theme.">
            <Choice
              value={e.theme}
              onChange={(theme) => update({ editor: { theme } })}
              options={[
                { value: "follow" as const, label: "Follow" },
                { value: "vs-dark" as const, label: "Dark" },
                { value: "vs" as const, label: "Light" },
                { value: "hc-black" as const, label: "High contrast" },
              ]}
            />
          </Row>
          <Row label="Font size">
            <NumberInput
              value={e.fontSize}
              min={10}
              max={28}
              suffix="px"
              onChange={(fontSize) => update({ editor: { fontSize } })}
            />
          </Row>
          <Row label="Editor font" hint="Leave blank for the built-in mono font.">
            <input
              type="text"
              value={e.fontFamily}
              placeholder="e.g. JetBrains Mono"
              onChange={(ev) => update({ editor: { fontFamily: ev.target.value } })}
              className="w-52 rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-primary"
            />
          </Row>
          <Row label="Indent size">
            <Choice
              value={e.tabSize}
              onChange={(tabSize) => update({ editor: { tabSize } })}
              options={[
                { value: 2, label: "2 spaces" },
                { value: 4, label: "4 spaces" },
              ]}
            />
          </Row>
          <Row label="Word wrap">
            <Toggle
              label="Word wrap"
              checked={e.wordWrap}
              onChange={(wordWrap) => update({ editor: { wordWrap } })}
            />
          </Row>
          <Row label="Minimap">
            <Toggle
              label="Minimap"
              checked={e.minimap}
              onChange={(minimap) => update({ editor: { minimap } })}
            />
          </Row>
          <Row label="Line numbers">
            <Toggle
              label="Line numbers"
              checked={e.lineNumbers}
              onChange={(lineNumbers) => update({ editor: { lineNumbers } })}
            />
          </Row>
          <Row label="Bracket pair colours">
            <Toggle
              label="Bracket pair colours"
              checked={e.bracketColorization}
              onChange={(bracketColorization) => update({ editor: { bracketColorization } })}
            />
          </Row>
          <Row
            label="Save drafts automatically"
            hint="Keeps your code per problem so navigating away no longer loses it."
          >
            <Toggle
              label="Save drafts automatically"
              checked={e.autoSaveDrafts}
              onChange={(autoSaveDrafts) => update({ editor: { autoSaveDrafts } })}
            />
          </Row>
          <Row label="Open problems in" hint="Which tab a problem starts on.">
            <Choice
              value={e.defaultMode}
              onChange={(defaultMode) => update({ editor: { defaultMode } })}
              options={[
                { value: "learn" as const, label: "Learn" },
                { value: "test" as const, label: "Test" },
              ]}
            />
          </Row>
        </Section>

        {/* ---------------- Judge ---------------- */}
        <Section
          icon={Gavel}
          title="Judge"
          description="Limits applied when your solution runs. These are enforced for real."
        >
          <Row label="Time limit" hint="Measured from the start of the run, excluding compilation.">
            <NumberInput
              value={j.timeLimitMs}
              min={1000}
              max={15000}
              step={500}
              suffix="ms"
              onChange={(timeLimitMs) => update({ judge: { timeLimitMs } })}
            />
          </Row>
          <Row label="Memory limit" hint="Passed to the JVM as -Xmx.">
            <NumberInput
              value={j.memoryLimitMb}
              min={64}
              max={1024}
              step={64}
              suffix="MB"
              onChange={(memoryLimitMb) => update({ judge: { memoryLimitMb } })}
            />
          </Row>
          <Row
            label="Stop at the first failing case"
            hint="Off runs every case, so you see the full picture."
          >
            <Toggle
              label="Stop at the first failing case"
              checked={j.stopOnFirstFailure}
              onChange={(stopOnFirstFailure) => update({ judge: { stopOnFirstFailure } })}
            />
          </Row>
          <Row
            label="Reveal hidden cases after"
            hint="0 keeps them hidden forever. You are studying alone, so unlocking them can help."
          >
            <NumberInput
              value={j.revealHiddenAfter}
              min={0}
              max={20}
              suffix="failed submits"
              onChange={(revealHiddenAfter) => update({ judge: { revealHiddenAfter } })}
            />
          </Row>
        </Section>

        {/* ---------------- Practice ---------------- */}
        <Section
          icon={ExternalLink}
          title="Practice links"
          description="LeetCode and Codeforces problems suggested alongside each topic."
        >
          <Row label="Show practice links">
            <Toggle
              label="Show practice links"
              checked={p.showPracticeLinks}
              onChange={(showPracticeLinks) => update({ practice: { showPracticeLinks } })}
            />
          </Row>
          <Row
            label="Open Codeforces in"
            hint="“Ask” prompts each time, with an option to remember your choice."
          >
            <Choice
              value={p.codeforcesOpenMode}
              onChange={(codeforcesOpenMode) => update({ practice: { codeforcesOpenMode } })}
              options={[
                { value: "tab" as const, label: "New tab" },
                { value: "window" as const, label: "New window" },
                { value: "ask" as const, label: "Ask" },
              ]}
            />
          </Row>
          <Row
            label="Codeforces difficulty range"
            hint="800–1200 suits someone still learning Java syntax."
          >
            <div className="flex items-center gap-2">
              <NumberInput
                value={p.cfRatingMin}
                min={800}
                max={3500}
                step={100}
                onChange={(cfRatingMin) => update({ practice: { cfRatingMin } })}
              />
              <span className="text-xs text-muted-foreground">to</span>
              <NumberInput
                value={p.cfRatingMax}
                min={800}
                max={3500}
                step={100}
                onChange={(cfRatingMax) => update({ practice: { cfRatingMax } })}
              />
            </div>
          </Row>
        </Section>

        {/* ---------------- Curriculum ---------------- */}
        <Section
          icon={ListChecks}
          title="Curriculum"
          description="What shows up on the roadmap."
        >
          <Row
            label="Default difficulty filter"
            hint="Applied on every step page; change it there and it is remembered here."
          >
            <Choice
              value={c.difficultyFilter}
              onChange={(difficultyFilter) => update({ curriculum: { difficultyFilter } })}
              options={[
                { value: "ALL" as const, label: "All" },
                { value: "EASY" as const, label: "Easy" },
                { value: "MEDIUM" as const, label: "Medium" },
                { value: "HARD" as const, label: "Hard" },
              ]}
            />
          </Row>
        </Section>

        {/* ---------------- Data ---------------- */}
        <Section
          icon={Database}
          title="Progress data"
          description="Your activity log lives in user_data/ and never leaves this machine."
        >
          <Row
            label="Time zone"
            hint="Defines where one day ends and the next begins for your streak."
          >
            <select
              value={d.timeZone}
              onChange={(ev) => update({ data: { timeZone: ev.target.value } })}
              className="w-56 rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-primary"
            >
              <option value="">Detected ({detectedZone})</option>
              {zones.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </Row>
          <Row label="Show streak and activity">
            <Toggle
              label="Show streak and activity"
              checked={d.showStreak}
              onChange={(showStreak) => update({ data: { showStreak } })}
            />
          </Row>
          <Row label="Backup" hint="A JSON copy of your solved and attempted problems.">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={async () => {
                  const res = await fetch("/api/progress")
                  download(
                    `dsa-progress-${new Date().toISOString().slice(0, 10)}.json`,
                    JSON.stringify(await res.json(), null, 2)
                  )
                }}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/70"
              >
                <Download className="h-3.5 w-3.5" /> Export
              </button>
              <button
                type="button"
                onClick={() => backupFileRef.current?.click()}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/70"
              >
                <Upload className="h-3.5 w-3.5" /> Import
              </button>
              <input
                ref={backupFileRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={async (ev) => {
                  const file = ev.target.files?.[0]
                  if (!file) return
                  try {
                    const parsed = JSON.parse(await file.text())
                    const res = await fetch("/api/progress", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(parsed),
                    })
                    const data = await res.json()
                    flash(
                      res.ok
                        ? `Imported ${data.totalProblemsTracked} problems.` +
                            (data.rejectedEntries ? ` ${data.rejectedEntries} invalid entries skipped.` : "")
                        : "That file could not be imported."
                    )
                    await useProgressStore.getState().syncWithDisk()
                  } catch {
                    flash("That file could not be read as a backup.")
                  }
                  ev.target.value = ""
                }}
              />
            </div>
          </Row>
          <Row
            label="Reset progress"
            hint="Clears solved marks. Your activity history is kept so the heatmap survives."
          >
            <button
              type="button"
              onClick={async () => {
                if (!window.confirm("Clear all solved and attempted marks? Activity history is kept.")) return
                await clearProgress(false)
                flash("Progress reset. Activity history kept.")
              }}
              className="flex items-center gap-1.5 rounded-lg border border-hard/30 bg-hard/10 px-3 py-1.5 text-xs font-medium text-hard hover:bg-hard/20"
            >
              <Trash2 className="h-3.5 w-3.5" /> Reset
            </button>
          </Row>
        </Section>

        {/* ---------------- Storage ---------------- */}
        <Section
          icon={HardDrive}
          title="Storage"
          description="Measured sizes on disk, so you never have to guess."
        >
          {storage ? (
            <>
              <Row
                label="Your data"
                hint={`${storage.events.count.toLocaleString()} activity events · ~${storage.events.bytesPerEvent || 0} bytes each`}
              >
                <span className="font-mono text-sm tabular-nums">
                  {fmtBytes(storage.userData.bytes)}
                </span>
              </Row>
              <Row
                label="Sandbox leftovers"
                hint={
                  storage.sandbox.entries > 0
                    ? `${storage.sandbox.entries} job folders still present — these should normally be 0.`
                    : "Empty, as it should be — job folders are removed after each run."
                }
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm tabular-nums">
                    {fmtBytes(storage.sandbox.bytes)}
                  </span>
                  <button
                    type="button"
                    disabled={busy === "sandbox"}
                    onClick={() => clearTarget("sandbox", "sandbox")}
                    className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-medium hover:bg-secondary/70 disabled:opacity-50"
                  >
                    Clear
                  </button>
                </div>
              </Row>
              <Row label="API cache" hint="Cached Codeforces responses. Safe to delete anytime.">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm tabular-nums">
                    {fmtBytes(storage.cache.bytes)}
                  </span>
                  <button
                    type="button"
                    disabled={busy === "cache"}
                    onClick={() => clearTarget("cache", "API cache")}
                    className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-medium hover:bg-secondary/70 disabled:opacity-50"
                  >
                    Clear
                  </button>
                </div>
              </Row>
              <Row
                label="Build cache"
                hint="The .next folder. By far the largest removable directory; it rebuilds on next start."
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm tabular-nums">
                    {fmtBytes(storage.next.bytes)}
                  </span>
                  <button
                    type="button"
                    disabled={busy === "next"}
                    onClick={() => clearTarget("next", "build cache")}
                    className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-medium hover:bg-secondary/70 disabled:opacity-50"
                  >
                    Clear
                  </button>
                </div>
              </Row>
              <div className="px-5 py-3 text-xs text-muted-foreground">
                Your activity log is deliberately not offered for deletion — at roughly
                100&nbsp;bytes per event it costs almost nothing, and erasing it would wipe
                your streak and heatmap history.
              </div>
            </>
          ) : (
            <div className="px-5 py-6 text-center text-xs text-muted-foreground">
              Measuring…
            </div>
          )}
        </Section>

        {/* ---------------- Reset ---------------- */}
        <div className="flex justify-end pb-4">
          <button
            type="button"
            onClick={async () => {
              if (!window.confirm("Restore every setting to its default?")) return
              await reset()
              flash("Settings restored to defaults.")
            }}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Restore all defaults
          </button>
        </div>

        <p className="pb-8 text-center text-xs text-muted-foreground">
          Settings are stored in{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[11px]">
            user_data/settings.json
          </code>
          {DEFAULT_SETTINGS.version ? "" : null}
        </p>
      </main>
    </div>
  )
}
