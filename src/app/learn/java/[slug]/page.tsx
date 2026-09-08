"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ChevronLeft, ChevronRight, Code2, Lightbulb } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { javaGuide, getJavaLesson } from "@/lib/data/java-guide"
import { RunnableSnippet } from "@/components/learn/runnable-snippet"
import { NavActions } from "@/components/layout/nav-actions"
import { BackButton } from "@/components/layout/back-button"

export default function JavaLessonPage() {
  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : ""
  const lesson = getJavaLesson(slug)

  const index = javaGuide.findIndex((l) => l.slug === slug)
  const previous = index > 0 ? javaGuide[index - 1] : null
  const next = index >= 0 && index < javaGuide.length - 1 ? javaGuide[index + 1] : null

  if (!lesson) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="mb-2 text-2xl font-bold">No such lesson</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            There is no Java lesson called &ldquo;{slug}&rdquo;.
          </p>
          <Link
            href="/learn/java"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to the track
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex min-w-0 items-center gap-4">
            <BackButton fallbackHref="/learn/java" label="Back" />
            <div className="h-4 w-px bg-border" />
            <Link href="/learn/java" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="truncate text-lg font-bold">Java Syntax Track</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:block">
              {index + 1} / {javaGuide.length}
            </span>
            <NavActions />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">{lesson.title}</h1>
          <p className="mb-8 text-lg text-muted-foreground">{lesson.summary}</p>

          <div className="mb-10 space-y-4">
            {lesson.body.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-foreground/90">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {lesson.snippets.map((snippet) => (
            <RunnableSnippet key={snippet.title} snippet={snippet} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 rounded-2xl border border-border bg-secondary/30 p-5"
        >
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Lightbulb className="h-4 w-4 text-amber-400" />
            Worth remembering
          </div>
          <ul className="space-y-2">
            {lesson.remember.map((point, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                <span className="text-primary">·</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="mt-10 flex items-center justify-between gap-3">
          {previous ? (
            <Link
              href={`/learn/java/${previous.slug}`}
              className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm transition-colors hover:border-primary/50"
            >
              <ChevronLeft className="h-4 w-4 flex-shrink-0 text-primary" />
              <span className="truncate">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/learn/java/${next.slug}`}
              className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm transition-colors hover:border-primary/50"
            >
              <span className="truncate">{next.title}</span>
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-primary" />
            </Link>
          ) : (
            <Link
              href="/roadmap"
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start the roadmap
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
