'use server'
import db from '@/lib/db'

export async function getNotesServer(serverId: number) {
  try {
    const notes = await db.note.findMany({
      where: {
        serverId,
      },
    })
    return { success: notes }
  } catch (e) {
    return { error: 'Failed to get notes' }
  }
}
