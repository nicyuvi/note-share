'use server'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function deleteNote(id: number) {
  try {
    await db.note.delete({
      where: {
        id,
      },
    })
    revalidatePath('/')
    return { success: `Deleted note` }
  } catch (e) {
    return { error: 'Failed to delete note' }
  }
}
