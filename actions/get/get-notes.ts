'use server'
import db from '@/lib/db'
import { auth } from '@clerk/nextjs'

// TODO: get notes related to current user
export async function getNotes() {
  const { userId } = auth()
  if (!userId) return { error: 'Failed to get current user' }

  try {
    const notes = await db.note.findMany({
      where: {
        authorId: userId,
      },
    })
    return { success: notes }
  } catch (e) {
    return { error: 'Failed to get notes' }
  }
}
