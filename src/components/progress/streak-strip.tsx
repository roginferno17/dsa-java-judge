"use client"

import { Flame, Trophy, CalendarCheck, Target } from "lucide-react"
import { ActivityHeatmap } from "@/components/progress/activity-heatmap"
import { useProgressStore } from "@/lib/progress/store"
import { useSettingsStore } from "@/lib/settings/store"
import { useHydrated } from "@/lib/hooks/use-hydrated"

function Stat({
  icon: Icon,
  value,
  label,
  hint,
  tone = "default",
}: {
  icon: React.ElementType
  value: string | number
  label: string
  hint?: string
  tone?: "default" | "active" | "muted"
}) {
  const color =
    tone === "active"
      ? "text-medium"
      : tone === "muted"
        ? "text-muted-foreground"
        : "text-primary"
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background/50 px-4 py-3">
      <Icon className={`h-5 w-5 flex-shrink-0 ${color}`} />
      <div className="min-w-0">
        <div className="text-lg font-bold leading-tight tabular-nums" suppressHydrationWarning>
          {value}
        </div>
        <div className="text-[11px] leading-tight text-muted-foreground">{label}</div>
        {hint && <div className="mt-0.5 text-[10px] leading-tight text-muted-foreground/70">{hint}</div>}
      </div>
    </div>
  )
}

/**
 * Streak, activity calendar and completion.
 *
 * Deliberately states the streak rule rather than leaving it implicit: people quit
 * over a streak they think they lost, so "solved today" vs "still counts today" is
 * shown explicitly.
 */
export function StreakStrip({ totalProblems }: { totalProblems: number }) {
  const hydrated = useHydrated()
  const stats = useProgressStore((s) => s.stats)
  const showStreak = useSettingsStore((s) => s.settings.data.showStreak)

  if (!showStreak) return null

  // Render the frame during SSR/hydration so the page does not jump.
  const s = hydrated ? stats : null
  const current = s?.currentStreak ?? 0
  const longest = s?.longestStreak ?? 0
  const today = s?.solvedToday ?? 0
  const solved = s?.totalSolved ?? 0
  const pct = totalProblems > 0 ? Math.round((solved / totalProblems) * 100) : 0

  const streakHint =
    current === 0
      ? "Solve one to start"
      : today > 0
        ? "Extended today"
        : "Still counts until midnight"

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat
          icon={Flame}
          value={current}
          label={current === 1 ? "day streak" : "day streak"}
          hint={streakHint}
          tone={current > 0 ? "active" : "muted"}
        />
        <Stat icon={Trophy} value={longest} label="longest streak" />
        <Stat
          icon={CalendarCheck}
          value={today}
          label="solved today"
          tone={today > 0 ? "active" : "muted"}
        />
        <Stat icon={Target} value={`${solved}/${totalProblems}`} label={`${pct}% complete`} />
      </div>

      <ActivityHeatmap perDay={s?.perDay ?? {}} />
    </div>
  )
}
