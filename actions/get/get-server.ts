'use server'
import db from '@/lib/db'

export async function getServer(id: number) {
  try {
    const server = await db.server.findUnique({
      where: {
        id,
      },
    })
    return { success: server }
  } catch (e) {
    return { error: 'Failed to get profile' }
  }
}
