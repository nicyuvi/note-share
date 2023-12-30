'use server'
import db from '@/lib/db'

export async function getNotesServer(serverId: number) {
  try {
    const servers = await db.note.findMany({
      where: {
        serverId,
      },
    })
    return { success: servers }
  } catch (e) {
    return { error: 'Failed to get servers' }
  }
}
