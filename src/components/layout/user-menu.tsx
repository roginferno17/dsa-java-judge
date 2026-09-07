"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  HardDrive,
  RefreshCw,
  Trash2,
  Download,
  ChevronDown,
  CheckCircle2,
  Database,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useProgressStore } from "@/lib/progress/store"
import { getTotalProblemCount } from "@/lib/data/curriculum"
import { useHydrated } from "@/lib/hooks/use-hydrated"

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const totalProblems = getTotalProblemCount()
  const hydrated = useHydrated()

  const {
    problems,
    isSyncing,
    isDiskSynced,
    lastSyncedAt,
    syncWithDisk,
    clearProgress,
    getOverallProgress,
  } = useProgressStore()

  const overall = getOverallProgress(totalProblems)
  const solvedCount = hydrated ? overall.solved : 0
  const completionPercentage = hydrated ? overall.percentage : 0

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleExport = () => {
    const dataStr = JSON.stringify(
      {
        version: "1.0",
        exportedAt: new Date().toISOString(),
        problems,
      },
      null,
      2
    )
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `dsa-progress-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = async () => {
    if (
      window.confirm(
        "Are you sure you want to reset all your progress? This will reset local data in user_data/progress.json."
      )
    ) {
      await clearProgress()
      setIsOpen(false)
    }
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-xl border border-border bg-secondary/80 px-3.5 py-1.5 text-sm font-medium transition-all hover:bg-secondary hover:border-primary/40"
        title="Local storage and disk sync status"
      >
        <div className="relative flex h-6 w-6 items-center justify-center rounded-lg bg-primary/20 text-primary">
          <HardDrive className="h-3.5 w-3.5" />
          <span
            className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full ring-2 ring-background ${
              hydrated && isSyncing
                ? "bg-amber-400 animate-pulse"
                : hydrated && isDiskSynced
                ? "bg-easy"
                : "bg-muted-foreground"
            }`}
          />
        </div>

        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold text-foreground leading-tight flex items-center gap-1">
            Local Data
            {hydrated && isSyncing && (
              <RefreshCw className="h-2.5 w-2.5 animate-spin text-amber-400" />
            )}
          </span>
          <span className="text-[10px] text-muted-foreground leading-tight" suppressHydrationWarning>
            {solvedCount}/{totalProblems} Solved
          </span>
        </div>

        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-border bg-card p-4 shadow-2xl z-50 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="mb-3 flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Database className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Local Storage</h4>
                  <p className="text-[11px] text-muted-foreground">
                    Offline file-based sync
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-easy/10 px-2 py-0.5 text-[10px] font-medium text-easy border border-easy/20">
                Active
              </span>
            </div>

            {/* Sync Details */}
            <div className="mb-3 space-y-1.5 rounded-xl bg-secondary/40 p-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">File Location:</span>
                <code className="text-[10px] bg-background px-1.5 py-0.5 rounded text-primary font-mono">
                  user_data/progress.json
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Sync Status:</span>
                <span className="flex items-center gap-1 font-medium text-easy">
                  <CheckCircle2 className="h-3 w-3" />
                  {isSyncing ? "Syncing..." : isDiskSynced ? "Synced to disk" : "Local only"}
                </span>
              </div>
              {lastSyncedAt && (
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Last synced:</span>
                  <span>{new Date(lastSyncedAt).toLocaleTimeString()}</span>
                </div>
              )}
            </div>

            {/* Overall Stats */}
            <div className="mb-4 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="rounded-xl border border-border/60 bg-background/50 p-2">
                <div className="text-base font-bold text-primary" suppressHydrationWarning>
                  {solvedCount}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Problems Solved
                </div>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/50 p-2">
                <div className="text-base font-bold text-foreground" suppressHydrationWarning>
                  {completionPercentage}%
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Curriculum Done
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-1 border-t border-border pt-3">
              <button
                onClick={() => {
                  syncWithDisk()
                }}
                disabled={isSyncing}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 text-primary ${
                    isSyncing ? "animate-spin" : ""
                  }`}
                />
                Sync with user_data/progress.json
              </button>

              <button
                onClick={handleExport}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
              >
                <Download className="h-3.5 w-3.5 text-blue-400" />
                Export Progress Backup (.json)
              </button>

              <button
                onClick={handleReset}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-hard hover:bg-hard/10 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5 text-hard" />
                Reset All Progress
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
