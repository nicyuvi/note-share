'use server'
import db from '@/lib/db'

// include member list
export async function getServer(id: number) {
  try {
    const server = await db.server.findUnique({
      where: {
        id,
      },
    })
    return { success: server }
  } catch (e) {
    return { error: 'Failed to get server' }
  }
}
