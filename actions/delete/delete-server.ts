'use server'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'
import { PRISMA_ERRORS } from '@/lib/constants'

export async function deleteServer(id: number) {
  try {
    await db.server.delete({
      where: {
        id,
      },
    })
    revalidatePath('/')
    return { success: `Deleted server ${id}` }
  } catch (e) {
    console.log(e)
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === PRISMA_ERRORS.P2003.name) {
        console.log(PRISMA_ERRORS.P2003.message)
        return { error: e.code }
      }
    }
    return { error: 'Failed to delete server' }
  }
}
