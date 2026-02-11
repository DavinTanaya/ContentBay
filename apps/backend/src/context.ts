import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../prisma/generated/client'
import jwt from 'jsonwebtoken'

const pool = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter: pool })

export interface Context {
  prisma: typeof prisma
  userId: number | null
}

export function createContext({ request }: { request: Request }): Context {
  const auth = request.headers.get('authorization')

  let userId: number | null = null

  if (auth) {
    try {
      const token = auth.replace('Bearer ', '')
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
      userId = decoded.userId
    } catch (err) {
      console.warn('Invalid token')
    }
  }

  return {
    prisma,
    userId,
  }
}
