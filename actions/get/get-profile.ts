'use server'
import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Prisma } from '@prisma/client'

const ERROR_MESSAGE = 'Failed to get profile'

export async function getProfile() {
  try {
    const { userId } = auth()
    if (userId === null) throw new Error()
    const profile = await db.profile.findUnique({
      where: {
        userId,
      },
    })
    return { success: profile }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors
      console.log(e.code)
    }
    // console.log('hello me', e)
    return { error: ERROR_MESSAGE }
  }
}
