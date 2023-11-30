import { auth } from '@clerk/nextjs'
import db from '@/lib/db'

export async function getProfile() {
  const { userId } = auth()
  try {
    const profile = await db.profile.findUnique({
      where: {
        userId: userId as string,
      },
    })
    return profile
  } catch (e) {
    console.error(e)
  }
}
