import { auth } from '@clerk/nextjs'
import db from '@/lib/db'

export async function getProfile() {
  const { userId } = auth()
  try {
    const profile = await db.profile.findUnique({
      where: {
        userId: userId as string, // can't be null since this is protected page
      },
    })
    return profile
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
