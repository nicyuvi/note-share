'use server'
import db from '@/lib/db'
import { Prisma } from '@prisma/client'
import { PRISMA_ERRORS } from '@/lib/constants'

const ERROR_MESSAGE = 'Failed to get server'

export async function getServerByInvite(inviteCode: string) {
  try {
    const server = await db.server.findUniqueOrThrow({
      where: {
        inviteCode,
      },
    })
    return { success: server }
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
