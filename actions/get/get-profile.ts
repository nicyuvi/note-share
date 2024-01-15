'use server'
import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Prisma } from '@prisma/client'
import { PRISMA_ERRORS } from '@/lib/constants'

const ERROR_MESSAGE = 'Failed to get profile'

export async function getProfile() {
  try {
    const { userId } = auth()
    if (userId === null) throw new Error()
    const profile = await db.profile.findUniqueOrThrow({
      where: {
        userId,
      },
    })
    return { success: profile }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === PRISMA_ERRORS.P2025.name) {
        console.log(PRISMA_ERRORS.P2025.message)
        return { error: e.code }
      }
    }
    return { error: ERROR_MESSAGE }
  }
}
