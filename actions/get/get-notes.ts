'use server'
import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { getProfile } from '@/actions/get/get-profile'

export async function getNotes() {
  const res = await getProfile()
  if (res.error) throw new Error()
  const profile = res.success

  try {
    const notes = await db.note.findMany({
      where: {
        authorId: profile?.id,
      },
    })
    return { success: notes }
  } catch (e) {
    return { error: 'Failed to get notes' }
  }
}
