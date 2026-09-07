"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ChevronRight, Code2, Coffee, PlayCircle } from "lucide-react"
import Link from "next/link"
import { javaGuide } from "@/lib/data/java-guide"
import { UserMenu } from "@/components/layout/user-menu"

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function JavaGuideIndex() {
  const totalSnippets = javaGuide.reduce((n, lesson) => n + lesson.snippets.length, 0)

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Home</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">DSA Java Judge</span>
            </div>
          </div>
          <UserMenu />
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            <Coffee className="h-4 w-4" />
            Java for DSA
          </div>
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Java Syntax Track</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Enough Java to write the solutions, and nothing else. Every one of the{" "}
            {totalSnippets} snippets runs in the same sandbox the judge uses — change a line
            and see what happens.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-10 rounded-2xl border border-border bg-secondary/30 p-5"
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            This is not a Java course. Everything here either comes up constantly while solving
            problems, or is a trap that silently gives a wrong answer — an int that overflows, an
            <code className="mx-1 font-mono text-xs text-primary">Integer</code> compared with
            <code className="mx-1 font-mono text-xs text-primary">==</code>, a
            <code className="mx-1 font-mono text-xs text-primary">substring</code> inside a loop.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
          {javaGuide.map((lesson, index) => (
            <motion.div key={lesson.slug} variants={item}>
              <Link
                href={`/learn/java/${lesson.slug}`}
                className="group block rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h2 className="truncate text-lg font-semibold">{lesson.title}</h2>
                      <ChevronRight className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                      {lesson.summary}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <PlayCircle className="h-3.5 w-3.5" />
                      {lesson.snippets.length} runnable{" "}
                      {lesson.snippets.length === 1 ? "snippet" : "snippets"}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}
