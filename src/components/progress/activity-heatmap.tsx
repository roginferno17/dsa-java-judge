"use client"

import { useMemo, useState } from "react"

/**
 * GitHub-style activity calendar.
 *
 * Plain SVG on purpose: this is a grid of rectangles, so a charting library would
 * be pure weight, and hand-drawing it lets every colour come from a theme token
 * (a library would need its palette re-plumbed for the custom theme).
 */

const DAY_MS = 86_400_000
const CELL = 11
const GAP = 3
const WEEKS = 53

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

/** YYYY-MM-DD from a Date, in local terms (the dates handed in are already bucketed). */
function key(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`
}

function intensity(count: number, max: number): number {
  if (count <= 0) return 0
  if (max <= 1) return 4
  const ratio = count / max
  if (ratio > 0.75) return 4
  if (ratio > 0.5) return 3
  if (ratio > 0.25) return 2
  return 1
}

export function ActivityHeatmap({
  perDay,
  className = "",
}: {
  perDay: Record<string, number>
  className?: string
}) {
  const [hover, setHover] = useState<{ date: string; count: number } | null>(null)

  const { cells, monthTicks, max, totalInWindow } = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // End on the Saturday of the current week so the grid ends flush.
    const end = new Date(today.getTime() + (6 - today.getDay()) * DAY_MS)
    const start = new Date(end.getTime() - (WEEKS * 7 - 1) * DAY_MS)

    const out: { x: number; y: number; date: string; count: number; future: boolean }[] = []
    const ticks: { x: number; label: string }[] = []
    let seenMonth = -1
    let maxCount = 0
    let total = 0

    for (let i = 0; i < WEEKS * 7; i++) {
      const d = new Date(start.getTime() + i * DAY_MS)
      const k = key(d)
      const count = perDay[k] ?? 0
      const week = Math.floor(i / 7)
      const day = i % 7

      if (count > maxCount) maxCount = count
      total += count

      if (d.getDate() <= 7 && d.getMonth() !== seenMonth && day === 0) {
        seenMonth = d.getMonth()
        ticks.push({ x: week * (CELL + GAP), label: MONTH_LABELS[d.getMonth()] })
      }

      out.push({
        x: week * (CELL + GAP),
        y: day * (CELL + GAP),
        date: k,
        count,
        future: d.getTime() > today.getTime(),
      })
    }

    return { cells: out, monthTicks: ticks, max: maxCount, totalInWindow: total }
  }, [perDay])

  const width = WEEKS * (CELL + GAP)
  const height = 7 * (CELL + GAP)

  const fillFor = (level: number) =>
    level === 0 ? "var(--secondary)" : "var(--easy)"
  const opacityFor = (level: number) =>
    level === 0 ? 1 : 0.25 + level * 0.1875

  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-xs text-muted-foreground">
          {totalInWindow} {totalInWindow === 1 ? "problem" : "problems"} solved in the last year
        </span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {hover ? (
            <>
              <strong className="text-foreground">
                {hover.count} {hover.count === 1 ? "problem" : "problems"}
              </strong>{" "}
              on {hover.date}
            </>
          ) : (
            "Hover a day for details"
          )}
        </span>
      </div>

      <div className="overflow-x-auto pb-1">
        <svg
          width={width}
          height={height + 16}
          viewBox={`0 0 ${width} ${height + 16}`}
          role="img"
          aria-label={`Activity calendar: ${totalInWindow} problems solved in the last year`}
          className="block"
        >
          {monthTicks.map((t, i) => (
            <text
              key={i}
              x={t.x}
              y={9}
              fill="var(--muted-foreground)"
              fontSize={9}
              fontFamily="var(--font-mono, monospace)"
            >
              {t.label}
            </text>
          ))}

          <g transform="translate(0, 16)">
            {cells.map((c) => {
              const level = intensity(c.count, max)
              return (
                <rect
                  key={c.date}
                  x={c.x}
                  y={c.y}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  fill={c.future ? "transparent" : fillFor(level)}
                  fillOpacity={c.future ? 0 : opacityFor(level)}
                  stroke={c.future ? "none" : "var(--border)"}
                  strokeWidth={level === 0 ? 0.5 : 0}
                  onMouseEnter={() =>
                    !c.future && setHover({ date: c.date, count: c.count })
                  }
                  onMouseLeave={() => setHover(null)}
                >
                  {!c.future && (
                    <title>
                      {c.count === 0
                        ? `No problems solved on ${c.date}`
                        : `${c.count} solved on ${c.date}`}
                    </title>
                  )}
                </rect>
              )
            })}
          </g>
        </svg>
      </div>

      <div className="mt-1.5 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <span
            key={l}
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{
              background: fillFor(l),
              opacity: opacityFor(l),
              border: l === 0 ? "0.5px solid var(--border)" : "none",
            }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
