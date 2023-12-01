'use server'
import db from '@/lib/db'

export async function editNote(id: number, data: any) {
  console.log('edit note', id)
  try {
    const updateUser = await db.note.update({
      where: {
        id,
      },
      data,
    })
    // return { success: `Deleted note` }
  } catch (e) {
    console.error(e)
    // return { error: 'Failed to delete note' }
  }
}
