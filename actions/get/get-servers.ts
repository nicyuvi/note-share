'use server'
import db from '@/lib/db'
import { getProfile } from './get-profile'
import { Profile } from '@prisma/client'
import { Prisma } from '@prisma/client'

// get all servers the current user is a member of
const ERROR_MESSAGE = 'Failed to get servers'

export async function getServers() {
  try {
    const response = await getProfile()
    if (response.error) throw new Error()
    const profile = response.success as Profile
    const servers = await db.server.findMany({
      where: {
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    })
    return { success: servers }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors
      console.log(e.code)
    }
    return { error: ERROR_MESSAGE }
  }
}
