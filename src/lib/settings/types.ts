/**
 * Every setting here is read by the app. Nothing is aspirational.
 */

export type ThemePreset = "light" | "dark" | "blue" | "custom"
export type EditorTheme = "follow" | "vs-dark" | "vs" | "hc-black"
export type CodeforcesOpenMode = "tab" | "window" | "ask"
export type ProblemMode = "learn" | "test"

/** The colour tokens a custom theme may override, keyed by CSS variable name. */
export const CUSTOM_TOKENS = [
  "background",
  "foreground",
  "card",
  "border",
  "primary",
  "primary-foreground",
  "secondary",
  "muted-foreground",
  "easy",
  "medium",
  "hard",
  "editor-bg",
] as const

export type CustomTokenName = (typeof CUSTOM_TOKENS)[number]
export type CustomTheme = Partial<Record<CustomTokenName, string>>

export interface AppearanceSettings {
  theme: ThemePreset
  custom: CustomTheme
  /** Corner radius in rem, applied through --radius. */
  radius: number
  uiFontFamily: string
  uiFontSize: number
  /** Initial split percentages for the problem workspace. */
  panelSplitH: number
  panelSplitV: number
}

export interface EditorSettings {
  fontFamily: string
  fontSize: number
  tabSize: number
  wordWrap: boolean
  minimap: boolean
  lineNumbers: boolean
  bracketColorization: boolean
  theme: EditorTheme
  autoSaveDrafts: boolean
  defaultMode: ProblemMode
}

export interface JudgeSettings {
  timeLimitMs: number
  memoryLimitMb: number
  stopOnFirstFailure: boolean
  /** 0 disables. Otherwise hidden case details unlock after this many failed submits. */
  revealHiddenAfter: number
}

export interface PracticeSettings {
  codeforcesOpenMode: CodeforcesOpenMode
  /** Inclusive Codeforces rating band used to pick suggested practice problems. */
  cfRatingMin: number
  cfRatingMax: number
  showPracticeLinks: boolean
}

export interface CurriculumSettings {
  /** Hide problems that have no judge harness yet. */
  hideUnauthored: boolean
  difficultyFilter: "ALL" | "EASY" | "MEDIUM" | "HARD"
}

export interface DataSettings {
  /** IANA zone. The streak's day boundary depends on it. */
  timeZone: string
  showStreak: boolean
}

export interface AppSettings {
  version: string
  appearance: AppearanceSettings
  editor: EditorSettings
  judge: JudgeSettings
  practice: PracticeSettings
  curriculum: CurriculumSettings
  data: DataSettings
}

export const DEFAULT_SETTINGS: AppSettings = {
  version: "1.0",
  appearance: {
    theme: "dark",
    custom: {},
    radius: 0.5,
    uiFontFamily: "",
    uiFontSize: 16,
    panelSplitH: 40,
    panelSplitV: 55,
  },
  editor: {
    fontFamily: "",
    fontSize: 14,
    tabSize: 4,
    wordWrap: true,
    minimap: false,
    lineNumbers: true,
    bracketColorization: true,
    theme: "follow",
    autoSaveDrafts: true,
    defaultMode: "test",
  },
  judge: {
    timeLimitMs: 5000,
    memoryLimitMb: 256,
    stopOnFirstFailure: false,
    revealHiddenAfter: 0,
  },
  practice: {
    codeforcesOpenMode: "tab",
    cfRatingMin: 800,
    cfRatingMax: 1600,
    showPracticeLinks: true,
  },
  curriculum: {
    hideUnauthored: false,
    difficultyFilter: "ALL",
  },
  data: {
    timeZone: "",
    showStreak: true,
  },
}

const HEX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

const num = (v: unknown, lo: number, hi: number, dflt: number): number => {
  const n = typeof v === "number" && Number.isFinite(v) ? v : dflt
  return Math.min(Math.max(n, lo), hi)
}

const oneOf = <T extends string>(v: unknown, allowed: readonly T[], dflt: T): T =>
  allowed.includes(v as T) ? (v as T) : dflt

const bool = (v: unknown, dflt: boolean): boolean => (typeof v === "boolean" ? v : dflt)

/** Font families reach a style attribute, so keep them to a safe character set. */
const fontFamily = (v: unknown): string =>
  typeof v === "string" && /^[\w\s,'"-]{0,120}$/.test(v) ? v.trim() : ""

export function sanitizeCustomTheme(input: unknown): CustomTheme {
  const out: CustomTheme = {}
  if (!input || typeof input !== "object") return out
  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    if (!CUSTOM_TOKENS.includes(k as CustomTokenName)) continue
    // Values are injected as CSS variables; only accept literal hex colours.
    if (typeof v === "string" && HEX.test(v)) out[k as CustomTokenName] = v
  }
  return out
}

export function isValidTimeZone(tz: unknown): tz is string {
  if (typeof tz !== "string" || !tz) return false
  try {
    new Intl.DateTimeFormat("en-CA", { timeZone: tz })
    return true
  } catch {
    return false
  }
}

/** Coerce an arbitrary parsed JSON blob into valid settings. */
export function sanitizeSettings(input: unknown): AppSettings {
  const d = DEFAULT_SETTINGS
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>
  const sec = (k: string): Record<string, unknown> =>
    (raw[k] && typeof raw[k] === "object" ? raw[k] : {}) as Record<string, unknown>

  const a = sec("appearance")
  const e = sec("editor")
  const j = sec("judge")
  const p = sec("practice")
  const c = sec("curriculum")
  const dt = sec("data")

  const cfMin = num(p.cfRatingMin, 800, 3500, d.practice.cfRatingMin)
  const cfMax = num(p.cfRatingMax, 800, 3500, d.practice.cfRatingMax)

  return {
    version: "1.0",
    appearance: {
      theme: oneOf(a.theme, ["light", "dark", "blue", "custom"] as const, d.appearance.theme),
      custom: sanitizeCustomTheme(a.custom),
      radius: num(a.radius, 0, 2, d.appearance.radius),
      uiFontFamily: fontFamily(a.uiFontFamily),
      uiFontSize: num(a.uiFontSize, 12, 22, d.appearance.uiFontSize),
      panelSplitH: num(a.panelSplitH, 20, 80, d.appearance.panelSplitH),
      panelSplitV: num(a.panelSplitV, 20, 80, d.appearance.panelSplitV),
    },
    editor: {
      fontFamily: fontFamily(e.fontFamily),
      fontSize: num(e.fontSize, 10, 28, d.editor.fontSize),
      tabSize: oneOf(e.tabSize as never, [2, 4] as never[], d.editor.tabSize as never) as number,
      wordWrap: bool(e.wordWrap, d.editor.wordWrap),
      minimap: bool(e.minimap, d.editor.minimap),
      lineNumbers: bool(e.lineNumbers, d.editor.lineNumbers),
      bracketColorization: bool(e.bracketColorization, d.editor.bracketColorization),
      theme: oneOf(e.theme, ["follow", "vs-dark", "vs", "hc-black"] as const, d.editor.theme),
      autoSaveDrafts: bool(e.autoSaveDrafts, d.editor.autoSaveDrafts),
      defaultMode: oneOf(e.defaultMode, ["learn", "test"] as const, d.editor.defaultMode),
    },
    judge: {
      timeLimitMs: num(j.timeLimitMs, 1000, 15000, d.judge.timeLimitMs),
      memoryLimitMb: num(j.memoryLimitMb, 64, 1024, d.judge.memoryLimitMb),
      stopOnFirstFailure: bool(j.stopOnFirstFailure, d.judge.stopOnFirstFailure),
      revealHiddenAfter: num(j.revealHiddenAfter, 0, 20, d.judge.revealHiddenAfter),
    },
    practice: {
      codeforcesOpenMode: oneOf(
        p.codeforcesOpenMode,
        ["tab", "window", "ask"] as const,
        d.practice.codeforcesOpenMode
      ),
      cfRatingMin: Math.min(cfMin, cfMax),
      cfRatingMax: Math.max(cfMin, cfMax),
      showPracticeLinks: bool(p.showPracticeLinks, d.practice.showPracticeLinks),
    },
    curriculum: {
      hideUnauthored: bool(c.hideUnauthored, d.curriculum.hideUnauthored),
      difficultyFilter: oneOf(
        c.difficultyFilter,
        ["ALL", "EASY", "MEDIUM", "HARD"] as const,
        d.curriculum.difficultyFilter
      ),
    },
    data: {
      timeZone: isValidTimeZone(dt.timeZone) ? dt.timeZone : "",
      showStreak: bool(dt.showStreak, d.data.showStreak),
    },
  }
}

/** Inline CSS variables for the custom theme, plus radius and font overrides. */
export function themeStyleVars(appearance: AppearanceSettings): Record<string, string> {
  const vars: Record<string, string> = {
    "--radius": `${appearance.radius}rem`,
    "--ui-font-size": `${appearance.uiFontSize}px`,
  }
  if (appearance.uiFontFamily) vars["--ui-font-family"] = appearance.uiFontFamily
  if (appearance.theme === "custom") {
    for (const [k, v] of Object.entries(appearance.custom)) {
      if (v) vars[`--${k}`] = v
    }
  }
  return vars
}
