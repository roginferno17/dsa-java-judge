"use client"

import { useState } from "react"
import { ExternalLink, SquareArrowOutUpRight, AppWindow, X } from "lucide-react"
import { PracticeLink } from "@/lib/types/practice"
import { useSettingsStore } from "@/lib/settings/store"

const PLATFORM_LABEL: Record<PracticeLink["platform"], string> = {
  LEETCODE: "LeetCode",
  CODEFORCES: "Codeforces",
}

/** Rating/difficulty pill. Codeforces ratings are numeric, LeetCode's are words. */
function DifficultyPill({ link }: { link: PracticeLink }) {
  const d = link.difficulty.toUpperCase()
  const tone =
    d === "EASY"
      ? "bg-easy/10 text-easy border-easy/20"
      : d === "MEDIUM"
        ? "bg-medium/10 text-medium border-medium/20"
        : d === "HARD"
          ? "bg-hard/10 text-hard border-hard/20"
          : Number(link.difficulty) <= 1200
            ? "bg-easy/10 text-easy border-easy/20"
            : Number(link.difficulty) <= 1700
              ? "bg-medium/10 text-medium border-medium/20"
              : "bg-hard/10 text-hard border-hard/20"

  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${tone}`}>
      {link.difficulty}
    </span>
  )
}

function openInWindow(url: string) {
  window.open(url, "_blank", "noopener,noreferrer,width=1100,height=900")
}

function openInTab(url: string) {
  window.open(url, "_blank", "noopener,noreferrer")
}

export function PracticeCard({
  links,
  className = "",
  leetcodeTopic = null,
}: {
  links: PracticeLink[]
  className?: string
  /** Shown only when the problem has no direct LeetCode match. */
  leetcodeTopic?: { url: string; label: string } | null
}) {
  const showPracticeLinks = useSettingsStore((s) => s.settings.practice.showPracticeLinks)
  const openMode = useSettingsStore((s) => s.settings.practice.codeforcesOpenMode)
  const update = useSettingsStore((s) => s.update)
  const [asking, setAsking] = useState<PracticeLink | null>(null)
  const [remember, setRemember] = useState(false)

  if (!showPracticeLinks || (links.length === 0 && !leetcodeTopic)) return null

  const handle = (e: React.MouseEvent, link: PracticeLink) => {
    // LeetCode always just follows the link; only Codeforces is configurable.
    if (link.platform !== "CODEFORCES") return
    e.preventDefault()
    if (openMode === "ask") {
      setAsking(link)
      setRemember(false)
    } else if (openMode === "window") {
      openInWindow(link.url)
    } else {
      openInTab(link.url)
    }
  }

  const chooseAndGo = (mode: "tab" | "window") => {
    if (!asking) return
    if (remember) update({ practice: { codeforcesOpenMode: mode } })
    if (mode === "window") openInWindow(asking.url)
    else openInTab(asking.url)
    setAsking(null)
  }

  const grouped = links.reduce<Record<string, PracticeLink[]>>((acc, l) => {
    ;(acc[l.platform] ??= []).push(l)
    return acc
  }, {})

  return (
    <div className={`rounded-xl border border-border bg-secondary/20 p-4 ${className}`}>
      <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <ExternalLink className="h-3.5 w-3.5 text-primary" />
        Practice elsewhere
      </h3>

      <div className="space-y-3">
        {Object.entries(grouped).map(([platform, items]) => (
          <div key={platform}>
            <div className="mb-1.5 text-[11px] font-medium text-muted-foreground">
              {PLATFORM_LABEL[platform as PracticeLink["platform"]]}
            </div>
            <ul className="space-y-1.5">
              {items.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handle(e, link)}
                    className="group flex items-start gap-2 rounded-lg border border-border/60 bg-background px-2.5 py-2 transition-colors hover:border-primary/40"
                  >
                    <DifficultyPill link={link} />
                    <span className="min-w-0 flex-1 text-xs leading-snug group-hover:text-primary">
                      {link.title}
                      {link.note && (
                        <span className="mt-0.5 block text-[10px] leading-snug text-muted-foreground">
                          {link.note}
                        </span>
                      )}
                    </span>
                    <SquareArrowOutUpRight className="mt-0.5 h-3 w-3 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Only rendered when there is no direct match, so it never sits beside
            a real LeetCode link. Saying so beats an absent section, which reads
            as a broken feature rather than an accurate answer. */}
        {leetcodeTopic && (
          <div>
            <div className="mb-1.5 text-[11px] font-medium text-muted-foreground">LeetCode</div>
            <a
              href={leetcodeTopic.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2 rounded-lg border border-dashed border-border/60 bg-background px-2.5 py-2 transition-colors hover:border-primary/40"
            >
              <span className="min-w-0 flex-1 text-xs leading-snug text-muted-foreground group-hover:text-primary">
                No direct LeetCode equivalent for this one.
                <span className="mt-0.5 block text-[10px] leading-snug">
                  Browse all {leetcodeTopic.label} problems on LeetCode instead.
                </span>
              </span>
              <SquareArrowOutUpRight className="mt-0.5 h-3 w-3 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </div>
        )}
      </div>

      {/* "Ask each time" dialog */}
      {asking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setAsking(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 flex items-start justify-between gap-3">
              <h4 className="text-sm font-semibold">Open on Codeforces</h4>
              <button
                type="button"
                onClick={() => setAsking(null)}
                aria-label="Cancel"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">{asking.title}</p>

            <div className="mb-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => chooseAndGo("tab")}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-secondary/50 px-3 py-3 text-xs font-medium transition-colors hover:border-primary/40 hover:bg-secondary"
              >
                <SquareArrowOutUpRight className="h-4 w-4 text-primary" />
                New tab
              </button>
              <button
                type="button"
                onClick={() => chooseAndGo("window")}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-secondary/50 px-3 py-3 text-xs font-medium transition-colors hover:border-primary/40 hover:bg-secondary"
              >
                <AppWindow className="h-4 w-4 text-primary" />
                New window
              </button>
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-3.5 w-3.5 accent-[var(--primary)]"
              />
              Remember this choice
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
