'use server'
import db from '@/lib/db'

export async function getNote(id: number) {
  try {
    const note = await db.note.findUnique({
      where: {
        id,
      },
    })
    return { note }
  } catch (e) {
    return { error: 'Failed to get note' }
  }
}
