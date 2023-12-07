'use server'
import db from '@/lib/db'
import { auth } from '@clerk/nextjs'

export async function getProfile() {
  const { userId } = auth()
  try {
    const profile = await db.profile.findUnique({
      where: {
        userId: userId as string,
      },
    })
    return { success: profile }
  } catch (e) {
    return { error: 'Failed to get profile' }
  }
}
