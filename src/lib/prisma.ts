// Prisma Client singleton
// 
// IMPORTANT: Run these commands to set up the database:
// 1. docker-compose up -d (starts PostgreSQL)
// 2. npx prisma generate (generates Prisma Client)
// 3. npx prisma db push (syncs schema to database)
//
// For now, we export a placeholder that will work after setup.

let prisma: any

if (typeof window === 'undefined') {
  // Server-side only
  const { PrismaClient } = require('@prisma/client')
  const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined
  }
  prisma = globalForPrisma.prisma ?? new PrismaClient()
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
}

export { prisma }
export default prisma
