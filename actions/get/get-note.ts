'use server'
import db from '@/lib/db'
import { Prisma } from '@prisma/client'
import { PRISMA_ERRORS } from '@/lib/constants'

const ERROR_MESSAGE = 'Failed to get note'

export async function getNote(id: number) {
  try {
    const note = await db.note.findUniqueOrThrow({
      where: {
        id,
      },
    })
    return { success: note }
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
