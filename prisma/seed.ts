import { PrismaClient } from "@prisma/client"
import { curriculum } from "../src/lib/data/curriculum"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...\n")

  // Clear existing data
  console.log("Clearing existing data...")
  await prisma.userProgress.deleteMany()
  await prisma.userRoadmapProgress.deleteMany()
  await prisma.submission.deleteMany()
  await prisma.learnContent.deleteMany()
  await prisma.testCase.deleteMany()
  await prisma.problem.deleteMany()
  await prisma.topic.deleteMany()
  await prisma.step.deleteMany()
  console.log("✅ Cleared\n")

  let totalProblems = 0
  let totalTopics = 0

  // Seed steps, topics, and problems
  for (const stepData of curriculum) {
    console.log(`\n📚 Step ${stepData.stepNumber}: ${stepData.title}`)

    const step = await prisma.step.create({
      data: {
        stepNumber: stepData.stepNumber,
        title: stepData.title,
        slug: stepData.slug,
        description: stepData.description,
      },
    })

    for (const topicData of stepData.topics) {
      const topic = await prisma.topic.create({
        data: {
          stepId: step.id,
          topicNumber: stepData.topics.indexOf(topicData) + 1,
          title: topicData.title,
          slug: topicData.slug,
          difficulty: topicData.problems[0]?.difficulty || "EASY",
        },
      })
      totalTopics++

      for (const problemData of topicData.problems) {
        // Create problem with sample data
        await prisma.problem.create({
          data: {
            topicId: topic.id,
            problemNumber: problemData.number,
            title: problemData.title,
            slug: problemData.slug,
            difficulty: problemData.difficulty,
            description: generateDescription(problemData.title, problemData.difficulty),
            examples: generateExamples(problemData.title),
            constraints: generateConstraints(problemData.difficulty),
          },
        })
        totalProblems++
      }

      process.stdout.write(`  • ${topicData.title} (${topicData.problems.length} problems)\n`)
    }
  }

  console.log(`\n\n✅ Seeding complete!`)
  console.log(`   Steps: ${curriculum.length}`)
  console.log(`   Topics: ${totalTopics}`)
  console.log(`   Problems: ${totalProblems}`)
}

function generateDescription(title: string, difficulty: string): string {
  return `Solve the "${title}" problem. This is a ${difficulty.toLowerCase()} difficulty problem from the Striver A2Z DSA sheet.`
}

function generateExamples(title: string): any {
  return JSON.stringify([
    {
      input: "Sample input",
      output: "Sample output",
      explanation: "Explanation of the sample",
    },
  ])
}

function generateConstraints(difficulty: string): any {
  const base = [{ text: "1 ≤ n ≤ 10^5" }]
  if (difficulty === "HARD") {
    base.push({ text: "Time Limit: 2 seconds" })
  }
  return JSON.stringify(base)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
