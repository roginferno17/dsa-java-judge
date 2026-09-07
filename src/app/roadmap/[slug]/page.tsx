"use client"

import { use } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ChevronRight,
  Code2,
  BookOpen,
  CheckCircle2,
  Circle,
} from "lucide-react"
import Link from "next/link"
import { curriculum, getStepProblemCount } from "@/lib/data/curriculum"
import { getDifficultyBg, formatProblemNumber } from "@/lib/utils"
import { useProgressStore } from "@/lib/progress/store"
import { UserMenu } from "@/components/layout/user-menu"
import { useHydrated } from "@/lib/hooks/use-hydrated"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function StepPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const step = curriculum.find((s) => s.slug === slug)
  const hydrated = useHydrated()

  const { getProblemStatus, toggleSolved } = useProgressStore()

  if (!step) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Step not found</h1>
          <Link href="/roadmap" className="text-primary hover:underline">
            Back to Roadmap
          </Link>
        </div>
      </div>
    )
  }

  const problemCount = getStepProblemCount(step.stepNumber)

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/roadmap"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Roadmap</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">DSA Java Judge</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-sm text-muted-foreground sm:block">
              Step {step.stepNumber} / 18
            </div>
            <UserMenu />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            Step {step.stepNumber}
          </div>
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
            {step.title}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {step.description}
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Code2 className="h-4 w-4" />
              {problemCount} problems
            </span>
            <span>{step.topics.length} topics</span>
          </div>
        </motion.div>

        {/* Topics List */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {step.topics.map((topic, topicIndex) => (
            <motion.div key={topic.slug} variants={item}>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                {/* Topic Header */}
                <div className="border-b border-border bg-secondary/30 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                        {String(topicIndex + 1).padStart(2, "0")}
                      </div>
                      <h2 className="text-lg font-semibold">{topic.title}</h2>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {topic.problems.length} problems
                    </span>
                  </div>
                </div>

                {/* Problems Table */}
                <div className="divide-y divide-border">
                  {topic.problems.map((problem) => (
                    <Link
                      key={problem.slug}
                      href={`/problem/${problem.slug}`}
                      className="group flex items-center gap-4 px-6 py-3 transition-colors hover:bg-secondary/50"
                    >
                      {/* Problem Number */}
                      <span className="w-12 flex-shrink-0 text-sm text-muted-foreground font-mono">
                        {formatProblemNumber(problem.number)}
                      </span>

                      {/* Status Toggle Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleSolved(problem.slug)
                        }}
                        className="p-1 -m-1 rounded-lg hover:bg-secondary transition-all group/btn"
                        title={
                          (hydrated ? getProblemStatus(problem.slug).status : "NOT_STARTED") === "SOLVED"
                            ? "Click to mark as not completed"
                            : "Click to mark as completed"
                        }
                      >
                        {(() => {
                          const status = hydrated ? getProblemStatus(problem.slug) : { status: "NOT_STARTED", attempts: 0 }
                          if (status.status === "SOLVED") {
                            return (
                              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-easy transition-transform group-hover/btn:scale-115" />
                            )
                          }
                          if (status.status === "ATTEMPTED") {
                            return (
                              <Circle className="h-5 w-5 flex-shrink-0 text-medium fill-medium/20 transition-transform group-hover/btn:scale-115 group-hover/btn:text-easy" />
                            )
                          }
                          return (
                            <Circle className="h-5 w-5 flex-shrink-0 text-muted-foreground group-hover/btn:text-easy transition-transform group-hover/btn:scale-115" />
                          )
                        })()}
                      </button>

                      {/* Problem Title */}
                      <span className="flex-1 text-sm font-medium group-hover:text-primary">
                        {problem.title}
                      </span>

                      {/* Difficulty Badge */}
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${getDifficultyBg(problem.difficulty)}`}
                      >
                        {problem.difficulty}
                      </span>

                      {/* Arrow */}
                      <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex items-center justify-between"
        >
          {step.stepNumber > 1 && (
            <Link
              href={`/roadmap/${curriculum.find(s => s.stepNumber === step.stepNumber - 1)?.slug}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous: {curriculum.find(s => s.stepNumber === step.stepNumber - 1)?.title}
            </Link>
          )}
          {step.stepNumber < 18 && (
            <Link
              href={`/roadmap/${curriculum.find(s => s.stepNumber === step.stepNumber + 1)?.slug}`}
              className="ml-auto flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              Next: {curriculum.find(s => s.stepNumber === step.stepNumber + 1)?.title}
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </motion.div>
      </main>
    </div>
  )
}
