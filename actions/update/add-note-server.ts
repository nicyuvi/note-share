'use server'
import db from '@/lib/db'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const ERROR_MESSAGE = 'Failed to add note'

export async function addNoteToServer(noteId: number, serverId: number) {
  const data = { serverId }
  try {
    const updatedNote = await db.note.update({
      where: {
        id: noteId,
      },
      data,
    })
    revalidatePath(`/server/${serverId}`)
    return { success: `Successfully added note ${updatedNote.title}` }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e.code)
      return { error: e.code }
    }
    return { error: ERROR_MESSAGE }
  }
}
