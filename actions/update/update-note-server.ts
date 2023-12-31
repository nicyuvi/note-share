'use server'
import db from '@/lib/db'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function updateNoteInServer(
  noteId: number,
  data: { serverId: number | null }
) {
  try {
    const updateNote = await db.note.update({
      where: {
        id: noteId,
      },
      data,
    })
    revalidatePath(`/server/${data.serverId}`)
    if (data.serverId === null) {
      return { success: `Successfully removed note ${updateNote.title}` }
    } else {
      return { success: `Successfully added note ${updateNote.title}` }
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors
      console.log(e.code)
    }
    return { error: 'Failed to add note' }
  }
}
