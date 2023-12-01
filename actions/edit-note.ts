'use server'
import db from '@/lib/db'

export async function editNote(id: number) {
  console.log('edit note', id)
  //   try {
  //     await db.note.delete({
  //       where: {
  //         id,
  //       },
  //     })
  //     // return { success: `Deleted note` }
  //   } catch (e) {
  //     console.error(e)
  //     // return { error: 'Failed to delete note' }
  //   }
}
