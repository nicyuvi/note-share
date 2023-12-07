'use server'
import db from '@/lib/db'
import { getProfile } from './get-profile'
import { Profile } from '@prisma/client'

// get all servers the current user is a member of

export async function getServers() {
  const response = await getProfile()
  if (response.error) {
    return { error: response.error }
  }
  const profile = response.success as Profile

  try {
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
    return { error: 'Failed to get servers' }
  }
}
