"use client"

import { motion } from "framer-motion"
import {
  Code2,
  BookOpen,
  Trophy,
  ArrowRight,
  Zap,
  Target,
  GraduationCap,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { UserMenu } from "@/components/auth/user-menu"

const stats = [
  { label: "Problems", value: "474", icon: Code2 },
  { label: "Topics", value: "18", icon: BookOpen },
  { label: "Difficulty Levels", value: "3", icon: Target },
]

const features = [
  {
    icon: GraduationCap,
    title: "Learn Before You Code",
    description:
      "Understand concepts, approaches, and common mistakes before attempting any problem.",
  },
  {
    icon: Code2,
    title: "Java Code Judge",
    description:
      "Write, compile, and test your Java solutions with our integrated code judge.",
  },
  {
    icon: Trophy,
    title: "Track Your Progress",
    description:
      "Monitor your journey through the Striver A2Z sheet with detailed progress analytics.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description:
      "Get real-time results on test cases with execution time and memory usage.",
  },
]

const steps = [
  {
    number: "01",
    title: "Learn the Basics",
    description: "Data types, loops, recursion, and foundational concepts",
    problemCount: 31,
  },
  {
    number: "02",
    title: "Sorting Techniques",
    description: "Selection, Bubble, Insertion, Merge, and Quick Sort",
    problemCount: 7,
  },
  {
    number: "03",
    title: "Arrays",
    description: "Easy to Hard array problems and matrix operations",
    problemCount: 40,
  },
  {
    number: "04",
    title: "Binary Search",
    description: "1D, 2D arrays, and search space problems",
    problemCount: 32,
  },
  {
    number: "05",
    title: "Strings",
    description: "Basic and medium string manipulation problems",
    problemCount: 15,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Code2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">DSA Java Judge</span>
          </div>
          <div className="flex items-center gap-4">
            <UserMenu />
            <Link
              href="/roadmap"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-easy animate-pulse" />
              Based on Striver A2Z DSA Sheet
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Master DSA with{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Java
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              A complete learning ecosystem that combines structured curriculum,
              interactive coding, and progress tracking. Learn concepts first,
              then solve problems.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/roadmap"
                className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
              >
                Begin Your Journey
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-8 py-3 text-base font-semibold transition-colors hover:bg-secondary/80"
              >
                View Original Sheet
                <ChevronRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Why DSA Java Judge?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Built for beginners who want to learn DSA the right way — with
              understanding, not memorization.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={item}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Roadmap Preview */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Your Learning Path
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Follow the proven Striver A2Z structure — 18 steps from basics to
              advanced topics.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={item}
                className="group flex items-center gap-6 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <div className="text-lg font-semibold">{step.problemCount}</div>
                  <div className="text-xs text-muted-foreground">problems</div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 text-center">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              View all 18 steps
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Ready to Start?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Begin your DSA journey today. No account required to explore the
              curriculum.
            </p>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
            >
              Start Learning Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">
          <p>
            DSA Java Judge — Built with Next.js, Tailwind CSS, and Prisma
          </p>
          <p className="mt-2">
            Curriculum based on{" "}
            <a
              href="https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Striver&apos;s A2Z DSA Sheet
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
