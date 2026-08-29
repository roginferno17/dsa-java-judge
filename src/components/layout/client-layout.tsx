"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useProgressStore } from "@/lib/progress/store"

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -8 },
}

const pageTransition = {
  type: "tween" as const,
  ease: "easeInOut" as const,
  duration: 0.2,
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const syncWithDisk = useProgressStore((s) => s.syncWithDisk)

  useEffect(() => {
    // Automatically synchronize with local disk file (user_data/progress.json) on startup
    syncWithDisk()
  }, [syncWithDisk])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="flex min-h-screen flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
