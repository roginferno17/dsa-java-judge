"use client"

import { useState, useCallback, useRef, useEffect } from "react"

interface ResizablePanelProps {
  left: React.ReactNode
  right: React.ReactNode
  defaultLeftWidth?: number // percentage 0-100
  minLeftWidth?: number
  maxLeftWidth?: number
}

export function ResizablePanel({
  left,
  right,
  defaultLeftWidth = 50,
  minLeftWidth = 25,
  maxLeftWidth = 75,
}: ResizablePanelProps) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const mouseX = e.clientX - containerRect.left
      const percentage = (mouseX / containerRect.width) * 100

      const clamped = Math.min(Math.max(percentage, minLeftWidth), maxLeftWidth)
      setLeftWidth(clamped)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.body.style.cursor = "col-resize"
    document.body.style.userSelect = "none"

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isDragging, minLeftWidth, maxLeftWidth])

  return (
    <div ref={containerRef} className="flex h-full w-full overflow-hidden">
      <div
        style={{ width: `${leftWidth}%` }}
        className="flex flex-col min-h-0 overflow-hidden"
      >
        {left}
      </div>

      <div
        onMouseDown={handleMouseDown}
        className="relative flex w-1.5 flex-shrink-0 cursor-col-resize items-center justify-center bg-border hover:bg-primary/50 transition-colors group z-10"
      >
        <div className="absolute inset-y-0 -left-1 -right-1" />
        <div className="h-8 w-0.5 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
      </div>

      <div
        style={{ width: `${100 - leftWidth}%` }}
        className="flex flex-col min-h-0 overflow-hidden"
      >
        {right}
      </div>
    </div>
  )
}

interface VerticalResizablePanelProps {
  top: React.ReactNode
  bottom: React.ReactNode
  defaultTopHeight?: number // percentage 0-100
  minTopHeight?: number
  maxTopHeight?: number
}

export function VerticalResizablePanel({
  top,
  bottom,
  defaultTopHeight = 55,
  minTopHeight = 20,
  maxTopHeight = 80,
}: VerticalResizablePanelProps) {
  const [topHeight, setTopHeight] = useState(defaultTopHeight)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const mouseY = e.clientY - containerRect.top
      const percentage = (mouseY / containerRect.height) * 100

      const clamped = Math.min(Math.max(percentage, minTopHeight), maxTopHeight)
      setTopHeight(clamped)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.body.style.cursor = "row-resize"
    document.body.style.userSelect = "none"

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isDragging, minTopHeight, maxTopHeight])

  return (
    <div ref={containerRef} className="flex h-full w-full flex-col overflow-hidden">
      <div
        style={{ height: `${topHeight}%` }}
        className="flex flex-col min-h-0 overflow-hidden"
      >
        {top}
      </div>

      <div
        onMouseDown={handleMouseDown}
        className="relative flex h-1.5 flex-shrink-0 cursor-row-resize items-center justify-center bg-border hover:bg-primary/50 transition-colors group z-10"
      >
        <div className="absolute inset-x-0 -top-1 -bottom-1" />
        <div className="h-0.5 w-8 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
      </div>

      <div
        style={{ height: `${100 - topHeight}%` }}
        className="flex flex-col min-h-0 overflow-hidden"
      >
        {bottom}
      </div>
    </div>
  )
}
