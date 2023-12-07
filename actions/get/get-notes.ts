'use server'
import db from '@/lib/db'

export async function getNotes() {
  try {
    const notes = await db.note.findMany()
    return { success: notes }
  } catch (e) {
    return { error: 'Failed to get notes' }
  }
}
