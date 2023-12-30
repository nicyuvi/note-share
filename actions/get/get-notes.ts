'use server'
import db from '@/lib/db'
import { auth } from '@clerk/nextjs'

export async function getNotes() {
  const { userId } = auth()
  if (!userId) throw new Error()

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
