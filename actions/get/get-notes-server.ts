'use server'
import db from '@/lib/db'
import { getProfile } from './get-profile'
import { Profile } from '@prisma/client'

// get notes related to current serverId view

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
