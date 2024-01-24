'use server'
import db from '@/lib/db'
import { Prisma } from '@prisma/client'
import { PRISMA_ERRORS } from '@/lib/constants'
import { getProfile } from '@/actions/get/get-profile'

const ERROR_MESSAGE = 'Failed to get current member'

export async function getCurrentMemberInServer(serverId: number) {
  const res = await getProfile()
  if (res.error) throw new Error()
  const profileId = res.success?.id

  try {
    const member = await db.member.findFirstOrThrow({
      where: {
        AND: [
          {
            serverId: {
              equals: serverId,
            },
          },
          {
            profileId: {
              equals: profileId,
            },
          },
        ],
      },
    })
    return { success: member }
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
