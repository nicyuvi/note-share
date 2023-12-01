import db from '@/lib/db'

export async function getNotes() {
  try {
    const notes = await db.note.findMany()
    return notes
  } catch (e) {
    console.error(e)
    return { error: 'Failed to get notes' }
  }
}
