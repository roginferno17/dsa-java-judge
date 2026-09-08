"use client"

import { motion } from "framer-motion"
import {
  ChevronRight,
  BookOpen,
  Code2,
  ArrowLeft,
  Coffee,
  NotebookPen,
} from "lucide-react"
import Link from "next/link"
import { curriculum, getStepProblemCount, getTotalProblemCount } from "@/lib/data/curriculum"
import { useProgressStore } from "@/lib/progress/store"
import { NavActions } from "@/components/layout/nav-actions"
import { useHydrated } from "@/lib/hooks/use-hydrated"
import { StreakStrip } from "@/components/progress/streak-strip"
import { ProblemSearch } from "@/components/search/problem-search"

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

export default function RoadmapPage() {
  const totalProblems = getTotalProblemCount()
  const hydrated = useHydrated()
  const { getOverallProgress, getStepProgress } = useProgressStore()
  const overall = getOverallProgress(totalProblems)
  const solvedCount = hydrated ? overall.solved : 0
  const completionPercentage = hydrated ? overall.percentage : 0

  return (
    <div className="min-h-screen">
      {/* Navigation */}
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
          <div className="flex items-center gap-3">
            <div className="hidden text-sm text-muted-foreground sm:block" suppressHydrationWarning>
              {solvedCount}/{totalProblems} solved • {completionPercentage}% complete
            </div>
            <NavActions />
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
            Striver&apos;s A2Z DSA Sheet
          </div>
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
            Learning Roadmap
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            A structured path from basics to advanced DSA concepts. Follow the
            proven Striver A2Z curriculum to master Data Structures and
            Algorithms.
          </p>
        </motion.div>

        {/* Overall Stats */}
        {/* Streak, activity calendar and completion, derived from the activity log. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <StreakStrip totalProblems={totalProblems} />
        </motion.div>

        {/* Search across every problem, plus a jump to the next unsolved one. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <ProblemSearch />
        </motion.div>

        {/* Notes are stored per problem, so a collected view is the only way to
            read them back. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.17 }}
          className="mb-8"
        >
          <Link
            href="/notes"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <NotebookPen className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold">Your Notes</h2>
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Everything you have written, with the problem and the date. Export it all as one
                Markdown file.
              </p>
            </div>
          </Link>
        </motion.div>

        {/* The Java track sits before the problems for anyone still learning the
            language rather than the algorithms. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Link
            href="/learn/java"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Coffee className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold">Java Syntax Track</h2>
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Enough Java to write the solutions — overflow, collections, boxing traps, recursion
                depth. Every snippet runs.
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Steps List */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {curriculum.map((step) => {
            const problemCount = getStepProblemCount(step.stepNumber)
            const stepSlugs = step.topics.flatMap(t => t.problems.map(p => p.slug))
            const stepProgress = getStepProgress(step.stepNumber, stepSlugs)
            const stepSolved = hydrated ? stepProgress.solved : 0
            const stepPercentage = hydrated ? stepProgress.percentage : 0
            const easyCount = step.topics.reduce(
              (acc, topic) =>
                acc + topic.problems.filter((p) => p.difficulty === "EASY").length,
              0
            )
            const mediumCount = step.topics.reduce(
              (acc, topic) =>
                acc + topic.problems.filter((p) => p.difficulty === "MEDIUM").length,
              0
            )
            const hardCount = step.topics.reduce(
              (acc, topic) =>
                acc + topic.problems.filter((p) => p.difficulty === "HARD").length,
              0
            )

            return (
              <motion.div key={step.stepNumber} variants={item}>
                <Link
                  href={`/roadmap/${step.slug}`}
                  className="group block rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-start gap-4">
                    {/* Step Number */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {String(step.stepNumber).padStart(2, "0")}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex items-center gap-2">
                        <h2 className="text-lg font-semibold truncate">
                          {step.title}
                        </h2>
                        <ChevronRight className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                        {step.description}
                      </p>

                      {/* Stats Row */}
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Code2 className="h-4 w-4" />
                          {problemCount} problems
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-easy/10 px-2 py-0.5 text-xs font-medium text-easy">
                            {easyCount} Easy
                          </span>
                          <span className="rounded-full bg-medium/10 px-2 py-0.5 text-xs font-medium text-medium">
                            {mediumCount} Medium
                          </span>
                          <span className="rounded-full bg-hard/10 px-2 py-0.5 text-xs font-medium text-hard">
                            {hardCount} Hard
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {stepSolved > 0 && (
                        <div className="mt-3">
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="text-muted-foreground" suppressHydrationWarning>
                              {stepSolved}/{stepProgress.total} solved ({stepPercentage}%)
                            </span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                            <div
                              className="h-full bg-easy transition-all duration-500"
                              style={{ width: `${stepPercentage}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Topics Preview */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {step.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic.slug}
                            className="rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground"
                          >
                            {topic.title}
                          </span>
                        ))}
                        {step.topics.length > 3 && (
                          <span className="rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground">
                            +{step.topics.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 rounded-xl border border-border bg-secondary/30 p-6 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Based on{" "}
            <a
              href="https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Striver&apos;s A2Z DSA Sheet
            </a>{" "}
            by Raj Vikramaditya. The curriculum preserves the original learning
            philosophy and problem progression.
          </p>
        </motion.div>
      </main>
    </div>
  )
}
