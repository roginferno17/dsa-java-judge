"use client"

import { useState, useCallback, useRef, useEffect } from "react"

/**
 * Split panes with a draggable divider.
 *
 * Sizes persist per storageKey, so navigating between problems no longer snaps
 * the layout back to its default. Supports mouse, touch and keyboard.
 */

function readStored(key: string | undefined, fallback: number): number {
  if (!key || typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    const n = raw === null ? NaN : Number(raw)
    return Number.isFinite(n) ? n : fallback
  } catch {
    return fallback
  }
}

function writeStored(key: string | undefined, value: number) {
  if (!key || typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, String(value))
  } catch {
    /* private mode or storage full */
  }
}

interface SplitProps {
  defaultSize: number
  min: number
  max: number
  storageKey?: string
  orientation: "horizontal" | "vertical"
}

function useSplit({ defaultSize, min, max, storageKey, orientation }: SplitProps) {
  // Restored in the initialiser, not an effect: an effect would set state during
  // mount and cause a cascading render, and the panel would visibly jump from the
  // default size to the stored one. readStored returns the fallback on the server,
  // so the panes carry suppressHydrationWarning for the resulting style diff.
  const [size, setSize] = useState(() =>
    Math.min(Math.max(readStored(storageKey, defaultSize), min), max)
  )
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const clamp = useCallback((v: number) => Math.min(Math.max(v, min), max), [min, max])

  const applyFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const pct =
        orientation === "horizontal"
          ? ((clientX - rect.left) / rect.width) * 100
          : ((clientY - rect.top) / rect.height) * 100
      setSize(clamp(pct))
    },
    [clamp, orientation]
  )

  useEffect(() => {
    if (!isDragging) return

    const onMouseMove = (e: MouseEvent) => applyFromPoint(e.clientX, e.clientY)
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) {
        e.preventDefault()
        applyFromPoint(t.clientX, t.clientY)
      }
    }
    const stop = () => setIsDragging(false)

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", stop)
    document.addEventListener("touchmove", onTouchMove, { passive: false })
    document.addEventListener("touchend", stop)
    document.addEventListener("touchcancel", stop)

    const prevCursor = document.body.style.cursor
    document.body.style.cursor = orientation === "horizontal" ? "col-resize" : "row-resize"
    document.body.style.userSelect = "none"

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", stop)
      document.removeEventListener("touchmove", onTouchMove)
      document.removeEventListener("touchend", stop)
      document.removeEventListener("touchcancel", stop)
      document.body.style.cursor = prevCursor
      document.body.style.userSelect = ""
    }
  }, [isDragging, applyFromPoint, orientation])

  // Persist only once dragging stops, so we do not write on every mouse move.
  useEffect(() => {
    if (!isDragging) writeStored(storageKey, size)
  }, [isDragging, size, storageKey])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const decrease = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp"
      const increase = orientation === "horizontal" ? "ArrowRight" : "ArrowDown"
      const step = e.shiftKey ? 10 : 2
      if (e.key === decrease) {
        e.preventDefault()
        setSize((s) => clamp(s - step))
      } else if (e.key === increase) {
        e.preventDefault()
        setSize((s) => clamp(s + step))
      } else if (e.key === "Home") {
        e.preventDefault()
        setSize(clamp(defaultSize))
      }
    },
    [clamp, defaultSize, orientation]
  )

  const reset = useCallback(() => setSize(clamp(defaultSize)), [clamp, defaultSize])

  return { size, isDragging, containerRef, setIsDragging, onKeyDown, reset }
}

interface ResizablePanelProps {
  left: React.ReactNode
  right: React.ReactNode
  defaultLeftWidth?: number
  minLeftWidth?: number
  maxLeftWidth?: number
  storageKey?: string
}

export function ResizablePanel({
  left,
  right,
  defaultLeftWidth = 50,
  minLeftWidth = 25,
  maxLeftWidth = 75,
  storageKey = "panel:h",
}: ResizablePanelProps) {
  const { size, isDragging, containerRef, setIsDragging, onKeyDown, reset } = useSplit({
    defaultSize: defaultLeftWidth,
    min: minLeftWidth,
    max: maxLeftWidth,
    storageKey,
    orientation: "horizontal",
  })

  return (
    <div ref={containerRef} className="flex h-full w-full overflow-hidden">
      <div
        style={{ width: `${size}%` }}
        suppressHydrationWarning
        className="flex min-h-0 flex-col overflow-hidden"
      >
        {left}
      </div>

      <div
        role="separator"
        aria-orientation="vertical"
        aria-valuenow={Math.round(size)}
        aria-valuemin={minLeftWidth}
        aria-valuemax={maxLeftWidth}
        aria-label="Resize description and editor panels"
        tabIndex={0}
        onMouseDown={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onTouchStart={() => setIsDragging(true)}
        onDoubleClick={reset}
        onKeyDown={onKeyDown}
        title="Drag to resize · double-click to reset · arrow keys when focused"
        className={`group relative z-10 flex w-1.5 flex-shrink-0 cursor-col-resize items-center justify-center transition-colors focus:outline-none focus-visible:bg-primary ${
          isDragging ? "bg-primary/60" : "bg-border hover:bg-primary/50"
        }`}
      >
        {/* Widens the grab area without widening the visible divider. */}
        <div className="absolute inset-y-0 -left-1.5 -right-1.5" />
        <div className="h-8 w-0.5 rounded-full bg-muted-foreground/30 transition-colors group-hover:bg-primary" />
      </div>

      {/* flex-1 rather than a second percentage: width + width + divider used to
          exceed 100% and clip the right-hand pane. */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">{right}</div>
    </div>
  )
}

interface VerticalResizablePanelProps {
  top: React.ReactNode
  bottom: React.ReactNode
  defaultTopHeight?: number
  minTopHeight?: number
  maxTopHeight?: number
  storageKey?: string
}

export function VerticalResizablePanel({
  top,
  bottom,
  defaultTopHeight = 55,
  minTopHeight = 20,
  maxTopHeight = 80,
  storageKey = "panel:v",
}: VerticalResizablePanelProps) {
  const { size, isDragging, containerRef, setIsDragging, onKeyDown, reset } = useSplit({
    defaultSize: defaultTopHeight,
    min: minTopHeight,
    max: maxTopHeight,
    storageKey,
    orientation: "vertical",
  })

  return (
    <div ref={containerRef} className="flex h-full w-full flex-col overflow-hidden">
      <div
        style={{ height: `${size}%` }}
        suppressHydrationWarning
        className="flex min-h-0 flex-col overflow-hidden"
      >
        {top}
      </div>

      <div
        role="separator"
        aria-orientation="horizontal"
        aria-valuenow={Math.round(size)}
        aria-valuemin={minTopHeight}
        aria-valuemax={maxTopHeight}
        aria-label="Resize editor and results panels"
        tabIndex={0}
        onMouseDown={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onTouchStart={() => setIsDragging(true)}
        onDoubleClick={reset}
        onKeyDown={onKeyDown}
        title="Drag to resize · double-click to reset · arrow keys when focused"
        className={`group relative z-10 flex h-1.5 flex-shrink-0 cursor-row-resize items-center justify-center transition-colors focus:outline-none focus-visible:bg-primary ${
          isDragging ? "bg-primary/60" : "bg-border hover:bg-primary/50"
        }`}
      >
        <div className="absolute inset-x-0 -top-1.5 -bottom-1.5" />
        <div className="h-0.5 w-8 rounded-full bg-muted-foreground/30 transition-colors group-hover:bg-primary" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{bottom}</div>
    </div>
  )
}
