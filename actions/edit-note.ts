'use server'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'

type FormData = {
  title: string
  content: string
}

export async function editNote(noteId: number, formData: FormData) {
  try {
    const updateNote = await db.note.update({
      where: {
        id: noteId,
      },
      data: formData,
    })
    revalidatePath('/')
    return { success: `Successfully updated note ${updateNote.title}` }
  } catch (e) {
    console.error(e)
    return { error: 'Failed to update note' }
  }
}
