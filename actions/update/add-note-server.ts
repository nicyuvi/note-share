'use server'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

export async function addNoteToServer(
  noteId: number,
  data: { serverId: number }
) {
  try {
    const updateNote = await db.note.update({
      where: {
        id: noteId,
      },
      data,
    })
    return { success: `Successfully added note ${updateNote.title}` }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors
      console.log(e.code)
    }
    return { error: 'Failed to add note' }
  }
}
