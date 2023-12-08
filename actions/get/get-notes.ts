'use server'
import db from '@/lib/db'

// TODO: get notes related to current user
export async function getNotes() {
  try {
    const notes = await db.note.findMany()
    return { success: notes }
  } catch (e) {
    return { error: 'Failed to get notes' }
  }
}
