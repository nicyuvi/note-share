'use server'
import db from '@/lib/db'
import { auth } from '@clerk/nextjs'

const ERROR_MESSAGE = 'Failed to get profile'

export async function getProfile() {
  const { userId } = auth()
  if (!userId) return { error: ERROR_MESSAGE }

  try {
    const profile = await db.profile.findUnique({
      where: {
        userId,
      },
    })
    return { success: profile }
  } catch (e) {
    return { error: ERROR_MESSAGE }
  }
}
