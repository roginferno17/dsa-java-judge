"use client"

import { Settings } from "lucide-react"
import Link from "next/link"
import { UserMenu } from "@/components/layout/user-menu"

/**
 * The cluster on the right of every page's nav bar.
 *
 * Settings sits here as its own visible control rather than inside the local-data
 * dropdown: the page had no link at all, so the only way to reach it was to type
 * the URL, which is not a setting anyone was going to find.
 */
export function NavActions() {
  return (
    <div className="flex items-center gap-2">
      <SettingsLink />
      <UserMenu />
    </div>
  )
}

/** Usable on its own where there is no UserMenu, such as the problem workspace. */
export function SettingsLink({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/settings"
      title="Settings"
      aria-label="Settings"
      className={
        compact
          ? "flex items-center rounded-lg border border-border bg-secondary/60 p-1.5 transition-all hover:border-primary/40 hover:bg-secondary active:scale-95"
          : "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-secondary/80 transition-colors hover:border-primary/40 hover:bg-secondary"
      }
    >
      <Settings className={compact ? "h-3.5 w-3.5 text-primary" : "h-4 w-4 text-muted-foreground"} />
    </Link>
  )
}
